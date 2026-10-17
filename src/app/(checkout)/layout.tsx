import Link from 'next/link'
import { ArrowLeft, Leaf } from '@/components/icons'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="border-b border-river/30 bg-surface/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/cart"
            className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>RETURN TO BASKET</span>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span className="font-display text-2xl font-normal text-ink lowercase">mossen</span>
            <Leaf size={18} className="sway text-brand" aria-hidden="true" />
          </Link>

          <div className="font-mono text-xs text-ink-soft">QUIET CHECKOUT</div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 py-10 focus:outline-none">
        <div className="mx-auto max-w-5xl px-6">{children}</div>
      </main>

      <footer className="border-t border-river/20 py-6 text-center font-mono text-xs text-ink-faint">
        ENCRYPTED 256-BIT CHECKOUT &middot; &copy; 2026 MOSSEN STUDIOS
      </footer>
    </div>
  )
}
