import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 300;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

// ── GitHub helpers ─────────────────────────────────────────────────────────────

async function getGitHubFile(token: string, repo: string, path: string, branch: string): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status}`);
  const data = await res.json() as { content: string };
  return Buffer.from(data.content, 'base64').toString('utf8');
}

// ── Blog post parsing ──────────────────────────────────────────────────────────

interface LatestPost {
  title: string;
  displayTitle: string;
  category: string;
  slug: string;
  content: string;
}

function parseLatestPost(blogPageSource: string, blogPostSource: string): LatestPost | null {
  const postsBlockMatch = blogPageSource.match(/const posts\s*=\s*\[([^;]+?)\];/s);
  if (!postsBlockMatch) return null;

  const firstEntry = postsBlockMatch[1].match(/\{([^{}]+)\}/s);
  if (!firstEntry) return null;

  const entry = firstEntry[1];
  const get = (key: string) => {
    const r = new RegExp(`${key}\\s*:\\s*['"\`]([^'"\`]+)['"\`]`);
    return entry.match(r)?.[1] ?? '';
  };

  const slug = get('slug');
  if (!slug) return null;

  return {
    title: get('title'),
    displayTitle: get('displayTitle'),
    category: get('category'),
    slug,
    content: extractPostContent(blogPostSource, slug) ?? '',
  };
}

function extractPostContent(source: string, slug: string): string | null {
  const entryStartIdx = source.indexOf(`'${slug}':`);
  if (entryStartIdx === -1) return null;

  const contentKeyIdx = source.indexOf('content: ', entryStartIdx);
  if (contentKeyIdx === -1) return null;

  const valueIdx = contentKeyIdx + 'content: '.length;
  if (source[valueIdx] !== '"') return null;

  // Walk the JSON string, respecting escape sequences
  let end = valueIdx + 1;
  while (end < source.length) {
    if (source[end] === '\\') {
      end += 2;
    } else if (source[end] === '"') {
      end++;
      break;
    } else {
      end++;
    }
  }

  try {
    const html = JSON.parse(source.slice(valueIdx, end)) as string;
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 3000).trim();
  } catch {
    return null;
  }
}

