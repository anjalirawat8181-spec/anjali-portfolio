import { useState } from 'react'
import { Command, Menu, Moon, Sun, X } from 'lucide-react'
import { profile } from '../data/profile'
import { links } from '../data/links'
import { nav } from '../data/site'
import { writing } from '../data/writing'
import { useApp } from '../hooks/useApp'
import { LensSwitcher } from './LensSwitcher'
import { GithubIcon, LinkedinIcon, MediumIcon, SmartLink } from './ui'

const square = 'btn !p-0 h-10 w-10 bg-surface text-ink [--s:3px]'

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="theme"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={square}
    >
      {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { setPaletteOpen } = useApp()
  const items = nav.filter((n) => n.id !== 'writing' || writing.length > 0)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-[3px] border-line bg-canvas">
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-3">
        <a
          href="#top"
          aria-label="Back to top"
          data-cursor="top"
          className="grid h-10 w-10 place-items-center border-[3px] border-line bg-black font-display text-lg font-bold text-[#FFF8E7]"
        >
          {profile.monogram}
        </a>

        <ul className="hidden items-center gap-5 xl:flex">
          {items.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="text-sm font-bold uppercase tracking-wide underline decoration-transparent decoration-4 underline-offset-8 hover:decoration-accent"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LensSwitcher variant="mini" />
          </div>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            data-cursor="menu"
            className="btn hidden !h-10 bg-surface !px-3 text-ink [--s:3px] xl:inline-flex"
          >
            <Command size={13} aria-hidden="true" /> K
          </button>
          <ThemeToggle />
          <SmartLink url={links.resume.url} cursor="open" className="btn btn-accent hidden !py-2 [--s:3px] sm:inline-flex">
            Resume
          </SmartLink>
          <button
            type="button"
            className={`${square} xl:hidden`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t-[3px] border-line bg-canvas xl:hidden">
          <div className="container-x flex flex-col gap-4 py-4">
            <div className="md:hidden">
              <LensSwitcher variant="mini" />
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {items.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="btn w-full bg-surface text-ink [--s:3px]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex gap-3" aria-label="Social links">
              {[
                { l: links.linkedin, icon: <LinkedinIcon /> },
                { l: links.github, icon: <GithubIcon /> },
                { l: links.medium, icon: <MediumIcon /> },
              ].map(({ l, icon }) => (
                <li key={l.label}>
                  <SmartLink url={l.url} ariaLabel={l.label} className="btn h-11 w-11 !p-0 bg-surface text-ink [--s:3px]">
                    {icon}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <SmartLink url={links.resume.url} className="btn btn-accent sm:hidden">
              Resume
            </SmartLink>
          </div>
        </div>
      )}
    </header>
  )
}
