'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight } from '@/components/icons'
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
  const order = orderId ? (orders.find((o) => o.id === orderId) ?? orders[0]) : orders[0]

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center">
        <div className="soft-panel mx-auto max-w-sm rounded-md border border-river/30 bg-surface/90 p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 text-xs text-ink-soft tabular-nums">Loading Receipt...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-xl px-4 py-20 text-center">
        <div className="soft-panel rounded-md border border-river/30 bg-surface/90 p-10">
          <h1 className="font-display text-2xl font-normal text-ink">Order not found</h1>
          <p className="mt-2 font-text text-sm text-ink-soft">
            We could not locate this order receipt. Return to the shop gallery.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href={routes.shop}>Continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container py-10 md:py-14">
      {/* Header Status */}
      <div className="text-center">
        <h1 className="font-display text-3xl font-normal text-ink sm:text-4xl">
          Thank you for your order
        </h1>
        <p className="mt-3 font-text text-sm text-ink-soft sm:text-base">
          A receipt and tracking link have been sent to{' '}
          <strong className="text-ink">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Main Botanical Receipt Panel */}
      <div className="soft-panel mt-10 space-y-8 rounded-md border border-river/30 bg-surface/90 p-8 sm:p-10">
        {/* Receipt Header Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-river/30 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs text-ink-soft tabular-nums">Order number</span>
            <p className="text-xl font-semibold text-ink tabular-nums">{order.number}</p>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-ink-soft tabular-nums">Order date</span>
            <p className="text-sm text-ink tabular-nums">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Itemized Lines */}
        <div>
          <h2 className="text-xs text-ink-soft tabular-nums">Tailored Pieces</h2>
          <ul className="mt-4 divide-y divide-river/30">
            {order.lines.map((line) => (
              <li key={line.variantId} className="flex items-center gap-4 py-4">
                {line.image ? (
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md border border-river/30 bg-canvas">
                    <Image
                      src={line.image}
                      alt={line.title}
                      fill
                      sizes="64px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-medium text-ink">{line.title}</p>
                  <p className="text-xs text-ink-soft tabular-nums">
                    Qty {line.quantity} • {Object.values(line.options).join(' / ')}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink tabular-nums">
                  {formatMoney(line.unitPrice * line.quantity, MONEY)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Destination & Payment Grid */}
        <div className="grid grid-cols-1 gap-6 border-t border-river/30 pt-6 text-xs tabular-nums sm:grid-cols-2">
          <div className="space-y-1 rounded-md border border-river/30 bg-canvas/70 p-5">
            <span className="font-semibold text-ink">Delivery destination</span>
            <p className="text-ink">{order.address.name}</p>
            <p className="text-ink-soft">{order.address.line1}</p>
            {order.address.line2 ? <p className="text-ink-soft">{order.address.line2}</p> : null}
            <p className="text-ink-soft">
              {order.address.city}, {order.address.region} {order.address.postcode}
            </p>
            <p className="text-ink-soft">{order.address.country}</p>
          </div>

          <div className="space-y-1 rounded-md border border-river/30 bg-canvas/70 p-5">
            <span className="font-semibold text-ink">Payment details</span>
            <p className="text-ink">
              Card: {order.payment.brand} ending in •••• {order.payment.last4}
            </p>
            <p className="text-ink-soft">
              Expires {order.payment.expMonth.toString().padStart(2, '0')}/
              {order.payment.expYear.toString().slice(-2)}
            </p>
            <p className="text-ink-soft">
              Method: {order.shippingMethod.name} ({order.shippingMethod.etaDays.min}–
              {order.shippingMethod.etaDays.max} days)
            </p>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="space-y-2 border-t border-river/30 pt-6 text-xs tabular-nums">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span className="text-ink">{formatMoney(order.totals.subtotal, MONEY)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Carbon-Neutral Delivery</span>
            <span className="text-ink">
              {order.totals.shipping === 0 ? 'Free' : formatMoney(order.totals.shipping, MONEY)}
            </span>
          </div>
          {order.totals.discount ? (
            <div className="flex justify-between text-brand">
              <span>Discount</span>
              <span>-{formatMoney(order.totals.discount, MONEY)}</span>
            </div>
          ) : null}
          <div className="flex justify-between text-ink-soft">
            <span>Estimated Tax</span>
            <span className="text-ink">{formatMoney(order.totals.tax, MONEY)}</span>
          </div>
          <div className="flex justify-between border-t border-river/30 pt-3 text-base font-semibold text-ink">
            <span>Total Captured</span>
            <span className="font-display text-2xl font-normal">
              {formatMoney(order.totals.total, MONEY)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 border-t border-river/30 pt-6 sm:flex-row sm:justify-between">
          <Button asChild variant="secondary">
            <Link href={routes.trackOrder}>Track order &rarr;</Link>
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
