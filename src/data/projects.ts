import type { LensFilter } from './types'
import type { LinkKey } from './links'

export interface CaseStudy {
  problem: string
  dataModel: string
  built: string[]
  results: { prefix?: string; value: number; decimals?: number; suffix?: string; label: string }[]
  docs: string[]
}

export interface Project {
  id: string
  title: string
  tech: string[]
  bullets: string[]
  primary: LensFilter
  lenses: LensFilter[]
  flagship?: boolean
  hue: number
  linkKeys: LinkKey[]
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    id: 'wm-analytics',
    title: 'Wealth Management Client Analytics Platform',
    tech: ['PostgreSQL', 'SQL', 'Python', 'React Live Dashboard'],
    bullets: [
      'Designed a star-schema warehouse (770K+ records, 5,000 clients, 60 advisors) and built 23 SQL views using CTEs and window functions for AUM, net new money, cohort retention, attrition and churn-risk scoring.',
      'Built an ETL with automated data-quality rules that detected all 18,198 planted defects with zero false positives; recovered planted churners at 0.99 recall; cut a key roll-up query from 60.5 ms to 26.7 ms (-56%) via indexing.',
      'Deployed a 5-page dashboard with a weekly GitHub Actions refresh and Excel report export; authored the BRD, 18 user stories and KPI dictionary.',
    ],
    primary: 'analyst',
    lenses: ['analyst', 'product', 'sde'],
    flagship: true,
    hue: 265,
    linkKeys: ['wmDashboard', 'wmRepo'],
    caseStudy: {
      problem:
        'Turn client, advisor and transaction data into trustworthy numbers: AUM, net new money, cohort retention, attrition and churn-risk.',
      dataModel: 'A star-schema warehouse covering 770K+ records, 5,000 clients and 60 advisors.',
      built: [
        '23 SQL views using CTEs and window functions for AUM, net new money, cohort retention, attrition and churn-risk scoring.',
        'An ETL with automated data-quality rules; indexing cut a key roll-up query from 60.5 ms to 26.7 ms.',
        'A 5-page dashboard with a weekly GitHub Actions refresh and Excel report export.',
      ],
      results: [
        { value: 770, suffix: 'K+', label: 'records modelled' },
        { value: 18198, label: 'planted defects detected, zero false positives' },
        { value: 0.99, decimals: 2, label: 'recall on planted churners' },
        { prefix: '−', value: 56, suffix: '%', label: 'roll-up query time (60.5 ms → 26.7 ms)' },
      ],
      docs: ['BRD', '18 user stories', 'KPI dictionary'],
    },
  },
  {
    id: 'settlement',
    title: 'Settlement Reconciliation Dashboard',
    tech: ['Python', 'React', 'Pandas', 'Streamlit'],
    bullets: [
      'Built a rules-based engine matching broker trades to an internal ledger, flagging six break types with configurable tolerances and notional-based severity levels.',
      'Developed an interactive dashboard with break charts, trends, a filterable table, and CSV upload with schema validation; amounts shown in INR (lakh/crore).',
    ],
    primary: 'analyst',
    lenses: ['analyst', 'sde'],
    hue: 190,
    linkKeys: ['settlement'],
  },
  {
    id: 'gis',
    title: 'Adaptive GIS Traffic Shaping',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'HMM'],
    bullets: [
      'Built an adaptive traffic-shaping prototype (HMM and token-bucket) with a FastAPI backend and React dashboard, benchmarking latency, throughput and queue-wait time.',
    ],
    primary: 'sde',
    lenses: ['sde'],
    hue: 160,
    linkKeys: ['gis'],
  },
  {
    id: 'careers',
    title: 'Careers Management Portal (Erde Agro)',
    tech: ['React', 'TypeScript', 'Full-stack'],
    bullets: [
      'HR creates and publishes job openings via forms; the public careers page updates dynamically; HR can view applications and open uploaded resumes.',
    ],
    primary: 'sde',
    lenses: ['sde', 'product'],
    hue: 35,
    linkKeys: [],
  },
  {
    id: 'farm-app',
    title: 'Farm App Web Portal UI (Erde Agro)',
    tech: ['React', 'TypeScript'],
    bullets: ['Complete UI built from design to deployment.'],
    primary: 'sde',
    lenses: ['sde', 'product'],
    hue: 330,
    linkKeys: [],
  },
]
