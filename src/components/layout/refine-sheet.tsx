'use client'

import type { ReactNode } from 'react'
import { Faders } from '@/components/icons'
import { Dialog } from '@/components/ui'
import { cn } from '@/lib/cn'

export interface RefineSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerLabel?: string
  activeCount?: number
  className?: string
  children: ReactNode
}

export function RefineSheet({
  open,
  onOpenChange,
  triggerLabel = 'Refine',
  activeCount = 0,
  className,
  children,
}: RefineSheetProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Refine Collection"
      description="Select parameters to filter garments"
      closeLabel="Close filter panel"
      side="bottom"
      trigger={
        <button
          type="button"
          aria-label={triggerLabel}
          className={cn(
            'pebble float-sm inline-flex cursor-pointer items-center gap-2.5 border border-border-strong/40 bg-surface px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-ink uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface/90 focus-visible:outline-2 focus-visible:outline-focus',
            activeCount > 0 && 'border-brand bg-brand text-on-brand shadow-[var(--float-sm)]',
            className,
          )}
        >
          <Faders size={16} aria-hidden="true" />
          <span>{triggerLabel}</span>
          {activeCount > 0 ? (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-surface px-1 font-mono text-[9px] font-bold text-ink">
              {activeCount}
            </span>
          ) : null}
        </button>
      }
      className="max-h-[85vh] overflow-y-auto rounded-t-[36px] rounded-b-none border-t border-river/30 bg-surface p-6 sm:p-10"
    >
      <div className="pt-2">{children}</div>
    </Dialog>
  )
}
