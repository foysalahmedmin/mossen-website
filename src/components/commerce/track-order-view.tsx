'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Leaf, MagnifyingGlass, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import type { Order } from '@/domain'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

const STEPS = [
  { id: 'confirmed', label: 'Order Confirmed', desc: 'Garment pattern reserved & allocated' },
  { id: 'processing', label: 'Studio Weaving', desc: 'Hand-tailoring & eco-wash finishing' },
  { id: 'shipped', label: 'Carbon-Neutral Transit', desc: 'Zero-emission courier dispatched' },
  { id: 'delivered', label: 'Received', desc: 'Delivered quietly at your sanctuary' },
]

export function TrackOrderView() {
  const hydrated = useHydrated()
  const orders = useOrdersStore((s) => s.orders)

  const [orderNumberInput, setOrderNumberInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null)
  const [searchAttempted, setSearchAttempted] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchAttempted(true)

    const cleanNum = orderNumberInput.trim().toLowerCase()
    const cleanEmail = emailInput.trim().toLowerCase()

    const found = orders.find((o) => {
      const matchNum = o.number.toLowerCase() === cleanNum || o.id.toLowerCase() === cleanNum
      if (!matchNum) return false
      if (cleanEmail) {
        return o.customerEmail.toLowerCase() === cleanEmail
      }
      return true
    })

    setSearchedOrder(found ?? null)
  }

  const handleSelectRecent = (order: Order) => {
    setOrderNumberInput(order.number)
    setEmailInput(order.customerEmail)
    setSearchedOrder(order)
    setSearchAttempted(true)
  }

  const currentStepIdx = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 0
      case 'processing':
        return 1
      case 'shipped':
        return 2
      case 'delivered':
        return 3
      default:
        return 0
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Leaf size={16} className="text-brand" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            MOSSEN COURIER TRACKING &middot; CLIMATE DISPATCH
          </span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-normal text-ink sm:text-4xl">
          Track Your Order
        </h1>
        <p className="mt-3 font-text text-sm text-ink-soft sm:text-base">
          Follow your natural-fibre pieces on their sustainable, low-emission journey to your door.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="soft-panel mx-auto mt-8 max-w-2xl rounded-[32px] bg-surface/90 border border-river/30 p-6 sm:p-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="orderNum" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                Order Number *
              </label>
              <input
                id="orderNum"
                type="text"
                required
                value={orderNumberInput}
                onChange={(e) => setOrderNumberInput(e.target.value)}
                placeholder="e.g. MSN-10842"
                className="w-full rounded-[16px] bg-canvas border border-river/40 p-3 font-mono text-xs uppercase text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                Customer Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="patron@example.com"
                className="w-full rounded-[16px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" size="md" className="w-full">
            <MagnifyingGlass size={16} className="mr-2" />
            Check Courier Status
          </Button>
        </form>

        {/* Quick select from recent orders */}
        {hydrated && orders.length > 0 ? (
          <div className="mt-6 border-t border-river/30 pt-4">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-soft">
              Recent Studio Orders in Storage:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => handleSelectRecent(o)}
                  className="rounded-full bg-canvas border border-river/40 px-3 py-1 font-mono text-xs text-ink hover:border-ink"
                >
                  {o.number} ({o.status})
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Result Section */}
      {searchAttempted && !searchedOrder ? (
        <div className="soft-panel mx-auto mt-8 max-w-2xl rounded-[32px] bg-surface/90 border border-river/30 p-8 text-center">
          <h2 className="font-display text-xl font-normal text-ink">Order Not Found</h2>
          <p className="mt-2 font-text text-sm text-ink-soft">
            We could not find an order matching <strong className="text-ink">{orderNumberInput}</strong>.
            Please verify the number on your confirmation email.
          </p>
        </div>
      ) : null}

      {searchedOrder ? (
        <div className="soft-panel mx-auto mt-8 max-w-3xl rounded-[36px] bg-surface/90 border border-river/30 p-6 sm:p-10 space-y-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-river/30 pb-6 sm:flex-row sm:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                CARRIER TRACKING DETAILS
              </span>
              <p className="font-mono text-2xl font-bold tracking-wider text-ink">{searchedOrder.number}</p>
            </div>
            <div className="rounded-full bg-canvas border border-river/40 px-4 py-1.5 text-right">
              <span className="font-mono text-[10px] uppercase text-ink-soft">STATUS: </span>
              <span className="font-mono text-xs font-semibold uppercase text-brand">
                {searchedOrder.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-ink-soft">
              Fulfillment Journey
            </h3>
            <div className="relative">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                {STEPS.map((s, idx) => {
                  const stepIndex = currentStepIdx(searchedOrder.status)
                  const isCompleted = idx <= stepIndex
                  const isCurrent = idx === stepIndex

                  return (
                    <div key={s.id} className="relative flex flex-col items-start sm:items-center text-left sm:text-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-semibold transition-all ${
                          isCompleted
                            ? 'bg-brand text-on-brand shadow-sm'
                            : 'bg-canvas border border-river/40 text-ink-faint'
                        }`}
                      >
                        {isCompleted ? <Check size={18} /> : idx + 1}
                      </div>
                      <p
                        className={`mt-2 font-display text-sm ${
                          isCurrent ? 'font-semibold text-ink' : 'text-ink-soft'
                        }`}
                      >
                        {s.label}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-ink-soft uppercase">{s.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6 border-t border-river/30 pt-6 sm:grid-cols-2 font-mono text-xs uppercase">
            <div className="rounded-[24px] bg-canvas/70 border border-river/30 p-5 space-y-1">
              <span className="font-semibold text-ink">DELIVERY SANCTUARY</span>
              <p className="text-ink">{searchedOrder.address.name}</p>
              <p className="text-ink-soft">{searchedOrder.address.line1}</p>
              <p className="text-ink-soft">
                {searchedOrder.address.city}, {searchedOrder.address.country}
              </p>
            </div>

            <div className="rounded-[24px] bg-canvas/70 border border-river/30 p-5 space-y-1">
              <span className="font-semibold text-ink">LOGISTICS SPEC</span>
              <p className="text-ink">Method: {searchedOrder.shippingMethod.name.toUpperCase()} FREIGHT</p>
              <p className="text-ink-soft">Items: {searchedOrder.lines.reduce((a, b) => a + b.quantity, 0)} pieces</p>
              <p className="text-ink-soft">Total: {formatMoney(searchedOrder.totals.total, MONEY)}</p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-river/30 pt-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Ordered Garments</h4>
            <div className="mt-4 space-y-2">
              {searchedOrder.lines.map((l) => (
                <div key={l.variantId} className="flex items-center justify-between rounded-[18px] bg-canvas/60 border border-river/20 p-3 font-mono text-xs uppercase">
                  <span className="text-ink">
                    {l.title} × {l.quantity}
                  </span>
                  <span className="font-semibold text-ink">{formatMoney(l.unitPrice * l.quantity, MONEY)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
