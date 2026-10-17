import type { Metadata } from 'next'
import { Albert_Sans, Hedvig_Letters_Serif, Spline_Sans_Mono } from 'next/font/google'
import './globals.css'
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

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s — ${brand.name}` },
  description: brand.description,
  robots: env.demoMode ? { index: false, follow: false } : undefined,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body className="bg-canvas font-text text-ink antialiased">
        <MirrorTryHost>
          <StoreHydrator />
          {children}
        </MirrorTryHost>
      </body>
    </html>
  )
}
