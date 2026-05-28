'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} style={{ padding: '96px 0 0', scrollMarginTop: 80 }}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>04 ·</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.01em', margin: 0, flex: 1 }}>
              Projects
            </h2>
            <a
              href="https://github.com/apoorav21"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-mute)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-mute)')}
            >
              code, not concepts
            </a>
          </div>
        </motion.div>

        {/* Stacked project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .project-card-flex { flex-direction: column !important; }
          .project-anim-panel { width: 100% !important; min-height: 200px; border-right: none !important; border-bottom: 1px solid var(--line-soft) !important; }
        }
      `}</style>
    </section>
  )
}
