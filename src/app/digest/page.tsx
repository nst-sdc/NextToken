import Link from 'next/link';
import { format } from 'date-fns';
import { getArticles } from '@/lib/db';
import { ThemeToggle } from '@/components';
import type { Article } from '@/types';

export const metadata = {
  title: 'Daily Digest - StackPulse',
  description: 'Top 5 tech stories of the day, curated for students.',
};

async function fetchTodaysTopArticles(): Promise<Article[]> {
  try {
    const { data } = await getArticles({ limit: 50 });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter articles from today (or most recent if none today)
    const todaysArticles = data.filter((a) => new Date(a.published_at) >= today);
    const articlesToUse = todaysArticles.length >= 5 ? todaysArticles : data.slice(0, 5);

    // Sort by published date descending, take top 5
    return articlesToUse
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 5);
  } catch {
    return [];
  }
}

function DigestCard({
  index,
  article,
}: {
  index: number;
  article: Article;
}) {
  const summaryBullets = article.summary?.split('\n').filter(Boolean) || [];
  const timeAgo = format(new Date(article.published_at), 'h:mm a');

  return (
    <article className="bg-surface border border-border rounded-[12px] p-6 transition-all duration-150 hover:border-accent/50">
      <div className="flex items-start gap-4">
        <span className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center font-bold text-accent text-xl shrink-0">
          {index}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
            <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium">
              {article.category}
            </span>
            <span>·</span>
            <span>{article.source}</span>
            <span>·</span>
            <time dateTime={article.published_at}>{timeAgo}</time>
          </div>
          <h3 className="text-xl font-bold mb-3">{article.title}</h3>
          {summaryBullets.length > 0 ? (
            <ul className="space-y-1.5 mb-4" role="list">
              {summaryBullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="text-text-muted shrink-0 mt-0.5">•</span>
                  <span>{bullet.trim().replace(/^[-•]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted text-sm mb-4">Summary not available yet.</p>
          )}
          {article.why_it_matters && (
            <div className="pt-3 border-t border-border bg-accent/5 rounded-lg p-3">
              <p className="text-sm font-medium text-accent">Why it matters for students:</p>
              <p className="text-sm mt-1">{article.why_it_matters}</p>
            </div>
          )}
          {!article.summary && !article.why_it_matters && (
            <div className="pt-3 border-t border-border">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline inline-flex items-center gap-1"
              >
                Read full article →
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function DigestSkeleton() {
  return (
    <article className="bg-surface border border-border rounded-[12px] p-6">
      <div className="flex items-start gap-4">
        <span className="w-10 h-10 bg-border/50 rounded-lg animate-pulse shrink-0"></span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-20 h-3 bg-border/50 rounded animate-pulse"></span>
            <span className="w-16 h-3 bg-border/50 rounded animate-pulse"></span>
          </div>
          <div className="h-7 bg-border/50 rounded w-3/4 mb-3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-border/50 rounded animate-pulse"></div>
            <div className="h-4 bg-border/50 rounded animate-pulse"></div>
            <div className="h-4 bg-border/50 rounded w-5/6 animate-pulse"></div>
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <div className="h-4 bg-accent/10 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function DigestPage() {
  const articles = await fetchTodaysTopArticles();
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Daily Digest
            </h1>
            <p className="text-lg text-text-muted mb-2">{today}</p>
            <p className="text-text-muted">Top 5 stories you need to know today</p>
          </div>
          <ThemeToggle />
        </header>

        <section className="space-y-4" aria-label="Daily digest articles">
          {articles.length > 0 ? (
            articles.map((article, i) => <DigestCard key={article.id} index={i + 1} article={article} />)
          ) : (
            [1, 2, 3, 4, 5].map((i) => <DigestSkeleton key={i} />)
          )}
        </section>

        <footer className="mt-16 pt-8 border-t border-border text-center text-text-muted text-sm">
          <p>Digest updates daily at 6 AM IST. <Link href="/" className="text-accent hover:underline">Browse All News</Link> · <Link href="/trends" className="text-accent hover:underline">Trending Skills</Link></p>
        </footer>
      </div>
    </main>
  );
}