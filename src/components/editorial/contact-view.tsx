'use client'

import { useState } from 'react'
import { ArrowRight, Check, Sparkle } from '@/components/icons'
import { Button, TextField } from '@/components/ui'
import { brand } from '@/config/brand'

interface FormState {
  name: string
  email: string
  topic: string
  orderNumber: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  topic?: string
  message?: string
}

const TOPICS = [
  { value: 'order', label: 'Order Inquiry & Delivery Status' },
  { value: 'fitting', label: 'Natural Fiber & Botanical Sizing Advice' },
  { value: 'care', label: 'Linen Care, Mending & Lanolin Revival' },
  { value: 'press', label: 'Press, Collaborations & Farm Visits' },
  { value: 'other', label: 'General Sanctuary Inquiry' },
]

export function ContactView() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    topic: 'order',
    orderNumber: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) {
      newErrors.name = 'Please let us know your name.'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Please provide an email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please provide a valid email format.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Please share a brief message of at least 10 characters.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTicketId(`MOS-${Math.floor(100000 + Math.random() * 900000)}`)
    }, 700)
  }

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      topic: 'order',
      orderNumber: '',
      message: '',
    })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-brand uppercase">
          <Sparkle size={12} />
          Client Concierge & Care Sanctuary
        </span>
        <h1 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Quiet Concierge & Care
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base text-ink-soft md:text-lg">
          We welcome your questions regarding our natural dye recipes, Baltic linen care, garment
          mending, and order tracking.
        </p>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-12">
        {/* Form Card */}
        <div className="lg:col-span-7">
          <div className="rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-8 shadow-sm md:p-10">
            {submitted ? (
              <div className="py-6 text-center" role="status">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check size={32} />
                </div>
                <h2 className="font-display text-2xl font-normal text-ink md:text-3xl">
                  Inquiry Received with Warmth
                </h2>
                <p className="mt-2 font-mono text-xs font-semibold tracking-wider text-brand uppercase">
                  Reference: {ticketId}
                </p>
                <p className="mx-auto mt-4 max-w-md font-text text-sm leading-relaxed text-ink-soft md:text-base">
                  Thank you for writing to us, {form.name}. Our atelier staff has received your
                  inquiry and will send a thoughtful reply to{' '}
                  <span className="font-semibold text-ink">{form.email}</span> within one business
                  day.
                </p>

                <div className="mt-8">
                  <Button onClick={handleReset} variant="secondary">
                    Send Another Note
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-normal text-ink">
                    Write to Our Atelier
                  </h2>
                  <p className="mt-1 font-text text-xs text-ink-soft">
                    Every message is personally read and answered from our Stockholm studio.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    label="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                    placeholder="Astrid Lind"
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={errors.email}
                    placeholder="astrid@meadow.se"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="topic-select-mos"
                      className="font-text text-sm font-medium text-ink"
                    >
                      Subject Matter
                    </label>
                    <select
                      id="topic-select-mos"
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="h-12 w-full rounded-[16px] border border-stone-200 bg-white px-4 font-text text-sm text-ink focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      {TOPICS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <TextField
                    label="Order Number (Optional)"
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    placeholder="MOS-80129"
                    hint="For questions regarding parcels in transit"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message-input-mos"
                    className="font-text text-sm font-medium text-ink"
                  >
                    Your Thoughts or Inquiry
                  </label>
                  <textarea
                    id="message-input-mos"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How may our weavers and natural dyers assist with your wardrobe?"
                    className="w-full rounded-[16px] border border-stone-200 bg-white p-4 font-text text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
                  />
                  {errors.message ? (
                    <p className="font-text text-xs text-danger" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                >
                  {isSubmitting ? 'Sending to Atelier...' : 'Submit Inquiry'}
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Studio Contacts Side Card */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-8 shadow-sm">
            <h3 className="font-display text-lg font-normal text-ink">Direct Atelier Sanctuary</h3>
            <ul className="mt-5 space-y-4 font-text text-sm">
              <li className="flex flex-col">
                <span className="font-mono text-xs text-ink-faint uppercase">Client Concierge</span>
                <a
                  href={`mailto:concierge@${brand.id}-atelier.com`}
                  className="mt-1 font-semibold text-brand hover:underline"
                >
                  concierge@{brand.id}-atelier.com
                </a>
              </li>
              <li className="flex flex-col">
                <span className="font-mono text-xs text-ink-faint uppercase">Telephone</span>
                <span className="mt-1 text-ink">+46 8 555 4120</span>
              </li>
              <li className="flex flex-col">
                <span className="font-mono text-xs text-ink-faint uppercase">Studio Hours</span>
                <span className="mt-1 text-ink-soft">
                  Tuesday – Saturday: 10:00 – 18:00 CET
                  <br />
                  Sunday – Monday: Resting with the meadow
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-8 shadow-sm">
            <h3 className="font-display text-lg font-normal text-ink">
              Gamla Stan Sanctuary Visits
            </h3>
            <p className="mt-3 font-text text-sm leading-relaxed text-ink-soft">
              Private fitting chamber sessions and tea consultations are available by gentle
              appointment at Prästgatan 44, Stockholm.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
