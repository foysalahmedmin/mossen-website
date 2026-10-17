'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { FilterChips, type FilterChip } from '@/components/commerce/filter-chips'
import { FilterPanel } from '@/components/commerce/filter-panel'
import type { FilterPanelProps } from '@/components/commerce/contract'
import { ArrowLeft, ArrowRight } from '@/components/icons'
import { Button } from '@/components/ui'
import type { Facets, Product, ProductQuery, SortKey } from '@/domain'
import { serializeProductQuery } from '@/features/catalog/query-params'
import { cn } from '@/lib/cn'

const defaultFilterLabels: FilterPanelProps['labels'] = {
  title: 'Filters',
  subcategory: 'Garment Form',
  size: 'Sizing',
  colour: 'Botanical Hue',
  price: 'Exchange Value',
  onSale: 'Seasonal Archives',
  minPrice: 'Lowest Value',
  maxPrice: 'Highest Value',
  clear: 'Clear All',
}

const defaultMoney = { currency: 'USD', locale: 'en-US' } as const

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Curated Order' },
  { value: 'newest', label: 'Recent Harvest' },
  { value: 'price-asc', label: 'Value: Low to High' },
  { value: 'price-desc', label: 'Value: High to Low' },
]

interface ProductListViewProps {
  products: Product[]
  total: number
  facets: Facets
  query: ProductQuery
  title: string
  description?: string
  basePath: string
}

export function ProductListView({
  products,
  total,
  facets,
  query,
  title,
  description,
  basePath,
}: ProductListViewProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navigateWith = (partial: Partial<ProductQuery>) => {
    const next: ProductQuery = {
      ...query,
      ...partial,
      page: partial.page ?? (partial.sort ? query.page : 1),
    }
    const queryString = serializeProductQuery(next)
    startTransition(() => {
      router.push(queryString ? `${basePath}?${queryString}` : basePath)
    })
  }

  // Build active filter chips
  const chips: FilterChip[] = []
  if (query.subcategory) {
    chips.push({ key: 'subcategory', label: `Form: ${query.subcategory}` })
  }
  if (query.sizes?.length) {
    query.sizes.forEach((s) => chips.push({ key: `size:${s}`, label: `Size: ${s}` }))
  }
  if (query.colors?.length) {
    query.colors.forEach((c) => chips.push({ key: `color:${c}`, label: `Tone: ${c}` }))
  }
  if (query.minPrice !== undefined) {
    chips.push({ key: 'minPrice', label: `Min: $${query.minPrice / 100}` })
  }
  if (query.maxPrice !== undefined) {
    chips.push({ key: 'maxPrice', label: `Max: $${query.maxPrice / 100}` })
  }
  if (query.onSale) {
    chips.push({ key: 'onSale', label: 'Archive Pieces' })
  }

  const handleRemoveChip = (key: string) => {
    if (key === 'subcategory') navigateWith({ subcategory: undefined })
    else if (key.startsWith('size:')) {
      const s = key.replace('size:', '')
      navigateWith({ sizes: query.sizes?.filter((item) => item !== s) })
    } else if (key.startsWith('color:')) {
      const c = key.replace('color:', '')
      navigateWith({ colors: query.colors?.filter((item) => item !== c) })
    } else if (key === 'minPrice') navigateWith({ minPrice: undefined })
    else if (key === 'maxPrice') navigateWith({ maxPrice: undefined })
    else if (key === 'onSale') navigateWith({ onSale: false })
  }

  const handleClearAll = () => {
    navigateWith({
      subcategory: undefined,
      sizes: [],
      colors: [],
      minPrice: undefined,
      maxPrice: undefined,
      onSale: false,
    })
  }

  const totalPages = Math.ceil(total / query.pageSize)

  return (
    <div className="page-container space-y-8 pb-16">
      {/* Header */}
      <div className="border-border space-y-3 border-b pb-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl font-text text-sm leading-relaxed text-ink-soft md:text-base">
            {description}
          </p>
        ) : null}
        <div className="flex items-center justify-between pt-2">
          <span className="font-serif text-xs text-ink-soft">
            {total} {total === 1 ? 'Garment' : 'Garments'}
          </span>
          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="sr-only">
              Sequence
            </label>
            <select
              id="sort-select"
              value={query.sort}
              onChange={(e) => navigateWith({ sort: e.target.value as SortKey })}
              className="border-border h-10 cursor-pointer rounded-full border bg-surface px-4 font-serif text-xs text-ink focus-visible:outline-2 focus-visible:outline-focus"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface text-ink">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {chips.length > 0 ? (
        <FilterChips
          chips={chips}
          onRemove={handleRemoveChip}
          onClear={handleClearAll}
          clearLabel="Clear filters"
        />
      ) : null}

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        {/* Desktop Filters Sidebar */}
        <aside className="sticky top-24 hidden lg:col-span-1 lg:block">
          <FilterPanel
            facets={facets}
            query={query}
            money={defaultMoney}
            onChange={(next) => navigateWith(next)}
            onClear={handleClearAll}
            labels={defaultFilterLabels}
          />
        </aside>

        {/* Product Grid Area */}
        <div
          className={cn(
            'space-y-8 transition-opacity duration-200 lg:col-span-3',
            isPending && 'opacity-60',
          )}
        >
          {products.length === 0 ? (
            <div className="border-border space-y-4 rounded-[32px] border bg-surface p-12 text-center">
              <h2 className="font-display text-xl font-bold text-ink">No Garments Found</h2>
              <p className="mx-auto max-w-md font-text text-sm text-ink-soft">
                No natural pieces match your specific parameter selection. Clear the filters to
                explore the complete atelier.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={handleClearAll}
                className="rounded-full px-6 font-serif text-xs"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {products.map((product, idx) => (
                <ConnectedProductCard key={product.id} product={product} priority={idx < 4} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 ? (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-4 pt-8">
              <Button
                variant="secondary"
                size="sm"
                disabled={query.page <= 1}
                onClick={() => navigateWith({ page: query.page - 1 })}
                className="rounded-full px-4 font-serif text-xs"
              >
                <ArrowLeft size={14} className="mr-1" />
                <span>Previous</span>
              </Button>

              <span className="font-serif text-xs text-ink-soft">
                Folio {query.page} of {totalPages}
              </span>

              <Button
                variant="secondary"
                size="sm"
                disabled={query.page >= totalPages}
                onClick={() => navigateWith({ page: query.page + 1 })}
                className="rounded-full px-4 font-serif text-xs"
              >
                <span>Next</span>
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  )
}
