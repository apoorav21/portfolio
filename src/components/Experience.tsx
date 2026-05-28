'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const experienceBullets = [
  'Built an LLM-powered data pipeline ingesting CRM data from Freshdesk and Salesforce APIs, running zero-shot classification and extractive QA on support tickets via LangChain, then transforming and loading into PostgreSQL (AWS RDS) via dbt.',
  'Orchestrated the entire pipeline with Apache Airflow — handling retries, backfill, and dependency management across daily and weekly jobs.',
  'Applied multi-label zero-shot classification to categorise tickets without a labelled training set, surfacing 20%+ more hidden issues buried in unstructured text.',
  'Reduced manual ticket review time by 400% by replacing a human-review workflow with an automated LLM audit pipeline with human-in-the-loop escalation.',
]

const impactStats = [
  { value: '400%', label: 'ticket auditing efficiency' },
  { value: '15%',  label: 'reduction in ticket volume' },
  { value: '20%+', label: 'more issues surfaced' },
]

const achievementItems = [
  { icon: '🥈', title: '2nd Prize — Collegiate Hackathon', desc: 'Problem-solving, coding, and innovation track.' },
  { icon: '🏆', title: 'Top-10 Finalist — IIM Ahmedabad × Ashoka University', desc: 'National hackathon — selected in the top 10 teams out of hundreds of applicants.' },
  { icon: '⚡', title: '550+ problems solved on Codeforces', desc: 'Competitive programming — graphs, DP, greedy, combinatorics.', link: 'https://codeforces.com/profile/apoorav_rao' },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} style={{ padding: '96px 0 0', scrollMarginTop: 80 }}>
      <div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>

          {/* ── Section head ─────────────────────────────────────────── */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>02 ·</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.01em', margin: 0, flex: 1 }}>
              Work
            </h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-mute)', letterSpacing: '0.05em' }}>
              one role, real numbers
            </span>
          </motion.div>

          {/* ── Experience card ──────────────────────────────────────── */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28, padding: '22px 0', borderTop: 'none' }} className="exp-card-grid">
            {/* Meta */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-mute)', letterSpacing: '0.04em' }}>
              <span style={{ color: 'var(--accent)', display: 'block', marginBottom: 6 }}>Jun 2025 — Mar 2026</span>
              Internship · 10 months
            </div>

            {/* Content */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 26, letterSpacing: '-0.01em', margin: '0 0 4px' }}>
                Gen &amp; Agentic AI Intern
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 14, letterSpacing: '0.03em' }}>
                Caterpillar Signs Pvt. Ltd. (Group Bayport) · Gurugram
              </div>

              <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {experienceBullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    style={{ display: 'flex', gap: 10, fontSize: 14.5, color: 'var(--text-dim)', lineHeight: 1.6 }}
                  >
                    <span style={{ color: 'var(--accent)', marginTop: 6, flexShrink: 0, fontSize: 8 }}>▸</span>
                    {b}
                  </motion.li>
                ))}
              </ul>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px', marginBottom: 20 }}>
                {['LangChain', 'Apache Airflow', 'dbt', 'PostgreSQL', 'AWS RDS', 'Freshdesk API', 'Salesforce API', 'Python'].map((t) => (
                  <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.04em', padding: '4px 9px', border: '1px solid var(--line)', borderRadius: 999, color: 'var(--text-dim)' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Impact stats */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px' }}>
                {impactStats.map((stat) => (
                  <span key={stat.value} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-mute)' }}>
                    <b style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, color: 'var(--accent)' }}>{stat.value}</b>
                    {stat.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Education ─────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--line-soft)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 22 }}>
              Education
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {[
                { emoji: '🎓', school: 'BRCM College of Engineering and Technology', degree: 'B.Tech in Computer Science', loc: 'Bahal, Haryana · 2022 – 2026' },
                { emoji: '📚', school: 'O.P. Jindal Modern School', degree: '12th CBSE', loc: 'Hisar, Haryana · 2022' },
              ].map((e) => (
                <div key={e.school} style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{e.emoji}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>{e.school}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 4 }}>{e.degree}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)' }}>{e.loc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Achievements ──────────────────────────────────────────── */}
          <motion.div variants={fadeUp} style={{ marginTop: 40 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 22 }}>
              A couple of wins
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {achievementItems.map((a) => (
                <div key={a.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 4px', borderBottom: '1px solid var(--line-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--text-mute)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{a.icon}</span>
                    {a.desc}
                  </span>
                  {'link' in a ? (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--accent)', textAlign: 'right', maxWidth: '50%', textDecoration: 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      {a.title} ↗
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text)', textAlign: 'right', maxWidth: '50%' }}>
                      {a.title}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .exp-card-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  )
}
