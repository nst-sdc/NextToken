'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-[1100px] mx-auto mb-8 flex justify-end">
        <ThemeToggle />
      </header>
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-danger/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-text-muted mb-6">We couldn't load this page. Please try again.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity focus-ring"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2 bg-surface border border-border rounded-lg font-medium hover:bg-border transition-colors focus-ring"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}