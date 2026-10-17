'use client'

import { useState } from 'react'
import { CartLine, FilterPanel, Gallery, ProductCard, ReviewSummary } from '@/components/commerce'
import { Price } from '@/components/ui'
import { TryOnTrigger } from '@/integration/mirror-try'
import type { Product } from '@/domain'
import { DEFAULT_QUERY } from '@/domain'
import type { QuoteLine } from '@/features/cart/quote'

const money = { currency: 'USD', locale: 'en-US' } as const

const cardLabels = {
  sale: 'Sale price',
  original: 'Original price',
  save: 'Save to wishlist',
  badges: { new: 'New', bestseller: 'Bestseller', limited: 'Limited', sale: 'Sale' },
}

const demoProduct: Product = {
  id: 'prod-ds-1',
  slug: 'longline-coat',
  name: 'Longline Coat',
  category: 'clothing',
  subcategory: 'outerwear',
  summary: 'Architectural tailored wool coat with structured shoulders.',
  description: 'Precision-cut industrial longline coat crafted from premium heavy wool.',
  details: [
    'Structured silhouette with sharp notch lapels',
    'Concealed horn button placket',
    'Deep welt pockets with reinforced stitching',
  ],
  materials: '100% Virgin Wool, Cupro Lining',
  care: ['Specialist dry clean only', 'Do not bleach'],
  price: 42000,
  compareAtPrice: 52000,
  media: [
    {
      src: '/images/placeholder.svg',
      alt: 'Longline Coat, front',
      width: 1200,
      height: 1500,
    },
    {
      src: '/images/placeholder.svg',
      alt: 'Longline Coat, back',
      width: 1200,
      height: 1500,
    },
  ],
  optionGroups: [
    {
      key: 'size',
      label: 'Size',
      kind: 'size',
      values: [{ value: 'S' }, { value: 'M' }, { value: 'L' }],
    },
    {
      key: 'color',
      label: 'Color',
      kind: 'color',
      values: [{ value: 'Charcoal', swatch: '#2B2D2F' }],
    },
  ],
  variants: [
    {
      id: 'v1',
      sku: 'MOS-COAT-01-S',
      options: { size: 'S', color: 'Charcoal' },
      stock: 5,
      price: 42000,
    },
  ],
  badges: ['sale', 'new'],
  rating: { average: 4.8, count: 24 },
  tags: ['coat', 'outerwear', 'calm'],
  collectionSlugs: ['new-season'],
  featured: true,
  createdAt: '2026-01-01T00:00:00.000Z',
}

const sampleQuoteLine: QuoteLine = {
  productId: demoProduct.id,
  variantId: 'v1',
  slug: demoProduct.slug,
  name: demoProduct.name,
  image: demoProduct.media[0]!,
  options: { Color: 'Lichen', Size: 'M' },
  quantity: 2,
  unitPrice: 42000,
  lineTotal: 84000,
}

const outOfStockLine: QuoteLine = {
  productId: demoProduct.id,
  variantId: 'v2',
  slug: demoProduct.slug,
  name: 'Merino Wool Knit',
  image: demoProduct.media[0]!,
  options: { Color: 'Sand', Size: 'L' },
  quantity: 0,
  unitPrice: 16000,
  lineTotal: 0,
  issue: 'out-of-stock',
}

