'use client'

import { useId } from 'react'
import { toMinor } from '@/domain'
import { cn } from '@/lib/cn'
import type { FilterPanelProps } from './contract'

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

/** MOSSEN Refine Panel: calm organic controls, soft pebble chips, and moss accents. */
export function FilterPanel({
  facets,
  query,
  money,
  onChange,
  onClear,
  labels,
  className,
}: FilterPanelProps & { className?: string }) {
  const id = useId()
  const major = (minor?: number) => (minor === undefined ? '' : String(minor / 100))
  const parse = (value: string) => (value === '' ? undefined : toMinor(Number(value)))

  return (
    <form
      aria-label={labels.title}
      onSubmit={(event) => event.preventDefault()}
      className={cn('soft-panel space-y-6 rounded-[32px] bg-surface p-6 sm:p-8', className)}
    >
      <div className="flex items-center justify-between border-b border-river/30 pb-4">
        <h3 className="font-display text-lg font-medium text-ink">{labels.title}</h3>
        <button
          type="button"
          onClick={onClear}
          className="font-mono text-xs font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-focus"
        >
          {labels.clear}
        </button>
      </div>

      {/* Subcategory selection */}
      <fieldset className="m-0 space-y-2 border-none p-0">
        <legend className="mb-2 block font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase">
          {labels.subcategory}
        </legend>
        <div className="flex flex-col gap-1.5">
          {facets.subcategories.map((sub) => {
            const isSelected = query.subcategory === sub.slug
            return (
              <label
                key={sub.slug}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-full px-4 py-2 text-sm transition-all select-none',
                  isSelected
                    ? 'bg-brand font-medium text-on-brand shadow-[var(--float-sm)]'
                    : 'text-ink hover:bg-canvas/60',
                )}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`${id}-sub`}
                    checked={isSelected}
                    onChange={() => onChange({ subcategory: sub.slug })}
                    className="sr-only"
                  />
                  <span className="capitalize">{sub.slug}</span>
                </div>
                <span
                  className={cn(
                    'font-mono text-xs',
                    isSelected ? 'text-on-brand/80' : 'text-ink-soft',
                  )}
                >
                  ({sub.count})
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Size selection */}
      <fieldset className="m-0 space-y-2 border-none p-0">
        <legend className="mb-2 block font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase">
          {labels.size}
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {facets.sizes.map((size) => {
            const isSelected = query.sizes.includes(size)
            return (
              <label
                key={size}
                className={cn(
                  'pebble flex h-10 w-10 cursor-pointer items-center justify-center border font-mono text-xs font-semibold transition-all select-none',
                  isSelected
                    ? 'border-brand bg-brand text-on-brand shadow-[var(--float-sm)]'
                    : 'border-border-strong/40 bg-canvas/40 text-ink hover:bg-canvas',
                )}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onChange({ sizes: toggle(query.sizes, size) })}
                  className="sr-only"
                />
                {size}
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Colour selection */}
      <fieldset className="m-0 space-y-2 border-none p-0">
        <legend className="mb-2 block font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase">
          {labels.colour}
        </legend>
        <div className="flex flex-wrap gap-3">
          {facets.colors.map((color) => {
            const isSelected = query.colors.includes(color.value)
            return (
              <label
                key={color.value}
                className={cn(
                  'pebble flex h-8 w-8 cursor-pointer items-center justify-center border transition-all select-none',
                  isSelected
                    ? 'border-brand ring-2 ring-brand ring-offset-2'
                    : 'border-border-strong/40 hover:scale-105',
                )}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onChange({ colors: toggle(query.colors, color.value) })}
                  className="sr-only"
                />
                <span
                  className="h-5 w-5 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: color.swatch ?? '#454c60' }}
                  title={color.value}
                />
                <span className="sr-only">{color.value}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Price Range */}
      <fieldset className="m-0 space-y-2 border-none p-0">
        <legend className="mb-2 block font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase">
          {`${labels.price} (${money.currency})`}
        </legend>
        <div className="flex items-center gap-2">
          <label className="flex-1">
            <span className="sr-only">{labels.minPrice}</span>
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={major(query.minPrice)}
              onChange={(event) => onChange({ minPrice: parse(event.target.value) })}
              className="w-full rounded-full border border-border-strong/40 bg-canvas/40 px-3.5 py-2 font-mono text-xs text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
            />
          </label>
          <span className="font-mono text-xs text-ink-soft">—</span>
          <label className="flex-1">
            <span className="sr-only">{labels.maxPrice}</span>
            <input
              type="number"
              min={0}
              placeholder="Max"
              value={major(query.maxPrice)}
              onChange={(event) => onChange({ maxPrice: parse(event.target.value) })}
              className="w-full rounded-full border border-border-strong/40 bg-canvas/40 px-3.5 py-2 font-mono text-xs text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
            />
          </label>
        </div>
      </fieldset>

      {/* On sale switch */}
      <div className="pt-2">
        <label className="flex cursor-pointer items-center justify-between py-1 select-none">
          <span className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
            {labels.onSale}
          </span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={query.onSale}
              onChange={() => onChange({ onSale: !query.onSale })}
              className="peer sr-only"
            />
            <div className="h-6 w-12 rounded-full border border-border-strong/40 bg-canvas/60 transition-colors peer-checked:bg-brand">
              <div
                className={cn(
                  'pebble absolute top-0.5 left-0.5 h-5 w-5 bg-surface transition-transform duration-300',
                  query.onSale ? 'translate-x-6' : 'translate-x-0',
                )}
              />
            </div>
          </div>
        </label>
      </div>
    </form>
  )
}
