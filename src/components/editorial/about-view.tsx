'use client'

import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'

const PILLARS = [
  {
    title: 'Living Botanical Fibers',
    description:
      'We work exclusively with unbleached Baltic flax, wild Gotland wool, and organic mulberry silks that breathe with the rhythm of weather and personal wear.',
  },
  {
    title: 'Earth-Derived Dye Alchemy',
    description:
      'Colours extracted from oak galls, madder roots, wild indigo leaves, and river clay. Every dye batch shifts gently across light and seasons.',
  },
  {
    title: 'Serene Fitting Technology',
    description:
      'Our gentle Mirror Try digital window allows you to preview garment drape and flowing silhouettes in harmony with your natural proportions.',
  },
]

const TIMELINE = [
  {
    year: '2019',
    title: 'The Linen Meadow',
    description:
      'Founded along the Baltic coast as a hand-weaving studio cultivating heritage heirloom flax.',
  },
  {
    year: '2021',
    title: 'Botanical Dye Vat Project',
    description:
      'Established our closed-loop natural dye kitchen using rain catchment and forest forage.',
  },
  {
    year: '2024',
    title: 'Flagship & Fitting Sanctuary',
    description:
      'Opened Stockholm Gamla Stan studio featuring quiet fitting chambers and tea consultations.',
  },
  {
    year: '2026',
    title: 'Ateliers & Soil Stewardship',
    description:
      'Connecting certified regenerative farming collectives across Sweden, Lithuania, and Japan.',
  },
]

export function AboutView() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Botanical Paper Hero */}
      <div className="relative mb-16 overflow-hidden rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-8 shadow-sm md:p-14">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-brand uppercase">
            <Sparkle size={12} />
            Our Philosophy & Living Craft
          </span>
          <h1 className="font-display text-3xl font-normal tracking-tight text-ink md:text-5xl">
            Garments Rooted in Soil, Weather, and Stillness.
          </h1>
          <p className="mt-4 font-text text-base leading-relaxed text-ink-soft md:text-lg">
            {brand.name} was born from a desire for slowness. In a hurried world, we design garments
            that respect ecological cycles—using dew-retted Baltic linens, un-scoured lanolin wools,
            and plant dyes that age into soft poetic patinas over decades of devoted wear.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href={routes.shop}>
                Explore the Wardrobe
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={routes.lookbook}>View Lookbook</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <span className="font-mono text-xs tracking-wider text-ink-faint uppercase">
            Our Commitments
          </span>
          <h2 className="mt-1 font-display text-2xl font-normal text-ink md:text-3xl">
            Foundations of Slow Craft
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[28px] border border-stone-200/70 bg-[#fcfbf7] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="font-display text-lg font-medium text-ink">{pillar.title}</h3>
              <p className="mt-3 font-text text-sm leading-relaxed text-ink-soft">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Living Timeline */}
      <section className="rounded-[32px] border border-stone-200/80 bg-[#fbf9f5] p-8 shadow-sm md:p-12">
        <div className="mb-8">
          <span className="font-mono text-xs tracking-wider text-ink-faint uppercase">
            Our Journey
          </span>
          <h2 className="mt-1 font-display text-2xl font-normal text-ink">
            Milestones in Regenerative Craft
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="rounded-[24px] border border-stone-200/60 bg-white/60 p-6"
            >
              <span className="font-mono text-lg font-bold text-brand">{item.year}</span>
              <h3 className="mt-1 font-display text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 font-text text-sm leading-relaxed text-ink-soft">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
