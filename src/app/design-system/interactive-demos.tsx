'use client'

import { useState } from 'react'
import { Accordion, Button, Dialog, OptionPicker, QuantityStepper } from '@/components/ui'
import { Check, Leaf } from '@/components/icons'
import { Bloom, useVineProgress } from '@/lib/motion'
import { MenuSheet, RefineSheet, Vine } from '@/components/layout'

export function SelectionControlsDemo() {
  const [size, setSize] = useState('M')
  const [color, setColor] = useState('lichen')
  const [qty, setQty] = useState(1)
  const [switchOn, setSwitchOn] = useState(true)
  const [checked, setChecked] = useState(true)

  return (
    <div className="space-y-8">
      {/* 54px Pebble Option Picker */}
      <div className="space-y-3">
        <h4 className="text-xs text-ink-soft">Option keys</h4>
        <OptionPicker
          label="Size selection"
          value={size}
          onValueChange={setSize}
          options={[
            { value: 'XS', label: 'XS', unavailable: true },
            { value: 'S', label: 'S' },
            { value: 'M', label: 'M' },
            { value: 'L', label: 'L' },
            { value: 'XL', label: 'XL' },
          ]}
        />
      </div>

      {/* Colour Swatches */}
      <div className="space-y-3">
        <h4 className="text-xs text-ink-soft">Colour swatches</h4>
        <OptionPicker
          label="Colour selection"
          value={color}
          onValueChange={setColor}
          options={[
            { value: 'lichen', label: 'Lichen', swatch: '#C5D4B8' },
            { value: 'moss', label: 'Moss', swatch: '#354E38' },
            { value: 'river', label: 'River', swatch: '#8DA1A6' },
            { value: 'sand', label: 'Sand', swatch: '#D8D4C8' },
          ]}
        />
      </div>

      {/* Quantity Stepper */}
      <div className="space-y-3">
        <h4 className="text-xs text-ink-soft">Quantity stepper</h4>
        <QuantityStepper
          value={qty}
          onChange={setQty}
          min={1}
          max={10}
          labels={{
            group: 'Garment quantity',
            decrease: 'Decrease quantity',
            increase: 'Increase quantity',
          }}
        />
      </div>

      {/* Switches & Checkboxes */}
      <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2">
        <div className="soft-panel flex items-center justify-between bg-surface p-5">
          <div>
            <span className="block font-display text-base font-medium text-ink">Toggle</span>
            <span className="text-xs text-ink-soft">{switchOn ? 'Active' : 'Inactive'}</span>
          </div>

          <button
            type="button"
            role="switch"
            aria-label="Switch"
            aria-checked={switchOn}
            onClick={() => setSwitchOn(!switchOn)}
            className="relative flex h-7 w-14 cursor-pointer items-center rounded-full border border-border-strong/40 bg-canvas/60 p-1 transition-colors focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span
              className={`pebble absolute h-5 w-5 bg-surface transition-transform duration-300 ${
                switchOn ? 'translate-x-7 bg-brand' : 'translate-x-0 bg-surface'
              }`}
            />
          </button>
        </div>

        <div className="soft-panel flex items-center justify-between bg-surface p-5">
          <div>
            <span className="block font-display text-base font-medium text-ink">Checkbox</span>
            <span className="text-xs text-ink-soft">{checked ? 'Selected' : 'Unselected'}</span>
          </div>

          <label className="pebble flex h-8 w-8 cursor-pointer items-center justify-center border border-border-strong/40 bg-canvas/60 transition-all">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="sr-only"
            />
            {checked ? <Check size={16} className="text-brand" aria-hidden="true" /> : null}
            <span className="sr-only">Checkbox</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export function OverlayDemos() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Core required dialog for Playwright test: 'Open dialog' -> 'Example dialog' */}
        <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>

        <Button variant="secondary" onClick={() => setMenuOpen(true)}>
          Open basket
        </Button>

        <RefineSheet triggerLabel="Open refine drawer">
          <div className="space-y-4 py-4">
            <h4 className="font-display text-lg font-medium text-ink">Filters</h4>
            <p className="font-text text-sm text-ink-soft">
              A calm drawer that opens from the bottom.
            </p>
          </div>
        </RefineSheet>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Example dialog"
        description="A calm panel on a fog scrim."
        closeLabel="Close dialog"
      >
        <div className="space-y-4 pt-2">
          <p className="font-text text-sm leading-relaxed text-ink-soft">
            This modal panel uses our soft-panel birch surface, 24px entrance ease, and responsive
            pebble close button. Escape returns focus cleanly.
          </p>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setDialogOpen(false)}>OK</Button>
          </div>
        </div>
      </Dialog>

      <MenuSheet open={menuOpen} onOpenChange={setMenuOpen} />

      {/* Accordion specimen */}
      <div className="soft-panel bg-surface p-6 sm:p-8">
        <h4 className="mb-4 text-xs text-ink-soft">Accordion</h4>
        <Accordion
          items={[
            {
              value: 'materials',
              title: 'Plant dyes and pure linen',
              content:
                'Every fabric is sourced from European flax grown without synthetic pesticides. Dyed using madder root and walnut husks.',
            },
            {
              value: 'care',
              title: 'Garment care',
              content:
                'Wash gently in cold water with plant-based soaps. Air dry away from harsh direct midday light to preserve natural plant pigments.',
            },
            {
              value: 'provenance',
              title: 'Where it is woven',
              content:
                'Cut and tailored in small family ateliers in northern Portugal where artisans are compensated fairly.',
            },
          ]}
        />
      </div>
    </div>
  )
}

