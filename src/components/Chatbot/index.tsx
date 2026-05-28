'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import EchoAvatar, { type EchoMode } from './EchoAvatar'
import ChatWindow from './ChatWindow'

export default function Chatbot() {
  const [isOpen, setIsOpen]                   = useState(false)
  const [echoMode, setEchoMode]               = useState<EchoMode>('idle')
  const [showBubble, setShowBubble]           = useState(false)
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const [introComplete, setIntroComplete]     = useState(false)

  const controls = useAnimationControls()

  /* ── Entrance ─────────────────────────────────────────────────────── */
  useEffect(() => {
    async function playEntrance() {
      controls.set({ y: 120, opacity: 0, scale: 0.4 })
      await new Promise<void>((r) => setTimeout(r, 1100))
      await controls.start({ y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 18, mass: 0.8 } })
      await controls.start({ y: [0, -14, 0, -7, 0], transition: { duration: 0.65, times: [0, 0.3, 0.55, 0.75, 1], ease: 'easeOut' } })
      await controls.start({ scale: [1, 1.1, 1], transition: { duration: 0.3, ease: 'easeInOut' } })
      setIntroComplete(true)
    }
    playEntrance()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── Listen for openEcho events from Hero CTA ────────────────────── */
  useEffect(() => {
    function onOpenEcho() { if (!isOpen) handleOpen() }
    window.addEventListener('openEcho', onOpenEcho)
    return () => window.removeEventListener('openEcho', onOpenEcho)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  /* ── Speech bubble ────────────────────────────────────────────────── */
  useEffect(() => {
    if (!introComplete || bubbleDismissed || isOpen) return
    const show = setTimeout(() => setShowBubble(true), 600)
    const hide = setTimeout(() => setShowBubble(false), 7000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [introComplete, bubbleDismissed, isOpen])

  function handleOpen() {
    setIsOpen(true)
    setShowBubble(false)
    setBubbleDismissed(true)
    setEchoMode('wave')
    setTimeout(() => setEchoMode('idle'), 1800)
  }

  function handleThinking(v: boolean) {
    if (v) {
      setEchoMode('think')
    } else {
      setEchoMode('happy')
      setTimeout(() => setEchoMode('idle'), 3000)
    }
  }

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            onClose={() => setIsOpen(false)}
            onThinking={handleThinking}
          />
        )}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            onClick={handleOpen}
            style={{
              position: 'relative',
              background: 'var(--bg-2)',
              border: '2px solid var(--text)',
              borderRadius: 14,
              borderBottomRightRadius: 3,
              padding: '10px 14px',
              boxShadow: '4px 4px 0 var(--text)',
              maxWidth: 220,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text)', lineHeight: 1.45, margin: 0 }}>
              👋 I&apos;m <b>Echo</b> — Apoorav&apos;s AI. Ask me about his projects, skills, or if he&apos;s hiring!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Echo button */}
      <div style={{ position: 'relative' }}>
        {/* Notification dot */}
        <AnimatePresence>
          {!isOpen && !bubbleDismissed && introComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: 'absolute', top: -2, right: -2,
                width: 13, height: 13, borderRadius: '50%',
                background: 'var(--accent)',
                border: '2px solid var(--bg)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <motion.div
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent)' }}
                animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
          aria-label={isOpen ? 'Close chat' : "Chat with Echo — Apoorav's AI"}
        >
          <EchoAvatar mode={echoMode} size={68} color="var(--accent)" />
        </button>
      </div>

      {/* Label */}
      <AnimatePresence>
        {introComplete && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-mute)',
              textAlign: 'center',
              marginTop: -6,
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '0.06em',
            }}
          >
            ask echo
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
