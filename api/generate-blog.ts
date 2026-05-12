import type { VercelRequest, VercelResponse } from '@vercel/node';

export const maxDuration = 90;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

const TOPICS = [
  'website-design-company-scottsdale-az',
  'affordable-seo-services-scottsdale',
  'social-media-management-scottsdale',
  'digital-marketing-agency-phoenix-az',
  'credit-repair-services-scottsdale',
  'best-website-designer-near-me-scottsdale',
  'local-seo-services-phoenix-az',
  'google-business-profile-management-scottsdale',
  'business-credit-building-arizona',
  'reputation-management-scottsdale',
  'llc-setup-arizona',
  'new-business-setup-scottsdale',
  'website-redesign-scottsdale',
  'ecommerce-website-design-phoenix',
  'wordpress-vs-custom-website-scottsdale',
  'how-to-get-more-customers-online-scottsdale',
  'social-media-marketing-phoenix-az',
  'instagram-marketing-scottsdale-business',
  'facebook-advertising-phoenix-az',
  'content-marketing-strategy-scottsdale',
  'website-maintenance-scottsdale',
  'mobile-website-design-scottsdale',
  'landing-page-design-scottsdale',
  'email-marketing-scottsdale-business',
  'online-reputation-management-phoenix',
  'yelp-review-management-scottsdale',
  'google-ads-management-scottsdale',
  'video-marketing-scottsdale-business',
  'brand-identity-design-scottsdale',
  'website-speed-optimization-scottsdale',
  'chatbot-integration-scottsdale-website',
  'crm-setup-small-business-arizona',
  'business-automation-tools-scottsdale',
  'notary-services-scottsdale-az',
  'apostille-services-arizona',
  'personal-credit-repair-phoenix-az',
  'remove-collections-credit-report-arizona',
  'business-credit-cards-no-personal-guarantee',
  'how-to-build-business-credit-fast-arizona',
  'startup-business-services-scottsdale',
];

async function getGitHubFile(token: string, repo: string, path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status}`);
  const data = await res.json() as { content: string; sha: string };
  return { content: Buffer.from(data.content, 'base64').toString('utf8'), sha: data.sha };
}

async function putGitHubFile(token: string, repo: string, branch: string, path: string, content: string, sha: string, message: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify({ message, content: Buffer.from(content).toString('base64'), sha, branch }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT ${path} → ${res.status}: ${err}`);
  }
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
    throw new Error(`GitHub PUT binary ${path} → ${res.status}: ${err}`);
  }
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateISO(d: Date): string {
  return d.toISOString().split('T')[0];
}

