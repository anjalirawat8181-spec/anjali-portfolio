export const nav = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'wins', label: 'Wins' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]

export const shortLensLabel: Record<string, string> = {
  all: 'All',
  sde: 'SDE',
  analyst: 'Analyst',
  product: 'Product',
  marketing: 'Strategy',
}

export const palette = ['#FFD23F', '#4CC9F0', '#FF6FA5', '#B8F34C', '#FF9F43', '#B388FF']

export const marquee = ['SDE', 'ANALYST', 'PRODUCT', 'STRATEGY', 'DESIGN']

export const copy = {
  lensPrompt: 'Same person, four lenses. Pick one.',
  lensCopy: 'Copy link for this lens',
  work: { eyebrow: 'Featured work', title: 'Things I built', sub: 'Re-ordered by the lens you picked. Open any card for the case study.' },
  experience: { eyebrow: 'Experience', title: 'Where I worked' },
  skills: { eyebrow: 'Skills', title: 'Toolkit', sub: 'The active lens lights up what matters most. Everything else stays dimmed, not deleted.' },
  wins: { eyebrow: 'Wins and leadership', title: 'Proof, not adjectives' },
  writing: { eyebrow: 'Writing', title: 'Things I wrote down', sub: 'Product thinking, human behaviour, and the occasional feelings dump.', all: 'All posts on Medium →', read: 'Read on Medium ↗' },
  contact: { eyebrow: 'Contact', title: "Let's build something" },
  notFound: {
    title: 'Error 404: JOIN not found',
    body: "SELECT * FROM pages WHERE url = 'this-one'; returned 0 rows. Somebody forgot the ON clause.",
  },
}
