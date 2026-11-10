import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { profile } from './src/data/profile'
import { links, isMissing } from './src/data/links'

const raw = process.env.SITE_URL?.trim()
const site = raw ? raw.replace(/\/*$/, '/') : ''

function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(_html, ctx) {
      if (!/index\.html$/.test(ctx.filename)) return
      const sameAs = [links.github.url, links.linkedin.url, links.medium.url].filter((u) => !isMissing(u))
      const jsonld: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: 'Computer Engineering student',
        alumniOf: { '@type': 'CollegeOrUniversity', name: profile.education.school },
        address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
        sameAs,
      }
      if (site) {
        jsonld.url = site
        jsonld.image = site + profile.aboutPhoto.ogImage
      }
      const tags: HtmlTagDescriptor[] = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonld), injectTo: 'head' },
      ]
      if (site) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: site }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: site }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: site + 'og-image.png' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: site + 'og-image.png' }, injectTo: 'head' },
        )
      }
      return tags
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *
Allow: /
${site ? `Sitemap: ${site}sitemap.xml
` : ''}`,
      })
      if (!site) return
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site}</loc></url></urlset>
`,
      })
    },
  }
}

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), seo()],
  build: { rollupOptions: { input: { main: resolve(__dirname, 'index.html'), notFound: resolve(__dirname, '404.html') } } },
})
