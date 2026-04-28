# Vercel + Prisma production flow

Use Prisma migrations for production instead of `db push`.

## Local development

When schema changes:

```bash
npx prisma migrate dev --name your_change_name
npx prisma generate
```

Commit:

- `prisma/schema.prisma`
- `prisma/migrations/**`

## Vercel deployment

Set Vercel build command to:

```bash
npm run build:vercel
```

This command runs:

1. `prisma generate`
2. `prisma migrate deploy`
3. `next build`

Required environment variables in Vercel:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`

## Existing project bootstrap

If production DB is already running and missing tables, run once against production DB:

```bash
npx prisma migrate deploy
```

Then verify API writes in logs and check inserted rows in `ContactRequest`.
