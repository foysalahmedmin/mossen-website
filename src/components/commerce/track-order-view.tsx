'use client'

import { useState } from 'react'
import { Check, MagnifyingGlass } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { formatMoney } from '@/domain'
import type { Order } from '@/domain'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

const STEPS = [
  { id: 'confirmed', label: 'Order Confirmed', desc: 'Garment pattern reserved & allocated' },
  { id: 'processing', label: 'Studio Weaving', desc: 'Hand-tailoring & eco-wash finishing' },
  { id: 'shipped', label: 'On its way', desc: 'With the courier' },
  { id: 'delivered', label: 'Received', desc: 'Delivered to your door' },
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
    <div className="page-container py-10 md:py-14">
      {/* Title */}
      <div className="text-center">
        <h1 className="font-display text-3xl font-normal text-ink sm:text-4xl">Track your order</h1>
        <p className="mt-3 font-text text-sm text-ink-soft sm:text-base">
          Enter your order number and the email you used at checkout.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="soft-panel mx-auto mt-8 max-w-2xl rounded-md border border-river/30 bg-surface/90 p-6 sm:p-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="orderNum" className="mb-1 block text-xs text-ink-soft tabular-nums">
                Order Number *
              </label>
              <input
                id="orderNum"
                type="text"
                required
                value={orderNumberInput}
                onChange={(e) => setOrderNumberInput(e.target.value)}
                placeholder="e.g. MSN-10842"
                className="w-full rounded-md border border-river/40 bg-canvas p-3 text-xs text-ink tabular-nums placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-xs text-ink-soft tabular-nums">
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" size="md" className="w-full">
            <MagnifyingGlass size={16} className="mr-2" />
            Track order
          </Button>
        </form>

        {/* Quick select from recent orders */}
        {hydrated && orders.length > 0 ? (
          <div className="mt-6 border-t border-river/30 pt-4">
            <span className="block text-[10px] text-ink-soft tabular-nums">
              Recent Studio Orders in Storage:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => handleSelectRecent(o)}
                  className="rounded-md border border-river/40 bg-canvas px-3 py-1 text-xs text-ink tabular-nums hover:border-ink"
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
        <div className="soft-panel mx-auto mt-8 max-w-2xl rounded-md border border-river/30 bg-surface/90 p-8 text-center">
          <h2 className="font-display text-xl font-normal text-ink">Order Not Found</h2>
          <p className="mt-2 font-text text-sm text-ink-soft">
            We could not find an order matching{' '}
            <strong className="text-ink">{orderNumberInput}</strong>. Please verify the number on
            your confirmation email.
          </p>
        </div>
      ) : null}

      {searchedOrder ? (
        <div className="soft-panel mx-auto mt-8 max-w-3xl space-y-8 rounded-md border border-river/30 bg-surface/90 p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-river/30 pb-6 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs text-ink-soft tabular-nums">Carrier tracking details</span>
              <p className="text-2xl font-semibold text-ink tabular-nums">{searchedOrder.number}</p>
            </div>
            <div className="rounded-md border border-river/40 bg-canvas px-4 py-1.5 text-right">
              <span className="text-[10px] text-ink-soft tabular-nums">STATUS: </span>
              <span className="text-xs font-semibold text-brand tabular-nums">
                {searchedOrder.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <h3 className="mb-6 text-xs text-ink-soft tabular-nums">Fulfillment Journey</h3>
            <div className="relative">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                {STEPS.map((s, idx) => {
                  const stepIndex = currentStepIdx(searchedOrder.status)
                  const isCompleted = idx <= stepIndex
                  const isCurrent = idx === stepIndex

                  return (
                    <div
                      key={s.id}
                      className="relative flex flex-col items-start text-left sm:items-center sm:text-center"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold tabular-nums transition-all ${
                          isCompleted
                            ? 'bg-brand text-on-brand'
                            : 'border border-river/40 bg-canvas text-ink-faint'
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
                      <p className="mt-1 text-[10px] text-ink-soft tabular-nums">{s.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6 border-t border-river/30 pt-6 text-xs tabular-nums sm:grid-cols-2">
            <div className="space-y-1 rounded-md border border-river/30 bg-canvas/70 p-5">
              <span className="font-semibold text-ink">Delivery address</span>
              <p className="text-ink">{searchedOrder.address.name}</p>
              <p className="text-ink-soft">{searchedOrder.address.line1}</p>
              <p className="text-ink-soft">
                {searchedOrder.address.city}, {searchedOrder.address.country}
              </p>
            </div>

            <div className="space-y-1 rounded-md border border-river/30 bg-canvas/70 p-5">
              <span className="font-semibold text-ink">Logistics spec</span>
              <p className="text-ink">
                Method: {searchedOrder.shippingMethod.name.toUpperCase()} FREIGHT
              </p>
              <p className="text-ink-soft">
                Items: {searchedOrder.lines.reduce((a, b) => a + b.quantity, 0)} pieces
              </p>
              <p className="text-ink-soft">
                Total: {formatMoney(searchedOrder.totals.total, MONEY)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-river/30 pt-6">
            <h4 className="text-xs text-ink-soft tabular-nums">Ordered Garments</h4>
            <div className="mt-4 space-y-2">
              {searchedOrder.lines.map((l) => (
                <div
                  key={l.variantId}
                  className="flex items-center justify-between rounded-md border border-river/20 bg-canvas/60 p-3 text-xs tabular-nums"
                >
                  <span className="text-ink">
                    {l.title} × {l.quantity}
                  </span>
                  <span className="font-semibold text-ink">
                    {formatMoney(l.unitPrice * l.quantity, MONEY)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
