# AI ClearNotes

A TypeScript monorepo for an AI-focused journaling backend with a dedicated API app, a worker app, and shared database libraries.

## Stack

- NestJS (API + Worker architecture)
- TypeScript
- PostgreSQL + Drizzle ORM
- Redis (ready for queue/worker flow, BullMQ-friendly setup)
- Turborepo + npm workspaces

## Repository Structure

```text
apps/
  api/       # HTTP API (controllers, validation, auth/services)
  worker/    # Background worker process (queue processors/jobs)
libs/
  db/        # Shared DB module, schema and repositories
```

## Features Implemented

- Shared DB layer in `libs/db`:
  - Drizzle client + Nest global provider (`DbModule`)
  - User, notes, and journal repositories
- API modules for:
  - Users
  - Notes
  - Journal
- Validation with Zod in API layer
- Password change flow with hash verification and update logic

## Prerequisites

- Node.js 20+
- npm 10+
- Docker (optional, recommended for local DB/Redis)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the project root (example):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/journal
PORT=3000
```

3. Start infrastructure (PostgreSQL + Redis):

```bash
docker compose up -d
```

## Run Apps

API:

```bash
npm --workspace api run start:dev
```

Worker:

```bash
npm --workspace worker run start:dev
```

## Database (Drizzle)

Generate migrations:

```bash
npx drizzle-kit generate
```

Apply migrations:

```bash
npx drizzle-kit migrate
```

Configuration is in `drizzle.config.ts`.

## Scripts

For each app (`api`, `worker`):

- `npm --workspace <app> run build`
- `npm --workspace <app> run start:dev`
- `npm --workspace <app> run test`
- `npm --workspace <app> run lint`

## Architecture Notes

- `apps/api` should stay focused on HTTP concerns: controllers, DTO/validation, auth, request orchestration.
- `apps/worker` should process asynchronous/background work (queues, retries, scheduled jobs).
- `libs/db` is shared so both apps use one DB contract.

## Next Step (Recommended)

- Add BullMQ queue module and processors in `apps/worker`.
- Add producer layer in `apps/api` to enqueue jobs to Redis.

