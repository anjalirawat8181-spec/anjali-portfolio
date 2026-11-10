import type { LensFilter } from './types'
import generated from './writing.generated.json'

export interface Post {
  title: string
  url: string
  date: string
  tag: 'Product' | 'Personal essay' | 'Writing'
  blurb: string
  lenses: LensFilter[]
}

const curated: Post[] = [
  {
    title: 'Why Google Pay Feels Easier Than Most Banking Apps',
    url: 'https://medium.com/@anjali.rawat8181/why-google-pay-feels-easier-than-most-banking-apps-02748c32312e',
    date: '2026-06-23',
    tag: 'Product',
    blurb:
      "A product teardown of why Google Pay beats most bank apps: it's built around the task the user came to do, not around the institution.",
    lenses: ['product', 'marketing'],
  },
  {
    title: 'What a Broken Duolingo Streak Taught Me About Product Design',
    url: 'https://medium.com/@anjali.rawat8181/what-a-broken-duolingo-streak-taught-me-about-product-design-81eac6dd8eff',
    date: '2026-06-05',
    tag: 'Product',
    blurb:
      'How I lost a 362-day streak, won it back in minutes, and what that says about loss aversion, habit loops and retention.',
    lenses: ['product', 'marketing'],
  },
  {
    title: "The Person Everyone Comes To — and who they go to when they're falling apart?",
    url: 'https://medium.com/@anjali.rawat8181/the-person-everyone-comes-to-and-who-they-go-to-when-theyre-falling-apart-86f88fa745ee',
    date: '2026-10-24',
    tag: 'Personal essay',
    blurb: 'A human, reflective essay on the quiet kind of disappearing, and the people who hold everyone else together.',
    lenses: ['marketing'],
  },
]

const norm = (u: string) => u.split('?')[0].replace(/\/$/, '')

export function sortWriting(posts: Post[]): Post[] {
  const rank = (p: Post) => (p.tag === 'Product' ? 0 : 1)
  return [...posts].sort((a, b) => rank(a) - rank(b) || b.date.localeCompare(a.date))
}

const extra = (generated as unknown as Post[]).filter((g) => !curated.some((c) => norm(c.url) === norm(g.url)))

export const writing: Post[] = sortWriting([...curated, ...extra])

export const tagColors: Record<string, string> = {
  Product: '#FFD23F',
  'Personal essay': '#FF6FA5',
  Writing: '#4CC9F0',
}
