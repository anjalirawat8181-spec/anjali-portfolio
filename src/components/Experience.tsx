import { motion } from 'framer-motion'
import { experience } from '../data/experience'
import { lensById } from '../data/lenses'
import { copy } from '../data/site'
import { useApp } from '../hooks/useApp'
import { SectionHeading } from './ui'

export function Experience() {
  const { lens } = useApp()
  const active = lensById(lens)
  const ordered = [...experience].sort(
    (a, b) => active.experienceEmphasis.indexOf(a.id) - active.experienceEmphasis.indexOf(b.id),
  )

  return (
    <section id="experience" aria-labelledby="exp-h" className="container-x py-20">
      <SectionHeading id="exp-h" eyebrow={copy.experience.eyebrow} title={copy.experience.title} />
      <ol className="relative space-y-8 border-l-4 border-line pl-6 sm:pl-10">
        {ordered.map((r) => {
          const relevant = lens !== 'all' && r.lenses.includes(lens)
          return (
            <motion.li key={r.id} layout transition={{ type: 'spring', stiffness: 300, damping: 34 }} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-6 h-5 w-5 border-[3px] border-line bg-accent sm:-left-[54px]"
              />
              <article className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold sm:text-2xl">{r.title}</h3>
                  <p className="font-mono text-xs font-bold uppercase text-muted">{r.period}</p>
                </div>
                <p className="mt-1 text-muted">
                  {r.org}, {r.place}
                </p>
                <ul className="mt-4 space-y-3">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                      <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 border-2 border-line bg-accent" />
                      <span className={relevant ? 'marker' : ''}>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
