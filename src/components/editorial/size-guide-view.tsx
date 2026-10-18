'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'

type Unit = 'cm' | 'in'

interface SizeRow {
  size: string
  chestCm: [number, number]
  waistCm: [number, number]
  hipsCm: [number, number]
  lengthCm: [number, number]
}

const SIZE_CHART: SizeRow[] = [
  { size: 'XS', chestCm: [86, 91], waistCm: [71, 76], hipsCm: [86, 91], lengthCm: [70, 72] },
  { size: 'S', chestCm: [91, 96], waistCm: [76, 81], hipsCm: [91, 96], lengthCm: [72, 74] },
  { size: 'M', chestCm: [96, 102], waistCm: [81, 86], hipsCm: [96, 102], lengthCm: [74, 76] },
  { size: 'L', chestCm: [102, 108], waistCm: [86, 92], hipsCm: [102, 108], lengthCm: [76, 78] },
  { size: 'XL', chestCm: [108, 114], waistCm: [92, 98], hipsCm: [108, 114], lengthCm: [78, 80] },
  { size: 'XXL', chestCm: [114, 120], waistCm: [98, 104], hipsCm: [114, 120], lengthCm: [80, 82] },
]

function formatRange(range: [number, number], unit: Unit): string {
  if (unit === 'cm') {
    return `${range[0]} – ${range[1]} cm`
  }
  const minIn = (range[0] / 2.54).toFixed(1)
  const maxIn = (range[1] / 2.54).toFixed(1)
  return `${minIn} – ${maxIn} in`
}

