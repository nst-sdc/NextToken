'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.published_at), { addSuffix: true });

  return (
    <article className="bg-surface border border-border rounded-[12px] p-5 transition-all duration-150 hover:border-accent/50 hover:-translate-y-0.5">
      <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
        <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium">
          {article.category}
        </span>
        <span>·</span>
        <span>{article.source}</span>
        <span>·</span>
        <time dateTime={article.published_at}>{timeAgo}</time>
      </div>

      <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>

      {article.summary && (
        <ul className="space-y-1.5 mb-4 text-sm leading-relaxed" role="list">
          {article.summary.split('\n').filter(Boolean).map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-text-muted shrink-0 mt-0.5">•</span>
              <span>{bullet.trim().replace(/^[-•]\s*/, '')}</span>
            </li>
          ))}
        </ul>
      )}

      {article.why_it_matters && (
        <div className="pt-3 border-t border-border bg-accent/5 rounded-lg p-3">
          <p className="text-xs font-medium text-accent mb-1">Why it matters for students:</p>
          <p className="text-sm">{article.why_it_matters}</p>
        </div>
      )}

      {!article.summary && (
        <div className="pt-3 border-t border-border">
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline inline-flex items-center gap-1"
          >
            Read full article →
          </Link>
        </div>
      )}
    </article>
  );
}

export function ArticleCardSkeleton() {
  return (
    <article className="bg-surface border border-border rounded-[12px] p-5">
      <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
        <span className="w-20 h-3 bg-border/50 rounded animate-pulse"></span>
        <span className="w-16 h-3 bg-border/50 rounded animate-pulse"></span>
      </div>
      <div className="h-6 bg-border/50 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-6 bg-border/50 rounded w-1/2 mb-4 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-border/50 rounded animate-pulse"></div>
        <div className="h-4 bg-border/50 rounded animate-pulse"></div>
        <div className="h-4 bg-border/50 rounded w-5/6 animate-pulse"></div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="h-4 bg-accent/10 rounded w-1/3 animate-pulse"></div>
      </div>
    </article>
  );
}