# AWS Backend — Chatbot Setup

The chatbot is powered by **Kimi K2** (Moonshot AI) via an AWS Lambda + API Gateway.  
The architecture is **provider-agnostic** — swap the LLM by changing 3 env vars.

---

## Architecture

```
Browser (Next.js)
    ↓ POST /api/chat
Next.js API Route (/app/api/chat/route.ts)
    ↓ POST
AWS API Gateway (REST, prod stage)
    ↓
AWS Lambda (Python 3.11)
    ↓ OpenAI-compatible API call
Kimi K2 / Moonshot AI  ← swap with any OpenAI-compatible LLM
```

---

## Quick Deploy (AWS Console)

### 1. Create the Lambda function

1. Go to **AWS Lambda → Create function**
2. Runtime: **Python 3.11**
3. Copy `aws/lambda/chatbot/index.py` into the inline editor

### 2. Package dependencies

```bash
cd aws/lambda/chatbot
pip install -r requirements.txt -t ./package/
cp index.py ./package/
cd package && zip -r ../chatbot.zip .
```

Upload `chatbot.zip` to Lambda.

### 3. Set environment variables

In Lambda → Configuration → Environment variables, add:

| Key              | Value                              |
|------------------|------------------------------------|
| `LLM_BASE_URL`   | `https://api.moonshot.cn/v1`       |
| `LLM_MODEL`      | `moonshot-v1-128k`                 |
| `LLM_API_KEY`    | Your Moonshot API key              |
| `MAX_TOKENS`     | `512`                              |
| `ALLOWED_ORIGIN` | `https://your-domain.com`          |

### 4. Create API Gateway

1. **API Gateway → Create API → REST API**
2. Create resource `/chat`, method **POST** → Lambda proxy integration
3. Enable **CORS**
4. Deploy to stage `prod`
5. Copy the **Invoke URL** — it looks like:
   `https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/chat`

### 5. Add URL to Next.js

Create `.env.local` (copy from `.env.example`):

```bash
NEXT_PUBLIC_CHATBOT_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/chat
```

---

## Switching LLM Providers

Just update Lambda env vars — **no code changes**:

### OpenAI (GPT-4o)
```
LLM_BASE_URL = https://api.openai.com/v1
LLM_MODEL    = gpt-4o
LLM_API_KEY  = sk-your-openai-key
```

### Anthropic (Claude Sonnet)
```
LLM_BASE_URL = https://api.anthropic.com/v1
LLM_MODEL    = claude-sonnet-4-6
LLM_API_KEY  = sk-ant-your-anthropic-key
```

### Any other OpenAI-compatible API
```
LLM_BASE_URL = https://your-provider.com/v1
LLM_MODEL    = your-model-name
LLM_API_KEY  = your-api-key
```

---

## Lambda IAM Permissions

The Lambda only needs basic execution permissions.  
No AWS services are called (just external LLM API) — minimal blast radius.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

---

## Deploying the Next.js Frontend

### Option A — Vercel (recommended, free)
```bash
npx vercel
```
Set `NEXT_PUBLIC_CHATBOT_API_URL` in Vercel's environment variables.

### Option B — AWS S3 + CloudFront
```bash
npm run build
npm run export  # static export if needed
aws s3 sync .next/static s3://your-bucket
```
(Configure CloudFront to serve `_next/static`)

---

## Get your Moonshot API key

Sign up at **platform.moonshot.cn** and create an API key.  
Kimi K2 (`moonshot-v1-128k`) has a 128k context window — perfect for the knowledge base.
