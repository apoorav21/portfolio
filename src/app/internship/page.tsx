'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Design tokens ──────────────────────────────────────── */
const c = {
  bg:         '#f4eee3',
  bg2:        '#fcf9f3',
  bg3:        '#efe7d9',
  bg4:        '#e7ddcc',
  line:       'rgba(58,44,30,0.14)',
  line2:      'rgba(58,44,30,0.07)',
  fg:         '#2a2520',
  dim:        '#6c6356',
  mute:       '#9c9183',
  accent:     '#c25f37',
  accentDeep: '#a44a26',
  accentSoft: 'rgba(194,95,55,0.10)',
  accentLine: 'rgba(194,95,55,0.30)',
  sevHigh:    '#bd3a2c',
  sevMed:     '#c9982f',
  sevLow:     '#3f8a80',
}

const TYPE: Record<string, { label: string; color: string }> = {
  product:  { label: 'Product',  color: '#c25f37' },
  usage:    { label: 'Usage',    color: '#3f8a80' },
  tech:     { label: 'Tech',     color: '#c9982f' },
  shipping: { label: 'Shipping', color: '#9a6a8e' },
  billing:  { label: 'Billing',  color: '#9c9183' },
}
const ORDER = ['product', 'usage', 'tech', 'shipping', 'billing']
const SEV: Record<string, { label: string; color: string }> = {
  high: { label: 'High',   color: '#bd3a2c' },
  med:  { label: 'Medium', color: '#c9982f' },
  low:  { label: 'Low',    color: '#3f8a80' },
}

interface Question { q: string; type: string; n: number }
interface Pain     { t: string; f: string;   sev: string }
interface Product  {
  name: string; total: number
  mix: Record<string, number>
  questions: Question[]
  pain: Pain[]
}

const DATA: Product[] = [
  {
    name: 'Custom Covers', total: 142800,
    mix: { product: 31, usage: 38, tech: 11, shipping: 14, billing: 6 },
    questions: [
      { q: 'How do I measure my furniture for an exact fit?',      type: 'usage',    n: 21400 },
      { q: 'Will this cover hold up in winter and heavy rain?',    type: 'product',  n: 17800 },
      { q: "What's the difference between the fabric weights?",    type: 'product',  n: 13200 },
      { q: 'My cover arrived without the tie-down straps.',        type: 'tech',     n: 9600  },
      { q: 'Can I reorder the same custom size as last time?',     type: 'usage',    n: 8100  },
    ],
    pain: [
      { t: 'Sizing & measurement confusion drives pre-sale questions', f: '34% of pre-sale contacts', sev: 'high' },
      { t: 'Tie-down hardware reported missing on arrival',            f: 'recurring fulfilment gap', sev: 'med'  },
      { t: 'Weather-durability expectations unclear at checkout',      f: 'product-page signal',      sev: 'med'  },
    ],
  },
  {
    name: 'Banners', total: 108600,
    mix: { product: 33, usage: 18, tech: 27, shipping: 16, billing: 6 },
    questions: [
      { q: 'What file format and resolution should I upload?',     type: 'tech',     n: 16900 },
      { q: 'Can I get grommets on all four sides?',               type: 'product',  n: 12400 },
      { q: 'Will the printed colors match my design?',            type: 'product',  n: 11100 },
      { q: 'How do I mount this banner outdoors?',                type: 'usage',    n: 8700  },
      { q: "Where's my order — it's past the delivery date?",     type: 'shipping', n: 7300  },
    ],
    pain: [
      { t: 'Artwork upload specs unclear → repeated re-uploads',  f: 'top tech driver',    sev: 'high' },
      { t: 'Color-match expectations vs. print reality',          f: 'design-team flag',   sev: 'med'  },
      { t: 'Outdoor mounting questions arrive post-delivery',     f: 'support follow-ups', sev: 'low'  },
    ],
  },
  {
    name: 'Business Signs', total: 86400,
    mix: { product: 36, usage: 24, tech: 19, shipping: 13, billing: 8 },
    questions: [
      { q: 'Which material lasts longest outdoors?',              type: 'product',  n: 12800 },
      { q: 'How do I install this without a professional?',       type: 'usage',    n: 10200 },
      { q: 'Can you match my exact brand color (Pantone)?',       type: 'product',  n: 8900  },
      { q: 'My proof approval is stuck — can someone help?',      type: 'tech',     n: 6400  },
      { q: 'Is this sign ADA compliant?',                         type: 'product',  n: 4900  },
    ],
    pain: [
      { t: 'DIY install instructions fall short',        f: 'drives usage queries', sev: 'high' },
      { t: 'Pantone / brand-color matching requests',    f: 'pre-sale friction',    sev: 'med'  },
      { t: 'Proofing workflow delays frustrate buyers',  f: 'flagged to tech',      sev: 'med'  },
    ],
  },
  {
    name: 'Decals & Stickers', total: 71200,
    mix: { product: 30, usage: 41, tech: 10, shipping: 13, billing: 6 },
    questions: [
      { q: 'How do I apply these without bubbles?',               type: 'usage',    n: 13100 },
      { q: 'Are they removable, or will they damage paint?',      type: 'product',  n: 9800  },
      { q: 'Can I get a custom die-cut shape?',                   type: 'product',  n: 7600  },
      { q: 'Is the vinyl waterproof for outdoor use?',            type: 'product',  n: 6200  },
      { q: 'I received the wrong quantity.',                      type: 'shipping', n: 4100  },
    ],
    pain: [
      { t: 'Application technique confusion (bubbles, alignment)', f: '41% are usage queries', sev: 'high' },
      { t: 'Removability & adhesive concerns',                    f: 'pre-sale hesitation',   sev: 'med'  },
      { t: 'Quantity / packaging mismatches',                     f: 'fulfilment signal',     sev: 'low'  },
    ],
  },
  {
    name: 'Trade Show Displays', total: 51900,
    mix: { product: 28, usage: 30, tech: 12, shipping: 24, billing: 6 },
    questions: [
      { q: 'How long is setup, and is it tool-free?',             type: 'usage',    n: 8200 },
      { q: 'What are the assembled dimensions?',                  type: 'product',  n: 6900 },
      { q: 'Can you rush this for an event next week?',           type: 'shipping', n: 6100 },
      { q: 'Replacement parts for a damaged frame?',              type: 'tech',     n: 3800 },
      { q: 'Does it include a carry case?',                       type: 'product',  n: 3100 },
    ],
    pain: [
      { t: 'Event-deadline & rush-shipping anxiety',  f: '24% shipping queries', sev: 'high' },
      { t: 'Assembly complexity for first-timers',    f: 'usage driver',         sev: 'med'  },
      { t: 'Replacement-part availability',           f: 'post-sale support',    sev: 'med'  },
    ],
  },
  {
    name: 'Neon Signs', total: 39300,
    mix: { product: 29, usage: 17, tech: 38, shipping: 10, billing: 6 },
    questions: [
      { q: 'Is this real neon or LED?',                           type: 'product',  n: 7100 },
      { q: "What's the power draw and how do I wire it?",         type: 'tech',     n: 6200 },
      { q: 'Can I dim it or switch colors?',                      type: 'usage',    n: 4400 },
      { q: "Will it run on my country's voltage?",                type: 'tech',     n: 3600 },
      { q: "A section flickers / won't light up.",                type: 'tech',     n: 2900 },
    ],
    pain: [
      { t: 'Electrical, wiring & voltage confusion',        f: '38% are tech queries', sev: 'high' },
      { t: '"Real neon" vs. LED expectation gap',           f: 'pre-sale signal',      sev: 'med'  },
      { t: 'Flicker / dead-segment defect reports',         f: 'quality flag',         sev: 'med'  },
    ],
  },
]

