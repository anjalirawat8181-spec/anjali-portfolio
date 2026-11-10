import { motion } from 'framer-motion'
import { links } from '../data/links'
import { copy } from '../data/site'
import { tagColors, writing, type Post } from '../data/writing'
import { useApp } from '../hooks/useApp'
import { Reveal, SectionHeading, SmartLink } from './ui'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const fmt = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return m ? `${d} ${MONTHS[m - 1]} ${y}` : iso
}

function opacityFor(lens: string, p: Post) {
  if (lens === 'product') return p.lenses.includes('product') ? 1 : 0.6
  if (lens === 'sde' || lens === 'analyst') return 0.8
  return 1
}

export function Writing() {
  const { lens } = useApp()
  if (writing.length === 0) return null
  return (
    <section id="writing" aria-labelledby="writing-h" className="container-x py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="writing-h" eyebrow={copy.writing.eyebrow} title={copy.writing.title} sub={copy.writing.sub} />
        <SmartLink url={links.medium.url} className="btn btn-ghost mb-10">
          {copy.writing.all}
        </SmartLink>
      </div>
      <ul className="grid gap-6 md:grid-cols-2">
        {writing.map((p, i) => (
          <li key={p.url} className={`list-none ${i === 0 ? 'md:col-span-2' : ''}`}>
            <Reveal delay={i * 0.06} className="h-full">
              <motion.div animate={{ opacity: opacityFor(lens, p) }} transition={{ duration: 0.2 }} className="h-full">
                <SmartLink url={p.url} cursor="read" className="card nb-lift flex h-full flex-col gap-4 p-5 sm:p-6">
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-block border-[3px] border-black px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-black ${i % 2 ? 'rotate-1' : '-rotate-2'}`}
                      style={{ background: tagColors[p.tag] }}
                    >
                      {p.tag}
                    </span>
                    <time dateTime={p.date} className="font-mono text-xs font-bold text-muted">
                      {fmt(p.date)}
                    </time>
                  </span>
                  <span className={`line-clamp-3 font-display font-bold leading-tight ${i === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{p.title}</span>
                  <span className="line-clamp-2 text-muted">{p.blurb}</span>
                  <span className="btn btn-accent mt-auto w-fit !cursor-pointer [--s:3px]" aria-hidden="true">
                    {copy.writing.read}
                  </span>
                </SmartLink>
              </motion.div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
