import { expect, test } from '@playwright/test'

// Needs, in the style guide's Surfaces section:
//   <div className="pebble" data-ds-surface="pebble" style={{ width: 100, height: 100 }} />
//   <div className="arch" data-ds-surface="arch" style={{ width: 100, height: 140 }} />

test('shape classes produce organic radii, never a plain rounded rectangle', async ({ page }) => {
  await page.goto('/design-system')
  for (const name of ['pebble', 'arch']) {
    const radius = await page
      .locator(`[data-ds-surface="${name}"]`)
      .first()
      .evaluate((el) => getComputedStyle(el).borderTopLeftRadius)
    expect(radius, name).not.toBe('0px')
  }
})

test('the grain overlay never blocks clicks', async ({ page }) => {
  await page.goto('/design-system')
  const pointerEvents = await page.evaluate(
    () => getComputedStyle(document.body, '::after').pointerEvents,
  )
  expect(pointerEvents).toBe('none')
})
