'use client'

import { useState } from 'react'
import { Leaf, X } from '@/components/icons'
import { cn } from '@/lib/cn'

export interface AnnouncementBarProps {
  message?: string
  className?: string
}

export function AnnouncementBar({
  message = 'Complimentary worldwide carbon-neutral delivery on all orders over £150',
  className,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <aside
      aria-label="Announcement"
      className={cn(
        'relative border-b border-river/30 bg-surface/90 px-4 py-2 text-center backdrop-blur-xs transition-all',
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
        <Leaf size={14} className="shrink-0 text-brand" aria-hidden="true" />
        <p className="font-text text-xs text-ink-soft">{message}</p>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="pebble absolute top-1/2 right-3 -translate-y-1/2 p-1 text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </aside>
  )
}
