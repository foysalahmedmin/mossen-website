import { describe, expect, it } from 'vitest'
import { contrastRatio } from '@/lib/a11y/contrast'
import { filesContaining } from './source-scan'
import { loadTokens } from './tokens'

const tokens = loadTokens()

describe('MOSSEN restraint', () => {
  it('keeps moss readable as text on both fog and birch', () => {
    expect(
      contrastRatio(tokens['--color-brand']!, tokens['--color-canvas']!),
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      contrastRatio(tokens['--color-brand']!, tokens['--color-surface']!),
    ).toBeGreaterThanOrEqual(4.5)
  })

  it('keeps the lichen chip label readable', () => {
    expect(
      contrastRatio(tokens['--color-moss-deep']!, tokens['--color-accent']!),
    ).toBeGreaterThanOrEqual(4.5)
  })

  it('uses river only for decoration, never as text', () => {
    expect(filesContaining('text-river')).toEqual([])
  })

  it('defines the shape tokens', () => {
    for (const name of [
      '--r-pebble',
      '--r-pebble-2',
      '--r-pebble-3',
      '--r-arch',
      '--r-leaf',
      '--r-soft',
    ]) {
      expect(tokens[name], name).toBeDefined()
    }
  })
})
