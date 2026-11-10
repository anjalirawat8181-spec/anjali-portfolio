import type { LensId } from './types'

export interface Lens {
  id: LensId
  label: string
  accent: string
  accentRgb: string
  onAccent: string
  tagline: string
  projectOrder: string[]
  highlightSkillGroups: string[]
  highlightSkills: string[]
  experienceEmphasis: string[]
  heroStats: string[]
}

export const lenses: Lens[] = [
  {
    id: 'all',
    label: 'All of me',
    accent: '#B388FF',
    accentRgb: '179 136 255',
    onAccent: '0 0 0',
    tagline: 'Builder. Analyst. Product thinker. Storyteller.',
    projectOrder: ['wm-analytics', 'settlement', 'gis', 'careers', 'farm-app'],
    highlightSkillGroups: [],
    highlightSkills: [],
    experienceEmphasis: ['erde', 'saventh', 'catalyst'],
    heroStats: ['records', 'defects', 'clients', 'reached'],
  },
  {
    id: 'sde',
    label: 'SDE',
    accent: '#4CC9F0',
    accentRgb: '76 201 240',
    onAccent: '0 0 0',
    tagline: 'I ship full-stack things that actually get used.',
    projectOrder: ['careers', 'farm-app', 'gis', 'wm-analytics', 'settlement'],
    highlightSkillGroups: ['programming', 'development', 'tools'],
    highlightSkills: [],
    experienceEmphasis: ['erde', 'catalyst', 'saventh'],
    heroStats: ['portals', 'views', 'dashpages', 'breaktypes'],
  },
  {
    id: 'analyst',
    label: 'Analyst',
    accent: '#B8F34C',
    accentRgb: '184 243 76',
    onAccent: '0 0 0',
    tagline: 'I turn messy data into decisions people can act on.',
    projectOrder: ['wm-analytics', 'settlement', 'gis', 'careers', 'farm-app'],
    highlightSkillGroups: ['data'],
    highlightSkills: [],
    experienceEmphasis: ['saventh', 'erde', 'catalyst'],
    heroStats: ['records', 'defects', 'recall', 'query'],
  },
  {
    id: 'product',
    label: 'Product',
    accent: '#FFD23F',
    accentRgb: '255 210 63',
    onAccent: '0 0 0',
    tagline: "I start with the user's problem and end with a shipped solution.",
    projectOrder: ['careers', 'wm-analytics', 'farm-app', 'settlement', 'gis'],
    highlightSkillGroups: ['product', 'design'],
    highlightSkills: ['JIRA', 'Figma'],
    experienceEmphasis: ['erde', 'saventh', 'catalyst'],
    heroStats: ['stories', 'portals', 'clientsModelled', 'clients'],
  },
  {
    id: 'marketing',
    label: 'Marketing/Strategy',
    accent: '#FF6FA5',
    accentRgb: '255 111 165',
    onAccent: '0 0 0',
    tagline: 'I find the growth story hiding in the numbers.',
    projectOrder: ['wm-analytics', 'settlement', 'careers', 'farm-app', 'gis'],
    highlightSkillGroups: [],
    highlightSkills: ['Market Research', 'Stakeholder Insights', 'KPI Reporting', 'KPI Dictionaries'],
    experienceEmphasis: ['saventh', 'erde', 'catalyst'],
    heroStats: ['clients', 'partnerships', 'reached', 'jpm'],
  },
]

export const lensById = (id: LensId) => lenses.find((l) => l.id === id) ?? lenses[0]

export interface Stat {
  id: string
  prefix?: string
  value: number
  decimals?: number
  suffix?: string
  label: string
  text?: string
}

export const stats: Record<string, Stat> = {
  records: { id: 'records', value: 770, suffix: 'K+', label: 'records modelled' },
  defects: { id: 'defects', value: 18198, label: 'defects caught' },
  clients: { id: 'clients', value: 40, suffix: '+', label: 'clients analysed' },
  reached: { id: 'reached', value: 1200, suffix: '+', label: 'people reached' },
  recall: { id: 'recall', value: 0.99, decimals: 2, label: 'recall on churners' },
  query: { id: 'query', prefix: '−', value: 56, suffix: '%', label: 'query time' },
  portals: { id: 'portals', value: 2, label: 'portals built at Erde Agro' },
  views: { id: 'views', value: 23, label: 'SQL views written' },
  dashpages: { id: 'dashpages', value: 5, label: 'page live dashboard' },
  breaktypes: { id: 'breaktypes', value: 6, label: 'break types flagged' },
  stories: { id: 'stories', value: 18, label: 'user stories written' },
  clientsModelled: { id: 'clientsModelled', value: 5000, label: 'clients modelled' },
  partnerships: { id: 'partnerships', value: 8, suffix: '+', label: 'partnerships secured' },
  jpm: { id: 'jpm', value: 1, text: '1st', label: 'JPMorgan design contest' },
}
