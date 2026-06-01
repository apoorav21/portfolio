import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--i-display',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--i-mono',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--i-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Internship Case Study — Apoorav Rao',
  description:
    'LLM-powered CX pipeline at Caterpillar Signs — 500K+ tickets classified, 4× faster auditing, 15% fewer tickets over 6 months.',
}

export default function InternshipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable}`}>
      {children}
    </div>
  )
}
