'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const signs = [
  { emoji: '✌️', letter: 'V', word: 'Hello' },
  { emoji: '☝️', letter: '1', word: 'World' },
  { emoji: '👍', letter: 'A', word: 'Good'  },
]

export default function SignLanguageAnimation({ isVisible }: { isVisible: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isVisible) { setCurrent(0); return }
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % signs.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [isVisible])

  const sign = signs[current]

  return (
    <div
      className="w-full h-full flex items-center justify-center gap-4 px-4"
      style={{ background: 'var(--bg-2)' }}
    >
      {/* Hand emoji */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
      >
        <span style={{ fontSize: 44, lineHeight: 1, userSelect: 'none' }}>{sign.emoji}</span>
        {/* Letter badge */}
        <span style={{
          background: 'var(--accent)',
          color: '#fff',
          fontSize: 10,
          fontWeight: 700,
          padding: '1px 8px',
          borderRadius: 999,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
        }}>
          {sign.letter}
        </span>
      </motion.div>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
      >
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
          style={{ color: 'var(--accent)', fontSize: 22 }}
        >
          →
        </motion.div>
        <div style={{ fontSize: 8, color: 'var(--text-mute)', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>
          MediaPipe
        </div>
      </motion.div>

      {/* Translation output */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={sign.word}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            {sign.word}
          </motion.div>
        </AnimatePresence>
        <div style={{ fontSize: 9, color: 'var(--text-mute)', fontFamily: 'var(--font-mono)' }}>
          ASL → English
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
          {[1, 2, 3].map((d) => (
            <motion.div
              key={d}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: d * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
