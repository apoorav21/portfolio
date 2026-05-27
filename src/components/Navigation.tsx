'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#projects',   label: 'Projects' },
  { href: '#skills',     label: 'Stack' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('')

  /* ── Scroll ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active section ──────────────────────────────────────────────── */
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(`#${id}`) },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* ── Body lock ───────────────────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={{
          background: 'var(--bg)',
          borderBottom: scrolled ? '3px solid var(--text)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 0 0 var(--line)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 36px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo — Instrument Serif */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--text)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            Apoorav Rao
            <span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${active === link.href ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  color: active === link.href ? 'var(--text)' : 'var(--text-dim)',
                  fontWeight: 500,
                  transition: 'color 0.15s',
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => {
                  if (active !== link.href) e.currentTarget.style.color = 'var(--text-dim)'
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CV */}
            <a
              href="/resume.pdf"
              download="Apoorav_Rao_Resume.pdf"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                padding: '8px 18px',
                border: '2px solid var(--text)',
                borderRadius: 8,
                color: 'var(--text)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                fontWeight: 500,
                background: 'transparent',
                boxShadow: '3px 3px 0px var(--text)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)'
                e.currentTarget.style.boxShadow = '1px 1px 0px var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '3px 3px 0px var(--text)'
              }}
            >
              CV ↓
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/apoorav21"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                padding: '8px 18px',
                border: '2px solid var(--accent)',
                borderRadius: 8,
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                fontWeight: 500,
                background: 'transparent',
                boxShadow: '3px 3px 0px var(--accent)',
                transition: 'transform 0.1s, box-shadow 0.1s, background 0.1s, color 0.1s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)'
                e.currentTarget.style.boxShadow = '1px 1px 0px var(--accent)'
                e.currentTarget.style.background = 'var(--accent)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '3px 3px 0px var(--accent)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--accent)'
              }}
            >
              GitHub ↗
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: '2px solid var(--text)',
              color: 'var(--text)',
              padding: '6px 8px',
              borderRadius: 8,
              cursor: 'pointer',
              lineHeight: 0,
              boxShadow: '2px 2px 0 var(--text)',
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* ── Full-screen mobile overlay ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 60,
              background: 'var(--bg)',
              borderRight: '4px solid var(--text)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 64, borderBottom: '2px solid var(--text)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Apoorav Rao<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: 'transparent', border: '2px solid var(--text)', color: 'var(--text)', padding: '6px 8px', borderRadius: 8, cursor: 'pointer', lineHeight: 0 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px', gap: 0 }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 9vw, 56px)',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--line)',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div style={{ padding: '24px 32px', display: 'flex', gap: 12 }}>
              <a
                href="/resume.pdf"
                download="Apoorav_Rao_Resume.pdf"
                onClick={() => setMenuOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13, border: '2px solid var(--text)', borderRadius: 8, color: 'var(--text)', textDecoration: 'none', boxShadow: '3px 3px 0 var(--text)' }}
              >
                CV ↓
              </a>
              <a
                href="https://github.com/apoorav21"
                target="_blank" rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13, border: '2px solid var(--accent)', borderRadius: 8, color: 'var(--accent)', textDecoration: 'none', boxShadow: '3px 3px 0 var(--accent)' }}
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-btn  { display: block !important; }
        }
      `}</style>
    </>
  )
}
