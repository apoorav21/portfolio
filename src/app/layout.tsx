import type { Metadata } from 'next'
import { Instrument_Serif, JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Apoorav Rao — AI Agent Developer',
  description:
    'Portfolio of Apoorav Rao — CS student graduating June 2026. Building production-grade agentic systems with AWS, LangChain, and OpenAI. Currently working on TrainFlow.',
  keywords: ['Apoorav Rao', 'portfolio', 'AI agent developer', 'AWS', 'LLM', 'LangChain', 'TrainFlow'],
  authors: [{ name: 'Apoorav Rao', url: 'https://github.com/apoorav21' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
