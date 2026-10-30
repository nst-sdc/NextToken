# Architecture

## Flow
```
Sources (RSS / APIs)
   -> Ingestion job (cron, every 1-2 hrs)
   -> Dedupe + clean
   -> AI summarizer (LLM API)
   -> Database
   -> API routes
   -> React frontend
```

## Tech stack
| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind | One codebase for UI and API, beginner friendly |
| Backend | Next.js API routes + a cron worker | No separate server to manage |
| Database | Supabase (Postgres) | Free tier, auth built in |
| AI | LLM API (Claude or Gemini free tier) | Summaries and "why it matters" |
| Jobs | GitHub Actions cron or Vercel Cron | Free scheduled ingestion |
| Hosting | Vercel | Free, auto deploys from GitHub |

## Folder structure
```
stackpulse/
├── src/
│   ├── app/
│   │   ├── page.tsx            # home feed
│   │   ├── digest/page.tsx     # daily digest
│   │   ├── trends/page.tsx     # skills & roles
│   │   └── api/
│   │       ├── news/route.ts
│   │       ├── trends/route.ts
│   │       └── cron/ingest/route.ts
│   ├── components/             # ArticleCard, FilterBar, TrendChart
│   ├── lib/
│   │   ├── db.ts               # Supabase client
│   │   ├── ai.ts               # summarizer
│   │   ├── sources.ts          # feed list + fetchers
│   │   └── dedupe.ts
│   └── types/index.ts
├── docs/                       # PRD, Rules, Phases, Design, Memory
├── .env.example
└── README.md
```

## Data model
- **articles**: id, title, url (unique), source, published_at, summary, why_it_matters, category
- **trends**: id, name, type (skill | role), mentions, week_start, change_pct

## Key decisions
- Store summaries in the DB. Never call the LLM on page load (cost and speed).
- Dedupe by URL first, then by title similarity.
- Ingestion is idempotent: running it twice never creates duplicates.
