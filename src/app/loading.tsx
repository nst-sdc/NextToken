import { ThemeToggle } from '@/components';

export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="h-12 bg-surface rounded-lg w-48 animate-pulse mb-4"></div>
            <div className="h-6 bg-surface rounded-lg w-72 animate-pulse"></div>
          </div>
          <div className="w-10 h-10 bg-surface rounded-lg animate-pulse"></div>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 bg-surface rounded-full w-24 animate-pulse"></div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ArticleCardSkeleton() {
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