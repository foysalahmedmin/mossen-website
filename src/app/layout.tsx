import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MOSSEN',
  description: 'MOSSEN — Mirror Try demo store',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
