import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q')?.trim();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);

  if (!q || q.length < 2) {
    return NextResponse.json({ data: [], total: 0, page, limit, hasMore: false });
  }

  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .or(`title.ilike.%${q}%,summary.ilike.%${q}%,why_it_matters.ilike.%${q}%`)
      .order('published_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return NextResponse.json({
      data: data ?? [],
      page,
      limit,
      total: count ?? 0,
      hasMore: count ? from + (data?.length ?? 0) < count : false,
    });
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}