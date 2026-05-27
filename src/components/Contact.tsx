'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contactRows = [
  { label: 'email',    value: 'apooravrao@gmail.com →',    href: 'mailto:apooravrao@gmail.com' },
  { label: 'linkedin', value: '/in/apoorav-rao →',          href: 'https://linkedin.com/in/apoorav-rao' },
  { label: 'github',   value: '/apoorav21 →',               href: 'https://github.com/apoorav21' },
  { label: 'phone',    value: '+91 92151 51721 →',          href: 'tel:+919215151721' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} style={{ padding: '96px 0 0', scrollMarginTop: 80 }}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section head */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>05 ·</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.01em', margin: 0, flex: 1 }}>
              Let&apos;s talk
            </h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-mute)', letterSpacing: '0.05em' }}>
              i reply fast
            </span>
          </div>

          {/* Contact rows */}
          <div>
            {contactRows.map((row, i) => (
              <motion.a
                key={row.label}
                href={row.href}
                target={row.href.startsWith('mailto') || row.href.startsWith('tel') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 4px',
                  borderBottom: '1px solid var(--line-soft)',
                  textDecoration: 'none',
                  transition: 'padding 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '12px'
                  const val = e.currentTarget.querySelector('.contact-val') as HTMLElement
                  if (val) val.style.color = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '4px'
                  const val = e.currentTarget.querySelector('.contact-val') as HTMLElement
                  if (val) val.style.color = 'var(--text)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--text-mute)' }}>
                  {row.label}
                </span>
                <span
                  className="contact-val"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', transition: 'color 0.15s' }}
                >
                  {row.value}
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12 }}
          >
            <a
              href="mailto:apooravrao@gmail.com"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'oklch(0.18 0.04 60)',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              Say hello →
            </a>
            <a
              href="/resume.pdf"
              download="Apoorav_Rao_Resume.pdf"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                padding: '12px 24px',
                border: '1px solid var(--line)',
                color: 'var(--text-dim)',
                borderRadius: 10,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              Download CV ↓
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
