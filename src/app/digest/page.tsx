import Link from 'next/link';

export const metadata = {
  title: 'Daily Digest - StackPulse',
  description: 'Top 5 tech stories of the day, curated for students.',
};

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const mockDigest = [
  {
    title: 'OpenAI releases GPT-4o with real-time voice and vision',
    source: 'The Verge',
    category: 'AI',
    summary: [
      'GPT-4o handles text, audio, and vision in a single model',
      'Real-time voice conversation with ~320ms latency',
      'Free tier users get access with rate limits',
    ],
    whyItMatters: 'Voice-first AI interfaces are arriving faster than expected—start building voice apps now.',
  },
  {
    title: 'Vercel raises $250M Series E at $3.25B valuation',
    source: 'TechCrunch',
    category: 'Funding',
    summary: [
      'Accel leads round with participation from GV and Notable',
      'Funds will accelerate AI workflow features and edge compute',
      'Vercel now powers 1M+ monthly active developers',
    ],
    whyItMatters: 'Next.js ecosystem investment signals strong job market for full-stack React developers.',
  },
  {
    title: 'GitHub Copilot Workspace enters technical preview',
    source: 'GitHub Blog',
    category: 'AI',
    summary: [
      'Agentic AI that plans, codes, and fixes across entire repos',
      'Natural language to PR workflow with human review gates',
      'Integrates with GitHub Actions for automated testing',
    ],
    whyItMatters: 'AI-assisted development is moving from autocomplete to full-task automation—learn to direct agents.',
  },
  {
    title: 'Kubernetes 1.30 adds user namespace support for security',
    source: 'CNCF Blog',
    category: 'Open Source',
    summary: [
      'User namespaces now stable—containers run as non-root by default',
      'Improved WASM runtime support with containerd integration',
      'Structured authorization for admission controllers',
    ],
    whyItMatters: 'Container security defaults are tightening—production K8s skills increasingly valuable.',
  },
  {
    title: 'Meta releases Llama 3 400B with open weights',
    source: 'Meta AI Blog',
    category: 'AI',
    summary: [
      'Largest open-weight model to date at 405B parameters',
      'Beats GPT-4 on several benchmarks including coding',
      'Available for commercial use under Llama 3 license',
    ],
    whyItMatters: 'Frontier open models now rival closed APIs—local LLM deployment skills are marketable.',
  },
];

function DigestCard({
  index,
  title,
  source,
  category,
  summary,
  whyItMatters,
}: {
  index: number;
  title: string;
  source: string;
  category: string;
  summary: string[];
  whyItMatters: string;
}) {
  return (
    <article className="bg-surface border border-border rounded-[12px] p-6 transition-all duration-150 hover:border-accent/50">
      <div className="flex items-start gap-4">
        <span className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center font-bold text-accent text-xl shrink-0">
          {index}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
            <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium">{category}</span>
            <span>·</span>
            <span>{source}</span>
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <ul className="space-y-1.5 mb-4" role="list">
            {summary.map((bullet, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className="text-text-muted shrink-0 mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-border bg-accent/5 rounded-lg p-3">
            <p className="text-sm font-medium text-accent">Why it matters for students:</p>
            <p className="text-sm mt-1">{whyItMatters}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DigestPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Daily Digest
          </h1>
          <p className="text-lg text-text-muted mb-2">{today}</p>
          <p className="text-text-muted">Top 5 stories you need to know today</p>
        </header>

        <section className="space-y-4" aria-label="Daily digest articles">
          {mockDigest.map((article, i) => (
            <DigestCard key={i} index={i + 1} {...article} />
          ))}
        </section>

        <footer className="mt-16 pt-8 border-t border-border text-center text-text-muted text-sm">
          <p>Digest updates daily at 6 AM IST. <Link href="/" className="text-accent hover:underline">Browse All News</Link> · <Link href="/trends" className="text-accent hover:underline">Trending Skills</Link></p>
        </footer>
      </div>
    </main>
  );
}