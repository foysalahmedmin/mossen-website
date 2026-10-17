import Link from 'next/link'
import { Leaf } from '@/components/icons'
import { CentredHeader } from '@/components/layout/centred-header'
import { Footer } from '@/components/layout/footer'
import { routes } from '@/config/routes'
import { systemCopy } from '@/config/system-copy'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <CentredHeader />
      <main
        id="main-content"
        data-page="not-found"
        tabIndex={-1}
        className="flex flex-1 flex-col items-center justify-center p-6 text-center focus:outline-none"
      >
        <div className="pebble w-full max-w-md border border-border-strong/30 bg-surface/90 p-10 shadow-xl backdrop-blur-sm">
          <Leaf size={32} className="sway mx-auto text-brand" aria-hidden="true" />
          <span className="mt-4 block font-mono text-xs tracking-widest text-ink-soft uppercase">
            PAGE NOT LOCATED
          </span>
          <h1 className="mt-2 mb-3 font-display text-3xl font-normal text-ink lowercase">
            {systemCopy.notFound.title}
          </h1>
          <p className="mb-8 font-text text-sm text-ink-soft">{systemCopy.notFound.body}</p>
          <Link
            href={routes.home}
            className="pebble inline-flex items-center justify-center bg-brand px-6 py-3 font-mono text-xs font-semibold tracking-wider text-on-brand uppercase transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-focus"
          >
            {systemCopy.notFound.cta}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
