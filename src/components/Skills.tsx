'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const skillGroups = [
  {
    title: 'Agentic AI',
    skills: ['OpenAI Function Calling', 'LangChain', 'Multi-step Tool Execution', 'Agentic Loops', 'Kimi K2', 'Prompt Engineering'],
  },
  {
    title: 'Cloud & Backend',
    skills: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'CDK', 'Cognito', 'RDS', 'S3', 'Python', 'REST APIs'],
  },
  {
    title: 'Data & Pipelines',
    skills: ['ETL / ELT', 'Apache Airflow', 'dbt', 'PostgreSQL', 'SQLite', 'Pandas'],
  },
  {
    title: 'iOS & Mobile',
    skills: ['SwiftUI', 'HealthKit', 'WatchKit', 'CoreData'],
  },
  {
    title: 'Languages',
    skills: ['Python', 'Swift', 'TypeScript', 'SQL', 'Shell'],
  },
  {
    title: 'Tools & APIs',
    skills: ['Git', 'GitHub API', 'LinkedIn API', 'Next.js', 'React', 'Tailwind CSS'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} style={{ padding: '96px 0 0', scrollMarginTop: 80 }}>
      <div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>

          {/* Section head */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>03 ·</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.01em', margin: 0, flex: 1 }}>
              The stack
            </h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-mute)', letterSpacing: '0.05em' }}>
              things I reach for
            </span>
          </motion.div>

          {/* Skills grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px 40px' }} className="skills-grid">
            {skillGroups.map((group) => (
              <motion.div key={group.title} variants={fadeUp}>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 12px' }}>
                  {group.title}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px' }}>
                  {group.skills.map((skill) => (
                    <span key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-dim)', padding: '5px 10px', border: '1px solid var(--line)', borderRadius: 6, background: 'var(--bg-2)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Currently exploring */}
          <motion.div
            variants={fadeUp}
            style={{ marginTop: 36, padding: '18px 20px', borderRadius: 'var(--radius)', background: 'var(--bg-2)', border: '1px dashed var(--line)', display: 'flex', alignItems: 'flex-start', gap: 14 }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)', display: 'inline-block', animation: 'pulse 2.4s ease-in-out infinite' }} />
              Exploring
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['AWS Bedrock', 'Multi-agent systems', 'RAG pipelines', 'HealthKit ML', 'Vector DBs'].map((s) => (
                <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '4px 10px', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--text-dim)', background: 'var(--bg-3)' }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
