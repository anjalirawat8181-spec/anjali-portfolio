import { MotionConfig } from 'framer-motion'
import { profile } from './data/profile'
import { AppProvider, useApp } from './hooks/useApp'
import { useHotkeys } from './hooks/useHotkeys'
import { About } from './components/About'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Wins } from './components/Wins'
import { Writing } from './components/Writing'

function Shell() {
  const { toastMsg } = useApp()
  useHotkeys()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Wins />
        <Writing />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Cursor />
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4">
        {toastMsg && <p className="border-[3px] border-black bg-[#FFD23F] px-4 py-2 text-sm font-bold text-black shadow-[4px_4px_0_#000]">{toastMsg}</p>}
      </div>
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider email={profile.email}>
        <Shell />
      </AppProvider>
    </MotionConfig>
  )
}
