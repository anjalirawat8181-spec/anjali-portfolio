import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { lensById, lenses } from '../data/lenses'
import type { LensId } from '../data/types'

type Theme = 'dark' | 'light'

interface AppState {
  lens: LensId
  setLens: (l: LensId) => void
  theme: Theme
  toggleTheme: () => void
  toast: (msg: string) => void
  toastMsg: string
  paletteOpen: boolean
  setPaletteOpen: (v: boolean) => void
  copyLensLink: () => void
  copyEmail: () => void
}

const Ctx = createContext<AppState | null>(null)

const validLens = (v: string | null): LensId =>
  lenses.some((l) => l.id === v) ? (v as LensId) : 'all'

const readLens = (): LensId => {
  try {
    return validLens(new URLSearchParams(window.location.search).get('lens'))
  } catch {
    return 'all'
  }
}

const readTheme = (): Theme => {
  const t = document.documentElement.getAttribute('data-theme')
  return t === 'dark' ? 'dark' : 'light'
}

export function AppProvider({ children, email }: { children: ReactNode; email: string }) {
  const [lens, setLensState] = useState<LensId>(readLens)
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [toastMsg, setToastMsg] = useState('')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    const l = lensById(lens)
    const root = document.documentElement
    root.style.setProperty('--accent', l.accentRgb)
    root.style.setProperty('--on-accent', l.onAccent)
  }, [lens])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#121212' : '#FFF8E7')
  }, [theme])

  useEffect(() => {
    const onPop = () => setLensState(readLens())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const setLens = useCallback((l: LensId) => {
    setLensState(l)
    try {
      const url = new URL(window.location.href)
      if (l === 'all') url.searchParams.delete('lens')
      else url.searchParams.set('lens', l)
      window.history.replaceState(null, '', url)
    } catch {
    }
  }, [])

  const toast = useCallback((msg: string) => {
    setToastMsg(msg)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToastMsg(''), 2200)
  }, [])

  const copy = useCallback(
    async (text: string, ok: string) => {
      try {
        await navigator.clipboard.writeText(text)
        toast(ok)
      } catch {
        toast('Copy blocked by the browser. Select and copy manually.')
      }
    },
    [toast],
  )

  const copyLensLink = useCallback(() => {
    const url = new URL(window.location.href)
    url.hash = ''
    if (lens === 'all') url.searchParams.delete('lens')
    else url.searchParams.set('lens', lens)
    void copy(url.toString(), `Link for the ${lensById(lens).label} lens copied`)
  }, [lens, copy])

  const copyEmail = useCallback(() => void copy(email, 'Email copied. Go on, say hi.'), [copy, email])

  const value = useMemo<AppState>(
    () => ({
      lens,
      setLens,
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      toast,
      toastMsg,
      paletteOpen,
      setPaletteOpen,
      copyLensLink,
      copyEmail,
    }),
    [lens, setLens, theme, toast, toastMsg, paletteOpen, copyLensLink, copyEmail],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useApp must be used inside AppProvider')
  return c
}
