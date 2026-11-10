import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'
import { links } from '../data/links'
import { SmartLink } from './ui'

export function Footer() {
  const list = [links.email, links.phone, links.github, links.linkedin, links.medium, links.resume, links.portfolio]
  return (
    <footer className="border-t-[3px] border-line bg-black text-[#FFF8E7]">
      <div className="container-x flex flex-col gap-8 py-10">
        <ul className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer links">
          {list.map((l) => (
            <li key={l.label}>
              <SmartLink
                url={l.url}
                className="text-sm font-bold uppercase tracking-wide underline decoration-accent decoration-4 underline-offset-4 hover:bg-accent hover:text-black"
              >
                {l.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1 text-sm">
            <p className="font-bold">{profile.footerLine}</p>
            <p className="opacity-80">
              © {new Date().getFullYear()} {profile.name}. Mumbai, India.
            </p>
          </div>
          <a href="#top" data-cursor="top" className="btn w-fit border-[#FFF8E7] bg-accent text-black [--s:4px] [box-shadow:4px_4px_0_#FFF8E7]">
            <ArrowUp size={16} aria-hidden="true" /> Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
