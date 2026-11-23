'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Array<{ id: string; title: string; source: string; category: string }>>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`);
      const data = await res.json();
      setResults(data.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 200);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
          resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (articleId: string) => {
    router.push(`/article/${articleId}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative" ref={resultsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="search" className="sr-only">Search articles</label>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            id="search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search articles…"
            className="w-full md:w-72 pl-11 pr-4 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
            autoComplete="off"
          />
        </div>
      </form>

      {(isOpen && results.length > 0) || loading ? (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50">
          {loading ? (
            <div className="p-4 text-center text-text-muted text-sm">Searching…</div>
          ) : (
            <ul className="divide-y divide-border" role="listbox">
              {results.map((article) => (
                <li key={article.id}>
                  <button
                    onClick={() => handleResultClick(article.id)}
                    className="w-full px-4 py-3 text-left hover:bg-border transition-colors focus:bg-border focus:outline-none flex items-start gap-3"
                    role="option"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{article.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                        <span className="px-1.5 py-0.5 bg-accent/10 text-accent rounded-full font-medium text-[10px]">
                          {article.category}
                        </span>
                        <span>·</span>
                        <span>{article.source}</span>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        isOpen && query.length >= 2 && results.length === 0 && !loading && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg p-4 text-center text-text-muted text-sm z-50">
            No results found for "{query}"
          </div>
        )
      )}
    </div>
  );
}