import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Project } from '../data/projects'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { ProjectLinks, ProjectThumb } from './Projects'
import { Counter } from './ui'

function Panel({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref, true, onClose)
  const cs = project.caseStudy
  const h = 'mb-3 inline-block border-b-4 border-accent font-mono text-xs font-bold uppercase tracking-[0.2em]'
  const dot = <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 border-2 border-line bg-accent" />

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l-4 border-line bg-canvas shadow-[-10px_0_0_rgb(var(--shadow))]"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      >
        <ProjectThumb project={project} className="h-36 shrink-0 border-b-4 !border-line" />
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          data-cursor="close"
          aria-label="Close case study"
          className="btn absolute right-4 top-4 h-10 w-10 !p-0 bg-white text-black [--s:3px]"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="space-y-8 p-6 sm:p-8">
          <header>
            <p className="eyebrow mb-3">{cs ? 'Case study' : 'Project'}</p>
            <h2 id="drawer-title" className="text-3xl font-bold">
              {project.title}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </header>

          {cs ? (
            <>
              <section aria-labelledby="cs-problem">
                <h3 id="cs-problem" className={h}>Problem</h3>
                <p className="leading-relaxed">{cs.problem}</p>
              </section>
              <section aria-labelledby="cs-model">
                <h3 id="cs-model" className={h}>Data model</h3>
                <p className="leading-relaxed">{cs.dataModel}</p>
              </section>
              <section aria-labelledby="cs-built">
                <h3 id="cs-built" className={h}>What I built</h3>
                <ul className="space-y-2">
                  {cs.built.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed">
                      {dot}
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="cs-results">
                <h3 id="cs-results" className={h}>Results</h3>
                <dl className="grid grid-cols-2 gap-4">
                  {cs.results.map((r) => (
                    <div key={r.label} className="card flex flex-col p-4 [--s:4px]">
                      <dd className="order-1 font-display text-3xl font-bold sm:text-4xl">
                        <Counter value={r.value} decimals={r.decimals} prefix={r.prefix} suffix={r.suffix} />
                      </dd>
                      <dt className="order-2 mt-1 text-sm text-muted">{r.label}</dt>
                    </div>
                  ))}
                </dl>
              </section>
              <section aria-labelledby="cs-docs">
                <h3 id="cs-docs" className={h}>Docs I wrote</h3>
                <ul className="flex flex-wrap gap-2">
                  {cs.docs.map((d) => (
                    <li key={d} className="chip">
                      {d}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <section aria-labelledby="cs-what">
              <h3 id="cs-what" className={h}>What it is</h3>
              <ul className="space-y-2">
                {project.bullets.map((b) => (
                  <li key={b} className="flex gap-3 leading-relaxed">
                    {dot}
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="cs-links">
            <h3 id="cs-links" className={h}>Links</h3>
            <ProjectLinks project={project} />
          </section>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return createPortal(
    <AnimatePresence>{project && <Panel key={project.id} project={project} onClose={onClose} />}</AnimatePresence>,
    document.body,
  )
}
