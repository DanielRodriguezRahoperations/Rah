import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

interface CheckResult {
  score: number;
  max: number;
  passed: boolean;
  message: string;
}

interface AuditResults {
  score: number;
  grade: string;
  checks: {
    ssl: CheckResult;
    metaTags: CheckResult;
    viewport: CheckResult;
    sitemap: CheckResult;
    robots: CheckResult;
    schema: CheckResult;
    googleBusiness: CheckResult;
    pageSpeed: CheckResult;
  };
  recommendations: string[];
}

function normalizeDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, '');
  d = d.replace(/^www\./, '');
  d = d.split('/')[0];
  d = d.split('?')[0];
  return d;
}

function getGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

async function fetchWithTimeout(
  url: string,
  timeoutMs = 6000
): Promise<{ ok: boolean; status: number; text: string; elapsed: number }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RAHAuditBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    const text = await res.text();
    clearTimeout(timer);
    return { ok: true, status: res.status, text, elapsed: Date.now() - start };
  } catch {
    clearTimeout(timer);
    return { ok: false, status: 0, text: '', elapsed: Date.now() - start };
  }
}

function buildAuditResults(
  pageRes: { ok: boolean; status: number; text: string; elapsed: number },
  sitemapRes: { ok: boolean; status: number; text: string; elapsed: number },
  robotsRes: { ok: boolean; status: number; text: string; elapsed: number }
): AuditResults {
  const html = pageRes.text;
  const recommendations: string[] = [];

  // CHECK 1 — SSL
  const sslPassed = pageRes.ok;
  const ssl: CheckResult = sslPassed
    ? { score: 10, max: 10, passed: true, message: 'Your site is secure and uses HTTPS.' }
    : { score: 0, max: 10, passed: false, message: 'HTTPS connection failed. Visitors see a security warning.' };
  if (!sslPassed) recommendations.push('Install an SSL certificate so your site loads over HTTPS. Most hosting providers offer free Let\'s Encrypt certificates.');

  // CHECK 2 — Meta tags (30 pts)
  let metaScore = 0;
  const metaMessages: string[] = [];

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  if (titleText.length >= 10 && titleText.length <= 60) {
    metaScore += 10;
    metaMessages.push('Title tag is present and the right length.');
  } else if (titleText) {
    metaScore += 4;
    metaMessages.push(`Title is ${titleText.length} chars — should be 10–60 chars.`);
    recommendations.push(`Rewrite your page title to 10–60 characters. Current: ${titleText.length} chars.`);
  } else {
    metaMessages.push('No title tag found.');
    recommendations.push('Add a unique <title> tag to every page (10–60 characters).');
  }

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*?)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']*?)["'][^>]*name=["']description["']/i);
  const descText = descMatch ? descMatch[1].trim() : '';
  if (descText.length >= 120 && descText.length <= 160) {
    metaScore += 10;
    metaMessages.push('Meta description is present and the right length.');
  } else if (descText) {
    metaScore += 4;
    metaMessages.push(`Meta description is ${descText.length} chars — ideal is 120–160.`);
    recommendations.push(`Rewrite your meta description to 120–160 characters. Current: ${descText.length} chars.`);
  } else {
    metaMessages.push('No meta description found.');
    recommendations.push('Add a meta description (120–160 characters) to each page to improve click-through rates from Google.');
  }

  const hasOgTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  if (hasOgTitle) {
    metaScore += 5;
    metaMessages.push('Open Graph title is present.');
  } else {
    metaMessages.push('No og:title tag found.');
    recommendations.push('Add Open Graph tags (og:title, og:description, og:image) to improve how your site appears when shared on social media.');
  }

  const hasOgDesc = /<meta[^>]+property=["']og:description["']/i.test(html);
  if (hasOgDesc) {
    metaScore += 5;
    metaMessages.push('Open Graph description is present.');
  }

  const metaPassed = metaScore >= 25;
  const metaTags: CheckResult = {
    score: metaScore,
    max: 30,
    passed: metaPassed,
    message: metaMessages.slice(0, 2).join(' '),
  };

  // CHECK 3 — Mobile viewport
  const hasViewport =
    /<meta[^>]+name=["']viewport["'][^>]+content=["'][^"']*width=device-width/i.test(html) ||
    /<meta[^>]+content=["'][^"']*width=device-width[^"']*["'][^>]+name=["']viewport["']/i.test(html);
  const viewport: CheckResult = hasViewport
    ? { score: 10, max: 10, passed: true, message: 'Viewport meta tag found — mobile-ready.' }
    : { score: 0, max: 10, passed: false, message: 'No viewport meta tag. Your site may appear broken on mobile.' };
  if (!hasViewport) recommendations.push('Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your HTML <head> for proper mobile display.');

  // CHECK 4 — Sitemap
  const hasSitemap = sitemapRes.ok && sitemapRes.status === 200;
  const sitemap: CheckResult = hasSitemap
    ? { score: 10, max: 10, passed: true, message: 'sitemap.xml found and accessible.' }
    : { score: 0, max: 10, passed: false, message: 'No sitemap.xml found. Google may miss pages on your site.' };
  if (!hasSitemap) recommendations.push('Create an XML sitemap and submit it to Google Search Console so all your pages get indexed.');

  // CHECK 5 — Robots.txt
  const hasRobots = robotsRes.ok && robotsRes.status === 200;
  const robots: CheckResult = hasRobots
    ? { score: 10, max: 10, passed: true, message: 'robots.txt found and accessible.' }
    : { score: 0, max: 10, passed: false, message: 'No robots.txt found. Search crawlers lack guidance on your site.' };
  if (!hasRobots) recommendations.push('Add a robots.txt file to guide search engine crawlers and prevent indexing of private pages.');

  // CHECK 6 — Schema markup
  const hasSchema = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
  const schema: CheckResult = hasSchema
    ? { score: 10, max: 10, passed: true, message: 'Structured data (JSON-LD) found on the page.' }
    : { score: 0, max: 10, passed: false, message: 'No structured data found. Google can\'t identify your business type.' };
  if (!hasSchema) recommendations.push('Add JSON-LD structured data (LocalBusiness, Organization) so Google can display rich results for your business.');

  // CHECK 7 — Google Business indicators
  const hasLocalBusiness = /"@type"\s*:\s*"LocalBusiness"/i.test(html);
  const hasGoogleMaps = /google\.com\/maps/i.test(html);
  const hasBusinessGoogle = /business\.google\.com/i.test(html);
  const hasGoogleBiz = hasLocalBusiness || hasGoogleMaps || hasBusinessGoogle;
  const googleBusiness: CheckResult = hasGoogleBiz
    ? { score: 10, max: 10, passed: true, message: 'Google Business signals detected on the page.' }
    : { score: 0, max: 10, passed: false, message: 'No Google Business signals found. Local visibility is at risk.' };
  if (!hasGoogleBiz) recommendations.push('Add your Google Business Profile link and LocalBusiness schema to boost local search rankings and Google Maps visibility.');

  // CHECK 8 — Page speed
  const elapsed = pageRes.elapsed;
  let speedScore = 0;
  let speedMessage = '';
  if (!pageRes.ok) {
    speedScore = 0;
    speedMessage = 'Page failed to load — speed could not be measured.';
  } else if (elapsed < 2000) {
    speedScore = 10;
    speedMessage = `Fast load: ${(elapsed / 1000).toFixed(1)}s. Under 2 seconds.`;
  } else if (elapsed < 4000) {
    speedScore = 7;
    speedMessage = `Moderate load: ${(elapsed / 1000).toFixed(1)}s. Room to improve.`;
    recommendations.push('Your page loads in over 2 seconds. Compress images, enable browser caching, and consider a CDN to improve speed.');
  } else if (elapsed < 6000) {
    speedScore = 4;
    speedMessage = `Slow load: ${(elapsed / 1000).toFixed(1)}s. Visitors may leave before it finishes.`;
    recommendations.push('Your page takes over 4 seconds to load. This directly hurts your Google ranking. Optimize images, reduce plugins, and upgrade hosting.');
  } else {
    speedScore = 0;
    speedMessage = `Very slow: ${(elapsed / 1000).toFixed(1)}s. This is critical — most visitors will leave.`;
    recommendations.push('Your page takes over 6 seconds to load. This is a critical issue. Immediately optimize images, reduce JavaScript, and upgrade your hosting plan.');
  }
  const pageSpeed: CheckResult = { score: speedScore, max: 10, passed: speedScore >= 7, message: speedMessage };

  const total =
    ssl.score + metaTags.score + viewport.score + sitemap.score +
    robots.score + schema.score + googleBusiness.score + pageSpeed.score;

  return {
    score: total,
    grade: getGrade(total),
    checks: { ssl, metaTags, viewport, sitemap, robots, schema, googleBusiness, pageSpeed },
    recommendations,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { domain: rawDomain, name, email } = req.body ?? {};
  if (!rawDomain || !name || !email) {
    return res.status(400).json({ error: 'domain, name, and email are required' });
  }

  const domain = normalizeDomain(rawDomain);
  if (!domain || domain.length < 3) {
    return res.status(400).json({ error: 'Invalid domain' });
  }

  const baseUrl = `https://www.${domain}`;

  // Run all fetches in parallel
  const [pageSettled, sitemapSettled, robotsSettled] = await Promise.allSettled([
    fetchWithTimeout(baseUrl, 6000),
    fetchWithTimeout(`${baseUrl}/sitemap.xml`, 5000),
    fetchWithTimeout(`${baseUrl}/robots.txt`, 5000),
  ]);

  const pageRes = pageSettled.status === 'fulfilled' ? pageSettled.value : { ok: false, status: 0, text: '', elapsed: 6000 };
  const sitemapRes = sitemapSettled.status === 'fulfilled' ? sitemapSettled.value : { ok: false, status: 0, text: '', elapsed: 0 };
  const robotsRes = robotsSettled.status === 'fulfilled' ? robotsSettled.value : { ok: false, status: 0, text: '', elapsed: 0 };

  const auditResults = buildAuditResults(pageRes, sitemapRes, robotsRes);

  // Save to Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: lead, error: dbError } = await supabase
    .from('audit_leads')
    .insert({
      domain,
      name,
      email,
      audit_score: auditResults.score,
      audit_results: auditResults,
      status: 'new',
    })
    .select('id')
    .single();

  if (dbError) {
    console.error('[run-audit] db error:', dbError);
  }

  // Send emails (fire both in parallel, don't block on errors)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const failedChecks = Object.entries(auditResults.checks)
      .filter(([, v]) => !v.passed)
      .map(([k, v]) => `<li><strong>${k}</strong> — ${v.score}/${v.max} — ${v.message}</li>`)
      .join('');

    const passedChecks = Object.entries(auditResults.checks)
      .filter(([, v]) => v.passed)
      .map(([, v]) => `<li style="color:#22c55e">✅ ${v.message}</li>`)
      .join('');

    const failedChecksEmail = Object.entries(auditResults.checks)
      .filter(([, v]) => !v.passed)
      .map(([, v]) => `<li style="color:#ef4444">❌ ${v.message}</li>`)
      .join('');

    const recsHtml = auditResults.recommendations
      .map((r, i) => `<li>${i + 1}. ${r}</li>`)
      .join('');

    const adminEmail = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: 'RAH Website <onboarding@resend.dev>',
        to: ['daniel@rahoperations.com'],
        reply_to: email,
        subject: `New Audit Lead — ${domain} — Score: ${auditResults.score}/100`,
        html: `<div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#7A1C1C">New Website Audit Lead</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${email}" style="color:#7a1c1c">${email}</a></td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Domain</td><td style="padding:8px;border-bottom:1px solid #eee">${domain}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Score</td><td style="padding:8px;border-bottom:1px solid #eee"><strong>${auditResults.score}/100 — Grade ${auditResults.grade}</strong></td></tr>
          </table>
          <h3>Failed Checks:</h3>
          <ul>${failedChecks || '<li>All checks passed!</li>'}</ul>
          <h3>Recommendations:</h3>
          <ol>${recsHtml || '<li>No major issues found.</li>'}</ol>
        </div>`,
      }),
    });

    const clientEmail = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: 'RAH Operations <onboarding@resend.dev>',
        to: [email],
        reply_to: 'daniel@rahoperations.com',
        subject: `Your Free Website Audit — ${auditResults.score}/100`,
        html: `<div style="font-family:sans-serif;max-width:600px;color:#1a1a1a">
          <div style="background:#0f0f0f;padding:32px;text-align:center;margin-bottom:24px">
            <p style="color:#9d3f3f;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:8px">Website Audit Results</p>
            <div style="font-size:64px;font-weight:700;color:${auditResults.score >= 75 ? '#22c55e' : auditResults.score >= 60 ? '#f59e0b' : '#ef4444'};font-family:monospace">${auditResults.score}</div>
            <div style="font-size:16px;color:#888;margin-top:4px">out of 100 — Grade <strong style="color:#F5F5F5">${auditResults.grade}</strong></div>
            <div style="font-size:13px;color:#666;margin-top:8px">${domain}</div>
          </div>
          <div style="margin-bottom:24px">
            <h2 style="font-size:16px;color:#1a1a1a;margin-bottom:12px">✅ What's Working</h2>
            <ul style="list-style:none;padding:0;margin:0">${passedChecks || '<li style="color:#22c55e">✅ Keep up the good work!</li>'}</ul>
          </div>
          ${Object.values(auditResults.checks).some(v => !v.passed) ? `
          <div style="margin-bottom:24px">
            <h2 style="font-size:16px;color:#1a1a1a;margin-bottom:12px">❌ What Needs Fixing</h2>
            <ul style="list-style:none;padding:0;margin:0">${failedChecksEmail}</ul>
          </div>` : ''}
          ${auditResults.recommendations.length > 0 ? `
          <div style="margin-bottom:24px">
            <h2 style="font-size:16px;color:#1a1a1a;margin-bottom:12px">Top Recommendations</h2>
            <ol style="padding-left:20px;color:#444">${recsHtml}</ol>
          </div>` : ''}
          <div style="background:#7A1C1C;padding:24px;text-align:center;border-radius:4px">
            <p style="color:#fff;font-size:18px;font-weight:700;margin-bottom:8px">Want RAH to fix all of this?</p>
            <p style="color:#f5c6c6;font-size:14px;margin-bottom:16px">Most of these issues can be resolved in a single day. We've done it for businesses across Arizona and nationwide.</p>
            <a href="https://www.rahoperations.com/contact" style="display:inline-block;background:#fff;color:#7A1C1C;padding:12px 28px;font-weight:700;font-size:13px;text-decoration:none;border-radius:4px">Book a Free 15-Minute Call →</a>
          </div>
          <p style="font-size:12px;color:#888;text-align:center;margin-top:20px">RAH Operations · Scottsdale, AZ · <a href="https://www.rahoperations.com" style="color:#7a1c1c">rahoperations.com</a></p>
        </div>`,
      }),
    });

    await Promise.allSettled([adminEmail, clientEmail]);
  }

  return res.status(200).json({
    ...auditResults,
    leadId: lead?.id ?? null,
    domain,
  });
}
