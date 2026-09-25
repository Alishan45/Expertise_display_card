// Server-side GitHub API utility — token NEVER reaches the browser

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Alishan45';

// Fallback cached data (used if API fails)
const FALLBACK_REPOS = [
  { name: 'Medbot', description: 'AI medical chatbot using Gemini API', language: 'HTML', stargazers_count: 0, html_url: 'https://github.com/Alishan45/Medbot', homepage: '', updated_at: '2024-01-01', fork: false, archived: false, topics: [] },
  { name: 'HeartVision-AI', description: 'Cardiac risk predictor using KNN', language: 'Jupyter Notebook', stargazers_count: 0, html_url: 'https://github.com/Alishan45/HeartVision-AI', homepage: '', updated_at: '2024-01-01', fork: false, archived: false, topics: [] },
];

/**
 * Fetch all repositories for the configured GitHub user.
 * Implements pagination — never assumes only 30 repos.
 * Results are cached by Next.js for 1 hour (revalidate: 3600).
 */
export async function fetchAllRepos() {
  if (!GITHUB_TOKEN) {
    console.warn('[github.js] No GITHUB_TOKEN set — returning fallback repos');
    return FALLBACK_REPOS;
  }

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'alishan-portfolio',
  };

  let page = 1;
  const all = [];

  try {
    while (true) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
        {
          headers,
          next: { revalidate: 3600 }, // cache 1 hour
        }
      );

      if (!res.ok) {
        console.error(`[github.js] API error: ${res.status} ${res.statusText}`);
        break;
      }

      const data = await res.json();
      if (!data.length) break;
      all.push(...data);
      if (data.length < 100) break;
      page++;
    }

    // Return only safe public fields
    return all.map(r => ({
      name: r.name,
      full_name: r.full_name,
      description: r.description || '',
      html_url: r.html_url,
      homepage: r.homepage || '',
      language: r.language || '',
      topics: r.topics || [],
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      fork: r.fork,
      archived: r.archived,
      updated_at: r.updated_at,
      created_at: r.created_at,
      visibility: r.visibility || 'public',
    }));
  } catch (err) {
    console.error('[github.js] Fetch failed:', err.message);
    return FALLBACK_REPOS;
  }
}

/** Get language distribution from a list of repos */
export function getLanguageStats(repos) {
  const counts = {};
  repos.filter(r => !r.fork && !r.archived && r.language).forEach(r => {
    counts[r.language] = (counts[r.language] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([lang, count]) => ({ lang, count }));
}
