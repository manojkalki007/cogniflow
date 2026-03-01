# COGNIFLOW Architecture

## Monorepo layout
- `apps/backend`: NestJS API + WebSocket gateway + BullMQ campaign queue + Prisma.
- `apps/frontend`: Next.js SaaS dashboard with page-level modules.
- `docs`: architecture and operations guidance.

## Backend domains
- `auth`: email/password auth, token issuance, oauth/password reset stubs.
- `agents`: AI voice agent management (prompt/template + provider config).
- `integrations`: telephony, CRM, payment provider registry and connector layer.
- `campaigns`: bulk outbound orchestration via Redis-backed queue.
- `dashboard`: KPI summary endpoints for real-time UI metrics.
- `billing`: credit usage and payment abstraction stubs.
- `public-api`: external API and webhook surface.
- `realtime`: WebSocket gateway for live latency and call updates.

## Voice pipeline (low latency)
1. Telephony media stream receives raw audio frames.
2. STT provider adapter transcribes incremental chunks.
3. Conversation orchestrator sends text to LLM.
4. TTS provider returns streaming audio with buffer control.
5. Audio playback supports barge-in/interruption and turn cancellation.
6. Call analytics and transcript events persist to PostgreSQL and stream to WebSocket.

## Scalability
- Multi-tenant entities keyed by `organizationId`.
- Queue-based campaign fanout with controllable concurrency.
- Stateless API service for horizontal scaling.
- Provider adapters isolate vendor APIs to allow future plug-ins.
