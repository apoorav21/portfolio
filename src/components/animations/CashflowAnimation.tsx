'use client'

import { useEffect, useRef } from 'react'

export default function CashflowAnimation({ isVisible }: { isVisible: boolean }) {
  const rafRef = useRef<number>(0)
  const tRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const cards = [
      { label: 'Ravi Kumar', amount: '₹4L', kind: 'borrowed', color: '#E5544B', y: 0.22 },
      { label: 'Priya Shah',  amount: '₹2L', kind: 'lent',     color: '#2A9D8F', y: 0.47 },
      { label: 'Deepak Rao', amount: '₹1.5L', kind: 'lent',   color: '#2A9D8F', y: 0.72 },
    ]

    function draw(ts: number) {
      if (!isVisible) { rafRef.current = requestAnimationFrame(draw); return }
      tRef.current = ts / 1000
      const t = tRef.current
      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      // Background
      ctx.fillStyle = '#e4dccf'
      ctx.fillRect(0, 0, w, h)

      // Subtle grid
      ctx.strokeStyle = 'rgba(0,0,0,0.04)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }

      // Transaction cards
      cards.forEach((card, i) => {
        const cx = w * 0.5
        const cy = h * card.y
        const cw = w * 0.72
        const ch = h * 0.16
        const r = 10
        const float = Math.sin(t * 0.6 + i * 1.2) * 3

        // Card shadow
        ctx.shadowColor = 'rgba(0,0,0,0.10)'
        ctx.shadowBlur = 12
        ctx.shadowOffsetY = 4

        // Card body
        ctx.beginPath()
        ctx.roundRect(cx - cw / 2, cy - ch / 2 + float, cw, ch, r)
        ctx.fillStyle = '#fff'
        ctx.fill()
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0

        // Left accent stripe
        ctx.beginPath()
        ctx.roundRect(cx - cw / 2, cy - ch / 2 + float, 5, ch, [r, 0, 0, r])
        ctx.fillStyle = card.color
        ctx.fill()

        // Avatar circle
        const ax = cx - cw / 2 + 22
        const ay = cy + float
        ctx.beginPath()
        ctx.arc(ax, ay, ch * 0.28, 0, Math.PI * 2)
        ctx.fillStyle = card.color + '22'
        ctx.fill()
        ctx.fillStyle = card.color
        ctx.font = `700 ${ch * 0.28}px Nunito, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(card.label[0], ax, ay)

        // Name
        ctx.fillStyle = '#2A2420'
        ctx.font = `700 ${Math.max(10, h * 0.038)}px Nunito, sans-serif`
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(card.label, cx - cw / 2 + 44, cy - ch * 0.16 + float)

        // Kind badge
        ctx.fillStyle = card.color + '22'
        const badgeX = cx - cw / 2 + 44
        const badgeY = cy + ch * 0.1 + float
        const badgeTxt = card.kind.toUpperCase()
        const bw = badgeTxt.length * 6.5 + 12
        ctx.beginPath()
        ctx.roundRect(badgeX, badgeY, bw, 16, 8)
        ctx.fill()
        ctx.fillStyle = card.color
        ctx.font = `800 9px Nunito, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillText(badgeTxt, badgeX + bw / 2, badgeY + 8)

        // Amount
        ctx.fillStyle = '#2A2420'
        ctx.font = `800 ${Math.max(12, h * 0.05)}px Nunito, sans-serif`
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(card.amount, cx + cw / 2 - 14, cy + float)
      })

      // Floating + button
      const btnX = w * 0.82
      const btnY = h * 0.88
      const btnR = Math.min(w, h) * 0.07
      const pulse = 1 + Math.sin(t * 2) * 0.06

      ctx.shadowColor = 'rgba(242,120,75,0.4)'
      ctx.shadowBlur = 16 * pulse
      ctx.beginPath()
      ctx.arc(btnX, btnY, btnR * pulse, 0, Math.PI * 2)
      ctx.fillStyle = '#F2784B'
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0

      // Mic icon on button
      const mic = btnR * 0.38
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      // Body of mic
      ctx.beginPath()
      ctx.roundRect(btnX - mic * 0.45, btnY - mic, mic * 0.9, mic * 1.5, mic * 0.4)
      ctx.stroke()
      // Stand
      ctx.beginPath()
      ctx.arc(btnX, btnY + mic * 0.6, mic * 0.7, 0, Math.PI)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(btnX, btnY + mic * 1.3)
      ctx.lineTo(btnX, btnY + mic * 1.7)
      ctx.stroke()

      // Voice waveform near the button
      const bars = 5
      const bw2 = 4, gap = 6
      const totalW = bars * (bw2 + gap) - gap
      const startX = btnX - totalW / 2
      for (let b = 0; b < bars; b++) {
        const phase = t * 4 + b * 0.8
        const barH = (0.3 + 0.7 * Math.abs(Math.sin(phase))) * btnR * 0.5
        ctx.fillStyle = '#F2784B'
        ctx.globalAlpha = 0.35
        ctx.beginPath()
        ctx.roundRect(startX + b * (bw2 + gap), btnY - btnR * 1.6 - barH / 2, bw2, barH, 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isVisible])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
