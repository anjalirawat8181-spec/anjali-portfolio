import { marquee } from '../data/site'

export function Marquee() {
  const run = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...marquee, ...marquee, ...marquee].map((w, i) => (
        <li key={i} className="px-5 font-display text-2xl font-bold tracking-wide sm:text-3xl">
          {w} <span className="ml-5 text-accent">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee overflow-hidden border-y-[3px] border-line bg-black py-3 text-[#FFF8E7]" aria-label={marquee.join(', ')} role="group">
      <div className="marquee-track flex">
        {run(false)}
        {run(true)}
      </div>
    </div>
  )
}
