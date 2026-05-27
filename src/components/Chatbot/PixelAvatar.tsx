'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// 12-wide × 16-tall pixel grid — each cell = PIXEL px
// 0 = transparent
// 1 = indigo body      (#6366f1)
// 2 = white detail     (#ffffff)
// 3 = light indigo     (#a5b4fc)
// 4 = dark indigo      (#4338ca)
type Pixel = 0 | 1 | 2 | 3 | 4

const PIXEL = 8 // px per grid cell → character is 96 × 128 px

const baseGrid: Pixel[][] = [
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], // 0  — antenna top
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], // 1  — antenna stem
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // 2  — head top
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 3
  [1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1], // 4  — eyes (2=white)
  [1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1], // 5  — eyes bottom row
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 6  — cheeks
  [1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1], // 7  — smile
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 8  — chin
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // 9  — neck
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 10 — body top
  [1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1], // 11 — buttons (3=accent)
  [1, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1], // 12 — belt/detail (4=dark)
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 13 — body bottom
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0], // 14 — legs A
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0], // 15 — feet A
]

// Alternate leg frame (running)
const runGrid: Pixel[][] = [
  ...baseGrid.slice(0, 14),
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], // 14 — legs B (shifted)
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], // 15 — feet B
]

// Blink grid — eyes become dashes
const blinkGrid: Pixel[][] = [
  ...baseGrid.slice(0, 4),
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1], // 4 squinted eyes (horizontal bars)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 5
  ...baseGrid.slice(6),
]

const colorMap: Record<Pixel, string | null> = {
  0: null,
  1: '#6366f1',
  2: '#ffffff',
  3: '#a5b4fc',
  4: '#4338ca',
}

interface Props {
  isOpen: boolean
  isThinking: boolean
  isRunning: boolean
}

export default function PixelAvatar({ isOpen, isThinking, isRunning }: Props) {
  const svgW = 12 * PIXEL  // 96
  const svgH = 16 * PIXEL  // 128

  const [legFrame, setLegFrame] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)

  // Running: alternate leg frames
  useEffect(() => {
    if (!isRunning) { setLegFrame(0); return }
    const t = setInterval(() => setLegFrame((f) => 1 - f), 140)
    return () => clearInterval(t)
  }, [isRunning])

  // Idle blink every ~4s
  useEffect(() => {
    if (isRunning) return
    const schedule = () => {
      const t = setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 120)
        schedule()
      }, 3500 + Math.random() * 2000)
      return t
    }
    const t = schedule()
    return () => clearTimeout(t)
  }, [isRunning])

  const activeGrid =
    isBlinking ? blinkGrid :
    isRunning && legFrame === 1 ? runGrid :
    baseGrid

  return (
    <motion.div
      className="relative select-none"
      animate={isRunning ? {} : { y: [0, -5, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow halo when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="glow"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [1, 1.15, 1] }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)',
              width: svgW + 32,
              height: svgH + 32,
              left: -16,
              top: -16,
            }}
          />
        )}
      </AnimatePresence>

      {/* Shadow under feet */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{ background: 'rgba(99,102,241,0.18)', width: svgW * 0.7, height: 8 }}
        animate={isRunning ? { scaleX: [1, 0.6, 1], opacity: [0.6, 0.2, 0.6] } : { scaleX: [1, 0.8, 1] }}
        transition={{ duration: isRunning ? 0.28 : 2.2, repeat: Infinity }}
      />

      {/* Lean forward while running */}
      <motion.div
        animate={isRunning ? { rotate: 12 } : { rotate: 0 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="pixel-art drop-shadow-lg"
        >
          {activeGrid.map((row, r) =>
            row.map((pixel, c) => {
              if (pixel === 0) return null
              const color = colorMap[pixel]
              if (!color) return null

              const isBody = r >= 10 && pixel === 1
              const isHead = r <= 8 && pixel === 1

              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * PIXEL}
                  y={r * PIXEL}
                  width={PIXEL - 1}
                  height={PIXEL - 1}
                  fill={color}
                  rx={isHead ? 1 : 0.5}
                />
              )
            })
          )}

          {/* Thinking "..." speech dots */}
          {isThinking && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx={svgW + 6 + i * 7}
                  cy={10}
                  r={2.5}
                  fill="#6366f1"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: [0, -4, 0] }}
                  transition={{ delay: i * 0.2, duration: 0.8, repeat: Infinity }}
                />
              ))}
            </>
          )}
        </svg>
      </motion.div>
    </motion.div>
  )
}
