'use client'

import { useState, useEffect, useRef } from 'react'

export type EchoMode = 'idle' | 'wave' | 'think' | 'happy' | 'talk'

interface Props {
  mode?: EchoMode
  size?: number
  color?: string
}

export default function EchoAvatar({ mode = 'idle', size = 140, color }: Props) {
  const [blink, setBlink]   = useState(false)
  const [lookX, setLookX]   = useState(0)
  const [lookY, setLookY]   = useState(0)
  const [waved, setWaved]   = useState(false)
  const root = useRef<HTMLDivElement>(null)

  /* ── Blink loop ──────────────────────────────────────────────────── */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    function schedule() {
      t = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 140)
        if (Math.random() < 0.25) {
          setTimeout(() => setBlink(true), 280)
          setTimeout(() => setBlink(false), 420)
        }
        schedule()
      }, 2200 + Math.random() * 3200)
    }
    schedule()
    return () => clearTimeout(t)
  }, [])

  /* ── Random look-around when idle ────────────────────────────────── */
  useEffect(() => {
    if (mode !== 'idle') return
    let t: ReturnType<typeof setTimeout>
    function schedule() {
      t = setTimeout(() => {
        setLookX((Math.random() - 0.5) * 2.2)
        setLookY((Math.random() - 0.5) * 1.4)
        schedule()
      }, 1800 + Math.random() * 2200)
    }
    schedule()
    return () => clearTimeout(t)
  }, [mode])

  /* ── Eye direction by mode ───────────────────────────────────────── */
  useEffect(() => {
    if (mode === 'think') {
      setLookY(-1.4); setLookX(0.4)
    } else if (mode === 'happy' || mode === 'wave') {
      setLookY(0); setLookX(0)
    }
  }, [mode])

  /* ── Wave once on mode=wave ──────────────────────────────────────── */
  useEffect(() => {
    if (mode === 'wave') {
      setWaved(true)
      const t = setTimeout(() => setWaved(false), 1600)
      return () => clearTimeout(t)
    }
  }, [mode])

  /* ── Mouse-follow eyes ───────────────────────────────────────────── */
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (mode !== 'idle' && mode !== 'talk') return
      if (!root.current) return
      const r = root.current.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      setLookX(Math.max(-2.5, Math.min(2.5, dx * 4)))
      setLookY(Math.max(-1.8, Math.min(1.8, dy * 3)))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mode])

  const happy = mode === 'happy'
  const think = mode === 'think'
  const wave  = mode === 'wave' || waved
  const talk  = mode === 'talk'
  const fill = color ?? 'var(--accent)'

  return (
    <div
      ref={root}
      style={{
        width: size,
        height: size,
        position: 'relative',
        filter: 'drop-shadow(0 14px 24px oklch(0 0 0 / 0.35))',
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{
          overflow: 'visible',
          animation: think
            ? 'echo-think 1.4s ease-in-out infinite'
            : 'echo-breath 3.4s ease-in-out infinite',
          transformOrigin: '100px 130px',
        }}
      >
        {/* ── Shadow ─────────────────────────────────────────────── */}
        <ellipse cx="100" cy="178" rx="48" ry="6" fill="oklch(0 0 0 / 0.25)">
          <animate attributeName="rx" values="48;42;48" dur="3.4s" repeatCount="indefinite" />
        </ellipse>

        {/* ── Antenna ────────────────────────────────────────────── */}
        <g style={{ transformOrigin: '100px 40px', animation: 'echo-antenna 4s ease-in-out infinite' }}>
          <line x1="100" y1="48" x2="100" y2="22" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="18" r="5" fill={fill}>
            <animate attributeName="r" values="4.5;5.6;4.5" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="18" r="9" fill={fill} opacity="0.25">
            <animate attributeName="r" values="7;12;7" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.0;0.4" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ── Body blob ──────────────────────────────────────────── */}
        <path
          d="M 100 50 C 145 50, 165 80, 165 115 C 165 155, 135 175, 100 175 C 65 175, 35 155, 35 115 C 35 80, 55 50, 100 50 Z"
          fill={fill}
        />
        {/* Highlight */}
        <ellipse cx="78" cy="82" rx="22" ry="14" fill="white" opacity="0.22" />
        {/* Face plate */}
        <ellipse cx="100" cy="115" rx="48" ry="38" fill="oklch(0.16 0.02 60)" opacity="0.85" />

        {/* ── Eyes ───────────────────────────────────────────────── */}
        <g transform={`translate(${lookX * 1.8}, ${lookY * 1.4})`}>
          {/* Left */}
          <g transform="translate(82, 110)">
            {blink ? (
              <rect x="-8" y="-1" width="16" height="2.5" rx="1.5" fill={fill} />
            ) : think ? (
              <path d="M -9 2 Q 0 -5 9 2" stroke={fill} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : happy ? (
              <path d="M -8 2 Q 0 -7 8 2" stroke={fill} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            ) : (
              <>
                <ellipse cx="0" cy="0" rx="7" ry="9" fill={fill} />
                <circle cx={2 + lookX * 0.4} cy={-1 + lookY * 0.3} r="2.2" fill="oklch(0.16 0.02 60)" />
                <circle cx="3.5" cy="-3" r="1.4" fill="white" opacity="0.9" />
              </>
            )}
          </g>
          {/* Right */}
          <g transform="translate(118, 110)">
            {blink ? (
              <rect x="-8" y="-1" width="16" height="2.5" rx="1.5" fill={fill} />
            ) : think ? (
              <path d="M -9 2 Q 0 -5 9 2" stroke={fill} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : happy ? (
              <path d="M -8 2 Q 0 -7 8 2" stroke={fill} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            ) : (
              <>
                <ellipse cx="0" cy="0" rx="7" ry="9" fill={fill} />
                <circle cx={2 + lookX * 0.4} cy={-1 + lookY * 0.3} r="2.2" fill="oklch(0.16 0.02 60)" />
                <circle cx="3.5" cy="-3" r="1.4" fill="white" opacity="0.9" />
              </>
            )}
          </g>
        </g>

        {/* ── Mouth ──────────────────────────────────────────────── */}
        {happy ? (
          <path d="M 86 135 Q 100 148 114 135" stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : talk ? (
          <ellipse cx="100" cy="138" rx="6" ry="3.5" fill={fill}>
            <animate attributeName="ry" values="1.5;4;1.5;3" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
        ) : (
          <>
            <path d="M 92 138 Q 100 142 108 138" stroke={fill} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.7" />
            {think && <circle cx="100" cy="140" r="2" fill={fill} opacity="0.6" />}
          </>
        )}

        {/* ── Cheeks (happy) ─────────────────────────────────────── */}
        {happy && (
          <>
            <ellipse cx="72"  cy="128" rx="5" ry="3" fill="oklch(0.70 0.18 30)" opacity="0.55" />
            <ellipse cx="128" cy="128" rx="5" ry="3" fill="oklch(0.70 0.18 30)" opacity="0.55" />
          </>
        )}

        {/* ── Left arm ───────────────────────────────────────────── */}
        <ellipse cx="36" cy="135" rx="10" ry="12" fill={fill} />

        {/* ── Right arm (wave-able) ───────────────────────────────── */}
        <g style={{
          transformOrigin: '164px 130px',
          animation: wave
            ? 'echo-wave 0.6s ease-in-out 3'
            : think
            ? 'echo-tap 1.2s ease-in-out infinite'
            : 'none',
        }}>
          <ellipse cx="164" cy="135" rx="10" ry="12" fill={fill} />
          {wave && (
            <g transform="translate(174, 110)">
              <path d="M 0 0 L 5 -8 M -3 4 L 8 -3 M -4 -3 L 6 -10" stroke={fill} strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* ── Thinking dots ──────────────────────────────────────── */}
        {think && (
          <g transform="translate(150, 60)">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={i * 10} cy="0" r="3" fill={fill} opacity="0.4">
                <animate attributeName="cy"      values="0;-6;0" dur="1s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        )}

        {/* ── Sparkles (happy) ───────────────────────────────────── */}
        {happy && (
          <>
            <g transform="translate(40, 60)">
              <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill={fill}>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
              </path>
            </g>
            <g transform="translate(160, 50)">
              <path d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z" fill={fill}>
                <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="2.4s" repeatCount="indefinite" />
              </path>
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
