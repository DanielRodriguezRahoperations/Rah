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
}

function parseBlogPagePosts(source: string): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];
  const match = source.match(/const posts\s*=\s*\[([\s\S]*?)\n\s*\];/);
  if (!match) return posts;

  for (const entry of match[1].split(/(?=\n\s*\{)/)) {
    const titleM   = entry.match(/\btitle:\s*"((?:[^"\\]|\\.)*)"/);
    const excerptM = entry.match(/\bexcerpt:\s*"((?:[^"\\]|\\.)*)"/);
    const slugM    = entry.match(/\bslug:\s*['"]([^'"]+)['"]/);
    const dateM    = entry.match(/\bdate:\s*"([^"]+)"/);
    if (titleM && excerptM && slugM && dateM) {
      posts.push({
        title:   titleM[1].replace(/\\"/g, '"'),
        excerpt: excerptM[1].replace(/\\"/g, '"'),
        slug:    slugM[1],
        date:    dateM[1],
      });
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
    <description><![CDATA[${p.excerpt}]]></description>
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

  // ── STEP 2: call Claude API ─────────────────────────────────────────────────
  const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
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

  if (!claudeRes.ok) {
    const err = await claudeRes.text();
    return res.status(500).json({ error: `Claude API error: ${claudeRes.status}`, detail: err });
  }

  const claudeData = await claudeRes.json() as { content: Array<{ type: string; text: string }> };
  const rawText = claudeData.content[0]?.text ?? '';

  // Strip markdown code fences if present
  let cleanText = rawText.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.slice(7);
  }
  if (cleanText.startsWith('```')) {
    cleanText = cleanText.slice(3);
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.slice(0, -3);
  }
  cleanText = cleanText.trim();

  // Parse the cleaned JSON
  let post: ClaudePost;
  try {
    post = JSON.parse(cleanText) as ClaudePost;
  } catch (parseErr) {
    console.error('Raw Claude response:', rawText.slice(0, 500));
    return res.status(500).json({
      error: 'Failed to parse Claude JSON',
      raw: rawText.slice(0, 200)
    });
  }

  // ── STEP 3: generate image via Kie.ai ───────────────────────────────────────
  let imageBuffer: Buffer | null = null;
  const FALLBACK_IMG = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/public/blogs/how-to-improve-google-business-profile-scottsdale.jpg`;

  if (kieKey) {
    try {
      const imgRes = await fetch('https://api.kie.ai/v1/images/generations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${kieKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: post.imagePrompt, n: 1, size: '1792x1024' }),
      });
      if (imgRes.ok) {
        const imgData = await imgRes.json() as { data?: Array<{ url?: string; b64_json?: string }> };
        const item = imgData.data?.[0];
        if (item?.b64_json) {
          imageBuffer = Buffer.from(item.b64_json, 'base64');
        } else if (item?.url) {
          const download = await fetch(item.url);
          if (download.ok) {
            const ab = await download.arrayBuffer();
            imageBuffer = Buffer.from(ab);
          } else {
            console.error(`Kie.ai image download failed: ${download.status} ${download.statusText}`);
          }
        } else {
          console.error('Kie.ai returned no url or b64_json:', JSON.stringify(imgData).slice(0, 300));
        }
      } else {
        const errBody = await imgRes.text();
        console.error(`Kie.ai API error: ${imgRes.status} ${imgRes.statusText} — ${errBody.slice(0, 400)}`);
      }
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
