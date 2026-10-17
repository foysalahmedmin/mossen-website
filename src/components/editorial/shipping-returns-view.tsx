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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          <Sparkle size={12} />
          Mindful Fulfillment & 30-Day Returns
        </span>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-normal tracking-tight text-ink">
          Shipping & Returns
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base md:text-lg text-ink-soft">
          We dispatch every piece in zero-waste botanical wrapping from our Copenhagen warehouse. Enjoy complimentary standard shipping on orders over $150 and quiet, simple returns.
        </p>
      </div>

      {/* Rates & Timelines Grid */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-normal text-ink mb-6 text-center">
          Delivery Options & Timelines
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-6 shadow-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold">
              Standard Ground
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-ink">$8</span>
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

          <div className="rounded-[32px] border-2 border-brand/50 bg-[#fcfbf7] p-6 shadow-sm relative">
            <span className="absolute -top-3 right-6 rounded-full bg-brand px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-on-brand">
              Recommended
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold">
              Express Air Courier
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-ink">$18</span>
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

          <div className="rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-6 shadow-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold">
              International Delivery (DDP)
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-ink">$28</span>
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
      <section className="mb-16 rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-8 md:p-12 shadow-sm">
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            30-Day Living Trial
          </span>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-normal text-ink">
            Mindful Returns & Exchanges
          </h2>
          <p className="mt-3 font-text text-base leading-relaxed text-ink-soft">
            We invite you to spend time with our garments—to feel their weight and drape against your skin. If a piece does not suit you, returns are accepted within 30 days of receipt.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-[20px] bg-white p-4 border border-stone-200/60">
              <span className="font-mono text-xs font-bold text-ink">Step 01</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Request Return</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Log into your Account portal to create a prepaid return courier shipping label.
              </p>
            </div>

            <div className="rounded-[20px] bg-white p-4 border border-stone-200/60">
              <span className="font-mono text-xs font-bold text-ink">Step 02</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Rewrap Garment</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Place unworn garments into their reusable organic cotton envelope with wooden tags attached.
              </p>
            </div>

            <div className="rounded-[20px] bg-white p-4 border border-stone-200/60">
              <span className="font-mono text-xs font-bold text-ink">Step 03</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Courier Drop-Off</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Drop off at any authorized parcel shop or book a complimentary doorstep courier pickup.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[16px] bg-stone-100/60 p-4 font-text text-xs text-ink-soft">
            <span className="font-semibold text-ink">Refund Processing:</span> Refunds are credited to your original payment method within 48 hours of studio intake and inspection.
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
