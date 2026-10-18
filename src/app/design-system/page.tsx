import type { Metadata } from 'next'
import { Button, Tabs, TextField } from '@/components/ui'
import {
  ArrowLeft,
  ArrowRight,
  CaretDown,
  CaretUp,
  Check,
  Eye,
  Faders,
  Heart,
  Leaf,
  MagnifyingGlass,
  Minus,
  Plus,
  ShoppingBag,
  Sparkle,
  Star,
  Trash,
  User,
  X,
} from '@/components/icons'
import { WavyDivider } from '@/components/layout'
import { contrastRatio } from '@/lib/a11y/contrast'
import { CommerceDemos, MirrorTryDemo } from './commerce-demos'
import { tokens } from './ds-tokens'
import {
  FeedbackDemos,
  MotionDemos,
  OverlayDemos,
  SelectionControlsDemo,
} from './interactive-demos'

export const metadata: Metadata = {
  title: 'Design System — MOSSEN',
  description: 'Living style guide for MOSSEN.',
  robots: { index: false, follow: false },
}

/** Hex values and ratios are read from tokens.css, so this page cannot drift from the system. */
const COLOURS: { token: string; label: string; role: string; against?: string }[] = [
  { token: '--color-canvas', label: 'Fog', role: 'Page background' },
  { token: '--color-surface', label: 'Birch', role: 'Panels, fields, the Mirror Try band' },
  { token: '--color-ink', label: 'Earth', role: 'Text', against: '--color-canvas' },
  { token: '--color-ink-soft', label: 'Peat', role: 'Secondary text', against: '--color-canvas' },
  {
    token: '--color-ink-faint',
    label: 'Stone',
    role: 'Captions, placeholders',
    against: '--color-canvas',
  },
  {
    token: '--color-brand',
    label: 'Moss',
    role: 'Buttons, links, active states',
    against: '--color-canvas',
  },
  {
    token: '--color-moss-deep',
    label: 'Moss deep',
    role: 'Dark bands and the footer',
    against: '--color-on-brand',
  },
  { token: '--color-accent', label: 'Lichen', role: 'Chips and tints, never text' },
  { token: '--color-river', label: 'River', role: 'Hairlines and dividers' },
  {
    token: '--color-border-strong',
    label: 'Border strong',
    role: 'Field boundary',
    against: '--color-canvas',
  },
  { token: '--color-focus', label: 'Focus', role: 'Focus ring', against: '--color-canvas' },
  {
    token: '--color-danger',
    label: 'Rowan',
    role: 'Errors and sale price',
    against: '--color-canvas',
  },
  {
    token: '--color-success',
    label: 'Clover',
    role: 'In stock, confirmed',
    against: '--color-canvas',
  },
]

const RADII = ['--radius-xs', '--radius-sm', '--radius-md', '--radius-xl', '--radius-3xl']

const heading = 'font-display text-2xl font-normal tracking-tight text-ink'
const lede = 'mt-1 text-sm text-ink-soft'
const caption = 'text-xs text-ink-soft'

