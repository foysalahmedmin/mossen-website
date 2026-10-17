'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

const LINKS = [
  { href: '/account', label: 'Overview' },
  { href: '/account/orders', label: 'Orders' },
  { href: '/account/addresses', label: 'Addresses' },
  { href: '/account/profile', label: 'Profile' },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Account navigation" className="mb-8 flex flex-wrap gap-2">
      {LINKS.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'pebble px-4 py-2 font-mono text-xs font-semibold tracking-wider transition-all focus-visible:outline-2 focus-visible:outline-focus',
              isActive
                ? 'border border-brand bg-brand text-on-brand'
                : 'border border-border-strong/30 bg-surface/70 text-ink-soft hover:bg-surface hover:text-ink',
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
