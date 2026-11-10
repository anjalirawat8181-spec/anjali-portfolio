import { useRef, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Link2 } from 'lucide-react'
import { lenses } from '../data/lenses'
import { copy, shortLensLabel } from '../data/site'
import { useApp } from '../hooks/useApp'

export function LensSwitcher({ variant = 'full' }: { variant?: 'full' | 'mini' }) {
  const { lens, setLens, copyLensLink } = useApp()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const mini = variant === 'mini'

  const onKey = (e: KeyboardEvent, i: number) => {
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % lenses.length
    if (e.key === 'ArrowLeft') next = (i - 1 + lenses.length) % lenses.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = lenses.length - 1
    if (next < 0) return
    e.preventDefault()
    setLens(lenses[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className={mini ? '' : 'flex flex-col gap-3'}>
      <div
        role="tablist"
        aria-label={mini ? 'Lens (quick switch)' : 'Choose a lens'}
        className={`nb flex gap-1 bg-surface p-1 ${mini ? 'flex-nowrap whitespace-nowrap [--s:3px]' : 'flex-wrap w-fit max-w-full [--s:5px]'}`}
      >
        {lenses.map((l, i) => {
          const active = l.id === lens
          return (
            <button
              key={l.id}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              type="button"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              data-cursor="switch"
              onClick={() => setLens(l.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative font-bold ${
                mini ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
              } ${active ? 'text-on-accent' : 'text-ink hover:bg-accent/40'}`}
            >
              {active && (
                <motion.span
                  layoutId={`lens-pill-${variant}`}
                  className="absolute inset-0 border-[3px] border-line bg-accent shadow-nb-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{mini ? shortLensLabel[l.id] : l.label}</span>
            </button>
          )
        })}
      </div>
      {!mini && (
        <button
          type="button"
          onClick={copyLensLink}
          data-cursor="copy"
          className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wide underline decoration-accent decoration-4 underline-offset-4"
        >
          <Link2 size={14} aria-hidden="true" /> {copy.lensCopy}
        </button>
      )}
    </div>
  )
}
