'use client'

import { useReducedMotion } from './use-reduced-motion'

export interface UseVineProgressOptions {
  itemCount?: number
  totalSegments?: number
  scrollProgress?: number
}

/**
 * Calculates vine growth progress (0 to 1).
 * When reduced motion is preferred, returns 1.0 (fully drawn, static).
 */
export function useVineProgress({
  itemCount,
  totalSegments = 5,
  scrollProgress,
}: UseVineProgressOptions = {}): number {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return 1
  }

  if (scrollProgress !== undefined) {
    return Math.min(1, Math.max(0, scrollProgress))
  }

  if (itemCount !== undefined && totalSegments > 0) {
    return Math.min(1, Math.max(0, itemCount / totalSegments))
  }

  return 1
}
