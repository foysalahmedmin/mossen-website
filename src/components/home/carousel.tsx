'use client'

import { useRef, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from '@/components/icons'

/** A heading on the left, soft round buttons on the right, and a row that snaps as it scrolls. */
export function Carousel({
  heading,
  action,
  label,
  children,
}: {
  heading: ReactNode
  action?: ReactNode
  label: string
  children: ReactNode
}) {
  const track = useRef<HTMLUListElement>(null)

  const move = (direction: -1 | 1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const button =
    'flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus'

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pb-10">
        <div>{heading}</div>
        <div className="flex items-center gap-6">
          {action}
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={`Previous ${label}`}
              onClick={() => move(-1)}
              className={button}
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Next ${label}`}
              onClick={() => move(1)}
              className={button}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory scrollbar-none gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {children}
      </ul>
    </div>
  )
}
