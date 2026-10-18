'use client'

import Link from 'next/link'
import { ArrowRight, Check } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'

export function ShippingReturnsView() {
  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Shipping & Returns
        </h1>
        <p className="mt-4 font-text text-base text-ink-soft md:text-lg">
          We ship every piece in zero-waste wrapping from our Copenhagen warehouse. Enjoy
          complimentary standard shipping on orders over $150 and quiet, simple returns.
        </p>
      </div>

      {/* Rates & Timelines Grid */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-2xl font-normal text-ink">
          Delivery Options & Timelines
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-md border border-ink/10 bg-surface p-6">
            <span className="text-xs font-semibold text-brand tabular-nums">Standard Ground</span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium text-ink">$8</span>
              <span className="font-text text-xs text-ink-soft">or Free over $150</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Delivered within 3 to 5 business days via PostNord Climate Priority.
            </p>
            <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                100% recycled unbleached kraft box
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                Carbon-neutral route offset
              </li>
            </ul>
          </div>

          <div className="relative rounded-md border-2 border-brand/50 bg-surface p-6">
            <span className="absolute -top-3 right-6 rounded-md bg-brand px-3 py-0.5 text-[10px] font-semibold text-on-brand tabular-nums">
              Recommended
            </span>
            <span className="text-xs font-semibold text-brand tabular-nums">
              Express Air Courier
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium text-ink">$18</span>
              <span className="font-text text-xs text-ink-soft">Flat rate</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Arrives within 1 to 2 business days via priority DHL Express.
            </p>
            <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                Packed the same day if ordered before 12:00 CET
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                Direct doorstep courier delivery
              </li>
            </ul>
          </div>

          <div className="rounded-md border border-ink/10 bg-surface p-6">
            <span className="text-xs font-semibold text-brand tabular-nums">
              International Delivery (DDP)
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium text-ink">$28</span>
              <span className="font-text text-xs text-ink-soft">Duties included</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Worldwide delivery to 60+ countries in 2 to 4 business days via DHL Express.
            </p>
            <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                Import duties & taxes pre-calculated
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                Guaranteed zero customs charges on arrival
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Returns Policy & Process */}
      <section className="mb-16 rounded-md border border-ink/10 bg-surface p-8 md:p-12">
        <div className="max-w-3xl">
          <h2 className="mt-2 font-display text-2xl font-normal text-ink md:text-3xl">
            Mindful Returns & Exchanges
          </h2>
          <p className="mt-3 font-text text-base leading-relaxed text-ink-soft">
            We invite you to spend time with our garments—to feel their weight and drape against
            your skin. If a piece does not suit you, returns are accepted within 30 days of receipt.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-md border border-ink/10 bg-white p-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 01</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Request Return</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Log into your Account portal to create a prepaid return courier shipping label.
              </p>
            </div>

            <div className="rounded-md border border-ink/10 bg-white p-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 02</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Rewrap Garment</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Place unworn garments into their reusable organic cotton envelope with wooden tags
                attached.
              </p>
            </div>

            <div className="rounded-md border border-ink/10 bg-white p-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 03</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Courier Drop-Off</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Drop off at any authorized parcel shop or book a complimentary doorstep courier
                pickup.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-md bg-ink/5 p-4 font-text text-xs text-ink-soft">
            <span className="font-semibold text-ink">Refund Processing:</span> Refunds are credited
            to your original payment method within 48 hours of studio intake and inspection.
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h3 className="font-display text-xl font-normal text-ink">
          Checking on a package in transit?
        </h3>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Follow your parcel in real time with the tracking link.
        </p>
        <div className="mt-6 flex gap-4">
          <Button asChild>
            <Link href={routes.trackOrder}>
              Track Your Parcel
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={routes.faq}>Review Shipping FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
