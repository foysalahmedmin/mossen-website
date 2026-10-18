'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CartLine } from '@/components/commerce/cart-line'
import { ArrowRight } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { quoteCartAction } from '@/features/cart/actions'
import type { Quote, QuoteLine } from '@/features/cart/quote'
import { TryOnTrigger } from '@/integration/mirror-try'
import { useCartStore } from '@/stores/cart-store'
import { useHydrated } from '@/stores/hydration'

const MONEY = { currency: brand.currency, locale: brand.locale }

/** Describes a cart line to the Mirror Try plugin; the cart already knows what each line is. */
const tryOnProductOf = (line: QuoteLine) => ({
  id: line.productId,
  name: line.name,
  category: line.category,
  subcategory: line.subcategory,
  media: [line.image],
})

const LABELS = {
  quantity: { group: 'Quantity', decrease: 'Decrease quantity', increase: 'Increase quantity' },
  remove: 'Remove piece',
  outOfStock: 'Out of stock',
  limitedStock: 'Limited weave remaining',
}

export function CartView() {
  const hydrated = useHydrated()
  const lines = useCartStore((s) => s.lines)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const remove = useCartStore((s) => s.remove)

  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | undefined>()
  const [promoError, setPromoError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState('standard')

  useEffect(() => {
    if (!hydrated) return
    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled) return
      setLoading(true)

      quoteCartAction({
        lines,
        promoCode: appliedPromo,
        shippingMethodId,
      })
        .then((q) => {
          if (!cancelled) {
            setQuote(q)
            setLoading(false)
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false)
        })
    })

    return () => {
      cancelled = true
    }
  }, [hydrated, lines, appliedPromo, shippingMethodId])

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = promoInput.trim().toUpperCase()
    if (!clean) return

    setAppliedPromo(clean)
    setPromoError(null)
  }

  const handleRemovePromo = () => {
    setAppliedPromo(undefined)
    setPromoInput('')
    setPromoError(null)
  }

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="soft-panel mx-auto max-w-md rounded-md border border-river/30 bg-surface/90 p-12">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 text-xs text-ink-soft tabular-nums">Loading basket...</p>
        </div>
      </div>
    )
  }

  const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0)
  const hasItems = lines.length > 0
  const subtotal = quote?.totals.subtotal ?? 0
  const freeThreshold = 15000 // $150
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100))
  const freeRemaining = Math.max(0, freeThreshold - subtotal)

  if (!hasItems) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="soft-panel mx-auto max-w-xl rounded-md border border-river/30 bg-surface/90 p-12">
          <h1 className="font-display text-3xl font-normal text-ink sm:text-4xl">
            Your basket is empty
          </h1>
          <p className="mt-4 font-text text-sm leading-relaxed text-ink-soft sm:text-base">
            Discover unbleached organic linens, hand-spun woolens, and raw silk silhouettes crafted
            in harmony with nature.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.shop}>
                Continue shopping
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={routes.wishlist}>View Saved Pieces</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-river/30 pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-normal text-ink sm:text-4xl">
            Shopping basket ({itemCount})
          </h1>
        </div>
        <Link
          href={routes.shop}
          className="text-xs text-ink-soft tabular-nums transition-colors hover:text-ink"
        >
          &larr; Continue Exploring
        </Link>
      </div>

      {/* Sustainable Shipping Bar */}
      <div className="soft-panel mb-8 rounded-md border border-river/30 bg-surface/90 p-5">
        <div className="flex items-center justify-between text-xs tabular-nums">
          <span className="flex items-center gap-2 text-ink">
            {freeRemaining === 0 ? (
              <span className="font-medium text-ink">Free shipping unlocked</span>
            ) : (
              <span>
                Add <strong className="text-ink">{formatMoney(freeRemaining, MONEY)}</strong> for
                free shipping
              </span>
            )}
          </span>
          <span className="font-semibold text-ink">{freeProgress}%</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-md bg-river/20 p-0.5">
          <div
            className="h-full rounded-md bg-brand transition-all duration-500"
            style={{ width: `${freeProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Basket Lines Column */}
        <div className="lg:col-span-7">
          <ul className="space-y-4" aria-label="Basket items list" aria-busy={loading}>
            {quote?.lines.map((line) => (
              <CartLine
                key={line.variantId}
                line={line}
                href={routes.product(line.slug)}
                money={MONEY}
                onQuantityChange={(vId, qty) => setQuantity(vId, qty)}
                onRemove={(vId) => remove(vId)}
                labels={LABELS}
                extra={<TryOnTrigger product={tryOnProductOf(line)} />}
              />
            )) ?? (
              <li className="soft-panel p-8 text-center text-xs text-ink-soft tabular-nums">
                Refreshing basket...
              </li>
            )}
          </ul>
        </div>

        {/* Order summary Column */}
        <div className="lg:col-span-5">
          <div className="soft-panel sticky top-24 space-y-6 rounded-md border border-river/30 bg-surface/90 p-6">
            <div className="border-b border-river/30 pb-4">
              <h2 className="mt-1 font-display text-2xl font-normal text-ink">Order summary</h2>
            </div>

            {/* Shipping Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs text-ink-soft tabular-nums">Delivery</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShippingMethodId('standard')}
                  className={`rounded-md border p-3 text-left transition-all ${
                    shippingMethodId === 'standard'
                      ? 'border-ink bg-canvas font-medium text-ink'
                      : 'border-river/30 text-ink-soft hover:border-river'
                  }`}
                >
                  <div className="text-xs tabular-nums">Standard</div>
                  <div className="mt-1 text-[11px] text-ink-soft tabular-nums">3–5 days</div>
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethodId('express')}
                  className={`rounded-md border p-3 text-left transition-all ${
                    shippingMethodId === 'express'
                      ? 'border-ink bg-canvas font-medium text-ink'
                      : 'border-river/30 text-ink-soft hover:border-river'
                  }`}
                >
                  <div className="text-xs tabular-nums">Express</div>
                  <div className="mt-1 text-[11px] text-ink-soft tabular-nums">1–2 days</div>
                </button>
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="space-y-2">
              <label htmlFor="promo" className="block text-xs text-ink-soft tabular-nums">
                Promo code
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between rounded-md border border-river/30 bg-canvas px-3 py-2">
                  <span className="text-xs font-semibold text-brand tabular-nums">
                    {appliedPromo} APPLIED
                  </span>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-xs text-danger tabular-nums hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="E.G. SILENCE10"
                    className="flex-1 rounded-md border border-river/40 bg-canvas px-3 py-2 text-xs text-ink tabular-nums placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                  <Button type="submit" size="sm" variant="secondary">
                    Apply
                  </Button>
                </form>
              )}
              {promoError ? <p className="text-xs text-danger tabular-nums">{promoError}</p> : null}
            </div>

            {/* Financials */}
            <div className="space-y-3 border-t border-river/30 pt-4 text-xs tabular-nums">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="text-ink">{formatMoney(subtotal, MONEY)}</span>
              </div>

              <div className="flex justify-between text-ink-soft">
                <span>Shipping</span>
                <span className="text-ink">
                  {quote?.totals.shipping === 0 ? (
                    <span className="font-semibold text-brand">Free</span>
                  ) : (
                    formatMoney(quote?.totals.shipping ?? 0, MONEY)
                  )}
                </span>
              </div>

              {quote?.totals.discount ? (
                <div className="flex justify-between text-brand">
                  <span>Discount</span>
                  <span>-{formatMoney(quote.totals.discount, MONEY)}</span>
                </div>
              ) : null}

              <div className="flex justify-between text-ink-soft">
                <span>Estimated Tax (8%)</span>
                <span className="text-ink">{formatMoney(quote?.totals.tax ?? 0, MONEY)}</span>
              </div>

              <div className="flex justify-between border-t border-river/30 pt-3 text-sm font-semibold text-ink">
                <span>Total Amount</span>
                <span className="font-display text-xl">
                  {formatMoney(quote?.totals.total ?? subtotal, MONEY)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="space-y-3 pt-2">
              <Button asChild size="lg" className="w-full">
                <Link href={routes.checkout}>
                  Proceed to Checkout
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <p className="text-center text-[10px] text-ink-faint tabular-nums">
                Ethically tailored &middot; Plastic-free packaging &middot; 30-day returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
