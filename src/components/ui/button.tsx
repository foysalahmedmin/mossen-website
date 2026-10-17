'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import type { ButtonHTMLAttributes } from 'react'
import { SpinnerIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-500 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: [
          'rounded-full bg-brand text-on-brand font-medium float-sm',
          'hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-[var(--float)]',
          'active:translate-y-0 active:scale-100',
        ],
        secondary: [
          'rounded-full bg-surface text-ink border border-border-strong/40 font-medium float-sm',
          'hover:bg-surface/80 hover:-translate-y-0.5',
          'active:translate-y-0',
        ],
        ghost: ['rounded-full bg-transparent text-ink hover:bg-brand/10 font-medium'],
      },
      size: {
        sm: 'h-9 px-4 text-xs font-mono tracking-wider gap-2',
        md: 'h-11 px-6 text-sm gap-2.5',
        lg: 'h-13 px-8 text-base gap-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  asChild = false,
  className,
  disabled,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button'
  const buttonOnly = asChild ? {} : { type, disabled: disabled || loading }

  return (
    <Component
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...buttonOnly}
      {...rest}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && (
            <SpinnerIcon className="animate-spin text-current" size={16} aria-hidden="true" />
          )}
          {children}
        </>
      )}
    </Component>
  )
}
