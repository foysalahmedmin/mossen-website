import type { HomeContent } from '@/domain'

export const home: HomeContent = {
  hero: {
    eyecatch: 'Wear the quiet.',
    headline: 'Botanical garments woven from unbleached linen and wild forest moss.',
    body: 'Clothing shaped by hand from unbleached flax, raw pasture wool, and organic botanical dye baths. Designed to breathe and age with grace.',
    cta: { label: 'Browse the atelier', href: '/shop' },
    media: {
      src: '/images/products/unbleached-linen-smock-1.webp',
      alt: 'Model in Unbleached Linen Smock standing quietly in a misty birch woodland',
      width: 1920,
      height: 1080,
    },
  },
  featuredRail: {
    title: 'From the Birch Atelier',
    subtitle: 'Quiet upper-body silhouettes crafted for soft natural drape',
    productSlugs: [
      'unbleached-linen-smock',
      'boiled-birch-wool-sweater',
      'lichen-field-jacket',
      'raw-silk-slub-tee',
    ],
  },
  categories: [
    {
      slug: 'clothing',
      title: 'Clothing',
      subtitle: 'Raw linen, wild wool & smocks',
      media: {
        src: '/images/products/lichen-jacket-1.webp',
        alt: 'Waxed heavy linen field jacket detail',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'accessories',
      title: 'Accessories',
      subtitle: 'Raw canvas & birch-tanned pouches',
      media: {
        src: '/images/products/canvas-market-tote-1.webp',
        alt: 'Heavy unbleached canvas market tote',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'jewelry',
      title: 'Jewelry',
      subtitle: 'River pebble silver & hand-cast twigs',
      media: {
        src: '/images/products/pebble-silver-ring-1.webp',
        alt: 'Cast river pebble silver ring on weathered birch wood',
        width: 800,
        height: 1067,
      },
    },
  ],
  editorial: {
    title: 'Dyeing with Forest Lichen',
    body: 'Harvested only from fallen birch bark after spring storms, our lichen dye bath ferments slowly for eight weeks, imparting a subtle mineral-green hue that cannot be synthesised.',
    quote: 'True luxury is the quiet presence of time.',
    media: {
      src: '/images/products/lichen-cardigan-1.webp',
      alt: 'Skeins of pasture wool drying after a natural lichen dye bath',
      width: 1200,
      height: 800,
    },
    cta: { label: 'Read our field journal', href: '/journal/dyeing-with-forest-lichen' },
  },
  mirrorTryExplainer: {
    title: 'Fitting Within The Birch Frame',
    subtitle: 'Experience organic garment drape and soft shoulder volume before ordering',
    steps: [
      {
        step: 1,
        title: 'Choose Piece',
        description: 'Select an unbleached smock, boiled wool knit, or storm coat.',
      },
      {
        step: 2,
        title: 'Enter Birch Frame',
        description: 'Our natural drape simulator honors the organic texture of flax and raw wool.',
      },
      {
        step: 3,
        title: 'Settle Silhouette',
        description: 'Observe natural ease and movement across gentle daylight.',
      },
    ],
    cta: { label: 'Step into The Birch Frame' },
  },
  journalTeasers: {
    title: 'Field Notes',
    postSlugs: ['dyeing-with-forest-lichen', 'quiet-life-of-linen'],
  },
  newsletter: {
    title: 'Seasonal Letter',
    description: 'Reflections from the woodland studio, seasonal harvests, and small-batch dye release notices.',
    placeholder: 'Enter your email address',
    cta: 'Receive Letters',
  },
}
