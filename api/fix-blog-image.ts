import type { VercelRequest, VercelResponse } from '@vercel/node';

export const maxDuration = 60;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

async function generateKieImage(apiKey: string, prompt: string): Promise<Buffer | null> {
  const submitRes = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'ideogram/v3-text-to-image',
      input: {
        prompt,
        rendering_speed: 'QUALITY',
        style: 'DESIGN',
        expand_prompt: true,
        image_size: 'square_hd',
        negative_prompt: 'generic, stock photo, boring, plain, corporate, text, logos, watermarks, blurry, low quality, distorted, AI-looking, cartoon, illustration',
        nsfw_checker: true,
      },
    }),
  });

  if (!submitRes.ok) {
    const err = await submitRes.text();
    console.error(`Kie.ai submit error: ${submitRes.status} — ${err.slice(0, 300)}`);
    return null;
  }

  const submitData = await submitRes.json() as { code: number; data?: { taskId?: string } };
  const taskId = submitData.data?.taskId;
  if (!taskId) {
    console.error('Kie.ai submit returned no taskId:', JSON.stringify(submitData).slice(0, 200));
    return null;
  }

  console.log(`Kie.ai task submitted: ${taskId}`);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  for (let attempt = 1; attempt <= 10; attempt++) {
    await sleep(3000);

    const pollRes = await fetch(
      `https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`,
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );

    if (!pollRes.ok) {
      console.error(`Kie.ai poll error attempt ${attempt}: ${pollRes.status}`);
      continue;
    }

    const pollData = await pollRes.json() as {
      code: number;
      data?: { state?: string; resultJson?: string; failMsg?: string };
    };
    const state = pollData.data?.state;
    console.log(`Kie.ai poll attempt ${attempt}: state=${state}`);

    if (state === 'success') {
      const resultJson = pollData.data?.resultJson;
      if (!resultJson) { console.error('Kie.ai success but no resultJson'); return null; }
      let urls: string[];
      try {
        urls = (JSON.parse(resultJson) as { resultUrls: string[] }).resultUrls;
      } catch {
        console.error('Kie.ai resultJson parse failed:', resultJson.slice(0, 200));
        return null;
      }
      if (!urls?.[0]) { console.error('Kie.ai resultUrls empty'); return null; }
      const dl = await fetch(urls[0]);
      if (!dl.ok) { console.error(`Kie.ai image download failed: ${dl.status}`); return null; }
      return Buffer.from(await dl.arrayBuffer());
    }

    if (state === 'fail') {
      console.error(`Kie.ai task failed: ${pollData.data?.failMsg ?? 'unknown'}`);
      return null;
    }
  }

  console.error(`Kie.ai timed out after 10 attempts (taskId: ${taskId})`);
  return null;
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
  let usedKie = false;

  if (kieKey) {
    try {
      const prompt = `Centered composition, subject centered in frame filling 60-70% of the image, professional business setting related to "${keyword}", Scottsdale Arizona, warm golden light, clean uncluttered background, premium lifestyle photography, aspirational, photorealistic, Instagram-optimized, no text, no logos, no watermarks`;
      imageBuffer = await generateKieImage(kieKey, prompt);
      if (imageBuffer) usedKie = true;
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
    source: usedKie ? 'kie.ai' : 'fallback',
    message: `Image pushed to ${imgPath}. Vercel will redeploy shortly.`,
  });
}
