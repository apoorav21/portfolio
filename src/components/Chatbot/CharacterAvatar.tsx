'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Props {
  isOpen: boolean
  isThinking: boolean
}

export default function CharacterAvatar({ isOpen, isThinking }: Props) {
  const blinkControls = useAnimationControls()
  const blinkInterval = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Blink loop ──────────────────────────────────────────────────── */
  useEffect(() => {
    async function blink() {
      await blinkControls.start({ scaleY: 0.08 }, { duration: 0.07 })
      await blinkControls.start({ scaleY: 1 }, { duration: 0.07 })
    }

    function scheduleNextBlink() {
      const delay = 2500 + Math.random() * 2000
      blinkInterval.current = setTimeout(async () => {
        await blink()
        scheduleNextBlink()
      }, delay)
    }

    scheduleNextBlink()
    return () => { if (blinkInterval.current) clearTimeout(blinkInterval.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const SIZE = 72

  return (
    <div style={{ width: SIZE, height: SIZE }} className="relative select-none">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.18, 1], opacity: isOpen ? [0.5, 0.85, 0.5] : [0.2, 0.4, 0.2] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(67,56,202,0.55) 0%, transparent 70%)',
          filter: 'blur(8px)',
          inset: -10,
          position: 'absolute',
        }}
      />

      {/* SVG Robot */}
      <motion.svg
        width={SIZE}
        height={SIZE}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        /* gentle idle bob */
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{ filter: 'drop-shadow(0 6px 18px rgba(67,56,202,0.45))' }}
      >
        {/* ── Antenna stem ─────────────────────────────────────────────── */}
        <line x1="36" y1="10" x2="36" y2="18" stroke="#4338CA" strokeWidth="2.5" strokeLinecap="round" />

        {/* ── Antenna tip (blinking amber dot) ─────────────────────────── */}
        <motion.circle
          cx="36" cy="8" r="3.5"
          fill="#FBBF24"
          animate={{ opacity: [1, 0.2, 1], scale: [1, 0.75, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Head ─────────────────────────────────────────────────────── */}
        <rect x="18" y="18" width="36" height="28" rx="9" fill="#4338CA" />

        {/* Head highlight */}
        <rect x="20" y="20" width="14" height="7" rx="4" fill="rgba(255,255,255,0.18)" />

        {/* ── Eyes ─────────────────────────────────────────────────────── */}
        {isThinking ? (
          /* Thinking eyes — look up-left */
          <>
            <motion.circle cx="28" cy="30" r="5" fill="white" />
            <motion.circle cx="44" cy="30" r="5" fill="white" />
            <motion.circle cx="26.5" cy="28.5" r="2.5" fill="#0A0A0A" />
            <motion.circle cx="42.5" cy="28.5" r="2.5" fill="#0A0A0A" />
            {/* thinking dots above head */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={50 + i * 6}
                cy={20 - i * 4}
                r={1.5 + i * 0.5}
                fill="#FBBF24"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </>
        ) : isOpen ? (
          /* Open / happy eyes — slightly wider with sparkle */
          <>
            <motion.circle cx="28" cy="31" r="5.5" fill="white" />
            <motion.circle cx="44" cy="31" r="5.5" fill="white" />
            <motion.circle
              cx="28" cy="31" r="2.5"
              fill="#0A0A0A"
              animate={blinkControls}
              style={{ originX: '28px', originY: '31px' }}
            />
            <motion.circle
              cx="44" cy="31" r="2.5"
              fill="#0A0A0A"
              animate={blinkControls}
              style={{ originX: '44px', originY: '31px' }}
            />
            {/* sparkle */}
            <circle cx="30" cy="29.5" r="1" fill="white" opacity="0.7" />
            <circle cx="46" cy="29.5" r="1" fill="white" opacity="0.7" />
          </>
        ) : (
          /* Default eyes */
          <>
            <motion.circle cx="28" cy="31" r="5" fill="white" />
            <motion.circle cx="44" cy="31" r="5" fill="white" />
            <motion.circle
              cx="28" cy="31" r="2.2"
              fill="#0A0A0A"
              animate={blinkControls}
              style={{ originX: '28px', originY: '31px' }}
            />
            <motion.circle
              cx="44" cy="31" r="2.2"
              fill="#0A0A0A"
              animate={blinkControls}
              style={{ originX: '44px', originY: '31px' }}
            />
            <circle cx="29.2" cy="30" r="0.9" fill="white" opacity="0.6" />
            <circle cx="45.2" cy="30" r="0.9" fill="white" opacity="0.6" />
          </>
        )}

        {/* ── Mouth ────────────────────────────────────────────────────── */}
        {isOpen ? (
          /* Happy arc */
          <path d="M 29 40 Q 36 46 43 40" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        ) : isThinking ? (
          /* Thinking — flat line */
          <line x1="29" y1="42" x2="43" y2="42" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        ) : (
          /* Neutral small smile */
          <path d="M 31 41 Q 36 44.5 41 41" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}

        {/* ── Neck ─────────────────────────────────────────────────────── */}
        <rect x="32" y="46" width="8" height="5" rx="2" fill="#3730A3" />

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <rect x="20" y="51" width="32" height="18" rx="7" fill="#4338CA" />

        {/* Body screen — 5 equalizer bars */}
        <g transform="translate(28 57)">
          {[0, 1, 2, 3, 4].map((i) => {
            const h = isThinking ? [7, 11, 8, 10, 6][i] : [4, 7, 5, 8, 3][i]
            return (
              <motion.rect
                key={i}
                x={i * 4}
                y={12 - h}
                width="3"
                height={h}
                rx="1.5"
                fill="rgba(255,255,255,0.85)"
                animate={{
                  height: isThinking ? [h, h + 4, h] : [h, h + 2, h],
                  y: isThinking ? [12 - h, 12 - h - 4, 12 - h] : [12 - h, 12 - h - 2, 12 - h],
                }}
                transition={{
                  duration: isThinking ? 0.45 : 1.6 + i * 0.25,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
        </g>

        {/* ── Left arm ─────────────────────────────────────────────────── */}
        <motion.g
          animate={isOpen ? { rotate: [-8, 8, -8] } : { rotate: 0 }}
          transition={{ duration: 0.6, repeat: isOpen ? Infinity : 0, ease: 'easeInOut' }}
          style={{ originX: '20px', originY: '55px' }}
        >
          <rect x="11" y="52" width="9" height="5" rx="2.5" fill="#3730A3" />
          {/* hand */}
          <circle cx="10" cy="54.5" r="3.5" fill="#4338CA" />
        </motion.g>

        {/* ── Right arm ────────────────────────────────────────────────── */}
        <motion.g
          animate={isOpen ? { rotate: [8, -8, 8] } : { rotate: 0 }}
          transition={{ duration: 0.6, repeat: isOpen ? Infinity : 0, ease: 'easeInOut', delay: 0.15 }}
          style={{ originX: '52px', originY: '55px' }}
        >
          <rect x="52" y="52" width="9" height="5" rx="2.5" fill="#3730A3" />
          {/* hand */}
          <circle cx="62" cy="54.5" r="3.5" fill="#4338CA" />
        </motion.g>

        {/* ── Active ring (chat open) ───────────────────────────────────── */}
        {isOpen && (
          <motion.rect
            x="14" y="14" width="44" height="44" rx="13"
            stroke="#818CF8"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ originX: '36px', originY: '36px' }}
          />
        )}
      </motion.svg>
    </div>
  )
}
