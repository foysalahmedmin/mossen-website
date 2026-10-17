'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from '@/components/icons'
import { cn } from '@/lib/cn'
import type { GalleryProps } from './contract'

export function Gallery({ media, labels, className }: GalleryProps & { className?: string }) {
  const [index, setIndex] = useState(0)
  const current = media[index]!

  return (
    <section aria-label={labels.group} className={cn('space-y-4', className)}>
      {/* Arch-shaped Gallery Window */}
      <div className="float-sm relative aspect-[4/5] w-full overflow-hidden rounded-t-[140px] rounded-b-[28px] bg-surface">
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          priority
          className="h-full w-full object-cover transition-opacity duration-500"
        />

        {/* Floating Pebble Navigation Buttons */}
        <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between">
          <button
            type="button"
            aria-label={labels.previous}
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            className="pebble pointer-events-auto flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/90 text-ink backdrop-blur-xs transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            disabled={index === media.length - 1}
            onClick={() => setIndex(index + 1)}
            className="pebble pointer-events-auto flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/90 text-ink backdrop-blur-xs transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Position Readout and Pebble Thumbnail Selectors */}
      <div className="flex items-center justify-between gap-4 px-2">
        <p
          aria-live="polite"
          className="font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase"
        >
          {labels.position(index + 1, media.length)}
        </p>

        {media.length > 1 ? (
          <div className="flex items-center gap-2">
            {media.map((item, i) => {
              const isActive = i === index
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={labels.position(i + 1, media.length)}
                  className={cn(
                    'pebble h-12 w-10 overflow-hidden border transition-all',
                    isActive
                      ? 'border-brand ring-2 ring-brand ring-offset-2'
                      : 'border-border-strong/40 opacity-70 hover:opacity-100',
                  )}
                >
                  <div className="relative h-full w-full">
                    <Image src={item.src} alt="" fill className="object-cover" />
                  </div>
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
