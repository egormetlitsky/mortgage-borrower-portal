# Mortgage Borrower Portal

A small take-home exercise: a borrower-facing portal covering four flows —
simulate a loan, sign up, apply, and upload a document.

## Live deploy

- Frontend: https://frontend-production-78f55.up.railway.app
- Backend (Swagger UI): https://mortgage-borrower-portal-production.up.railway.app/docs

## Stack

- Backend: FastAPI, async SQLAlchemy + aiosqlite, JWT auth (`HTTPBearer`)
- Frontend: Angular 20 (standalone components + signals)
- Persistence: SQLite
- Deploy: Railway, two services (backend + frontend), each built from its own
  Dockerfile

## Flows

1. **Simulate** — loan amount, rate, term → amortization calc. No auth required.
2. **Sign up / log in** — email + password, JWT returned and attached to
   subsequent requests via an HTTP interceptor.
3. **Apply** — multi-step form tied to the logged-in borrower (personal
   details → property → income).
4. **Upload** — attach a file to an application, stored on local disk.

## Running locally

Backend (Docker):

```bash
docker compose up -d
```

Frontend:

```bash
cd frontend
npm install
npm start   # http://localhost:4200
```

The frontend talks to `http://localhost:8000` locally and to the deployed
backend URL in production, via `src/environments/environment.ts` /
`environment.prod.ts` (swapped through Angular's `fileReplacements`).

## Known cuts

- **No email verification on sign-up.** Stubbed — any email is accepted as-is.
- **Local disk storage for documents, not S3.** Fine for a demo; would not
  survive a redeploy or scale past one instance.
- **SQLite, not Postgres.** Simple for a 2-hour build. On Railway this also
  means the database has **no persistent volume attached** — every redeploy
  starts from an empty database. A real deploy would mount a Railway volume
  at `/app/data` or move to a managed Postgres instance.
- **`serve` as the frontend's production web server.** A plain static-file
  server behind Railway's edge; no caching headers or compression tuning
  beyond its defaults.
- **No CI.** Deploys are manual (`railway up`) from a local machine, not
  triggered by a push.

## Time budget

Built in roughly the 2-hour active-time budget from the brief: scaffold,
FastAPI (models + 4 endpoints + auth), Angular (4 views wired to the API),
then deploy + this README.
