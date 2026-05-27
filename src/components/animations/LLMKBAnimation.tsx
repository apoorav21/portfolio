'use client'

import { motion } from 'framer-motion'

// Warm linen: terracotta nodes, parchment bg, warm-brown edges
const nodes = [
  { id: 'wiki', x: 50, y: 50, label: 'KB',      r: 18, color: '#BE5C33', isCenter: true },
  { id: 'a1',   x: 15, y: 20, label: 'Article',  r: 10, color: '#C8872A', isCenter: false },
  { id: 'a2',   x: 82, y: 18, label: 'Article',  r: 10, color: '#C8872A', isCenter: false },
  { id: 'a3',   x: 10, y: 72, label: 'Article',  r: 10, color: '#C8872A', isCenter: false },
  { id: 'a4',   x: 86, y: 75, label: 'Article',  r: 10, color: '#C8872A', isCenter: false },
  { id: 't1',   x: 50, y: 10, label: 'Tag',      r:  7, color: '#9E4822', isCenter: false },
  { id: 't2',   x: 88, y: 48, label: 'Tag',      r:  7, color: '#9E4822', isCenter: false },
]

const edges = [
  { from: 'a1', to: 'wiki' },
  { from: 'a2', to: 'wiki' },
  { from: 'a3', to: 'wiki' },
  { from: 'a4', to: 'wiki' },
  { from: 't1', to: 'wiki' },
  { from: 't2', to: 'wiki' },
  { from: 'a1', to: 't1' },
  { from: 'a2', to: 't2' },
]

export default function LLMKBAnimation({ isVisible }: { isVisible: boolean }) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg-2)' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map((e, i) => {
          const from = nodeMap[e.from]
          const to   = nodeMap[e.to]
          return (
            <motion.line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke="#CCBBA0"
              strokeWidth="0.9"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
            />
          )
        })}

        {/* Particles flowing to center */}
        {['a1', 'a2', 'a3', 'a4'].map((id, i) => {
          const node   = nodeMap[id]
          const center = nodeMap['wiki']
          return (
            <motion.circle
              key={`particle-${id}`}
              r="1.8"
              fill="#BE5C33"
              initial={{ cx: node.x, cy: node.y, opacity: 0 }}
              animate={isVisible ? {
                cx: [node.x, center.x],
                cy: [node.y, center.y],
                opacity: [0, 1, 0],
              } : {}}
              transition={{
                delay: 1 + i * 0.25,
                duration: 0.75,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeIn',
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x} cy={node.y} r={node.r}
              fill={node.isCenter ? node.color : 'var(--bg)'}
              stroke={node.color}
              strokeWidth={node.isCenter ? 0 : 1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.1, duration: 0.35, type: 'spring', stiffness: 300 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {node.isCenter ? (
              <motion.text
                x={node.x} y={node.y + 1.5}
                textAnchor="middle" fontSize="5.5" fill="white"
                fontWeight="700" fontFamily="var(--font-mono)"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                {node.label}
              </motion.text>
            ) : (
              <motion.text
                x={node.x} y={node.y + 1}
                textAnchor="middle" fontSize="3.5" fill={node.color}
                fontWeight="600" fontFamily="var(--font-mono)"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {node.label}
              </motion.text>
            )}
          </g>
        ))}

        {/* Center pulse ring */}
        <motion.circle
          cx={50} cy={50} r={18}
          fill="none"
          stroke="#BE5C33"
          strokeWidth="0.9"
          initial={{ scale: 1, opacity: 0 }}
          animate={isVisible ? { scale: [1, 1.8, 1], opacity: [0, 0.45, 0] } : {}}
          transition={{ delay: 0.8, duration: 2, repeat: Infinity, repeatDelay: 1 }}
          style={{ transformOrigin: '50px 50px' }}
        />
      </svg>
    </div>
  )
}
