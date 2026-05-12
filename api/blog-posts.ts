import type { VercelRequest, VercelResponse } from '@vercel/node';

export const maxDuration = 10;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

interface BlogPostMeta {
  title: string;
  displayTitle: string;
  date: string;
  issue: string;
  category: string;
  slug: string;
}

function parseBlogPagePosts(source: string): BlogPostMeta[] {
  const postsBlockMatch = source.match(/const posts\s*=\s*\[([^;]+?)\];/s);
  if (!postsBlockMatch) return [];

  const block = postsBlockMatch[1];
  const entries: BlogPostMeta[] = [];

  const entryRe = /\{([^{}]+)\}/gs;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(block)) !== null) {
    const entry = m[1];
    const get = (key: string) => {
      const r = new RegExp(`${key}\\s*:\\s*['"\`]([^'"\`]+)['"\`]`);
      return entry.match(r)?.[1] ?? '';
    };
    const slug = get('slug');
    if (!slug) continue;
    entries.push({
      title: get('title'),
      displayTitle: get('displayTitle'),
      date: get('date'),
      issue: get('issue'),
      category: get('category'),
      slug,
    });
  }

  return entries;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || 'main';

  if (!githubToken || !githubRepo) {
    return res.status(500).json({ error: 'Missing GITHUB_TOKEN or GITHUB_REPO' });
  }

  try {
    const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/src/pages/BlogPage.tsx?ref=${githubBranch}`;
    const ghRes = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${githubToken}`, Accept: 'application/vnd.github.v3+json' },
    });
    if (!ghRes.ok) {
      const err = await ghRes.text();
      return res.status(500).json({ error: `GitHub API error ${ghRes.status}: ${err.slice(0, 200)}` });
    }
    const data = await ghRes.json() as { content: string; encoding: string };
    const source = Buffer.from(data.content, 'base64').toString('utf8');
    const posts = parseBlogPagePosts(source);
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch blog posts: ${err instanceof Error ? err.message : String(err)}` });
  }
}
