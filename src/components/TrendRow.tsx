'use client';

import type { Trend } from '@/types';

interface TrendRowProps {
  trend: Trend;
  rank: number;
}

export function TrendRow({ trend, rank }: TrendRowProps) {
  const isPositive = (trend.change_pct ?? 0) >= 0;

  return (
    <tr className="border-b border-border/50 hover:bg-surface/50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-mono text-sm font-bold">
            {rank}
          </span>
          <span className="font-mono text-sm font-medium">{trend.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-text-muted text-sm font-mono tabular-nums">
        {trend.mentions.toLocaleString()}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{Math.abs(trend.change_pct ?? 0).toFixed(1)}%</span>
        </span>
      </td>
    </tr>
  );
}

export function TrendRowSkeleton() {
  return (
    <tr>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-border/50 rounded-lg animate-pulse"></span>
          <span className="w-32 h-5 bg-border/50 rounded animate-pulse"></span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="w-20 h-5 bg-border/50 rounded animate-pulse"></span>
      </td>
      <td className="px-4 py-3">
        <span className="w-16 h-5 bg-border/50 rounded animate-pulse"></span>
      </td>
    </tr>
  );
}