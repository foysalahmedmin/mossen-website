'use client'

import { type RefObject, type CSSProperties, useEffect, useState } from 'react'
import { useReducedMotion } from './use-reduced-motion'

export interface UseRevealOptions {
  threshold?: number | number[]
  rootMargin?: string
  once?: boolean
}

export interface UseRevealResult {
  isRevealed: boolean
  style: CSSProperties
}

/**
 * Hook to trigger organic reveal transitions (rise 24px and fade) when an element enters viewport.
 * Automatically respects prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  targetRef: RefObject<T | null>,
  options: UseRevealOptions = {},
): UseRevealResult {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options
  const reducedMotion = useReducedMotion()
  const [revealedByScroll, setRevealedByScroll] = useState<boolean>(false)

  const isRevealed = reducedMotion || revealedByScroll

  useEffect(() => {
    if (reducedMotion) return

    const element = targetRef.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => setRevealedByScroll(true), 0)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setRevealedByScroll(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setRevealedByScroll(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [targetRef, threshold, rootMargin, once, reducedMotion])

  const style: CSSProperties = reducedMotion
    ? { opacity: 1, transform: 'none', transition: 'none' }
    : {
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'none' : 'translateY(24px)',
        transition:
          'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
      }

  return { isRevealed, style }
}
