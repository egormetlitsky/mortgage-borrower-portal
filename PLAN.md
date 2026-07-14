# Plan

## Stack
- Backend: FastAPI
- Frontend: Angular
- Persistence: SQLite
- Deploy: Railway

## Data model
- `Borrower` — email, hashed password
- `Application` — FK to Borrower, status, multi-step form fields (property value, income, loan amount, term, etc.)
- `Document` — FK to Application, filename, storage path
- Simulation is stateless (computed on request, not persisted)

## Flows
1. **Simulate** — loan amount, rate, term -> amortization calc. No auth required.
2. **Sign up** — email/password, JWT or session cookie. No email verification (stubbed, noted in README).
3. **Apply** — multi-step form tied to the logged-in borrower (personal details -> property -> income).
4. **Upload** — attach a file to an application. Local disk storage (S3 would be a named cut).

## Time budget (~2h active)
- Scaffold: ~15m
- FastAPI (models + 4 endpoints + auth): ~45m
- Angular (4 views wired to the API): ~45m
- Deploy + README: ~15m

## Known cuts (to restate honestly in the README)
- No email verification on sign-up
- Local disk storage for documents, not S3
- SQLite, not Postgres
