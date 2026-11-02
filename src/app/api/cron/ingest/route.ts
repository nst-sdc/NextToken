import { NextRequest, NextResponse } from 'next/server';
import { fetchAllFeeds } from '@/lib/sources';
import { dedupeByUrl, dedupeByTitleSimilarity } from '@/lib/dedupe';
import { upsertArticles } from '@/lib/db';
import { summarizeArticle } from '@/lib/ai';

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting ingestion...');

    const rawArticles = await fetchAllFeeds();
    console.log(`Fetched ${rawArticles.length} raw articles`);

    const dedupedByUrl = dedupeByUrl(rawArticles);
    const deduped = dedupeByTitleSimilarity(dedupedByUrl);
    console.log(`After dedupe: ${deduped.length} articles`);

    const articlesWithSummaries = await Promise.all(
      deduped.map(async (article) => {
        const summary = await summarizeArticle(article.title, article.title);
        return {
          ...article,
          summary: summary?.summary ?? null,
          why_it_matters: summary?.why_it_matters ?? null,
        };
      })
    );

    const saved = await upsertArticles(articlesWithSummaries);
    console.log(`Saved ${saved.length} articles`);

    return NextResponse.json({
      success: true,
      fetched: rawArticles.length,
      deduped: deduped.length,
      saved: saved.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Ingestion failed:', error);
    return NextResponse.json(
      { error: 'Ingestion failed', details: String(error) },
      { status: 500 }
    );
  }
}