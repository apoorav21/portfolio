'use client'

import { motion } from 'framer-motion'

// Warm-linen themed: terracotta / amber / warm-brown rings
const rings = [
  { color: '#BE5C33', track: '#DFC4A8', r: 44, pct: 0.82, label: 'Move' },
  { color: '#C8872A', track: '#E0D0A0', r: 32, pct: 0.65, label: 'Exercise' },
  { color: '#8C5A2A', track: '#CCBBA0', r: 20, pct: 0.90, label: 'Stand' },
]

const heartbeat = 'M0,50 L10,50 L15,20 L20,80 L25,50 L35,50 L40,35 L45,65 L50,50 L100,50'

const circumference = (r: number) => 2 * Math.PI * r

export default function TrainFlowAnimation({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center gap-8 px-4"
      style={{ background: 'var(--bg-2)' }}
    >
      {/* Activity Rings */}
      <div className="relative flex items-center justify-center">
        <svg width={110} height={110} viewBox="0 0 110 110">
          {rings.map(({ color, track, r, pct }) => {
            const circ = circumference(r)
            const cx = 55, cy = 55
            return (
              <g key={r}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke={track} strokeWidth={8} />
                <motion.circle
                  cx={cx} cy={cy} r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  initial={{ strokeDashoffset: circ }}
                  animate={isVisible ? { strokeDashoffset: circ * (1 - pct) } : { strokeDashoffset: circ }}
                  transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px' }}
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Stats + heartbeat */}
      <div className="flex flex-col gap-3 min-w-[100px]">
        {[
          { label: 'Calories', val: '423', unit: 'kcal', color: '#BE5C33' },
          { label: 'Distance', val: '5.2',  unit: 'km',   color: '#C8872A' },
          { label: 'Heart Rate', val: '142', unit: 'bpm', color: '#8C5A2A' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 12 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}
          >
            <span style={{ fontSize: 17, fontWeight: 700, color: stat.color, fontFamily: 'var(--font-display)' }}>
              {stat.val}
            </span>
            <span style={{ fontSize: 9.5, color: 'var(--text-mute)', fontFamily: 'var(--font-mono)' }}>{stat.unit}</span>
            <span style={{ fontSize: 8.5, color: 'var(--text-mute)', fontFamily: 'var(--font-mono)', marginLeft: 2 }}>{stat.label}</span>
          </motion.div>
        ))}

        {/* Heartbeat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <svg width="100" height="28" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d={heartbeat}
              fill="none"
              stroke="#BE5C33"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
