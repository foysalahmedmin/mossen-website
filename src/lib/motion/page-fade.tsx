'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from './use-reduced-motion'

export interface PageFadeProps {
  children: ReactNode
  className?: string
}

export function PageFade({ children, className }: PageFadeProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'w-full transition-opacity',
        reducedMotion ? 'opacity-100 duration-150' : 'page-fade',
        className,
      )}
    >
      {children}
    </div>
  )
}
