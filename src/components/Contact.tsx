import { useState, type FormEvent } from 'react'
import { Copy, FileText, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data/profile'
import { links } from '../data/links'
import { copy } from '../data/site'
import { useApp } from '../hooks/useApp'
import { GithubIcon, LinkedinIcon, MediumIcon, Reveal, SectionHeading, SmartLink } from './ui'

export function Contact() {
  const { copyEmail } = useApp()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Hello from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full border-[3px] border-line bg-surface px-4 py-3 text-ink placeholder:text-muted focus:shadow-[4px_4px_0_rgb(var(--accent))]'

  return (
    <section id="contact" aria-labelledby="contact-h" className="container-x py-20">
      <SectionHeading id="contact-h" eyebrow={copy.contact.eyebrow} title={copy.contact.title} sub={profile.contactLine} />
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <button
            type="button"
            onClick={copyEmail}
            data-cursor="copy"
            className="nb nb-lift flex w-full items-center justify-between gap-4 bg-accent p-5 text-left text-black sm:p-7"
          >
            <span className="break-all font-display text-xl font-bold sm:text-3xl">{profile.email}</span>
            <span className="flex shrink-0 items-center gap-2 text-sm font-bold uppercase">
              <Copy size={16} aria-hidden="true" /> <span className="hidden sm:inline">Copy</span>
              <span className="sr-only">email address</span>
            </span>
          </button>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { l: links.email, icon: <Mail size={18} aria-hidden="true" />, text: 'Write an email' },
              { l: links.phone, icon: <Phone size={18} aria-hidden="true" />, text: profile.phone },
              { l: links.github, icon: <GithubIcon />, text: 'GitHub' },
              { l: links.linkedin, icon: <LinkedinIcon />, text: 'LinkedIn' },
              { l: links.medium, icon: <MediumIcon />, text: 'Medium' },
              { l: links.resume, icon: <FileText size={18} aria-hidden="true" />, text: 'Resume (PDF)' },
            ].map(({ l, icon, text }) => (
              <li key={l.label}>
                <SmartLink url={l.url} className="card nb-lift flex items-center gap-3 px-4 py-3 font-bold [--s:4px]">
                  {icon}
                  {text}
                </SmartLink>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <form onSubmit={submit} className="card space-y-4 p-5 sm:p-6">
            <p className="text-sm text-muted">This opens your mail app with the message filled in. No servers involved.</p>
            <div>
              <label htmlFor="c-name" className="mb-1.5 block text-sm font-bold uppercase">
                Your name
              </label>
              <input id="c-name" name="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1.5 block text-sm font-bold uppercase">
                Message
              </label>
              <textarea id="c-msg" name="message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={field} />
            </div>
            <button type="submit" data-cursor="send" className="btn btn-accent w-full">
              <Send size={16} aria-hidden="true" /> Open in mail app
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
