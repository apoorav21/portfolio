'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ── App accent (kept from the app's own palette) ──────────────────────────── */
const ACCENT = '#F2784B'
const RED    = '#E5544B'
const GREEN  = '#2A9D8F'
const AMBER  = '#E9A23B'
/* Parchment is used ONLY inside app-preview boxes to echo the app's own bg */
const APP_BG = '#f0ece5'

/* ── Keyframes ─────────────────────────────────────────────────────────────── */
const CSS = `
@keyframes cf-fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes cf-pulse  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
@keyframes cf-ring   { 0%{transform:scale(1);opacity:.55} 100%{transform:scale(2.6);opacity:0} }
@keyframes cf-bar    { 0%,100%{height:6px}  50%{height:26px} }
@keyframes cf-bar2   { 0%,100%{height:16px} 50%{height:34px} }
@keyframes cf-bar3   { 0%,100%{height:10px} 50%{height:22px} }
@keyframes cf-stream { 0%{opacity:0;transform:translateX(-8px)} 100%{opacity:1;transform:translateX(0)} }
@keyframes cf-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.cf-phone {
  position:relative; width:200px; flex-shrink:0;
  background:#1a1a1a; border-radius:32px;
  padding:10px; box-shadow:0 20px 60px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.08);
}
.cf-phone img { width:100%; border-radius:24px; display:block; }
.cf-phone::before {
  content:''; position:absolute; top:14px; left:50%; transform:translateX(-50%);
  width:60px; height:5px; background:#333; border-radius:999px; z-index:2;
}
@media(max-width:700px){
  .cf-shots-scroll { padding-bottom:16px !important; }
  .cf-phone { width:155px !important; }
  .cf-feat-grid { grid-template-columns:1fr !important; }
  .cf-arch-grid  { grid-template-columns:1fr !important; }
}
`

/* ── Sticky nav ────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav style={{ position:'sticky', top:0, zIndex:50, backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', background:'var(--bg-nav,rgba(255,255,255,0.82))', borderBottom:'1px solid var(--line)', padding:'12px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
      <Link href="/#projects" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-dim)', textDecoration:'none', letterSpacing:'0.04em', whiteSpace:'nowrap' }}>
        ← portfolio
      </Link>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-mute)', letterSpacing:'0.08em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
        Cashflow — case study
      </span>
      <div style={{ display:'flex', gap:12, flexShrink:0 }}>
        <a href="https://apoorav21.github.io/cash-tracking-app/" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:'var(--font-mono)', fontSize:12, color:ACCENT, textDecoration:'none', letterSpacing:'0.04em', fontWeight:600 }}>
          Live ↗
        </a>
        <a href="https://github.com/apoorav21/cash-tracking-app" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-dim)', textDecoration:'none', letterSpacing:'0.04em' }}>
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ background:'var(--bg)', padding:'72px 0 56px', borderBottom:'1px solid var(--line-soft)' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 28px' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:ACCENT, marginBottom:18 }}>
          Case study · Voice-AI · Android + Web
        </div>
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize:'clamp(3rem,8vw,5.5rem)', lineHeight:0.95, letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 22px' }}>
          Cashflow
        </h1>
        <p style={{ fontSize:18, lineHeight:1.7, color:'var(--text-dim)', maxWidth:'54ch', margin:'0 0 36px' }}>
          Speak a transaction in Hindi or English —{' '}
          <strong style={{ color:'var(--text)', fontWeight:500 }}>OpenAI gpt-4o-transcribe</strong> turns your voice into text,{' '}
          <strong style={{ color:'var(--text)', fontWeight:500 }}>gpt-5.4-mini streams structured JSON</strong> back token-by-token,
          and you confirm before anything hits DynamoDB. Runs on Android, iOS, and the web — offline too.
        </p>

        {/* Highlight tiles */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:36 }}>
          {[
            { icon:'🇮🇳', label:'Bilingual Hindi / English' },
            { icon:'📴', label:'Offline-first' },
            { icon:'⚡', label:'Token-streaming AI' },
            { icon:'☁️', label:'Serverless — zero idle cost' },
          ].map(t => (
            <div key={t.label} style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.03em', color:'var(--text-dim)', background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:999, padding:'6px 14px' }}>
              <span>{t.icon}</span>{t.label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <a href="https://apoorav21.github.io/cash-tracking-app/" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'var(--font-mono)', fontSize:13, padding:'11px 22px', background:ACCENT, color:'#fff', borderRadius:10, textDecoration:'none', letterSpacing:'0.04em', border:`2px solid ${ACCENT}`, boxShadow:`3px 3px 0 var(--text)` }}>
            Try it live ↗
          </a>
          <a href="https://github.com/apoorav21/cash-tracking-app" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'var(--font-mono)', fontSize:13, padding:'11px 22px', background:'var(--bg-2)', color:'var(--text)', borderRadius:10, textDecoration:'none', letterSpacing:'0.04em', border:'2px solid var(--text)', boxShadow:'3px 3px 0 var(--text)' }}>
            View on GitHub ↗
          </a>
          {/* APK_DOWNLOAD_LINK_PLACEHOLDER */}
          <a href="#apk-placeholder" onClick={e => e.preventDefault()}
            style={{ fontFamily:'var(--font-mono)', fontSize:13, padding:'11px 22px', background:'transparent', color:'var(--text-mute)', borderRadius:10, textDecoration:'none', letterSpacing:'0.04em', border:'1px solid var(--line)', cursor:'not-allowed', opacity:0.6 }}
            title="APK link coming soon — attach GitHub Release URL here">
            Download APK ↓
          </a>
          <Link href="/#projects"
            style={{ fontFamily:'var(--font-mono)', fontSize:13, padding:'11px 22px', background:'transparent', color:'var(--text-mute)', borderRadius:10, textDecoration:'none', letterSpacing:'0.04em', border:'1px solid var(--line)' }}>
            ← Back to projects
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Phone frame component ─────────────────────────────────────────────────── */
function Phone({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, flexShrink:0 }}>
      <div className="cf-phone" style={{ width:190 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--text-mute)', letterSpacing:'0.04em', textAlign:'center', maxWidth:180 }}>{caption}</span>
    </div>
  )
}

