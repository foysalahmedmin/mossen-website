'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from './use-reduced-motion'

export interface BloomProps {
  children: ReactNode
  className?: string
}

export function Bloom({ children, className }: BloomProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'overflow-hidden transition-all',
        reducedMotion ? 'opacity-100' : 'bloom',
        className,
      )}
    >
      {children}
    </div>
  )
}
