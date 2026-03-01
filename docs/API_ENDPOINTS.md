# API Endpoints (v1)

## Auth
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/google` (stub)
- `POST /api/v1/auth/forgot-password` (stub)

## Dashboard
- `GET /api/v1/dashboard`
- `GET /api/v1/dashboard/architecture`

## Agents
- `GET /api/v1/agents`
- `GET /api/v1/agents/architecture`

## Integrations
- `GET /api/v1/integrations`
- `GET /api/v1/integrations/architecture`

## Campaigns
- `GET /api/v1/campaigns`
- `POST /api/v1/campaigns/:id/start`
- `GET /api/v1/campaigns/architecture`

## Billing
- `GET /api/v1/billing`
- `GET /api/v1/billing/architecture`

## Public API
- `GET /api/v1/public-api`
- `GET /api/v1/public-api/architecture`

## Realtime (WebSocket)
- Namespace: `/realtime`
- Event in: `call:latency`
- Event out: `call:latency:update`

Swagger UI: `/api/docs`
