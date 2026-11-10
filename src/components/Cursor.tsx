import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'

export function Cursor() {
  const reduce = useReducedMotion()
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [label, setLabel] = useState('')
  const [shown, setShown] = useState(false)
  const enabled = fine && !reduce

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setShown(true)
      const t = e.target as Element | null
      const el = t?.closest?.('[data-cursor], [aria-disabled="true"], a, button')
      if (!el) return setLabel('')
      if (el.getAttribute('aria-disabled') === 'true') return setLabel('soon')
      setLabel(el.getAttribute('data-cursor') ?? (el.tagName === 'A' ? 'open' : ''))
    }
    const leave = () => setShown(false)
    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x, y, opacity: shown ? 1 : 0 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 border-2 border-black bg-accent" style={{ width: 14, height: 14 }} />
      {label && (
        <span className="absolute left-3 top-3 whitespace-nowrap border-2 border-black bg-accent px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black">
          {label}
        </span>
      )}
    </motion.div>
  )
}
