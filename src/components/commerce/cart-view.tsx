'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CartLine } from '@/components/commerce/cart-line'
import { ArrowRight, Leaf, ShoppingBag, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { quoteCartAction } from '@/features/cart/actions'
import type { Quote } from '@/features/cart/quote'
import { useCartStore } from '@/stores/cart-store'
import { useHydrated } from '@/stores/hydration'

const MONEY = { currency: brand.currency, locale: brand.locale }

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
        <div className="soft-panel mx-auto max-w-md rounded-[32px] bg-surface/90 border border-river/30 p-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent mx-auto" />
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-soft">Preparing Basket...</p>
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
        <div className="soft-panel mx-auto max-w-xl rounded-[36px] bg-surface/90 border border-river/30 p-12 shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-canvas border border-river/40">
            <ShoppingBag size={36} className="text-ink-soft" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand">Quiet Sanctuary</span>
          <h1 className="mt-2 font-display text-3xl font-normal text-ink sm:text-4xl">
            Your Basket is Empty
          </h1>
          <p className="mt-4 font-text text-sm leading-relaxed text-ink-soft sm:text-base">
            Discover unbleached organic linens, hand-spun woolens, and raw silk silhouettes crafted in harmony with nature.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.shop}>
                Explore Collection
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-river/30 pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <Leaf size={16} className="text-brand" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              {itemCount} {itemCount === 1 ? 'PIECE' : 'PIECES'} IN SANCTUARY
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-normal text-ink sm:text-4xl">
            Shopping Basket
          </h1>
        </div>
        <Link
          href={routes.shop}
          className="font-mono text-xs uppercase tracking-wider text-ink-soft hover:text-ink transition-colors"
        >
          &larr; Continue Exploring
        </Link>
      </div>

      {/* Sustainable Carbon-Neutral Freight Bar */}
      <div className="soft-panel mb-8 rounded-[24px] bg-surface/90 border border-river/30 p-5">
        <div className="flex items-center justify-between font-mono text-xs uppercase">
          <span className="flex items-center gap-2 text-ink">
            <Sparkle size={14} className="text-brand" />
            {freeRemaining === 0 ? (
              <span className="font-medium text-ink">Carbon-Neutral Climate Freight Unlocked</span>
            ) : (
              <span>
                Add <strong className="text-ink">{formatMoney(freeRemaining, MONEY)}</strong> for Free Carbon-Neutral Shipping
              </span>
            )}
          </span>
          <span className="font-semibold text-ink">{freeProgress}%</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-river/20 p-0.5">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${freeProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Basket Lines Column */}
        <div className="lg:col-span-7">
          <ul className="space-y-4" aria-label="Basket items list">
            {quote?.lines.map((line) => (
              <CartLine
                key={line.variantId}
                line={line}
                href={routes.product(line.productId)}
                money={MONEY}
                onQuantityChange={(vId, qty) => setQuantity(vId, qty)}
                onRemove={(vId) => remove(vId)}
                labels={LABELS}
              />
            )) ?? (
              <li className="soft-panel p-8 text-center font-mono text-xs text-ink-soft">
                Refreshing basket...
              </li>
            )}
          </ul>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5">
          <div className="soft-panel sticky top-24 rounded-[32px] bg-surface/90 border border-river/30 p-6 space-y-6">
            <div className="border-b border-river/30 pb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">SUMMARY</span>
              <h2 className="mt-1 font-display text-2xl font-normal text-ink">Basket Totals</h2>
            </div>

            {/* Shipping Method Selector */}
            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
                Delivery Velocity
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShippingMethodId('standard')}
                  className={`p-3 text-left rounded-[20px] border transition-all ${
                    shippingMethodId === 'standard'
                      ? 'bg-canvas border-ink text-ink font-medium shadow-sm'
                      : 'border-river/30 text-ink-soft hover:border-river'
                  }`}
                >
                  <div className="font-mono text-xs uppercase">Standard Quiet</div>
                  <div className="font-mono text-[11px] text-ink-soft mt-1">3–5 days</div>
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethodId('express')}
                  className={`p-3 text-left rounded-[20px] border transition-all ${
                    shippingMethodId === 'express'
                      ? 'bg-canvas border-ink text-ink font-medium shadow-sm'
                      : 'border-river/30 text-ink-soft hover:border-river'
                  }`}
                >
                  <div className="font-mono text-xs uppercase">Priority Courier</div>
                  <div className="font-mono text-[11px] text-ink-soft mt-1">1–2 days</div>
                </button>
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="space-y-2">
              <label htmlFor="promo" className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
                Botanical Courtesy Code
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between rounded-[16px] bg-canvas border border-river/30 px-3 py-2">
                  <span className="font-mono text-xs uppercase text-brand font-semibold">{appliedPromo} APPLIED</span>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="font-mono text-xs text-danger uppercase hover:underline"
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
                    className="flex-1 rounded-[16px] bg-canvas border border-river/40 px-3 py-2 font-mono text-xs uppercase text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                  <Button type="submit" size="sm" variant="secondary">
                    Apply
                  </Button>
                </form>
              )}
              {promoError ? <p className="font-mono text-xs text-danger">{promoError}</p> : null}
            </div>

            {/* Financials */}
            <div className="space-y-3 border-t border-river/30 pt-4 font-mono text-xs uppercase">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="text-ink">{formatMoney(subtotal, MONEY)}</span>
              </div>

              <div className="flex justify-between text-ink-soft">
                <span>Carbon-Neutral Freight</span>
                <span className="text-ink">
                  {quote?.totals.shipping === 0 ? (
                    <span className="font-semibold text-brand">COMPLIMENTARY</span>
                  ) : (
                    formatMoney(quote?.totals.shipping ?? 0, MONEY)
                  )}
                </span>
              </div>

              {quote?.totals.discount ? (
                <div className="flex justify-between text-brand">
                  <span>Courtesy Discount</span>
                  <span>-{formatMoney(quote.totals.discount, MONEY)}</span>
                </div>
              ) : null}

              <div className="flex justify-between text-ink-soft">
                <span>Estimated Tax (8%)</span>
                <span className="text-ink">{formatMoney(quote?.totals.tax ?? 0, MONEY)}</span>
              </div>

              <div className="flex justify-between border-t border-river/30 pt-3 text-sm font-semibold text-ink">
                <span>Total Amount</span>
                <span className="font-display text-xl">{formatMoney(quote?.totals.total ?? subtotal, MONEY)}</span>
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
              <p className="text-center font-mono text-[10px] text-ink-faint uppercase">
                Ethically tailored &middot; Plastic-free packaging &middot; 30-day returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
