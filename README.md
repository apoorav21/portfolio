# Apoorav Rao — Personal Portfolio

A clean, minimal portfolio site with project-specific animations and an AI chatbot powered by **Kimi K2** on AWS.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| Chatbot UI | Pixel art avatar + chat window (built-in) |
| Backend | AWS Lambda + API Gateway |
| LLM | Kimi K2 (Moonshot AI) — provider-agnostic |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          — Root layout + metadata
│   ├── page.tsx            — Main page (all sections)
│   ├── globals.css         — Global styles + animations
│   └── api/chat/route.ts   — Chatbot proxy → AWS Lambda
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── animations/
│   │   ├── TrainFlowAnimation.tsx     — iOS activity rings
│   │   ├── LLMKBAnimation.tsx         — Knowledge graph nodes
│   │   ├── APITestingAnimation.tsx    — Terminal test runner
│   │   ├── ProfileAgentAnimation.tsx  — Sync arrows
│   │   ├── AIDuelAnimation.tsx        — Side-by-side models
│   │   ├── SignLanguageAnimation.tsx  — Hand → text
│   │   ├── PaperTradingAnimation.tsx  — Candlestick chart
│   │   ├── MinesweeperAnimation.tsx   — Grid solving
│   │   └── TicTacToeAnimation.tsx     — AI vs human
│   └── Chatbot/
│       ├── index.tsx         — Chatbot container + bubble
│       ├── PixelAvatar.tsx   — Pixel art robot character
│       └── ChatWindow.tsx    — Chat interface
├── lib/
│   ├── projects.ts           — All project data
│   └── chatbot-knowledge.ts  — System prompt for chatbot
aws/
├── lambda/chatbot/
│   ├── index.py              — Lambda handler (provider-agnostic)
│   └── requirements.txt      — openai package
└── README.md                 — AWS setup guide
```

## Chatbot Setup

See [aws/README.md](aws/README.md) for full instructions.

**TL;DR:**
1. Create Lambda with `aws/lambda/chatbot/index.py`
2. Set `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL` env vars
3. Put API Gateway URL in `.env.local`:
   ```
   NEXT_PUBLIC_CHATBOT_API_URL=https://xxx.execute-api.us-east-1.amazonaws.com/prod/chat
   ```

## Switching LLM

Change 3 Lambda env vars — no code edits:

```bash
# Kimi K2 (default)
LLM_BASE_URL=https://api.moonshot.cn/v1
LLM_MODEL=moonshot-v1-128k

# OpenAI
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o

# Anthropic Claude
LLM_BASE_URL=https://api.anthropic.com/v1
LLM_MODEL=claude-sonnet-4-6
```

## Deploy

```bash
# Vercel (easiest)
npx vercel

# Or build locally
npm run build
npm start
```
