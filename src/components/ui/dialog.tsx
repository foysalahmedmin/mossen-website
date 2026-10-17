'use client'

import { Dialog as RadixDialog } from 'radix-ui'
import type { ReactNode } from 'react'
import { X } from '@/components/icons'
import { cn } from '@/lib/cn'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactNode
  title: string
  description?: string
  closeLabel: string
  /** Layout hint for the brand skin: a centred modal, or a drawer from the right or bottom. */
  side?: 'center' | 'right' | 'bottom'
  className?: string
  children?: ReactNode
}

/** Modal with focus trap, Escape to close and focus return, courtesy of Radix. Title is required. */
export function Dialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  closeLabel,
  side = 'center',
  className,
  children,
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          data-overlay=""
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
        />
        <RadixDialog.Content
          data-side={side}
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
            'soft-panel space-y-4 bg-surface p-8 text-ink transition-all duration-400 focus-visible:outline-none sm:p-10',
            className,
          )}
          {...(description ? {} : { 'aria-describedby': undefined })}
        >
          <div className="space-y-1.5 pr-8">
            <RadixDialog.Title className="font-display text-2xl font-normal text-ink">
              {title}
            </RadixDialog.Title>
            {description ? (
              <RadixDialog.Description className="font-text text-sm text-ink-soft">
                {description}
              </RadixDialog.Description>
            ) : null}
          </div>

          <div className="pt-2">{children}</div>

          <RadixDialog.Close
            aria-label={closeLabel}
            className="pebble absolute top-6 right-6 flex h-9 w-9 cursor-pointer items-center justify-center bg-canvas/60 text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X size={18} aria-hidden="true" />
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
