'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const testCases = [
  { method: 'GET',    path: '/users/123',  status: 200, pass: true },
  { method: 'POST',   path: '/auth/login', status: 201, pass: true },
  { method: 'GET',    path: '/users/-1',   status: 404, pass: true },
  { method: 'DELETE', path: '/admin',      status: 403, pass: true },
  { method: 'POST',   path: '/users',      status: 422, pass: true },
]

// Warm-dark terminal palette
const methodColor: Record<string, string> = {
  GET:    '#7A9F6A', // muted sage
  POST:   '#C8872A', // warm amber
  DELETE: '#BE5C33', // terracotta
  PUT:    '#C8A04A',
  PATCH:  '#9E7850',
}

export default function APITestingAnimation({ isVisible }: { isVisible: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [progress, setProgress]         = useState(0)

  useEffect(() => {
    if (!isVisible) { setVisibleCount(0); setProgress(0); return }
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleCount(i)
      setProgress(Math.round((i / testCases.length) * 100))
      if (i >= testCases.length) clearInterval(timer)
    }, 500)
    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <div
      className="w-full h-full flex flex-col justify-center p-4 overflow-hidden"
      style={{ background: '#2A1810', fontFamily: 'var(--font-mono)' }}
    >
      {/* Terminal chrome dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#BE5C33', opacity: 0.7 }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#C8872A', opacity: 0.7 }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#7A9F6A', opacity: 0.7 }} />
        <span style={{ marginLeft: 8, fontSize: 9.5, color: 'rgba(232,216,200,0.4)', letterSpacing: '0.06em' }}>
          api-agent — running tests
        </span>
      </div>

      {/* Prompt line */}
      <motion.div
        style={{ fontSize: 11, color: 'rgba(232,216,200,0.55)', marginBottom: 8 }}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span style={{ color: '#BE5C33' }}>$</span>{' '}
        test-agent parse openapi.yaml
        <motion.span
          style={{ color: '#BE5C33' }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: 3, duration: 0.5 }}
        >_</motion.span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        style={{ marginBottom: 12 }}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'rgba(232,216,200,0.4)', marginBottom: 4 }}>
          <span>Generating &amp; running tests</span>
          <span style={{ color: '#BE5C33' }}>{progress}%</span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #BE5C33, #C8872A)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Test results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <AnimatePresence>
          {testCases.slice(0, visibleCount).map((tc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22 }}
              style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10 }}
            >
              <span style={{ color: '#7A9F6A', fontWeight: 700 }}>✓</span>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: 3,
                color: methodColor[tc.method],
                background: `${methodColor[tc.method]}25`,
                letterSpacing: '0.04em',
              }}>
                {tc.method}
              </span>
              <span style={{ color: 'rgba(232,216,200,0.65)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {tc.path}
              </span>
              <span style={{ color: 'rgba(232,216,200,0.3)', fontSize: 9 }}>{tc.status}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Final summary */}
      {visibleCount >= testCases.length && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.08)', color: '#7A9F6A', fontSize: 9.5 }}
        >
          ✓ {testCases.length}/{testCases.length} tests passed · 0 failures
        </motion.div>
      )}
    </div>
  )
}