export function CommerceDemos() {
  const [saved, setSaved] = useState(false)
  const [filterQuery, setFilterQuery] = useState(DEFAULT_QUERY)

  return (
    <div className="space-y-12">
      {/* Product Cards Grid */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium text-ink">Product Card (Mask as Card)</h3>
        <p className="font-text text-sm text-ink-soft">
          No outer container box. The organic shape mask is the card, typography sits below.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            product={demoProduct}
            href={`/products/${demoProduct.slug}`}
            money={money}
            saved={saved}
            onToggleSaved={() => setSaved(!saved)}
            labels={cardLabels}
            tryOnSlot={<TryOnTrigger product={demoProduct} source="plp" />}
          />
        </div>
      </div>

      {/* Cart Lines */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium text-ink">Cart Lines (Soft Panel List)</h3>
        <ul role="list" className="space-y-4">
          <CartLine
            line={sampleQuoteLine}
            href={`/products/${sampleQuoteLine.slug}`}
            money={money}
            onQuantityChange={() => {}}
            onRemove={() => {}}
            labels={{
              quantity: {
                group: 'Quantity',
                decrease: 'Decrease quantity',
                increase: 'Increase quantity',
              },
              remove: 'Remove',
              outOfStock: 'Out of stock',
              limitedStock: 'Only 2 items left in atelier',
            }}
          />

          <CartLine
            line={outOfStockLine}
            href={`/products/${outOfStockLine.slug}`}
            money={money}
            onQuantityChange={() => {}}
            onRemove={() => {}}
            labels={{
              quantity: {
                group: 'Quantity',
                decrease: 'Decrease quantity',
                increase: 'Increase quantity',
              },
              remove: 'Remove',
              outOfStock: 'Out of stock',
              limitedStock: 'Only 2 items left',
            }}
          />
        </ul>
      </div>

      {/* Filter Panel */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium text-ink">Refine Filter Panel</h3>
        <FilterPanel
          facets={{
            subcategories: [
              { slug: 'outerwear', count: 8 },
              { slug: 'knitwear', count: 12 },
              { slug: 'tailoring', count: 6 },
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: [
              { value: 'Lichen', swatch: '#C5D4B8' },
              { value: 'Moss', swatch: '#354E38' },
              { value: 'River', swatch: '#8DA1A6' },
              { value: 'Sand', swatch: '#D8D4C8' },
            ],
            priceRange: { min: 4000, max: 95000 },
          }}
          query={filterQuery}
          money={money}
          onChange={(patch) => setFilterQuery((prev) => ({ ...prev, ...patch }))}
          onClear={() => setFilterQuery(DEFAULT_QUERY)}
          labels={{
            title: 'Refine Pieces',
            subcategory: 'Category',
            size: 'Size',
            colour: 'Colour',
            price: 'Price Range',
            onSale: 'Sale pieces only',
            minPrice: 'Min Price',
            maxPrice: 'Max Price',
            clear: 'Reset',
          }}
        />
      </div>

      {/* Arch Gallery */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium text-ink">Arch Gallery (Pebble Nav)</h3>
        <div className="max-w-md">
          <Gallery
            media={demoProduct.media}
            labels={{
              group: 'Garment images',
              previous: 'Previous photo',
              next: 'Next photo',
              position: (cur, tot) => `Piece ${cur} of ${tot}`,
            }}
          />
        </div>
      </div>

      {/* Review Summary */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium text-ink">Review Summary (Moss Fill)</h3>
        <ReviewSummary
          rating={demoProduct.rating}
          distribution={{ 5: 18, 4: 4, 3: 2, 2: 0, 1: 0 }}
          labels={{
            heading: 'Atelier Feedback',
            count: (cnt) => `Based on ${cnt} artisan reviews`,
            outOf: (avg) => `${avg} / 5`,
            stars: (st, cnt) => `${st} stars: ${cnt} patrons`,
          }}
        />
      </div>
    </div>
  )
}

export function MirrorTryDemo() {
  return (
    <div className="soft-panel space-y-4 rounded-[32px] bg-surface p-8">
      <div className="max-w-xl space-y-2">
        <h3 className="font-display text-xl font-medium text-ink">The Window (Mirror Try)</h3>
        <p className="font-text text-sm leading-relaxed text-ink-soft">
          In Phase 2, the trigger button is themed as an organic lichen pebble chip with moss-deep
          text, lifting 2px on hover. The full arch window frame lands in Phase 7.
        </p>
      </div>

      <div className="pt-2">
        <TryOnTrigger product={demoProduct} source="pdp" />
      </div>
    </div>
  )
}
