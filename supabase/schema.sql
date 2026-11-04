-- StackPulse Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Articles table
create table if not exists articles (
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

-- Indexes for articles
create index if not exists idx_articles_published_at on articles(published_at desc);
create index if not exists idx_articles_category on articles(category);
create index if not exists idx_articles_source on articles(source);

-- Trends table
create table if not exists trends (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null check (type in ('skill', 'role')),
  mentions int not null default 0,
  week_start date not null,
  change_pct numeric(5,2),
  created_at timestamptz default now()
);

-- Indexes for trends
create index if not exists idx_trends_week_start on trends(week_start desc);
create index if not exists idx_trends_type on trends(type);
create unique index if not exists idx_trends_unique on trends(name, type, week_start);

-- Enable Row Level Security
alter table articles enable row level security;
alter table trends enable row level security;

-- Public read access for articles and trends
create policy "Public read access for articles" on articles
  for select using (true);

create policy "Public read access for trends" on trends
  for select using (true);

-- Service role can insert/update (for cron jobs)
create policy "Service role write access for articles" on articles
  for all using (auth.role() = 'service_role');

create policy "Service role write access for trends" on trends
  for all using (auth.role() = 'service_role');

-- Function to update weekly trends (run weekly via pg_cron or external scheduler)
create or replace function update_weekly_trends()
returns void language plpgsql as $$
declare
  current_week_start date := date_trunc('week', now())::date;
  prev_week_start date := (date_trunc('week', now()) - interval '1 week')::date;
begin
  -- This is a placeholder - in production, you'd aggregate from job posting data
  -- For now, we'll insert mock data that can be replaced by a real job scraper
  insert into trends (name, type, mentions, week_start, change_pct)
  values
    -- Skills
    ('Python', 'skill', 1240, current_week_start, 12.5),
    ('TypeScript', 'skill', 1180, current_week_start, 8.3),
    ('React', 'skill', 1150, current_week_start, 5.2),
    ('AWS', 'skill', 980, current_week_start, 15.1),
    ('Kubernetes', 'skill', 890, current_week_start, 22.4),
    ('Machine Learning', 'skill', 820, current_week_start, 18.7),
    ('PostgreSQL', 'skill', 750, current_week_start, 3.1),
    ('Docker', 'skill', 720, current_week_start, 6.8),
    ('GraphQL', 'skill', 580, current_week_start, 11.2),
    ('Rust', 'skill', 450, current_week_start, 31.5),
    -- Roles
    ('Software Engineer', 'role', 3200, current_week_start, 4.2),
    ('ML Engineer', 'role', 1800, current_week_start, 28.5),
    ('DevOps Engineer', 'role', 1200, current_week_start, 15.3),
    ('Backend Engineer', 'role', 1100, current_week_start, 6.7),
    ('Full Stack Developer', 'role', 950, current_week_start, 2.1),
    ('Data Scientist', 'role', 880, current_week_start, 9.4),
    ('Platform Engineer', 'role', 620, current_week_start, 42.1),
    ('AI Researcher', 'role', 450, current_week_start, 35.8),
    ('Security Engineer', 'role', 410, current_week_start, 19.2),
    ('Solutions Architect', 'role', 380, current_week_start, 8.9)
  on conflict (name, type, week_start) do update set
    mentions = excluded.mentions,
    change_pct = excluded.change_pct;
end $$;