'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

type Cell = { num?: number; mine?: boolean; flagged?: boolean; revealed?: boolean }

// 5x5 board
const initialBoard: Cell[][] = [
  [{ num: 1 }, { num: 2 }, { num: 1 }, { num: 0 }, { num: 0 }],
  [{ num: 2 }, { mine: true }, { num: 2 }, { num: 1 }, { num: 0 }],
  [{ num: 2 }, { num: 3 }, { mine: true }, { num: 1 }, { num: 0 }],
  [{ num: 1 }, { num: 2 }, { num: 2 }, { num: 1 }, { num: 0 }],
  [{ num: 0 }, { num: 0 }, { num: 0 }, { num: 0 }, { num: 0 }],
]

const revealSequence = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 0], [1, 2], [1, 3], [1, 4],
  [2, 0], [2, 1], [2, 3], [2, 4],
  [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
]

const flagSequence: number[][] = [[1, 1], [2, 2]] // mines

const numColors: Record<number, string> = {
  1: '#3b82f6', 2: '#10b981', 3: '#ef4444', 4: '#8b5cf6',
}

export default function MinesweeperAnimation({ isVisible }: { isVisible: boolean }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [flagged, setFlagged] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!isVisible) { setRevealed(new Set()); setFlagged(new Set()); return }
    const timers: NodeJS.Timeout[] = []

    // Reveal cells one by one
    revealSequence.forEach(([r, c], i) => {
      timers.push(setTimeout(() => {
        setRevealed((prev) => new Set([...prev, `${r},${c}`]))
      }, 200 + i * 80))
    })

    // Place flags
    flagSequence.forEach(([r, c], i) => {
      timers.push(setTimeout(() => {
        setFlagged((prev) => new Set([...prev, `${r},${c}`]))
      }, 800 + i * 300))
    })

    return () => timers.forEach(clearTimeout)
  }, [isVisible])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 gap-2">
      {/* Status bar */}
      <div className="flex items-center gap-3 text-[10px] text-slate-500">
        <span>🤖 AI Solver</span>
        <span className="text-green-500 font-semibold">Analyzing constraints...</span>
      </div>

      {/* Grid */}
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(5, 1fr)` }}>
        {initialBoard.map((row, r) =>
          row.map((cell, c) => {
            const key = `${r},${c}`
            const isRevealed = revealed.has(key)
            const isFlagged = flagged.has(key)

            return (
              <motion.div
                key={key}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isRevealed || isFlagged
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.9, opacity: 0.3 }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded select-none ${
                  isFlagged
                    ? 'bg-amber-100 border border-amber-300'
                    : isRevealed
                    ? 'bg-white border border-slate-200 shadow-sm'
                    : 'bg-slate-300 border border-slate-400'
                }`}
              >
                {isFlagged ? (
                  <span className="text-sm">🚩</span>
                ) : isRevealed ? (
                  cell.mine ? (
                    <span className="text-sm">💣</span>
                  ) : cell.num && cell.num > 0 ? (
                    <span style={{ color: numColors[cell.num] ?? '#334155' }}>{cell.num}</span>
                  ) : null
                ) : null}
              </motion.div>
            )
          })
        )}
      </div>

      {/* Logic indicator */}
      <AnimatePresence>
        {flagged.size === flagSequence.length && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-green-600 font-semibold"
          >
            ✓ 2 mines identified via propositional logic
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
