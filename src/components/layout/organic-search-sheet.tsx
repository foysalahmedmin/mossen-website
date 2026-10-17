'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, MagnifyingGlass, X } from '@/components/icons'
import { brand } from '@/config/brand'
import type { Product } from '@/domain'
import { formatMoney } from '@/domain/money'
import { searchProductsAction } from '@/features/catalog/actions'
import { useUiStore } from '@/stores/ui-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

export function OrganicSearchSheet() {
  const open = useUiStore((s) => s.open === 'search')
  const closePanel = useUiStore((s) => s.closePanel)
  const recentSearches = useUiStore((s) => s.recentSearches)
  const addRecentSearch = useUiStore((s) => s.addRecentSearch)
  const clearRecentSearches = useUiStore((s) => s.clearRecentSearches)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setQuery('')
    closePanel()
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) return

    let cancelled = false
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const items = await searchProductsAction(trimmed)
        if (!cancelled) setResults(items)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  if (!open) return null

  const displayedResults = query.trim() ? results : []
  const isSearching = query.trim() ? loading : false

  const handleSelectProduct = (product: Product) => {
    addRecentSearch(product.name)
    handleClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search garments and jewelry"
      className="animate-in fade-in bg-peat/30 fixed inset-0 z-50 flex items-start justify-center px-4 pt-12 backdrop-blur-sm duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="pebble w-full max-w-3xl border border-border-strong/30 bg-surface/98 p-6 shadow-2xl sm:p-8">
        {/* Search Input Bar */}
        <div className="flex items-center gap-4 border-b border-river/30 pb-4">
          <MagnifyingGlass size={24} className="shrink-0 text-brand" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search linen, wool, jewelry..."
            aria-label="Search garments and jewelry"
            className="w-full bg-transparent font-display text-xl font-normal text-ink placeholder:text-ink-faint focus:outline-none sm:text-2xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear query"
              className="pebble p-1.5 text-ink-soft hover:text-ink"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            className="pebble p-2 text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto pr-1">
          {query.trim() === '' ? (
            <div>
              {recentSearches.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between pb-2 font-mono text-xs tracking-wider text-ink-soft uppercase">
                    <span>Recent Searches</span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs underline hover:text-ink"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="pebble border border-border-strong/30 bg-canvas/60 px-3.5 py-1.5 font-text text-xs text-ink hover:bg-canvas"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Leaf size={28} className="sway mx-auto text-brand/60" aria-hidden="true" />
                  <p className="mt-3 font-display text-lg text-ink">Search the calm edit</p>
                  <p className="mt-1 font-text text-xs text-ink-soft">
                    Discover small-batch linen, felted wool outerwear, and oxidised stone jewelry.
                  </p>
                </div>
              )}
            </div>
          ) : isSearching ? (
            <div className="py-12 text-center font-mono text-xs tracking-wider text-ink-soft">
              SEARCHING ARCHIVE...
            </div>
          ) : displayedResults.length === 0 ? (
            <div className="py-12 text-center font-text text-sm text-ink-soft">
              No garments or pieces found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {displayedResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => handleSelectProduct(product)}
                  className="pebble group flex items-center gap-4 border border-border-strong/20 bg-canvas/40 p-3 transition-all hover:bg-canvas"
                >
                  {product.media[0] ? (
                    <div className="pebble relative h-16 w-16 shrink-0 overflow-hidden bg-surface">
                      <Image
                        src={product.media[0].src}
                        alt={product.media[0].alt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-medium text-ink transition-colors group-hover:text-brand">
                      {product.name}
                    </p>
                    <p className="font-mono text-xs text-ink-soft uppercase">{product.category}</p>
                    <div className="mt-1 font-mono text-xs font-semibold text-brand">
                      {formatMoney(product.price, MONEY)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
