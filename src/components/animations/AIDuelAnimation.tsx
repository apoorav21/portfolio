'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Warm linen: terracotta vs warm-brown models
const modelA = { name: 'Model A', color: '#BE5C33', score: 87 }
const modelB = { name: 'Model B', color: '#8C5A2A', score: 74 }

const responseLines = [
  'Analyzing prompt...',
  'Generating response...',
  'Token 128 / 512',
  'Complete ✓',
]

export default function AIDuelAnimation({ isVisible }: { isVisible: boolean }) {
  const [lineIndex,   setLineIndex]   = useState(0)
  const [showScores,  setShowScores]  = useState(false)

  useEffect(() => {
    if (!isVisible) { setLineIndex(0); setShowScores(false); return }
    const timers: ReturnType<typeof setTimeout>[] = []
    responseLines.forEach((_, i) => {
      timers.push(setTimeout(() => setLineIndex(i + 1), 400 + i * 500))
    })
    timers.push(setTimeout(() => setShowScores(true), 2800))
    return () => timers.forEach(clearTimeout)
  }, [isVisible])

  return (
    <div
      className="w-full h-full flex flex-col p-3 gap-2"
      style={{ background: 'var(--bg-2)' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, padding: '2px 8px',
          border: `1px solid ${modelA.color}`, borderRadius: 4,
          color: modelA.color, background: `${modelA.color}15`,
          fontFamily: 'var(--font-mono)',
        }}>{modelA.name}</span>
        <span style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text-mute)', fontFamily: 'var(--font-mono)' }}>VS</span>
        <span style={{
          fontSize: 9.5, fontWeight: 700, padding: '2px 8px',
          border: `1px solid ${modelB.color}`, borderRadius: 4,
          color: modelB.color, background: `${modelB.color}15`,
          fontFamily: 'var(--font-mono)',
        }}>{modelB.name}</span>
      </div>

      {/* Two panels */}
      <div style={{ display: 'flex', gap: 8, flex: 1 }}>
        {[modelA, modelB].map((model, mi) => (
          <div
            key={model.name}
            style={{
              flex: 1,
              borderRadius: 10,
              border: `1px solid var(--line)`,
              background: 'var(--bg-3)',
              padding: '8px 10px',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 8.5, fontWeight: 600, marginBottom: 6, color: model.color, fontFamily: 'var(--font-mono)' }}>
              {model.name}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {responseLines.slice(0, lineIndex).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: mi === 0 ? -6 : 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 7.5, color: 'var(--text-dim)', lineHeight: 1.4, fontFamily: 'var(--font-mono)' }}
                >
                  {i === lineIndex - 1 && (
                    <span style={{ display: 'inline-block', width: 4, height: 9, background: model.color, opacity: 0.7, verticalAlign: 'middle', marginRight: 2, borderRadius: 1 }} />
                  )}
                  {line}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Score bar */}
      {showScores && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ paddingTop: 6, borderTop: '1px solid var(--line-soft)' }}
        >
          <div style={{ fontSize: 8.5, color: 'var(--text-mute)', textAlign: 'center', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
            Evaluation Score
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: modelA.color, width: 36, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
              {modelA.score}%
            </span>
            <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
              <motion.div
                style={{
                  position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 999,
                  background: `linear-gradient(90deg, ${modelA.color}, ${modelB.color})`,
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${modelA.score}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: modelB.color, width: 36, fontFamily: 'var(--font-mono)' }}>
              {modelB.score}%
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
