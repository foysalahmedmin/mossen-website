'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash } from '@/components/icons'
import { QuantityStepper } from '@/components/ui'
import { formatMoney } from '@/domain'
import { cn } from '@/lib/cn'
import type { CartLineProps } from './contract'

export function CartLine({
  line,
  href,
  money,
  onQuantityChange,
  onRemove,
  labels,
  extra,
  className,
}: CartLineProps & { className?: string }) {
  const unavailable = line.issue === 'out-of-stock'

  return (
    <li
      className={cn(
        'soft-panel flex flex-col items-start justify-between gap-4 rounded-md bg-surface/80 p-4 transition-all sm:flex-row sm:items-center md:p-5',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {/* Soft pebble thumbnail */}
        <div className="pebble h-24 w-20 shrink-0 overflow-hidden bg-canvas/60">
          <Link href={href} className="relative block h-full w-full">
            <Image
              src={line.image.src}
              alt={line.image.alt}
              width={line.image.width}
              height={line.image.height}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        </div>

        <div className="space-y-1">
          <Link
            href={href}
            className="line-clamp-1 font-display text-base font-medium text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-focus"
          >
            {line.name}
          </Link>
          <p className="text-xs text-ink-soft tabular-nums">
            {Object.values(line.options).join(' · ')}
          </p>
          {unavailable ? (
            <p className="text-xs font-medium text-danger tabular-nums">{labels.outOfStock}</p>
          ) : null}
          {line.issue === 'limited-stock' ? (
            <p className="text-xs font-medium text-amber-800 tabular-nums">{labels.limitedStock}</p>
          ) : null}
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-6 border-t border-river/20 pt-3 sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0">
        {unavailable ? null : (
          <QuantityStepper
            value={line.quantity}
            onChange={(quantity) => onQuantityChange(line.variantId, quantity)}
            labels={labels.quantity}
          />
        )}

        <div className="min-w-[5rem] text-right text-sm font-semibold text-ink tabular-nums sm:text-base">
          {formatMoney(line.lineTotal, money)}
        </div>

        <button
          type="button"
          aria-label={`${labels.remove}: ${line.name}`}
          onClick={() => onRemove(line.variantId)}
          className="pebble flex h-9 w-9 items-center justify-center border border-border-strong/30 bg-canvas/60 text-ink-soft transition-colors hover:bg-canvas hover:text-danger focus-visible:outline-2 focus-visible:outline-focus"
        >
          <Trash size={16} aria-hidden="true" />
        </button>
      </div>

      {extra}
    </li>
  )
}
