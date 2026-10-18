import type { Metadata, Viewport } from 'next'
import { Albert_Sans, Hedvig_Letters_Serif, Spline_Sans_Mono } from 'next/font/google'
import './globals.css'
import { SkipLink } from '@/components/layout/skip-link'
import { ToastContainer } from '@/components/ui/toast-container'
import { brand } from '@/config/brand'
import { env } from '@/config/env'
import { MirrorTryHost } from '@/integration/mirror-try'
import { StoreHydrator } from '@/stores/hydration'

const display = Hedvig_Letters_Serif({
  subsets: ['latin'],
  variable: '--font-hedvig',
  display: 'swap',
})
const text = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-albert',
  display: 'swap',
})
const mono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-spline-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#e6e9e0',
}

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s — ${brand.name}` },
  description: brand.description,
  robots: env.demoMode ? { index: false, follow: false } : undefined,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: env.siteUrl,
    description: brand.description,
  }

  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="bg-canvas font-text text-ink antialiased">
        <SkipLink />
        <StoreHydrator />
        {children}
        <ToastContainer />
        {/* Analog 35mm grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 [background-image:radial-gradient(#20271e_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.035]"
        />
        <MirrorTryHost />
      </body>
    </html>
  )
}
