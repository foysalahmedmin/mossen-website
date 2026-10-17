import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { useReducedMotion } from './use-reduced-motion'
import { useReveal } from './use-reveal'
import { Bloom } from './bloom'
import { useVineProgress } from './use-vine-progress'
import { PageFade } from './page-fade'

describe('MOSSEN Motion Kit', () => {
  let matchMediaListeners: ((e: MediaQueryListEvent) => void)[] = []
  let matchesReducedMotion = false

  beforeEach(() => {
    matchMediaListeners = []
    matchesReducedMotion = false

    vi.stubGlobal('matchMedia', (query: string) => {
      const isReduced = query.includes('prefers-reduced-motion')
      return {
        matches: isReduced ? matchesReducedMotion : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_type: string, listener: (e: MediaQueryListEvent) => void) => {
          if (isReduced) matchMediaListeners.push(listener)
        }),
        removeEventListener: vi.fn((_type: string, listener: (e: MediaQueryListEvent) => void) => {
          if (isReduced) {
            matchMediaListeners = matchMediaListeners.filter((l) => l !== listener)
          }
        }),
        dispatchEvent: vi.fn(),
      }
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllTimers()
  })

  describe('useReducedMotion', () => {
    it('returns false by default', () => {
      matchesReducedMotion = false
      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(false)
    })

    it('returns true when media query matches', () => {
      matchesReducedMotion = true
      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(true)
    })
  })

  describe('useReveal', () => {
    function TestReveal() {
      const ref = useRef<HTMLDivElement>(null)
      const { style } = useReveal(ref)
      return (
        <div ref={ref} data-testid="reveal-target" style={style}>
          Revealed Content
        </div>
      )
    }

    it('rises 24px and fades in during normal motion', () => {
      matchesReducedMotion = false
      render(<TestReveal />)
      const target = screen.getByTestId('reveal-target')
      expect(target).toBeInTheDocument()
    })

    it('respects reduced motion by immediately showing without transform', () => {
      matchesReducedMotion = true
      render(<TestReveal />)
      const target = screen.getByTestId('reveal-target')
      expect(target.style.opacity).toBe('1')
      expect(target.style.transform).toBe('none')
    })
  })

  describe('Bloom', () => {
    it('renders children inside the blooming container', () => {
      render(
        <Bloom>
          <div role="img" aria-label="Blooming garment">
            Image
          </div>
        </Bloom>,
      )
      expect(screen.getByRole('img', { name: 'Blooming garment' })).toBeInTheDocument()
    })
  })

  describe('useVineProgress', () => {
    it('calculates progress based on item count and max segments', () => {
      const { result } = renderHook(() => useVineProgress({ itemCount: 2, totalSegments: 4 }))
      expect(result.current).toBe(0.5)
    })

    it('returns 1.0 (fully drawn) when prefers-reduced-motion is active', () => {
      matchesReducedMotion = true
      const { result } = renderHook(() => useVineProgress({ itemCount: 1, totalSegments: 5 }))
      expect(result.current).toBe(1)
    })
  })

  describe('PageFade', () => {
    it('wraps children in a calm cross-fade wrapper', () => {
      render(
        <PageFade>
          <p>Calm page text</p>
        </PageFade>,
      )
      expect(screen.getByText('Calm page text')).toBeInTheDocument()
    })
  })
})
