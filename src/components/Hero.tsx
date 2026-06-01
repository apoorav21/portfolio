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

          {/* Echo CTA — featured */}
          <motion.div variants={item} style={{ marginTop: 36 }}>
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                background: 'var(--bg-2)',
                border: '2px solid var(--accent)',
                borderRadius: 16,
                padding: '18px 28px',
                boxShadow: '4px 4px 0px var(--accent-deep)',
                maxWidth: 420,
                width: '100%',
                cursor: 'pointer',
              }}
              onClick={() => window.dispatchEvent(new CustomEvent('openEcho'))}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translate(2px, 2px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 0px var(--accent-deep)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'none'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '4px 4px 0px var(--accent-deep)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Echo avatar circle */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15, color: '#fff',
                  flexShrink: 0,
                  boxShadow: '0 0 12px var(--accent)',
                }}>E</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
                    Talk to me — AI version ✦
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-dim)', marginTop: 2, lineHeight: 1.4 }}>
                    Ask about my projects, skills, personality & availability
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {["What's TrainFlow?", "What's your tech stack?", "Are you open to work?"].map((q) => (
                  <span
                    key={q}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10.5,
                      padding: '4px 10px',
                      border: '1px solid var(--line)',
                      borderRadius: 999,
                      color: 'var(--text-mute)',
                      letterSpacing: '0.02em',
                    }}
                  >{q}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Secondary CTAs */}
          <motion.div
            variants={item}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 16 }}
          >
            <a
              href="#projects"
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
