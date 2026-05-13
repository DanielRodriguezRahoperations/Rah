import type { VercelRequest, VercelResponse } from '@vercel/node';
import sharp from 'sharp';
import { execSync } from 'child_process';

export const maxDuration = 90;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

// 40 topics in round-robin order across 10 service categories.
// The generator picks the first unpublished slug via find(), so this interleaving
// guarantees no category repeats until all others have been covered.
//
// Categories (count): Website Design (4) | SEO (4) | Social Media (4) |
//   Credit Repair (5) | Business Credit (5) | LLC / Formation (5) |
//   Notary (3) | Reputation (4) | Google Business Profile (3) | AZ General (3)
const TOPICS = [
  // ── Round 1 ─────────────────────────────────────────────────────────────────
  'website-design-company-scottsdale-az',            // Website Design
  'affordable-seo-services-scottsdale',              // SEO
  'social-media-management-scottsdale',              // Social Media
  'credit-repair-services-scottsdale',               // Credit Repair
  'business-credit-building-arizona',                // Business Credit
  'llc-setup-arizona',                               // LLC / Formation
  'notary-services-scottsdale-az',                   // Notary
  'reputation-management-scottsdale',                // Reputation Mgmt
  'google-business-profile-optimization-scottsdale', // Google Business Profile
  'arizona-small-business-growth-strategies',        // AZ General
  // ── Round 2 ─────────────────────────────────────────────────────────────────
  'ecommerce-website-design-phoenix',                // Website Design
  'local-seo-services-phoenix-az',                   // SEO
  'instagram-marketing-scottsdale-business',         // Social Media
  'personal-credit-repair-phoenix-az',               // Credit Repair
  'business-credit-cards-no-personal-guarantee',     // Business Credit
  'new-business-setup-scottsdale',                   // LLC / Formation
  'apostille-services-arizona',                      // Notary
  'online-reputation-management-phoenix',            // Reputation Mgmt
  'google-maps-ranking-phoenix-business',            // Google Business Profile
  'best-business-services-scottsdale-az',            // AZ General
  // ── Round 3 ─────────────────────────────────────────────────────────────────
  'wordpress-vs-custom-website-scottsdale',          // Website Design
  'technical-seo-audit-scottsdale-business',         // SEO
  'facebook-advertising-phoenix-az',                 // Social Media
  'remove-collections-credit-report-arizona',        // Credit Repair
  'how-to-build-business-credit-fast-arizona',       // Business Credit
  'startup-business-services-scottsdale',            // LLC / Formation
  'mobile-notary-phoenix-arizona',                   // Notary
  'yelp-review-management-scottsdale',               // Reputation Mgmt
  'google-business-photos-tips-arizona',             // Google Business Profile
  'scottsdale-business-owner-guide-to-online-presence', // AZ General
  // ── Round 4 ─────────────────────────────────────────────────────────────────
  'mobile-website-design-scottsdale',                // Website Design
  'on-page-seo-optimization-scottsdale',             // SEO
  'tiktok-marketing-scottsdale-small-business',      // Social Media
  'how-to-raise-credit-score-100-points-arizona',    // Credit Repair
  'net-30-vendors-for-new-business-arizona',         // Business Credit
  'arizona-llc-vs-corporation-which-is-better',      // LLC / Formation
  'how-to-respond-to-negative-reviews-arizona',      // Reputation Mgmt
  // ── Round 5 — Credit Repair, Business Credit, LLC only ──────────────────────
  'debt-settlement-vs-credit-repair-arizona',        // Credit Repair
  'business-funding-options-scottsdale-startup',     // Business Credit
  'how-to-register-a-business-in-arizona',           // LLC / Formation
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
    model: 'ideogram/v3-text-to-image',
    input: {
      prompt,
      rendering_speed: 'QUALITY',
      style: 'DESIGN',
      expand_prompt: true,
      image_size: 'square_hd',
      negative_prompt: 'text, logos, watermarks, blurry, low quality, distorted, AI-looking, cartoon, illustration, generic, stock photo, boring, plain, corporate',
      nsfw_checker: true,
    },
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
}

