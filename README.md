# Yokai Monitor

Real-time dashboard for monitoring spirit anomalies across Tokyo districts. Displays spirits with threat levels, capture status, and live threat updates via Server-Sent Events.

## Tech Stack

**Core**: Next.js 16 (App Router), React 19, TypeScript

**State & Data**: TanStack Query 5, Zod validation

**Styling**: SCSS Modules, CSS custom properties

**Real-time**: Server-Sent Events (SSE)

**DevOps**: Docker, Docker Compose

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Run with Docker

```bash
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Flow

1. **View dashboard** → See spirit cards with threat levels and summary statistics
2. **Click "Capture"** → Optimistic update, 30% chance of error with rollback
3. **Wait ~5s** → Threat levels change automatically via SSE with smooth transitions

## Architecture

Strict Feature Sliced Design structure: `shared → entities → features → widgets → app`. Next.js Route Handlers provide mock REST API (`/api/spirits`) and SSE endpoint (`/api/spirits/stream`) for real-time threat updates. TanStack Query handles caching and optimistic updates. All data validated with Zod at API boundaries.

---

**Notes**: Mock data, demo-only API
