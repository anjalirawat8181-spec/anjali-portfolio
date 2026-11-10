import { useState } from 'react'
import { profile } from '../data/profile'

const burst = Array.from({ length: 24 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 24 - Math.PI / 2
  const r = i % 2 === 0 ? 48 : 36
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`
}).join(' ')

export function HeroPhoto() {
  const p = profile.heroPhoto
  const base = import.meta.env.BASE_URL
  const [i, setI] = useState(0)

  return (
    <div className="mx-auto mt-12 w-[min(78vw,340px)] lg:mx-0 lg:mt-8 lg:w-full lg:self-start">
      <button
        type="button"
        onClick={() => setI((v) => (v + 1) % p.lines.length)}
        aria-label={`${p.alt}. ${p.hint}.`}
        className="photo-block nb nb-lift relative block w-full bg-accent p-0 text-left"
        style={{ aspectRatio: '4 / 5' }}
      >
        <span aria-hidden="true" className="photo-pattern absolute inset-0" />

        <picture className="absolute inset-x-0 bottom-0 top-[-4%]">
          <source srcSet={base + p.src} type="image/webp" />
          <img
            src={base + p.fallback}
            alt=""
            width={p.width}
            height={p.height}
            fetchPriority="high"
            decoding="async"
            className="photo-cutout h-full w-full object-contain object-bottom"
          />
        </picture>

        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="absolute -right-5 -top-9 h-24 w-24 rotate-12 overflow-visible sm:-right-6 sm:h-28 sm:w-28"
        >
          <polygon points={burst} transform="translate(3 3)" fill="#000" />
          <polygon points={burst} fill="#FFD23F" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
          <text x="50" y="58" textAnchor="middle" fontFamily="Space Grotesk, Arial, sans-serif" fontWeight="700" fontSize="24" fill="#000">
            {p.hi}
          </text>
        </svg>

        <span
          aria-live="polite"
          data-testid="hero-caption"
          className="pointer-events-none absolute -right-[18px] bottom-[9%] z-[3] max-w-[62%] -rotate-3 whitespace-normal border-[3px] border-black bg-white px-2 py-1 font-mono text-[11px] font-bold leading-tight text-black shadow-[3px_3px_0_#000] sm:text-xs"
        >
          {p.lines[i]}
        </span>

        <span
          aria-hidden="true"
          className="absolute -bottom-4 -left-3 rotate-2 border-[3px] border-black bg-[#FFD23F] px-2 py-1 font-mono text-[11px] font-bold text-black shadow-[3px_3px_0_#000] sm:text-xs"
        >
          {p.tag}
        </span>
      </button>
    </div>
  )
}