// Ordered slug-pattern → scene pairs. First match wins (most specific first).
const IMAGE_SCENES: Array<[string, string]> = [
  // Website Design
  ['ecommerce',           'business owner centered at a premium desk reviewing a luxury ecommerce storefront on a large monitor, clean Scottsdale home office with soft desert light behind'],
  ['wordpress',           'web developer centered at a premium dual-monitor workstation with clean code filling the screens, modern Scottsdale glass-walled office, blurred desert backdrop'],
  ['mobile-website',      'professional holding a smartphone centered in frame displaying a polished mobile website, shallow depth of field, warm Scottsdale golden-hour window light'],
  ['website-redesign',    'designer centered at a large curved monitor displaying a beautifully redesigned website, clean Scottsdale studio, warm side lighting, blurred background'],
  ['website-speed',       'professional centered at a premium laptop with a fast-loading website on screen, clean minimal Scottsdale desk setup, warm Arizona afternoon light'],
  ['website-maintenance', 'confident developer centered at a premium workstation reviewing a clean codebase, modern Scottsdale office, soft desert mountain view through window behind'],
  ['landing-page',        'UX designer centered at a premium desk reviewing a high-converting landing page on screen, clean Scottsdale creative studio, warm directional light'],
  ['website-design',      'professional centered at a sleek dual-monitor workstation displaying a beautifully designed website, modern Scottsdale studio, warm golden light from window'],
  // SEO
  ['local-seo',           'marketing professional centered at a premium laptop reviewing local search rankings, Scottsdale Old Town architecture softly visible through large windows behind'],
  ['google-business',     'business owner centered at a premium laptop with Google Business Profile on screen, clean Scottsdale office, soft desert landscape through floor-to-ceiling windows'],
  ['google-ads',          'marketing professional centered at a premium laptop reviewing a high-performing Google Ads dashboard, clean Scottsdale office, warm Arizona afternoon light'],
  ['google-maps',         'professional centered holding a smartphone with a Google Maps business listing on screen, clean background, warm Scottsdale golden-hour light'],
  ['rank-on-google',      'confident business owner centered at a premium desk reviewing rising search rankings on a large monitor, clean modern Scottsdale office, warm golden light'],
  ['seo',                 'SEO professional centered at a premium workstation reviewing organic ranking growth charts, clean Scottsdale office, soft desert landscape visible through large window'],
  // Social & Marketing
  ['tiktok',              'social media creator centered holding a smartphone filming short-form video content, bright clean Scottsdale studio, warm editorial lifestyle lighting'],
  ['instagram',           'content creator centered holding a smartphone with a polished Instagram grid on screen, clean bright Scottsdale studio background, warm lifestyle lighting'],
  ['facebook',            'marketing professional centered at a premium laptop reviewing a social media campaign, clean warm-lit Scottsdale creative workspace, blurred office background'],
  ['video-marketing',     'videographer centered behind a professional camera on tripod in a clean Scottsdale studio, warm directional lighting, minimal background'],
  ['content-marketing',   'content strategist centered at a premium laptop with an artisan coffee beside them, clean Scottsdale creative studio, soft desert light through large windows'],
  ['email-marketing',     'professional centered at a minimalist desk reviewing an elegant email campaign on a laptop, clean Scottsdale workspace, warm natural Arizona light'],
  ['brand-identity',      'creative director centered at a premium desk with a brand moodboard spread in front, clean Scottsdale studio, warm editorial side lighting'],
  ['social-media',        'content creator centered at a premium backlit workspace reviewing social media analytics on screen, Scottsdale Arizona, clean modern background'],
  ['digital-marketing',   'business owner centered at a premium laptop reviewing marketing performance dashboards, Scottsdale office, floor-to-ceiling desert view softly blurred behind'],
  // Credit & Finance
  ['credit-score',        'determined Arizona entrepreneur centered at a premium laptop watching their credit score climb on screen, clean modern Scottsdale office, warm aspirational desert light'],
  ['personal-credit',     'confident entrepreneur centered at a premium desk reviewing credit score improvement on a tablet, clean modern Scottsdale office, warm desert light'],
  ['business-credit',     'executive centered in a premium Scottsdale boardroom holding a sleek black business credit card, clean background, warm directional light'],
  ['credit-repair',       'determined Arizona entrepreneur centered at a premium laptop reviewing improving financial charts, clean modern office, warm Scottsdale afternoon light'],
  ['remove-collections',  'professional centered at a clean modern desk reviewing financial documents on a premium laptop, Scottsdale office setting, warm side lighting'],
  ['negative-review',     'composed business owner centered at a premium desk professionally responding to online reviews on a laptop, clean modern Scottsdale office, confident warm lighting'],
  ['business-funding',    'executive centered signing business funding documents at a clean Scottsdale boardroom table, soft desert-mountain view through windows behind'],
  // Business Services
  ['llc',                 'business attorney or owner centered at a marble desk with LLC formation documents and a premium pen, clean Scottsdale office, warm editorial lighting'],
  ['notary',              'professional notary centered at an elegant desk stamping official documents, clean marble surface, Scottsdale office, warm directional side lighting'],
  ['apostille',           'professional centered at a clean desk with sealed official documents and a luxury fountain pen, minimal Scottsdale legal office background, warm light'],
  ['startup',             'ambitious entrepreneur centered in a glass-walled Scottsdale coworking space reviewing a business plan, energetic morning light, clean modern background'],
  ['new-business',        'business founder centered at a modern Scottsdale office desk reviewing a business plan, aspirational golden morning light, clean uncluttered background'],
  ['crm',                 'business owner centered at a premium wide monitor reviewing a clean CRM analytics dashboard, Scottsdale office, soft desert mountain backdrop through window'],
  ['automation',          'tech-forward professional centered at a large curved monitor reviewing a workflow automation dashboard, sleek Scottsdale office, warm ambient lighting'],
  ['chatbot',             'professional centered at a sleek premium laptop with an AI chat interface on screen, modern Scottsdale office, clean background, warm ambient light'],
  ['reputation',          'business owner centered at a premium desk smiling while reviewing five-star ratings on a tablet, clean modern Scottsdale office background, warm light'],
  // Generic intent
  ['how-to',              'professional business owner centered at a premium workstation reviewing success metrics on screen, clean Scottsdale luxury office, warm desert afternoon light'],
  ['how-much',            'business owner and advisor centered in discussion at a clean Scottsdale boardroom table, warm golden Arizona light, minimal background'],
  ['best-',               'professional centered at a premium multi-screen workstation reviewing performance analytics, clean warm Scottsdale office atmosphere, desert view behind'],
  ['why-',                'confident Arizona business leader centered in a modern glass-walled Scottsdale office, clean background, aspirational warm golden light'],
];

