'use client'

import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import type { Store } from '@/domain'

export function StoresView({ stores = [] }: { stores: Store[] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          <Sparkle size={12} />
          Botanical Ateliers & Sanctuaries
        </span>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-normal tracking-tight text-ink">
          Flagships & Fiber Sanctuaries
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base md:text-lg text-ink-soft">
          Visit our quiet studios to touch living Baltic flax, smell raw Gotland fleeces, and experience peaceful private fitting sessions with botanical tea.
        </p>
      </div>

      {/* Stores Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.id}
            className="flex flex-col justify-between overflow-hidden rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold">
                  {store.city}
                </span>
                <span className="font-mono text-xs text-ink-faint">
                  {store.country}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-normal text-ink">
                {store.name}
              </h2>

              <div className="mt-6 space-y-4 font-text text-sm">
                <div>
                  <span className="block font-mono text-xs uppercase text-ink-faint">Address</span>
                  <p className="mt-1 font-medium text-ink">{store.address}</p>
                  <p className="text-ink-soft">{store.city}, {store.country}</p>
                </div>

                <div>
                  <span className="block font-mono text-xs uppercase text-ink-faint">Telephone</span>
                  <p className="mt-1 text-ink">{store.phone}</p>
                </div>

                <div>
                  <span className="block font-mono text-xs uppercase text-ink-faint">Sanctuary Hours</span>
                  <ul className="mt-1 space-y-1 text-ink-soft">
                    {store.hours.map((line, idx) => (
                      <li key={idx} className="text-xs leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200/60">
              <Button asChild variant="secondary" className="w-full justify-center text-xs">
                <Link href={routes.contact}>
                  Book Tea & Fitting Session
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Tea Consultation Banner */}
      <div className="mt-16 rounded-[32px] border border-stone-200/80 bg-[#fcfbf7] p-8 text-center md:flex md:items-center md:justify-between md:text-left">
        <div>
          <h3 className="font-display text-xl font-normal text-ink">
            Remote Fiber Consultations
          </h3>
          <p className="mt-1 font-text text-sm text-ink-soft">
            Unable to visit a sanctuary in person? Connect with our weavers via gentle video appointment to discuss weights, layers, and care.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <Button asChild>
            <Link href={routes.contact}>Request Virtual Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
