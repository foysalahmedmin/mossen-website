'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CartLine } from '@/components/commerce/cart-line'
import { Leaf, ShoppingBag, X } from '@/components/icons'
import { Vine } from '@/components/layout/vine'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain/money'
import { quoteCartAction } from '@/features/cart/actions'
import type { Quote } from '@/features/cart/quote'
import { useCartStore } from '@/stores/cart-store'
import { useUiStore } from '@/stores/ui-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

const LABELS = {
  quantity: { group: 'Quantity', decrease: 'Decrease quantity', increase: 'Increase quantity' },
  remove: 'Remove item',
  outOfStock: 'Out of stock',
  limitedStock: 'Limited stock',
}

export function UnrollingBasketSheet() {
  const open = useUiStore((s) => s.open === 'cart')
  const closePanel = useUiStore((s) => s.closePanel)
  const lines = useCartStore((s) => s.lines)
  const remove = useCartStore((s) => s.remove)
  const setQuantity = useCartStore((s) => s.setQuantity)

  const [quote, setQuote] = useState<Quote | null>(null)
  const [promoCode, setPromoCode] = useState('')

  useEffect(() => {
    if (!open) return
    let cancelled = false

    quoteCartAction({ lines, promoCode: promoCode || undefined })
      .then((q) => {
        if (!cancelled) setQuote(q)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [open, lines, promoCode])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, closePanel])

  if (!open) return null

  const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0)
  const subtotal = quote?.totals.subtotal ?? 0
  const freeThreshold = 7500 // 75.00 in minor units
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100))
  const freeRemaining = Math.max(0, freeThreshold - subtotal)
  const vineRatio = freeProgress / 100

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Basket"
      className="animate-in fade-in bg-peat/30 fixed inset-0 z-50 flex items-start justify-end backdrop-blur-xs duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePanel()
      }}
    >
      <div
        className="animate-in slide-in-from-right flex h-full w-full max-w-lg flex-col border-l border-border-strong/30 bg-surface/98 p-6 shadow-2xl duration-300 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-river/30 pb-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-brand" aria-hidden="true" />
            <h2 className="font-display text-xl font-normal text-ink lowercase">
              Your Basket
              <span className="ml-2 font-mono text-xs text-ink-soft">({itemCount})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label="Close basket"
            className="pebble p-2 text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Pebble Bar & Vine */}
        <div className="pebble mt-4 flex items-center gap-3 border border-border-strong/30 bg-canvas/60 p-3">
          <Vine segments={2} progress={vineRatio} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-text text-xs font-medium text-ink">
              {freeRemaining === 0
                ? 'You have unlocked complimentary carbon-neutral delivery.'
                : `Add ${formatMoney(freeRemaining, MONEY)} for complimentary delivery.`}
            </p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full bg-brand transition-all duration-500"
                style={{ width: `${freeProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {lines.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <Leaf size={32} className="sway text-brand/50" aria-hidden="true" />
              <p className="mt-3 font-display text-base text-ink">Your basket is empty</p>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Explore our slow natural edits to add garments.
              </p>
              <Link
                href={routes.shop}
                onClick={closePanel}
                className="pebble mt-4 inline-flex items-center gap-2 bg-brand px-5 py-2 font-mono text-xs font-medium text-on-brand hover:opacity-90"
              >
                Explore Garments
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {quote?.lines.map((line) => (
                <CartLine
                  key={line.variantId}
                  line={line}
                  href={routes.product(line.slug)}
                  money={MONEY}
                  onQuantityChange={(variantId, q) => setQuantity(variantId, q)}
                  onRemove={(variantId) => remove(variantId)}
                  labels={LABELS}
                  className="pebble border border-border-strong/20 bg-canvas/40 p-3"
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {lines.length > 0 && (
          <div className="mt-4 border-t border-river/30 pt-4">
            {/* Promo input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="mb-4 flex gap-2"
            >
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (e.g. MOSSEN10)"
                aria-label="Promotional code"
                className="pebble flex-1 border border-border-strong/30 bg-canvas/60 px-3 py-1.5 font-mono text-xs text-ink uppercase placeholder:text-ink-faint placeholder:normal-case focus:border-brand focus:outline-none"
              />
              <button
                type="button"
                className="pebble border border-border-strong/40 bg-surface px-4 py-1.5 font-mono text-xs font-semibold text-ink hover:bg-canvas"
              >
                Apply
              </button>
            </form>

            {quote?.promo && (
              <p className="mb-2 font-mono text-xs text-brand">
                Promo {quote.promo.code} applied ({quote.promo.label}).
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 font-text text-xs">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span>{formatMoney(quote?.totals.subtotal ?? subtotal, MONEY)}</span>
              </div>
              {quote?.totals.discount ? (
                <div className="flex justify-between text-brand">
                  <span>Discount</span>
                  <span>-{formatMoney(quote.totals.discount, MONEY)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-ink-soft">
                <span>Shipping</span>
                <span>
                  {quote?.totals.shipping === 0
                    ? 'Complimentary'
                    : quote?.totals.shipping
                      ? formatMoney(quote.totals.shipping, MONEY)
                      : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between border-t border-river/20 pt-2 font-display text-base font-medium text-ink">
                <span>Estimated Total</span>
                <span>{formatMoney(quote?.totals.total ?? subtotal, MONEY)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href={routes.checkout}
              onClick={closePanel}
              className="pebble mt-4 flex h-12 w-full items-center justify-center bg-brand px-6 font-mono text-xs font-semibold tracking-wider text-on-brand uppercase transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-focus"
            >
              Proceed to Quiet Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
