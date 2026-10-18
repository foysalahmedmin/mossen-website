'use client'

import { RadioGroup } from 'radix-ui'
import { cn } from '@/lib/cn'

export interface PickerOption {
  value: string
  label: string
  /** Hex colour for colour options. */
  swatch?: string
  unavailable?: boolean
}

export interface OptionPickerProps {
  label: string
  options: PickerOption[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

/** Single choice from a few options (sizes, colours, materials). Arrow keys move the selection. */
export function OptionPicker({
  label,
  options,
  value,
  onValueChange,
  className,
}: OptionPickerProps) {
  return (
    <RadioGroup.Root
      aria-label={label}
      value={value}
      onValueChange={onValueChange}
      className={cn('flex flex-wrap gap-3', className)}
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          disabled={option.unavailable}
          aria-label={option.label}
          style={option.swatch ? { ['--swatch' as string]: option.swatch } : undefined}
          className={cn(
            'pebble flex h-[54px] w-[54px] cursor-pointer items-center justify-center border border-border-strong/40 bg-surface text-xs font-semibold text-ink tabular-nums transition-all duration-300 select-none',
            'hover:border-brand/50',
            'data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-on-brand',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
            option.unavailable &&
              'border-sink/60 hover:border-sink/60 relative cursor-not-allowed border-dashed opacity-40',
          )}
        >
          {option.unavailable && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px scale-125 -rotate-45 bg-ink-faint"
            />
          )}
          {option.swatch ? (
            <span
              aria-hidden="true"
              className="h-5 w-5 rounded-full border border-black/15"
              style={{ backgroundColor: option.swatch }}
            />
          ) : (
            option.label
          )}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
