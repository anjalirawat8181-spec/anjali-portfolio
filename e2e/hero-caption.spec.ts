import { expect, test } from '@playwright/test'

const FACE = { x0: 0.28, x1: 0.68, y0: 0.08, y1: 0.42 }

for (const width of [360, 768, 1280, 1920]) {
  test(`caption stays off the face and does not move on click @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const block = page.locator('button.photo-block')
    const caption = page.getByTestId('hero-caption')
    await block.scrollIntoViewIfNeeded()

    const measure = async () => {
      const b = (await block.boundingBox())!
      const c = (await caption.boundingBox())!
      return { b, c }
    }

    let first: Awaited<ReturnType<typeof measure>> | undefined
    for (let i = 0; i < 4; i++) {
      const { b, c } = await measure()
      const face = {
        l: b.x + FACE.x0 * b.width,
        r: b.x + FACE.x1 * b.width,
        t: b.y + FACE.y0 * b.height,
        bt: b.y + FACE.y1 * b.height,
      }
      const intersects = c.x < face.r && c.x + c.width > face.l && c.y < face.bt && c.y + c.height > face.t
      expect(intersects, `caption #${i} overlaps face`).toBe(false)
      if (width < 480) expect(c.y).toBeGreaterThanOrEqual(b.y + 0.6 * b.height)
      first ??= { b, c }
      const rel = (v: typeof c, w: typeof b) => ({ r: v.x + v.width - w.x, bt: v.y + v.height - w.y })
      expect(Math.abs(rel(c, b).bt - rel(first.c, first.b).bt)).toBeLessThan(40)
      expect(Math.abs(rel(c, b).r - rel(first.c, first.b).r)).toBeLessThan(8)
      await block.click()
    }
  })
}
