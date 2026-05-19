# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a Lerna monorepo with two packages:

- **`frontend/`** — Next.js 14 personal site (deployed to Netlify)
- **`backend/`** — PocketBase CMS instance (deployed to Fly.io as `personal-site-pocketbase`)

### Frontend structure

```
frontend/
  src/
    app/           # Next.js App Router pages (server components)
    components/    # Shared UI components
    lib/           # formatDate, generateRssFeed, constants
    styles/        # Tailwind CSS entry
    pages/         # Legacy Pages Router (_app.jsx, _document.jsx, thank-you.jsx)
  util/            # Shared utilities (api.js, media.js, formatDate.js)
  hashnode/        # Hashnode GraphQL queries and normalizers
  public/          # Static assets
```

### Data sources

Pages fetch data from two external sources at request time (server components):

1. **PocketBase** (`util/api.js` → `fetchAPI`) — stores jobs, home images, projects, tools, tool categories, and about me content. The base URL is `NEXT_PUBLIC_POCKETBASE_URL`.
2. **Hashnode** (`hashnode/queries/`) — blog articles fetched via GraphQL using `graphql-request`. The API URL is `NEXT_PUBLIC_HASHNODE_API_URL` and the publication host is `NEXT_PUBLIC_HASHNODE_HOST`.

### Path aliases

From `jsconfig.json`:
- `@/*` → `src/*` (e.g., `@/components/Card`)
- `util/*` and `hashnode/*` resolve from the `frontend/` root (not under `src/`)

### Backend

PocketBase runs as a single binary in a Docker container. The `backend/Dockerfile` pulls a specific PocketBase version and serves on port 8080. Data persists via a mounted volume at `/app/pb_data`. Locally it runs on port 8090 (see `util/api.js` fallback).

## Commands

### Root (runs both packages in parallel)
```bash
npm run dev        # starts frontend (next dev) + backend in parallel via Lerna
```

### Frontend only
```bash
cd frontend
yarn dev           # next dev
yarn build         # next build
yarn lint          # next lint
```

### Backend only
```bash
cd backend
docker-compose up  # runs PocketBase on port 8080
```

## Environment variables

Create `frontend/.env.local` with:

```
NEXT_PUBLIC_POCKETBASE_URL=http://localhost:8090/api
NEXT_PUBLIC_HASHNODE_API_URL=https://gql.hashnode.com
NEXT_PUBLIC_HASHNODE_HOST=<your-hashnode-publication-host>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_STRAPI_API_URL` is a legacy variable referenced in `util/api.js` but no longer actively used.

## Styling

Tailwind CSS with `darkMode: 'class'` and `@tailwindcss/typography`. Custom prose styles are defined directly in `tailwind.config.js` rather than a separate CSS file. The accent color throughout the site is `teal-500`.
