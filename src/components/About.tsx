import { Briefcase, Code2, LineChart, Megaphone } from 'lucide-react'
import { profile } from '../data/profile'
import { lensById } from '../data/lenses'
import { useApp } from '../hooks/useApp'
import type { LensId } from '../data/types'
import { Reveal, SectionHeading } from './ui'

const icons: Record<string, JSX.Element> = {
  sde: <Code2 size={20} aria-hidden="true" />,
  analyst: <LineChart size={20} aria-hidden="true" />,
  product: <Briefcase size={20} aria-hidden="true" />,
  marketing: <Megaphone size={20} aria-hidden="true" />,
}
const tilts = ['-rotate-2', 'rotate-[1.5deg]', '-rotate-[1.5deg]', 'rotate-2']

export function About() {
  const { lens, setLens } = useApp()
  const ed = profile.education
  const ph = profile.aboutPhoto
  return (
    <section id="about" aria-labelledby="about-h" className="container-x py-20">
      <SectionHeading id="about-h" eyebrow="About" title={profile.aboutTitle} />
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="space-y-4 lg:col-span-5">
          <figure className="relative mx-auto mb-10 w-[min(86%,320px)] lg:mx-0">
            <div aria-hidden="true" className="absolute inset-0 translate-x-[14px] translate-y-[14px] -rotate-2 border-4 border-black bg-accent" />
            <div className="relative -rotate-2">
              <picture>
                <source srcSet={import.meta.env.BASE_URL + ph.src} type="image/webp" />
                <img
                  src={import.meta.env.BASE_URL + ph.fallback}
                  alt={ph.alt}
                  width={ph.width}
                  height={ph.height}
                  loading="lazy"
                  decoding="async"
                  className="stack-photo block h-auto w-full bg-surface"
                />
              </picture>
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-3 border-[3px] border-black bg-[#FFD23F]/90" />
              <figcaption className="absolute -bottom-5 left-3 border-[3px] border-black bg-white px-2 py-1 font-mono text-[11px] font-bold text-black shadow-[3px_3px_0_#000] sm:text-xs">
                {ph.caption}
              </figcaption>
            </div>
          </figure>
          {profile.about.map((p) => (
            <p key={p} className="text-lg leading-relaxed">
              {p}
            </p>
          ))}
          <div className="card mt-6 p-5">
            <p className="font-display text-lg font-bold">{ed.degree}</p>
            <p className="text-sm text-muted">{ed.school}</p>
            <p className="mt-1 text-sm text-muted">
              {ed.period} ·{' '}
              <span tabIndex={0} data-tip={ed.cgpaTip} data-cursor="hi" className="tip cursor-help font-bold text-ink underline decoration-accent decoration-4 underline-offset-4">
                CGPA {ed.cgpa}
              </span>
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Coursework">
              {ed.coursework.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">Four hats</h3>
          <ul className="grid gap-5 sm:grid-cols-2">
            {profile.hats.map((h, i) => {
              const on = lens === h.lens
              return (
                <li key={h.lens} className="list-none">
                  <Reveal delay={i * 0.06} className="h-full">
                    <button
                      type="button"
                      onClick={() => setLens(h.lens as LensId)}
                      aria-pressed={on}
                      data-cursor="switch"
                      style={{ background: lensById(h.lens as LensId).accent }}
                      className={`nb nb-lift relative flex h-full w-full flex-col gap-3 p-5 text-left text-black ${on ? 'translate-x-[-3px] translate-y-[-3px] [--s:9px]' : ''}`}
                    >
                      <span className={`absolute -top-3 right-3 inline-block border-[3px] border-black bg-white px-2 py-0.5 font-mono text-[11px] font-bold uppercase ${tilts[i]}`}>
                        {on ? 'Active lens' : 'Lens'}
                      </span>
                      <span className="grid h-10 w-10 place-items-center border-[3px] border-black bg-white">{icons[h.lens]}</span>
                      <span className="font-display text-xl font-bold">{h.title}</span>
                      <span className="text-sm font-medium leading-relaxed">{h.proof}</span>
                    </button>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
