export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
  isFork: boolean;
}

export interface GithubActivity {
  type: string;
  repo: string;
  date: string;
}

export interface GithubStats {
  username: string;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  profileUrl: string;
  topRepos: GithubRepo[];
  languageBreakdown: { language: string; count: number }[];
  recentActivity: GithubActivity[];
}

const GITHUB_API = "https://api.github.com";

function authHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Pulls real, live public data from the GitHub REST API — repos, languages,
 * stars, and recent public activity. Never fabricates numbers: if the
 * username isn't configured or the API call fails, callers should show an
 * explicit "GitHub data unavailable" state rather than placeholder stats.
 */
export async function fetchGithubStats(username: string): Promise<GithubStats | null> {
  if (!username || username.startsWith("[ADD")) return null;

  try {
    const headers = { Accept: "application/vnd.github+json", ...authHeaders() };

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`${GITHUB_API}/users/${username}/events/public?per_page=10`, {
        headers,
        next: { revalidate: 1800 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos = await reposRes.json();
    const events = eventsRes.ok ? await eventsRes.json() : [];

    const mapped: GithubRepo[] = (Array.isArray(repos) ? repos : [])
      .filter((r) => !r.private)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count ?? 0,
        language: r.language,
        updatedAt: r.updated_at,
        isFork: r.fork,
      }));

    const topRepos = [...mapped]
      .filter((r) => !r.isFork)
      .sort((a, b) => b.stars - a.stars || +new Date(b.updatedAt) - +new Date(a.updatedAt))
      .slice(0, 6);

    const languageCounts = new Map<string, number>();
    mapped.forEach((r) => {
      if (!r.language) return;
      languageCounts.set(r.language, (languageCounts.get(r.language) ?? 0) + 1);
    });
    const languageBreakdown = [...languageCounts.entries()]
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);

    const recentActivity: GithubActivity[] = (Array.isArray(events) ? events : [])
      .slice(0, 8)
      .map((e) => ({
        type: e.type?.replace("Event", "") ?? "Activity",
        repo: e.repo?.name ?? "unknown",
        date: e.created_at,
      }));

    return {
      username: user.login,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      profileUrl: user.html_url,
      topRepos,
      languageBreakdown,
      recentActivity,
    };
  } catch (err) {
    console.error("GitHub fetch failed:", err);
    return null;
  }
}
