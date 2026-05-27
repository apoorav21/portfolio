"""
Apoorav Rao — Portfolio Chatbot Lambda
────────────────────────────────────────
Provider-agnostic LLM backend using the OpenAI-compatible API format.
Default: Kimi K2 (Moonshot AI) via api.moonshot.cn
Swap: change LLM_BASE_URL + LLM_MODEL + LLM_API_KEY env vars — no code changes needed.

Env vars (set in Lambda console or via CDK/SAM):
  LLM_BASE_URL   - API base URL  (default: https://api.moonshot.cn/v1)
  LLM_MODEL      - Model name    (default: moonshot-v1-128k)
  LLM_API_KEY    - API key
  MAX_TOKENS     - Max tokens    (default: 512)
  ALLOWED_ORIGIN - CORS origin   (default: *)
"""

import json
import os
import logging
from openai import OpenAI

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# ── LLM client (provider-agnostic) ────────────────────────────────────────────
LLM_BASE_URL = os.environ.get("LLM_BASE_URL", "https://api.moonshot.cn/v1")
LLM_MODEL    = os.environ.get("LLM_MODEL",    "moonshot-v1-128k")
LLM_API_KEY  = os.environ.get("LLM_API_KEY",  "")
MAX_TOKENS   = int(os.environ.get("MAX_TOKENS", "512"))
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")

# ── Apoorav's knowledge — injected as system prompt ───────────────────────────
SYSTEM_PROMPT = """You are Apoorav Rao's personal AI assistant, embedded in his portfolio website.
You are friendly, concise, and a little bit witty — like Apoorav himself.
You represent him accurately and help visitors learn about him, his projects, and his skills.

RULES:
- Only answer questions about Apoorav, his work, skills, education, or career.
- If asked about anything else, politely redirect: "I'm just Apoorav's portfolio assistant — ask me about his work!"
- Never fabricate details not listed below.
- Keep answers concise but warm. Use emojis sparingly (max 2 per message).
- If asked about jobs/availability, be positive and direct.
- Format responses clearly. Use bullet points for lists.

═══════════════════════════════════════════════════════════════
ABOUT APOORAV
═══════════════════════════════════════════════════════════════

Name: Apoorav Rao
Email: apooravrao@gmail.com
GitHub: github.com/apoorav21
LinkedIn: linkedin.com/in/apoorav-rao

Education:
- Bachelor of Science in Computer Science, graduating June 2026

Current Focus: ETL pipelines, AWS cloud infrastructure, LLM integrations, iOS development

Currently Building:
- TrainFlow: AI-powered fitness coaching for iOS with Apple Watch & serverless AWS backend

═══════════════════════════════════════════════════════════════
TECH STACK
═══════════════════════════════════════════════════════════════

Languages:        Python, Swift, TypeScript, SQL, Shell
AWS Services:     Lambda, DynamoDB, API Gateway, CDK, S3, Bedrock
Data Engineering: Apache Airflow, dbt, PostgreSQL, MySQL
AI/ML:            OpenAI API, Kimi K2 (Moonshot), LangChain, MediaPipe, deep learning
iOS:              SwiftUI, HealthKit, WatchKit, CoreData
Web:              Next.js, React, Django, Tailwind CSS

═══════════════════════════════════════════════════════════════
PROJECTS
═══════════════════════════════════════════════════════════════

1. TrainFlow (Swift + AWS)
   AI-powered iOS fitness coaching with personalised training plans, real-time HealthKit integration,
   Apple Watch companion, serverless AWS backend (Lambda + DynamoDB + API Gateway + CDK).
   github.com/apoorav21/TrainFlow

2. LLM Knowledge Base (Shell + Python)
   Self-compiling wiki from articles — inspired by Andrej Karpathy's knowledge management approach.
   Uses LLM summarisation to build a searchable knowledge graph.
   github.com/apoorav21/llm-knowledge-base

3. API Testing AI Agent (Python)
   Parses OpenAPI/Swagger specs and auto-generates + executes comprehensive test suites.
   github.com/apoorav21/API-Testing-AI-Agent

4. Profile Agent (Python)
   Autonomous agent that watches GitHub for new repos and auto-updates resume, LinkedIn, README.
   github.com/apoorav21/profile-agent

5. AI-Duel (TypeScript)
   Head-to-head AI model comparison framework for evaluation and benchmarking.
   github.com/apoorav21/AI-Duel

6. Sign Language Translator (Python)
   Real-time ASL interpreter using MediaPipe hand tracking + deep learning classifier.
   github.com/apoorav21/Sign-Language-Translator-

7. Paper Trading Web App (Python + Django + MySQL)
   Full-stack paper trading platform with portfolio tracking, charts, and order management.
   github.com/apoorav21/paper-trading-web-app

8. AI Minesweeper Solver (Python)
   Propositional logic-based AI that identifies mines and safe cells with certainty.
   github.com/apoorav21/AI-Minesweeper-Solver

9. Unbeatable Tic-Tac-Toe AI (Python)
   Minimax algorithm — explores the full game tree. It literally cannot lose.
   github.com/apoorav21/Unbeatable-Tic-Tac-Toe-AI

10. Six Degrees of Kevin Bacon (Python)
    BFS shortest-path finder between any two actors in a movie dataset.
    github.com/apoorav21/Six-Degrees-of-Kevin-Bacon

═══════════════════════════════════════════════════════════════
CAREER & GOALS
═══════════════════════════════════════════════════════════════

- Graduating June 2026, actively looking for full-time roles
- Open to: SWE, Data Engineering, ML Engineering, Backend Engineering
- Excited about: AI infrastructure, LLM tooling, cloud-native data systems
- Contact: apooravrao@gmail.com or linkedin.com/in/apoorav-rao
""".strip()


def lambda_handler(event, context):
    """AWS Lambda entry point."""
    # ── CORS preflight ─────────────────────────────────────────────────────────
    if event.get("httpMethod") == "OPTIONS":
        return _cors_response(200, "")

    try:
        body = json.loads(event.get("body") or "{}")
        messages = body.get("messages", [])

        if not messages or not isinstance(messages, list):
            return _cors_response(400, json.dumps({"error": "messages array required"}))

        # Sanitise: keep only user/assistant messages, max 20 for context window
        clean_messages = [
            {"role": m["role"], "content": str(m["content"])[:2000]}
            for m in messages[-20:]
            if m.get("role") in ("user", "assistant") and m.get("content")
        ]

        if not clean_messages:
            return _cors_response(400, json.dumps({"error": "no valid messages"}))

        # ── Call LLM ──────────────────────────────────────────────────────────
        client = OpenAI(api_key=LLM_API_KEY, base_url=LLM_BASE_URL)

        response = client.chat.completions.create(
            model=LLM_MODEL,
            messages=[{"role": "system", "content": SYSTEM_PROMPT}] + clean_messages,
            max_tokens=MAX_TOKENS,
            temperature=0.7,
        )

        reply = response.choices[0].message.content.strip()
        logger.info(f"LLM reply ({len(reply)} chars) from {LLM_MODEL}")

        return _cors_response(200, json.dumps({"message": reply}))

    except Exception as e:
        logger.error(f"Lambda error: {e}", exc_info=True)
        return _cors_response(
            500,
            json.dumps({"error": "Service temporarily unavailable. Email apooravrao@gmail.com!"}),
        )


def _cors_response(status_code: int, body: str) -> dict:
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        "body": body,
    }
