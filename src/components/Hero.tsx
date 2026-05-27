'use client'

import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="chat"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, var(--bg) 100%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center pt-20">
        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Eyebrow */}
          <motion.div variants={item} className="flex justify-center mb-10">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-mono)',
                fontSize: 11.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                padding: '7px 14px',
                border: '1px solid var(--line)',
                borderRadius: 999,
                background: 'var(--bg-2)',
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
                display: 'inline-block',
                animation: 'pulse 2.4s ease-in-out infinite',
              }} />
              Available · AI Agent Developer
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              margin: '0 0 28px',
            }}
          >
            I build agents<br />
            that{' '}
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
              actually ship.
            </em>
          </motion.h1>

          {/* Lede */}
          <motion.div variants={item}>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '52ch', margin: '0 auto 10px' }}>
              I&apos;m <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Apoorav Rao</strong> — CS final-year,
              graduating June 2026. I design{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>production-grade agentic systems</strong> with
              multi-step tool-calling, real failure handling, and human-in-the-loop where it matters.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '52ch', margin: '0 auto' }}>
              Currently building{' '}
              <a
                href="https://github.com/apoorav21/TrainFlow"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                TrainFlow
              </a>
              {' '}— AI fitness coaching for iOS, serverless AWS backend.
            </p>
          </motion.div>

          {/* Meta */}
          <motion.div
            variants={item}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px 20px',
              fontFamily: 'var(--font-mono)',
              fontSize: 12.5,
              color: 'var(--text-mute)',
              margin: '28px 0 0',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <span style={{ color: 'var(--accent)' }}>●</span> Open to remote
            </span>
            <span>·</span>
            <span>Python · AWS · LangChain · OpenAI</span>
            <span>·</span>
            <span>4+ shipped agents</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 36 }}
          >
            <a
              href="#projects"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                padding: '11px 24px',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: 10,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                fontWeight: 500,
                transition: 'transform 0.1s, box-shadow 0.1s',
                boxShadow: '3px 3px 0px var(--accent-deep)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)'
                e.currentTarget.style.boxShadow = '1px 1px 0px var(--accent-deep)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '3px 3px 0px var(--accent-deep)'
              }}
            >
              View projects
            </a>
            <a
              href="/resume.pdf"
              download="Apoorav_Rao_Resume.pdf"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                padding: '11px 24px',
                background: 'transparent',
                color: 'var(--text)',
                borderRadius: 10,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                border: '2px solid var(--text)',
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
              Download CV ↓
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                padding: '11px 24px',
                background: 'transparent',
                color: 'var(--text-dim)',
                borderRadius: 10,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                border: '1px solid var(--line)',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              Get in touch
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div variants={item} style={{ marginTop: 72, display: 'flex', justifyContent: 'center' }}>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'var(--text-mute)' }}
            >
              <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, transparent, var(--accent))' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
