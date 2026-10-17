'use client'

import { useState } from 'react'
import { ArrowRight, Check, Leaf } from '@/components/icons'
import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'

interface NewsletterSectionProps {
  title: string
  description: string
  placeholder: string
  cta: string
  className?: string
}

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
    setTimeout(() => {
      setStatus('success')
    }, 400)
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={cn(
        'border-border relative space-y-4 overflow-hidden rounded-[36px] border bg-surface p-8 text-center md:p-14',
        className,
      )}
    >
      <div className="mx-auto max-w-2xl space-y-3">
        <div className="border-border inline-flex items-center gap-2 rounded-full border px-4 py-1 font-serif text-xs text-brand">
          <Leaf size={14} className="text-brand" />
          <span>Seasonal Correspondence</span>
        </div>
        <h2
          id="newsletter-heading"
          className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
        >
          {title}
        </h2>
        <p className="font-text text-sm leading-relaxed text-ink-soft md:text-base">
          {description}
        </p>

        {status === 'success' ? (
          <div className="border-border inline-flex items-center gap-2 rounded-full border bg-canvas px-5 py-2.5 font-serif text-sm text-ink">
            <Check size={16} className="text-brand" />
            <span>Thank you. Our seasonal reflection has been reserved for you.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              aria-label="Email address for seasonal letter"
              className="border-border h-12 flex-1 rounded-full border bg-canvas px-5 font-serif text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={status === 'loading'}
              className="h-12 rounded-full px-7 font-serif text-sm"
            >
              <span>{cta}</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
