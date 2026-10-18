import type { HomeContent } from '@/domain'

export const home: HomeContent = {
  hero: {
    eyecatch: 'Wear the quiet.',
    headline: 'Botanical garments woven from unbleached linen and wild forest moss.',
    body: 'Clothing shaped by hand from unbleached flax, raw pasture wool, and organic botanical dye baths. Designed to breathe and age with grace.',
    cta: { label: 'Shop the collection', href: '/shop' },
    media: {
      src: '/images/home/hero.webp',
      alt: 'A wool duffle coat, a linen smock and a knit, laid out on a soft moss-grey backdrop with a branch',
      width: 1920,
      height: 1080,
    },
  },
  featuredRail: {
    title: 'Made slowly',
    subtitle: 'Quiet upper-body pieces, cut for a soft natural drape.',
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
        src: '/images/home/category-clothing.webp',
        alt: 'A raw wool duffle coat in peat brown on a soft moss-grey backdrop',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'accessories',
      title: 'Accessories',
      subtitle: 'Vegetable-tanned leather & hand-loomed silk',
      media: {
        src: '/images/home/category-accessories.webp',
        alt: 'A vegetable-tanned tote bag above a wool beanie on a soft moss-grey backdrop',
        width: 800,
        height: 1067,
      },
    },
    {
      slug: 'jewelry',
      title: 'Jewelry',
      subtitle: 'Cast pinecone silver & unrefined bronze',
      media: {
        src: '/images/home/category-jewelry.webp',
        alt: 'A pinecone silver signet ring above a bronze lichen pendant on a soft moss-grey backdrop',
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
      src: '/images/home/editorial.webp',
      alt: 'Close view of the collar and buttons of a botanical indigo hemp overshirt',
      width: 1200,
      height: 800,
    },
    cta: { label: 'Read our field journal', href: '/journal/botanical-dye-vats' },
  },
  mirrorTryExplainer: {
    title: 'See how it falls before you order',
    subtitle: 'Preview the drape and the soft shoulder of each piece on your own proportions.',
    steps: [
      {
        step: 1,
        title: 'Choose a piece',
        description: 'Find Try on under any smock, sweater, coat or skirt.',
      },
      {
        step: 2,
        title: 'Open the fitting window',
        description: 'Turn on your camera and let it read your size, or add your own.',
      },
      {
        step: 3,
        title: 'Watch it settle',
        description: 'Move a little to see the ease, then save the trial for later.',
      },
    ],
    cta: { label: 'Open Mirror Try' },
  },
  journalTeasers: {
    title: 'Field Notes',
    postSlugs: ['dew-retting-baltic-flax', 'botanical-dye-vats'],
  },
  newsletter: {
    title: 'Seasonal Letter',
    description:
      'Reflections from the woodland studio, seasonal harvests, and small-batch dye release notices.',
    placeholder: 'Email address',
    cta: 'Subscribe',
  },
}
