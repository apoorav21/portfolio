import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/chatbot-knowledge'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb'

// ── Config (compiled in at build time via amplify.yml) ───────────────────────
let LLM_BASE_URL: string
let LLM_MODEL: string
let LLM_API_KEY: string
let DYNAMO_ACCESS_KEY: string
let DYNAMO_SECRET_KEY: string
let DYNAMO_REGION: string

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const cfg = require('@/generated/config')
  LLM_BASE_URL      = cfg.LLM_BASE_URL      || process.env.LLM_BASE_URL      || ''
  LLM_MODEL         = cfg.LLM_MODEL         || process.env.LLM_MODEL         || ''
  LLM_API_KEY       = cfg.LLM_API_KEY       || process.env.LLM_API_KEY       || ''
  DYNAMO_ACCESS_KEY = cfg.DYNAMO_ACCESS_KEY  || process.env.DYNAMO_ACCESS_KEY || ''
  DYNAMO_SECRET_KEY = cfg.DYNAMO_SECRET_KEY  || process.env.DYNAMO_SECRET_KEY || ''
  DYNAMO_REGION     = cfg.DYNAMO_REGION      || process.env.DYNAMO_REGION     || 'ap-south-1'
} catch {
  LLM_BASE_URL      = process.env.LLM_BASE_URL      || ''
  LLM_MODEL         = process.env.LLM_MODEL         || ''
  LLM_API_KEY       = process.env.LLM_API_KEY       || ''
  DYNAMO_ACCESS_KEY = process.env.DYNAMO_ACCESS_KEY || ''
  DYNAMO_SECRET_KEY = process.env.DYNAMO_SECRET_KEY || ''
  DYNAMO_REGION     = process.env.DYNAMO_REGION     || 'ap-south-1'
}

// ── DynamoDB client (lazy-initialised once per Lambda warm instance) ──────────
let docClient: DynamoDBDocumentClient | null = null

function getDynamoClient(): DynamoDBDocumentClient | null {
  if (!DYNAMO_ACCESS_KEY || !DYNAMO_SECRET_KEY) return null
  if (docClient) return docClient
  const raw = new DynamoDBClient({
    region: DYNAMO_REGION || 'ap-south-1',
    credentials: {
      accessKeyId:     DYNAMO_ACCESS_KEY,
      secretAccessKey: DYNAMO_SECRET_KEY,
    },
  })
  docClient = DynamoDBDocumentClient.from(raw)
  return docClient
}

// ── Save chat (fire-and-forget — never block the response) ───────────────────
async function saveChat(
  sessionId: string,
  messages: ChatMessage[],
  req: NextRequest,
) {
  const client = getDynamoClient()
  if (!client || !sessionId) return

  const now = new Date().toISOString()
  const ua  = req.headers.get('user-agent') ?? 'unknown'

  try {
    await client.send(new UpdateCommand({
      TableName: 'portfolio-chats',
      Key: { sessionId },
      UpdateExpression:
        'SET messages = :msgs, lastUpdated = :now, userAgent = :ua, ' +
        'startedAt = if_not_exists(startedAt, :now)',
      ExpressionAttributeValues: {
        ':msgs': messages,
        ':now':  now,
        ':ua':   ua,
      },
    }))
  } catch (err) {
    // Never let storage failure break the chat
    console.error('DynamoDB save error:', err)
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// ── POST /api/chat ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: { messages: ChatMessage[]; sessionId?: string } = await req.json()
    const { messages, sessionId } = body

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
        max_tokens: 8000,
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

    const data  = await response.json()
    const msg   = data.choices?.[0]?.message
    const reply = msg?.content || msg?.reasoning_content || "I'm not sure how to answer that!"

    const fullConversation: ChatMessage[] = [
      ...messages,
      { role: 'assistant', content: reply },
    ]

    // Await before returning — Lambda freezes after response, so fire-and-forget never completes
    await saveChat(sessionId ?? '', fullConversation, req)

    return NextResponse.json({ message: reply })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again!' },
      { status: 500 },
    )
  }
}
