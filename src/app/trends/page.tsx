import Link from 'next/link';

export const metadata = {
  title: 'Trending Skills & Roles - StackPulse',
  description: 'Weekly tracking of in-demand tech skills and job roles.',
};

const mockSkills = [
  { name: 'Python', mentions: 1240, change: 12.5 },
  { name: 'TypeScript', mentions: 1180, change: 8.3 },
  { name: 'React', mentions: 1150, change: 5.2 },
  { name: 'AWS', mentions: 980, change: 15.1 },
  { name: 'Kubernetes', mentions: 890, change: 22.4 },
  { name: 'Machine Learning', mentions: 820, change: 18.7 },
  { name: 'PostgreSQL', mentions: 750, change: 3.1 },
  { name: 'Docker', mentions: 720, change: 6.8 },
  { name: 'GraphQL', mentions: 580, change: 11.2 },
  { name: 'Rust', mentions: 450, change: 31.5 },
];

const mockRoles = [
  { name: 'Software Engineer', mentions: 3200, change: 4.2 },
  { name: 'ML Engineer', mentions: 1800, change: 28.5 },
  { name: 'DevOps Engineer', mentions: 1200, change: 15.3 },
  { name: 'Backend Engineer', mentions: 1100, change: 6.7 },
  { name: 'Full Stack Developer', mentions: 950, change: 2.1 },
  { name: 'Data Scientist', mentions: 880, change: 9.4 },
  { name: 'Platform Engineer', mentions: 620, change: 42.1 },
  { name: 'AI Researcher', mentions: 450, change: 35.8 },
  { name: 'Security Engineer', mentions: 410, change: 19.2 },
  { name: 'Solutions Architect', mentions: 380, change: 8.9 },
];

function TrendRow({ name, mentions, change }: { name: string; mentions: number; change: number }) {
  const isPositive = change >= 0;
  return (
    <tr className="border-b border-border/50 hover:bg-surface/50 transition-colors">
      <td className="px-4 py-3 font-mono text-sm font-medium">{name}</td>
      <td className="px-4 py-3 text-text-muted text-sm">{mentions.toLocaleString()}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{Math.abs(change).toFixed(1)}%</span>
        </span>
      </td>
    </tr>
  );
}

export default function TrendsPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Trending Skills & Roles
          </h1>
          <p className="text-lg text-text-muted max-w-2xl">
            Weekly analysis of job postings showing which skills and roles are rising
            or falling in demand. Data updates every Monday.
          </p>
        </header>

        <section className="mb-12" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-mono text-sm">1</span>
            Top 10 Skills This Week
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left" role="table">
              <thead>
                <tr className="border-b border-border text-text-muted text-sm uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Skill</th>
                  <th className="px-4 py-3 font-medium">Mentions</th>
                  <th className="px-4 py-3 font-medium">Weekly Change</th>
                </tr>
              </thead>
              <tbody>
                {mockSkills.map((skill, i) => (
                  <TrendRow key={i} {...skill} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="roles-heading">
          <h2 id="roles-heading" className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-mono text-sm">2</span>
            Top 10 Roles This Week
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left" role="table">
              <thead>
                <tr className="border-b border-border text-text-muted text-sm uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Mentions</th>
                  <th className="px-4 py-3 font-medium">Weekly Change</th>
                </tr>
              </thead>
              <tbody>
                {mockRoles.map((role, i) => (
                  <TrendRow key={i} {...role} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-border text-center text-text-muted text-sm">
          <p>Data sourced from public job boards. <Link href="/" className="text-accent hover:underline">Back to News Feed</Link> · <Link href="/digest" className="text-accent hover:underline">Daily Digest</Link></p>
        </footer>
      </div>
    </main>
  );
}