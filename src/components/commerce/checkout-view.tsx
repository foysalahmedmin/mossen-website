'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, Leaf, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { quoteCartAction } from '@/features/cart/actions'
import type { Quote } from '@/features/cart/quote'
import { placeOrderAction } from '@/features/checkout/actions'
import type { CheckoutFormData } from '@/features/checkout/schemas'
import { useCartStore } from '@/stores/cart-store'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'
import { useSessionStore } from '@/stores/session-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

export function CheckoutView() {
  const router = useRouter()
  const hydrated = useHydrated()
  const lines = useCartStore((s) => s.lines)
  const clearCart = useCartStore((s) => s.clear)
  const addOrder = useOrdersStore((s) => s.addOrder)
  const customer = useSessionStore((s) => s.customer)
  const addresses = useSessionStore((s) => s.addresses)

  const [quote, setQuote] = useState<Quote | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form State
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0]
  const [email, setEmail] = useState('')
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [name, setName] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('Denmark')
  const [phone, setPhone] = useState('')
  const [shippingMethodId, setShippingMethodId] = useState('standard')
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242')
  const [expDate, setExpDate] = useState('12/28')
  const [cvv, setCvv] = useState('123')

  // Pre-fill from session once hydrated
  useEffect(() => {
    if (!hydrated) return
    Promise.resolve().then(() => {
      if (customer) {
        setEmail(customer.email)
        setName(customer.name)
        setCardholderName(customer.name)
      }
      if (defaultAddress) {
        setName(defaultAddress.name)
        setLine1(defaultAddress.line1)
        setLine2(defaultAddress.line2 ?? '')
        setCity(defaultAddress.city)
        setRegion(defaultAddress.region)
        setPostcode(defaultAddress.postcode)
        setCountry(defaultAddress.country)
        setPhone(defaultAddress.phone ?? '')
      }
    })
  }, [hydrated, customer, defaultAddress])

  // Recalculate quote
  useEffect(() => {
    if (!hydrated || lines.length === 0) return
    let cancelled = false

    quoteCartAction({ lines, shippingMethodId })
      .then((q) => {
        if (!cancelled) setQuote(q)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [hydrated, lines, shippingMethodId])

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center">
        <div className="soft-panel mx-auto max-w-sm rounded-[32px] bg-surface/90 border border-river/30 p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-soft">Preparing Checkout...</p>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-2xl px-4 py-20 text-center">
        <div className="soft-panel rounded-[36px] bg-surface/90 border border-river/30 p-10">
          <h1 className="font-display text-2xl font-normal text-ink">Your basket is empty</h1>
          <p className="mt-2 text-sm text-ink-soft">Add items to your basket before proceeding to checkout.</p>
          <div className="mt-6">
            <Button asChild>
              <Link href={routes.shop}>Return to Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const checkoutData: CheckoutFormData = {
      contact: {
        email,
        newsletterOptIn,
      },
      shippingAddress: {
        name,
        line1,
        line2: line2 || undefined,
        city,
        region,
        postcode,
        country,
        phone: phone || undefined,
      },
      shippingMethodId,
      payment: {
        cardholderName: cardholderName || name,
        cardNumber,
        expDate,
        cvv,
      },
    }

    try {
      const result = await placeOrderAction({
        checkout: checkoutData,
        lines,
      })

      if (!result.ok || !result.order) {
        setError(result.error ?? 'Failed to place order. Please review your details.')
        setSubmitting(false)
        return
      }

      addOrder(result.order)
      clearCart()
      router.push(`/checkout/success?orderId=${result.order.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Leaf size={16} className="text-brand" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            MOSSEN QUIET CHECKOUT &middot; ENCRYPTED FULFILLMENT
          </span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-normal text-ink">
          Order Finalization
        </h1>
      </div>

      {error ? (
        <div className="mb-6 rounded-[20px] border border-danger/40 bg-danger/10 p-4 font-mono text-xs text-danger uppercase">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Contact Details */}
            <div className="soft-panel rounded-[32px] bg-surface/90 border border-river/30 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-river/30 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas border border-river/40 font-mono text-xs font-semibold text-ink">
                    01
                  </span>
                  <h2 className="font-display text-xl font-normal text-ink">Contact Details</h2>
                </div>
                {!customer ? (
                  <Link href={routes.login} className="font-mono text-xs text-brand hover:underline uppercase">
                    Customer Login &rarr;
                  </Link>
                ) : null}
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@mossen.studios"
                    className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="h-4 w-4 rounded accent-brand"
                  />
                  <label htmlFor="newsletter" className="font-mono text-xs text-ink-soft uppercase cursor-pointer">
                    Subscribe to quiet seasonal botanical essays & releases
                  </label>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="soft-panel rounded-[32px] bg-surface/90 border border-river/30 p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-river/30 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas border border-river/40 font-mono text-xs font-semibold text-ink">
                  02
                </span>
                <h2 className="font-display text-xl font-normal text-ink">Delivery Destination</h2>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Recipient Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Astrid Lindgren"
                    className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="line1" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Street Address *
                  </label>
                  <input
                    id="line1"
                    type="text"
                    required
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    placeholder="e.g. Fjordvej 42"
                    className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="line2" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Apartment, Suite or Cottage (Optional)
                  </label>
                  <input
                    id="line2"
                    type="text"
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    placeholder="e.g. 2nd Floor, Garden Wing"
                    className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                      City *
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Copenhagen"
                      className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="region" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                      State / Region *
                    </label>
                    <input
                      id="region"
                      type="text"
                      required
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="e.g. Capital Region"
                      className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="postcode" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                      Postal Code *
                    </label>
                    <input
                      id="postcode"
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="e.g. 1050"
                      className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                      Country *
                    </label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink focus:border-ink focus:outline-none"
                    >
                      <option value="Denmark">Denmark</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Norway">Norway</option>
                      <option value="Finland">Finland</option>
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Phone (For Sustainable Courier Updates)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+45 20 12 34 56"
                    className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Carbon-Neutral Courier */}
            <div className="soft-panel rounded-[32px] bg-surface/90 border border-river/30 p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-river/30 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas border border-river/40 font-mono text-xs font-semibold text-ink">
                  03
                </span>
                <h2 className="font-display text-xl font-normal text-ink">Fulfillment Velocity</h2>
              </div>

              <div className="mt-6 space-y-3">
                <label
                  onClick={() => setShippingMethodId('standard')}
                  className={`flex cursor-pointer items-center justify-between rounded-[24px] p-4 transition-all ${
                    shippingMethodId === 'standard'
                      ? 'bg-canvas border-2 border-brand shadow-sm'
                      : 'border border-river/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethodId === 'standard'}
                      onChange={() => setShippingMethodId('standard')}
                      className="accent-brand"
                    />
                    <div>
                      <p className="font-display text-sm font-medium text-ink">Standard Quiet Climate Courier</p>
                      <p className="font-mono text-[11px] text-ink-soft">3–5 business days zero-emission electric van</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-ink">
                    {quote?.totals.shipping === 0 ? 'FREE' : formatMoney(1500, MONEY)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethodId('express')}
                  className={`flex cursor-pointer items-center justify-between rounded-[24px] p-4 transition-all ${
                    shippingMethodId === 'express'
                      ? 'bg-canvas border-2 border-brand shadow-sm'
                      : 'border border-river/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethodId === 'express'}
                      onChange={() => setShippingMethodId('express')}
                      className="accent-brand"
                    />
                    <div>
                      <p className="font-display text-sm font-medium text-ink">Priority Botanical Express</p>
                      <p className="font-mono text-[11px] text-ink-soft">1–2 business days direct routing</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-ink">{formatMoney(3500, MONEY)}</span>
                </label>
              </div>
            </div>

            {/* Step 4: Encrypted Payment */}
            <div className="soft-panel rounded-[32px] bg-surface/90 border border-river/30 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-river/30 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas border border-river/40 font-mono text-xs font-semibold text-ink">
                    04
                  </span>
                  <h2 className="font-display text-xl font-normal text-ink">Payment Method</h2>
                </div>
                <span className="font-mono text-[10px] text-ink-soft uppercase">256-BIT ENCRYPTED</span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cardholder" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Cardholder Name *
                  </label>
                  <input
                    id="cardholder"
                    type="text"
                    required
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="Name as printed on card"
                    className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="cardnum" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Card Number *
                  </label>
                  <input
                    id="cardnum"
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-mono text-xs uppercase text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="exp" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                      Expiry Date *
                    </label>
                    <input
                      id="exp"
                      type="text"
                      required
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-mono text-xs uppercase text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                      Security Code (CVV) *
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      className="w-full rounded-[18px] bg-canvas border border-river/40 p-3 font-mono text-xs uppercase text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" loading={submitting} className="w-full">
              {submitting ? 'Confirming Order...' : 'Complete Sanctuary Order'}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <div className="soft-panel sticky top-24 rounded-[32px] bg-surface/90 border border-river/30 p-6 space-y-6">
            <div className="border-b border-river/30 pb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">ORDER REVIEW</span>
              <h2 className="mt-1 font-display text-2xl font-normal text-ink">
                Summary ({lines.reduce((a, b) => a + b.quantity, 0)} Items)
              </h2>
            </div>

            {/* Line items preview */}
            <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
              {quote?.lines.map((line) => (
                <div key={line.variantId} className="flex items-center gap-3 rounded-[20px] bg-canvas/70 border border-river/20 p-2.5">
                  <div className="h-14 w-12 shrink-0 overflow-hidden rounded-[12px] bg-surface">
                    <img src={line.image.src} alt={line.image.alt} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 font-display text-sm font-medium text-ink">{line.name}</p>
                    <p className="font-mono text-[10px] text-ink-soft uppercase">
                      Qty {line.quantity} • {Object.values(line.options).join(' / ')}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-ink">
                    {formatMoney(line.lineTotal, MONEY)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Ledger */}
            <div className="space-y-3 border-t border-river/30 pt-4 font-mono text-xs uppercase">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="text-ink">{formatMoney(quote?.totals.subtotal ?? 0, MONEY)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Freight</span>
                <span className="text-ink">
                  {quote?.totals.shipping === 0 ? 'FREE' : formatMoney(quote?.totals.shipping ?? 0, MONEY)}
                </span>
              </div>
              {quote?.totals.discount ? (
                <div className="flex justify-between text-brand">
                  <span>Courtesy Credit</span>
                  <span>-{formatMoney(quote.totals.discount, MONEY)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-ink-soft">
                <span>Estimated Tax (8%)</span>
                <span className="text-ink">{formatMoney(quote?.totals.tax ?? 0, MONEY)}</span>
              </div>
              <div className="flex justify-between border-t border-river/30 pt-3 text-base font-semibold text-ink">
                <span>Total Due</span>
                <span className="font-display text-2xl font-normal">{formatMoney(quote?.totals.total ?? 0, MONEY)}</span>
              </div>
            </div>

            {/* Sustainability Guarantee */}
            <div className="rounded-[20px] bg-canvas/70 border border-river/30 p-4 font-mono text-[11px] text-ink-soft uppercase space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-ink">
                <Check size={14} className="text-brand" />
                <span>MOSSEN SUSTAINABLE PLEDGE</span>
              </div>
              <p>100% natural organic fabrics, biodegradable wrapping, tree planted per order.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
