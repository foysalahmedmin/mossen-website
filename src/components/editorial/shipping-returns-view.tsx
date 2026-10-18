'use client'

import Link from 'next/link'
import { ArrowRight, Check, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'

export function ShippingReturnsView() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold text-brand tabular-nums">
          <Sparkle size={12} />
          Mindful Fulfillment & 30-Day Returns
        </span>
        <h1 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Shipping & Returns
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base text-ink-soft md:text-lg">
          We dispatch every piece in zero-waste botanical wrapping from our Copenhagen warehouse.
          Enjoy complimentary standard shipping on orders over $150 and quiet, simple returns.
        </p>
      </div>

      {/* Rates & Timelines Grid */}
      <section className="mb-16">
        <h2 className="mb-6 text-center font-display text-2xl font-normal text-ink">
          Delivery Options & Timelines
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-md border border-stone-200/80 bg-[#fbf9f5] p-6">
            <span className="text-xs font-semibold text-brand tabular-nums">Standard Ground</span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium text-ink">$8</span>
              <span className="font-text text-xs text-ink-soft">or Free over $150</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Delivered within 3 to 5 business days via PostNord Climate Priority.
            </p>
            <ul className="mt-4 space-y-2 border-t border-stone-200/60 pt-4 font-text text-xs text-ink-soft">
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

          <div className="relative rounded-md border-2 border-brand/50 bg-[#fcfbf7] p-6">
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
            <ul className="mt-4 space-y-2 border-t border-stone-200/60 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                Same-day atelier packing before 12:00 CET
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand" />
                Direct doorstep courier delivery
              </li>
            </ul>
          </div>

          <div className="rounded-md border border-stone-200/80 bg-[#fbf9f5] p-6">
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
            <ul className="mt-4 space-y-2 border-t border-stone-200/60 pt-4 font-text text-xs text-ink-soft">
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
      <section className="mb-16 rounded-md border border-stone-200/80 bg-[#fbf9f5] p-8 md:p-12">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-brand tabular-nums">30-Day Living Trial</span>
          <h2 className="mt-2 font-display text-2xl font-normal text-ink md:text-3xl">
            Mindful Returns & Exchanges
          </h2>
          <p className="mt-3 font-text text-base leading-relaxed text-ink-soft">
            We invite you to spend time with our garments—to feel their weight and drape against
            your skin. If a piece does not suit you, returns are accepted within 30 days of receipt.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-md border border-stone-200/60 bg-white p-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 01</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Request Return</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Log into your Account portal to create a prepaid return courier shipping label.
              </p>
            </div>

            <div className="rounded-md border border-stone-200/60 bg-white p-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 02</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Rewrap Garment</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Place unworn garments into their reusable organic cotton envelope with wooden tags
                attached.
              </p>
            </div>

            <div className="rounded-md border border-stone-200/60 bg-white p-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 03</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Courier Drop-Off</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Drop off at any authorized parcel shop or book a complimentary doorstep courier
                pickup.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-md bg-stone-100/60 p-4 font-text text-xs text-ink-soft">
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
          Track your dispatch progress in real time through our delivery portal.
        </p>
        <div className="mt-6 flex justify-center gap-4">
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
