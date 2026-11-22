import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { getArticles } from '@/lib/db';
import { ThemeToggle } from '@/components';
import type { Article } from '@/types';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: articles } = await getArticles({ limit: 100 });
  const article = articles.find((a) => a.id === resolvedParams.slug);
  
  if (article) {
    return {
      title: `${article.title} - StackPulse`,
      description: article.summary?.split('\n')[0]?.replace(/^[-•]\s*/, '') || article.why_it_matters || 'Read the full article on StackPulse',
      openGraph: {
        title: article.title,
        description: article.why_it_matters || article.summary?.split('\n')[0]?.replace(/^[-•]\s*/, '') || '',
        type: 'article',
        publishedTime: article.published_at,
        authors: [article.source],
      },
    };
  }
  
  return { title: 'Article not found - StackPulse' };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const { data: articles } = await getArticles({ limit: 100 });
  const article = articles.find((a) => a.id === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const formattedDate = format(new Date(article.published_at), 'MMMM d, yyyy');

  return (
    <article className="min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-6 focus-ring rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to feed
            </Link>
            
            <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
              <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium">
                {article.category}
              </span>
              <span>·</span>
              <span>{article.source}</span>
              <span>·</span>
              <time dateTime={article.published_at}>{formattedDate}</time>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
          </div>
          <ThemeToggle />
        </header>

        {article.summary && (
          <section className="prose prose-invert max-w-none mb-8" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="text-xl font-bold mb-4">Summary</h2>
            <ul className="space-y-3" role="list">
              {article.summary.split('\n').filter(Boolean).map((bullet, i) => (
                <li key={i} className="flex gap-3 text-base leading-relaxed">
                  <span className="text-accent shrink-0 mt-1.5">•</span>
                  <span>{bullet.trim().replace(/^[-•]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {article.why_it_matters && (
          <aside className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8" role="complementary">
            <h2 className="text-lg font-bold text-accent mb-2">Why it matters for students</h2>
            <p className="text-base">{article.why_it_matters}</p>
          </aside>
        )}

        <footer className="pt-6 border-t border-border">
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity focus-ring"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Read full article
          </Link>
        </footer>
      </div>
    </article>
  );
}