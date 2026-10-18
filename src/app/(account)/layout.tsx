import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Leaf } from '@/components/icons'
import { AccountNav } from '@/components/layout/account-nav'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="border-b border-river/30 bg-surface/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft tabular-nums hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Return to store</span>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span className="font-display text-2xl font-normal text-ink lowercase">mossen</span>
            <Leaf size={18} className="sway text-brand" aria-hidden="true" />
          </Link>

          <div className="text-xs text-ink-soft tabular-nums">My account</div>
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 pt-10 pb-20 focus:outline-none md:pt-14"
      >
        <div className="page-container">
          <p className="mb-6 font-display text-lg text-ink-soft">My account</p>

          <Suspense fallback={<div className="mb-8 h-11" />}>
            <AccountNav />
          </Suspense>

          <div>{children}</div>
        </div>
      </main>

      <footer className="border-t border-river/20 py-6 text-center text-xs text-ink-faint tabular-nums">
        &copy; 2026 MOSSEN studios &middot; Sustainable slow fashion
      </footer>
    </div>
  )
}