export function SizeGuideView() {
  const [unit, setUnit] = useState<Unit>('cm')

  // Interactive Size Finder state
  const [chestInput, setChestInput] = useState<number>(98)
  const [waistInput, setWaistInput] = useState<number>(83)
  const [hipsInput, setHipsInput] = useState<number>(99)
  const [fitPreference, setFitPreference] = useState<'gentle' | 'relaxed' | 'flowing'>('relaxed')

  const chestId = useId()
  const waistId = useId()
  const hipsId = useId()

  // Calculate recommended size
  const recommendedSize = useMemo(() => {
    const chest = unit === 'cm' ? chestInput : chestInput * 2.54
    const waist = unit === 'cm' ? waistInput : waistInput * 2.54

    const adjustedChest =
      fitPreference === 'gentle' ? chest + 2 : fitPreference === 'flowing' ? chest - 2 : chest
    const effectiveMetric = Math.max(adjustedChest, waist * 1.1)

    for (const row of SIZE_CHART) {
      if (effectiveMetric >= row.chestCm[0] && effectiveMetric <= row.chestCm[1]) {
        return row.size
      }
    }

    if (effectiveMetric < SIZE_CHART[0].chestCm[0]) return 'XS'
    if (effectiveMetric > SIZE_CHART[SIZE_CHART.length - 1].chestCm[1]) return 'XXL'
    return 'M'
  }, [chestInput, waistInput, fitPreference, unit])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold text-brand tabular-nums">
          <Sparkle size={12} />
          Botanical Fit & Natural Drape
        </span>
        <h1 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Size Guide & Intuitive Finder
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base text-ink-soft md:text-lg">
          MOSSEN garments are drafted with relaxed Scandinavian proportions. Use our size calculator
          and body measurements to discover your ideal fit.
        </p>

        {/* Unit Selector */}
        <div className="mt-8 inline-flex items-center rounded-md border border-stone-200/80 bg-[#fbf9f5] p-1">
          <button
            onClick={() => setUnit('cm')}
            className={`rounded-md px-5 py-2 text-xs font-semibold tabular-nums transition ${
              unit === 'cm' ? 'bg-brand text-on-brand' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Metric (cm)
          </button>
          <button
            onClick={() => setUnit('in')}
            className={`rounded-md px-5 py-2 text-xs font-semibold tabular-nums transition ${
              unit === 'in' ? 'bg-brand text-on-brand' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Imperial (in)
          </button>
        </div>
      </div>

      {/* Interactive Size Calculator Card */}
      <section className="mb-16 rounded-md border border-stone-200/80 bg-[#fbf9f5] p-8 md:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Controls */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <span className="text-xs font-semibold text-brand tabular-nums">
                Interactive Recommendation Tool
              </span>
              <h2 className="mt-1 font-display text-2xl font-normal text-ink">
                Calculate Your Botanical Size
              </h2>
              <p className="mt-2 font-text text-sm text-ink-soft">
                Adjust your natural measurements. Our sizing calculations account for natural flax
                relaxation and wool ease.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-medium text-ink">
                  <label htmlFor={chestId}>Chest Circumference</label>
                  <span className="font-semibold text-brand tabular-nums">
                    {chestInput} {unit}
                  </span>
                </div>
                <input
                  id={chestId}
                  type="range"
                  min={unit === 'cm' ? 80 : 31}
                  max={unit === 'cm' ? 125 : 50}
                  value={chestInput}
                  onChange={(e) => setChestInput(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-ink">
                  <label htmlFor={waistId}>Natural Waist</label>
                  <span className="font-semibold text-brand tabular-nums">
                    {waistInput} {unit}
                  </span>
                </div>
                <input
                  id={waistId}
                  type="range"
                  min={unit === 'cm' ? 65 : 25}
                  max={unit === 'cm' ? 115 : 45}
                  value={waistInput}
                  onChange={(e) => setWaistInput(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-ink">
                  <label htmlFor={hipsId}>Hip Span</label>
                  <span className="font-semibold text-brand tabular-nums">
                    {hipsInput} {unit}
                  </span>
                </div>
                <input
                  id={hipsId}
                  type="range"
                  min={unit === 'cm' ? 80 : 31}
                  max={unit === 'cm' ? 125 : 50}
                  value={hipsInput}
                  onChange={(e) => setHipsInput(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-brand"
                />
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium text-ink">
                  Drape & Ease Preference
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['gentle', 'relaxed', 'flowing'] as const).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setFitPreference(pref)}
                      className={`rounded-xl border p-2.5 font-text text-xs font-medium capitalize transition ${
                        fitPreference === pref
                          ? 'border-brand bg-brand/10 font-semibold text-brand'
                          : 'border-stone-200 bg-white text-ink-soft hover:bg-stone-50'
                      }`}
                    >
                      {pref === 'gentle'
                        ? 'Gentle Contour'
                        : pref === 'relaxed'
                          ? 'Relaxed Ease'
                          : 'Flowing Cloak'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className="lg:col-span-5">
            <div className="rounded-md border border-stone-200/80 bg-white p-8 text-center">
              <span className="text-xs text-ink-faint tabular-nums">Recommended Size</span>
              <div className="my-4 font-display text-6xl font-normal tracking-tight text-brand md:text-7xl">
                {recommendedSize}
              </div>
              <p className="font-text text-sm font-medium text-ink">
                Optimized for{' '}
                {fitPreference === 'gentle'
                  ? 'gentle body contour'
                  : fitPreference === 'relaxed'
                    ? 'natural everyday ease'
                    : 'flowing oversized drape'}
              </p>
              <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
                Fits chest measurements between{' '}
                {formatRange(
                  SIZE_CHART.find((r) => r.size === recommendedSize)?.chestCm || [96, 102],
                  unit,
                )}
                .
              </p>

              <div className="mt-6 border-t border-stone-100 pt-6">
                <Button asChild size="lg" className="w-full justify-center">
                  <Link href={routes.shop}>
                    Shop in Size {recommendedSize}
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standardized Chart */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-normal text-ink">
              Garment Measurement Chart
            </h2>
            <p className="font-text text-sm text-ink-soft">
              Body dimensions in {unit === 'cm' ? 'centimeters' : 'inches'}.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Size chart, scrolls sideways on small screens"
          className="overflow-x-auto rounded-md border border-stone-200/80 bg-[#fbf9f5]"
        >
          <table className="w-full border-collapse text-left font-text text-sm">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-100/40">
                <th className="p-4 pl-6 text-xs font-semibold text-ink tabular-nums">Size</th>
                <th className="p-4 text-xs font-semibold text-ink tabular-nums">Chest</th>
                <th className="p-4 text-xs font-semibold text-ink tabular-nums">Waist</th>
                <th className="p-4 text-xs font-semibold text-ink tabular-nums">Hips</th>
                <th className="p-4 pr-6 text-xs font-semibold text-ink tabular-nums">
                  Body Length
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {SIZE_CHART.map((row) => (
                <tr
                  key={row.size}
                  className={`transition hover:bg-stone-50/50 ${
                    row.size === recommendedSize ? 'bg-brand/5 font-semibold' : ''
                  }`}
                >
                  <td className="p-4 pl-6 font-semibold text-ink tabular-nums">
                    {row.size}
                    {row.size === recommendedSize && (
                      <span className="ml-2 rounded-md bg-brand/10 px-2 py-0.5 text-[10px] text-brand">
                        Your Fit
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-ink-soft">{formatRange(row.chestCm, unit)}</td>
                  <td className="p-4 text-ink-soft">{formatRange(row.waistCm, unit)}</td>
                  <td className="p-4 text-ink-soft">{formatRange(row.hipsCm, unit)}</td>
                  <td className="p-4 pr-6 text-ink-soft">{formatRange(row.lengthCm, unit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Measuring Guidance */}
      <section className="rounded-md border border-stone-200/80 bg-[#fbf9f5] p-8 md:p-12">
        <h2 className="mb-6 font-display text-2xl font-normal text-ink">
          Gentle Measuring Practice
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-md border border-stone-200/60 bg-white/70 p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">01. Chest</span>
            <h3 className="mt-1 font-display text-base font-normal text-ink">
              Across Fullest Point
            </h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Hold the tape softly across the widest contour of your chest, breathing naturally.
            </p>
          </div>
          <div className="rounded-md border border-stone-200/60 bg-white/70 p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">02. Waist</span>
            <h3 className="mt-1 font-display text-base font-normal text-ink">Natural Line</h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Measure around your natural waistline where your body gently creases when bending.
            </p>
          </div>
          <div className="rounded-md border border-stone-200/60 bg-white/70 p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">03. Hips</span>
            <h3 className="mt-1 font-display text-base font-normal text-ink">
              Widest Circumference
            </h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Stand naturally with feet aligned and guide the tape around the fullest part of your
              seat.
            </p>
          </div>
          <div className="rounded-md border border-stone-200/60 bg-white/70 p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">04. Length</span>
            <h3 className="mt-1 font-display text-base font-normal text-ink">Collar to Hem</h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Measure from the top seam of your shoulder down to your preferred hemline level.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
