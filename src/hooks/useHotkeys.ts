import { useEffect } from 'react'
import { useApp } from './useApp'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useHotkeys() {
  const { paletteOpen, setPaletteOpen, toast } = useApp()

  useEffect(() => {
    let progress = 0
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(!paletteOpen)
        return
      }
      if (typing) return
      if (e.key === '?' && !paletteOpen) {
        e.preventDefault()
        setPaletteOpen(true)
        return
      }
      const expected = KONAMI[progress]
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === expected) {
        progress++
        if (progress === KONAMI.length) {
          progress = 0
          toast('Konami code accepted. +30 lives. Also: the palette.')
          setPaletteOpen(true)
        }
      } else {
        progress = key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, setPaletteOpen, toast])
}
