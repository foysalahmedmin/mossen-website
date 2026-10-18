'use client'

import { useState } from 'react'
import { CartLine, FilterPanel, Gallery, ProductCard, ReviewSummary } from '@/components/commerce'
import { Button } from '@/components/ui'
import { OpenMirrorTry, TryOnTrigger } from '@/integration/mirror-try'
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
  name: 'Raw Wool Duffle Coat',
  category: 'clothing',
  subcategory: 'outerwear',
  summary: 'A tailored wool coat with soft shoulders.',
  description: 'A longline coat cut from heavy wool.',
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
      src: '/images/products/mossen/p-201-front.webp',
      alt: 'Raw Wool Duffle Coat, front',
      width: 1200,
      height: 1500,
    },
    {
      src: '/images/products/mossen/p-201-front.webp',
      alt: 'Raw Wool Duffle Coat, back',
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
  category: demoProduct.category,
  subcategory: demoProduct.subcategory,
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
  category: demoProduct.category,
  subcategory: demoProduct.subcategory,
  name: 'Gotland Fleece Cable Sweater',
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
        <h3 className="font-display text-xl font-medium text-ink">Product card</h3>
        <p className="font-text text-sm text-ink-soft">
          The picture runs edge to edge; the name and price sit below it.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            product={demoProduct}
            href={`/products/${demoProduct.slug}`}
            money={money}
            saved={saved}
            onToggleSaved={() => setSaved(!saved)}
            labels={cardLabels}
            tryOnSlot={<TryOnTrigger product={demoProduct} />}
          />
        </div>
      </div>

      {/* Cart Lines */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium text-ink">Cart lines</h3>
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
        <h3 className="font-display text-xl font-medium text-ink">Filter panel</h3>
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
            title: 'Filters',
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
        <h3 className="font-display text-xl font-medium text-ink">Gallery</h3>
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
        <h3 className="font-display text-xl font-medium text-ink">Review summary</h3>
        <ReviewSummary
          rating={demoProduct.rating}
          distribution={{ 5: 18, 4: 4, 3: 2, 2: 0, 1: 0 }}
          labels={{
            heading: 'Customer reviews',
            count: (cnt) => `${cnt} reviews`,
            outOf: (avg) => `${avg} / 5`,
            stars: (st, cnt) => `${st} stars: ${cnt} reviews`,
          }}
        />
      </div>
    </div>
  )
}

export function MirrorTryDemo() {
  return (
    <div className="soft-panel space-y-6 bg-surface p-8">
      <p className="max-w-xl font-text text-sm leading-relaxed text-ink-soft">
        The plugin’s own Try on button looks the same in every store. The store only decides where
        it sits; everything that opens after it belongs to the plugin.
      </p>
      <div className="flex flex-wrap items-end gap-8">
        <div className="space-y-2">
          <span className="block text-xs text-ink-soft">On a product card</span>
          <TryOnTrigger product={demoProduct} />
        </div>
        <div className="space-y-2">
          <span className="block text-xs text-ink-soft">On a product page</span>
          <TryOnTrigger product={demoProduct} size="md" />
        </div>
        <div className="space-y-2">
          <span className="block text-xs text-ink-soft">From store copy, no product</span>
          <Button asChild variant="secondary">
            <OpenMirrorTry>Open Mirror Try</OpenMirrorTry>
          </Button>
        </div>
      </div>
    </div>
  )
}
