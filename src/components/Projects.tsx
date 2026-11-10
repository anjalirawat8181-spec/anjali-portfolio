import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { lensById } from '../data/lenses'
import { links } from '../data/links'
import { copy, palette } from '../data/site'
import { useApp } from '../hooks/useApp'
import { ProjectDrawer } from './ProjectDrawer'
import { SectionHeading, SmartLink } from './ui'

export const projectColor = (p: Project) => palette[projects.findIndex((x) => x.id === p.id) % palette.length]

export function ProjectThumb({ project, className = '' }: { project: Project; className?: string }) {
  const initials = project.title
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <div
      aria-hidden="true"
      className={`relative grid place-items-center border-black text-black ${className}`}
      style={{ background: projectColor(project) }}
    >
      <span className="font-display text-5xl font-bold tracking-tight sm:text-6xl">{initials}</span>
    </div>
  )
}

export function ProjectLinks({ project }: { project: Project }) {
  const items = project.linkKeys.length ? project.linkKeys.map((k) => links[k]) : [links.github]
  return (
    <ul className="relative z-10 flex flex-wrap gap-2">
      {items.map((l) => (
        <li key={l.label}>
          <SmartLink url={l.url} className="chip-solid nb-lift inline-flex items-center gap-1 px-3 py-1 text-xs font-bold">
            {l.label} <ArrowUpRight size={12} aria-hidden="true" />
          </SmartLink>
        </li>
      ))}
    </ul>
  )
}

const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

function Card({ project, featured, span, onOpen }: { project: Project; featured: boolean; span: string; onOpen: () => void }) {
  const { lens } = useApp()
  const relevant = lens !== 'all' && project.lenses.includes(lens)
  return (
    <motion.li
      layout
      transition={{ type: 'spring', stiffness: 260, damping: 32 }}
      className={`list-none ${featured ? 'md:col-span-2 lg:col-span-12' : `${span} md:col-span-1`}`}
    >
      <article
        className={`nb nb-lift relative flex h-full flex-col overflow-visible text-black ${
          featured ? '!border-4 [--s:10px]' : ''
        }`}
        style={{ background: featured ? '#fff' : projectColor(project) }}
      >
        {featured && (
          <div className="flex items-center gap-2 border-b-4 border-black bg-accent px-4 py-2" aria-hidden="true">
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
              <span key={c} className="h-3.5 w-3.5 border-2 border-black" style={{ background: c }} />
            ))}
            <span className="ml-2 font-mono text-xs font-bold uppercase">{project.id}.app</span>
          </div>
        )}
        <div className={`flex flex-1 ${featured ? 'flex-col lg:flex-row' : 'flex-col'}`}>
          <ProjectThumb
            project={project}
            className={featured ? 'h-44 border-b-[3px] lg:h-auto lg:w-2/5 lg:border-b-0 lg:border-r-[3px]' : 'h-28 border-b-[3px]'}
          />
          <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              {project.flagship && (
                <span className="inline-flex -rotate-2 items-center gap-1 border-[3px] border-black bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase">
                  <Star size={11} aria-hidden="true" /> Flagship
                </span>
              )}
              {relevant && (
                <span className="inline-block rotate-1 border-[3px] border-black bg-white px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase">
                  {lensById(lens).label}
                </span>
              )}
            </div>
            <h3 className={`font-bold ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
              <button
                type="button"
                onClick={onOpen}
                data-cursor="view"
                aria-haspopup="dialog"
                className="text-left after:absolute after:inset-0 after:content-['']"
              >
                {project.title}
              </button>
            </h3>
            {featured ? (
              <ul className="space-y-2 text-sm font-medium leading-relaxed sm:text-base">
                {project.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 border-2 border-black bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="line-clamp-3 text-sm font-medium leading-relaxed">{project.bullets[0]}</p>
            )}
            <ul className="mt-auto flex flex-wrap gap-2" aria-label="Tech">
              {project.tech.map((t) => (
                <li key={t} className="chip-solid px-2.5 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export function Projects() {
  const { lens } = useApp()
  const [openId, setOpenId] = useState<string | null>(null)
  const order = lensById(lens).projectOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => !!p)
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <section id="work" aria-labelledby="work-h" className="container-x py-20">
      <SectionHeading id="work-h" eyebrow={copy.work.eyebrow} title={copy.work.title} sub={copy.work.sub} />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {order.map((p, i) => (
          <Card key={p.id} project={p} featured={i === 0} span={spans[(i - 1) % spans.length]} onOpen={() => setOpenId(p.id)} />
        ))}
      </ul>
      <ProjectDrawer project={open} onClose={() => setOpenId(null)} />
    </section>
  )
}
