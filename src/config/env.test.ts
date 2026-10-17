import { describe, expect, it } from 'vitest'
import { parseEnv } from './env'

describe('parseEnv', () => {
  it('falls back to demo-friendly defaults', () => {
    expect(parseEnv({})).toEqual({
      siteUrl: 'http://localhost:3003',
      dataSource: 'static',
      demoMode: true,
    })
  })

  it('reads explicit values', () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: 'https://mossen.example.com',
      NEXT_PUBLIC_DATA_SOURCE: 'api',
      NEXT_PUBLIC_DEMO_MODE: 'false',
    })
    expect(env).toEqual({
      siteUrl: 'https://mossen.example.com',
      dataSource: 'api',
      demoMode: false,
    })
  })

  it('rejects an unknown data source', () => {
    expect(() => parseEnv({ NEXT_PUBLIC_DATA_SOURCE: 'sqlite' })).toThrow()
  })
})
