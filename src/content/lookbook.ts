import type { LookbookContent } from '@/domain'

export const lookbook: LookbookContent = {
  season: 'Autumn / Winter 2026',
  title: 'Under the Birch Canopy',
  description: 'Unbleached linen garments, lichen-washed wools, and hand-cast silver jewelry.',
  looks: [
    {
      id: 'look-01',
      title: 'Look 01 — Unbleached Linen Forager Smock & Heavy Baltic Trouser',
      description: 'Heavy flax linen smock with organic bone toggles, paired with relaxed wide-leg trousers.',
      media: {
        src: '/images/products/mossen/p-201-front.webp',
        alt: 'Model in woodland meadow wearing unbleached linen smock and baltic trousers',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['unbleached-linen-forager-smock', 'heavy-baltic-linen-trouser'],
    },
    {
      id: 'look-02',
      title: 'Look 02 — Raw Wool Duffle Coat & Undyed Field Pant',
      description: 'Storm-resistant heavy untreated Gotland fleece coat layered over natural wool trousers.',
      media: {
        src: '/images/products/mossen/p-217-front.webp',
        alt: 'Model in raw wool duffle coat standing in soft mist',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['raw-wool-duffle-coat', 'undyed-wool-field-pant'],
    },
    {
      id: 'look-03',
      title: 'Look 03 — Gotland Cable Sweater & Pinecone Signet',
      description: 'Dense undyed lanolin-rich knitwear complemented by hand-cast textured silver jewelry.',
      media: {
        src: '/images/products/mossen/p-209-front.webp',
        alt: 'Close-up of gotland wool cable knitwear and hand-cast silver signet ring',
        width: 1200,
        height: 1600,
      },
      productSlugs: ['gotland-fleece-cable-sweater', 'cast-pinecone-silver-signet'],
    },
  ],
}
