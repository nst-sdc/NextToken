import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getArticles(filters?: {
  category?: string;
  page?: number;
  limit?: number;
}) {
  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 12;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data: data ?? [],
    page,
    limit,
    total: count ?? 0,
    hasMore: count ? from + (data?.length ?? 0) < count : false,
  };
}

export async function getTrends(type?: 'skill' | 'role', limit = 10) {
  let query = supabase
    .from('trends')
    .select('*')
    .order('mentions', { ascending: false })
    .limit(limit);

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export async function upsertArticles(articles: Array<{
  title: string;
  url: string;
  source: string;
  published_at: string;
  category: string;
  summary?: string;
  why_it_matters?: string;
}>) {
  const { data, error } = await supabase
    .from('articles')
    .upsert(articles, { onConflict: 'url', ignoreDuplicates: false })
    .select();

  if (error) throw error;

  return data ?? [];
}