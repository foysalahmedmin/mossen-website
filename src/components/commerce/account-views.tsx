'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Check, Leaf, Plus, User } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'
import { useSessionStore } from '@/stores/session-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

function AuthGuard({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated()
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated)
  const login = useSessionStore((s) => s.login)

  if (!hydrated) {
    return (
      <div className="soft-panel mx-auto max-w-md rounded-[32px] border border-river/30 bg-surface/90 p-10 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
        <h1 className="sr-only">Account</h1>
        <p className="mt-4 font-mono text-xs tracking-widest text-ink-soft uppercase">
          Loading Sanctuary...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="soft-panel mx-auto max-w-md rounded-[36px] border border-river/30 bg-surface/90 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-river/40 bg-canvas text-ink">
          <User size={28} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Leaf size={16} className="text-brand" />
          <span className="font-mono text-xs tracking-widest text-ink-soft uppercase">
            SANCTUARY ACCESS
          </span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-normal text-ink">Sign In Required</h1>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Sign in to your patron account or activate rapid demo access to view your quiet orders.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button asChild size="lg">
            <Link href={routes.login}>Sign In to Account</Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => login('patron@mossen.studios', 'Astrid Lindgren')}
          >
            Quick Demo Login
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export function AccountDashboardView() {
  const customer = useSessionStore((s) => s.customer)
  const addresses = useSessionStore((s) => s.addresses)
  const logout = useSessionStore((s) => s.logout)
  const orders = useOrdersStore((s) => s.orders)

  const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0]
  const latestOrder = orders[0]

  return (
    <AuthGuard>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="soft-panel flex flex-col justify-between gap-4 rounded-[32px] border border-river/30 bg-surface/90 p-8 shadow-sm sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-brand" />
              <span className="font-mono text-xs tracking-widest text-ink-soft uppercase">
                MOSSEN PATRON PROFILE
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-normal text-ink sm:text-4xl">
              Welcome back, {customer?.name ?? 'Patron'}
            </h1>
            <p className="mt-1 font-mono text-xs text-ink-soft uppercase">{customer?.email}</p>
          </div>
          <div>
            <Button variant="secondary" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 font-mono text-xs uppercase sm:grid-cols-3">
          <div className="soft-panel rounded-[28px] border border-river/30 bg-surface/90 p-6 shadow-sm">
            <span className="text-ink-soft">Quiet Orders</span>
            <p className="mt-2 font-display text-3xl font-normal text-ink">{orders.length}</p>
            <p className="mt-1 text-[11px] text-ink-soft">Lifetime verified orders</p>
          </div>

          <div className="soft-panel rounded-[28px] border border-river/30 bg-surface/90 p-6 shadow-sm">
            <span className="text-ink-soft">Patron Standing</span>
            <p className="mt-2 font-display text-3xl font-normal text-ink">Botanical Tier</p>
            <p className="mt-1 text-[11px] text-ink-soft">Complimentary climate freight</p>
          </div>

          <div className="soft-panel rounded-[28px] border border-river/30 bg-surface/90 p-6 shadow-sm">
            <span className="text-ink-soft">Saved Destinations</span>
            <p className="mt-2 font-display text-3xl font-normal text-ink">{addresses.length}</p>
            <p className="mt-1 text-[11px] text-ink-soft">Active sanctuaries</p>
          </div>
        </div>

        {/* Two-Column Overview */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Order */}
          <div className="soft-panel space-y-4 rounded-[32px] border border-river/30 bg-surface/90 p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-river/30 pb-4">
              <h2 className="font-display text-xl font-normal text-ink">Latest Order</h2>
              <Link
                href={routes.orders}
                className="font-mono text-xs text-brand uppercase hover:underline"
              >
                View All ({orders.length}) &rarr;
              </Link>
            </div>

            {latestOrder ? (
              <div className="space-y-4 font-mono text-xs uppercase">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-ink-soft">ORDER NUMBER</span>
                    <p className="font-bold text-ink">{latestOrder.number}</p>
                  </div>
                  <span className="rounded-full border border-river/40 bg-canvas px-3 py-1 text-[10px] font-semibold text-brand">
                    {latestOrder.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 rounded-[20px] border border-river/30 bg-canvas/70 p-3">
                  {latestOrder.lines.map((l) => (
                    <div key={l.variantId} className="flex justify-between">
                      <span className="text-ink">
                        {l.title} × {l.quantity}
                      </span>
                      <span className="font-semibold text-ink">
                        {formatMoney(l.unitPrice * l.quantity, MONEY)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-river/30 pt-3">
                  <span className="text-ink-soft">Total Captured:</span>
                  <span className="font-bold text-ink">
                    {formatMoney(latestOrder.totals.total, MONEY)}
                  </span>
                </div>

                <div className="pt-2">
                  <Button asChild size="sm" variant="secondary" className="w-full">
                    <Link href={routes.order(latestOrder.id)}>View Receipt</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center font-mono text-xs text-ink-soft uppercase">
                <p>No orders recorded yet.</p>
                <Button asChild size="sm" className="mt-4">
                  <Link href={routes.shop}>Explore Collection</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Primary Address */}
          <div className="soft-panel space-y-4 rounded-[32px] border border-river/30 bg-surface/90 p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-river/30 pb-4">
              <h2 className="font-display text-xl font-normal text-ink">Primary Sanctuary</h2>
              <Link
                href={routes.addresses}
                className="font-mono text-xs text-brand uppercase hover:underline"
              >
                Manage Sanctuaries ({addresses.length}) &rarr;
              </Link>
            </div>

            {defaultAddr ? (
              <div className="space-y-1 rounded-[24px] border border-river/30 bg-canvas/70 p-5 font-mono text-xs uppercase">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">{defaultAddr.name}</span>
                  {defaultAddr.isDefault ? (
                    <span className="rounded-full bg-river/30 px-2 py-0.5 text-[10px] font-semibold text-brand">
                      PRIMARY
                    </span>
                  ) : null}
                </div>
                <p className="pt-2 text-ink-soft">{defaultAddr.line1}</p>
                {defaultAddr.line2 ? <p className="text-ink-soft">{defaultAddr.line2}</p> : null}
                <p className="text-ink-soft">
                  {defaultAddr.city}, {defaultAddr.region} {defaultAddr.postcode}
                </p>
                <p className="text-ink-soft">{defaultAddr.country}</p>
                {defaultAddr.phone ? (
                  <p className="pt-2 text-ink-soft">Phone: {defaultAddr.phone}</p>
                ) : null}
              </div>
            ) : (
              <div className="py-8 text-center font-mono text-xs text-ink-soft uppercase">
                <p>No primary address recorded.</p>
                <Button asChild size="sm" className="mt-4">
                  <Link href={routes.addresses}>Add Address</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

export function AccountOrdersView() {
  const orders = useOrdersStore((s) => s.orders)

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-river/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-brand" />
              <span className="font-mono text-xs tracking-widest text-ink-soft uppercase">
                MOSSEN ORDER ARCHIVE
              </span>
            </div>
            <h1 className="mt-1 font-display text-3xl font-normal text-ink">
              Orders History ({orders.length})
            </h1>
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link href={routes.trackOrder}>Live Courier Tracking</Link>
          </Button>
        </div>

        {orders.length === 0 ? (
          <div className="soft-panel rounded-[32px] border border-river/30 bg-surface/90 p-12 text-center shadow-sm">
            <span className="font-mono text-xs tracking-widest text-brand uppercase">
              Zero Orders
            </span>
            <h2 className="mt-2 font-display text-2xl font-normal text-ink">
              No Orders Placed Yet
            </h2>
            <p className="mt-2 font-text text-sm text-ink-soft">
              When you order natural pieces, your receipt, progress journey, and tracking telemetry
              will appear here.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href={routes.shop}>Explore Collection</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="soft-panel space-y-4 rounded-[28px] border border-river/30 bg-surface/90 p-6 font-mono text-xs uppercase shadow-sm transition-all hover:border-river"
              >
                <div className="flex flex-col justify-between gap-2 border-b border-river/30 pb-4 sm:flex-row sm:items-center">
                  <div>
                    <span className="text-[10px] text-ink-soft">ORDER NUMBER</span>
                    <p className="text-sm font-bold text-ink">{order.number}</p>
                    <span className="text-[10px] text-ink-soft">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-river/40 bg-canvas px-3 py-1 font-semibold text-brand">
                      {order.status.toUpperCase()}
                    </span>
                    <Button asChild size="sm" variant="secondary">
                      <Link href={routes.order(order.id)}>Inspect</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-ink-soft">ORDERED PIECES</span>
                    <ul className="space-y-1">
                      {order.lines.map((l) => (
                        <li key={l.variantId} className="text-ink">
                          {l.title} × {l.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 sm:text-right">
                    <span className="text-[10px] text-ink-soft">TOTAL BILLED</span>
                    <p className="text-base font-semibold text-ink">
                      {formatMoney(order.totals.total, MONEY)}
                    </p>
                    <p className="text-[10px] text-ink-soft">
                      Shipped to {order.address.city}, {order.address.country}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

export function AccountOrderDetailView({ id }: { id: string }) {
  const orders = useOrdersStore((s) => s.orders)
  const order = orders.find((o) => o.id === id || o.number.toLowerCase() === id.toLowerCase())

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-river/30 pb-4">
          <div>
            <Link
              href={routes.orders}
              className="font-mono text-xs tracking-wider text-ink-soft uppercase hover:text-ink"
            >
              &larr; Return to Orders
            </Link>
            <h1 className="mt-2 font-display text-3xl font-normal text-ink">
              Order {order?.number ?? id}
            </h1>
          </div>
          {order ? (
            <span className="rounded-full border border-river/40 bg-canvas px-3 py-1 font-mono text-xs font-semibold text-brand uppercase">
              {order.status.toUpperCase()}
            </span>
          ) : null}
        </div>

        {!order ? (
          <div className="soft-panel rounded-[32px] border border-river/30 bg-surface/90 p-12 text-center font-mono text-xs text-ink-soft uppercase">
            Order receipt not found in storage.
          </div>
        ) : (
          <div className="soft-panel space-y-8 rounded-[36px] border border-river/30 bg-surface/90 p-8 font-mono text-xs uppercase shadow-sm">
            {/* Header info */}
            <div className="grid grid-cols-1 gap-4 border-b border-river/30 pb-6 sm:grid-cols-3">
              <div>
                <span className="text-[10px] text-ink-soft">ORDER NUMBER</span>
                <p className="font-bold text-ink">{order.number}</p>
              </div>
              <div>
                <span className="text-[10px] text-ink-soft">DATE PLACED</span>
                <p className="font-bold text-ink">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-ink-soft">DELIVERY METHOD</span>
                <p className="font-bold text-ink">
                  {order.shippingMethod.name.toUpperCase()} FREIGHT
                </p>
              </div>
            </div>

            {/* Line items */}
            <div>
              <h2 className="text-xs font-semibold tracking-wider text-ink">
                Garments & Accessories
              </h2>
              <ul className="mt-4 divide-y divide-river/30">
                {order.lines.map((l) => (
                  <li key={l.variantId} className="flex items-center gap-4 py-3">
                    {l.image ? (
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-[14px] border border-river/30 bg-canvas">
                        <Image
                          src={l.image}
                          alt={l.title}
                          fill
                          sizes="64px"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-medium text-ink">{l.title}</p>
                      <p className="text-[10px] text-ink-soft">
                        Qty {l.quantity} • {Object.values(l.options).join(' / ')}
                      </p>
                    </div>
                    <span className="font-semibold text-ink">
                      {formatMoney(l.unitPrice * l.quantity, MONEY)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address & Payment */}
            <div className="grid grid-cols-1 gap-6 border-t border-river/30 pt-6 sm:grid-cols-2">
              <div className="space-y-1 rounded-[24px] border border-river/30 bg-canvas/70 p-4">
                <span className="font-semibold text-ink">DESTINATION</span>
                <p className="text-ink">{order.address.name}</p>
                <p className="text-ink-soft">{order.address.line1}</p>
                <p className="text-ink-soft">
                  {order.address.city}, {order.address.country}
                </p>
              </div>

              <div className="space-y-1 rounded-[24px] border border-river/30 bg-canvas/70 p-4">
                <span className="font-semibold text-ink">FINANCIAL SUMMARY</span>
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span>{formatMoney(order.totals.subtotal, MONEY)}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Delivery</span>
                  <span>{formatMoney(order.totals.shipping, MONEY)}</span>
                </div>
                <div className="flex justify-between border-t border-river/30 pt-1 font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatMoney(order.totals.total, MONEY)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

export function AccountAddressesView() {
  const addresses = useSessionStore((s) => s.addresses)
  const addAddress = useSessionStore((s) => s.addAddress)
  const deleteAddress = useSessionStore((s) => s.deleteAddress)
  const setDefaultAddress = useSessionStore((s) => s.setDefaultAddress)

  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const [line1, setLine1] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('Denmark')
  const [isDefault, setIsDefault] = useState(false)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !line1 || !city || !region || !postcode) return

    addAddress({
      name,
      line1,
      city,
      region,
      postcode,
      country,
      isDefault,
    })

    setName('')
    setLine1('')
    setCity('')
    setRegion('')
    setPostcode('')
    setIsAdding(false)
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-river/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-brand" />
              <span className="font-mono text-xs tracking-widest text-ink-soft uppercase">
                DELIVERY DESTINATIONS
              </span>
            </div>
            <h1 className="mt-1 font-display text-3xl font-normal text-ink">
              Saved Sanctuaries ({addresses.length})
            </h1>
          </div>
          <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
            <Plus size={16} className="mr-1.5" />
            {isAdding ? 'Close Form' : 'Add Sanctuary'}
          </Button>
        </div>

        {isAdding ? (
          <div className="soft-panel rounded-[32px] border border-river/30 bg-surface/90 p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-normal text-ink">Add New Sanctuary</h2>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="account-sanctuary-recipient-name"
                    className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
                  >
                    Sanctuary / Recipient Name *
                  </label>
                  <input
                    id="account-sanctuary-recipient-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Astrid Lindgren"
                    className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="account-street-address"
                    className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
                  >
                    Street Address *
                  </label>
                  <input
                    id="account-street-address"
                    type="text"
                    required
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    placeholder="e.g. Fjordvej 42"
                    className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="account-city"
                    className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
                  >
                    City *
                  </label>
                  <input
                    id="account-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Copenhagen"
                    className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="account-region-state"
                    className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
                  >
                    Region / State *
                  </label>
                  <input
                    id="account-region-state"
                    type="text"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Capital Region"
                    className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="account-postal-code"
                    className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
                  >
                    Postal Code *
                  </label>
                  <input
                    id="account-postal-code"
                    type="text"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="1050"
                    className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-mono text-xs text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="account-country"
                  className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
                >
                  Country *
                </label>
                <input
                  id="account-country"
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Germany"
                  className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-mono text-xs text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="def"
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="h-4 w-4 rounded accent-brand"
                />
                <label
                  htmlFor="def"
                  className="cursor-pointer font-mono text-xs text-ink-soft uppercase"
                >
                  Set as primary sanctuary destination
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" size="sm">
                  Save Sanctuary
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`soft-panel space-y-3 rounded-[28px] border border-river/30 bg-surface/90 p-6 font-mono text-xs uppercase shadow-sm ${
                addr.isDefault ? 'border-2 border-brand' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">{addr.name}</span>
                {addr.isDefault ? (
                  <span className="rounded-full bg-river/30 px-2.5 py-0.5 text-[10px] font-semibold text-brand">
                    PRIMARY
                  </span>
                ) : null}
              </div>

              <div className="space-y-0.5 text-ink-soft">
                <p>{addr.line1}</p>
                {addr.line2 ? <p>{addr.line2}</p> : null}
                <p>
                  {addr.city}, {addr.region} {addr.postcode}
                </p>
                <p>{addr.country}</p>
              </div>

              <div className="flex items-center justify-between border-t border-river/30 pt-3">
                {!addr.isDefault && addr.id ? (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(addr.id!)}
                    className="text-[11px] font-semibold text-brand hover:underline"
                  >
                    Set as Primary
                  </button>
                ) : (
                  <span className="text-[11px] text-ink-faint">
                    {addr.isDefault ? 'Primary Sanctuary' : ''}
                  </span>
                )}
                {addr.id ? (
                  <button
                    type="button"
                    onClick={() => deleteAddress(addr.id!)}
                    className="text-[11px] text-danger hover:underline"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  )
}

export function AccountProfileView() {
  const customer = useSessionStore((s) => s.customer)
  const updateProfile = useSessionStore((s) => s.updateProfile)

  const [name, setName] = useState(customer?.name ?? '')
  const [phone, setPhone] = useState(customer?.phone ?? '')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AuthGuard>
      <div className="soft-panel max-w-2xl space-y-6 rounded-[32px] border border-river/30 bg-surface/90 p-8 shadow-sm">
        <div className="border-b border-river/30 pb-4">
          <div className="flex items-center gap-2">
            <Leaf size={16} className="text-brand" />
            <span className="font-mono text-xs tracking-widest text-ink-soft uppercase">
              PATRON SPECIFICATION
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-normal text-ink">Profile Preferences</h1>
        </div>

        {saved ? (
          <div className="flex items-center gap-2 rounded-[16px] border border-river/30 bg-canvas p-3 font-mono text-xs font-semibold text-brand uppercase">
            <Check size={16} />
            Preferences updated in sanctuary registry.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="account-registered-email-immutable"
              className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
            >
              Registered Email (Immutable)
            </label>
            <input
              id="account-registered-email-immutable"
              type="email"
              disabled
              value={customer?.email ?? ''}
              className="w-full cursor-not-allowed rounded-[16px] border border-river/30 bg-canvas/50 p-3 font-text text-sm text-ink-faint"
            />
          </div>

          <div>
            <label
              htmlFor="account-full-name"
              className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
            >
              Full Name
            </label>
            <input
              id="account-full-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="account-phone-number"
              className="mb-1 block font-mono text-xs tracking-wider text-ink-soft uppercase"
            >
              Phone Number
            </label>
            <input
              id="account-phone-number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+45 20 12 34 56"
              className="w-full rounded-[16px] border border-river/40 bg-canvas p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" size="md">
              Save Preferences
            </Button>
          </div>
        </form>
      </div>
    </AuthGuard>
  )
}