/* ── Screenshots ───────────────────────────────────────────────────────────── */
function Screenshots() {
  const shots = [
    { src:'/demo/home.png',          alt:'Home dashboard', caption:'Dashboard — net position, interest in/out, upcoming payments' },
    { src:'/demo/transcript.png',    alt:'Voice capture',  caption:'Voice entry — "Just say it out loud"' },
    { src:'/demo/transaction.png',   alt:'AI draft',       caption:'AI draft — gpt-5.4-mini parses Hindi/English, streams fields' },
    { src:'/demo/chat.png',          alt:'Munshi chat',    caption:'Munshi — bilingual AI with WhatsApp-ready statement' },
    { src:'/demo/person-detail.png', alt:'Person detail',  caption:'Person detail — outstanding, interest accrued, repayments' },
  ]

  return (
    <section style={{ background:'var(--bg-2)', padding:'72px 0', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 28px' }}>
        <SectionHead n="01" title="In the app" sub="real screens, real data" />
      </div>
      {/* Horizontally scrollable row of phones — outer handles scroll, inner centers */}
      <div className="cf-shots-scroll" style={{ overflowX:'auto', paddingBottom:8 }}>
        <div style={{ display:'flex', gap:24, paddingLeft:28, paddingRight:28, width:'fit-content', margin:'0 auto' }}>
          {shots.map(s => <Phone key={s.src} src={s.src} alt={s.alt} caption={s.caption} />)}
        </div>
      </div>
    </section>
  )
}

/* ── Video walkthrough ─────────────────────────────────────────────────────── */
function VideoSection() {
  return (
    <section style={{ background:'var(--bg)', padding:'72px 0' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 28px' }}>
        <SectionHead n="02" title="Walkthrough" sub="60-second demo" />
        <div style={{ borderRadius:16, overflow:'hidden', border:'2px solid var(--line)', boxShadow:'5px 5px 0 var(--line)', background:'#000' }}>
          <video
            src="/demo/demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            style={{ width:'100%', display:'block', maxHeight:600, objectFit:'contain' }}
          />
        </div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-mute)', marginTop:12, letterSpacing:'0.04em' }}>
          Full walkthrough: voice entry, AI parsing, Munshi chat, repayment recording, and the money graph.
        </p>
      </div>
    </section>
  )
}

/* ── How it works ──────────────────────────────────────────────────────────── */
function HowItWorks() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [draft, setDraft] = useState<Record<string,string>|null>(null)

  const SENTENCE = 'took 3 lakh from Ravi for 6 months at 2% per month in cash'
  const PARSED   = { kind:'Borrowed', party:'Ravi', amount:'₹3,00,000', rate:'2% / mo (सैकड़ा)', term:'6 months', method:'Cash', date:'10/07/2026' }

  function runDemo() {
    setStep(1); setRunning(true); setTranscript(''); setDraft(null)
    let i = 0
    const iv = setInterval(() => {
      i += 2
      setTranscript(SENTENCE.slice(0, i))
      if (i >= SENTENCE.length) {
        clearInterval(iv)
        setTimeout(() => setStep(2), 300)
        setTimeout(() => {
          let d: Record<string,string> = {}
          const entries = Object.entries(PARSED)
          let ei = 0
          const draftIv = setInterval(() => {
            if (ei >= entries.length) { clearInterval(draftIv); setRunning(false); return }
            d = { ...d, [entries[ei][0]]: entries[ei][1] }
            setDraft({ ...d })
            ei++
          }, 120)
        }, 600)
      }
    }, 55)
  }

  function reset() { setStep(0); setRunning(false); setTranscript(''); setDraft(null) }

  const steps = [
    { icon:'🎙️', title:'Speak', desc:'Tap + and say the transaction in Hindi or English. Audio is sent to a Lambda which calls OpenAI gpt-4o-transcribe.', color:ACCENT },
    { icon:'🤖', title:'AI parses', desc:'The transcript goes to gpt-5.4-mini. It streams structured JSON — party, amount, rate, term — back token-by-token into an editable form.', color:'#8b5cf6' },
    { icon:'✅', title:'You confirm', desc:'Review every field. Edit anything. Tap Confirm — only then does it write to DynamoDB. The OpenAI key never leaves AWS Lambda.', color:GREEN },
  ]

  return (
    <section style={{ background:'var(--bg)', padding:'72px 0' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 28px' }}>
        <SectionHead n="03" title="How it works" sub="Voice → OpenAI → confirm" />

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:18, marginBottom:44 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:14, padding:'22px 20px', position:'relative', overflow:'hidden' }}>
              <div style={{ fontSize:26, marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:17, color:'var(--text)', marginBottom:7 }}>{s.title}</div>
              <div style={{ fontSize:13.5, color:'var(--text-dim)', lineHeight:1.65 }}>{s.desc}</div>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:s.color }} />
            </div>
          ))}
        </div>

        {/* Simulated demo */}
        <div style={{ background:APP_BG, borderRadius:20, padding:'32px 28px', border:'1px solid rgba(0,0,0,0.07)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'0.12em', textTransform:'uppercase', color:'#a89f93', marginBottom:20 }}>
            Simulated demo — shows the real AI flow
          </div>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20, minHeight:240 }}>
            {step === 0 && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, animation:'cf-fadeUp 0.35s ease' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'#6b5f55', textAlign:'center', maxWidth:'36ch', margin:0 }}>
                  Click below to watch how the voice-to-draft pipeline works — transcript streams in, then fields appear one by one as GPT responds.
                </p>
                <button onClick={runDemo} style={{ width:68, height:68, borderRadius:'50%', background:ACCENT, border:'none', cursor:'pointer', fontSize:26, boxShadow:`0 4px 18px ${ACCENT}55`, transition:'transform 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                  🎙️
                </button>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'#a89f93' }}>Click to simulate</span>
              </div>
            )}

            {step >= 1 && (
              <div style={{ width:'100%', maxWidth:440, display:'flex', flexDirection:'column', gap:16, animation:'cf-fadeUp 0.3s ease' }}>
                {/* Waveform */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, height:36 }}>
                  {step === 1
                    ? [0,1,2,3,4,5,6].map(i => (
                        <div key={i} style={{ width:4, background:ACCENT, borderRadius:2, animation:`${['cf-bar','cf-bar2','cf-bar3','cf-bar2','cf-bar','cf-bar3','cf-bar2'][i]} ${0.55+i*0.07}s ease-in-out infinite` }} />
                      ))
                    : <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:ACCENT }}>✓ gpt-4o-transcribe done</div>
                  }
                </div>
                {/* Transcript box */}
                <div style={{ background:'#fff', borderRadius:12, padding:'13px 16px', minHeight:46, fontFamily:'var(--font-body)', fontSize:14, color:'#2A2420', lineHeight:1.5, border:'1px solid rgba(0,0,0,0.08)', fontStyle:'italic' }}>
                  &ldquo;{transcript || <span style={{ color:'#a89f93' }}>Listening…</span>}&rdquo;
                  {transcript && step === 1 && <span style={{ display:'inline-block', width:2, height:14, background:ACCENT, marginLeft:3, animation:'cf-pulse 0.8s infinite' }} />}
                </div>
                {/* Draft card */}
                {step === 2 && (
                  <div style={{ background:'#fff', borderRadius:14, border:'1px solid rgba(0,0,0,0.09)', overflow:'hidden', animation:'cf-fadeUp 0.3s ease' }}>
                    <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(0,0,0,0.06)', fontFamily:'var(--font-mono)', fontSize:11, color:ACCENT, display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background:ACCENT, display:'inline-block', animation: running ? 'cf-pulse 0.9s infinite' : 'none' }} />
                      {running ? 'gpt-5.4-mini streaming…' : 'Here\'s what I caught'}
                    </div>
                    {/* Kind tabs */}
                    <div style={{ display:'flex', borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
                      {['Borrowed','Lent','Asset'].map((k,i) => (
                        <div key={k} style={{ flex:1, padding:'10px 0', textAlign:'center', fontFamily:'var(--font-mono)', fontSize:11.5, fontWeight:700, background:i===0?RED:'transparent', color:i===0?'#fff':'#a89f93', borderRight:i<2?'1px solid rgba(0,0,0,0.06)':'none' }}>{k}</div>
                      ))}
                    </div>
                    {draft && Object.entries(draft).filter(([k])=>k!=='kind').map(([k,v],i)=>(
                      <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 16px', borderBottom:'1px solid rgba(0,0,0,0.04)', animation:`cf-stream 0.25s ease ${i*0.06}s both` }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#a89f93', textTransform:'capitalize' }}>{k}</span>
                        <span style={{ fontFamily:'var(--font-body)', fontSize:14, color:'#2A2420', fontWeight:600 }}>{v}</span>
                      </div>
                    ))}
                    {!running && draft && (
                      <div style={{ padding:'12px 16px', display:'flex', gap:8 }}>
                        <button onClick={reset} style={{ flex:1, padding:'12px 0', background:GREEN, color:'#fff', border:'none', borderRadius:10, fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, cursor:'pointer', letterSpacing:'0.04em' }}>Confirm &amp; save ✓</button>
                        <button onClick={reset} style={{ padding:'12px 16px', background:'transparent', color:'#a89f93', border:'1px solid rgba(0,0,0,0.1)', borderRadius:10, fontFamily:'var(--font-mono)', fontSize:12, cursor:'pointer' }}>Reset</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Features ──────────────────────────────────────────────────────────────── */
function Features() {
  const [active, setActive] = useState(0)

  const tabs = [
    {
      id:'graph', label:'Money graph', icon:'🗺️', color:ACCENT,
      title:'Obsidian-style money graph',
      desc:'A draggable force-directed SVG graph of everyone you owe or who owes you. Directional arrows show which way money flows. Zoom, drag nodes, see net balances at a glance — the most visually distinctive feature of the app.',
      details:[
        'Force-directed SVG layout — nodes repel, edges pull',
        'Directional arrows: borrowed → red, lent → green',
        'Node size scales with net outstanding amount',
        'Drag any person to reorganise — physics snaps back',
        'Live-computed from your actual transaction data',
        'Tap a node to jump to that person\'s detail screen',
      ],
      preview:(
        <div style={{ background:'#0f1117', borderRadius:14, padding:'20px 16px', minHeight:200, position:'relative', overflow:'hidden' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'#555', marginBottom:12 }}>SVG force-directed graph</div>
          {/* Simplified SVG preview */}
          <svg viewBox="0 0 300 180" style={{ width:'100%' }}>
            {/* Edges */}
            <defs>
              <marker id="arrow-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill={RED} />
              </marker>
              <marker id="arrow-g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill={GREEN} />
              </marker>
            </defs>
            <line x1="150" y1="90" x2="68" y2="42" stroke={RED} strokeWidth="1.5" markerEnd="url(#arrow-r)" strokeDasharray="0" opacity="0.8"/>
            <line x1="150" y1="90" x2="240" y2="50" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#arrow-g)" opacity="0.8"/>
            <line x1="150" y1="90" x2="220" y2="148" stroke={RED} strokeWidth="1.5" markerEnd="url(#arrow-r)" opacity="0.8"/>
            <line x1="150" y1="90" x2="68" y2="148" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#arrow-g)" opacity="0.8"/>
            {/* Nodes */}
            {[
              { x:150, y:90,  r:22, c:ACCENT, label:'You',    sub:'-11.56L' },
              { x:60,  y:38,  r:16, c:RED,    label:'Ramesh', sub:'4L' },
              { x:242, y:46,  r:13, c:GREEN,  label:'Deepak', sub:'2L' },
              { x:224, y:150, r:18, c:RED,    label:'Mehta',  sub:'6L' },
              { x:62,  y:150, r:12, c:GREEN,  label:'Priya',  sub:'1L' },
            ].map((n,i) => (
              <g key={i} style={{ animation:`cf-float ${2+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.3}s` }}>
                <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity="0.18" />
                <circle cx={n.x} cy={n.y} r={n.r-4} fill={n.c} opacity="0.9" />
                <text x={n.x} y={n.y-1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={n.r > 18 ? 8 : 7} fontWeight="700" fontFamily="monospace">{n.label}</text>
                <text x={n.x} y={n.y+n.r+9} textAnchor="middle" fill={n.c} fontSize="7.5" fontFamily="monospace" opacity="0.9">{n.sub}</text>
              </g>
            ))}
          </svg>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'#555', marginTop:8, display:'flex', gap:16 }}>
            <span style={{ color:RED }}>→ you owe</span>
            <span style={{ color:GREEN }}>→ owed to you</span>
          </div>
        </div>
      ),
    },
    {
      id:'munshi', label:'₹ Munshi', icon:'💬', color:'#8b5cf6',
      title:'Munshi — bilingual AI accountant',
      desc:'An OpenAI gpt-5.4-mini assistant that knows every transaction you\'ve recorded. Ask in Hindi or English — it replies in kind, shows the math कलम-wise, and can even create "linked deals" in one step.',
      details:[
        'Full transaction history sent as context with every message',
        'Computes interest in रुपया सैकड़ा (% per month) — the Indian convention',
        'Shows math step-by-step: principal, rate, days, interest, total due',
        '"Linked deals": "took ₹5L from X at 1%, lent to Y at 2%" → two linked entries in one go',
        'Proposes entries you confirm before they save — nothing auto-writes',
        'Generates WhatsApp-ready statements you can copy and send',
        'Powered by OpenAI gpt-5.4-mini via streaming Lambda Function URL',
      ],
      preview:(
        <div style={{ background:'#1a1028', borderRadius:14, padding:'18px 16px', fontFamily:'monospace', fontSize:13 }}>
          <div style={{ color:'#6b5f80', fontSize:10, marginBottom:10 }}>Munshi · Hindi/English</div>
          <div style={{ color:'#9ca3af', fontSize:11, marginBottom:6 }}>You</div>
          <div style={{ background:'#8b5cf6', color:'#fff', borderRadius:'12px 12px 4px 12px', padding:'10px 14px', marginBottom:14, fontSize:13, lineHeight:1.5 }}>
            Ramesh Uncle ka hisab bana do WhatsApp ke liye
          </div>
          <div style={{ color:'#9ca3af', fontSize:11, marginBottom:6 }}>Munshi ₹</div>
          <div style={{ background:'#2d1f45', color:'#e9d5ff', borderRadius:'4px 12px 12px 12px', padding:'10px 14px', fontSize:12.5, lineHeight:1.7 }}>
            Ramesh Uncle ka bhejne layak hisab:<br/>
            <br/>
            Seedha hisab: ₹4,00,000 par 1.5% mahine ke<br/>
            hisab se ab tak ₹23,400 byaj banta hai,<br/>
            kul bakaya <span style={{ color:'#4ade80', fontWeight:700 }}>₹4,23,400</span> hai।
          </div>
          <div style={{ marginTop:12, display:'flex', gap:8 }}>
            <div style={{ background:'#25d366', color:'#fff', borderRadius:8, padding:'7px 14px', fontSize:11, fontWeight:700 }}>📲 Send</div>
            <div style={{ background:'#2d2d2d', color:'#aaa', borderRadius:8, padding:'7px 14px', fontSize:11 }}>Copy</div>
          </div>
        </div>
      ),
    },
    {
      id:'assets', label:'Assets', icon:'🏠', color:AMBER,
      title:'Property & asset tracking',
      desc:'Record plots, flats, land, commercial spaces, gold, silver — with area, location, installment history, current market value, rental income, and a next-payment-due reminder.',
      details:[
        'Asset types: plot, flat, land, house, commercial, gold, silver, other',
        'Size + unit: sq ft, gaj, sq yd, sq m, acre, bigha, marla',
        'Installment progress bar — total paid vs. total cost, % complete',
        'Market value field → auto-computes gain/loss vs. purchase price',
        'Rental income tracking with monthly reminders',
        '"Next payment due" shown on the home dashboard Upcoming list',
        'Edit/delete any instalment; full payment history per asset',
      ],
      preview:(
        <div style={{ background:'var(--bg-2,#f8f8f8)', borderRadius:14, padding:'20px 18px', border:'1px solid var(--line,rgba(0,0,0,0.08))' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
            <div>
              <div style={{ fontFamily:'var(--font-display,serif)', fontSize:17, color:'var(--text,#111)' }}>Skyline Residency 3BHK</div>
              <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:10.5, color:'var(--text-mute,#999)', marginTop:2 }}>Flat · Gurugram</div>
            </div>
            <span style={{ fontSize:20 }}>🏢</span>
          </div>
          {[
            { label:'Purchase price', v:'₹30.00 L', c:'var(--text,#111)' },
            { label:'Paid so far',    v:'₹12.00 L', c:GREEN },
            { label:'Market value',   v:'₹34.50 L', c:GREEN },
            { label:'Gain',           v:'+₹4.50 L (15%)', c:GREEN },
            { label:'Rent / mo',      v:'₹18,000', c:AMBER },
            { label:'Next due',       v:'22 Jul 2026 · in 12d', c:RED },
          ].map(r => (
            <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(0,0,0,0.05)' }}>
              <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:11, color:'var(--text-mute,#999)' }}>{r.label}</span>
              <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:12, color:r.c, fontWeight:600 }}>{r.v}</span>
            </div>
          ))}
          {/* Progress bar */}
          <div style={{ marginTop:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono,monospace)', fontSize:10, color:'var(--text-mute,#999)', marginBottom:5 }}>
              <span>Paid</span><span>40% of ₹30L</span>
            </div>
            <div style={{ background:'rgba(0,0,0,0.07)', borderRadius:999, height:6 }}>
              <div style={{ width:'40%', height:'100%', background:GREEN, borderRadius:999 }} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id:'interest', label:'Interest math', icon:'📐', color:'#f59e0b',
      title:'Accurate Indian interest calculations',
      desc:'Most apps use annual rates. Indian informal lending uses % per month (रुपया सैकड़ा). Cashflow defaults to monthly, supports partial repayments that stop interest on returned principal from day one.',
      details:[
        'Monthly (सैकड़ा) or annual rate per loan — your choice',
        'Simple or compound interest (मासिक चक्रवृद्धि)',
        'Day-count accurate: 30-day months, full day proration',
        'Partial repayment splits into principal + interest paid',
        'Balance recalculates from each repayment date forward',
        'Interest stops accruing at maturity date automatically',
      ],
      preview:(
        <div style={{ background:'var(--bg-2,#f8f8f8)', borderRadius:14, padding:'20px 18px', border:'1px solid var(--line,rgba(0,0,0,0.08))' }}>
          <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:10.5, color:'var(--text-mute,#999)', marginBottom:14, letterSpacing:'0.06em' }}>INTEREST BREAKDOWN</div>
          {[
            { label:'Principal',       v:'₹3,00,000', c:'var(--text,#111)' },
            { label:'Rate',            v:'2% / month (सैकड़ा)', c:'#f59e0b' },
            { label:'Term',            v:'6 months', c:'var(--text,#111)' },
            { label:'Interest (full)', v:'₹36,000', c:RED },
            { label:'Total owed',      v:'₹3,36,000', c:RED, bold:true },
          ].map(r => (
            <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)' }}>
              <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:11.5, color:'var(--text-mute,#999)' }}>{r.label}</span>
              <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:12.5, color:r.c, fontWeight:r.bold?700:500 }}>{r.v}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id:'offline', label:'Cloud + offline', icon:'📴', color:'#3b82f6',
      title:'Offline-first — works without internet',
      desc:'Primary path hits DynamoDB via a Cognito-authed HTTP API. If the cloud isn\'t reachable, the app falls back to browser SpeechRecognition + a local Hindi/English NLP parser + localStorage. Zero data loss.',
      details:[
        'Primary: Lambda Function URLs → OpenAI → DynamoDB (ap-south-1)',
        'Cognito User Pool JWT authorizer — each user reads/writes only their own rows',
        'OpenAI API key lives only in Lambda env vars (NoEcho CloudFormation param)',
        'Offline fallback: browser SpeechRecognition + on-device NLP parser',
        'localStorage stores transactions — syncs when cloud reconnects',
        'User-namespaced storage: multiple accounts on one device',
      ],
      preview:(
        <div style={{ background:'var(--bg-2,#f8f8f8)', borderRadius:14, padding:'20px 18px', border:'1px solid var(--line,rgba(0,0,0,0.08))', fontFamily:'var(--font-mono,monospace)', fontSize:12 }}>
          {[
            { label:'OpenAI API',        status:'✓ Active',  c:GREEN },
            { label:'Lambda (STT)',       status:'✓ Online',  c:GREEN },
            { label:'Lambda (parser)',    status:'✓ Online',  c:GREEN },
            { label:'DynamoDB',          status:'✓ Synced',  c:GREEN },
            { label:'Cognito JWT auth',  status:'✓ Secured', c:GREEN },
            { label:'Offline fallback',  status:'Standby',   c:'var(--text-mute,#999)' },
          ].map(r => (
            <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid rgba(0,0,0,0.05)' }}>
              <span style={{ color:'var(--text-mute,#999)' }}>{r.label}</span>
              <span style={{ color:r.c, fontWeight:700 }}>{r.status}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const tab = tabs[active]

  return (
    <section style={{ background:'var(--bg-2)', padding:'72px 0' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 28px' }}>
        <SectionHead n="04" title="Features" sub="what makes it different" />

        <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' }}>
          {tabs.map((t,i) => (
            <button key={t.id} onClick={() => setActive(i)}
              style={{ fontFamily:'var(--font-mono)', fontSize:12, padding:'8px 16px', borderRadius:999, border:`2px solid ${active===i ? t.color : 'var(--line)'}`, background:active===i ? t.color : 'transparent', color:active===i ? '#fff' : 'var(--text-mute)', cursor:'pointer', fontWeight:active===i?700:400, transition:'all 0.15s', letterSpacing:'0.03em' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div key={active} className="cf-feat-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, animation:'cf-fadeUp 0.3s ease' }}>
          <div>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize:22, color:'var(--text)', margin:'0 0 10px' }}>{tab.title}</h3>
            <p style={{ fontSize:14.5, color:'var(--text-dim)', lineHeight:1.7, margin:'0 0 22px' }}>{tab.desc}</p>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:9 }}>
              {tab.details.map((d,i) => (
                <li key={i} style={{ display:'flex', gap:9, fontSize:13.5, color:'var(--text-dim)', lineHeight:1.55 }}>
                  <span style={{ color:tab.color, flexShrink:0, marginTop:4, fontSize:7 }}>▸</span>{d}
                </li>
              ))}
            </ul>
          </div>
          <div>{tab.preview}</div>
        </div>
      </div>
    </section>
  )
}

/* ── Architecture ──────────────────────────────────────────────────────────── */
function Architecture() {
  return (
    <section style={{ background:'var(--bg)', padding:'72px 0' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 28px' }}>
        <SectionHead n="05" title="Architecture" sub="how the pieces connect" />

        <div className="cf-arch-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))', gap:16, marginBottom:36 }}>
          {[
            { icon:'📱', title:'Capacitor 6 App',      body:'One React codebase compiled to a native Android APK (also iOS + web). GitHub Actions builds and signs the APK automatically on push to main.' },
            { icon:'🎙️', title:'STT Lambda',           body:'Lambda Function URL receives audio from the device. Calls OpenAI gpt-4o-transcribe and returns the transcript. The API key never leaves AWS.' },
            { icon:'🤖', title:'Parser Lambda',        body:'Receives the transcript, streams a structured JSON response from gpt-5.4-mini token-by-token via a streaming Lambda Function URL back to the app.' },
            { icon:'🗄️', title:'DynamoDB + API GW',   body:'HTTP API Gateway with a Cognito User Pool JWT authorizer. DynamoDB partition key = Cognito sub — users can only read/write their own rows.' },
            { icon:'💬', title:'Munshi Lambda',        body:'Streaming Lambda that sends the full transaction history + user message to gpt-5.4-mini. Returns bilingual response with interest math and optional <<<ACTION>>> blocks.' },
            { icon:'📴', title:'Offline fallback',     body:'Browser SpeechRecognition API + a local Hindi/English regex NLP parser + localStorage. Full CRUD works without any internet connection.' },
          ].map((c,i) => (
            <div key={i} style={{ background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:14, padding:'20px 18px' }}>
              <div style={{ fontSize:22, marginBottom:10 }}>{c.icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:15, color:'var(--text)', marginBottom:5 }}>{c.title}</div>
              <div style={{ fontSize:13, color:'var(--text-dim)', lineHeight:1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        {/* Code-style flow */}
        <div style={{ background:'#0d1117', borderRadius:14, padding:'26px 28px', fontFamily:'var(--font-mono)', fontSize:13, color:'#8b949e', lineHeight:2, overflowX:'auto' }}>
          <div style={{ color:'#3d444d', marginBottom:4 }}>{'// request flow (OpenAI end-to-end)'}</div>
          <div><span style={{ color:ACCENT }}>Android app (Capacitor WebView)</span></div>
          <div style={{ paddingLeft:18 }}>{'├── mic ──audio──▶ '}<span style={{ color:'#f59e0b' }}>Lambda (STT)</span>{' ──▶ '}<span style={{ color:'#4ade80' }}>OpenAI gpt-4o-transcribe</span>{' ──▶ transcript'}</div>
          <div style={{ paddingLeft:18 }}>{'├── transcript ──▶ '}<span style={{ color:'#8b5cf6' }}>Lambda (parser, streaming)</span>{' ──▶ '}<span style={{ color:'#4ade80' }}>gpt-5.4-mini</span>{' ──▶ JSON draft'}</div>
          <div style={{ paddingLeft:18 }}>{'├── confirm ──▶ '}<span style={{ color:'#3b82f6' }}>HTTP API (Cognito JWT)</span>{' ──▶ Lambda ──▶ '}<span style={{ color:GREEN }}>DynamoDB</span></div>
          <div style={{ paddingLeft:18 }}>{'└── Munshi chat ──▶ '}<span style={{ color:'#ec4899' }}>Lambda (streaming)</span>{' ──▶ '}<span style={{ color:'#4ade80' }}>gpt-5.4-mini</span>{' ──▶ reply'}</div>
          <div style={{ marginTop:10, color:'#3d444d' }}>{'// security'}</div>
          <div style={{ paddingLeft:18 }}><span style={{ color:'#f59e0b' }}>OpenAI API key</span>{' → Lambda env var (NoEcho CloudFormation param) — never shipped to device'}</div>
          <div style={{ paddingLeft:18 }}><span style={{ color:'#3b82f6' }}>Cognito sub</span>{' → DynamoDB partition key — users isolated at the data layer'}</div>
          <div style={{ marginTop:10, color:'#3d444d' }}>{'// offline fallback'}</div>
          <div style={{ paddingLeft:18 }}>{'browser SpeechRecognition + local NLP parser + localStorage → full CRUD without internet'}</div>
        </div>
      </div>
    </section>
  )
}

/* ── Tech stack ────────────────────────────────────────────────────────────── */
function TechStack() {
  const cols = [
    { head:'Frontend',    items:['React 18 (Babel Standalone, single-file)', 'SVG force-directed money graph', 'Nunito (Google Fonts)', 'CSS animations + transitions'] },
    { head:'Native',      items:['Capacitor 6 (Android + iOS + Web)', 'GitHub Actions APK build + signing', 'WebView — one codebase everywhere', 'Offline-first with localStorage'] },
    { head:'AI / OpenAI', items:['gpt-4o-transcribe (speech-to-text)', 'gpt-5.4-mini (transaction parser)', 'gpt-5.4-mini (Munshi assistant)', 'Streaming JSON token-by-token'] },
    { head:'AWS',         items:['Lambda Function URLs (streaming)', 'HTTP API Gateway + Cognito JWT', 'DynamoDB (partition key = Cognito sub)', 'CloudFormation / SAM (IaC)'] },
  ]

  return (
    <section style={{ background:'var(--bg-2)', padding:'72px 0' }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 28px' }}>
        <SectionHead n="06" title="Tech stack" sub="what's under the hood" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:28 }}>
          {cols.map(col => (
            <div key={col.head}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:ACCENT, marginBottom:14 }}>{col.head}</div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:9 }}>
                {col.items.map(item => (
                  <li key={item} style={{ display:'flex', gap:8, fontSize:13.5, color:'var(--text-dim)', alignItems:'flex-start' }}>
                    <span style={{ width:4, height:4, borderRadius:'50%', background:ACCENT, flexShrink:0, marginTop:7 }} />{item}
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

/* ── Shared heading ────────────────────────────────────────────────────────── */
function SectionHead({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:32, paddingBottom:14, borderBottom:'1px solid var(--line-soft)' }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:ACCENT, letterSpacing:'0.1em' }}>{n} ·</span>
      <span style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize:'clamp(21px,3vw,31px)', color:'var(--text)', flex:1 }}>{title}</span>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-mute)', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{sub}</span>
    </div>
  )
}

/* ── Page root ─────────────────────────────────────────────────────────────── */
export default function CashflowPage() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
        <Nav />
        <Hero />
        <Screenshots />
        <VideoSection />
        <HowItWorks />
        <Features />
        <Architecture />
        <TechStack />
        <div style={{ background:'var(--bg)', borderTop:'1px solid var(--line-soft)', padding:'28px 28px', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-mute)' }}>
            Built by{' '}
            <a href="/" style={{ color:ACCENT, textDecoration:'none' }}>Apoorav Rao</a>
            {' · '}
            <a href="https://github.com/apoorav21/cash-tracking-app" target="_blank" rel="noopener noreferrer" style={{ color:ACCENT, textDecoration:'none' }}>
              github.com/apoorav21/cash-tracking-app
            </a>
            {' · '}
            <a href="https://apoorav21.github.io/cash-tracking-app/" target="_blank" rel="noopener noreferrer" style={{ color:ACCENT, textDecoration:'none' }}>
              Live demo ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
