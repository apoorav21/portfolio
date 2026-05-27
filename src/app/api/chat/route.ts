import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/chatbot-knowledge'

// In production (Amplify), these are compiled in at build time via amplify.yml.
// Locally, fall back to process.env so .env.local still works.
let LLM_BASE_URL: string
let LLM_MODEL: string
let LLM_API_KEY: string

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const cfg = require('@/generated/config')
  LLM_BASE_URL = cfg.LLM_BASE_URL || process.env.LLM_BASE_URL || ''
  LLM_MODEL    = cfg.LLM_MODEL    || process.env.LLM_MODEL    || ''
  LLM_API_KEY  = cfg.LLM_API_KEY  || process.env.LLM_API_KEY  || ''
} catch {
  LLM_BASE_URL = process.env.LLM_BASE_URL || ''
  LLM_MODEL    = process.env.LLM_MODEL    || ''
  LLM_API_KEY  = process.env.LLM_API_KEY  || ''
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    if (!LLM_BASE_URL || !LLM_MODEL || !LLM_API_KEY) {
      return NextResponse.json({
        message:
          "Hi! I'm Echo, Apoorav's assistant — I'm not fully connected yet. " +
          "Reach out directly at apooravrao@gmail.com 👋",
      })
    }

    const response = await fetch(`${LLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [
          { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('LLM error:', err)
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again.' },
        { status: 503 },
      )
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? "I'm not sure how to answer that!"

    return NextResponse.json({ message: reply })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again!' },
      { status: 500 },
    )
  }
}
