'use client'

import { motion, AnimatePresence } from 'framer-motion'

// Bar heights for the idle "wave" (5 bars)
const IDLE_HEIGHTS = [14, 22, 17, 26, 12]
// Bar heights for active/thinking state
const ACTIVE_HEIGHTS = [24, 34, 20, 32, 22]

interface Props {
  isOpen: boolean
  isThinking: boolean
}

export default function OrbAvatar({ isOpen, isThinking }: Props) {
  const SIZE = 60

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      {/* ── Outer glow ring (always present, breathes) ───────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.18, 1],
          opacity: isOpen ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(67,56,202,0.5) 0%, transparent 70%)',
          filter: 'blur(6px)',
          inset: -8,
          position: 'absolute',
        }}
      />

      {/* ── Active ring (shows when open) ────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ring"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute rounded-full border-2 pointer-events-none"
            style={{
              borderColor: '#818CF8',
              inset: -5,
              position: 'absolute',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Main orb ─────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-full shadow-xl cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 45%, #3730A3 100%)',
          boxShadow: isOpen
            ? '0 8px 32px rgba(67,56,202,0.6), 0 2px 8px rgba(0,0,0,0.2)'
            : '0 6px 24px rgba(67,56,202,0.4), 0 2px 6px rgba(0,0,0,0.15)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {/* Inner highlight sphere */}
        <div
          className="absolute rounded-full"
          style={{
            width: '45%',
            height: '40%',
            top: '12%',
            left: '18%',
            background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.28) 0%, transparent 70%)',
          }}
        />

        {/* ── Equalizer bars (the core "AI" visual) ─────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
          {IDLE_HEIGHTS.map((idleH, i) => {
            const targetH = isThinking ? ACTIVE_HEIGHTS[i] : idleH
            return (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: 3, background: 'rgba(255,255,255,0.88)' }}
                animate={{
                  height: targetH,
                  opacity: isThinking ? [0.7, 1, 0.7] : [0.65, 0.85, 0.65],
                }}
                transition={{
                  height: { duration: 0.3, ease: 'easeOut' },
                  opacity: {
                    duration: isThinking ? 0.4 : 1.8 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  },
                }}
              />
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
