import type { Article } from '@/types';

export function dedupeByUrl(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    const normalizedUrl = normalizeUrl(article.url);
    if (seen.has(normalizedUrl)) return false;
    seen.add(normalizedUrl);
    return true;
  });
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = '';
    u.searchParams.delete('utm_source');
    u.searchParams.delete('utm_medium');
    u.searchParams.delete('utm_campaign');
    u.searchParams.delete('utm_content');
    u.searchParams.delete('ref');
    return u.toString();
  } catch {
    return url;
  }
}

export function dedupeByTitleSimilarity(articles: Article[], threshold = 0.85): Article[] {
  const result: Article[] = [];

  for (const article of articles) {
    const isDuplicate = result.some((existing) =>
      titleSimilarity(article.title, existing.title) >= threshold
    );
    if (!isDuplicate) result.push(article);
  }

  return result;
}

function titleSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
  const wordsB = new Set(b.toLowerCase().split(/\s+/).filter((w) => w.length > 3));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection++;
  }

  return intersection / Math.max(wordsA.size, wordsB.size);
}