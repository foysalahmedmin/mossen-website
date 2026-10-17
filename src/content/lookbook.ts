import type { LookbookContent } from '@/domain'

export const lookbook: LookbookContent = {
  season: 'Autumn / Winter 2026',
  title: 'Under the Birch Canopy',
  description: 'Unbleached linen garments, lichen-washed wools, and river pebble cast jewelry.',
  looks: [
    {
      id: 'look-01',
      title: 'Look 01 — Unbleached Linen Smock & Drawstring Trouser',
      description: 'Heavy flax linen smock with organic raw hem, paired with relaxed drawstring pants.',
      media: {
        src: '/images/products/unbleached-linen-smock-1.webp',
        alt: 'Model in woodland meadow wearing unbleached linen smock',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['unbleached-linen-smock', 'relaxed-linen-drawstring-trouser'],
    },
    {
      id: 'look-02',
      title: 'Look 02 — Lichen Field Coat & Raw Wool Pleated Pant',
      description: 'Storm-resistant heavy waxed linen coat layered over undyed organic wool.',
      media: {
        src: '/images/products/lichen-jacket-1.webp',
        alt: 'Model in heavy waxed lichen field coat in soft rain',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['heavy-waxed-linen-field-coat', 'raw-wool-pleated-trouser'],
    },
    {
      id: 'look-03',
      title: 'Look 03 — Boiled Birch Wool Sweater & River Pebble Ring',
      description: 'Dense undyed wool knitwear complemented by hand-cast recycled sterling silver pebble.',
      media: {
        src: '/images/products/lichen-cardigan-1.webp',
        alt: 'Close-up of boiled wool knitwear and silver jewelry',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['boiled-birch-wool-sweater', 'river-pebble-silver-ring'],
    },
  ],
}
