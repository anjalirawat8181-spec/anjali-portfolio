import { useLayoutEffect, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ'

export function useScramble(text: string, enabled: boolean, duration = 1000) {
  const [out, setOut] = useState(text)

  useLayoutEffect(() => {
    if (!enabled) {
      setOut(text)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const settled = Math.floor(p * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        const c = text[i]
        s += c === ' ' || i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setOut(s)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, enabled, duration])

  return out
}
