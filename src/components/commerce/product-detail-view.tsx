'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { Gallery } from '@/components/commerce/gallery'
import { ReviewSummary } from '@/components/commerce/review-summary'
import { Check, Heart, Leaf, Star } from '@/components/icons'
import { Button, Price } from '@/components/ui'
import type { Product, Review } from '@/domain'
import { TryOnTrigger } from '@/integration/mirror-try'
import { cn } from '@/lib/cn'
import { useCartStore } from '@/stores/cart-store'
import { useToastStore } from '@/stores/toast-store'
import { useUiStore } from '@/stores/ui-store'
import { selectIsSaved, useWishlistStore } from '@/stores/wishlist-store'

const defaultMoney = { currency: 'USD', locale: 'en-US' } as const

const galleryLabels = {
  group: 'Garment views',
  previous: 'Previous view',
  next: 'Next view',
  position: (current: number, total: number) => `Photograph ${current} of ${total}`,
}

const priceLabels = {
  sale: 'Archive price',
  original: 'Natural price',
}

const emptySubscribe = () => () => {}

interface ProductDetailViewProps {
  product: Product
  reviews: Review[]
  relatedProducts: Product[]
  allCatalogProducts?: Product[]
}

export function ProductDetailView({
  product,
  reviews,
  relatedProducts,
  allCatalogProducts = [],
}: ProductDetailViewProps) {
  // Option selection state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const group of product.optionGroups) {
      if (group.values.length > 0) {
        initial[group.key] = group.values[0]!.value
      }
    }
    return initial
  })

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details')
  const [justAdded, setJustAdded] = useState(false)

  // Wishlist state with hydration safety
  const saved = useWishlistStore(selectIsSaved(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggle)
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  // Track product view in UI store
  const recordProductView = useUiStore((state) => state.recordProductView)
  const recentlyViewedIds = useUiStore((state) => state.recentlyViewedIds)

  useEffect(() => {
    recordProductView(product.id)
  }, [product.id, recordProductView])

  // Find matching variant
  const selectedVariant =
    product.variants.find((v) =>
      Object.entries(selectedOptions).every(
        ([key, val]) => v.options[key] === val || v.options[key.toLowerCase()] === val,
      ),
    ) ?? product.variants[0]!

  const isOutOfStock = selectedVariant.stock === 0
  const effectivePrice = selectedVariant.price ?? product.price

  const handleOptionChange = (groupKey: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupKey]: value,
    }))
  }

  const handleAddToBasket = () => {
    if (isOutOfStock) return

    useCartStore.getState().add({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
    })

    useToastStore.getState().showToast({
      message: `Added ${product.name} to Basket`,
      type: 'success',
    })

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)

    // Open cart drawer
    useUiStore.getState().openPanel('cart')
  }

  // Calculate review statistics
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((r) => {
    const star = Math.min(Math.max(r.rating, 1), 5) as 1 | 2 | 3 | 4 | 5
    distribution[star] = (distribution[star] || 0) + 1
  })

  // Filter recently viewed items from catalog
  const recentlyViewedProducts = isHydrated
    ? recentlyViewedIds
        .filter((id) => id !== product.id)
        .map((id) => allCatalogProducts.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined)
        .slice(0, 4)
    : []

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="font-serif text-xs text-ink-soft">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">
              Atelier
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/shop" className="hover:text-ink">
              Collection
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/shop/${product.category}`} className="hover:text-ink capitalize">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink line-clamp-1">{product.name}</li>
        </ol>
      </nav>

      {/* Main Two-Column PDP Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="rounded-[36px] border border-border bg-surface p-4 shadow-sm">
            <Gallery media={product.media} labels={galleryLabels} />
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Badges & Subcategory */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-serif text-xs text-brand">
              {product.subcategory}
            </span>
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  'rounded-full px-3 py-0.5 font-serif text-[11px] tracking-wide',
                  badge === 'sale'
                    ? 'bg-danger text-on-danger'
                    : 'border border-border bg-canvas text-ink',
                )}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
            {product.name}
          </h1>

          {/* Price & Reviews Anchor */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <Price
              amount={effectivePrice}
              compareAt={product.compareAtPrice}
              currency={defaultMoney.currency}
              locale={defaultMoney.locale}
              labels={priceLabels}
              className="text-2xl font-bold"
            />

            {product.rating ? (
              <a
                href="#reviews"
                className="flex items-center gap-1.5 font-serif text-xs text-ink-soft hover:text-ink transition"
              >
                <div className="flex text-brand">
                  <Star weight="regular" size={14} />
                </div>
                <span className="font-semibold text-ink">{product.rating.average.toFixed(1)}</span>
                <span>({product.rating.count})</span>
              </a>
            ) : null}
          </div>

          {/* Summary */}
          <p className="font-text text-sm md:text-base text-ink-soft leading-relaxed">
            {product.summary}
          </p>

          {/* Option Pickers */}
          <div className="space-y-4 pt-2">
            {product.optionGroups.map((optGroup) => {
              const groupKey = optGroup.key
              const currentValue = selectedOptions[groupKey]

              return (
                <div key={optGroup.key} className="space-y-2">
                  <div className="flex items-center justify-between font-serif text-xs">
                    <span className="font-semibold text-ink">
                      {optGroup.label}: <span className="font-normal text-ink-soft">{currentValue}</span>
                    </span>
                    {optGroup.kind === 'size' ? (
                      <Link href="/size-guide" className="text-ink-soft underline hover:text-ink">
                        Fit & Dimensions
                      </Link>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {optGroup.values.map((val) => {
                      const isSelected = currentValue === val.value

                      return (
                        <button
                          key={val.value}
                          type="button"
                          onClick={() => handleOptionChange(optGroup.key, val.value)}
                          className={cn(
                            'h-10 min-w-10 rounded-full border px-4 font-serif text-xs transition-all duration-200 focus-visible:outline-2 focus-visible:outline-focus',
                            isSelected
                              ? 'border-brand bg-brand text-on-brand shadow-sm scale-102'
                              : 'border-border bg-canvas text-ink hover:border-brand',
                          )}
                        >
                          {val.value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <label htmlFor="pdp-quantity" className="font-serif text-xs font-semibold text-ink">
                Quantity:
              </label>
              <div className="flex items-center rounded-full border border-border bg-surface p-1">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-7 w-7 rounded-full text-ink flex items-center justify-center disabled:opacity-30 hover:bg-ink/10"
                >
                  -
                </button>
                <span className="w-8 text-center font-serif text-xs font-bold text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= 10}
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="h-7 w-7 rounded-full text-ink flex items-center justify-center disabled:opacity-30 hover:bg-ink/10"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToBasket}
                className="flex-1 rounded-full shadow-sm text-sm font-serif"
              >
                {justAdded ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} /> Added to Basket
                  </span>
                ) : isOutOfStock ? (
                  'Currently Resting (Sold Out)'
                ) : (
                  'Add to Basket'
                )}
              </Button>

              {/* Mirror Try Trigger */}
              <TryOnTrigger
                product={product}
                variantId={selectedVariant.id}
                source="pdp"
                className="rounded-full border border-border bg-surface px-5 py-3 text-xs font-serif shadow-sm hover:scale-102 transition"
              />

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label={saved ? 'Remove from collection' : 'Save to collection'}
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  'h-12 w-12 rounded-full border border-border bg-surface flex items-center justify-center text-ink transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-focus',
                  isHydrated && saved && 'text-danger',
                )}
              >
                <Heart weight={isHydrated && saved ? 'fill' : 'regular'} size={20} />
              </button>
            </div>
          </div>

          {/* Service assurances */}
          <div className="grid grid-cols-2 gap-3 pt-4 font-serif text-xs text-ink-soft">
            <div className="flex items-center gap-2">
              <Leaf size={14} className="text-brand shrink-0" />
              <span>Free Nordic delivery over $150</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf size={14} className="text-brand shrink-0" />
              <span>Complimentary mending guarantee</span>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="rounded-[28px] border border-border bg-surface p-6 space-y-4">
            <div className="flex gap-4 border-b border-border pb-2">
              {(['details', 'materials', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'font-serif text-xs font-semibold transition pb-1',
                    activeTab === tab
                      ? 'border-b-2 border-brand text-ink'
                      : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {tab === 'details'
                    ? 'Garment Notes'
                    : tab === 'materials'
                      ? 'Natural Fiber & Care'
                      : 'Careful Dispatch'}
                </button>
              ))}
            </div>

            <div className="font-text text-sm text-ink-soft leading-relaxed min-h-[100px]">
              {activeTab === 'details' ? (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1 font-serif text-xs">
                    {product.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : activeTab === 'materials' ? (
                <div className="space-y-3">
                  <p className="font-semibold text-ink font-serif text-xs">Botanical & Fiber Origin: {product.materials}</p>
                  <ul className="list-disc pl-5 space-y-1 font-serif text-xs">
                    {product.care.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2 font-serif text-xs">
                  <p>• Dispatched from Copenhagen atelier in 100% plastic-free seed paper packaging.</p>
                  <p>• Climate priority delivery: 3–5 business days ($8, free over $150).</p>
                  <p>• Express courier: 1–2 business days ($18 flat rate).</p>
                  <p>• Lifetime complimentary mending service at all MOSSEN workshops.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews" aria-labelledby="reviews-heading" className="space-y-8 pt-8 border-t border-border">
        <h2 id="reviews-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
          Quiet Notes from Wearers
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 rounded-[28px] border border-border bg-surface p-6 sticky top-24">
            <ReviewSummary
              rating={product.rating ?? { average: 5, count: reviews.length }}
              distribution={distribution}
              labels={{
                heading: 'Wearer Experiences',
                outOf: (avg) => `${avg} out of 5 stars`,
                count: (cnt) => `From ${cnt} authentic reflections`,
                stars: (s, c) => `${s} stars: ${c}`,
              }}
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="rounded-[24px] border border-border bg-surface p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xs font-bold text-ink">{rev.author}</span>
                    {rev.verified ? (
                      <span className="inline-flex items-center gap-1 font-serif text-[10px] text-brand">
                        <Leaf size={10} /> Verified Wearer
                      </span>
                    ) : null}
                  </div>
                  <span className="font-serif text-[11px] text-ink-faint">
                    {new Date(rev.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={12}
                      weight={idx < rev.rating ? 'fill' : 'regular'}
                      className={idx < rev.rating ? 'text-brand fill-brand' : 'text-ink/20'}
                    />
                  ))}
                </div>

                <h3 className="font-display text-sm font-bold text-ink">{rev.title}</h3>
                <p className="font-text text-xs text-ink-soft leading-relaxed">{rev.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Rail */}
      {relatedProducts.length > 0 ? (
        <section aria-labelledby="related-heading" className="space-y-8 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="related-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
                Harmonious Pieces
              </h2>
              <p className="mt-1 font-text text-sm text-ink-soft">
                Garments dyed from the same seasonal bath and Baltic flax harvests
              </p>
            </div>
            <Link
              href={`/shop/${product.category}`}
              className="font-serif text-xs text-brand hover:underline"
            >
              Explore Category
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((rel) => (
              <ConnectedProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Recently Viewed Rail */}
      {recentlyViewedProducts.length > 0 ? (
        <section aria-labelledby="recent-heading" className="space-y-8 pt-8 border-t border-border">
          <h2 id="recent-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
            Recently Contemplated
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recentlyViewedProducts.map((rec) => (
              <ConnectedProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
