'use client'

import { motion } from 'framer-motion'

// A candlestick chart with moving average line
const candles = [
  { x: 10, open: 60, close: 52, high: 62, low: 48 },
  { x: 20, open: 52, close: 58, high: 61, low: 50 },
  { x: 30, open: 58, close: 54, high: 60, low: 51 },
  { x: 40, open: 54, close: 62, high: 65, low: 52 },
  { x: 50, open: 62, close: 68, high: 70, low: 60 },
  { x: 60, open: 68, close: 64, high: 71, low: 62 },
  { x: 70, open: 64, close: 72, high: 74, low: 62 },
  { x: 80, open: 72, close: 78, high: 80, low: 70 },
]

const maLine = candles.map((c) => ({ x: c.x, y: (c.open + c.close) / 2 }))

// Normalise y from [45,80] to [15,85] in SVG coords (inverted)
const toSVG = (val: number) => 85 - ((val - 45) / 35) * 70

// Warm linen: sage for up, terracotta for down, amber MA line
const upColor   = '#6A8A5A'  // warm sage
const downColor = '#BE5C33'  // terracotta
const maColor   = '#C8872A'  // warm amber

export default function PaperTradingAnimation({ isVisible }: { isVisible: boolean }) {
  const maPath = maLine
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${toSVG(p.y)}`)
    .join(' ')

  return (
    <div
      className="w-full h-full flex flex-col p-3"
      style={{ background: 'var(--bg-2)' }}
    >
      {/* Ticker row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
            AAPL
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: upColor, fontFamily: 'var(--font-mono)' }}>
            +2.4%
          </span>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-mute)', fontFamily: 'var(--font-mono)' }}>
          $10,423.20
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1 }}>
        <svg width="100%" height="100%" viewBox="0 0 90 100" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line key={y} x1={5} y1={y} x2={90} y2={y}
              stroke="var(--line-soft)" strokeWidth="0.5" />
          ))}

          {/* Candlesticks */}
          {candles.map((c, i) => {
            const isUp   = c.close >= c.open
            const color  = isUp ? upColor : downColor
            const bodyTop = toSVG(Math.max(c.open, c.close))
            const bodyBot = toSVG(Math.min(c.open, c.close))
            const bodyH   = Math.max(bodyBot - bodyTop, 1)
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={isVisible ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                style={{ transformOrigin: `${c.x}px ${(bodyTop + bodyBot) / 2}px` }}
              >
                {/* Wick */}
                <line x1={c.x} y1={toSVG(c.high)} x2={c.x} y2={toSVG(c.low)}
                  stroke={color} strokeWidth="0.7" />
                {/* Body */}
                <rect
                  x={c.x - 3} y={bodyTop}
                  width={6} height={bodyH}
                  fill={color}
                  rx="0.5"
                />
              </motion.g>
            )
          })}

          {/* MA line */}
          <motion.path
            d={maPath}
            fill="none"
            stroke={maColor}
            strokeWidth="1"
            strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
          />

          {/* Buy marker — triangle below candle 4 (x=40, low=52) */}
          {(() => {
            const markerY = toSVG(candles[3].low) + 4   // just below the wick
            const triTop  = markerY + 1
            return (
              <motion.g
                initial={{ opacity: 0, y: 6 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ delay: 1.5, duration: 0.35 }}
              >
                {/* Upward triangle */}
                <polygon
                  points={`${40},${triTop - 5} ${40 - 3.5},${triTop + 1} ${40 + 3.5},${triTop + 1}`}
                  fill={upColor}
                />
                {/* BUY label */}
                <text
                  x={40} y={triTop + 7}
                  textAnchor="middle" fontSize="3.5"
                  fill={upColor} fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  BUY
                </text>
              </motion.g>
            )
          })()}
        </svg>
      </div>
    </div>
  )
}
