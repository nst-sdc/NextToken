import { NextRequest, NextResponse } from 'next/server';
import { fetchAllFeeds } from '@/lib/sources';
import { dedupeByUrl, dedupeByTitleSimilarity } from '@/lib/dedupe';
import { upsertArticles } from '@/lib/db';
import { summarizeArticle, summarizeBatch } from '@/lib/ai';

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

    // Limit to 20 articles per run to control API costs
    const toProcess = deduped.slice(0, 20);

    const summaries = await summarizeBatch(
      toProcess.map((a) => ({ title: a.title, url: a.url }))
    );

    const articlesWithSummaries = toProcess.map((article, i) => ({
      ...article,
      summary: summaries[i]?.summary ?? null,
      why_it_matters: summaries[i]?.why_it_matters ?? null,
    }));

    const saved = await upsertArticles(articlesWithSummaries);
    console.log(`Saved ${saved.length} articles`);

    return NextResponse.json({
      success: true,
      fetched: rawArticles.length,
      deduped: deduped.length,
      processed: toProcess.length,
      summarized: summaries.filter(Boolean).length,
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