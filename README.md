# Anjali Rawat — Portfolio

Neo-brutalist skin on Vite + React 18 + TypeScript + Tailwind + Framer Motion. One page, five "lenses" (All / SDE / Analyst / Product / Marketing-Strategy) that re-order and re-colour the content. Share a lens with `?lens=analyst`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # also regenerates MISSING_LINKS.md
npm run preview
```

## Where to change things

All copy lives in `src/data/`. Components never hold content.

| To change… | Edit |
|---|---|
| Any link (LinkedIn, live demos, blog…) | `src/data/links.ts` |
| Name, status pill, About text, "four hats", footer line, SEO title | `src/data/profile.ts` |
| Jobs / mentorship | `src/data/experience.ts` |
| Projects and the WM case study | `src/data/projects.ts` |
| Skill chips | `src/data/skills.ts` |
| Awards, certifications, Rotaract | `src/data/achievements.ts` |
| Blog posts (curated entries; product posts are always listed first) | `src/data/writing.ts` |
| Colours, borders, hard shadows, button/card styles | `src/index.css` (`.nb`, `.card`, `.btn`, `.chip`), `tailwind.config.js` |
| Card colour rotation, marquee words | `src/data/site.ts` |
| Lens taglines, accents, project order, hero stats | `src/data/lenses.ts` |
| Section headings, nav labels, 404 text | `src/data/site.ts` |

**Links:** any value starting with `TODO_` renders as a disabled "Link coming soon" chip and is listed in `MISSING_LINKS.md`. Replace the value with the real URL and it becomes live.

**Resume:** put your PDF at `public/Anjali_Rawat_Resume.pdf`.

**Favicons / OG image:** edit `scripts/make-assets.mjs` and run `node scripts/make-assets.mjs`.

## Writing / Medium sync

`node scripts/fetch-medium.mjs` reads the Medium RSS feed into `src/data/writing.generated.json`. New posts are appended after the curated ones in `writing.ts` (curated blurbs and lens tags always win). Posts whose Medium categories include a product/UX tag are marked **Product**. If the fetch fails, the committed data is used and the build never breaks. The deploy workflow runs it on every deploy and weekly.

## Deploy (GitHub Pages)

1. Push to a GitHub repo's `main` branch.
2. Settings → Pages → Source: **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds with the right `BASE_PATH` and `SITE_URL` (canonical, OG tags, sitemap, JSON-LD are generated from it).

Vercel: import the repo, no config needed (leave `BASE_PATH` unset).

## Shortcuts

`Ctrl/Cmd+K` or `?` opens the command palette. There is also a classic code.
