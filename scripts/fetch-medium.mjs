import { writeFileSync } from 'node:fs'

const FEED = 'https://medium.com/feed/@anjali.rawat8181'
const PRODUCT = ['product-design', 'product-development', 'ui-ux', 'ui-ux-design', 'user-experience', 'product-management']

const text = (s) =>
  s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
const pick = (block, tag) => [...block.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => m[1])

try {
  const res = await fetch(FEED, { headers: { 'user-agent': 'portfolio-feed-sync' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const xml = await res.text()
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1])
  const posts = items.map((it) => {
    const cats = pick(it, 'category').map((c) => text(c).toLowerCase())
    const isProduct = cats.some((c) => PRODUCT.includes(c))
    const body = text(pick(it, 'content:encoded')[0] ?? '')
    return {
      title: text(pick(it, 'title')[0] ?? ''),
      url: text(pick(it, 'link')[0] ?? '').split('?')[0],
      date: new Date(text(pick(it, 'pubDate')[0] ?? '')).toISOString().slice(0, 10),
      tag: isProduct ? 'Product' : 'Writing',
      blurb: body.slice(0, 140).replace(/\s+\S*$/, '') + '…',
      lenses: isProduct ? ['product', 'marketing'] : ['marketing'],
    }
  })
  if (!posts.length) throw new Error('feed had no items')
  writeFileSync('src/data/writing.generated.json', JSON.stringify(posts, null, 2) + '\n')
  console.log(`fetch-medium: wrote ${posts.length} post(s)`)
} catch (e) {
  console.warn(`fetch-medium: skipped (${e.message}); keeping committed data`)
}
