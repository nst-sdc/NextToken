import { NextResponse } from 'next/server';
import { getTrends } from '@/lib/db';

export async function GET() {
  try {
    const [skills, roles] = await Promise.all([
      getTrends('skill', 10),
      getTrends('role', 10),
    ]);

    return NextResponse.json({ skills, roles });
  } catch (error) {
    console.error('Failed to fetch trends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    );
  }
}