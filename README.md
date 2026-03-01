# COGNIFLOW — AI Calling Agent Platform

Production-grade full-stack SaaS starter for building real-time AI voice agents, telephony integrations, outbound campaigns, analytics, and CRM sync.

## Folder structure

```text
.
├── apps
│   ├── backend         # NestJS API, WebSocket, BullMQ, Prisma
│   └── frontend        # Next.js (App Router) + Tailwind dashboard
├── docs
│   ├── API_ENDPOINTS.md
│   └── ARCHITECTURE.md
├── .env.example
└── package.json
```

## Core capabilities
- Multi-tenant SaaS foundation (Organization-scoped data model).
- JWT auth with signup/login and OAuth/reset stubs.
- Functional agent builder UI + API with model dropdowns and create actions (LLM/STT/TTS).
- Interactive telephony/CRM connection controls (connect/disconnect actions).
- Campaign creation/start flows with live monitor cards and progress state.
- WebSocket channel for low-latency call telemetry.
- Swagger/OpenAPI docs for API-first integrations.

## Local setup

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis 7+

### Install
```bash
npm install
cp .env.example .env
```

### Database
```bash
npm run prisma:generate --workspace @cogniflow/backend
npm run prisma:migrate --workspace @cogniflow/backend
```

### Run
```bash
npm run dev
```
Frontend: `http://localhost:3000`  
Backend: `http://localhost:4000/api/v1`  
Swagger: `http://localhost:4000/api/docs`

## Deployment notes
- Build artifacts:
  - `npm run build --workspace @cogniflow/backend`
  - `npm run build --workspace @cogniflow/frontend`
- Deploy backend as stateless containers with autoscaling.
- Use managed PostgreSQL + Redis.
- Terminate TLS at ingress/load balancer.
- Configure secure env vars via secrets manager.
- Add background workers for `campaign-jobs` queue.

## Future production hardening
- Strict RBAC decorators/guards per endpoint.
- Full OAuth flow and email verification delivery.
- Provider SDK implementations for each integration.
- Advanced audio DSP/noise suppression hooks in media pipeline.
- SLO dashboards + distributed tracing.
