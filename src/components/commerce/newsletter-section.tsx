'use client'

import { useState } from 'react'
import { ArrowRight, Check, Leaf } from '@/components/icons'
import { cn } from '@/lib/cn'

interface NewsletterSectionProps {
  title: string
  description: string
  placeholder: string
  cta: string
  className?: string
}

/** A quiet centred band on the linen: a leaf, one line of copy, one field. */
export function NewsletterSection({
  title,
  description,
  placeholder,
  cta,
  className,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    setTimeout(() => setStatus('success'), 400)
  }

  return (
    <section aria-labelledby="newsletter-heading" className={cn('bg-surface', className)}>
      <div className="page-container py-16 text-center md:py-24">
        <Leaf size={22} aria-hidden="true" className="mx-auto text-brand" />
        <h2
          id="newsletter-heading"
          className="mt-5 font-display text-3xl leading-tight font-normal tracking-tight text-ink md:text-5xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
          {description}
        </p>

        {status === 'success' ? (
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink" role="status">
            <Check size={16} aria-hidden="true" />
            Thank you for subscribing. Our next email will land in your inbox.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md items-end gap-3 border-b border-ink/40"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              aria-label="Email address for newsletter"
              className="h-12 flex-1 bg-transparent text-base text-ink placeholder:text-ink-faint focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mb-2 inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-brand px-4 text-sm font-medium text-on-brand transition hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-60"
            >
              {cta}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
