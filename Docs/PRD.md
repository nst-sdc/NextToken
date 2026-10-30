# PRD: StackPulse (working title)

## Problem
Students hear about big AI and startup moves weeks late. They also can't tell which skills and roles are actually in demand right now.

## Target users
- B.Tech/BCA/MCA students in India (1st to 4th year) who want to stay current.
- Beginners picking what to learn next.
- Final-years deciding which roles to apply for.

## Goals
- One place for AI, tech, and startup news, updated daily.
- Every story gets a short AI summary with a "Why it matters for students" line.
- Show which skills and roles are trending up or down.
- Keep it simple enough for a beginner team to build and ship.

## Core features (MVP)
1. **News feed**: aggregated from RSS feeds and public APIs (Hacker News, TechCrunch, etc.), deduplicated.
2. **AI summaries**: 3-bullet summary + "why it matters" per article.
3. **Category filters**: AI, Startups, Funding, Big Tech, Open Source.
4. **Skills & roles tracker**: weekly list of in-demand skills and job roles, derived from job-posting data.
5. **Daily digest page**: top 5 stories of the day.

## Later (post-MVP)
- Email/WhatsApp digest
- Saved articles and user accounts
- Personalized feed by interests
- Career roadmap suggestions based on trending skills

## Non-goals (for now)
- Original reporting or user-written posts
- Mobile app
- Paid tiers

## Success metrics
- 100 weekly active students in the first 2 months
- Feed refreshes automatically every day without manual work
- Summary accuracy: spot-check 20 summaries a week, 90%+ correct

## Open questions
- Which job data source is free and legal to use? (Needs research before Phase 4.)
- Which LLM API fits the free-tier budget?
