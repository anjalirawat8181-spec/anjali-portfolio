export interface SkillGroup {
  id: string
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'data',
    title: 'Data & Analytics',
    items: ['SQL', 'PostgreSQL', 'SQL Server', 'MongoDB', 'ETL', 'Star Schema', 'Window Functions', 'CTEs', 'Data Quality', 'KPI Reporting', 'Pandas', 'Excel'],
  },
  { id: 'programming', title: 'Programming', items: ['Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript'] },
  { id: 'development', title: 'Development', items: ['React.js', 'Node.js', 'FastAPI', 'REST APIs', 'HTML', 'CSS'] },
  { id: 'tools', title: 'Tools & Cloud', items: ['Git', 'GitHub Actions (CI/CD)', 'JIRA', 'AWS', 'Postman', 'Figma'] },
  {
    id: 'product',
    title: 'Product & Strategy',
    items: ['BRDs', 'User Stories', 'KPI Dictionaries', 'Market Research', 'Stakeholder Insights'],
  },
  { id: 'design', title: 'Design', items: ['Figma', 'UI/UX', 'Brand Strategy'] },
]
