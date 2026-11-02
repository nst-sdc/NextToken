export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  summary?: string;
  why_it_matters?: string;
  category: 'AI' | 'Startups' | 'Funding' | 'Big Tech' | 'Open Source';
}

export interface Trend {
  id: string;
  name: string;
  type: 'skill' | 'role';
  mentions: number;
  week_start: string;
  change_pct: number;
}

export interface FeedFilters {
  category?: Article['category'];
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}