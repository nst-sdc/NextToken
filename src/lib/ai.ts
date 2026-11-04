export interface SummaryResult {
  summary: string;
  why_it_matters: string;
}

const SYSTEM_PROMPT = `You are a tech news summarizer for students. Given an article, produce:
1. Exactly 3 bullet points summarizing the key facts (max 20 words each)
2. One line: "Why it matters for students: ..." (max 25 words)

Rules:
- Only use facts from the article. Never invent.
- If article is too short/unclear, return "SKIP" for both fields.
- Be concise. No fluff.`;

async function fetchArticleContent(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StackPulse/1.0; +https://stackpulse.dev)',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Extract text content (basic extraction)
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000);

    return text.length > 200 ? text : null;
  } catch {
    return null;
  }
}

async function callAnthropic(prompt: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) throw new Error(`Anthropic error: ${response.status}`);

    const data = await response.json();
    return data.content[0]?.text?.trim() ?? null;
  } catch (error) {
    console.error('Anthropic call failed:', error);
    return null;
  }
}

async function callGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.3 },
        }),
      }
    );

    if (!response.ok) throw new Error(`Gemini error: ${response.status}`);

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text?.trim() ?? null;
  } catch (error) {
    console.error('Gemini call failed:', error);
    return null;
  }
}

function parseSummaryResponse(text: string): SummaryResult | null {
  if (!text || text.includes('SKIP')) return null;

  const lines = text.split('\n').filter((l) => l.trim());
  const bullets = lines.filter((l) => l.startsWith('-') || l.startsWith('•')).slice(0, 3);
  const whyLine = lines.find((l) => l.toLowerCase().includes('why it matters'));

  if (bullets.length === 0) return null;

  return {
    summary: bullets.map((b) => b.replace(/^[-•]\s*/, '')).join('\n'),
    why_it_matters: whyLine?.replace(/^.*?:/, '').trim() ?? '',
  };
}

export async function summarizeArticle(
  title: string,
  url: string
): Promise<SummaryResult | null> {
  const content = await fetchArticleContent(url);
  if (!content) {
    console.warn(`Could not fetch content for: ${title}`);
    return null;
  }

  const prompt = `Title: ${title}\n\nContent: ${content}`;

  // Try Anthropic first, fallback to Gemini
  let text = await callAnthropic(prompt);
  if (!text) text = await callGemini(prompt);
  if (!text) return null;

  return parseSummaryResponse(text);
}

export async function summarizeBatch(
  articles: Array<{ title: string; url: string }>
): Promise<(SummaryResult | null)[]> {
  // Process sequentially to respect rate limits
  const results: (SummaryResult | null)[] = [];
  for (const article of articles) {
    const result = await summarizeArticle(article.title, article.url);
    results.push(result);
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 500));
  }
  return results;
}