async function generateKieImage(apiKey: string, prompt: string): Promise<Buffer | null> {
  const submitUrl = 'https://api.kie.ai/api/v1/jobs/createTask';
  const submitBody = {
    model: 'flux-2/pro-text-to-image',
    input: { prompt, aspect_ratio: '16:9', resolution: '1K', nsfw_checker: false },
  };

  console.log(`[kie] POST ${submitUrl}`);
  console.log(`[kie] submit body: ${JSON.stringify(submitBody)}`);
  console.log(`[kie] api key present: ${!!apiKey}, key prefix: ${apiKey.slice(0, 8)}...`);

  const submitRes = await fetch(submitUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(submitBody),
  });

  const submitRaw = await submitRes.text();
  console.log(`[kie] submit response status: ${submitRes.status}`);
  console.log(`[kie] submit response body: ${submitRaw.slice(0, 500)}`);

  if (!submitRes.ok) {
    console.error(`[kie] FALLBACK: submit HTTP error ${submitRes.status}`);
    return null;
  }

  let submitData: { code: number; data?: { taskId?: string } };
  try {
    submitData = JSON.parse(submitRaw);
  } catch {
    console.error(`[kie] FALLBACK: submit response is not valid JSON`);
    return null;
  }

  const taskId = submitData.data?.taskId;
  if (!taskId) {
    console.error(`[kie] FALLBACK: no taskId in submit response. code=${submitData.code}, data=${JSON.stringify(submitData.data)}`);
    return null;
  }

  console.log(`[kie] task created: ${taskId}`);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  for (let attempt = 1; attempt <= 10; attempt++) {
    await sleep(3000);

    const pollUrl = `https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`;
    console.log(`[kie] poll attempt ${attempt}: GET ${pollUrl}`);

    const pollRes = await fetch(pollUrl, { headers: { Authorization: `Bearer ${apiKey}` } });
    const pollRaw = await pollRes.text();
    console.log(`[kie] poll ${attempt} status: ${pollRes.status}, body: ${pollRaw.slice(0, 400)}`);

    if (!pollRes.ok) {
      console.error(`[kie] poll ${attempt}: HTTP error ${pollRes.status}`);
      continue;
    }

    let pollData: { code: number; data?: { state?: string; resultJson?: string; failMsg?: string } };
    try {
      pollData = JSON.parse(pollRaw);
    } catch {
      console.error(`[kie] poll ${attempt}: response is not valid JSON`);
      continue;
    }

    const state = pollData.data?.state;
    console.log(`[kie] poll ${attempt}: state=${state}, failMsg=${pollData.data?.failMsg ?? 'none'}`);

    if (state === 'success') {
      const resultJson = pollData.data?.resultJson;
      if (!resultJson) {
        console.error(`[kie] FALLBACK: state=success but resultJson is empty`);
        return null;
      }
      console.log(`[kie] resultJson: ${resultJson.slice(0, 300)}`);
      let urls: string[];
      try {
        urls = (JSON.parse(resultJson) as { resultUrls: string[] }).resultUrls;
      } catch {
        console.error(`[kie] FALLBACK: resultJson parse failed: ${resultJson.slice(0, 200)}`);
        return null;
      }
      if (!urls?.[0]) {
        console.error(`[kie] FALLBACK: resultUrls is empty`);
        return null;
      }
      console.log(`[kie] downloading image from: ${urls[0]}`);
      const dl = await fetch(urls[0]);
      console.log(`[kie] image download status: ${dl.status}`);
      if (!dl.ok) {
        console.error(`[kie] FALLBACK: image download failed with status ${dl.status}`);
        return null;
      }
      const buf = Buffer.from(await dl.arrayBuffer());
      console.log(`[kie] image downloaded successfully — ${buf.length} bytes`);
      return buf;
    }

    if (state === 'fail') {
      console.error(`[kie] FALLBACK: task failed. failMsg=${pollData.data?.failMsg ?? 'unknown'}`);
      return null;
    }

    console.log(`[kie] poll ${attempt}: state="${state}" — continuing to poll`);
  }

  console.error(`[kie] FALLBACK: timed out after 10 polls (30s) — taskId=${taskId}`);
  return null;
}

interface ClaudePost {
  title: string;
  displayTitle: string;
  metaDescription: string;
  category: string;
  excerpt: string;
  content: string;
  imagePrompt: string;
}

// ── RSS helpers ───────────────────────────────────────────────────────────────

interface BlogPostMeta {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  description?: string; // rich body content for RSS; overrides excerpt when present
}

function extractRssDescription(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const MIN = 750;
  const MAX = 1000;

  if (text.length <= MIN) return text;

  const slice = text.slice(0, MAX);

  // Find the last sentence boundary (followed by whitespace) that is >= MIN chars in
  const sentenceRe = /[.!?](?=\s)/g;
  let m: RegExpExecArray | null;
  let bestEnd = -1;
  while ((m = sentenceRe.exec(slice)) !== null) {
    if (m.index + 1 >= MIN) bestEnd = m.index + 1;
  }
  if (bestEnd > 0) return text.slice(0, bestEnd).trim();

  // No boundary >= MIN — take the last one anywhere before MAX
  sentenceRe.lastIndex = 0;
  while ((m = sentenceRe.exec(slice)) !== null) bestEnd = m.index + 1;
  if (bestEnd > 400) return text.slice(0, bestEnd).trim();

  // Last resort: word boundary near MIN
  const atMin = text.slice(0, MIN);
  const lastSpace = atMin.lastIndexOf(' ');
  return lastSpace > 600 ? atMin.slice(0, lastSpace) : atMin;
}

