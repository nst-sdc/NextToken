'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = ['All', 'AI', 'Startups', 'Funding', 'Big Tech', 'Open Source'] as const;

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return (
    <nav
      className="flex flex-wrap gap-2 mb-6 sticky top-4 z-10 bg-background/80 backdrop-blur-sm pb-4"
      role="group"
      aria-label="Category filters"
    >
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 focus-ring ${
            currentCategory === category
              ? 'bg-accent text-white shadow-[0_0_0_1px_theme(colors.accent)]'
              : 'bg-surface border border-border hover:bg-border hover:border-accent/50'
          }`}
          aria-pressed={currentCategory === category}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}