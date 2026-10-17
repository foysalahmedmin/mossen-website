import type { CurrencyCode } from '@/domain/money'

// The only brand-specific TypeScript file in the shared baseline.
export const brand = {
  id: 'mossen',
  name: 'MOSSEN',
  tagline: 'Wear the quiet.',
  description: 'Natural-fibre clothing, soft accessories and hand-finished stone jewelry.',
  locale: 'en-US',
  currency: 'USD' as CurrencyCode,
  taxRate: 0.08,
  contactEmail: 'hello@mossen.example',
  cartNoun: 'Basket',
} as const

export type Brand = typeof brand
