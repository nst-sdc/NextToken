import { NextRequest, NextResponse } from 'next/server';
import { getArticles } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);

  try {
    const result = await getArticles({ category, page, limit });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}