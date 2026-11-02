# StackPulse

Daily AI, tech & startup news for students. Every story gets a 3-bullet AI summary with a "Why it matters for students" line.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Cron Jobs
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude / Google Gemini
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Anthropic or Gemini API key

### Installation

```bash
# Clone and install
git clone <your-repo>
cd stackpulse
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `ANTHROPIC_API_KEY` | Anthropic API key (or use GEMINI_API_KEY) |
| `CRON_SECRET` | Secret for securing cron endpoint |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home feed
│   ├── digest/page.tsx       # Daily digest
│   ├── trends/page.tsx       # Skills & roles tracker
│   ├── api/
│   │   ├── news/route.ts     # Articles API
│   │   ├── trends/route.ts   # Trends API
│   │   └── cron/ingest/route.ts  # Ingestion cron
├── components/               # ArticleCard, FilterBar, TrendRow
├── lib/
│   ├── db.ts                 # Supabase client & queries
│   ├── ai.ts                 # LLM summarizer
│   ├── sources.ts            # RSS feed fetchers
│   └── dedupe.ts             # Deduplication logic
└── types/index.ts            # TypeScript types
```

## Database Schema

```sql
-- Articles table
create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  url text unique not null,
  source text not null,
  published_at timestamptz not null,
  summary text,
  why_it_matters text,
  category text not null check (category in ('AI', 'Startups', 'Funding', 'Big Tech', 'Open Source')),
  created_at timestamptz default now()
);

-- Trends table
create table trends (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null check (type in ('skill', 'role')),
  mentions int not null,
  week_start date not null,
  change_pct numeric(5,2),
  created_at timestamptz default now()
);

-- Indexes
create index idx_articles_published_at on articles(published_at desc);
create index idx_articles_category on articles(category);
create index idx_trends_week_start on trends(week_start desc);
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Cron Job Setup

Configure a cron job to hit `/api/cron/ingest` every 1-2 hours:

- **Vercel Cron**: Add `vercel.json` with cron schedule
- **GitHub Actions**: Use scheduled workflow
- **External**: cron-job.org, EasyCron, etc.

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/ingest",
      "schedule": "0 */2 * * *"
    }
  ]
}
```

## Development Phases

See [Docs/Phases.md](Docs/Phases.md) for the 8-phase roadmap.

## Contributing

See [Docs/Rules.md](Docs/Rules.md) for contribution guidelines.

## License

MIT