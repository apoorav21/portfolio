import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/chatbot-knowledge'

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

    const baseUrl = process.env.LLM_BASE_URL
    const model   = process.env.LLM_MODEL
    const apiKey  = process.env.LLM_API_KEY

    if (!baseUrl || !model || !apiKey) {
      return NextResponse.json({
        message:
          "Hi! I'm Echo, Apoorav's assistant — I'm not fully connected yet. " +
          "Reach out directly at apooravrao@gmail.com 👋",
      })
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
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
