import type { VercelRequest, VercelResponse } from '@vercel/node';

export const maxDuration = 60;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

async function getGitHubFileSha(token: string, repo: string, path: string): Promise<string | null> {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) return null;
  const data = await res.json() as { sha: string };
  return data.sha ?? null;
}

async function putGitHubBinary(token: string, repo: string, branch: string, path: string, data: Buffer, sha: string | null, message: string) {
  const body: Record<string, unknown> = { message, content: data.toString('base64'), branch };
  if (sha) body.sha = sha;
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT ${path} → ${res.status}: ${err}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { slug } = req.body as { slug?: string };
  if (!slug) return res.status(400).json({ error: 'slug is required' });

  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo  = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || 'main';
  const kieKey = process.env.KIE_API_KEY;

  if (!githubToken || !githubRepo) {
    return res.status(500).json({ error: 'Missing GITHUB_TOKEN or GITHUB_REPO' });
  }

  const imgPath = `public/blogs/${slug}.jpg`;
  const keyword = slug.replace(/-/g, ' ');
  const FALLBACK_IMG = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/public/blogs/how-to-improve-google-business-profile-scottsdale.jpg`;

  // ── Attempt Kie.ai image generation ─────────────────────────────────────────
  let imageBuffer: Buffer | null = null;

  if (kieKey) {
    try {
      const prompt = `Professional hero image for a blog post about "${keyword}". Clean, modern, Arizona business context. No text in image. Horizontal format 1200x630.`;
      const imgRes = await fetch('https://api.kie.ai/v1/images/generations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${kieKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, n: 1, size: '1792x1024' }),
      });
      if (imgRes.ok) {
        const imgData = await imgRes.json() as { data?: Array<{ url?: string; b64_json?: string }> };
        const item = imgData.data?.[0];
        if (item?.b64_json) {
          imageBuffer = Buffer.from(item.b64_json, 'base64');
        } else if (item?.url) {
          const download = await fetch(item.url);
          if (download.ok) {
            imageBuffer = Buffer.from(await download.arrayBuffer());
          } else {
            console.error(`Kie.ai download failed: ${download.status}`);
          }
        } else {
          console.error('Kie.ai returned no url or b64_json:', JSON.stringify(imgData).slice(0, 200));
        }
      } else {
        const errBody = await imgRes.text();
        console.error(`Kie.ai error: ${imgRes.status} — ${errBody.slice(0, 300)}`);
      }
    } catch (err) {
      console.error('Kie.ai threw:', err instanceof Error ? err.message : String(err));
    }
  } else {
    console.warn('KIE_API_KEY not set — will use fallback');
  }

  // ── Use fallback if Kie.ai produced nothing ──────────────────────────────────
  if (!imageBuffer) {
    try {
      const fallbackRes = await fetch(FALLBACK_IMG);
      if (fallbackRes.ok) {
        imageBuffer = Buffer.from(await fallbackRes.arrayBuffer());
        console.log(`Using fallback image for ${slug}`);
      } else {
        return res.status(500).json({ error: `Fallback image fetch failed: ${fallbackRes.status}` });
      }
    } catch (err) {
      return res.status(500).json({ error: `Fallback fetch threw: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  // ── Push to GitHub ───────────────────────────────────────────────────────────
  const existingSha = await getGitHubFileSha(githubToken, githubRepo, imgPath);
  await putGitHubBinary(githubToken, githubRepo, githubBranch, imgPath, imageBuffer, existingSha, `Fix hero image: ${slug}`);

  return res.status(200).json({
    success: true,
    slug,
    path: imgPath,
    source: imageBuffer ? (kieKey ? 'kie.ai' : 'fallback') : 'fallback',
    message: `Image pushed to ${imgPath}. Vercel will redeploy shortly.`,
  });
}
