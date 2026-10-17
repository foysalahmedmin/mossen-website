import type { HomeContent } from '@/domain'

export const home: HomeContent = {
  hero: {
    eyecatch: 'Wear the quiet.',
    headline: 'Botanical garments woven from unbleached linen and wild forest moss.',
    body: 'Clothing shaped by hand from unbleached flax, raw pasture wool, and organic botanical dye baths. Designed to breathe and age with grace.',
    cta: { label: 'Browse the atelier', href: '/shop' },
    media: {
      src: '/images/products/mossen/p-201-front.webp',
      alt: 'Model in Unbleached Linen Forager Smock standing quietly in a misty birch woodland',
      width: 1920,
      height: 1080,
    },
  },
  featuredRail: {
    title: 'From the Birch Atelier',
    subtitle: 'Quiet upper-body silhouettes crafted for soft natural drape',
    productSlugs: [
      'unbleached-linen-forager-smock',
      'lichen-dyed-silk-tunic',
      'gotland-fleece-cable-sweater',
      'raw-wool-duffle-coat',
    ],
  },
  categories: [
    {
      slug: 'clothing',
      title: 'Clothing',
      subtitle: 'Raw linen, wild wool & smocks',
      media: {
        src: '/images/products/mossen/p-217-front.webp',
        alt: 'Raw wool duffle coat with horn toggle closures',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'accessories',
      title: 'Accessories',
      subtitle: 'Vegetable-tanned leather & hand-loomed silk',
      media: {
        src: '/images/products/mossen/p-228-front.webp',
        alt: 'Heavy vegetable-tanned leather market tote bag',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'jewelry',
      title: 'Jewelry',
      subtitle: 'Cast pinecone silver & unrefined bronze',
      media: {
        src: '/images/products/mossen/p-233-front.webp',
        alt: 'Hand-cast pinecone textured silver signet ring',
        width: 800,
        height: 1067,
      },
    },
  ],
  editorial: {
    title: 'The Living Botanical Palette',
    body: 'Harvested from wild madder roots, black walnut hulls, and coastal lichen, our botanical dye baths ferment slowly in wooden vats, imparting living tones that evolve with ambient light.',
    quote: 'True luxury is the quiet presence of time.',
    media: {
      src: '/images/journal/mossen/botanical-dye.webp',
      alt: 'Copper dye vat simmering with crushed wild madder roots revealing rich terracotta red broth',
      width: 1200,
      height: 800,
    },
    cta: { label: 'Read our field journal', href: '/journal/botanical-dye-vats' },
  },
  mirrorTryExplainer: {
    title: 'Fitting Within The Birch Frame',
    subtitle: 'Experience organic garment drape and soft shoulder volume before ordering',
    steps: [
      {
        step: 1,
        title: 'Choose Piece',
        description: 'Select an unbleached smock, cable sweater, or raw wool coat.',
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
    postSlugs: ['dew-retting-baltic-flax', 'botanical-dye-vats'],
  },
  newsletter: {
    title: 'Seasonal Letter',
    description: 'Reflections from the woodland studio, seasonal harvests, and small-batch dye release notices.',
    placeholder: 'Enter your email address',
    cta: 'Receive Letters',
  },
}
