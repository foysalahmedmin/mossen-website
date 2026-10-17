'use client'

import { Suspense, useState } from 'react'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { CentredHeader } from '@/components/layout/centred-header'
import { Footer } from '@/components/layout/footer'
import { MenuSheet } from '@/components/layout/menu-sheet'
import { OrganicSearchSheet } from '@/components/layout/organic-search-sheet'
import { UnrollingBasketSheet } from '@/components/layout/unrolling-basket-sheet'
import { PageFade } from '@/lib/motion'
import { useCartStore } from '@/stores/cart-store'
import { useUiStore } from '@/stores/ui-store'
import { useWishlistStore } from '@/stores/wishlist-store'

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useCartStore((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0))
  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const openPanel = useUiStore((s) => s.openPanel)

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <AnnouncementBar />
      <Suspense fallback={<div className="h-20 w-full border-b border-river/25 bg-canvas/90" />}>
        <CentredHeader
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          onOpenMenu={() => setMenuOpen(true)}
          onOpenBasket={() => openPanel('cart')}
          onOpenSearch={() => openPanel('search')}
        />
      </Suspense>
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <PageFade>{children}</PageFade>
      </main>
      <Footer />
      <MenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
      <OrganicSearchSheet />
      <UnrollingBasketSheet />
    </div>
  )
}
