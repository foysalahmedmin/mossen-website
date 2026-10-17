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
            className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>RETURN TO STORE</span>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span className="font-display text-2xl font-normal text-ink lowercase">mossen</span>
            <Leaf size={18} className="sway text-brand" aria-hidden="true" />
          </Link>

          <div className="font-mono text-xs text-ink-soft">MY ACCOUNT</div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 py-10 focus:outline-none">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-normal text-ink">My Sanctuary</h2>
            <p className="mt-1 font-text text-sm text-ink-soft">
              Manage your orders, saved measurements, and quiet preferences.
            </p>
          </div>

          <Suspense fallback={<div className="h-10" />}>
            <AccountNav />
          </Suspense>

          <div>{children}</div>
        </div>
      </main>

      <footer className="border-t border-river/20 py-6 text-center font-mono text-xs text-ink-faint">
        &copy; 2026 MOSSEN STUDIOS &middot; SUSTAINABLE SLOW FASHION
      </footer>
    </div>
  )
}