const CATEGORY_SCENES: Record<string, string> = {
  'Website Design':    'professional centered at a premium dual-monitor workstation displaying a beautiful website, clean Scottsdale design studio, warm desert light from large windows',
  'SEO':               'SEO professional centered at a premium laptop reviewing organic ranking growth, clean Scottsdale office, soft desert landscape through large window behind',
  'Digital Marketing': 'marketer centered at a premium laptop reviewing campaign analytics dashboards, clean modern Scottsdale agency office, warm professional atmosphere',
  'Social Media':      'content creator centered at a premium laptop reviewing social media performance metrics, clean Scottsdale workspace, warm editorial lighting',
  'Credit Repair':     'confident entrepreneur centered at a premium desk reviewing improving financial charts, clean modern Scottsdale office, warm desert afternoon light',
  'Business Services': 'business professional centered at a clean Scottsdale boardroom table reviewing documents, warm golden Arizona light, minimal uncluttered background',
};

function buildImagePrompt(slug: string, category: string): string {
  const slugLower = slug.toLowerCase();
  let scene = '';

  for (const [pattern, sceneDesc] of IMAGE_SCENES) {
    if (slugLower.includes(pattern)) {
      scene = sceneDesc;
      break;
    }
  }

  if (!scene) {
    scene = CATEGORY_SCENES[category] ?? 'professional business owner centered at a premium modern desk overlooking the Scottsdale skyline, warm golden light, clean uncluttered background';
  }

  return `Centered composition, subject centered in frame filling 60-70% of the image, ${scene}, warm golden Arizona light, sharp focus, clean uncluttered background, premium lifestyle photography, aspirational, photorealistic, Instagram-optimized, no text, no logos, no watermarks`;
}

