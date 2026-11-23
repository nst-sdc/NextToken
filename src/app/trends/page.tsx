import Link from 'next/link';
import { getTrends } from '@/lib/db';
import { TrendRow, TrendRowSkeleton, ThemeToggle } from '@/components';
import type { Trend } from '@/types';

export const metadata = {
  title: 'Trending Skills & Roles - StackPulse',
  description: 'Weekly tracking of in-demand tech skills and job roles.',
};

async function fetchTrends() {
  try {
    const [skills, roles] = await Promise.all([
      getTrends('skill', 10),
      getTrends('role', 10),
    ]);
    return { skills, roles };
  } catch {
    return { skills: [] as Trend[], roles: [] as Trend[] };
  }
}

export default async function TrendsPage() {
  const { skills, roles } = await fetchTrends();

  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Trending Skills & Roles
            </h1>
            <p className="text-lg text-text-muted max-w-2xl">
              Weekly analysis of job postings showing which skills and roles are rising
              or falling in demand. Data updates every Monday.
            </p>
          </div>
          <ThemeToggle />
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
                {skills.length > 0 ? (
                  skills.map((skill, i) => <TrendRow key={skill.id} trend={skill} rank={i + 1} />)
                ) : (
                  [1, 2, 3, 4, 5].map((i) => <TrendRowSkeleton key={i} />)
                )}
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
                {roles.length > 0 ? (
                  roles.map((role, i) => <TrendRow key={role.id} trend={role} rank={i + 1} />)
                ) : (
                  [1, 2, 3, 4, 5].map((i) => <TrendRowSkeleton key={i} />)
                )}
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