// ── Main handler ───────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const heygenKey = process.env.HEYGEN_API_KEY;
  const heygenAvatarId = process.env.HEYGEN_AVATAR_ID;
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || 'main';
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!anthropicKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY is undefined' });
  if (!heygenKey) return res.status(500).json({ error: 'HEYGEN_API_KEY is undefined' });
  if (!heygenAvatarId) return res.status(500).json({ error: 'HEYGEN_AVATAR_ID is undefined' });
  if (!githubToken || !githubRepo) return res.status(500).json({ error: 'Missing GITHUB_TOKEN or GITHUB_REPO' });
  if (!supabaseUrl || !supabaseKey) return res.status(500).json({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' });

  // ── STEP 1: fetch most recent blog post from GitHub ───────────────────────────
  let latestPost: LatestPost;
  try {
    const [blogPageSource, blogPostSource] = await Promise.all([
      getGitHubFile(githubToken, githubRepo, 'src/pages/BlogPage.tsx', githubBranch),
      getGitHubFile(githubToken, githubRepo, 'src/pages/BlogPost.tsx', githubBranch),
    ]);
    const parsed = parseLatestPost(blogPageSource, blogPostSource);
    if (!parsed) throw new Error('Could not parse most recent blog post');
    latestPost = parsed;
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch blog post: ${err instanceof Error ? err.message : String(err)}` });
  }

  console.log(`[generate-reel] latest post: ${latestPost.slug} (${latestPost.category})`);
  console.log(`[generate-reel] content preview: ${latestPost.content.slice(0, 200)}`);

  // ── STEP 2: generate reel script with Claude ───────────────────────────────────
  let script: string;
  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 512,
        temperature: 1,
        system: "You are a social media content writer. Convert the provided blog post into a 60-second Instagram Reel script for a young, conversational female presenter. The script must:\n- Open with a scroll-stopping hook in the first 3 seconds (bold statement or surprising fact)\n- Be written in natural conversational American English, not formal or robotic\n- Be exactly 130-150 words (60 seconds of speech)\n- Include 3 key points from the blog post\n- End with a clear CTA like 'Follow for more' or 'Comment below'\n- NO stage directions, NO asterisks, NO emojis, just the spoken words\nReturn only the script text, nothing else.",
        messages: [
          {
            role: 'user',
            content: `Blog post title: ${latestPost.displayTitle || latestPost.title}\n\nBlog post content:\n${latestPost.content}`,
          },
        ],
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      throw new Error(`Claude API error: ${claudeRes.status} — ${err.slice(0, 300)}`);
    }

    const claudeData = await claudeRes.json() as { content: Array<{ type: string; text: string }> };
    script = claudeData.content[0]?.text?.trim() ?? '';
    if (!script) throw new Error('Claude returned empty script');
  } catch (err) {
    return res.status(500).json({ error: `Script generation failed: ${err instanceof Error ? err.message : String(err)}` });
  }

  console.log(`[generate-reel] script (${script.split(/\s+/).length} words):\n${script}`);

  // ── STEP 3: submit video to HeyGen ────────────────────────────────────────────
  let videoId: string;
  try {
    const heygenRes = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: {
        'X-Api-Key': heygenKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: 'avatar',
              avatar_id: heygenAvatarId,
              avatar_style: 'normal',
            },
            voice: {
              type: 'text',
              input_text: script,
              voice_id: '1bd001e7e50f421d891986aad5158bc8',
            },
            background: {
              type: 'none',
            },
          },
        ],
        dimension: {
          width: 1080,
          height: 1920,
        },
      }),
    });

    const heygenRaw = await heygenRes.text();
    console.log(`[heygen] generate status: ${heygenRes.status}, body: ${heygenRaw.slice(0, 400)}`);

    if (!heygenRes.ok) {
      throw new Error(`HeyGen API error: ${heygenRes.status} — ${heygenRaw.slice(0, 300)}`);
    }

    const heygenData = JSON.parse(heygenRaw) as { data?: { video_id?: string }; video_id?: string };
    videoId = heygenData.data?.video_id ?? heygenData.video_id ?? '';
    if (!videoId) throw new Error(`HeyGen returned no video_id: ${heygenRaw.slice(0, 300)}`);
  } catch (err) {
    return res.status(500).json({ error: `HeyGen submit failed: ${err instanceof Error ? err.message : String(err)}` });
  }

  console.log(`[heygen] video_id: ${videoId}`);

  // ── STEP 4: poll until completed ──────────────────────────────────────────────
  let videoUrl: string | null = null;
  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  for (let attempt = 1; attempt <= 20; attempt++) {
    await sleep(10000);

    const pollUrl = `https://api.heygen.com/v1/video_status.get?video_id=${encodeURIComponent(videoId)}`;
    console.log(`[heygen] poll attempt ${attempt}: GET ${pollUrl}`);

    const pollRes = await fetch(pollUrl, { headers: { 'X-Api-Key': heygenKey } });
    const pollRaw = await pollRes.text();
    console.log(`[heygen] poll ${attempt} status: ${pollRes.status}, body: ${pollRaw.slice(0, 400)}`);

    if (!pollRes.ok) {
      console.error(`[heygen] poll ${attempt}: HTTP error ${pollRes.status}`);
      continue;
    }

    let pollData: { data?: { status?: string; video_url?: string; error?: string } };
    try {
      pollData = JSON.parse(pollRaw);
    } catch {
      console.error(`[heygen] poll ${attempt}: response is not valid JSON`);
      continue;
    }

    const status = pollData.data?.status;
    console.log(`[heygen] poll ${attempt}: status=${status}`);

    if (status === 'completed') {
      videoUrl = pollData.data?.video_url ?? null;
      if (!videoUrl) {
        return res.status(500).json({ error: 'HeyGen completed but returned no video_url' });
      }
      console.log(`[heygen] video ready: ${videoUrl}`);
      break;
    }

    if (status === 'failed') {
      const errMsg = pollData.data?.error ?? 'unknown error';
      console.error(`[heygen] video generation failed: ${errMsg}`);
      return res.status(500).json({ error: `HeyGen video generation failed: ${errMsg}` });
    }

    console.log(`[heygen] poll ${attempt}: status="${status}" — continuing`);
  }

  if (!videoUrl) {
    return res.status(500).json({ error: `HeyGen timed out after 20 polls — video_id=${videoId}` });
  }

  // ── STEP 5: persist to Supabase ───────────────────────────────────────────────
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error: dbError } = await supabase.from('reels').insert({
    script,
    video_url: videoUrl,
    status: 'completed',
    category: latestPost.category,
    blog_post_id: null, // blog posts live in GitHub, not Supabase
  });

  if (dbError) {
    // Non-fatal — video is ready, just log the DB failure
    console.error('[reels] Supabase insert error:', dbError.message);
  }

  // ── STEP 6: return success ────────────────────────────────────────────────────
  return res.status(200).json({
    success: true,
    video_url: videoUrl,
    script,
    video_id: videoId,
  });
}
