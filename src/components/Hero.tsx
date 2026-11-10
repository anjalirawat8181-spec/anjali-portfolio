import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Download, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { lensById, stats } from '../data/lenses'
import { links } from '../data/links'
import { copy, palette } from '../data/site'
import { useApp } from '../hooks/useApp'
import { useScramble } from '../hooks/useScramble'
import { HeroPhoto } from './HeroPhoto'
import { LensSwitcher } from './LensSwitcher'
import { Counter, GithubIcon, LinkedinIcon, Magnetic, MediumIcon, SmartLink } from './ui'

function RotatingWord() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setI((v) => (v + 1) % profile.rotatingWords.length), 2200)
    return () => window.clearInterval(t)
  }, [reduce])
  const word = profile.rotatingWords[i]
  return (
    <>
      <span className="sr-only">{profile.rotatingWords.join(', ')}.</span>
      <span aria-hidden="true" className="rotator">
        {profile.rotatingWords.map((w) => (
          <span key={w} className="ghost">
            {w}
          </span>
        ))}
        <AnimatePresence initial={false}>
          <motion.span
            key={word}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
}

export function Hero() {
  const { lens } = useApp()
  const reduce = useReducedMotion()
  const active = lensById(lens)
  const [first, last] = profile.name.split(' ')
  const scrambledFirst = useScramble(first, !reduce, 900)
  const scrambledLast = useScramble(last, !reduce, 1100)

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative pb-16"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="container-x">
        <p className="mb-8 inline-block -rotate-2 border-[3px] border-black bg-[#FFD23F] px-3 py-1.5 text-sm font-bold text-black shadow-[4px_4px_0_#000]">
          <span aria-hidden="true">🟢 </span>
          {profile.status}
        </p>

        <h1 aria-label={profile.name} className="font-display text-[clamp(3rem,11vw,7rem)] font-bold leading-[1.05]">
          <span aria-hidden="true" className="block sm:inline">{scrambledFirst}</span>
          <span aria-hidden="true" className="hidden sm:inline"> </span>
          <span aria-hidden="true" className="block sm:inline">{scrambledLast}</span>
        </h1>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div>
        <p className="mt-6 font-display text-3xl font-bold leading-[1.3] sm:text-5xl">
          I <RotatingWord />.
        </p>

        <div className="mt-5 min-h-[3.5rem] sm:min-h-[2.5rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active.id}
              className="inline bg-accent px-2 py-0.5 text-lg font-bold text-black sm:text-xl [box-decoration-break:clone]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {active.tagline}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted">{profile.heroLine}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#work" data-cursor="view" className="btn btn-accent">
            See my work <ArrowDownRight size={16} aria-hidden="true" />
          </a>
          <SmartLink url={links.resume.url} cursor="open" className="btn btn-ghost">
            <Download size={16} aria-hidden="true" /> Download resume
          </SmartLink>
          <ul className="flex flex-wrap items-center gap-3" aria-label="Social links">
            {[
              { l: links.github, icon: <GithubIcon /> },
              { l: links.linkedin, icon: <LinkedinIcon /> },
              { l: links.medium, icon: <MediumIcon /> },
              { l: links.email, icon: <Mail size={18} aria-hidden="true" /> },
            ].map(({ l, icon }) => (
              <li key={l.label}>
                <Magnetic>
                  <SmartLink url={l.url} ariaLabel={l.label} className="btn h-12 w-12 !p-0 bg-surface text-ink [--s:4px]">
                    {icon}
                  </SmartLink>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">{copy.lensPrompt}</p>
          <LensSwitcher />
        </div>
        </div>
        <HeroPhoto />
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {active.heroStats.map((id, idx) => {
            const s = stats[id]
            return (
              <div
                key={id}
                className="nb flex flex-col p-4 text-black [--s:5px]"
                style={{ background: palette[idx % palette.length] }}
              >
                <dt className="order-2 mt-1 font-mono text-xs font-medium uppercase tracking-wide">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-bold sm:text-4xl">
                  <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} text={s.text} />
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