function parseBlogPagePosts(source: string): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];
  const match = source.match(/const posts\s*=\s*\[([\s\S]*?)\n\s*\];/);
  if (!match) return posts;

  // Matches a field value in either single or double quotes
  const field = (key: string, entry: string): string => {
    // Double-quoted (handles escaped quotes inside)
    const dq = entry.match(new RegExp(`\\b${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    if (dq) return dq[1].replace(/\\"/g, '"');
    // Single-quoted
    const sq = entry.match(new RegExp(`\\b${key}:\\s*'([^']*)'`));
    if (sq) return sq[1];
    return '';
  };

  for (const entry of match[1].split(/(?=\n\s*\{)/)) {
    const slug = field('slug', entry);
    const title = field('title', entry);
    const excerpt = field('excerpt', entry);
    const date = field('date', entry);
    if (slug && title && date) {
      posts.push({ title, excerpt, slug, date });
    }
  }
  return posts;
}

function toRFC822(displayDate: string): string {
  const d = new Date(displayDate);
  return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

function buildRSS(posts: BlogPostMeta[]): string {
  const items = posts.map((p) => `  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>https://www.rahoperations.com/blogs/${p.slug}</link>
    <guid isPermaLink="true">https://www.rahoperations.com/blogs/${p.slug}</guid>
    <description><![CDATA[${p.description ?? p.excerpt}]]></description>
    <pubDate>${toRFC822(p.date)}</pubDate>
    <enclosure url="https://www.rahoperations.com/blogs/${p.slug}.jpg" length="0" type="image/jpeg"/>
  </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RAH Operations — Business Growth Insights</title>
    <link>https://www.rahoperations.com/blogs</link>
    <atom:link href="https://www.rahoperations.com/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Website design, SEO, digital marketing, and credit repair insights for Arizona businesses.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || 'main';
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY is undefined' });
  const kieKey = process.env.KIE_API_KEY;

  if (!githubToken || !githubRepo || !anthropicKey) {
    return res.status(500).json({ error: 'Missing GITHUB_TOKEN, GITHUB_REPO, or ANTHROPIC_API_KEY' });
  }

  // ── STEP 1: pick next unpublished topic ──────────────────────────────────────
  const { content: blogPageRaw } = await getGitHubFile(githubToken, githubRepo, 'src/pages/BlogPage.tsx');
  const existingSlugs = new Set<string>();
  const slugMatches = blogPageRaw.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const m of slugMatches) existingSlugs.add(m[1]);

  const slug = TOPICS.find((t) => !existingSlugs.has(t));
  if (!slug) return res.status(200).json({ success: false, message: 'All 40 topics already published.' });

  const keyword = slug.replace(/-/g, ' ');
  const today = new Date();

  // ── STEP 2: call Claude API (with one retry on parse failure) ──────────────
  const callClaude = async (): Promise<string> => {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        system: 'You are an expert SEO content writer for RAH Operations, a Scottsdale AZ digital agency offering website design, SEO, digital marketing, social media management, and credit repair. Write blog posts that rank on Google for local Arizona searches. Always write in a confident, helpful, expert tone. Never use filler content.',
        messages: [
          {
            role: 'user',
            content: `Write a complete SEO blog post targeting the keyword: ${keyword}.

Return ONLY a JSON object with these exact fields:
{
  "title": "SEO title 50-60 chars with keyword",
  "displayTitle": "Full engaging headline",
  "metaDescription": "150-160 char meta description with CTA",
  "category": "one of: Website Design, SEO, Digital Marketing, Social Media, Credit Repair, Business Services",
  "excerpt": "2-3 sentence excerpt for blog listing page",
  "content": "Full HTML blog post content with these requirements: Opening paragraph with primary keyword in first 100 words. 5-6 H2 sections with 150-250 words each. Internal links using <a href='/website-design-and-seo'>anchor text</a> format. Link to these pages naturally throughout: /website-design-and-seo, /digital-marketing, /social-media-management, /personal-credit-repair, /business-credit-and-funding, /website-intake, /marketing/intake, /credit-repair/intake. FAQ section with 3 questions. Closing CTA paragraph linking to most relevant intake form. 1200-1600 words total",
  "imagePrompt": "Detailed image generation prompt for a professional blog hero image. Style: clean, modern, professional Arizona business context. No text in image. Horizontal format 1200x630."
}`,
          },
        ],
      }),
    });
    if (!r.ok) {
      const err = await r.text();
      throw new Error(`Claude API error: ${r.status} — ${err.slice(0, 300)}`);
    }
    const data = await r.json() as { content: Array<{ type: string; text: string }> };
    return data.content[0]?.text ?? '';
  };

  const parseClaude = (rawText: string): ClaudePost => {
    // Strip any opening/closing code fences (```json, ```, with or without trailing newline)
    const clean = rawText.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    return JSON.parse(clean) as ClaudePost;
  };

  let post: ClaudePost;

  let rawText1: string;
  try {
    rawText1 = await callClaude();
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
  console.log(`[generate-blog] Claude attempt 1 — ${rawText1.length} chars:`, rawText1.slice(0, 1000));

  try {
    post = parseClaude(rawText1);
  } catch (parseErr1) {
    console.error('[generate-blog] Parse attempt 1 failed:', parseErr1 instanceof Error ? parseErr1.message : String(parseErr1));
    console.log('[generate-blog] Retrying Claude API call...');

    let rawText2: string;
    try {
      rawText2 = await callClaude();
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
    console.log(`[generate-blog] Claude attempt 2 — ${rawText2.length} chars:`, rawText2.slice(0, 1000));

    try {
      post = parseClaude(rawText2);
    } catch (parseErr2) {
      console.error('[generate-blog] Parse attempt 2 failed:', parseErr2 instanceof Error ? parseErr2.message : String(parseErr2));
      return res.status(500).json({
        error: 'Failed to parse Claude JSON after 2 attempts',
        attempt1_length: rawText1.length,
        attempt1_preview: rawText1.slice(0, 600),
        attempt2_length: rawText2.length,
        attempt2_preview: rawText2.slice(0, 600),
      });
    }
  }

  // ── STEP 3: generate image via Kie.ai ───────────────────────────────────────
  const FALLBACK_IMG = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/public/blogs/how-to-improve-google-business-profile-scottsdale.jpg`;
  let imageBuffer: Buffer | null = null;

  if (kieKey) {
    try {
      imageBuffer = await generateKieImage(kieKey, post.imagePrompt);
    } catch (imgErr) {
      console.error('Kie.ai threw:', imgErr instanceof Error ? imgErr.message : String(imgErr));
    }
  } else {
    console.warn('KIE_API_KEY not set — skipping image generation');
  }

  // ── STEP 4: build file changes ───────────────────────────────────────────────
  const dateDisplay = formatDate(today);
  const dateISO = formatDateISO(today);

  // Count existing posts to determine issue number
  const issueCount = (blogPageRaw.match(/slug:/g) || []).length + 1;
  const issueNum = String(issueCount).padStart(3, '0');

  const newPostEntry = `    {
      title: ${JSON.stringify(post.title)},
      displayTitle: ${JSON.stringify(post.displayTitle)},
      date: ${JSON.stringify(dateDisplay)},
      issue: 'No. ${issueNum}',
      category: ${JSON.stringify(post.category)},
      excerpt: ${JSON.stringify(post.excerpt)},
      slug: '${slug}'
    },`;

  const updatedBlogPage = blogPageRaw.replace(
    /const posts = \[/,
    `const posts = [\n${newPostEntry}`,
  );

  // BlogPost.tsx — inject into generated posts record
  const { content: blogPostRaw, sha: blogPostSha } = await getGitHubFile(githubToken, githubRepo, 'src/pages/BlogPost.tsx');

  const generatedEntry = `  '${slug}': {
    title: ${JSON.stringify(post.title)},
    displayTitle: ${JSON.stringify(post.displayTitle)},
    metaDescription: ${JSON.stringify(post.metaDescription)},
    category: ${JSON.stringify(post.category)},
    date: ${JSON.stringify(dateDisplay)},
    content: ${JSON.stringify(post.content)},
  },`;

  const updatedBlogPost = blogPostRaw.replace(
    /\/\/ GENERATED_POSTS_START\nconst generatedBlogPosts[^=]+=\s*\{/,
    `// GENERATED_POSTS_START\nconst generatedBlogPosts: Record<string, GeneratedBlogPost> = {\n${generatedEntry}`,
  );

  // Sitemap
  const { content: sitemapRaw, sha: sitemapSha } = await getGitHubFile(githubToken, githubRepo, 'public/sitemap.xml');
  const sitemapEntry = `  <url><loc>https://www.rahoperations.com/blogs/${slug}</loc><lastmod>${dateISO}</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>`;
  const updatedSitemap = sitemapRaw.replace(
    /(\s*<!-- ===== TIER 4: BLOG & CONTENT ===== -->)/,
    `\n${sitemapEntry}$1`,
  );

  // ── STEP 5: push to GitHub ───────────────────────────────────────────────────
  const { sha: blogPageSha } = await getGitHubFile(githubToken, githubRepo, 'src/pages/BlogPage.tsx');
  await putGitHubFile(githubToken, githubRepo, githubBranch, 'src/pages/BlogPage.tsx', updatedBlogPage, blogPageSha, `Add blog post: ${slug}`);
  await putGitHubFile(githubToken, githubRepo, githubBranch, 'src/pages/BlogPost.tsx', updatedBlogPost, blogPostSha, `Add generated blog post data: ${slug}`);
  await putGitHubFile(githubToken, githubRepo, githubBranch, 'public/sitemap.xml', updatedSitemap, sitemapSha, `Sitemap: add /blogs/${slug}`);

  const imgPath = `public/blogs/${slug}.jpg`;
  let imageUploaded = false;

  if (imageBuffer) {
    try {
      let existingImgSha: string | null = null;
      try {
        const existing = await getGitHubFile(githubToken, githubRepo, imgPath);
        existingImgSha = existing.sha;
      } catch (_) { /* file doesn't exist yet */ }
      await putGitHubBinary(githubToken, githubRepo, githubBranch, imgPath, imageBuffer, existingImgSha, `Add blog hero image: ${slug}`);
      imageUploaded = true;
    } catch (imgPushErr) {
      console.error('Failed to push blog image to GitHub:', imgPushErr instanceof Error ? imgPushErr.message : String(imgPushErr));
    }
  }

  // If no image was pushed, copy the fallback so /blogs/[slug].jpg always resolves
  if (!imageUploaded) {
    try {
      const fallbackRes = await fetch(FALLBACK_IMG);
      if (fallbackRes.ok) {
        const ab = await fallbackRes.arrayBuffer();
        let existingImgSha: string | null = null;
        try {
          const existing = await getGitHubFile(githubToken, githubRepo, imgPath);
          existingImgSha = existing.sha;
        } catch (_) { /* file doesn't exist yet */ }
        await putGitHubBinary(githubToken, githubRepo, githubBranch, imgPath, Buffer.from(ab), existingImgSha, `Add fallback hero image: ${slug}`);
        console.log(`Kie.ai image unavailable — used fallback for ${slug}`);
      } else {
        console.error(`Could not fetch fallback image: ${fallbackRes.status}`);
      }
    } catch (fallbackErr) {
      console.error('Fallback image push failed:', fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr));
    }
  }

  // ── STEP 6: regenerate rss.xml ──────────────────────────────────────────────
  try {
    const allPosts = parseBlogPagePosts(updatedBlogPage);
    // Inject rich body content as the RSS description for the newly published post
    const newPostIdx = allPosts.findIndex((p) => p.slug === slug);
    if (newPostIdx >= 0) {
      allPosts[newPostIdx].description = extractRssDescription(post.content);
    }
    if (allPosts.length > 0) {
      const rssXml = buildRSS(allPosts);
      let rssSha: string | null = null;
      try {
        const existingRss = await getGitHubFile(githubToken, githubRepo, 'public/rss.xml');
        rssSha = existingRss.sha;
      } catch (_) { /* rss.xml doesn't exist yet — will be created */ }
      await putGitHubBinary(githubToken, githubRepo, githubBranch, 'public/rss.xml', Buffer.from(rssXml, 'utf8'), rssSha, `Regenerate rss.xml: add ${slug}`);
    } else {
      console.warn('RSS: no posts parsed from BlogPage.tsx — skipping rss.xml update');
    }
  } catch (rssErr) {
    console.error('RSS generation failed:', rssErr instanceof Error ? rssErr.message : String(rssErr));
  }

  // ── STEP 7: return success ───────────────────────────────────────────────────
  return res.status(200).json({
    success: true,
    slug,
    title: post.title,
    url: `https://www.rahoperations.com/blogs/${slug}`,
    image: imageUploaded ? `generated` : `fallback`,
    message: 'Blog published. Vercel deploying. Make.com will post to GMB and Instagram within 15 minutes.',
  });
}
