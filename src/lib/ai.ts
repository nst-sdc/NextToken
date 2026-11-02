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

export async function summarizeArticle(
  title: string,
  content: string
): Promise<SummaryResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('No LLM API key configured, skipping summary');
    return null;
  }

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
        messages: [
          {
            role: 'user',
            content: `Title: ${title}\n\nContent: ${content.slice(0, 8000)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content[0]?.text?.trim();

    if (!text || text.includes('SKIP')) return null;

    const lines = text.split('\n').filter((l) => l.trim());
    const bullets = lines.filter((l) => l.startsWith('-') || l.startsWith('•')).slice(0, 3);
    const whyLine = lines.find((l) => l.toLowerCase().includes('why it matters'));

    return {
      summary: bullets.join('\n'),
      why_it_matters: whyLine?.replace(/^.*?:/, '').trim() ?? '',
    };
  } catch (error) {
    console.error('Summarization failed:', error);
    return null;
  }
}

export async function summarizeBatch(
  articles: Array<{ title: string; content: string }>
): Promise<(SummaryResult | null)[]> {
  return Promise.all(articles.map((a) => summarizeArticle(a.title, a.content)));
}