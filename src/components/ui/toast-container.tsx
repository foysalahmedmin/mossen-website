'use client'

import { Leaf, X } from '@/components/icons'
import { cn } from '@/lib/cn'
import { useToastStore } from '@/stores/toast-store'

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const dismissToast = useToastStore((s) => s.dismissToast)

  if (toasts.length === 0) return null

  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 mx-auto flex w-full max-w-sm flex-col items-center gap-2 px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pebble pointer-events-auto flex items-center justify-between gap-3 border border-border-strong/40 bg-surface/95 px-5 py-3 backdrop-blur-md transition-all',
            'animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:duration-0',
          )}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <X size={16} className="shrink-0 text-danger" aria-hidden="true" />
            ) : (
              <Leaf size={16} className="shrink-0 text-brand" aria-hidden="true" />
            )}
            <p className="font-text text-sm font-medium text-ink">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="pebble -mr-1 p-1 text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  )
}
