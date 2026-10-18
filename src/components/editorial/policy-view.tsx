'use client'

import Link from 'next/link'
import { routes } from '@/config/routes'

export interface PolicySection {
  heading: string
  content: string[]
}

export function PolicyView({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string
  subtitle: string
  lastUpdated: string
  sections: PolicySection[]
}) {
  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-text text-base text-ink-soft md:text-lg">{subtitle}</p>
        <div className="mt-4 text-xs text-ink-faint tabular-nums">Published: {lastUpdated}</div>
      </div>

      {/* Content Sections */}
      <div className="rounded-md border border-ink/10 bg-surface p-8 md:p-12">
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="border-b border-ink/10 pb-3 font-display text-xl font-normal text-ink md:text-2xl">
                {section.heading}
              </h2>
              <div className="space-y-3 font-text text-sm leading-relaxed text-ink-soft md:text-base">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Support footer */}
      <div className="mt-12 text-center font-text text-sm text-ink-soft">
        Questions about our privacy or terms? Please reach out to{' '}
        <Link href={routes.contact} className="font-semibold text-brand hover:underline">
          our care team
        </Link>
        .
      </div>
    </div>
  )
}