function Section({
  id,
  anchor,
  title,
  description,
  children,
}: {
  id: string
  anchor?: string
  title: string
  description: string
  children: React.ReactNode
}) {
  const heading_id = `ds-${anchor ?? id}`
  return (
    <section data-ds-section={id} aria-labelledby={heading_id} className="space-y-6">
      <div>
        <h2 id={heading_id} className={heading}>
          {title}
        </h2>
        <p className={lede}>{description}</p>
      </div>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  return (
    <div className="relative mx-auto min-h-screen max-w-7xl space-y-20 bg-canvas px-4 pb-32 text-ink sm:px-8">
      <header className="border-b border-river/30 pt-16 pb-8">
        <p className="flex items-center gap-2 text-sm text-ink-soft">
          <Leaf size={16} className="text-brand" aria-hidden="true" />
          MOSSEN · soft and organic
        </p>
        <h1 className="mt-2 font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
          Design system
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Linen and moss, a serif voice, a little grain and generous space. Corners are a quiet 6px;
          the organic feel comes from layout, colour and slow motion rather than from shapes.
        </p>
      </header>

      <Section
        id="colour"
        title="Colour"
        description="Fog, birch and earth with one moss green. Red appears for errors and sale prices only."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {COLOURS.map((item) => {
            const hex = tokens[item.token]!
            const ratio = item.against
              ? contrastRatio(
                  item.token === '--color-moss-deep' ? tokens['--color-on-brand']! : hex,
                  item.token === '--color-moss-deep' ? hex : tokens[item.against]!,
                ).toFixed(1)
              : undefined
            return (
              <div key={item.token} className="soft-panel space-y-3 p-3">
                <div className="h-14 border border-ink/10" style={{ backgroundColor: hex }} />
                <div>
                  <p className="font-display text-base text-ink">{item.label}</p>
                  <p className="font-mono text-[11px] text-ink-soft">{item.token}</p>
                  <p className="font-mono text-[11px] text-ink-soft">
                    {hex}
                    {ratio ? ` · ${ratio}:1` : ''}
                  </p>
                  <p className={`${caption} mt-1`}>{item.role}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section
        id="typography"
        title="Typography"
        description="Hedvig Letters Serif for display, Albert Sans for text, Spline Sans Mono for figures. Light and regular weights, sentence case, italics for quotes."
      >
        <div className="soft-panel space-y-5 p-6 md:p-8">
          {[
            [
              'Display · 72px regular',
              'font-display text-5xl leading-[1.04] tracking-tight md:text-7xl',
              'Wear the quiet',
            ],
            [
              'Page title · 48px regular',
              'font-display text-4xl tracking-tight md:text-5xl',
              'Seasonal collections',
            ],
            [
              'Section title · 48px regular',
              'font-display text-3xl tracking-tight md:text-5xl',
              'Made slowly',
            ],
            [
              'Quote · 30px italic',
              'font-display text-2xl italic md:text-3xl',
              'True luxury is the quiet presence of time.',
            ],
            [
              'Card title · 24px regular',
              'font-display text-2xl',
              'Unbleached Linen Forager Smock',
            ],
            [
              'Body · 16px regular',
              'text-base leading-relaxed text-ink-soft',
              'Cut from unbleached flax and washed in rainwater, so it softens with every wear.',
            ],
            ['Small · 14px regular', 'text-sm text-ink-soft', 'Free delivery over $150.'],
          ].map(([label, cls, sample]) => (
            <div key={label}>
              <p className={`${caption} mb-1`}>{label}</p>
              <p className={cls}>{sample}</p>
            </div>
          ))}
          <div>
            <p className={`${caption} mb-1`}>Mono · 14px</p>
            <p className="font-mono text-sm text-ink">Batch 2026-MOS · 320gsm · $290.00</p>
          </div>
        </div>
      </Section>

      <Section
        id="surfaces"
        title="Surfaces"
        description="Soft panels on linen, a grain over everything, and no shadows. All shapes share one 6px radius."
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="soft-panel flex flex-col items-center justify-center gap-3 p-6">
            <div
              className="pebble border border-border-strong/30 bg-canvas"
              data-ds-surface="pebble"
              style={{ width: 100, height: 100 }}
            />
            <span className={caption}>Pebble</span>
          </div>
          <div className="soft-panel flex flex-col items-center justify-center gap-3 p-6">
            <div
              className="arch border border-border-strong/30 bg-canvas"
              data-ds-surface="arch"
              style={{ width: 100, height: 140 }}
            />
            <span className={caption}>Arch</span>
          </div>
          <div className="soft-panel flex flex-col items-center justify-center gap-3 p-6">
            <div
              className="leaf border border-border-strong/30 bg-canvas"
              data-ds-surface="leaf"
              style={{ width: 100, height: 100 }}
            />
            <span className={caption}>Leaf</span>
          </div>
          <div className="soft-panel flex flex-col items-center justify-center gap-3 p-6">
            <div className="soft-panel flex h-24 w-24 items-center justify-center font-display text-sm text-ink">
              Panel
            </div>
            <span className={caption}>Soft panel</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-5">
          {RADII.map((token) => (
            <div key={token} className="soft-panel p-3">
              <div
                className="h-12 border border-ink bg-canvas"
                style={{ borderRadius: `var(${token})` }}
              />
              <p className="mt-2 font-mono text-[11px] text-ink-soft">{token}</p>
              <p className="font-mono text-[11px] text-ink-soft">{tokens[token]}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="soft-panel p-6">
            <p className={`${caption} mb-3`}>Wavy divider</p>
            <WavyDivider />
          </div>
          <div className="soft-panel p-6">
            <p className={`${caption} mb-3`}>Text link, underline draws in on hover</p>
            <a href="#ds-surfaces" className="link-draw pb-1 text-sm text-ink">
              Read the journal
            </a>
          </div>
        </div>
      </Section>

      <Section
        id="buttons"
        title="Buttons and links"
        description="Moss solid, outlined birch, and text. 6px corners, no lift."
      >
        <div className="soft-panel flex flex-wrap items-center gap-4 p-6">
          <Button variant="primary">Add to basket</Button>
          <Button variant="secondary">View details</Button>
          <Button variant="ghost">Save for later</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Weaving</Button>
        </div>
      </Section>

      <Section
        id="forms"
        title="Forms"
        description="An outlined field with a 1.5px border in the strong border colour. Hints and errors are announced with the field."
      >
        <div className="soft-panel grid gap-6 p-6 md:grid-cols-2">
          <TextField
            label="Email address"
            placeholder="you@example.com"
            hint="We only send seasonal letters."
          />
          <TextField label="Postal code" defaultValue="N-0155" error="Enter a valid postal code." />
        </div>
      </Section>

      <Section
        id="selection"
        title="Selection controls"
        description="Option keys, colour swatches, a quantity stepper, a toggle and a checkbox."
      >
        <div className="soft-panel p-6">
          <SelectionControlsDemo />
        </div>
      </Section>

      <Section
        id="navigation"
        anchor="nav"
        title="Navigation"
        description="Serif tabs with a drawn moss underline."
      >
        <Tabs
          label="Collection categories"
          items={[
            {
              value: 'all',
              label: 'All garments',
              content: <p className="text-sm text-ink-soft">All 24 pieces.</p>,
            },
            {
              value: 'clothing',
              label: 'Clothing',
              content: (
                <p className="text-sm text-ink-soft">Outerwear, knitwear and linen separates.</p>
              ),
            },
            {
              value: 'accessories',
              label: 'Accessories',
              content: <p className="text-sm text-ink-soft">Scarves, caps and woven totes.</p>,
            },
            {
              value: 'jewelry',
              label: 'Jewelry',
              content: (
                <p className="text-sm text-ink-soft">Cast silver and river-stone pendants.</p>
              ),
            },
          ]}
        />
      </Section>

      <Section
        id="overlays"
        title="Overlays"
        description="A birch panel over a fog scrim, a basket and a filter drawer. Focus is trapped and Escape closes them."
      >
        <OverlayDemos />
      </Section>

      <Section
        id="feedback"
        title="Feedback"
        description="Badges, toasts and slowly breathing skeletons."
      >
        <FeedbackDemos />
      </Section>

      <Section
        id="commerce"
        title="Commerce"
        description="Product cards with a full-bleed picture, cart lines, filters and reviews."
      >
        <CommerceDemos />
      </Section>

      <Section
        id="mirror-try"
        title="Mirror Try"
        description="The trigger a store places on a card or a product page. The plugin owns everything that opens after it."
      >
        <MirrorTryDemo />
      </Section>

      <Section
        id="motion"
        title="Motion"
        description="Slow and soft: pictures bloom in, content rises as it scrolls in, the header leaf sways, and a vine grows with progress. Reduced motion turns it all off."
      >
        <MotionDemos />
      </Section>

      <Section
        id="icons"
        title="Icons"
        description="Phosphor, light weight, always beside text or inside a labelled button."
      >
        <div className="soft-panel grid grid-cols-3 gap-6 p-6 text-center sm:grid-cols-6 md:grid-cols-9">
          {[
            { icon: <ArrowLeft size={20} aria-hidden="true" />, name: 'ArrowLeft' },
            { icon: <ArrowRight size={20} aria-hidden="true" />, name: 'ArrowRight' },
            { icon: <CaretDown size={20} aria-hidden="true" />, name: 'CaretDown' },
            { icon: <CaretUp size={20} aria-hidden="true" />, name: 'CaretUp' },
            { icon: <Check size={20} aria-hidden="true" />, name: 'Check' },
            { icon: <Eye size={20} aria-hidden="true" />, name: 'Eye' },
            { icon: <Faders size={20} aria-hidden="true" />, name: 'Faders' },
            { icon: <Heart size={20} aria-hidden="true" />, name: 'Heart' },
            { icon: <Leaf size={20} aria-hidden="true" />, name: 'Leaf' },
            { icon: <MagnifyingGlass size={20} aria-hidden="true" />, name: 'MagnifyingGlass' },
            { icon: <Minus size={20} aria-hidden="true" />, name: 'Minus' },
            { icon: <Plus size={20} aria-hidden="true" />, name: 'Plus' },
            { icon: <ShoppingBag size={20} aria-hidden="true" />, name: 'ShoppingBag' },
            { icon: <Sparkle size={20} aria-hidden="true" />, name: 'Sparkle' },
            { icon: <Star size={20} aria-hidden="true" />, name: 'Star' },
            { icon: <Trash size={20} aria-hidden="true" />, name: 'Trash' },
            { icon: <User size={20} aria-hidden="true" />, name: 'User' },
            { icon: <X size={20} aria-hidden="true" />, name: 'X' },
          ].map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-2 text-ink">
              {item.icon}
              <span className="w-full truncate font-mono text-[9px] text-ink-soft">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
