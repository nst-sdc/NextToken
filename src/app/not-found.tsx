import Link from 'next/link';
import { ThemeToggle } from '@/components';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-[1100px] mx-auto mb-8 flex justify-end">
        <ThemeToggle />
      </header>
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page not found</h2>
        <p className="text-text-muted mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity focus-ring"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </div>
    </main>
  );
}