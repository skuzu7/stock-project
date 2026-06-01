# Stock Management

A full-stack inventory management application with a REST API backend and a web frontend.

## Tech stack

**Backend (`stock-api`)**
- Node.js + Express
- TypeScript
- Prisma ORM
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcryptjs`)

**Frontend (`stock-frontend`)**
- Angular 15
- PrimeNG component library + PrimeFlex
- ngx-translate (i18n)
- FontAwesome icons

## Getting started

### Prerequisites

- Node.js 18+
- Yarn (backend) / npm (frontend)

### Backend

```bash
cd stock-api
yarn install
npx prisma migrate dev
yarn dev
```

The API will be available at `http://localhost:3000` (default Express port).

### Frontend

```bash
cd stock-frontend
npm install
npm start
```

Navigate to `http://localhost:4200`.

## Project structure

```
stock-project/
├── stock-api/        # Express + Prisma REST API
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── services/
│       └── routes.ts
└── stock-frontend/   # Angular SPA
    └── src/
```
