import Link from 'next/link';
import { FilterBar } from '@/components/FilterBar';
import { ArticleCard, ArticleCardSkeleton } from '@/components/ArticleCard';
import { getArticles } from '@/lib/db';
import type { Article } from '@/types';

interface HomePageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

async function fetchArticles(category?: string, page = 1) {
  try {
    return await getArticles({ category, page, limit: 12 });
  } catch {
    return { data: [], page: 1, limit: 12, total: 0, hasMore: false };
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;
  const page = parseInt(resolvedParams.page || '1', 10);

  const { data: articles, total, hasMore } = await fetchArticles(category, page);

  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            StackPulse
          </h1>
          <p className="text-lg text-text-muted max-w-2xl">
            Daily AI, tech & startup news for students. Every story gets a 3-bullet
            summary with a "Why it matters for you" line.
          </p>
        </header>

        <section className="space-y-6" aria-label="News feed">
          <FilterBar />

          {articles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          )}

          {(articles.length > 0 || total > 0) && (
            <Pagination
              currentPage={page}
              hasMore={hasMore}
              category={category}
              total={total}
            />
          )}
        </section>

        <footer className="mt-16 pt-8 border-t border-border text-center text-text-muted text-sm">
          <p>Built for students. <Link href="/digest" className="text-accent hover:underline">View Daily Digest</Link> · <Link href="/trends" className="text-accent hover:underline">Trending Skills</Link></p>
        </footer>
      </div>
    </main>
  );
}

function Pagination({
  currentPage,
  hasMore,
  category,
  total,
}: {
  currentPage: number;
  hasMore: boolean;
  category?: string;
  total: number;
}) {
  const baseParams = new URLSearchParams();
  if (category && category !== 'All') baseParams.set('category', category);

  return (
    <nav className="flex justify-center gap-2 mt-8" aria-label="Pagination">
      <a
        href={`/?${baseParams.toString()}${baseParams.toString() ? '&' : ''}page=${currentPage - 1}`}
        className={`px-4 py-2 rounded-lg font-medium transition-colors focus-ring ${
          currentPage === 1
            ? 'bg-surface/50 text-text-muted cursor-not-allowed'
            : 'bg-accent text-white hover:opacity-90'
        }`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </a>
      <span className="flex items-center px-4 text-text-muted text-sm">
        Page {currentPage} of {Math.ceil(total / 12) || 1} · {total} articles
      </span>
      <a
        href={`/?${baseParams.toString()}${baseParams.toString() ? '&' : ''}page=${currentPage + 1}`}
        className={`px-4 py-2 rounded-lg font-medium transition-colors focus-ring ${
          !hasMore
            ? 'bg-surface/50 text-text-muted cursor-not-allowed'
            : 'bg-accent text-white hover:opacity-90'
        }`}
        aria-disabled={!hasMore}
      >
        Next
      </a>
    </nav>
  );
}