export function FeedbackDemos() {
  return (
    <div className="space-y-8">
      {/* Badges */}
      <div className="space-y-3">
        <h4 className="text-xs text-ink-soft">Badges</h4>
        <div className="flex flex-wrap items-center gap-3">
          <span className="pebble border border-border-strong/30 bg-surface px-3 py-1 font-mono text-[10px] font-medium text-ink">
            New
          </span>
          <span className="pebble border border-border-strong/30 bg-surface px-3 py-1 font-mono text-[10px] font-medium text-ink">
            Bestseller
          </span>
          <span className="pebble border border-border-strong/30 bg-surface px-3 py-1 font-mono text-[10px] font-medium text-ink">
            Limited
          </span>
          {/* Sale: rowan text on birch (not white on rowan) */}
          <span className="pebble border border-border-strong/30 bg-surface px-3 py-1 font-mono text-[10px] font-medium text-danger">
            Sale
          </span>
        </div>
      </div>

      {/* Toast Specimen */}
      <div className="space-y-3">
        <h4 className="text-xs text-ink-soft">Toast</h4>
        <div className="pebble float-sm inline-flex items-center gap-3 border border-border-strong/30 bg-surface px-5 py-3 text-ink">
          <Leaf size={18} className="text-brand" aria-hidden="true" />
          <span className="font-text text-sm">Added to your basket</span>
        </div>
      </div>

      {/* Skeletons with 2.4s breathing opacity */}
      <div className="space-y-3">
        <h4 className="text-xs text-ink-soft">Skeleton, breathing over 2.4s</h4>
        <div className="flex items-center gap-4">
          <div className="pebble h-20 w-20 animate-pulse bg-river/20" />
          <div className="space-y-2">
            <div className="h-4 w-48 animate-pulse rounded-full bg-river/20" />
            <div className="h-3 w-32 animate-pulse rounded-full bg-river/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MotionDemos() {
  const [bloomKey, setBloomKey] = useState(0)
  const vineProgress = useVineProgress({ itemCount: 3, totalSegments: 5 })

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="secondary" onClick={() => setBloomKey((k) => k + 1)}>
          Replay bloom
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Bloom */}
        <div className="soft-panel space-y-3 bg-surface p-5">
          <h4 className="text-xs text-ink-soft">Bloom: 0.96 to 1 over 800ms</h4>
          <Bloom key={bloomKey} className="aspect-square w-full bg-canvas">
            <div className="flex h-full w-full items-center justify-center font-display text-sm font-medium text-ink">
              Blooming picture
            </div>
          </Bloom>
        </div>

        {/* Swaying Leaf */}
        <div className="soft-panel space-y-3 bg-surface p-5">
          <h4 className="text-xs text-ink-soft">Leaf sway: ±2° over 8s</h4>
          <div className="flex aspect-square w-full items-center justify-center bg-canvas/60">
            <Leaf size={48} className="sway text-brand" aria-hidden="true" />
          </div>
        </div>

        {/* Vine Growth */}
        <div className="soft-panel space-y-3 bg-surface p-5">
          <h4 className="text-xs text-ink-soft">
            Growing Vine ({Math.round(vineProgress * 100)}% progress)
          </h4>
          <div className="flex aspect-square w-full items-center justify-center bg-canvas/60">
            <Vine segments={3} progress={vineProgress} />
          </div>
        </div>
      </div>
    </div>
  )
}
