import { useId } from 'react'
import { Star } from '@/components/icons'
import { cn } from '@/lib/cn'
import type { ReviewSummaryProps } from './contract'

const ROWS = [5, 4, 3, 2, 1] as const

export function ReviewSummary({
  rating,
  distribution,
  labels,
  className,
}: ReviewSummaryProps & { className?: string }) {
  const headingId = useId()
  const total = ROWS.reduce((sum, stars) => sum + distribution[stars], 0)

  return (
    <section
      aria-labelledby={headingId}
      className={cn('soft-panel space-y-6 rounded-[32px] bg-surface p-6 sm:p-8', className)}
    >
      <div className="flex flex-col items-start justify-between gap-4 border-b border-river/30 pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 id={headingId} className="font-display text-xl font-medium text-ink">
            {labels.heading}
          </h2>
          <p className="mt-1 font-mono text-xs tracking-wider text-ink-soft uppercase">
            {labels.count(rating.count)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-display text-3xl font-normal text-ink">
            {labels.outOf(rating.average)}
          </span>
          <div className="flex text-brand" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                weight={s <= Math.round(rating.average) ? 'fill' : 'regular'}
              />
            ))}
          </div>
        </div>
      </div>

      <ul role="list" className="m-0 list-none space-y-2.5 p-0">
        {ROWS.map((stars) => {
          const share = total === 0 ? 0 : distribution[stars] / total
          return (
            <li key={stars} className="flex items-center gap-3 font-mono text-xs">
              <span className="w-24 shrink-0 text-ink-soft">
                {labels.stars(stars, distribution[stars])}
              </span>
              <div
                aria-hidden="true"
                data-share={share}
                className="h-2 w-full overflow-hidden rounded-full bg-canvas/60 p-0.5"
              >
                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{ width: `${Math.round(share * 100)}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
