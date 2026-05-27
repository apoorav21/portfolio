'use client'

import { motion } from 'framer-motion'

// Warm linen: terracotta agent, warm-toned platforms
const platforms = [
  { id: 'github',   label: 'GitHub',   x: 20, y: 50, color: '#3C2818', icon: null,  labelDy: 18 },
  { id: 'linkedin', label: 'LinkedIn', x: 80, y: 25, color: '#6A7A8C', icon: 'in',  labelDy: 18 },
  { id: 'resume',   label: 'Resume',   x: 80, y: 72, color: '#6A8A5A', icon: '↓',   labelDy: 14 },
]

const arrows = [
  { from: 'github', to: 'linkedin' },
  { from: 'github', to: 'resume' },
]

const pos = Object.fromEntries(platforms.map((p) => [p.id, { x: p.x, y: p.y }]))

// Official GitHub mark path (16×16 viewBox)
const GITHUB_PATH =
  'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'

export default function ProfileAgentAnimation({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg-2)' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">

        {/* Dashed arrows */}
        {arrows.map((arrow, i) => {
          const from = pos[arrow.from]
          const to   = pos[arrow.to]
          const mx   = (from.x + to.x) / 2
          const my   = (from.y + to.y) / 2
          return (
            <g key={i}>
              <motion.path
                d={`M${from.x},${from.y} Q${mx + 5},${my} ${to.x},${to.y}`}
                fill="none"
                stroke="#CCBBA0"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: 0.6 + i * 0.2, duration: 0.6 }}
              />
              {/* Traveling particle */}
              <motion.circle
                r="2"
                fill="#BE5C33"
                initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                animate={isVisible ? {
                  cx: [from.x, mx + 5, to.x],
                  cy: [from.y, my, to.y],
                  opacity: [0, 1, 1, 0],
                } : { opacity: 0 }}
                transition={{
                  delay: 1.2 + i * 0.3,
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: 'easeIn',
                }}
              />
            </g>
          )
        })}

        {/* Agent center */}
        <motion.circle
          cx={50} cy={50} r={12}
          fill="#BE5C33"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          style={{ transformOrigin: '50px 50px' }}
        />
        <motion.text x={50} y={47} textAnchor="middle" fontSize="4" fill="white" fontWeight="700" fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }}>
          Profile
        </motion.text>
        <motion.text x={50} y={53} textAnchor="middle" fontSize="4" fill="white" fontWeight="700" fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }}>
          Agent
        </motion.text>

        {/* Pulse rings */}
        {[1, 2].map((ring) => (
          <motion.circle
            key={ring}
            cx={50} cy={50} r={12}
            fill="none"
            stroke="#BE5C33"
            strokeWidth="0.8"
            initial={{ scale: 1, opacity: 0 }}
            animate={isVisible ? { scale: [1, 2.2, 1], opacity: [0, 0.5, 0] } : {}}
            transition={{ delay: 1 + ring * 0.5, duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            style={{ transformOrigin: '50px 50px' }}
          />
        ))}

        {/* Platform nodes */}
        {platforms.map((p, i) => (
          <g key={p.id}>
            {/* Circle background */}
            <motion.circle
              cx={p.x} cy={p.y} r={11}
              fill={p.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 + i * 0.15, type: 'spring', stiffness: 350 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />

            {/* Icon: GitHub gets the real SVG mark, others get text */}
            {p.id === 'github' ? (
              <motion.g
                initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
              >
                {/* Nested SVG centers the 16×16 GitHub mark inside the circle */}
                <svg
                  x={p.x - 6.5} y={p.y - 6.5}
                  width={13} height={13}
                  viewBox="0 0 16 16"
                >
                  <path fill="white" d={GITHUB_PATH} />
                </svg>
              </motion.g>
            ) : (
              <motion.text
                x={p.x} y={p.y + 1.5}
                textAnchor="middle" fontSize="5" fill="white" fontWeight="700"
                initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
              >
                {p.icon}
              </motion.text>
            )}

            {/* Label below node */}
            <motion.text
              x={p.x} y={p.y + p.labelDy}
              textAnchor="middle" fontSize="4" fill="var(--text-mute)" fontFamily="var(--font-mono)"
              initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
            >
              {p.label}
            </motion.text>
          </g>
        ))}

        {/* Status — kept well below all nodes */}
        <motion.text
          x={50} y={96}
          textAnchor="middle" fontSize="4" fill="#6A8A5A" fontWeight="600" fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4 }}
        >
          ✓ Synced automatically
        </motion.text>

      </svg>
    </div>
  )
}
