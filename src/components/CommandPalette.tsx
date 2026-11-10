import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CornerDownLeft, Search } from 'lucide-react'
import { lenses } from '../data/lenses'
import { links, resolveUrl } from '../data/links'
import { nav } from '../data/site'
import { writing } from '../data/writing'
import { useApp } from '../hooks/useApp'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface Action {
  id: string
  group: string
  label: string
  run: () => void
}

function Palette({ onClose }: { onClose: () => void }) {
  const { setLens, toggleTheme, copyEmail, copyLensLink } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  useFocusTrap(ref, true, onClose)

  const actions = useMemo<Action[]>(() => {
    const go = (id: string) => () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    }
    return [
      ...nav.filter((n) => n.id !== 'writing' || writing.length).map((n) => ({ id: `go-${n.id}`, group: 'Jump to', label: n.label, run: go(n.id) })),
      ...lenses.map((l) => ({ id: `lens-${l.id}`, group: 'Lens', label: `Switch lens: ${l.label}`, run: () => setLens(l.id) })),
      { id: 'copy-lens', group: 'Actions', label: 'Copy link for current lens', run: copyLensLink },
      { id: 'theme', group: 'Actions', label: 'Toggle light / dark theme', run: toggleTheme },
      { id: 'email', group: 'Actions', label: 'Copy email address', run: copyEmail },
      { id: 'linkedin', group: 'Actions', label: 'Open LinkedIn', run: () => window.open(links.linkedin.url, '_blank', 'noopener,noreferrer') },
      { id: 'blog', group: 'Actions', label: 'Read my blog', run: () => window.open(links.medium.url, '_blank', 'noopener,noreferrer') },
      { id: 'resume', group: 'Actions', label: 'Open resume (PDF)', run: () => window.open(resolveUrl(links.resume.url), '_blank', 'noopener,noreferrer') },
    ]
  }, [setLens, toggleTheme, copyEmail, copyLensLink])

  const shown = actions.filter((a) => a.label.toLowerCase().includes(q.trim().toLowerCase()))
  const active = Math.min(i, Math.max(shown.length - 1, 0))

  const run = (a?: Action) => {
    if (!a) return
    onClose()
    window.setTimeout(a.run, 50)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setI((active + 1) % Math.max(shown.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setI((active - 1 + shown.length) % Math.max(shown.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(shown[active])
    }
  }

  return (
    <motion.div className="fixed inset-0 z-[80] grid place-items-start justify-items-center px-4 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Command palette" className="nb relative w-full max-w-lg overflow-hidden bg-surface [--s:10px]">
        <div className="flex items-center gap-3 border-b-[3px] border-line px-4">
          <Search size={16} className="text-muted" aria-hidden="true" />
          <input
            data-autofocus
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={shown[active] ? `pal-${shown[active].id}` : undefined}
            aria-label="Type a command"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setI(0)
            }}
            onKeyDown={onKey}
            placeholder="Jump to a section, switch lens, toggle theme…"
            className="h-12 w-full bg-transparent text-ink placeholder:text-muted focus:outline-none"
          />
          <kbd className="border-2 border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
          {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches. Even my SELECT is confused.</li>}
          {shown.map((a, idx) => (
            <li
              key={a.id}
              id={`pal-${a.id}`}
              role="option"
              aria-selected={idx === active}
              onMouseMove={() => setI(idx)}
              onClick={() => run(a)}
              className={`flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm font-bold ${idx === active ? 'bg-accent text-black' : ''}`}
            >
              <span>{a.label}</span>
              <span className={`flex items-center gap-1 font-mono text-[10px] uppercase ${idx === active ? '' : 'text-muted'}`}>
                {a.group} {idx === active && <CornerDownLeft size={11} aria-hidden="true" />}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useApp()
  return createPortal(
    <AnimatePresence>{paletteOpen && <Palette key="palette" onClose={() => setPaletteOpen(false)} />}</AnimatePresence>,
    document.body,
  )
}
