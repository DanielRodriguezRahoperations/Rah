import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

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

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const blogPagePath = join(process.cwd(), 'src', 'pages', 'BlogPage.tsx');
    const source = readFileSync(blogPagePath, 'utf8');
    const posts = parseBlogPagePosts(source);
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ error: `Failed to read blog posts: ${err instanceof Error ? err.message : String(err)}` });
  }
}
