import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const fav = readFileSync('public/favicon.svg')
await sharp(fav).resize(32, 32).png().toFile('public/favicon-32.png')
await sharp(fav).resize(180, 180).png().toFile('public/apple-touch-icon.png')

const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFF8E7"/>
  <rect x="100" y="95" width="396" height="495" fill="#000"/>
  <rect x="88" y="83" width="396" height="495" fill="#B388FF" stroke="#000" stroke-width="6"/>
  <rect x="560" y="90" width="230" height="46" fill="#FFD23F" stroke="#000" stroke-width="5"/>
  <text x="675" y="122" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="24" fill="#000">PORTFOLIO</text>
  <text x="560" y="260" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="104" fill="#000">Anjali</text>
  <text x="560" y="365" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="104" fill="#000">Rawat</text>
  <text x="560" y="435" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="34" fill="#111">Builder. Analyst. Product thinker.</text>
  <text x="560" y="480" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="34" fill="#111">Storyteller.</text>
  <text x="560" y="540" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#4B4B4B">Software · Data · Product · Strategy</text>
</svg>`
const cut = await sharp('public/images/hero-cutout.png').resize({ height: 520 }).toBuffer()
const { width: cw } = await sharp(cut).metadata()
await sharp(Buffer.from(bg))
  .composite([{ input: cut, left: Math.round(88 + (396 - cw) / 2), top: 578 - 520 + 3 }])
  .png()
  .toFile('public/og-image.png')
console.log('assets written')
