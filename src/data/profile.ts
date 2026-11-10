const duolingoStreakDays = 450
const matiksStreakDays = 50

export const profile = {
  duolingoStreakDays,
  matiksStreakDays,
  name: 'Anjali Rawat',
  monogram: 'AR',
  location: 'Mumbai, India',
  email: 'anjali.rawat8181@gmail.com',
  phone: '+91 8169500348',
  status: 'Open to Summer 2027 internships',
  heroPhoto: {
    src: 'images/hero-cutout.webp',
    fallback: 'images/hero-cutout.png',
    width: 663,
    height: 860,
    alt: 'Anjali Rawat, smiling, wearing a black blazer',
    hi: 'HI!',
    tag: "Mumbai · FrCRCE '28",
    lines: [
      'Ask me about star schemas.',
      `${duolingoStreakDays}+ day Duolingo streak. Consistency is my cardio.`,
      `${matiksStreakDays}+ days on Matiks. Yes, I do maths for fun.`,
      'Queries 56% faster. Jokes: TBD.',
      'Open to Summer 2027 internships.',
    ],
    hint: 'Press to change the sticker',
  },
  aboutPhoto: {
    src: 'images/about-photo.webp',
    fallback: 'images/about-photo.jpg',
    width: 860,
    height: 1075,
    alt: 'Anjali Rawat, smiling, wearing a black blazer',
    caption: 'Builder. Analyst. Product thinker.',
    ogImage: 'images/about-photo.jpg',
  },
  rotatingWords: ['build', 'analyse', 'ship', 'market', 'design'],
  heroLine:
    'I build software, read the data, think in product, and tell the story. Usually in that order. Sometimes all at once.',
  education: {
    degree: 'B.E. Computer Engineering',
    school: 'Fr. Conceicao Rodrigues College of Engineering (Fr. CRCE)',
    period: 'Sept 2024 – May 2028',
    cgpa: '8.30/10',
    cgpaTip: 'Yes, I also read the documentation.',
    coursework: ['DBMS (SQL)', 'Data Warehousing & Mining', 'DSA', 'Operating Systems', 'Computer Networks'],
  },
  aboutTitle: 'The short version',
  about: [
    "I'm a third-year Computer Engineering student in Mumbai. I work where strategy, product and technology overlap: I build the thing, read the data behind it, and figure out who it's for.",
    'Builder, blogger, product thinker. I care about UI/UX, brand strategy and design as much as I care about a clean schema.',
  ],
  hats: [
    {
      lens: 'sde',
      title: 'SDE',
      proof: "Built the complete UI of Erde Agro's farm app web portal in React and TypeScript, from design to deployment.",
    },
    {
      lens: 'analyst',
      title: 'Analyst',
      proof:
        'Designed a star-schema warehouse of 770K+ records; data-quality rules caught all 18,198 planted defects with zero false positives.',
    },
    {
      lens: 'product',
      title: 'Product',
      proof: 'Authored the BRD, 18 user stories and KPI dictionary for the Wealth Management Client Analytics Platform.',
    },
    {
      lens: 'marketing',
      title: 'Marketing & Strategy',
      proof: 'Ran market research and data analysis across 40+ B2B2C corporate clients at Saventh.',
    },
  ],
  contactLine: 'Got a problem, an internship, or a half-formed idea? Send it over.',
  footerLine: 'Built with React, caffeine, and an unreasonable number of Figma frames.',
  seo: {
    title: 'Anjali Rawat — Software, Data, Product & Strategy',
    description:
      'Portfolio of Anjali Rawat, a Computer Engineering student in Mumbai working across software engineering, data analytics, product and strategy.',
  },
} as const
