export const links = {
  email: { label: 'Email', url: 'mailto:anjali.rawat8181@gmail.com' },
  phone: { label: 'Phone', url: 'tel:+918169500348' },
  github: { label: 'GitHub', url: 'https://github.com/anjalirawat8181-spec' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/anjali-r2/' },
  portfolio: { label: 'Portfolio (this site)', url: 'TODO_PORTFOLIO_URL' },
  wmDashboard: { label: 'Live dashboard', url: 'TODO_WM_DASHBOARD_URL' },
  wmRepo: { label: 'GitHub repo', url: 'TODO_WM_REPO_URL' },
  settlement: { label: 'Live demo', url: 'TODO_SETTLEMENT_URL' },
  gis: { label: 'Project link', url: 'TODO_GIS_URL' },
  resume: { label: 'Resume', url: '/Anjali_Rawat_Resume.pdf' },
  medium: { label: 'Medium', url: 'https://medium.com/@anjali.rawat8181' },
} as const

export type LinkKey = keyof typeof links

export const isMissing = (url: string) => url.startsWith('TODO_')
export const isExternal = (url: string) => /^https?:\/\//.test(url)

export const resolveUrl = (url: string) =>
  url.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + url : url
