# Phases

## Phase 0: Setup
- Repo, Next.js + Tailwind + TypeScript, Supabase project, Vercel deploy
- Done when: "Hello world" is live on a public URL

## Phase 1: News ingestion
- Pull 5-8 RSS/API sources into the `articles` table
- Dedupe by URL
- Done when: running the cron job fills the DB with fresh articles

## Phase 2: Feed UI
- Home page with article cards, category filters, pagination
- Done when: a student can browse and filter news on mobile and desktop

## Phase 3: AI summaries
- Add summarizer, store summary + "why it matters"
- Show on cards
- Done when: every new article gets a summary automatically

## Phase 4: Skills & roles tracker
- Pick a legal job data source
- Weekly job that counts skill and role mentions
- Trends page with rising/falling skills
- Done when: /trends shows this week's top 10 skills and roles

## Phase 5: Daily digest
- Top 5 stories of the day on one page
- Done when: digest updates daily without manual work

## Phase 6: Polish and launch
- SEO, loading states, error states, analytics
- Share in college groups, collect feedback

## Phase 7: Accounts and personalization (optional)
- Login, saved articles, interest-based feed
- Email digest