// ── Brand overlay compositor ──────────────────────────────────────────────────
// Lower-third branded panel over the bottom 28% of the image only.
// Top 72% is pixel-perfect untouched.
//
// SVG is used only for the panel rectangle and accent line (no fonts needed).
// Text is rendered via sharp's built-in libvips text engine (font:'sans' maps
// to DejaVu Sans on Vercel's Linux environment — always available).
async function compositeOverlay(imageBuffer: Buffer, displayTitle: string, category: string): Promise<Buffer> {
  const meta = await sharp(imageBuffer).metadata();
  const W = meta.width  ?? 1024;
  const H = meta.height ?? 1024;

  const panelTop  = Math.round(H * 0.72);
  const pad       = Math.round(W * 0.04);
  const accentH   = Math.max(3, Math.round(H * 0.003));  // crimson accent line height
  const textW     = W - 2 * pad;                          // max text width
  const bottomPad = Math.round(H * 0.04);

  // Font sizes scaled from reference values at 1024 px
  const headSz = Math.round(52 * H / 1024);
  const catSz  = Math.round(28 * H / 1024);
  const rahSz  = Math.round(22 * H / 1024);

  // Pango XML escaping (used inside <span> markup)
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Render each text element as an RGBA PNG via sharp's libvips text renderer.
  // Pango <span foreground="..."> sets text colour; rgba:true preserves alpha.
  // width on the headline enables automatic word-wrap at textW pixels.
  const [headlineBuf, categoryBuf, rahBuf] = await Promise.all([
    sharp({
      text: {
        text: `<span foreground="#FFFFFF">${esc(displayTitle)}</span>`,
        font: 'sans',
        fontSize: headSz,
        rgba: true,
        width: textW,
      },
    }).png().toBuffer(),
    sharp({
      text: {
        text: `<span foreground="#8B1E1E">${esc(category.toUpperCase())}</span>`,
        font: 'sans',
        fontSize: catSz,
        rgba: true,
      },
    }).png().toBuffer(),
    sharp({
      text: {
        text: '<span foreground="#C8B99A">RAH.</span>',
        font: 'sans',
        fontSize: rahSz,
        rgba: true,
      },
    }).png().toBuffer(),
  ]);

  // Read back rendered dimensions for precise positioning
  const [headlineInfo, categoryInfo, rahInfo] = await Promise.all([
    sharp(headlineBuf).metadata(),
    sharp(categoryBuf).metadata(),
    sharp(rahBuf).metadata(),
  ]);

  const headlineH = headlineInfo.height ?? headSz * 2;
  const categoryH = categoryInfo.height ?? catSz;
  const rahW      = rahInfo.width       ?? rahSz * 4;
  const rahH      = rahInfo.height      ?? rahSz;

  // Positions built bottom-up
  const catTop      = H - bottomPad - categoryH;
  const headlineGap = Math.round(H * 0.015);
  const headlineTop = Math.max(panelTop + accentH + 4, catTop - headlineGap - headlineH);
  const rahTop      = H - bottomPad - rahH;
  const rahLeft     = Math.max(pad, W - pad - rahW);

  // Dark panel + crimson accent line — pure SVG rects, no fonts
  const panelSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="${panelTop}" width="${W}" height="${H - panelTop}" fill="#0A0A0A" fill-opacity="0.88"/>
  <rect x="0" y="${panelTop}" width="${W}" height="${accentH}" fill="#8B1E1E"/>
</svg>`;

  return sharp(imageBuffer)
    .composite([
      { input: Buffer.from(panelSvg), blend: 'over' },
      { input: headlineBuf, top: headlineTop, left: pad,     blend: 'over' },
      { input: categoryBuf, top: catTop,      left: pad,     blend: 'over' },
      { input: rahBuf,      top: rahTop,      left: rahLeft, blend: 'over' },
    ])
    .jpeg({ quality: 90 })
    .toBuffer();
}

// ── RSS helpers ───────────────────────────────────────────────────────────────

interface BlogPostMeta {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  description?: string; // rich body content for RSS; overrides excerpt when present
  pubDate?: string;     // RFC 822 timestamp override; bypasses toRFC822 when set
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
    const pubDate = field('pubDate', entry) || undefined;
    if (slug && title && date) {
      posts.push({ title, excerpt, slug, date, pubDate });
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
    <pubDate>${p.pubDate ?? toRFC822(p.date)}</pubDate>
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

  // ── FONT PROBE (remove after confirming available fonts) ─────────────────────
  try {
    const fcList = execSync('fc-list', { timeout: 5000 }).toString().trim();
    console.log('[font-probe] fc-list output:\n' + (fcList || '(empty — no fonts found)'));
  } catch (e) {
    console.warn('[font-probe] fc-list failed:', e instanceof Error ? e.message : String(e));
  }
  try {
    const fcSans = execSync('fc-match sans', { timeout: 3000 }).toString().trim();
    console.log('[font-probe] fc-match sans:', fcSans);
  } catch (e) {
    console.warn('[font-probe] fc-match sans failed:', e instanceof Error ? e.message : String(e));
  }
  // ─────────────────────────────────────────────────────────────────────────────

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
        max_tokens: 8000,
        system: 'You are an expert SEO content writer for RAH Operations, a Scottsdale AZ digital agency offering website design, SEO, digital marketing, social media management, and credit repair. Write blog posts that rank on Google for local Arizona searches. Always write in a confident, helpful, expert tone. Never use filler content. Output only raw JSON — no prose, no markdown, no code fences. The current year is 2026. Never include a specific year in titles or headlines unless it is 2026.',
        messages: [
          {
            role: 'user',
            content: `Write a complete SEO blog post targeting the keyword: ${keyword}.

Return a JSON object with these exact fields:
- title: SEO title 50-60 chars with keyword
- displayTitle: Full engaging headline
- metaDescription: 150-160 char meta description with CTA
- category: one of: Website Design, SEO, Digital Marketing, Social Media, Credit Repair, Business Services
- excerpt: 2-3 sentence excerpt for blog listing page
- content: Full HTML string. Requirements: opening paragraph with primary keyword in first 100 words; 5-6 H2 sections at 150-250 words each; internal links to /website-design-and-seo, /digital-marketing, /social-media-management, /personal-credit-repair, /business-credit-and-funding, /website-intake, /marketing/intake, /credit-repair/intake using single-quoted href attributes; FAQ section with 3 questions; closing CTA paragraph with link to most relevant intake form; 1200-1600 words total`,
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

  // Extracts a valid ClaudePost from raw Claude output.
  // Strategy (applied in order until one succeeds):
  //   1. Strip ``` fences → parse full string
  //   2. Substring from first { to last } → parse
  //   3. Regex scan for any {...} block → parse the largest match
  const parseClaude = (rawText: string): ClaudePost => {
    // Step 1: strip leading/trailing code fences
    let clean = rawText
      .trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/,        '')
      .trim();

    try { return JSON.parse(clean) as ClaudePost; } catch { /* try next */ }

    // Step 2: substring between first { and last }
    const first = clean.indexOf('{');
    const last  = clean.lastIndexOf('}');
    if (first !== -1 && last > first) {
      const slice = clean.slice(first, last + 1);
      try { return JSON.parse(slice) as ClaudePost; } catch { /* try next */ }
    }

    // Step 3: regex scan for any {...} block (handles prose before/after)
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]) as ClaudePost; } catch { /* fall through */ }
    }

    throw new SyntaxError(
      `No valid JSON object found in Claude response.\n` +
      `Length: ${rawText.length}\n` +
      `Full raw response:\n${rawText}`,
    );
  };

  let post: ClaudePost;
  const rawResponses: string[] = [];
  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let rawText: string;
    try {
      rawText = await callClaude();
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
    rawResponses.push(rawText);
    console.log(`[generate-blog] Claude attempt ${attempt} — ${rawText.length} chars:`, rawText.slice(0, 2000));

    try {
      post = parseClaude(rawText);
      console.log(`[generate-blog] Claude parsed successfully on attempt ${attempt}`);
      break;
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      console.error(`[generate-blog] Parse attempt ${attempt} failed: ${msg}`);
      console.error(`[generate-blog] Full raw response (attempt ${attempt}):\n${rawText}`);

      if (attempt === MAX_ATTEMPTS) {
        return res.status(500).json({
          error: `Failed to parse Claude JSON after ${MAX_ATTEMPTS} attempts`,
          attempts: rawResponses.map((r, i) => ({ attempt: i + 1, length: r.length, preview: r.slice(0, 600) })),
        });
      }

      console.log(`[generate-blog] Retrying (attempt ${attempt + 1} of ${MAX_ATTEMPTS})…`);
    }
  }

  // ── STEP 3: generate image via Kie.ai ───────────────────────────────────────
  const FALLBACK_IMG = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/public/blogs/how-to-improve-google-business-profile-scottsdale.jpg`;
  let imageBuffer: Buffer | null = null;

  if (kieKey) {
    try {
      const imagePrompt = buildImagePrompt(slug, post.category);
      console.log(`[generate-blog] image prompt: ${imagePrompt}`);
      imageBuffer = await generateKieImage(kieKey, imagePrompt);
      // ── DEBUG: image buffer from Kie.ai ──────────────────────────────────────
      if (imageBuffer) {
        console.log(`[DEBUG:image] Kie.ai returned buffer — size: ${imageBuffer.length} bytes (${(imageBuffer.length / 1024).toFixed(1)} KB)`);
        try {
          const rawSize = imageBuffer.length;
          imageBuffer = await compositeOverlay(imageBuffer, post.displayTitle, post.category);
          console.log(`[DEBUG:image] compositeOverlay succeeded — before: ${(rawSize / 1024).toFixed(1)} KB, after: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
        } catch (overlayErr) {
          console.error('[DEBUG:image] compositeOverlay FAILED (using raw image):', overlayErr instanceof Error ? overlayErr.message : String(overlayErr));
        }
      } else {
        console.warn('[DEBUG:image] Kie.ai returned null — will use fallback image');
      }
    } catch (imgErr) {
      console.error('[DEBUG:image] Kie.ai threw:', imgErr instanceof Error ? imgErr.message : String(imgErr));
    }
  } else {
    console.warn('[DEBUG:image] KIE_API_KEY not set — skipping image generation');
  }

  // ── STEP 4: build file changes ───────────────────────────────────────────────
  const dateDisplay = formatDate(today);
  const dateISO = formatDateISO(today);

  // Count existing posts to determine issue number
  const issueCount = (blogPageRaw.match(/slug:/g) || []).length + 1;
  const issueNum = String(issueCount).padStart(3, '0');

  const pubDateUTC = new Date().toUTCString();

  const newPostEntry = `    {
      title: ${JSON.stringify(post.title)},
      displayTitle: ${JSON.stringify(post.displayTitle)},
      date: ${JSON.stringify(dateDisplay)},
      pubDate: ${JSON.stringify(pubDateUTC)},
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
      console.log(`[DEBUG:image] pushing ${(imageBuffer.length / 1024).toFixed(1)} KB to GitHub: ${imgPath}`);
      await putGitHubBinary(githubToken, githubRepo, githubBranch, imgPath, imageBuffer, existingImgSha, `Add blog hero image: ${slug}`);
      imageUploaded = true;
      const githubRawUrl = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/${imgPath}`;
      const productionUrl  = `https://www.rahoperations.com/blogs/${slug}.jpg`;
      console.log(`[DEBUG:image] GitHub raw URL: ${githubRawUrl}`);
      console.log(`[DEBUG:image] Production image URL: ${productionUrl}`);
    } catch (imgPushErr) {
      console.error('[DEBUG:image] push to GitHub FAILED:', imgPushErr instanceof Error ? imgPushErr.message : String(imgPushErr));
    }
  }

  // If no image was pushed, copy the fallback so /blogs/[slug].jpg always resolves
  if (!imageUploaded) {
    try {
      const fallbackRes = await fetch(FALLBACK_IMG);
      if (fallbackRes.ok) {
        let fallbackBuf = Buffer.from(await fallbackRes.arrayBuffer());
        try {
          fallbackBuf = await compositeOverlay(fallbackBuf, post.displayTitle, post.category);
        } catch (overlayErr) {
          console.error('Overlay on fallback failed (using raw fallback):', overlayErr instanceof Error ? overlayErr.message : String(overlayErr));
        }
        let existingImgSha: string | null = null;
        try {
          const existing = await getGitHubFile(githubToken, githubRepo, imgPath);
          existingImgSha = existing.sha;
        } catch (_) { /* file doesn't exist yet */ }
        await putGitHubBinary(githubToken, githubRepo, githubBranch, imgPath, fallbackBuf, existingImgSha, `Add fallback hero image: ${slug}`);
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
    // Build the new post entry directly — never rely on parseBlogPagePosts finding it,
    // because the excerpt/title regex can silently fail on complex Claude output.
    const newPost: BlogPostMeta = {
      title: post.title,
      excerpt: post.excerpt,
      slug,
      date: dateDisplay,
      pubDate: pubDateUTC,
      description: extractRssDescription(post.content),
    };

    // ── DEBUG: RSS inputs ─────────────────────────────────────────────────────
    console.log(`[DEBUG:rss] pubDateUTC value: "${pubDateUTC}"`);
    console.log(`[DEBUG:rss] newPost.slug: ${newPost.slug}`);
    console.log(`[DEBUG:rss] newPost.pubDate: "${newPost.pubDate}"`);
    console.log(`[DEBUG:rss] enclosure URL will be: https://www.rahoperations.com/blogs/${slug}.jpg`);

    // Parse the rest of the feed from the updated source, excluding the new slug
    // (in case parseBlogPagePosts did happen to pick it up).
    const existingPosts = parseBlogPagePosts(updatedBlogPage).filter((p) => p.slug !== slug);
    console.log(`[DEBUG:rss] existingPosts parsed from BlogPage: ${existingPosts.length}`);

    const feedPosts = [newPost, ...existingPosts];
    console.log(`[DEBUG:rss] total feedPosts: ${feedPosts.length}`);
    if (feedPosts.length > 0) {
      const rssXml = buildRSS(feedPosts);
      console.log(`[DEBUG:rss] generated rss.xml — ${rssXml.length} chars`);
      console.log(`[DEBUG:rss] rss.xml first item preview:\n${rssXml.slice(rssXml.indexOf('<item>'), rssXml.indexOf('</item>') + 7)}`);
      let rssSha: string | null = null;
      try {
        const existingRss = await getGitHubFile(githubToken, githubRepo, 'public/rss.xml');
        rssSha = existingRss.sha;
      } catch (_) { /* rss.xml doesn't exist yet — will be created */ }
      await putGitHubBinary(githubToken, githubRepo, githubBranch, 'public/rss.xml', Buffer.from(rssXml, 'utf8'), rssSha, `Regenerate rss.xml: add ${slug}`);
      console.log(`[DEBUG:rss] rss.xml pushed to GitHub successfully`);
    } else {
      console.warn('[DEBUG:rss] no posts parsed from BlogPage.tsx — skipping rss.xml update');
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
