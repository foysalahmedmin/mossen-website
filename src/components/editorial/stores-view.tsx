'use client'

import Link from 'next/link'
import { ArrowRight } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import type { Store } from '@/domain'

export function StoresView({ stores = [] }: { stores: Store[] }) {
  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Our studios
        </h1>
        <p className="mt-4 font-text text-base text-ink-soft md:text-lg">
          Visit our quiet studios to touch living Baltic flax, smell raw Gotland fleeces, and
          experience peaceful private fitting sessions with botanical tea.
        </p>
      </div>

      {/* Stores Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.id}
            className="flex flex-col justify-between overflow-hidden rounded-md border border-ink/10 bg-surface p-8 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand tabular-nums">{store.city}</span>
                <span className="text-xs text-ink-faint tabular-nums">{store.country}</span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-normal text-ink">{store.name}</h2>

              <div className="mt-6 space-y-4 font-text text-sm">
                <div>
                  <span className="block text-xs text-ink-faint tabular-nums">Address</span>
                  <p className="mt-1 font-medium text-ink">{store.address}</p>
                  <p className="text-ink-soft">
                    {store.city}, {store.country}
                  </p>
                </div>

                <div>
                  <span className="block text-xs text-ink-faint tabular-nums">Telephone</span>
                  <p className="mt-1 text-ink">{store.phone}</p>
                </div>

                <div>
                  <span className="block text-xs text-ink-faint tabular-nums">Opening hours</span>
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

            <div className="mt-8 border-t border-ink/10 pt-6">
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
      <div className="mt-16 rounded-md border border-ink/10 bg-surface p-8 text-center md:flex md:items-center md:justify-between md:text-left">
        <div>
          <h3 className="font-display text-xl font-normal text-ink">Remote Fiber Consultations</h3>
          <p className="mt-1 font-text text-sm text-ink-soft">
            Cannot visit in person? Book a video appointment with one of our weavers.
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
