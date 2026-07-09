'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Server, Cpu, Smartphone } from 'lucide-react'

const pillars = [
  {
    icon: Cpu,
    title: 'AI & LLMs',
    desc: 'Building agents, knowledge bases, and LLM-powered workflows. From evaluation frameworks to autonomous branding agents.',
  },
  {
    icon: Server,
    title: 'Data Engineering',
    desc: 'Designing ETL pipelines with Apache Airflow, dbt, and PostgreSQL. Making raw data actionable at scale.',
  },
  {
    icon: Code2,
    title: 'Cloud Infrastructure',
    desc: 'Serverless-first with AWS Lambda, DynamoDB, API Gateway, and CDK. Infrastructure as code, always.',
  },
  {
    icon: Smartphone,
    title: 'iOS Development',
    desc: 'Native SwiftUI apps with HealthKit, WatchKit, and deep Apple ecosystem integration.',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ padding: '96px 0 0', scrollMarginTop: 80 }}>
      <div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {/* Header */}
          <motion.div variants={fadeUp} style={{ maxWidth: '54ch', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid var(--line-soft)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>01 ·</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.01em', margin: 0, flex: 1 }}>
                About
              </h2>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>
              CS graduate (B.Tech, 8 CGPA), building at the intersection of AI agents,
              cloud infrastructure, and native mobile. My work is production-grade — not demos.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.65, margin: '12px 0 0' }}>
              Currently building{' '}
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>TrainFlow</span>, an AI fitness coaching
              platform for iOS with HealthKit integration and a fully serverless AWS backend.
            </p>
          </motion.div>

          {/* Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: 24,
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.borderColor = 'var(--line)'
                }}
              >
                <div style={{ marginBottom: 14 }}>
                  <p.icon size={20} style={{ color: 'var(--accent)', opacity: 0.8 }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px', fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div variants={fadeUp} style={{ marginTop: 52, paddingTop: 36, borderTop: '1px solid var(--line-soft)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 28 }}>
              Timeline
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0' }}>
              {[
                { year: '2022', label: 'Started CS degree',    sub: 'Fell in love with algorithms' },
                { year: '2023', label: 'First AWS projects',   sub: 'Lambda, DynamoDB, serverless' },
                { year: '2024', label: 'LLM integrations',     sub: 'Agents, RAG, knowledge bases' },
                { year: '2025', label: 'Internship @ Caterpillar', sub: 'LangChain · Airflow · AWS' },
                { year: '2026', label: 'Graduating',           sub: "Ready for what's next" },
              ].map((t, i, arr) => (
                <div key={t.year} style={{ flex: '1 1 120px', padding: '0 16px 0 0', borderLeft: i === 0 ? 'none' : '1px solid var(--line-soft)', paddingLeft: i === 0 ? 0 : 16, marginBottom: 16 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', margin: '0 0 4px', letterSpacing: '0.06em' }}>{t.year}</p>
                  <p style={{ fontSize: 13.5, color: 'var(--text)', margin: '0 0 2px', fontWeight: 500 }}>{t.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-mute)', margin: 0 }}>{t.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
