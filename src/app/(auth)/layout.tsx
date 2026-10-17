import Link from 'next/link'
import { ArrowLeft, Leaf } from '@/components/icons'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="px-6 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
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
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center justify-center px-4 py-12 focus:outline-none"
      >
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="py-6 text-center font-mono text-xs text-ink-faint">
        &copy; 2026 MOSSEN STUDIOS &middot; SECURE AUTHENTICATION
      </footer>
    </div>
  )
}
