import { NextResponse } from 'next/server';
import { fetchAllRepos, getLanguageStats } from '@/lib/github';

// Revalidate every hour
export const revalidate = 3600;

export async function GET() {
  try {
    const repos = await fetchAllRepos();
    const langStats = getLanguageStats(repos);
    return NextResponse.json(
      { repos, langStats, total: repos.length, ok: true },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    console.error('[api/github] Error:', err);
    return NextResponse.json(
      { repos: [], langStats: [], total: 0, ok: false, error: 'GitHub API unavailable' },
      { status: 200 } // 200 so the UI degrades gracefully
    );
  }
}
