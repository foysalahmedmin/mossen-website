'use client'

import Link from 'next/link'
import { Leaf } from '@/components/icons'
import { routes } from '@/config/routes'
import { systemCopy } from '@/config/system-copy'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <main
        id="main-content"
        data-page="error"
        tabIndex={-1}
        className="flex flex-1 flex-col items-center justify-center p-6 text-center focus:outline-none"
      >
        <div className="pebble w-full max-w-md border border-border-strong/30 bg-surface/90 p-10 backdrop-blur-sm">
          <Leaf size={32} className="mx-auto text-danger" aria-hidden="true" />
          <span className="mt-4 block text-xs text-danger tabular-nums">
            A disturbance occurred
          </span>
          <h1 className="mt-2 mb-3 font-display text-3xl font-normal text-ink lowercase">
            {systemCopy.error.title}
          </h1>
          <p className="mb-8 font-text text-sm text-ink-soft">{systemCopy.error.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={reset}
              className="pebble inline-flex items-center justify-center bg-brand px-6 py-3 text-xs font-semibold text-on-brand tabular-nums transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-focus"
            >
              {systemCopy.error.retry}
            </button>
            <Link
              href={routes.home}
              className="pebble inline-flex items-center justify-center border border-border-strong/40 bg-surface px-6 py-3 text-xs font-semibold text-ink tabular-nums hover:bg-canvas focus-visible:outline-2 focus-visible:outline-focus"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
