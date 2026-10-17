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
import {
  FeedbackDemos,
  MotionDemos,
  OverlayDemos,
  SelectionControlsDemo,
} from './interactive-demos'
import { CommerceDemos, MirrorTryDemo } from './commerce-demos'

export const metadata: Metadata = {
  title: 'Design System — MOSSEN',
  description: 'Living style guide and organic tactile design system specification for MOSSEN.',
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return (
    <div className="relative mx-auto min-h-screen max-w-7xl space-y-24 bg-canvas px-4 pb-32 text-ink sm:px-8">
      {/* Header */}
      <header className="border-b border-river/30 pt-16 pb-8">
        <div className="pebble mb-4 inline-flex items-center gap-2 border border-border-strong/30 bg-surface px-4 py-1.5 font-mono text-xs tracking-wider text-ink-soft uppercase">
          <Leaf size={14} className="text-brand" aria-hidden="true" />
          MOSSEN Design System · Organic Earth
        </div>
        <h1 className="font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
          Design system
        </h1>
        <p className="mt-3 max-w-2xl font-text text-base font-normal text-ink-soft">
          Organic tactile design language inspired by Norwegian earth, mossy forests, birch barks,
          weathered pebbles, and calm breathing motion.
        </p>
      </header>

      {/* 1. Colour */}
      <section data-ds-section="colour" aria-labelledby="ds-colour" className="space-y-6">
        <div>
          <h2 id="ds-colour" className="font-display text-2xl font-medium text-ink">
            Colour
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Natural earth palette satisfying WCAG 2.1 AA (Moss text: 5.6:1 on fog canvas, 6.6:1 on
            birch).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {[
            { name: '--color-canvas', hex: '#E8EBE4', label: 'Fog Canvas', contrast: 'Base' },
            { name: '--color-surface', hex: '#F5F1EA', label: 'Birch Surface', contrast: 'Base' },
            { name: '--color-brand', hex: '#354E38', label: 'Moss Brand', contrast: '5.6:1' },
            { name: '--color-moss-deep', hex: '#243825', label: 'Moss Deep', contrast: '6.6:1' },
            { name: '--color-accent', hex: '#C5D4B8', label: 'Lichen Accent', contrast: 'Chip' },
            {
              name: '--color-river',
              hex: '#8DA1A6',
              label: 'River Water',
              contrast: '2.2:1 (Deco)',
            },
            { name: '--color-focus', hex: '#2D484E', label: 'River Deep Focus', contrast: '6.5:1' },
            { name: '--color-ink', hex: '#242220', label: 'Earth Ink', contrast: '11.8:1' },
            { name: '--color-ink-soft', hex: '#56504A', label: 'Peat Ink Soft', contrast: '6.8:1' },
            {
              name: '--color-ink-faint',
              hex: '#736B63',
              label: 'Stone Ink Faint',
              contrast: '4.8:1',
            },
            { name: '--color-danger', hex: '#A44838', label: 'Rowan Danger', contrast: '4.8:1' },
            { name: '--color-success', hex: '#2E5932', label: 'Clover Success', contrast: '5.8:1' },
          ].map((token) => (
            <div key={token.name} className="soft-panel space-y-2 rounded-[24px] bg-surface p-3">
              <div
                className="pebble h-14 border border-border-strong/20 shadow-inner"
                style={{ backgroundColor: token.hex }}
              />
              <div>
                <p className="font-mono text-xs font-semibold text-ink">{token.name}</p>
                <p className="font-mono text-[11px] text-ink-soft">
                  {token.label} · {token.hex}
                </p>
                <p className="font-mono text-[10px] text-ink-faint">{token.contrast}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography */}
      <section data-ds-section="typography" aria-labelledby="ds-typography" className="space-y-6">
        <div>
          <h2 id="ds-typography" className="font-display text-2xl font-medium text-ink">
            Typography
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Hedvig Letters Serif (Display) · Albert Sans (Body) · Spline Sans Mono (Technical).
          </p>
        </div>

        <div className="soft-panel space-y-6 rounded-[32px] bg-surface p-6 sm:p-8">
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-ink-soft uppercase">
              Display Heading 1
            </span>
            <p className="font-display text-4xl font-normal text-ink sm:text-5xl">
              Woven from morning mist & wild flax
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-ink-soft uppercase">
              Display Heading 2 (Italic Specimen)
            </span>
            <p className="font-display text-2xl font-normal text-ink italic sm:text-3xl">
              Quiet silhouettes designed for gentle living
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-ink-soft uppercase">
              Body Text (Albert Sans)
            </span>
            <p className="max-w-3xl font-text text-base leading-relaxed text-ink-soft">
              Every seam is finished with natural beeswax thread, preserving an honest dialogue
              between the artisan, the textile, and the natural world.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-ink-soft uppercase">
              Technical Mono (Spline Sans Mono)
            </span>
            <p className="font-mono text-sm tracking-wider text-ink">
              BATCH #2026-MOS · 100% UNBLEACHED HEMP · 320 GSM
            </p>
          </div>
        </div>
      </section>

      {/* 3. Surfaces */}
      <section data-ds-section="surfaces" aria-labelledby="ds-surfaces" className="space-y-6">
        <div>
          <h2 id="ds-surfaces" className="font-display text-2xl font-medium text-ink">
            Surfaces
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Pebbles, arches, leaves, soft panels, wavy dividers, and organic grain overlay.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="soft-panel flex flex-col items-center justify-center gap-3 rounded-[28px] bg-surface p-6">
            <div
              className="pebble border border-border-strong/30 bg-canvas"
              data-ds-surface="pebble"
              style={{ width: 100, height: 100 }}
            />
            <span className="font-mono text-xs text-ink-soft">Pebble (8-value radius)</span>
          </div>

          <div className="soft-panel flex flex-col items-center justify-center gap-3 rounded-[28px] bg-surface p-6">
            <div
              className="arch border border-border-strong/30 bg-canvas"
              data-ds-surface="arch"
              style={{ width: 100, height: 140 }}
            />
            <span className="font-mono text-xs text-ink-soft">Arch Window</span>
          </div>

          <div className="soft-panel flex flex-col items-center justify-center gap-3 rounded-[28px] bg-surface p-6">
            <div
              className="leaf border border-border-strong/30 bg-canvas"
              data-ds-surface="leaf"
              style={{ width: 100, height: 100 }}
            />
            <span className="font-mono text-xs text-ink-soft">Organic Leaf</span>
          </div>

          <div className="soft-panel flex flex-col items-center justify-center gap-3 rounded-[28px] bg-surface p-6">
            <div className="float-sm flex h-24 w-24 items-center justify-center rounded-[32px] border border-border-strong/30 bg-canvas font-display text-xs text-ink">
              Soft Panel
            </div>
            <span className="font-mono text-xs text-ink-soft">Soft Panel (--r-soft)</span>
          </div>
        </div>

        {/* Wavy Divider */}
        <div className="space-y-2 pt-4">
          <p className="font-mono text-xs tracking-wider text-ink-soft uppercase">
            Wavy Organic Divider
          </p>
          <WavyDivider />
        </div>
      </section>

      {/* 4. Buttons and links */}
      <section data-ds-section="buttons" aria-labelledby="ds-buttons" className="space-y-6">
        <div>
          <h2 id="ds-buttons" className="font-display text-2xl font-medium text-ink">
            Buttons and links
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Moss primary pill, birch secondary soft-panel, ghost pill, and drawing text links.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Button variant="primary">Add to basket</Button>
          <Button variant="secondary">View provenance</Button>
          <Button variant="ghost">Save for later</Button>
          <Button loading>Weaving</Button>
          <Button disabled>Harvest complete</Button>
          <a href="#ds-buttons" className="link-draw font-display text-lg font-medium text-brand">
            Explore seasonal fibers →
          </a>
        </div>
      </section>

      {/* 5. Forms */}
      <section data-ds-section="forms" aria-labelledby="ds-forms" className="space-y-6">
        <div>
          <h2 id="ds-forms" className="font-display text-2xl font-medium text-ink">
            Forms
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Outline-field inputs with asymmetric organic corners (22px 28px 22px 26px) and mono
            labels.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TextField
            label="Email address"
            hint="We only send quiet seasonal announcements"
            placeholder="patron@sanctuary.org"
          />
          <TextField label="Postal code" error="Enter a valid postal code" defaultValue="N-0155" />
        </div>
      </section>

      {/* 6. Selection controls */}
      <section data-ds-section="selection" aria-labelledby="ds-selection" className="space-y-6">
        <div>
          <h2 id="ds-selection" className="font-display text-2xl font-medium text-ink">
            Selection controls
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            54px pebble option pickers, colour swatches, and organic toggles.
          </p>
        </div>

        <SelectionControlsDemo />
      </section>

      {/* 7. Navigation */}
      <section data-ds-section="navigation" aria-labelledby="ds-nav" className="space-y-6">
        <div>
          <h2 id="ds-nav" className="font-display text-2xl font-medium text-ink">
            Navigation
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Large serif category tabs with active drawn moss underline.
          </p>
        </div>

        <Tabs
          label="Collection categories"
          items={[
            {
              value: 'all',
              label: 'All Garments',
              content: (
                <p className="font-text text-sm text-ink-soft">
                  Displaying all 24 curated handcrafted garments.
                </p>
              ),
            },
            {
              value: 'clothing',
              label: 'Clothing',
              content: (
                <p className="font-text text-sm text-ink-soft">
                  Outerwear, knitwear, and linen separates.
                </p>
              ),
            },
            {
              value: 'accessories',
              label: 'Accessories',
              content: (
                <p className="font-text text-sm text-ink-soft">
                  Hand-spun scarves, wool caps, and woven totes.
                </p>
              ),
            },
            {
              value: 'jewelry',
              label: 'Jewelry',
              content: (
                <p className="font-text text-sm text-ink-soft">
                  Forged silver and river-stone pendants.
                </p>
              ),
            },
          ]}
        />
      </section>

      {/* 8. Overlays */}
      <section data-ds-section="overlays" aria-labelledby="ds-overlays" className="space-y-6">
        <div>
          <h2 id="ds-overlays" className="font-display text-2xl font-medium text-ink">
            Overlays
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Birch panels with --r-soft corners, 60% fog scrim, and 24px entrance ease.
          </p>
        </div>

        <OverlayDemos />
      </section>

      {/* 9. Feedback */}
      <section data-ds-section="feedback" aria-labelledby="ds-feedback" className="space-y-6">
        <div>
          <h2 id="ds-feedback" className="font-display text-2xl font-medium text-ink">
            Feedback
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Pebble badges, toast notifications, and breathing fog skeletons.
          </p>
        </div>

        <FeedbackDemos />
      </section>

      {/* 10. Commerce */}
      <section data-ds-section="commerce" aria-labelledby="ds-commerce" className="space-y-6">
        <div>
          <h2 id="ds-commerce" className="font-display text-2xl font-medium text-ink">
            Commerce
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Mask-as-card product display, calm cart lines, refine panel, arch gallery, and review
            summary.
          </p>
        </div>

        <CommerceDemos />
      </section>

      {/* 11. Mirror Try */}
      <section data-ds-section="mirror-try" aria-labelledby="ds-mirror-try" className="space-y-6">
        <div>
          <h2 id="ds-mirror-try" className="font-display text-2xl font-medium text-ink">
            Mirror Try (The Window)
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            The themed trigger: an organic lichen pebble chip with moss-deep text.
          </p>
        </div>

        <MirrorTryDemo />
      </section>

      {/* 12. Motion */}
      <section data-ds-section="motion" aria-labelledby="ds-motion" className="space-y-6">
        <div>
          <h2 id="ds-motion" className="font-display text-2xl font-medium text-ink">
            Motion
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Slow and soft: 800ms image bloom, 8s idle leaf sway, and scroll-bound growing vine.
          </p>
        </div>

        <MotionDemos />
      </section>

      {/* 13. Icons */}
      <section data-ds-section="icons" aria-labelledby="ds-icons" className="space-y-6">
        <div>
          <h2 id="ds-icons" className="font-display text-2xl font-medium text-ink">
            Icons
          </h2>
          <p className="mt-1 font-mono text-sm text-ink-soft">
            Phosphor Regular Icons (22px standard) & custom organic Leaf SVG mark.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-9">
          {[
            { icon: <Leaf size={22} className="text-brand" />, label: 'Leaf' },
            { icon: <ArrowLeft size={22} />, label: 'ArrowLeft' },
            { icon: <ArrowRight size={22} />, label: 'ArrowRight' },
            { icon: <CaretDown size={22} />, label: 'CaretDown' },
            { icon: <CaretUp size={22} />, label: 'CaretUp' },
            { icon: <Check size={22} />, label: 'Check' },
            { icon: <Eye size={22} />, label: 'Eye' },
            { icon: <Faders size={22} />, label: 'Faders' },
            { icon: <Heart size={22} />, label: 'Heart' },
            { icon: <MagnifyingGlass size={22} />, label: 'MagnifyingGlass' },
            { icon: <Minus size={22} />, label: 'Minus' },
            { icon: <Plus size={22} />, label: 'Plus' },
            { icon: <ShoppingBag size={22} />, label: 'ShoppingBag' },
            { icon: <Sparkle size={22} />, label: 'Sparkle' },
            { icon: <Star size={22} />, label: 'Star' },
            { icon: <Trash size={22} />, label: 'Trash' },
            { icon: <User size={22} />, label: 'User' },
            { icon: <X size={22} />, label: 'X' },
          ].map((item) => (
            <div
              key={item.label}
              className="soft-panel flex flex-col items-center justify-center gap-2 rounded-[20px] bg-surface p-3 text-ink"
            >
              {item.icon}
              <span className="font-mono text-[10px] text-ink-soft">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
