'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from '@/components/icons'
import { Price } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { ProductCardProps } from './contract'

export function ProductCard({
  product,
  href,
  money,
  saved,
  onToggleSaved,
  priority,
  tryOnSlot,
  labels,
  className,
}: ProductCardProps & { className?: string }) {
  const image = product.media[0]!

  return (
    <article
      data-testid="product-card"
      className={cn(
        'group relative flex flex-col justify-between transition-all duration-300',
        className,
      )}
    >
      <div className="relative">
        <Link
          href={href}
          className="block overflow-hidden rounded-[28px] focus-visible:outline-2 focus-visible:outline-focus"
        >
          {/* Mask as card: The image mask IS the card surface */}
          <div className="float-sm relative aspect-[3/4] w-full overflow-hidden bg-surface transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[var(--float)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={priority}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
            />
          </div>

          <div className="mt-3.5 space-y-1">
            <h3 className="line-clamp-1 font-display text-base font-normal text-ink transition-colors group-hover:text-brand">
              {product.name}
            </h3>
          </div>
        </Link>

        {/* Badges - Birch pebbles */}
        {product.badges.length > 0 ? (
          <ul className="pointer-events-none absolute top-3.5 left-3.5 z-10 m-0 flex list-none flex-col gap-1.5 p-0">
            {product.badges.map((badge) => (
              <li
                key={badge}
                className={cn(
                  'pebble border border-border-strong/30 bg-surface/90 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs',
                  badge === 'sale' ? 'text-danger' : 'text-ink',
                )}
              >
                {labels.badges[badge]}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Wishlist Button - Soft pebble */}
        <button
          type="button"
          aria-pressed={saved}
          onClick={() => onToggleSaved(product.id)}
          className={cn(
            'pebble absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center border border-border-strong/30 bg-surface/90 text-ink backdrop-blur-xs transition-all duration-300',
            saved && 'border-brand bg-brand text-on-brand shadow-[var(--float-sm)]',
            'focus-visible:outline-2 focus-visible:outline-focus',
          )}
        >
          <Heart size={16} weight={saved ? 'fill' : 'regular'} aria-hidden="true" />
          <span className="sr-only">{labels.save}</span>
        </button>

        {/* Try On Trigger Slot */}
        {tryOnSlot ? <div className="absolute bottom-3 left-3 z-10">{tryOnSlot}</div> : null}
      </div>

      <div className="mt-1 flex items-center justify-between">
        <Price
          amount={product.price}
          compareAt={product.compareAtPrice}
          currency={money.currency}
          locale={money.locale}
          labels={{ sale: labels.sale, original: labels.original }}
        />
      </div>
    </article>
  )
}
