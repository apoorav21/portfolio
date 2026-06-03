'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import type { ChatMessage } from '@/app/api/chat/route'

const SUGGESTED_QUESTIONS = [
  "Are you open to work?",
  "What AI agents have you built?",
  "Tell me about your internship",
  "What's your tech stack?",
  "Tell me something about yourself beyond the resume",
]

interface Props {
  onClose: () => void
  onThinking: (v: boolean) => void
}

export default function ChatWindow({ onClose, onThinking }: Props) {
  // Stable session ID per browser tab — persisted in sessionStorage
  const sessionId = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const key = 'echo_session_id'
    const existing = sessionStorage.getItem(key)
    if (existing) return existing
    const id = crypto.randomUUID()
    sessionStorage.setItem(key, id)
    return id
  }, [])

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hey 👋 I'm Apoorav — well, an AI version of me. Ask me anything: my projects, my stack, what I'm looking for, or just who I am as a person.",
    },
  ])
  const [input, setInput]         = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return
    const userMsg: ChatMessage = { role: 'user', content: content.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    onThinking(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, sessionId }),
      })
      const data = await res.json()
      const reply = data.message || data.error || "Sorry, couldn't connect. Email apooravrao@gmail.com!"
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Something went wrong. Reach Apoorav at apooravrao@gmail.com 📧" },
      ])
    } finally {
      setIsLoading(false)
      onThinking(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      style={{ width: 340 }}
    >
      <div
        style={{
          background: 'var(--bg-2)',
          border: '2px solid var(--text)',
          borderRadius: 16,
          boxShadow: '5px 5px 0px var(--text)',
          display: 'flex',
          flexDirection: 'column',
          height: 480,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--bg-3)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#fff',
              fontFamily: 'var(--font-mono)',
              flexShrink: 0,
            }}>
              A
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--text)', fontWeight: 500 }}>
                Apoorav — AI version
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-mute)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#5cb85c' }} />
                {isLoading ? 'Thinking...' : 'Online'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-mute)', padding: 5, borderRadius: 6, lineHeight: 0, transition: 'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-mute)')}
          >
            <X size={15} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}
            >
              <div style={{
                padding: '10px 13px',
                borderRadius: 12,
                fontSize: 14,
                lineHeight: 1.5,
                ...(msg.role === 'user' ? {
                  background: 'var(--accent)',
                  color: '#fff',
                  borderBottomRightRadius: 3,
                  fontWeight: 500,
                } : {
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderBottomLeftRadius: 3,
                  color: 'var(--text)',
                }),
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ alignSelf: 'flex-start' }}
              >
                <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12, borderBottomLeftRadius: 3, padding: '12px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length === 1 && (
          <div style={{ padding: '6px 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, borderTop: '1px dashed var(--line)' }}>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: 'var(--text-dim)',
                  padding: '5px 9px',
                  borderRadius: 999,
                  cursor: 'pointer',
                  transition: 'all 0.12s',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)'
                  e.currentTarget.style.color = 'var(--text-dim)'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
            style={{ display: 'flex', gap: 8 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                color: 'var(--text)',
                padding: '9px 12px',
                borderRadius: 8,
                fontFamily: 'var(--font-body)',
                fontSize: 13.5,
                outline: 'none',
                opacity: isLoading ? 0.5 : 1,
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e)  => (e.target.style.borderColor = 'var(--line)')}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '9px 14px',
                borderRadius: 8,
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                opacity: input.trim() && !isLoading ? 1 : 0.45,
                transition: 'transform 0.1s',
                lineHeight: 0,
              }}
              onMouseEnter={(e) => { if (!isLoading && input.trim()) e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none' }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
