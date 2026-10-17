'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Leaf } from '@/components/icons'
import { WavyDivider } from '@/components/layout/wavy-divider'
import { useToast } from '@/stores/toast-store'

export function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      showToast({ message: 'Please enter a valid email address.', type: 'error' })
      return
    }
    showToast({ message: 'You are subscribed to the Field Dispatch.', type: 'success' })
    setEmail('')
  }

  return (
    <footer className="mt-24 border-t border-river/20 bg-surface/80 pt-8 pb-16">
      {/* Botanical wavy line */}
      <WavyDivider className="mb-12 opacity-50" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Philosophy */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-focus"
            >
              <span className="font-display text-2xl font-normal text-ink lowercase">mossen</span>
              <Leaf size={18} className="sway text-brand" aria-hidden="true" />
            </Link>
            <p className="font-text text-sm leading-relaxed text-ink-soft">
              Small-batch slow garments crafted from natural linen, felted wool, and hand-finished
              stone jewelry. Designed to wear quietly with time.
            </p>
            <div className="pt-2 font-mono text-xs tracking-wider text-ink-faint">
              SLOW PRODUCTION // CARBON OFFSET
            </div>
          </div>

          {/* Curations */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-ink uppercase">
              Curations
            </h3>
            <ul className="mt-4 space-y-2.5 font-text text-sm">
              <li>
                <Link
                  href="/shop/clothing"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Natural Garments
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/accessories"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Soft Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/jewelry"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Stone & Silver Jewelry
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Seasonal Editions
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-ink-soft transition-colors hover:text-ink">
                  Visual Essays
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Care */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-ink uppercase">
              Transparency
            </h3>
            <ul className="mt-4 space-y-2.5 font-text text-sm">
              <li>
                <Link href="/about" className="text-ink-soft transition-colors hover:text-ink">
                  Philosophy & Ethics
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-returns"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Carbon-Neutral Shipping
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-ink-soft transition-colors hover:text-ink">
                  Garment Measurement Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Order Inquiries
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-ink-soft transition-colors hover:text-ink">
                  Sanctuaries & Studios
                </Link>
              </li>
            </ul>
          </div>

          {/* Field Dispatch (Newsletter) */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-ink uppercase">
              Field Dispatch
            </h3>
            <p className="mt-4 font-text text-sm text-ink-soft">
              Quiet seasonal dispatches, natural dye essays, and early access to small batches.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  aria-label="Email address for newsletter"
                  className="pebble w-full border border-border-strong/40 bg-canvas/60 px-4 py-2.5 font-text text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to dispatch"
                  className="pebble absolute top-1/2 right-1.5 -translate-y-1/2 bg-brand p-2 text-on-brand transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-river/20 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-ink-faint">
            &copy; 2026 MOSSEN STUDIOS LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 font-mono text-xs text-ink-soft">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/faq" className="hover:text-ink">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
