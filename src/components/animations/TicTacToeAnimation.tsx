'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const moves = [
  { pos: 0, player: 'X' },
  { pos: 4, player: 'O' }, // AI plays center
  { pos: 2, player: 'X' },
  { pos: 6, player: 'O' }, // AI blocks
  { pos: 8, player: 'X' },
  { pos: 1, player: 'O' }, // AI wins
  { pos: 3, player: 'O' }, // extra
  { pos: 5, player: 'O' },
]

const WIN_LINE = { from: { x: 5, y: 50 }, to: { x: 95, y: 50 } } // row 1

export default function TicTacToeAnimation({ isVisible }: { isVisible: boolean }) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [moveIndex, setMoveIndex] = useState(0)
  const [showWin, setShowWin] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')

  useEffect(() => {
    if (!isVisible) {
      setBoard(Array(9).fill(null))
      setMoveIndex(0)
      setShowWin(false)
      setCurrentPlayer('X')
      return
    }
    let i = 0
    const interval = setInterval(() => {
      if (i < moves.length) {
        const move = moves[i]
        setBoard((prev) => {
          const next = [...prev]
          next[move.pos] = move.player
          return next
        })
        setCurrentPlayer(move.player === 'X' ? 'O' : 'X')
        setMoveIndex(i + 1)
        i++
        if (i >= 5) {
          clearInterval(interval)
          setTimeout(() => setShowWin(true), 300)
        }
      }
    }, 600)
    return () => clearInterval(interval)
  }, [isVisible])

  const grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white gap-3">
      {/* AI label */}
      <div className="flex items-center gap-3 text-[10px]">
        <span className="px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-600 font-semibold">
          You — X
        </span>
        <span className="text-slate-300">vs</span>
        <span className="px-2 py-0.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 font-semibold">
          Minimax AI — O
        </span>
      </div>

      {/* Board */}
      <div className="relative">
        <div className="grid grid-cols-3 gap-0">
          {grid.map((i) => {
            const row = Math.floor(i / 3)
            const col = i % 3
            return (
              <div
                key={i}
                className={`w-12 h-12 flex items-center justify-center text-2xl font-bold
                  ${col < 2 ? 'border-r-2 border-slate-200' : ''}
                  ${row < 2 ? 'border-b-2 border-slate-200' : ''}
                `}
              >
                <AnimatePresence>
                  {board[i] && (
                    <motion.span
                      key={`${i}-${board[i]}`}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{ color: board[i] === 'X' ? '#ec4899' : '#6366f1' }}
                    >
                      {board[i]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Win line overlay */}
        <AnimatePresence>
          {showWin && (
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 144 144"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.line
                x1={4} y1={72} x2={140} y2={72}
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Status */}
      <AnimatePresence mode="wait">
        {showWin ? (
          <motion.div
            key="win"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-bold text-accent-600"
          >
            Minimax AI wins — it never loses 🤖
          </motion.div>
        ) : (
          <motion.div
            key="turn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-slate-400"
          >
            {currentPlayer === 'O' ? '🤖 AI thinking...' : 'Your turn'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
