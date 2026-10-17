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
        'relative overflow-hidden rounded-[36px] border border-border bg-surface p-8 md:p-14 text-center space-y-4',
        className,
      )}
    >
      <div className="mx-auto max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1 text-xs font-serif text-brand">
          <Leaf size={14} className="text-brand" />
          <span>Seasonal Correspondence</span>
        </div>
        <h2 id="newsletter-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        <p className="font-text text-sm md:text-base text-ink-soft leading-relaxed">{description}</p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-canvas px-5 py-2.5 text-sm font-serif text-ink">
            <Check size={16} className="text-brand" />
            <span>Thank you. Our seasonal reflection has been reserved for you.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              aria-label="Email address for seasonal letter"
              className="h-12 flex-1 rounded-full border border-border bg-canvas px-5 font-serif text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
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
