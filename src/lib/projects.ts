export type AnimationType =
  | 'trainflow'
  | 'llmkb'
  | 'apitesting'
  | 'profileagent'
  | 'aiduel'
  | 'signlanguage'
  | 'papertrading'
  | 'cashflow';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  bullets: string[];
  tags: string[];
  github: string;
  language: string;
  featured: boolean;
  animation: AnimationType;
  accentColor: string;
  caseStudy?: string;
}

export const projects: Project[] = [
  {
    id: 'cash-tracking-app',
    title: 'Cashflow',
    description: 'Voice-driven money tracker — speak a transaction in Hindi or English and AI parses, classifies, and saves it.',
    longDescription:
      'An Android-first (Capacitor) personal finance app where you speak to log transactions. Amazon Transcribe streams your words live; a Lambda calls Claude on Bedrock to parse them into a structured draft you review before saving. Includes Munshi — a Hindi/English AI accounting assistant that knows your full transaction history and computes interest the Indian way (रुपया सैकड़ा). Deployed on AWS with DynamoDB, CloudFormation, and an offline-first fallback.',
    bullets: [
      'Live speech-to-text via Amazon Transcribe streaming — words appear as you speak',
      'Claude (Bedrock) parses voice to structured JSON, streamed token-by-token into an editable preview',
      'Munshi: bilingual AI assistant with full transaction context + Indian interest math (सैकड़ा convention)',
      'DynamoDB cloud sync + offline fallback — works without internet using on-device parser',
    ],
    tags: ['AWS Bedrock', 'Claude', 'Amazon Transcribe', 'DynamoDB', 'Capacitor', 'Android', 'Kimi AI'],
    github: 'https://github.com/apoorav21/cash-tracking-app',
    language: 'JavaScript',
    featured: true,
    animation: 'cashflow',
    accentColor: '#F2784B',
    caseStudy: '/cashflow',
  },
  {
    id: 'trainflow',
    title: 'TrainFlow',
    description: 'AI-powered fitness coaching for iOS with Apple Watch and a fully serverless AWS backend.',
    longDescription:
      'A production-grade iOS application that ingests 20+ Apple HealthKit biometrics daily and serves them to an agentic AI coaching loop. A context builder pre-loads user health and training snapshots, a tool executor dispatches up to 5 OpenAI function-calling rounds per request, and a secondary model generates plain-English health summaries. User identities are extracted from Cognito JWT claims — never request bodies.',
    bullets: [
      '24 Lambda functions + 6 DynamoDB tables deployed via CDK',
      'Agentic loop: up to 5 OpenAI function-calling rounds per coaching request',
      'Apple Watch companion syncing biometrics in real time via HealthKit',
      'Cognito JWT authentication — zero PII in request bodies',
    ],
    tags: ['Swift', 'AWS Lambda', 'DynamoDB', 'CDK', 'OpenAI', 'HealthKit', 'Cognito'],
    github: 'https://github.com/apoorav21/TrainFlow',
    language: 'Swift',
    featured: true,
    animation: 'trainflow',
    accentColor: '#f97316',
  },
  {
    id: 'llmkb',
    title: 'LLM Knowledge Base',
    description: 'Self-compiling wiki from raw articles — drop text in, get a structured knowledge graph out.',
    longDescription:
      'A shell-powered pipeline inspired by Andrej Karpathy\'s knowledge management approach. It ingests raw articles, runs LLM summarisation and keyword tagging on each one, then stitches the outputs into an interconnected wiki with cross-linked entries. The result is a fully queryable, self-updating knowledge graph that grows every time you drop a new document in.',
    bullets: [
      'Zero-configuration ingestion — drop any article into the watch folder',
      'LLM-powered summarisation, tagging, and cross-reference extraction',
      'Outputs a browsable static wiki with bidirectional links',
      'Inspired by Karpathy\'s personal knowledge management patterns',
    ],
    tags: ['Shell', 'Python', 'LLM', 'Knowledge Graph', 'Karpathy'],
    github: 'https://github.com/apoorav21/llm-knowledge-base',
    language: 'Shell',
    featured: true,
    animation: 'llmkb',
    accentColor: '#8b5cf6',
  },
  {
    id: 'apitesting',
    title: 'API Testing AI Agent',
    description: 'Parse an OpenAPI spec, auto-generate exhaustive test suites, run them, and get a pass/fail report.',
    longDescription:
      'An AI agent that reads OpenAPI/Swagger specifications and autonomously generates comprehensive test suites covering happy paths, edge cases, auth failures, and schema validation errors. It executes the generated tests against live endpoints and produces a structured report with per-endpoint pass rates and failure diagnostics — no manual test writing required.',
    bullets: [
      'Parses OpenAPI 3.x and Swagger 2.0 specs automatically',
      'Generates tests for happy path, error codes, edge cases, and auth failures',
      'Executes tests against live endpoints and captures response diffs',
      'Produces structured pass/fail report with failure diagnostics',
    ],
    tags: ['Python', 'OpenAI', 'API Testing', 'OpenAPI', 'Automation'],
    github: 'https://github.com/apoorav21/API-Testing-AI-Agent',
    language: 'Python',
    featured: true,
    animation: 'apitesting',
    accentColor: '#10b981',
  },
  {
    id: 'profileagent',
    title: 'Profile Agent',
    description: 'Autonomous personal branding — monitors GitHub, then syncs your resume, LinkedIn, and README in one shot.',
    longDescription:
      'An autonomous agent that monitors GitHub for new repositories, analyzes each project\'s README, languages, and screenshots, and generates a LinkedIn post, edits a LaTeX resume, and updates the GitHub profile README — all in a single GPT-4o call. The agent reads the full history of past posts before generating anything so tone rotates and content never repeats. Runs daily via macOS launchd; the resume compiles to a one-page PDF via Tectonic with automatic project rotation.',
    bullets: [
      'Monitors GitHub via webhooks and daily polling — triggers on new repos',
      'Single GPT-4o call generates LinkedIn post + resume edit + README update',
      'Reads full post history before writing — ensures non-repeating, rotating tone',
      'Resume auto-compiles to PDF via Tectonic with one-page constraint enforced',
    ],
    tags: ['Python', 'GPT-4o', 'GitHub API', 'LinkedIn API', 'LaTeX', 'SQLite', 'launchd'],
    github: 'https://github.com/apoorav21/profile-agent',
    language: 'Python',
    featured: false,
    animation: 'profileagent',
    accentColor: '#3b82f6',
  },
  {
    id: 'aiduel',
    title: 'AI-Duel',
    description: 'Head-to-head LLM evaluation — same prompt, multiple models, consistent scoring side-by-side.',
    longDescription:
      'A model evaluation framework that fans the same prompt out to multiple LLMs in parallel, renders their outputs side-by-side with token counts and latency, and applies a configurable scoring rubric. Designed to make switching between model providers fast and evidence-based — see exactly where GPT-4o beats Claude or vice versa on your specific workload.',
    bullets: [
      'Parallel inference — sends one prompt to N models simultaneously',
      'Side-by-side diff view with latency, token count, and cost estimates',
      'Configurable scoring rubric: factuality, tone, length, task completion',
      'Export results as JSON for downstream analysis or CI/CD integration',
    ],
    tags: ['TypeScript', 'LLM', 'Evaluation', 'Multi-model', 'Benchmarking'],
    github: 'https://github.com/apoorav21/AI-Duel',
    language: 'TypeScript',
    featured: false,
    animation: 'aiduel',
    accentColor: '#ef4444',
  },
  {
    id: 'signlanguage',
    title: 'Sign Language Translator',
    description: 'Real-time ASL interpretation using MediaPipe hand tracking and a custom deep learning classifier.',
    longDescription:
      'A computer vision pipeline that captures hand landmarks in real time using MediaPipe, normalises the 21-point hand skeleton to a pose-invariant feature vector, and feeds it into a custom-trained neural network that classifies ASL gestures with high accuracy. The system runs at 30fps on a laptop CPU and outputs translated text with confidence scores displayed live on screen.',
    bullets: [
      '21-keypoint hand skeleton extracted via MediaPipe at 30fps',
      'Custom neural network trained on a normalised ASL dataset',
      'Pose-invariant feature extraction — works regardless of hand size or distance',
      'Live on-screen overlay showing gesture class and confidence score',
    ],
    tags: ['Python', 'MediaPipe', 'Deep Learning', 'OpenCV', 'Computer Vision'],
    github: 'https://github.com/apoorav21/Sign-Language-Translator-',
    language: 'Python',
    featured: false,
    animation: 'signlanguage',
    accentColor: '#06b6d4',
  },
  {
    id: 'papertrading',
    title: 'Paper Trading Web App',
    description: 'Full-stack stock trading simulator built with Django and MySQL — trade risk-free with live market data.',
    longDescription:
      'A full-stack paper trading platform that simulates real market conditions. Users start with a virtual portfolio and can place market/limit orders, track P&L over time, and review candlestick charts with technical indicators. The Django backend handles order matching, portfolio accounting, and historical data storage — making it a realistic environment for developing and backtesting trading strategies.',
    bullets: [
      'Django REST backend with real-time order matching and portfolio accounting',
      'Candlestick charts with moving averages and volume indicators',
      'Supports market orders, limit orders, and stop-loss triggers',
      'Full trade history with P&L analysis per position',
    ],
    tags: ['Python', 'Django', 'MySQL', 'REST API', 'Bootstrap'],
    github: 'https://github.com/apoorav21/paper-trading-web-app',
    language: 'Python',
    featured: false,
    animation: 'papertrading',
    accentColor: '#f59e0b',
  },
];
