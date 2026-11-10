import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { isExternal, isMissing, resolveUrl } from '../data/links'

export const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
export const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

export const MediumIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="6.5" cy="12" r="5.5" />
    <ellipse cx="16.2" cy="12" rx="2.9" ry="5.2" />
    <ellipse cx="21.6" cy="12" rx="1.1" ry="4.6" />
  </svg>
)

interface SmartLinkProps {
  url: string
  children: ReactNode
  className?: string
  cursor?: string
  ariaLabel?: string
}
export function SmartLink({ url, children, className = '', cursor = 'open', ariaLabel }: SmartLinkProps) {
  if (isMissing(url)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={ariaLabel ? `${ariaLabel} (link coming soon)` : undefined}
        tabIndex={0}
        data-tip="Link coming soon"
        className={`tip cursor-not-allowed opacity-50 ${className}`}
      >
        {children}
      </span>
    )
  }
  const ext = isExternal(url)
  const isResume = url.endsWith('.pdf')
  return (
    <a
      href={resolveUrl(url)}
      data-cursor={cursor}
      aria-label={ariaLabel}
      className={className}
      {...(ext || isResume ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  text,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  text?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)
  const fmt = (v: number) =>
    prefix + v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix

  useEffect(() => {
    if (text) return
    if (!inView || reduce) {
      if (reduce) setN(value)
      return
    }
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: setN })
    return () => c.stop()
  }, [inView, value, reduce, text])

  const final = text ?? fmt(value)
  return (
    <span ref={ref} aria-label={final} className="tabular-nums">
      <span aria-hidden="true">{text ?? fmt(n)}</span>
    </span>
  )
}

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })
  const ref = useRef<HTMLSpanElement>(null)
  const enabled = !reduce && finePointer()
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={enabled ? { x: sx, y: sy } : undefined}
      onMouseMove={(e) => {
        if (!enabled || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

export function SectionHeading({ id, eyebrow, title, sub }: { id: string; eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="inline-block border-b-[10px] border-accent text-4xl font-bold uppercase leading-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-5 text-lg text-muted">{sub}</p>}
    </Reveal>
  )
}
