import type { Category } from '@/domain'

export const categories: Category[] = [
  {
    slug: 'clothing',
    name: 'Clothing',
    description: 'Raw unbleached linen, undyed British wool, lichen dyes, and tactile botanical layers.',
    subcategories: [
      { slug: 'tops', name: 'Tops & Smocks' },
      { slug: 'knitwear', name: 'Knitwear' },
      { slug: 'sweatshirts', name: 'Pullovers & Hoodies' },
      { slug: 'outerwear', name: 'Outerwear' },
      { slug: 'trousers', name: 'Trousers' },
      { slug: 'skirts', name: 'Skirts' },
    ],
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Hand-loomed wild silk scarves, vegetable-tanned field totes, and boiled wool beanies.',
    subcategories: [
      { slug: 'bags', name: 'Bags & Totes' },
      { slug: 'scarves', name: 'Scarves' },
      { slug: 'hats', name: 'Beanies & Hats' },
    ],
  },
  {
    slug: 'jewelry',
    name: 'Jewelry',
    description: 'Cast silver and unrefined bronze cast from sea stones, lichens, and seed pods.',
    subcategories: [
      { slug: 'rings', name: 'Rings' },
      { slug: 'pendants', name: 'Pendants' },
      { slug: 'bracelets', name: 'Bracelets & Cuffs' },
      { slug: 'earrings', name: 'Earrings' },
    ],
  },
]
