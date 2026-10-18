'use client'

import Link from 'next/link'
import { Leaf } from '@/components/icons'
import { Dialog } from '@/components/ui'

export interface MenuSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MenuSheet({ open, onOpenChange }: MenuSheetProps) {
  const categories = [
    { href: '/shop/clothing', label: 'Clothing', count: '12 pieces' },
    { href: '/shop/accessories', label: 'Accessories', count: '6 pieces' },
    { href: '/shop/jewelry', label: 'Jewelry', count: '4 pieces' },
  ]

  const links = [
    { href: '/shop', label: 'All Garments' },
    { href: '/collections', label: 'Collections' },
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/sale', label: 'Curated Sale' },
    { href: '/journal', label: 'Field Journal' },
    { href: '/about', label: 'Philosophy & Ethics' },
    { href: '/stores', label: 'Stores' },
  ]

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Navigation"
      closeLabel="Close navigation"
      className="max-w-2xl rounded-t-none rounded-b-md border-b border-river/30 bg-surface p-8 sm:p-10"
    >
      <div className="space-y-8 pt-4">
        {/* Category exploration */}
        <div>
          <p className="text-xs font-medium text-ink-soft tabular-nums">Categories</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => onOpenChange(false)}
                className="pebble group flex flex-col justify-between border border-border-strong/30 bg-canvas/40 p-4 transition-all hover:bg-canvas"
              >
                <span className="font-display text-lg font-medium text-ink transition-colors group-hover:text-brand">
                  {cat.label}
                </span>
                <span className="mt-1 text-[11px] text-ink-soft tabular-nums">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Text links */}
        <div>
          <p className="text-xs font-medium text-ink-soft tabular-nums">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => onOpenChange(false)}
                  className="link-draw font-display text-base font-normal text-ink transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer quote */}
        <div className="flex items-center gap-2 border-t border-river/20 pt-4 text-ink-soft">
          <Leaf size={16} className="text-brand" aria-hidden="true" />
          <p className="text-xs italic tabular-nums">Crafted from earth, woven for quiet living.</p>
        </div>
      </div>
    </Dialog>
  )
}
