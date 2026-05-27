'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/projects'

import TrainFlowAnimation    from '@/components/animations/TrainFlowAnimation'
import LLMKBAnimation        from '@/components/animations/LLMKBAnimation'
import APITestingAnimation   from '@/components/animations/APITestingAnimation'
import ProfileAgentAnimation from '@/components/animations/ProfileAgentAnimation'
import AIDuelAnimation       from '@/components/animations/AIDuelAnimation'
import SignLanguageAnimation  from '@/components/animations/SignLanguageAnimation'
import PaperTradingAnimation  from '@/components/animations/PaperTradingAnimation'

const AnimationMap: Record<Project['animation'], React.ComponentType<{ isVisible: boolean }>> = {
  trainflow:    TrainFlowAnimation,
  llmkb:        LLMKBAnimation,
  apitesting:   APITestingAnimation,
  profileagent: ProfileAgentAnimation,
  aiduel:       AIDuelAnimation,
  signlanguage: SignLanguageAnimation,
  papertrading: PaperTradingAnimation,
}

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const AnimationComponent = AnimationMap[project.animation]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row' as const,
        minHeight: 300,
        transition: 'transform 0.2s, border-color 0.2s',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = 'var(--accent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.borderColor = 'var(--line)'
      }}
      className="project-card-flex"
    >
      {/* ── Animation panel (left 42%) ──────────────────────────────── */}
      <div
        style={{
          width: '42%',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-3)',
          borderRight: `1px solid ${project.accentColor}30`,
        }}
        className="project-anim-panel"
      >
        <div style={{ position: 'absolute', top: 12, left: 12, width: 8, height: 8, borderRadius: '50%', background: project.accentColor, zIndex: 2 }} />
        <AnimationComponent isVisible={inView} />
      </div>

      {/* ── Content panel ──────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: 999,
                color: project.accentColor,
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}35`,
              }}>
                {project.language}
              </span>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-mono)', fontSize: 11.5,
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              github.com/apoorav21/{project.id} <ExternalLink size={11} />
            </a>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 28,
            letterSpacing: '-0.01em',
            color: 'var(--text)',
            margin: '0 0 10px',
          }}>
            {project.title}
          </h3>

          {/* Long description */}
          <p style={{ fontSize: 14.5, color: 'var(--text-dim)', lineHeight: 1.65, margin: '0 0 18px', maxWidth: '68ch' }}>
            {project.longDescription}
          </p>

          {/* Bullets */}
          <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {project.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--text-dim)' }}
              >
                <span style={{ color: 'var(--accent)', marginTop: 6, flexShrink: 0, fontSize: 7 }}>▸</span>
                {b}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              letterSpacing: '0.04em',
              padding: '4px 9px',
              borderRadius: 999,
              border: '1px solid var(--line)',
              color: 'var(--text-dim)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
