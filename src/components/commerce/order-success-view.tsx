'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Check, Leaf, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

export function OrderConfirmationView() {
  const searchParams = useSearchParams()
  const hydrated = useHydrated()
  const orderId = searchParams.get('orderId')

  const orders = useOrdersStore((s) => s.orders)
  const order = orderId
    ? orders.find((o) => o.id === orderId) ?? orders[0]
    : orders[0]

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center">
        <div className="soft-panel mx-auto max-w-sm rounded-[32px] bg-surface/90 border border-river/30 p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-soft">Loading Receipt...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-xl px-4 py-20 text-center">
        <div className="soft-panel rounded-[36px] bg-surface/90 border border-river/30 p-10">
          <span className="font-mono text-xs uppercase tracking-widest text-brand">Order Not Found</span>
          <h1 className="mt-2 font-display text-2xl font-normal text-ink">Receipt Not Located</h1>
          <p className="mt-2 font-text text-sm text-ink-soft">We could not locate this order receipt. Return to the shop gallery.</p>
          <div className="mt-6">
            <Button asChild>
              <Link href={routes.shop}>Explore Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Status */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-canvas border border-river/40 shadow-sm">
          <Check size={32} className="text-brand" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Leaf size={16} className="text-brand" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            ORDER CONFIRMED &middot; SUSTAINABLE WEAVE INITIATED
          </span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-normal text-ink sm:text-4xl">
          Thank you for your order
        </h1>
        <p className="mt-3 font-text text-sm text-ink-soft sm:text-base">
          A receipt and carrier tracking dispatch have been transmitted to{' '}
          <strong className="text-ink">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Main Botanical Receipt Panel */}
      <div className="soft-panel mt-10 rounded-[36px] bg-surface/90 border border-river/30 p-8 sm:p-10 space-y-8 shadow-sm">
        {/* Receipt Header Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-river/30 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="font-mono text-xs uppercase text-ink-soft">ORDER NUMBER</span>
            <p className="font-mono text-xl font-bold tracking-wider text-ink">{order.number}</p>
          </div>
          <div className="sm:text-right">
            <span className="font-mono text-xs uppercase text-ink-soft">ORDER DATE</span>
            <p className="font-mono text-sm text-ink">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Itemized Lines */}
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Tailored Pieces</h2>
          <ul className="mt-4 divide-y divide-river/30">
            {order.lines.map((line) => (
              <li key={line.variantId} className="flex items-center gap-4 py-4">
                {line.image ? (
                  <div className="h-16 w-14 shrink-0 overflow-hidden rounded-[16px] bg-canvas border border-river/30">
                    <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base font-medium text-ink">{line.title}</p>
                  <p className="font-mono text-xs text-ink-soft uppercase">
                    Qty {line.quantity} • {Object.values(line.options).join(' / ')}
                  </p>
                </div>
                <span className="font-mono text-sm font-semibold text-ink">
                  {formatMoney(line.unitPrice * line.quantity, MONEY)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Destination & Payment Grid */}
        <div className="grid grid-cols-1 gap-6 border-t border-river/30 pt-6 sm:grid-cols-2 font-mono text-xs uppercase">
          <div className="rounded-[24px] bg-canvas/70 border border-river/30 p-5 space-y-1">
            <span className="font-semibold text-ink">DELIVERY DESTINATION</span>
            <p className="text-ink">{order.address.name}</p>
            <p className="text-ink-soft">{order.address.line1}</p>
            {order.address.line2 ? (
              <p className="text-ink-soft">{order.address.line2}</p>
            ) : null}
            <p className="text-ink-soft">
              {order.address.city}, {order.address.region} {order.address.postcode}
            </p>
            <p className="text-ink-soft">{order.address.country}</p>
          </div>

          <div className="rounded-[24px] bg-canvas/70 border border-river/30 p-5 space-y-1">
            <span className="font-semibold text-ink">PAYMENT DETAILS</span>
            <p className="text-ink">Card: {order.payment.brand} ending in •••• {order.payment.last4}</p>
            <p className="text-ink-soft">
              Expires {order.payment.expMonth.toString().padStart(2, '0')}/{order.payment.expYear.toString().slice(-2)}
            </p>
            <p className="text-ink-soft">
              Method: {order.shippingMethod.name} ({order.shippingMethod.etaDays.min}–{order.shippingMethod.etaDays.max} days)
            </p>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="border-t border-river/30 pt-6 font-mono text-xs uppercase space-y-2">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span className="text-ink">{formatMoney(order.totals.subtotal, MONEY)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Carbon-Neutral Delivery</span>
            <span className="text-ink">
              {order.totals.shipping === 0 ? 'COMPLIMENTARY' : formatMoney(order.totals.shipping, MONEY)}
            </span>
          </div>
          {order.totals.discount ? (
            <div className="flex justify-between text-brand">
              <span>Courtesy Credit</span>
              <span>-{formatMoney(order.totals.discount, MONEY)}</span>
            </div>
          ) : null}
          <div className="flex justify-between text-ink-soft">
            <span>Estimated Tax</span>
            <span className="text-ink">{formatMoney(order.totals.tax, MONEY)}</span>
          </div>
          <div className="flex justify-between border-t border-river/30 pt-3 text-base font-semibold text-ink">
            <span>Total Captured</span>
            <span className="font-display text-2xl font-normal">{formatMoney(order.totals.total, MONEY)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 border-t border-river/30 pt-6 sm:flex-row sm:justify-between">
          <Button asChild variant="secondary">
            <Link href={routes.trackOrder}>
              Track Order Dispatch &rarr;
            </Link>
          </Button>
          <Button asChild>
            <Link href={routes.shop}>
              Return to Collection
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
