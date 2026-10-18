'use client'

import { Minus, Plus } from '@/components/icons'
import { cn } from '@/lib/cn'

export interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  labels: { group: string; decrease: string; increase: string }
  className?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  labels,
  className,
}: QuantityStepperProps) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)))

  return (
    <div
      role="group"
      aria-label={labels.group}
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-border-strong/30 bg-surface/60 p-1 backdrop-blur-xs',
        className,
      )}
    >
      <button
        type="button"
        aria-label={labels.decrease}
        disabled={value <= min}
        onClick={() => set(value - 1)}
        className="pebble flex h-8 w-8 items-center justify-center border border-border-strong/40 bg-surface text-ink transition-all hover:bg-surface/90 focus-visible:outline-2 focus-visible:outline-focus active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={14} aria-hidden="true" />
      </button>
      <output
        aria-live="polite"
        className="min-w-8 px-2 text-center text-xs font-semibold text-ink tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        aria-label={labels.increase}
        disabled={value >= max}
        onClick={() => set(value + 1)}
        className="pebble flex h-8 w-8 items-center justify-center border border-border-strong/40 bg-surface text-ink transition-all hover:bg-surface/90 focus-visible:outline-2 focus-visible:outline-focus active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  )
}
