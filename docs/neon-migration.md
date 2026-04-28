# Neon migration

This project already uses Prisma with PostgreSQL, so the main migration work is switching runtime environment variables and moving the existing data.

## 1. Create a Neon database

Create a new Neon project and copy two connection strings:

- `DATABASE_URL`: pooled connection string (`-pooler`, with `pgbouncer=true`)
- `DATABASE_URL_UNPOOLED`: direct connection string without pooler

Example values are provided in `.env.example`.

## 2. Configure local environment

Create `.env` from `.env.example` and fill in your Neon credentials.

```bash
cp .env.example .env
```

Then generate the Prisma client if needed:

```bash
bun run db:generate
```

## 3. Apply schema to Neon

If this is a fresh Neon database:

```bash
bun run db:push
```

If you add Prisma migrations later, use:

```bash
bun run db:migrate
```

## 4. Move data from Vercel Postgres

Recommended approach:

1. Export data from the current Vercel/Postgres database with `pg_dump`.
2. Import it into Neon with `psql` or `pg_restore`.
3. Run a quick smoke test against the app using the Neon `.env`.

Example:

```bash
pg_dump "$OLD_DATABASE_URL" > vercel-export.sql
psql "$DATABASE_URL_UNPOOLED" < vercel-export.sql
```

## 5. Configure deployment

Set these variables in the deployment environment:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`

Production startup now requires an external PostgreSQL connection and no longer falls back to a packaged local database.

## 6. Verify after cutover

- Run the app locally with Neon credentials.
- Check create/read/update flows.
- Confirm Prisma commands work:

```bash
bun run db:generate
bun run db:push
```
