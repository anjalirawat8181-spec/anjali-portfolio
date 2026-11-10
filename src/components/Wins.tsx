import { BadgeCheck } from 'lucide-react'
import { awards, certifications, leadership } from '../data/achievements'
import { copy, palette } from '../data/site'
import { Counter, Reveal, SectionHeading } from './ui'

export function Wins() {
  return (
    <section id="wins" aria-labelledby="wins-h" className="container-x py-20">
      <SectionHeading id="wins-h" eyebrow={copy.wins.eyebrow} title={copy.wins.title} />
      <div className="grid gap-6 md:grid-cols-12">
        {awards.map((a, i) => (
          <Reveal key={a.title + a.detail} delay={i * 0.06} className="md:col-span-6">
            <div className="nb flex h-full items-start gap-4 p-5 text-black" style={{ background: palette[i] }}>
              <span aria-hidden="true" className="grid h-14 w-14 shrink-0 -rotate-3 place-items-center border-[3px] border-black bg-white text-3xl">
                {a.emoji}
              </span>
              <div>
                <p className="font-display text-2xl font-bold">{a.title}</p>
                <p className="font-medium">{a.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal className="md:col-span-7">
          <div className="card h-full p-5 sm:p-6">
            <p className="eyebrow mb-3">{leadership.period}</p>
            <h3 className="text-xl font-bold sm:text-2xl">
              {leadership.title}, {leadership.org}
            </h3>
            <p className="mt-2 text-muted">{leadership.summary}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {leadership.counters.map((c, i) => (
                <div key={c.label} className="nb flex flex-col p-3 text-black [--s:4px]" style={{ background: palette[i + 2] }}>
                  <dt className="order-2 text-sm font-medium">{c.label}</dt>
                  <dd className="order-1 font-display text-4xl font-bold sm:text-5xl">
                    <Counter value={c.value} suffix={c.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="md:col-span-5">
          <div className="card h-full p-5 sm:p-6">
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">Certifications</h3>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex gap-3">
                  <BadgeCheck size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
