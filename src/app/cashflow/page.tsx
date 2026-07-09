'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Design tokens ─────────────────────────────────────────────────────────── */
const BG      = '#e4dccf'   // app's warm parchment
const CARD    = '#fff'
const FG      = '#2A2420'
const DIM     = '#6b5f55'
const MUTE    = '#a89f93'
const ACCENT  = '#F2784B'   // app's orange
const RED     = '#E5544B'   // borrowed
const GREEN   = '#2A9D8F'   // lent
const AMBER   = '#E9A23B'   // asset

/* ── Keyframes injected once ───────────────────────────────────────────────── */
const CSS = `
@keyframes cf-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes cf-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
@keyframes cf-bar     { 0%,100%{height:8px}  50%{height:28px} }
@keyframes cf-bar2    { 0%,100%{height:18px} 50%{height:36px} }
@keyframes cf-bar3    { 0%,100%{height:12px} 50%{height:24px} }
@keyframes cf-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes cf-ring    { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.4);opacity:0} }
@keyframes cf-stream  { 0%{opacity:0;transform:translateX(-6px)} 100%{opacity:1;transform:translateX(0)} }
`

/* ── Section: Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ background: BG, padding: '80px 0 60px', borderBottom: `1px solid rgba(0,0,0,0.07)` }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px' }}>
        {/* Eyebrow */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, marginBottom: 20 }}>
          Case study · Voice-AI · Android app
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2.8rem,7vw,5.5rem)', lineHeight: 0.96, letterSpacing: '-0.02em', color: FG, margin: '0 0 24px' }}>
          Cashflow
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.65, color: DIM, maxWidth: '52ch', margin: '0 0 36px' }}>
          Speak a transaction in Hindi or English — Amazon Transcribe streams your words live,
          Claude on Bedrock parses them into a structured draft, and you confirm before anything saves.
        </p>

        {/* Stat row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
          {[
            { v: 'Voice-first', l: 'entry method' },
            { v: 'Claude 4.5', l: 'AI parser (Bedrock)' },
            { v: 'AWS stack',   l: 'CloudFormation + DynamoDB' },
            { v: 'Hindi + EN',  l: 'Munshi assistant' },
          ].map(s => (
            <div key={s.v}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: ACCENT, fontWeight: 400 }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: MUTE, letterSpacing: '0.05em' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://github.com/apoorav21/cash-tracking-app" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13, padding: '11px 22px', background: FG, color: '#fff', borderRadius: 10, textDecoration: 'none', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 8, border: `2px solid ${FG}`, boxShadow: `3px 3px 0 ${ACCENT}` }}>
            View on GitHub ↗
          </a>
          <Link href="/#projects"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13, padding: '11px 22px', background: 'transparent', color: DIM, borderRadius: 10, textDecoration: 'none', letterSpacing: '0.04em', border: `1px solid rgba(0,0,0,0.15)` }}>
            ← Back to projects
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Section: Voice flow animation ────────────────────────────────────────── */
function VoiceFlow() {
  const [step, setStep] = useState(0)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [draft, setDraft] = useState<Record<string,string> | null>(null)

  const FULL = 'Took 3 lakh from Ravi at 15% for 6 months in cash'
  const PARSED = { kind: 'borrowed', party: 'Ravi', amount: '₹3,00,000', rate: '15% / mo', term: '6 months', method: 'Cash' }

  useEffect(() => {
    if (!listening) return
    setTranscript('')
    setDraft(null)
    let i = 0
    const interval = setInterval(() => {
      i++
      setTranscript(FULL.slice(0, i * 3))
      if (i * 3 >= FULL.length) {
        clearInterval(interval)
        setTimeout(() => { setStep(2); setListening(false) }, 400)
        setTimeout(() => { setDraft(PARSED) }, 900)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [listening])

  function start() {
    setStep(1)
    setListening(true)
  }

  function reset() {
    setStep(0); setListening(false); setTranscript(''); setDraft(null)
  }

  return (
    <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px' }}>
        <SectionHead n="01" title="How it works" sub="Voice → AI → confirm" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🎙️', title: 'Speak', desc: 'Tap + and speak naturally in Hindi or English. Amazon Transcribe streams words back in real time.', color: ACCENT },
            { icon: '🤖', title: 'AI parses', desc: 'Claude on AWS Bedrock reads the transcript and streams back structured JSON — party, amount, rate, term.', color: '#8b5cf6' },
            { icon: '✅', title: 'You confirm', desc: 'Review the editable draft, tweak anything, then save. Nothing writes to DynamoDB without your tap.', color: GREEN },
          ].map((c, i) => (
            <div key={i} style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 22px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text)', marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{c.desc}</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: c.color, opacity: 0.6 }} />
            </div>
          ))}
        </div>

        {/* Interactive demo */}
        <div style={{ background: BG, borderRadius: 20, padding: '36px 32px', border: `1px solid rgba(0,0,0,0.08)`, boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTE, marginBottom: 20 }}>
            Interactive demo — try it
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, minHeight: 260 }}>

            {/* Step 0: idle */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, animation: 'cf-fadeUp 0.4s ease' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: DIM, textAlign: 'center', maxWidth: '38ch' }}>
                  Tap the mic button below, just like in the real app, and watch the AI parse your spoken transaction.
                </p>
                <button onClick={start} style={{ width: 72, height: 72, borderRadius: '50%', background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: `0 4px 20px ${ACCENT}55`, transition: 'transform 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                  🎙️
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: MUTE }}>Tap to speak</span>
              </div>
            )}

            {/* Step 1: listening */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', animation: 'cf-fadeUp 0.3s ease' }}>
                <div style={{ position: 'relative', width: 72, height: 72 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: ACCENT, opacity: 0.25, animation: 'cf-ring 1.4s ease-out infinite' }} />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: ACCENT, opacity: 0.15, animation: 'cf-ring 1.4s ease-out 0.5s infinite' }} />
                  <div style={{ position: 'relative', width: 72, height: 72, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🎙️</div>
                </div>
                {/* Waveform bars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 40 }}>
                  {[0,1,2,3,4,5,6].map(i => (
                    <div key={i} style={{ width: 4, background: ACCENT, borderRadius: 2, animation: `${['cf-bar','cf-bar2','cf-bar3','cf-bar2','cf-bar','cf-bar3','cf-bar2'][i]} ${0.6 + i*0.07}s ease-in-out infinite`, animationDelay: `${i*0.08}s` }} />
                  ))}
                </div>
                {/* Live transcript */}
                <div style={{ background: CARD, borderRadius: 12, padding: '14px 18px', width: '100%', maxWidth: 440, minHeight: 52, fontFamily: 'var(--font-body)', fontSize: 15, color: FG, lineHeight: 1.5, border: `1px solid rgba(0,0,0,0.08)` }}>
                  {transcript || <span style={{ color: MUTE }}>Listening…</span>}
                  {transcript && <span style={{ display: 'inline-block', width: 2, height: 16, background: ACCENT, marginLeft: 2, animation: 'cf-pulse 0.8s infinite' }} />}
                </div>
              </div>
            )}

            {/* Step 2: draft */}
            {step === 2 && (
              <div style={{ width: '100%', maxWidth: 480, animation: 'cf-fadeUp 0.4s ease' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: ACCENT, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: ACCENT, animation: 'cf-pulse 1.2s infinite' }} />
                  AI draft — review & confirm
                </div>
                <div style={{ background: CARD, borderRadius: 14, border: `1px solid rgba(0,0,0,0.1)`, overflow: 'hidden' }}>
                  {/* Kind selector */}
                  <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid rgba(0,0,0,0.07)` }}>
                    {['Borrowed', 'Lent', 'Asset'].map((k, i) => (
                      <div key={k} style={{ flex: 1, padding: '12px 0', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, background: i === 0 ? RED : 'transparent', color: i === 0 ? '#fff' : MUTE, cursor: 'pointer', borderRight: i < 2 ? `1px solid rgba(0,0,0,0.07)` : 'none' }}>
                        {k}
                      </div>
                    ))}
                  </div>
                  {/* Fields */}
                  {draft && Object.entries(draft).filter(([k]) => k !== 'kind').map(([k, v], i) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: i < Object.keys(draft).length - 2 ? `1px solid rgba(0,0,0,0.05)` : 'none', animation: `cf-stream 0.3s ease ${i * 0.07}s both` }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: MUTE, letterSpacing: '0.04em', textTransform: 'capitalize' }}>{k}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: FG, fontWeight: 600 }}>{String(v)}</span>
                    </div>
                  ))}
                  {/* Confirm button */}
                  <div style={{ padding: '14px 18px' }}>
                    <button onClick={reset} style={{ width: '100%', padding: '13px 0', background: GREEN, color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                      Confirm &amp; save ✓
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section: Features ─────────────────────────────────────────────────────── */
function Features() {
  const [active, setActive] = useState(0)

  const tabs = [
    {
      id: 'munshi',
      label: '₹ Munshi',
      icon: '🤖',
      color: '#8b5cf6',
      title: 'Munshi — your bilingual accountant',
      desc: 'A Hindi/English AI assistant that knows every transaction you\'ve ever recorded. Ask it to compute interest, explain a repayment schedule, or record a new loan — it replies in the same language you wrote in.',
      details: [
        'Full transaction context sent with every message',
        'Computes interest in रुपया सैकड़ा (% per month) — the real Indian convention',
        'Shows math कलम-wise: each installment\'s principal vs. interest',
        'Proposes new entries you confirm before they save',
        'Remembers your conversation history (multi-session)',
        'Powered by Kimi (Moonshot AI) via streaming Lambda',
      ],
      preview: (
        <div style={{ background: '#1a1028', borderRadius: 14, padding: '18px 16px', fontFamily: 'monospace', fontSize: 13, color: '#c4b5fd' }}>
          <div style={{ color: '#a89f93', marginBottom: 8 }}>You</div>
          <div style={{ color: '#fff', marginBottom: 16 }}>Ravi ne 50,000 wapas kiye aaj — interest kitna banta hai?</div>
          <div style={{ color: '#a89f93', marginBottom: 8 }}>Munshi ₹</div>
          <div style={{ color: '#e9d5ff', lineHeight: 1.6 }}>
            Ravi ka original loan: ₹3,00,000 @ 15% per month<br/>
            5 mahine beet gaye → interest = ₹3L × 15% × 5<br/>
            = <span style={{ color: '#c4b5fd', fontWeight: 700 }}>₹2,25,000</span> total interest<br/><br/>
            Aaj ₹50,000 wapas → principal reduced ✓<br/>
            Naya outstanding: <span style={{ color: '#4ade80', fontWeight: 700 }}>₹2,50,000</span>
          </div>
        </div>
      ),
    },
    {
      id: 'interest',
      label: 'Interest math',
      icon: '📐',
      color: AMBER,
      title: 'Accurate Indian interest calculations',
      desc: 'Most finance apps use annual rates. Indian informal lending doesn\'t. Cashflow defaults to % per month (रुपया सैकड़ा), supports partial repayments that stop interest on the returned principal from day one.',
      details: [
        'Monthly or annual rate basis selectable per loan',
        'Simple or compound interest (मासिक चक्रवृद्धि)',
        'Day-count accurate: 30-day months, full day proration',
        'Partial repayment splits into principal + interest paid',
        'Balance recalculates from each repayment date forward',
        'Maturity date computed and interest stops accruing there',
      ],
      preview: (
        <div style={{ background: CARD, borderRadius: 14, padding: '20px 18px', border: `1px solid rgba(0,0,0,0.08)` }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: MUTE, marginBottom: 14 }}>INTEREST BREAKDOWN</div>
          {[
            { label: 'Principal',      v: '₹3,00,000', color: FG },
            { label: 'Rate',           v: '15% / month (सैकड़ा)', color: AMBER },
            { label: 'Term',           v: '6 months',  color: FG },
            { label: 'Interest (full)', v: '₹2,70,000', color: RED },
            { label: 'Total owed',     v: '₹5,70,000', color: RED, bold: true },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: MUTE }}>{r.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: r.color, fontWeight: r.bold ? 700 : 500 }}>{r.v}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'sync',
      label: 'Cloud + offline',
      icon: '☁️',
      color: '#3b82f6',
      title: 'Works everywhere — with or without internet',
      desc: 'All data lives in DynamoDB and syncs across devices. But if the cloud isn\'t reachable, the app falls back to on-device speech recognition, a local NL parser, and localStorage — zero data loss.',
      details: [
        'Primary: AWS HTTP API → Lambda → DynamoDB (ap-south-1)',
        'Cognito Identity Pool for scoped Transcribe credentials',
        'localStorage fallback — full CRUD when offline',
        'On-device NL parser handles Hindi/English without the cloud',
        'Sync on reconnect — no manual merge needed',
        'User-namespaced storage — multiple accounts on one device',
      ],
      preview: (
        <div style={{ background: 'var(--bg-2)', borderRadius: 14, padding: '20px 18px', border: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          {[
            { label: 'Cloud',      status: '✓ Online', color: GREEN },
            { label: 'DynamoDB',   status: '✓ Synced', color: GREEN },
            { label: 'Transcribe', status: '✓ Ready',  color: GREEN },
            { label: 'Bedrock',    status: '✓ Active', color: GREEN },
            { label: 'Offline',    status: 'Standby',  color: MUTE },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line-soft)' }}>
              <span style={{ color: 'var(--text-mute)' }}>{r.label}</span>
              <span style={{ color: r.color, fontWeight: 700 }}>{r.status}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const tab = tabs[active]

  return (
    <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px' }}>
        <SectionHead n="02" title="Features" sub="the details that matter" />

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
          {tabs.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '9px 18px', borderRadius: 999, border: `2px solid ${active === i ? t.color : 'var(--line)'}`, background: active === i ? t.color : 'transparent', color: active === i ? '#fff' : 'var(--text-mute)', cursor: 'pointer', fontWeight: active === i ? 700 : 400, transition: 'all 0.15s', letterSpacing: '0.04em' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, animation: 'cf-fadeUp 0.3s ease' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, color: 'var(--text)', margin: '0 0 12px' }}>{tab.title}</h3>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, margin: '0 0 24px' }}>{tab.desc}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tab.details.map((d, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  <span style={{ color: tab.color, flexShrink: 0, marginTop: 4, fontSize: 8 }}>▸</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {tab.preview}
          </div>
        </div>

        <style>{`@media(max-width:640px){.cf-feat-grid{grid-template-columns:1fr !important;}}`}</style>
      </div>
    </section>
  )
}

/* ── Section: Architecture ─────────────────────────────────────────────────── */
function Architecture() {
  const [hovered, setHovered] = useState<string | null>(null)

  const nodes = [
    { id: 'app',       label: 'Android App',      sub: 'Capacitor WebView',    color: ACCENT,    x: '10%',  y: '40%' },
    { id: 'transcribe',label: 'Amazon Transcribe', sub: 'streaming PCM16',      color: '#f59e0b', x: '38%',  y: '15%' },
    { id: 'lambda',    label: 'Lambda (parse)',    sub: 'Bedrock / Claude 4.5', color: '#8b5cf6', x: '65%',  y: '15%' },
    { id: 'api',       label: 'HTTP API',          sub: 'CRUD Gateway',         color: '#3b82f6', x: '38%',  y: '65%' },
    { id: 'dynamo',    label: 'DynamoDB',          sub: 'ap-south-1',           color: GREEN,     x: '65%',  y: '65%' },
    { id: 'cognito',   label: 'Cognito',           sub: 'guest scoped creds',   color: '#ec4899', x: '10%',  y: '80%' },
  ]

  const lines = [
    { from: 'app', to: 'transcribe', label: 'PCM16 / mic stream' },
    { from: 'transcribe', to: 'lambda', label: 'transcript text' },
    { from: 'lambda', to: 'app', label: 'streamed JSON draft', dashed: true },
    { from: 'app', to: 'api', label: 'confirm / list' },
    { from: 'api', to: 'dynamo', label: 'read / write' },
    { from: 'cognito', to: 'app', label: 'temp creds' },
  ]

  return (
    <section style={{ background: BG, padding: '80px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px' }}>
        <SectionHead n="03" title="Architecture" sub="how the AWS pieces connect" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 16 }}>
          {[
            { icon: '📱', title: 'Capacitor App', body: 'One web codebase (HTML/JS/React) compiled to a native Android APK. Same UI runs in browser for quick testing.' },
            { icon: '🎤', title: 'Amazon Transcribe', body: 'Direct device → Transcribe connection using Cognito guest credentials scoped only to transcribe:StartStreamTranscription*. Lowest possible latency.' },
            { icon: '⚡', title: 'Bedrock Lambda', body: 'Lambda Function URL (AuthType: NONE for now) calls Claude Sonnet 4.5 on Bedrock and streams the JSON response token-by-token back to the app.' },
            { icon: '🗄️', title: 'DynamoDB + HTTP API', body: 'Standard CRUD behind an HTTP API Gateway. Each user\'s rows are namespaced by user ID from Cognito. CloudFormation manages the whole stack.' },
            { icon: '💬', title: 'Munshi Lambda', body: 'Separate streaming Lambda calls Kimi (Moonshot AI) with the user\'s transaction history as context. Replies in Hindi or English, matching your input language.' },
            { icon: '📴', title: 'Offline fallback', body: 'If cloud isn\'t configured, the app uses browser Speech Recognition + a local regex/NLP parser + localStorage. Zero data loss without internet.' },
          ].map((c, i) => (
            <div key={i} style={{ background: CARD, borderRadius: 14, padding: '20px 18px', border: `1px solid rgba(0,0,0,0.07)` }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: FG, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: DIM, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        {/* ASCII flow */}
        <div style={{ marginTop: 40, background: '#1a1a1a', borderRadius: 14, padding: '28px 32px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#a3a3a3', lineHeight: 2, overflowX: 'auto' }}>
          <div style={{ color: '#737373', marginBottom: 4 }}>// request flow</div>
          <div><span style={{ color: ACCENT }}>Android (Capacitor)</span></div>
          <div style={{ paddingLeft: 16 }}>├── mic ──PCM16──▶ <span style={{ color: '#f59e0b' }}>Amazon Transcribe</span> <span style={{ color: '#737373' }}>(Cognito guest creds)</span></div>
          <div style={{ paddingLeft: 44 }}>└── transcript ──▶ <span style={{ color: '#8b5cf6' }}>Lambda Function URL</span> ──▶ <span style={{ color: '#c084fc' }}>Bedrock / Claude 4.5</span></div>
          <div style={{ paddingLeft: 72 }}>└── streamed JSON ──▶ editable preview in app</div>
          <div style={{ paddingLeft: 16 }}>└── confirm tap ──▶ <span style={{ color: '#3b82f6' }}>HTTP API</span> ──▶ <span style={{ color: GREEN }}>DynamoDB</span></div>
          <div style={{ marginTop: 12, color: '#737373' }}>// munshi flow</div>
          <div style={{ paddingLeft: 16 }}>chat message + all txns ──▶ <span style={{ color: '#ec4899' }}>Munshi Lambda</span> ──▶ <span style={{ color: '#c084fc' }}>Kimi AI</span> ──▶ streamed reply</div>
        </div>
      </div>
    </section>
  )
}

/* ── Section: Tech stack ───────────────────────────────────────────────────── */
function TechStack() {
  const cols = [
    { head: 'Frontend', items: ['HTML / React 18', 'Capacitor 6', 'Nunito (Google Fonts)', 'Canvas API animations'] },
    { head: 'AWS Services', items: ['Bedrock (Claude 4.5)', 'Amazon Transcribe', 'Lambda Function URLs', 'HTTP API Gateway', 'DynamoDB', 'Cognito Identity Pool', 'CloudFormation / SAM'] },
    { head: 'AI / LLM', items: ['Claude Sonnet 4.5 (parser)', 'Kimi / Moonshot AI (Munshi)', 'Streaming JSON responses', 'On-device NLP fallback'] },
    { head: 'Platform', items: ['Android-first (APK)', 'iOS (same codebase)', 'Web (localhost:3000)', 'Offline-first architecture'] },
  ]

  return (
    <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px' }}>
        <SectionHead n="04" title="Tech stack" sub="what's under the hood" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20 }}>
          {cols.map(col => (
            <div key={col.head}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14 }}>{col.head}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--text-dim)', alignItems: 'center' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section: Screenshots placeholder ─────────────────────────────────────── */
function Screenshots() {
  const slots = [
    { label: 'Home — people list', hint: 'Main screen with transaction cards' },
    { label: 'Voice recording',    hint: 'Mic button pulsing + live transcript' },
    { label: 'AI draft preview',   hint: 'Parsed form with all fields filled' },
    { label: 'Munshi chat',        hint: 'Hindi conversation with interest math' },
    { label: 'Person detail',      hint: 'Individual loan + repayment history' },
  ]

  return (
    <section style={{ background: BG, padding: '80px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px' }}>
        <SectionHead n="05" title="Screenshots" sub="real app, real UI" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 16 }}>
          {slots.map((s, i) => (
            <div key={i} style={{ background: CARD, borderRadius: 16, overflow: 'hidden', border: `1px solid rgba(0,0,0,0.08)`, aspectRatio: '9/19' }}>
              {/* Placeholder — will be replaced with real screenshots */}
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12, gap: 8, background: `linear-gradient(135deg, ${ACCENT}10, ${ACCENT}05)` }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACCENT + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {['🏠','🎙️','🤖','💬','👤'][i]}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: MUTE, textAlign: 'center', lineHeight: 1.4 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: MUTE + '99', textAlign: 'center', lineHeight: 1.4 }}>{s.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Shared: section heading ───────────────────────────────────────────────── */
function SectionHead({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 36, paddingBottom: 14, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: ACCENT, letterSpacing: '0.1em' }}>{n} ·</span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(22px,3vw,32px)', color: 'var(--text)', flex: 1 }}>{title}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-mute)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{sub}</span>
    </div>
  )
}

/* ── Nav ───────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(228,220,207,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/#projects" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: DIM, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.04em' }}>
        ← portfolio
      </Link>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: MUTE, letterSpacing: '0.08em' }}>
        Cashflow — case study
      </span>
      <a href="https://github.com/apoorav21/cash-tracking-app" target="_blank" rel="noopener noreferrer"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: ACCENT, textDecoration: 'none', letterSpacing: '0.04em' }}>
        GitHub ↗
      </a>
    </nav>
  )
}

/* ── Page root ─────────────────────────────────────────────────────────────── */
export default function CashflowPage() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: '100vh' }}>
        <Nav />
        <Hero />
        <VoiceFlow />
        <Features />
        <Architecture />
        <TechStack />
        <Screenshots />

        {/* Footer */}
        <div style={{ background: BG, borderTop: '1px solid rgba(0,0,0,0.07)', padding: '32px 28px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: MUTE }}>
            Built by <a href="/" style={{ color: ACCENT, textDecoration: 'none' }}>Apoorav Rao</a> · <a href="https://github.com/apoorav21/cash-tracking-app" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: 'none' }}>github.com/apoorav21/cash-tracking-app</a>
          </div>
        </div>
      </div>
    </>
  )
}
