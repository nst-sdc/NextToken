import Link from 'next/link';

export default function HomePage() {
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
          <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Category filters">
            <button className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium transition-colors hover:bg-border focus-ring">
              All
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium transition-colors hover:bg-border focus-ring">
              AI
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium transition-colors hover:bg-border focus-ring">
              Startups
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium transition-colors hover:bg-border focus-ring">
              Funding
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium transition-colors hover:bg-border focus-ring">
              Big Tech
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium transition-colors hover:bg-border focus-ring">
              Open Source
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>

          <nav className="flex justify-center gap-2 mt-8" aria-label="Pagination">
            <button className="px-4 py-2 bg-accent text-white rounded-lg font-medium transition-colors hover:opacity-90 focus-ring">
              Previous
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-lg font-medium transition-colors hover:bg-border focus-ring" aria-current="page">
              1
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-lg font-medium transition-colors hover:bg-border focus-ring">
              2
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-lg font-medium transition-colors hover:bg-border focus-ring">
              3
            </button>
            <button className="px-4 py-2 bg-surface border border-border rounded-lg font-medium transition-colors hover:bg-border focus-ring">
              Next
            </button>
          </nav>
        </section>

        <footer className="mt-16 pt-8 border-t border-border text-center text-text-muted text-sm">
          <p>Built for students. <Link href="/digest" className="text-accent hover:underline">View Daily Digest</Link> · <Link href="/trends" className="text-accent hover:underline">Trending Skills</Link></p>
        </footer>
      </div>
    </main>
  );
}

function ArticleCardSkeleton() {
  return (
    <article className="bg-surface border border-border rounded-[12px] p-5 transition-all duration-150 hover:border-accent/50 hover:-translate-y-0.5">
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