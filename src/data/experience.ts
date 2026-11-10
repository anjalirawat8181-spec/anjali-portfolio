import type { LensFilter } from './types'

export interface Role {
  id: string
  title: string
  org: string
  place: string
  period: string
  bullets: string[]
  primary: LensFilter
  lenses: LensFilter[]
  note?: string
}

export const experience: Role[] = [
  {
    id: 'erde',
    title: 'Software Development Engineer Intern',
    org: 'Erde Agro Ecosystems Pvt. Ltd.',
    place: 'Mumbai',
    period: 'Sept 2026 – Present',
    bullets: [
      'Built the complete UI of the farm app web portal in React and TypeScript, from design to deployment.',
      'Built a full-stack careers management portal, developing an HR-facing interface to create and publish job openings through forms, with dynamic updates reflected on the public careers page.',
      'Implemented an application management interface enabling HR to view submitted candidate applications and access uploaded resumes through the backend portal.',
    ],
    primary: 'sde',
    lenses: ['sde', 'product'],
  },
  {
    id: 'saventh',
    title: 'Strategy and Growth Intern',
    org: 'Saventh',
    place: 'Mumbai',
    period: 'June 2026 – Sept 2026',
    bullets: [
      'Conducted market research and data analysis across 40+ B2B2C corporate clients, producing structured reports that informed strategy and financial product expansion.',
      'Analyzed large datasets to identify growth opportunities and risk trends, delivering insights to stakeholders including Asset Management Companies (AMCs).',
    ],
    primary: 'marketing',
    lenses: ['marketing', 'analyst'],
  },
  {
    id: 'catalyst',
    title: 'Mentee, Catalyst Program',
    org: 'Goldman Sachs supported',
    place: 'Mumbai',
    period: 'June 2026 – Aug 2026',
    bullets: ['Completed a structured DSA program and an LLM/RAG fundamentals module.'],
    primary: 'sde',
    lenses: ['sde'],
    note: 'Mentee in a Goldman Sachs supported program.',
  },
]
