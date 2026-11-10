import { lensById } from '../data/lenses'
import { skillGroups } from '../data/skills'
import { copy } from '../data/site'
import { useApp } from '../hooks/useApp'
import { Reveal, SectionHeading } from './ui'

export function Skills() {
  const { lens } = useApp()
  const active = lensById(lens)
  const all = lens === 'all'

  return (
    <section id="skills" aria-labelledby="skills-h" className="container-x py-20">
      <SectionHeading id="skills-h" eyebrow={copy.skills.eyebrow} title={copy.skills.title} sub={copy.skills.sub} />
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((g, i) => {
          const groupOn = active.highlightSkillGroups.includes(g.id)
          return (
            <Reveal key={g.id} delay={(i % 2) * 0.06}>
              <div className="card h-full p-5">
                <h3 className={`mb-4 inline-block font-mono text-xs font-bold uppercase tracking-[0.2em] ${groupOn ? 'border-b-4 border-accent' : 'text-muted'}`}>{g.title}</h3>
                <ul className="flex flex-wrap gap-3">
                  {g.items.map((item) => {
                    const on = !all && (groupOn || active.highlightSkills.includes(item))
                    return (
                      <li
                        key={item}
                        className={`nb px-3 py-1.5 text-sm font-bold [--s:3px] ${
                          on ? 'bg-accent text-black' : 'bg-surface text-ink'
                        } ${!all && !on ? 'opacity-50' : ''}`}
                      >
                        {item}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
