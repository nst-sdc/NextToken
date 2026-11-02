import Parser from 'rss-parser';

const parser = new Parser();

export interface FeedSource {
  name: string;
  url: string;
  category: 'AI' | 'Startups' | 'Funding' | 'Big Tech' | 'Open Source';
}

export const FEED_SOURCES: FeedSource[] = [
  {
    name: 'Hacker News',
    url: 'https://hnrss.org/frontpage',
    category: 'Big Tech',
  },
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'Startups',
  },
  {
    name: 'The Verge - AI',
    url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
    category: 'AI',
  },
  {
    name: 'VentureBeat - AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    category: 'AI',
  },
  {
    name: 'GitHub Blog',
    url: 'https://github.blog/feed/',
    category: 'Open Source',
  },
  {
    name: 'Y Combinator Blog',
    url: 'https://www.ycombinator.com/blog/feed/',
    category: 'Startups',
  },
  {
    name: 'Stratechery',
    url: 'https://stratechery.com/feed/',
    category: 'Big Tech',
  },
];

export async function fetchFeed(source: FeedSource) {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items
      .filter((item): item is typeof item & { link: string; title: string; pubDate: string } => {
        return !!item.link && !!item.title && !!item.pubDate;
      })
      .map((item) => ({
        title: item.title!,
        url: item.link!,
        source: source.name,
        published_at: new Date(item.pubDate!).toISOString(),
        category: source.category,
      }));
  } catch (error) {
    console.error(`Failed to fetch ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllFeeds() {
  const results = await Promise.allSettled(
    FEED_SOURCES.map((source) => fetchFeed(source))
  );

  const articles = results
    .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  return articles;
}