# Stock API — Security / administration

## Changes to privileged operations

The project currently has a global inventory and a user schema without role or tenant relations. To avoid permitting every registered user to mutate shared inventory, all category/product create, update, delete and sale routes now require two checks:
1. A valid JWT (`isAuthenticated`).
2. The JWT subject ID is included in `STOCK_ADMIN_USER_IDS` (comma-separated IDs).

Example (replace values with real administrator User IDs):
```sh
STOCK_ADMIN_USER_IDS=user-id-one,user-id-two
```

Without this environment variable, **all inventory writes return HTTP 403**. This is intentional fail-closed behavior. Reads still require authentication. Never use email addresses or a client-provided role to decide privileges.

## Local data

`stock-api/prisma/dev.db` was committed previously. It is no longer tracked in the proposed branch and SQLite files are ignored. **The old blob still exists in Git history**. Audit the old database for real data, reset any compromised credentials, and coordinate history rewriting if it held sensitive content. Do not use public git history as a database backup. Run `npx prisma migrate dev` in `stock-api` to regenerate local development data.

## Risk remaining

- Shared read access is not tenant-isolated. Add organization ownership to models and check it in every read/write if the app becomes multi-tenant.
- JWT is still stateless: issuance is limited to 1 day, but server-side revocation has not been implemented.
- Limit login attempts, configure restrictive CORS and run dependency audits before internet-facing deployment.

## Regression checks

Run `node --test stock-api/tests/security.test.cjs` at the repo root. The tests are static regression checks, **not** a substitute for authorization integration tests against Prisma.
