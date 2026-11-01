# Rules (for the AI and for contributors)

## Stack rules
- Use TypeScript only. No plain JS files.
- Use Next.js App Router, Tailwind, Supabase. Don't add new libraries without asking.
- Avoid: heavy UI kits, Redux, ORMs. Use plain `fetch` and the Supabase client.

## Code rules
- Keep code simple and lean. The easiest solution that works wins.
- Small functions, one job each. Short, clear variable names.
- No dead code, no commented-out blocks, no premature abstractions.
- Follow the folder structure in Architecture.md.

## Error handling
- Wrap every external call (RSS, LLM, DB) in try/catch.
- One failed source must never break the whole ingestion run. Log it and move on.
- Show a friendly fallback in the UI. Never show raw errors to users.

## AI summary rules
- Summaries must come only from the article text. No invented facts.
- Max 3 bullets + 1 line on why it matters for students.
- If the article is too short or unclear, skip the summary instead of guessing.

## Security
- Secrets live in `.env`. Never commit them.
- Validate all query params in API routes.

## The AI should
- Read Memory.md first in every new session.
- Build one phase at a time, and stop when it's done.
- Ask before changing the schema or the stack.

## The AI shouldn't
- Rewrite files it wasn't asked to touch.
- Install packages silently.
- Scrape sites that forbid it in their terms or robots.txt.

## Git
- Branch per feature: `feat/<name>`. Small PRs. Clear commit messages.