/* ── Helpers ─────────────────────────────────────────────── */
function fmt(n: number) { return n.toLocaleString('en-US') }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--i-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: c.accent, marginBottom: 24 }}>
      <span style={{ width: 8, height: 8, background: c.accent, borderRadius: 2, flexShrink: 0 }} />
      {children}
    </div>
  )
}

function Wrap({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 36px', ...style }}>
      {children}
    </div>
  )
}

/* ── Dashboard component ─────────────────────────────────── */
function Dashboard() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const [autoPlayed, setAutoPlayed] = useState(false)
  const [userTookOver, setUserTookOver] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([])
  const activeRef  = useRef(0)
  const maxTotal = Math.max(...DATA.map(d => d.total))

  function switchTo(i: number) {
    if (i === activeRef.current) return
    setFading(true)
    setTimeout(() => {
      setActive(i)
      activeRef.current = i
      setFading(false)
    }, 180)
  }

  function select(i: number) {
    // Clear any pending auto-cycle timers and hand control to user
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setUserTookOver(true)
    switchTo(i)
  }

  // Auto-cycle on scroll into view — runs once, steps through 3 products then stops
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoPlayed) {
          setAutoPlayed(true)
          const delays = [1400, 2800, 4200]  // t=1.4s, 2.8s, 4.2s after visible
          const targets = [1, 2, 3]           // cycle to products 1, 2, 3 then stop
          targets.forEach((target, idx) => {
            const t = setTimeout(() => {
              setUserTookOver(prev => {
                if (!prev) switchTo(target)
                return prev
              })
            }, delays[idx])
            timersRef.current.push(t)
          })
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(section)
    return () => {
      observer.disconnect()
      timersRef.current.forEach(clearTimeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayed])

  const d = DATA[active]

  // Donut gradient
  const stops: string[] = []
  let acc = 0
  ORDER.forEach(k => {
    const v = d.mix[k] || 0
    stops.push(`${TYPE[k].color} ${acc}% ${acc + v}%`)
    acc += v
  })
  const donutGrad = `conic-gradient(${stops.join(', ')})`

  const topKey = [...ORDER].sort((a, b) => (d.mix[b] || 0) - (d.mix[a] || 0))[0]
  const maxQ = Math.max(...d.questions.map(q => q.n))

  return (
    <div ref={sectionRef} style={{ background: c.bg3, padding: '64px 0' }}>
      <Wrap>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Eyebrow>The Final Product</Eyebrow>
            <h3 style={{ fontFamily: 'var(--i-display)', fontWeight: 600, fontSize: 'clamp(22px,3vw,36px)', color: c.fg, letterSpacing: '-0.01em', margin: 0 }}>
              What customers actually struggle with — at a glance.
            </h3>
          </div>
          <div className={(!autoPlayed || !userTookOver) ? 'dash-hint' : ''} style={{ fontFamily: 'var(--i-mono)', fontSize: 12, color: c.accent, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', background: c.accentSoft, border: `1px solid ${c.accentLine}`, borderRadius: 999, padding: '8px 16px', letterSpacing: '0.02em', flexShrink: 0, transition: 'opacity 0.4s' }}>
            {userTookOver
              ? <><span>✦</span> Interactive · you&apos;re in control</>
              : <><span>▾</span> {autoPlayed ? 'Auto-playing…' : 'Interactive · click any product line'}</>
            }
          </div>
        </div>

        {/* Dashboard card */}
        <div style={{ background: c.bg2, border: `1px solid ${c.line}`, borderRadius: 20, boxShadow: '0 8px 32px rgba(74,52,28,0.12), 0 1px 4px rgba(74,52,28,0.06)', overflow: 'hidden' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: `1px solid ${c.line}`, background: c.bg3, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(150deg,${c.accent},${c.accentDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--i-display)', fontWeight: 700, color: '#fff', fontSize: 18 }}>S</div>
              <div>
                <div style={{ fontFamily: 'var(--i-display)', fontWeight: 600, fontSize: 20, color: c.fg }}>CX Signal</div>
                <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, color: c.mute, letterSpacing: '0.04em' }}>Support Ticket Intelligence</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--i-mono)', fontSize: 12, color: c.dim }}>
                <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: c.accent, display: 'inline-block', flexShrink: 0 }} />
                LIVE · auto-refresh 30 min
              </div>
              <div style={{ fontFamily: 'var(--i-mono)', fontSize: 13, color: c.dim }}>
                <b style={{ color: c.fg, fontWeight: 600 }}>500,247</b> tickets classified
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="dash-body">
            {/* Left: product list */}
            <div style={{ padding: '24px 20px', borderRight: `1px solid ${c.line}`, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.mute, marginBottom: 16 }}>Product Line</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {DATA.map((row, i) => (
                  <button
                    key={row.name}
                    onClick={() => select(i)}
                    style={{
                      textAlign: 'left', background: i === active ? c.accentSoft : 'transparent',
                      border: `1px solid ${i === active ? c.accentLine : 'transparent'}`,
                      borderRadius: 10, padding: '10px 12px', cursor: 'pointer',
                      transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 8,
                      color: c.fg, fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--i-body)', fontSize: 14, fontWeight: 500, color: i === active ? c.accent : c.fg, flex: 1 }}>{row.name}</span>
                      <span style={{ fontFamily: 'var(--i-mono)', fontSize: 11, color: c.mute, whiteSpace: 'nowrap' }}>{fmt(row.total)}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: c.bg4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 2, background: i === active ? c.accent : c.mute, width: `${(row.total / maxTotal * 100).toFixed(1)}%`, transition: 'background 0.3s' }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: questions */}
            <div style={{ padding: '24px 24px', minWidth: 0, borderRight: `1px solid ${c.line}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontFamily: 'var(--i-display)', fontWeight: 600, fontSize: 22, color: c.fg, transition: 'opacity 0.2s', opacity: fading ? 0 : 1 }}>{d.name}</div>
                <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.mute }}>Most-asked questions</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, opacity: fading ? 0 : 1, transition: 'opacity 0.2s' }}>
                {d.questions.map((q, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '13px 0', borderBottom: `1px solid ${c.line2}` }}>
                    <span style={{ fontFamily: 'var(--i-mono)', fontSize: 13, color: c.mute, width: 24, flexShrink: 0, paddingTop: 2 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--i-body)', fontSize: 15, color: c.fg, lineHeight: 1.35 }}>{q.q}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--i-mono)', fontSize: 10, letterSpacing: '0.04em', textTransform: 'uppercase', color: c.dim, flexShrink: 0 }}>
                          <span style={{ width: 7, height: 7, borderRadius: 2, background: TYPE[q.type].color, flexShrink: 0 }} />
                          {TYPE[q.type].label}
                        </span>
                        <div style={{ flex: 1, height: 6, borderRadius: 3, background: c.bg4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 3, background: TYPE[q.type].color, width: `${(q.n / maxQ * 100).toFixed(0)}%`, transition: 'width 0.4s' }} />
                        </div>
                        <span style={{ fontFamily: 'var(--i-mono)', fontSize: 11, color: c.mute, width: 52, textAlign: 'right', flexShrink: 0 }}>{fmt(q.n)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: donut + pain */}
            <div style={{ padding: '24px 20px', minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.mute, marginBottom: 16 }}>Query Mix</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, opacity: fading ? 0 : 1, transition: 'opacity 0.2s' }}>
                {/* Donut */}
                <div style={{ width: 110, height: 110, borderRadius: '50%', background: donutGrad, flexShrink: 0, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', background: c.bg2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <b style={{ fontFamily: 'var(--i-display)', fontSize: 22, fontWeight: 600, color: c.fg, lineHeight: 1 }}>{d.mix[topKey] || 0}%</b>
                    <span style={{ fontFamily: 'var(--i-mono)', fontSize: 9, color: c.mute, letterSpacing: '0.06em', marginTop: 2 }}>top type</span>
                  </div>
                </div>
                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {ORDER.map(k => (
                    <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.dim }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: TYPE[k].color, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontFamily: 'var(--i-body)' }}>{TYPE[k].label}</span>
                      <span style={{ fontFamily: 'var(--i-mono)', fontSize: 12, color: c.fg }}>{d.mix[k] || 0}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.mute, marginBottom: 12, paddingTop: 16, borderTop: `1px solid ${c.line}` }}>Pain points surfaced</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: fading ? 0 : 1, transition: 'opacity 0.2s' }}>
                {d.pain.map((p, i) => (
                  <div key={i} style={{ background: c.bg3, border: `1px solid ${c.line}`, borderLeft: `3px solid ${SEV[p.sev].color}`, borderRadius: 8, padding: '11px 13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontFamily: 'var(--i-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, color: SEV[p.sev].color }}>{SEV[p.sev].label} impact</span>
                    </div>
                    <div style={{ fontFamily: 'var(--i-body)', fontSize: 13, color: c.fg, lineHeight: 1.4 }}>{p.t}</div>
                    <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, color: c.mute, marginTop: 4 }}>{p.f}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </div>
  )
}

/* ── Main page ───────────────────────────────────────────── */
export default function InternshipPage() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const h2Style: React.CSSProperties = {
    fontFamily: 'var(--i-display)', fontWeight: 600,
    fontSize: 'clamp(32px,5vw,60px)', lineHeight: 1.06,
    letterSpacing: '-0.02em', color: c.fg, margin: '0 0 32px',
  }
  const leadStyle: React.CSSProperties = {
    fontFamily: 'var(--i-body)', fontSize: 'clamp(16px,1.6vw,20px)',
    lineHeight: 1.65, color: c.dim, maxWidth: '52ch',
  }
  const bulletStyle: React.CSSProperties = {
    display: 'flex', gap: 16, alignItems: 'flex-start',
    fontFamily: 'var(--i-body)', fontSize: 16, color: c.dim, lineHeight: 1.55,
  }

  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        body{margin:0;background:${c.bg}}
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(194,95,55,0.4)}70%{box-shadow:0 0 0 10px rgba(194,95,55,0)}}
        @keyframes hint-glow{0%,100%{box-shadow:0 0 0 0 rgba(194,95,55,0)}50%{box-shadow:0 0 0 6px rgba(194,95,55,0.15)}}
        @keyframes fade-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        .live-dot{animation:pulse-dot 2s infinite}
        .dash-hint{animation:hint-glow 2.4s ease-in-out infinite}
        .hero-in{animation:fade-up 0.7s ease both}
        .hero-in-2{animation:fade-up 0.7s 0.15s ease both}
        .hero-in-3{animation:fade-up 0.7s 0.3s ease both}
        .hero-in-4{animation:fade-up 0.7s 0.45s ease both}
        .dash-body{display:grid;grid-template-columns:220px 1fr 280px}
        @media(max-width:900px){
          .dash-body{grid-template-columns:1fr!important;display:flex!important;flex-direction:column}
          .dash-body>div{border-right:none!important;border-bottom:1px solid ${c.line}}
          .dash-body>div:last-child{border-bottom:none}
        }
        @media(max-width:700px){
          .two-col{display:block!important}
          .two-col>*:first-child{margin-bottom:32px}
          .pipe-grid{grid-template-columns:1fr!important}
          .impact-grid{grid-template-columns:1fr 1fr!important}
          .stack-grid{grid-template-columns:1fr 1fr!important}
          .flow-grid{grid-template-columns:1fr!important}
          .flow-arrow{display:none!important}
        }
        @media(max-width:480px){
          .impact-grid{grid-template-columns:1fr!important}
          .teaser-row{gap:24px!important}
        }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, height: 56,
        background: scrolled ? c.bg3 : 'rgba(239,231,217,0.85)',
        borderBottom: `1px solid ${c.line}`,
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center',
        padding: '0 36px', transition: 'background 0.3s',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--i-mono)', fontSize: 12, color: c.dim, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.04em', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
          onMouseLeave={e => (e.currentTarget.style.color = c.dim)}
        >
          ← Back to portfolio
        </Link>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--i-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.mute }}>
          Internship Case Study
        </div>
        <a href="https://apoorav.online" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--i-mono)', fontSize: 12, color: c.dim, textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
          onMouseLeave={e => (e.currentTarget.style.color = c.dim)}
        >
          apoorav.online
        </a>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ background: `linear-gradient(160deg,${c.bg} 0%,${c.bg2} 100%)`, minHeight: '72vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 0 64px', overflow: 'hidden', position: 'relative' }}>
        {/* Decorative glow */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'rgba(194,95,55,0.12)', filter: 'blur(100px)', top: -200, right: -100, pointerEvents: 'none' }} />
        <Wrap>
          <div className="hero-in"><Eyebrow>Case Study · Customer Experience × AI</Eyebrow></div>
          <h1 className="hero-in-2" style={{ fontFamily: 'var(--i-display)', fontWeight: 700, fontSize: 'clamp(42px,7vw,88px)', lineHeight: 1.02, letterSpacing: '-0.02em', color: c.fg, margin: '0 0 28px', maxWidth: '14ch' }}>
            Teaching the business to{' '}
            <em style={{ fontStyle: 'italic', color: c.accent }}>hear</em>{' '}
            half a million customers.
          </h1>
          <p className="hero-in-3" style={{ ...leadStyle, marginBottom: 36, maxWidth: '58ch' }}>
            An LLM-powered pipeline that read, classified and audited every support ticket at Caterpillar Signs — then turned the noise into a live dashboard the whole company could act on.
          </p>
          <div className="hero-in-3" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--i-mono)', fontSize: 13, color: c.fg, marginBottom: 56, letterSpacing: '0.02em' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.accent, display: 'inline-block' }} />
            Apoorav Rao
            <span style={{ color: c.mute }}>/</span>
            Gen &amp; Agentic AI Intern
            <span style={{ color: c.mute }}>/</span>
            Jun 2025 – Mar 2026
          </div>

          {/* Teaser stats */}
          <div className="hero-in-4 teaser-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, paddingTop: 36, borderTop: `1px solid ${c.line}` }}>
            {[
              { num: '500K+', lbl: 'Tickets classified' },
              { num: '4×',    lbl: 'Faster auditing' },
              { num: '15%',   lbl: 'Fewer tickets / 6 mo' },
              { num: 'Live',  lbl: 'Still in production' },
            ].map(s => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: 'var(--i-display)', fontWeight: 700, fontSize: 'clamp(32px,4vw,52px)', color: c.accent, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</span>
                <span style={{ fontFamily: 'var(--i-mono)', fontSize: 11, color: c.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.lbl}</span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ── COMPANY ── */}
      <section style={{ padding: '96px 0', background: c.bg2 }}>
        <Wrap>
          <Eyebrow>The Company</Eyebrow>
          <h2 style={h2Style}>Caterpillar Signs,<br />part of Group Bayport.</h2>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
            <div>
              <p style={leadStyle}>A global, online-first custom-print manufacturer headquartered in Atlanta — customers design products online, and the company prints, fabricates and ships them worldwide. I worked from the Gurugram, India office.</p>
              <ul style={{ listStyle: 'none', margin: '32px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { b: 'Custom everything', t: '— signage, banners, covers for furniture & vehicles, décor, and trade-show displays.' },
                  { b: 'Six countries', t: 'across the US, UK and India, shipping via FedEx & UPS.' },
                ].map(b => (
                  <li key={b.b} style={bulletStyle}>
                    <span style={{ width: 9, height: 9, background: c.accent, borderRadius: 2, flexShrink: 0, marginTop: 7 }} />
                    <span><b style={{ color: c.fg, fontWeight: 600 }}>{b.b}</b> {b.t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Stat strip */}
              <div style={{ display: 'flex', border: `1px solid ${c.line}`, borderRadius: 16, overflow: 'hidden', background: c.bg2, boxShadow: '0 4px 20px rgba(74,52,28,0.08)' }}>
                {[{ n: '1,450+', l: 'Employees' }, { n: '6', l: 'Countries' }, { n: '3', l: 'Continents' }].map((s, i) => (
                  <div key={s.l} style={{ flex: 1, padding: '28px 24px', borderRight: i < 2 ? `1px solid ${c.line}` : 'none' }}>
                    <div style={{ fontFamily: 'var(--i-display)', fontWeight: 600, fontSize: 'clamp(32px,3vw,46px)', color: c.fg, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: 'var(--i-body)', fontSize: 14, color: c.dim, marginTop: 8 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {/* Brands */}
              <div style={{ background: c.bg3, border: `1px solid ${c.line}`, borderRadius: 16, padding: '24px 28px' }}>
                <div style={{ fontFamily: 'var(--i-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.accent, marginBottom: 16 }}>Family of Brands</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['BannerBuzz', 'Covers & All', 'Vivyx Printing', 'Circle One', 'Giant Media', 'Neon Earth'].map(b => (
                    <span key={b} style={{ fontFamily: 'var(--i-mono)', fontSize: 12, color: c.dim, background: c.bg4, border: `1px solid ${c.line}`, borderRadius: 999, padding: '6px 14px', letterSpacing: '0.02em' }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── MY ROLE ── */}
      <section style={{ padding: '96px 0', background: c.bg }}>
        <Wrap>
          <Eyebrow>My Role</Eyebrow>
          <h2 style={h2Style}>Embedded inside the customer,<br />not the codebase.</h2>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <p style={leadStyle}>I joined as a <strong style={{ color: c.fg }}>Gen &amp; Agentic AI Intern</strong> inside the Customer Experience team — not on the engineering floor. That meant I lived with the support and operations problems firsthand, long before I built anything to fix them.</p>
              {/* Timeline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 44, maxWidth: 420 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: c.accent, boxShadow: `0 0 0 5px ${c.accentSoft}` }} />
                  <div style={{ fontFamily: 'var(--i-mono)', fontSize: 14, color: c.fg }}>Jun 2025</div>
                  <div style={{ fontFamily: 'var(--i-body)', fontSize: 13, color: c.mute }}>Joined CX</div>
                </div>
                <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg,${c.accent},${c.accentLine})`, margin: '0 8px', position: 'relative', top: -22 }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: c.bg, border: `3px solid ${c.accent}` }} />
                  <div style={{ fontFamily: 'var(--i-mono)', fontSize: 14, color: c.fg }}>Mar 2026</div>
                  <div style={{ fontFamily: 'var(--i-body)', fontSize: 13, color: c.mute }}>10-month build</div>
                </div>
              </div>
            </div>
            <div style={{ background: `linear-gradient(155deg,${c.accentSoft},rgba(194,95,55,0.03))`, border: `1px solid ${c.accentLine}`, borderRadius: 20, padding: '40px 44px' }}>
              <p style={{ fontFamily: 'var(--i-display)', fontWeight: 500, fontSize: 'clamp(22px,2.5vw,34px)', lineHeight: 1.28, color: c.fg, letterSpacing: '-0.01em', margin: '0 0 24px' }}>
                "I got to <span style={{ color: c.accent }}>see the problem</span> before I was allowed to build the solution."
              </p>
              <p style={{ fontFamily: 'var(--i-body)', fontSize: 17, color: c.dim, lineHeight: 1.6, margin: 0 }}>
                Sitting in the customer-facing function meant every technical decision started from a real, observed pain — not a ticket spec handed down a chain.
              </p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={{ padding: '96px 0', background: c.bg2 }}>
        <Wrap>
          <Eyebrow>The Problem</Eyebrow>
          <h2 style={h2Style}>Auditing tickets by hand<br />couldn&apos;t keep up.</h2>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <p style={{ ...leadStyle, marginBottom: 32 }}>The CX team audited resolved tickets to find recurring pain points and feed fixes back to product, logistics and tech. But the entire audit was <strong style={{ color: c.fg }}>manual</strong> — and that capped how much the business could ever learn.</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  'A massive bottleneck against the company\'s real ticket volume.',
                  'Insights stayed buried in unstructured text nobody had time to read.',
                  'Recurring issues slipped through — fixed one ticket at a time, never at the root.',
                ].map(t => (
                  <li key={t} style={bulletStyle}>
                    <span style={{ width: 9, height: 9, background: c.sevHigh, borderRadius: 2, flexShrink: 0, marginTop: 7 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--i-display)', fontWeight: 700, fontSize: 'clamp(72px,12vw,148px)', lineHeight: 0.9, color: c.accent, letterSpacing: '-0.04em' }}>150<span style={{ fontSize: '0.55em', color: c.mute, verticalAlign: 'middle' }}>–</span>200</div>
              <p style={{ fontFamily: 'var(--i-body)', fontSize: 18, color: c.dim, lineHeight: 1.5, maxWidth: '32ch', marginTop: 20, margin: '20px 0 0' }}>tickets per day — the hard ceiling for a single analyst reading them by hand.</p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── WHAT I BUILT ── */}
      <section style={{ padding: '96px 0', background: c.bg }}>
        <Wrap>
          <Eyebrow>What I Built</Eyebrow>
          <h2 style={{ ...h2Style, fontSize: 'clamp(28px,4vw,48px)' }}>An end-to-end pipeline that audits<br />every ticket — automatically.</h2>
          <div className="pipe-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 8 }}>
            {[
              { n: '01', label: 'INGEST', name: 'Pull resolved tickets', desc: 'A batch job collects every newly-resolved ticket on a schedule — migrated live from Freshdesk to Salesforce mid-project when the company switched CRM.', tags: ['Salesforce API', 'Freshdesk API', 'every 30 min'], final: false },
              { n: '02', label: 'CLASSIFY', name: 'Read & understand', desc: 'Each ticket runs through GPT-4o with zero-shot classification — no training data. It categorises the issue and extracts the product, the exact question, and the resolution.', tags: ['GPT-4o', 'LangChain', 'zero-shot'], final: false },
              { n: '03', label: 'STRUCTURE', name: 'Model & store', desc: 'Outputs are transformed with dbt and loaded into a cloud database. Apache Airflow orchestrates the whole flow — retries, backfills and dependencies, hands-free.', tags: ['dbt', 'PostgreSQL', 'AWS RDS', 'Airflow'], final: false },
              { n: '04', label: 'SURFACE', name: 'A live dashboard', desc: 'Clean, classified data flows into a real-time dashboard the CX team can query themselves — turning a backlog of text into answers anyone can act on.', tags: ['Zoho Analytics', 'real-time'], final: true },
            ].map((step, i) => (
              <div key={step.n} style={{ position: 'relative', background: step.final ? `linear-gradient(155deg,${c.accentSoft},rgba(194,95,55,0.02))` : c.bg2, border: `1px solid ${step.final ? c.accentLine : c.line}`, borderRight: i < 3 ? 'none' : undefined, borderRadius: i === 0 ? '16px 0 0 16px' : i === 3 ? '0 16px 16px 0' : 0, padding: '36px 28px', display: 'flex', flexDirection: 'column' }}>
                {i < 3 && <div style={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 5, width: 32, height: 32, borderRadius: '50%', background: c.bg, border: `1px solid ${c.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.accent, fontSize: 14, fontWeight: 600 }}>→</div>}
                <div style={{ fontFamily: 'var(--i-mono)', fontSize: 12, color: c.accent, letterSpacing: '0.1em', marginBottom: 16 }}>{step.n} — {step.label}</div>
                <div style={{ fontFamily: 'var(--i-display)', fontWeight: 600, fontSize: 22, color: c.fg, lineHeight: 1.2, marginBottom: 14 }}>{step.name}</div>
                <div style={{ fontFamily: 'var(--i-body)', fontSize: 14, color: c.dim, lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{step.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {step.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--i-mono)', fontSize: 11, color: c.dim, background: c.bg4, border: `1px solid ${c.line}`, borderRadius: 6, padding: '4px 9px' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ── DASHBOARD (full-width) ── */}
      <Dashboard />

      {/* ── IMPACT ── */}
      <section style={{ padding: '96px 0', background: c.bg2 }}>
        <Wrap>
          <Eyebrow>The Impact</Eyebrow>
          <h2 style={h2Style}>What changed for the business.</h2>
          <div className="impact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { num: '500K+', desc: 'support tickets classified during the internship.', hero: true },
              { num: '1,200', desc: 'tickets processed per hour — versus 150–200 per day, by hand.', hero: false },
              { num: '4×',    desc: 'jump in auditing efficiency — a 400% improvement, running continuously.', hero: true },
              { num: '20%+', desc: 'more recurring issues surfaced that manual auditing had been missing.', hero: false },
              { num: '15%',  desc: 'drop in overall ticket volume over six months — problems fixed at the root.', hero: true },
              { num: 'In production', desc: 'the pipeline is still running and auditing tickets today.', hero: false },
            ].map(cell => (
              <div key={cell.num} style={{ background: cell.hero ? `linear-gradient(145deg,${c.accentSoft},rgba(194,95,55,0.02))` : c.bg2, border: `1px solid ${cell.hero ? c.accentLine : c.line}`, borderRadius: 18, padding: '36px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(74,52,28,0.07)', minHeight: 180 }}>
                <div style={{ fontFamily: 'var(--i-display)', fontWeight: 600, fontSize: 'clamp(40px,5vw,68px)', lineHeight: 0.95, letterSpacing: '-0.03em', color: cell.hero ? c.accent : c.fg }}>{cell.num}</div>
                <div style={{ fontFamily: 'var(--i-body)', fontSize: 16, color: c.dim, lineHeight: 1.5, marginTop: 16 }}>{cell.desc}</div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ── INSIGHT TO ACTION ── */}
      <section style={{ padding: '96px 0', background: c.bg }}>
        <Wrap>
          <Eyebrow>From Insight to Action</Eyebrow>
          <h2 style={{ ...h2Style, fontSize: 'clamp(28px,4vw,48px)' }}>A finding only counts<br />if someone acts on it.</h2>
          <p style={{ ...leadStyle, marginBottom: 48 }}>Half the job was translation — turning raw classified data into plain insights the tech, production, logistics and CX-leadership teams could actually implement. One real loop:</p>
          <div className="flow-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px 40px', alignItems: 'stretch' }}>
            {[
              { k: 'Signal', t: 'Classification shows customers repeatedly confused by one product\'s installation steps.', accent: false },
              { k: 'Flag',   t: 'I raise it to product & design with the exact questions and volumes attached.', accent: false },
              { k: 'Fix',    t: 'Clearer instructions and product-page guidance ship to address the root cause.', accent: false },
              { k: 'Result', t: 'Fewer repeat tickets on that product — part of the 15% volume drop.', accent: true },
            ].reduce<React.ReactNode[]>((acc, card, i, arr) => {
              acc.push(
                <div key={card.k} style={{ background: card.accent ? `linear-gradient(155deg,${c.accentSoft},transparent)` : c.bg2, border: `1px solid ${card.accent ? c.accentLine : c.line}`, borderRadius: 16, padding: '28px 28px', boxShadow: '0 4px 16px rgba(74,52,28,0.06)' }}>
                  <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.accent, marginBottom: 14 }}>{card.k}</div>
                  <div style={{ fontFamily: 'var(--i-body)', fontSize: 17, color: c.fg, lineHeight: 1.5 }}>{card.t}</div>
                </div>
              )
              if (i === 0 || i === 2) {
                acc.push(<div key={`a${i}`} className="flow-arrow" style={{ alignSelf: 'center', textAlign: 'center', color: c.mute, fontSize: 24, justifySelf: 'center' }}>→</div>)
              }
              return acc
            }, [])}
          </div>
        </Wrap>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding: '96px 0', background: c.bg2 }}>
        <Wrap>
          <Eyebrow>Under the Hood</Eyebrow>
          <h2 style={h2Style}>The stack, end to end.</h2>
          <div className="stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32, marginTop: 8 }}>
            {[
              { h: 'Ingestion',     items: [{ n: 'Salesforce API' }, { n: 'Freshdesk API' }, { n: 'REST APIs' }, { n: 'FedEx / UPS API' }, { n: 'Batch processing' }] },
              { h: 'AI Layer',      items: [{ n: 'GPT-4o', s: 'OpenAI API' }, { n: 'LangChain' }, { n: 'Zero-shot classification' }, { n: 'Structured extraction' }] },
              { h: 'Data',          items: [{ n: 'dbt', s: 'transform' }, { n: 'PostgreSQL' }, { n: 'AWS RDS' }] },
              { h: 'Orchestration', items: [{ n: 'Apache Airflow' }, { n: 'Retries & backfill' }, { n: 'Dependency mgmt' }] },
              { h: 'Delivery',      items: [{ n: 'Zoho Analytics' }, { n: 'Live dashboards' }, { n: 'Python', s: 'glue & logic' }] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontFamily: 'var(--i-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.accent, margin: '0 0 18px', paddingBottom: 14, borderBottom: `1px solid ${c.line}` }}>{col.h}</h4>
                {col.items.map(item => (
                  <div key={item.n} style={{ padding: '10px 0', borderBottom: `1px solid ${c.line2}` }}>
                    <div style={{ fontFamily: 'var(--i-body)', fontSize: 15, color: c.fg }}>{item.n}</div>
                    {'s' in item && item.s && <div style={{ fontFamily: 'var(--i-mono)', fontSize: 11, color: c.mute, marginTop: 3 }}>{item.s}</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ── CLOSING ── */}
      <section style={{ background: c.bg3, padding: '96px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(194,95,55,0.12)', filter: 'blur(80px)', bottom: -200, right: -80, pointerEvents: 'none' }} />
        <Wrap style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Eyebrow>Thank You</Eyebrow>
          <h1 style={{ fontFamily: 'var(--i-display)', fontWeight: 700, fontSize: 'clamp(36px,6vw,76px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: c.fg, maxWidth: '14ch', margin: '0 0 36px' }}>
            Let&apos;s build things that{' '}
            <em style={{ fontStyle: 'italic', color: c.accent }}>listen</em>{' '}
            to customers.
          </h1>
          <a href="https://apoorav.online" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--i-mono)', fontSize: 22, color: c.accent, textDecoration: 'none', borderBottom: `2px solid transparent`, paddingBottom: 4, transition: 'border-color 0.15s', marginBottom: 56, letterSpacing: '0.01em' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = c.accentLine)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <span style={{ color: c.mute }}>▸</span> www.apoorav.online
          </a>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', fontFamily: 'var(--i-mono)', fontSize: 14, color: c.dim, borderTop: `1px solid ${c.line}`, paddingTop: 28 }}>
            <span>Apoorav Rao</span>
            <span>Gen &amp; Agentic AI Intern</span>
            <span><b style={{ color: c.accent }}>500K+</b> tickets · <b style={{ color: c.accent }}>4×</b> faster · <b style={{ color: c.accent }}>15%</b> fewer tickets</span>
          </div>
        </Wrap>
      </section>
    </>
  )
}
