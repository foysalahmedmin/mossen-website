'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Leaf, MagnifyingGlass, ShoppingBag, User } from '@/components/icons'
import { cn } from '@/lib/cn'

export interface CentredHeaderProps {
  cartCount?: number
  wishlistCount?: number
  onOpenMenu?: () => void
  onOpenBasket?: () => void
  onOpenSearch?: () => void
  className?: string
}

export function CentredHeader({
  cartCount = 0,
  wishlistCount = 0,
  onOpenMenu,
  onOpenBasket,
  onOpenSearch,
  className,
}: CentredHeaderProps) {
  const pathname = usePathname()

  const leftLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/collections', label: 'Collections' },
  ]

  const rightLinks = [
    { href: '/journal', label: 'Journal' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header
      data-testid="centred-header"
      className={cn(
        'sticky top-0 z-40 w-full border-b border-river/25 bg-canvas/90 backdrop-blur-md transition-all',
        className,
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Left: Navigation links (desktop) / Menu trigger (mobile) */}
        <div className="flex items-center gap-6">
          {onOpenMenu ? (
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Open menu"
              className="pebble flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/80 text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus md:hidden"
            >
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-4 bg-ink" />
                <span className="h-0.5 w-4 bg-ink" />
              </span>
            </button>
          ) : null}

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {leftLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'link-draw font-mono text-xs font-semibold tracking-widest uppercase transition-colors',
                    isActive ? 'text-brand' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Center: Lowercase "mossen" wordmark with swaying leaf */}
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Mossen Home"
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span className="font-display text-2xl font-normal tracking-tight text-ink lowercase sm:text-3xl">
              mossen
            </span>
            <Leaf
              size={18}
              className="sway text-brand transition-transform duration-500 group-hover:rotate-12"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Right: Secondary links & Actions */}
        <div className="flex items-center gap-6">
          <nav aria-label="Secondary" className="hidden items-center gap-8 md:flex">
            {rightLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'link-draw font-mono text-xs font-semibold tracking-widest uppercase transition-colors',
                    isActive ? 'text-brand' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            {onOpenSearch ? (
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                className="pebble flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/70 text-ink transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
              >
                <MagnifyingGlass size={18} aria-hidden="true" />
              </button>
            ) : (
              <Link
                href="/search"
                aria-label="Search"
                className="pebble flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/70 text-ink transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
              >
                <MagnifyingGlass size={18} aria-hidden="true" />
              </Link>
            )}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="pebble relative flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/70 text-ink transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
            >
              <Heart size={18} aria-hidden="true" />
              {wishlistCount > 0 ? (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 font-mono text-[9px] font-bold text-on-brand">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>

            <Link
              href="/account"
              aria-label="Account"
              className="pebble hidden h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/70 text-ink transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus sm:flex"
            >
              <User size={18} aria-hidden="true" />
            </Link>

            {onOpenBasket ? (
              <button
                type="button"
                onClick={onOpenBasket}
                aria-label={cartCount > 0 ? `Basket, ${cartCount} items` : 'Basket'}
                className="pebble relative flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/70 text-ink transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
              >
                <ShoppingBag size={18} aria-hidden="true" />
                {cartCount > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 font-mono text-[9px] font-bold text-on-brand">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            ) : (
              <Link
                href="/cart"
                aria-label={cartCount > 0 ? `Basket, ${cartCount} items` : 'Basket'}
                className="pebble relative flex h-10 w-10 items-center justify-center border border-border-strong/30 bg-surface/70 text-ink transition-all hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
              >
                <ShoppingBag size={18} aria-hidden="true" />
                {cartCount > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 font-mono text-[9px] font-bold text-on-brand">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
