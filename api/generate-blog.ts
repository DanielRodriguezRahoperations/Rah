import type { VercelRequest, VercelResponse } from '@vercel/node';
import sharp from 'sharp';

export const maxDuration = 90;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

// 210 SEO-optimized topics. Each slug maps directly to a keyword phrase people
// search on Google. The generator picks the first unpublished slug via find().
const TOPICS = [
  // ── Website Audit (1-30) ──────────────────────────────────────────────────────
  'free-website-audit-tool-for-small-businesses-no-signup-required',
  'website-audit-checklist-for-small-business-owners-2026',
  'how-to-audit-your-website-seo-step-by-step-free-guide',
  'why-your-website-is-not-showing-up-on-google-fix-it-now',
  'free-website-seo-checker-no-account-needed',
  'how-to-read-a-website-audit-report-and-what-to-fix-first',
  'website-audit-for-restaurants-how-to-get-found-on-google',
  'website-audit-for-contractors-rank-higher-in-your-city',
  'website-audit-for-dentists-get-more-patients-from-google',
  'website-audit-for-real-estate-agents-complete-seo-guide',
  'website-audit-for-law-firms-what-google-looks-for',
  'website-audit-for-plumbers-how-to-rank-locally',
  'website-audit-for-hvac-companies-local-seo-guide-2026',
  'website-audit-for-roofers-get-more-leads-from-google',
  'website-audit-for-med-spas-attract-more-clients-online',
  'what-does-a-free-website-audit-actually-check',
  'what-is-a-good-website-audit-score-and-how-to-improve-it',
  'how-to-fix-a-low-website-seo-score-fast',
  'website-health-check-what-every-small-business-owner-needs',
  'how-to-check-if-your-website-is-mobile-friendly-free-tool',
  'what-is-ssl-certificate-and-why-your-website-needs-it',
  'how-to-check-your-website-speed-and-fix-slow-load-times',
  'what-is-schema-markup-and-does-your-website-have-it',
  'what-is-an-xml-sitemap-and-does-your-website-need-one',
  'website-audit-vs-seo-audit-what-is-the-difference',
  'how-often-should-you-audit-your-small-business-website',
  'technical-seo-audit-what-it-is-and-why-it-matters',
  'how-to-improve-your-website-seo-score-without-an-agency',
  'free-website-grader-tool-what-your-score-actually-means',
  'website-seo-checker-free-tool-for-small-business-owners',
  // ── SEO (31-60) ───────────────────────────────────────────────────────────────
  'what-is-seo-and-how-does-it-work-for-small-businesses',
  'how-long-does-seo-take-to-work-honest-answer',
  'local-seo-complete-guide-for-small-business-owners-2026',
  'how-to-rank-on-google-without-paying-for-ads',
  'on-page-seo-checklist-for-small-business-websites-2026',
  'how-to-do-keyword-research-for-your-small-business-free',
  'how-to-write-seo-blog-posts-that-actually-rank-on-google',
  'what-is-a-backlink-and-why-does-your-website-need-them',
  'how-to-get-your-business-on-the-first-page-of-google',
  'seo-for-beginners-complete-guide-for-small-business-owners',
  'how-to-optimize-your-google-business-profile-to-rank-higher',
  'how-to-get-more-google-reviews-for-your-business-fast',
  'local-seo-vs-national-seo-which-does-your-business-need',
  'what-is-a-meta-description-and-how-to-write-one-that-ranks',
  'how-to-write-title-tags-that-rank-on-google-2026',
  'what-is-domain-authority-and-how-to-improve-it-fast',
  'how-to-build-backlinks-for-a-small-business-website',
  'what-is-page-speed-and-how-it-affects-your-google-rankings',
  'how-to-optimize-images-for-seo-without-slowing-your-site',
  'how-to-track-your-seo-rankings-for-free-google-tools',
  'google-search-console-complete-guide-for-small-business',
  'how-to-do-a-competitor-seo-analysis-step-by-step',
  'what-are-core-web-vitals-and-how-to-pass-google-standards',
  'how-to-rank-in-the-google-map-pack-local-seo-guide',
  'what-is-e-e-a-t-and-how-it-affects-your-google-rankings',
  'how-to-use-internal-links-to-boost-your-seo-rankings',
  'how-to-recover-from-a-google-penalty-step-by-step',
  'what-is-search-intent-and-why-it-matters-for-seo-rankings',
  'how-to-optimize-your-website-for-multiple-service-locations',
  'how-to-measure-seo-roi-for-your-small-business',
  // ── Web Design (61-80) ────────────────────────────────────────────────────────
  'how-much-does-a-small-business-website-cost-in-2026',
  'what-makes-a-high-converting-small-business-website',
  'how-to-choose-the-right-website-designer-for-your-business',
  'signs-your-website-needs-a-redesign-right-now',
  'how-long-does-it-take-to-build-a-small-business-website',
  'how-to-write-website-copy-that-converts-visitors-to-clients',
  'mobile-first-website-design-why-it-matters-for-google-rankings',
  'how-to-make-your-website-load-faster-step-by-step',
  'how-to-design-a-homepage-that-converts-visitors-to-leads',
  'what-pages-does-a-small-business-website-need-to-convert',
  'how-to-create-a-website-that-ranks-on-google-and-converts',
  'website-design-for-restaurants-what-you-need-to-rank',
  'website-design-for-law-firms-what-clients-expect-online',
  'website-design-for-medical-practices-what-to-include',
  'website-design-for-contractors-how-to-win-more-jobs-online',
  'how-to-write-an-about-page-that-builds-trust-and-converts',
  'how-to-create-a-services-page-that-sells-your-business',
  'what-is-conversion-rate-optimization-for-small-businesses',
  'how-to-add-testimonials-to-your-website-the-right-way',
  'how-to-create-a-faq-page-that-ranks-on-google',
  // ── Credit Repair (81-105) ────────────────────────────────────────────────────
  'how-to-fix-your-credit-score-fast-step-by-step-guide',
  'what-is-a-good-credit-score-and-how-to-achieve-it',
  'how-to-dispute-a-credit-report-error-and-win',
  'what-is-credit-utilization-and-how-it-kills-your-score',
  'how-long-does-it-take-to-repair-bad-credit-honest-answer',
  'how-to-remove-a-collection-from-your-credit-report',
  'what-is-a-pay-for-delete-letter-and-does-it-actually-work',
  'how-to-negotiate-with-debt-collectors-and-win',
  'what-is-credit-repair-and-how-does-it-actually-work',
  'diy-credit-repair-vs-hiring-a-professional-what-to-know',
  'how-to-improve-your-credit-score-in-30-days-proven-steps',
  'what-is-a-secured-credit-card-and-how-it-builds-credit-fast',
  'what-is-a-goodwill-letter-and-how-to-write-one-that-works',
  'how-to-remove-late-payments-from-your-credit-report',
  'how-to-rebuild-credit-after-bankruptcy-step-by-step',
  'how-business-credit-is-different-from-personal-credit',
  'how-to-build-business-credit-from-scratch-step-by-step',
  'what-is-a-duns-number-and-does-your-business-need-one',
  'how-to-get-net-30-accounts-to-build-business-credit',
  'what-is-paydex-score-and-how-to-improve-it-fast',
  'how-to-get-a-business-credit-card-with-no-personal-guarantee',
  'how-to-qualify-for-a-small-business-loan-in-2026',
  'what-is-an-ein-and-why-your-business-needs-one-today',
  'how-to-set-up-your-business-entity-to-build-credit-fast',
  'how-to-separate-business-and-personal-credit-the-right-way',
  // ── Digital Marketing (106-130) ───────────────────────────────────────────────
  'what-is-digital-marketing-and-does-your-small-business-need-it',
  'how-to-create-a-digital-marketing-strategy-that-gets-results',
  'how-to-get-more-followers-on-instagram-for-your-business',
  'what-is-email-marketing-and-how-to-use-it-to-get-clients',
  'how-to-create-a-google-ads-campaign-for-small-business',
  'what-is-facebook-advertising-and-is-it-worth-it-in-2026',
  'how-to-create-content-that-attracts-your-ideal-customer',
  'what-is-a-sales-funnel-and-how-to-build-one-for-free',
  'how-to-use-video-marketing-to-grow-your-small-business',
  'how-to-create-a-social-media-content-calendar-that-works',
  'how-to-use-google-my-business-to-get-more-local-customers',
  'what-is-retargeting-and-how-to-use-it-for-small-business',
  'how-to-measure-your-digital-marketing-roi-step-by-step',
  'how-to-create-instagram-reels-that-grow-your-business',
  'how-to-write-ad-copy-that-converts-clicks-to-customers',
  'how-to-create-a-lead-magnet-that-actually-gets-leads',
  'what-is-marketing-automation-and-how-to-set-it-up-free',
  'how-to-use-linkedin-to-get-more-b2b-clients',
  'what-is-reputation-management-and-why-it-matters-in-2026',
  'how-to-respond-to-negative-google-reviews-professionally',
  'how-to-get-more-five-star-google-reviews-fast',
  'what-is-a-google-business-profile-post-and-how-to-use-it',
  'what-is-youtube-seo-and-how-to-rank-your-business-videos',
  'what-is-haro-and-how-to-use-it-to-get-free-backlinks',
  'how-to-build-a-personal-brand-online-that-gets-you-clients',
  // ── Business Services (131-150) ───────────────────────────────────────────────
  'how-to-start-a-business-in-arizona-complete-step-by-step-guide',
  'how-to-form-an-llc-in-arizona-everything-you-need-to-know',
  'how-to-get-a-business-license-in-arizona-fast',
  'how-to-open-a-business-bank-account-for-your-llc',
  'how-to-write-a-business-plan-that-gets-funding',
  'how-to-price-your-services-as-a-small-business-owner',
  'what-is-cash-flow-and-how-to-manage-it-for-small-business',
  'how-to-create-invoices-that-get-paid-fast',
  'how-to-set-up-quickbooks-for-your-small-business-free-guide',
  'how-to-hire-your-first-employee-in-arizona-legal-guide',
  'how-to-write-a-business-contract-that-protects-you',
  'how-to-create-a-business-budget-that-actually-works',
  'what-is-the-difference-between-sole-proprietorship-and-llc',
  'how-to-scale-a-small-business-without-burning-out',
  'what-is-a-virtual-office-and-does-your-business-need-one',
  'how-to-write-a-proposal-that-wins-clients-every-time',
  'what-is-a-retainer-agreement-and-how-to-use-one',
  'how-to-create-systems-that-run-your-business-without-you',
  'how-to-protect-your-business-intellectual-property',
  'how-to-transition-from-freelancer-to-business-owner',
  // ── Local Scottsdale/Phoenix (151-170) ────────────────────────────────────────
  'best-small-business-resources-in-scottsdale-arizona-2026',
  'how-to-start-a-business-in-scottsdale-az-complete-guide',
  'how-to-market-a-small-business-in-phoenix-arizona',
  'how-to-get-your-business-listed-on-google-maps-in-scottsdale',
  'phoenix-small-business-seo-guide-how-to-rank-locally-2026',
  'how-to-get-more-customers-in-the-phoenix-metro-area',
  'how-scottsdale-businesses-can-use-ai-to-grow-faster',
  'scottsdale-digital-marketing-what-local-businesses-need',
  'how-to-build-a-personal-brand-in-scottsdale-arizona',
  'north-scottsdale-business-owner-guide-to-online-marketing',
  'old-town-scottsdale-business-marketing-strategy-2026',
  'how-arizona-businesses-can-rank-higher-on-google-in-2026',
  'how-to-get-more-clients-as-a-scottsdale-service-business',
  'phoenix-area-business-owner-guide-to-website-design',
  'scottsdale-luxury-brand-marketing-how-to-position-your-business',
  'how-to-compete-online-as-a-small-business-in-arizona',
  'tempe-arizona-small-business-marketing-and-seo-guide',
  'mesa-arizona-business-owner-seo-and-website-guide',
  'chandler-arizona-small-business-digital-marketing-guide',
  'gilbert-arizona-business-website-design-and-seo-guide',
  // ── Case Studies / Social Proof (171-210) ─────────────────────────────────────
  'how-a-scottsdale-restaurant-doubled-online-reservations-with-seo',
  'how-a-local-contractor-got-3x-more-leads-from-google',
  'how-a-small-law-firm-reached-page-one-of-google-in-90-days',
  'how-a-med-spa-increased-bookings-40-percent-with-a-new-website',
  'how-a-real-estate-agent-built-a-personal-brand-that-gets-referrals',
  'how-a-landscaping-company-dominated-local-google-search-results',
  'how-a-dental-practice-went-from-3-stars-to-4-8-on-google',
  'how-a-startup-built-business-credit-in-6-months-from-zero',
  'how-a-consulting-firm-got-10-new-clients-from-one-blog-post',
  'how-a-plumber-went-from-word-of-mouth-to-ranking-on-google',
  'how-a-financial-advisor-built-trust-online-and-doubled-revenue',
  'how-a-personal-trainer-built-a-six-figure-online-business',
  'how-a-chiropractor-got-50-new-patients-from-google-reviews',
  'how-a-wedding-photographer-booked-out-12-months-in-advance',
  'how-a-cpa-firm-attracted-higher-value-clients-through-seo',
  'how-a-home-services-company-built-a-reputation-that-sells',
  'how-a-startup-got-press-coverage-without-a-pr-agency',
  'what-rah-operations-did-to-rank-a-new-website-in-90-days',
  'how-we-built-an-automated-content-system-that-posts-daily',
  'how-we-helped-a-client-go-from-zero-to-500-google-visitors',
  'how-rah-operations-runs-seo-campaigns-that-get-results',
  'how-we-use-ai-to-create-content-that-actually-ranks-on-google',
  'the-rah-operations-website-design-process-start-to-finish',
  'how-we-set-up-google-business-profiles-that-rank-in-maps',
  'how-we-repaired-a-client-credit-score-from-520-to-720',
  'how-we-built-a-credit-repair-system-that-gets-real-results',
  'the-rah-operations-story-how-we-built-a-full-service-agency',
  'how-to-get-a-free-website-audit-and-what-to-do-with-results',
  'website-audit-for-ecommerce-stores-what-to-check-first',
  'how-to-use-a-website-audit-to-double-your-google-traffic',
  'what-is-a-website-audit-and-why-every-business-needs-one',
  'how-to-check-your-website-for-seo-errors-free-tool',
  'website-audit-for-coaches-and-consultants-get-found-online',
  'website-audit-for-financial-advisors-rank-higher-on-google',
  'website-audit-for-nonprofits-how-to-improve-online-visibility',
  'how-to-fix-every-error-a-website-audit-finds-step-by-step',
  'website-audit-for-accountants-get-found-by-local-clients',
  'how-to-use-website-audit-results-to-outrank-competitors',
  'what-happens-after-a-website-audit-action-plan-for-business-owners',
  'how-to-run-a-free-website-audit-and-fix-your-seo-today',
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

async function generateKieImage(apiKey: string, prompt: string): Promise<string | null> {
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
      console.log(`[kie] image URL ready: ${urls[0]}`);
      return urls[0];
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

// ── Brand image via og-image edge function ────────────────────────────────────
// Calls /api/og-image (a @vercel/og edge function) which composites the photo,
// dark panel, headline, category, and RAH. mark, then converts PNG → JPEG.
async function brandImage(sourceUrl: string, title: string, category: string): Promise<Buffer> {
  const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://www.rahoperations.com';
  const endpoint = new URL(`${host}/api/og-image`);
  endpoint.searchParams.set('title', title);
  endpoint.searchParams.set('category', category);
  endpoint.searchParams.set('imageUrl', sourceUrl);

  console.log(`[brand] calling og-image: ${endpoint.toString().slice(0, 200)}`);
  const res = await fetch(endpoint.toString());
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`og-image ${res.status}: ${err.slice(0, 300)}`);
  }
  const png = Buffer.from(await res.arrayBuffer());
  console.log(`[brand] og-image PNG received: ${png.length} bytes`);
  return sharp(png).jpeg({ quality: 90 }).toBuffer();
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

function parseClaude(raw: string) {
  const stripped = raw.replace(/^```json\s*/,'').replace(/\s*```$/,'').trim();
  try { return JSON.parse(stripped); } catch {}
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    try { return JSON.parse(stripped.slice(start, end + 1)); } catch {}
  }
  throw new Error('Failed to parse Claude JSON');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Accept POST (admin portal) or GET (Vercel cron — sends x-vercel-cron: 1)
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    console.log('[cron] headers:', JSON.stringify(req.headers));
    const userAgent = req.headers['user-agent'] || '';
    const isCron = req.headers['x-vercel-cron'] === '1' || userAgent.includes('vercel-cron');
    if (!isCron) return res.status(401).json({ error: 'Unauthorized' });
  } else {
    if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  }

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
  if (!slug) return res.status(200).json({ success: false, message: 'All 210 topics already published.' });

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
        max_tokens: 16000,
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

  // ── STEP 3: generate branded image ──────────────────────────────────────────
  const FALLBACK_IMG = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/public/blogs/how-to-improve-google-business-profile-scottsdale.jpg`;
  let imageBuffer: Buffer | null = null;

  // Resolve photo URL: Kie.ai CDN or fallback
  let sourceUrl: string = FALLBACK_IMG;
  if (kieKey) {
    try {
      const imagePrompt = buildImagePrompt(slug, post.category);
      console.log(`[image] prompt: ${imagePrompt}`);
      const kieUrl = await generateKieImage(kieKey, imagePrompt);
      if (kieUrl) {
        sourceUrl = kieUrl;
        console.log(`[image] Kie.ai URL: ${kieUrl}`);
      } else {
        console.warn(`[image] Kie.ai returned null — using fallback`);
      }
    } catch (err) {
      console.error('[image] Kie.ai threw:', err instanceof Error ? err.message : String(err));
    }
  } else {
    console.warn('[image] KIE_API_KEY not set — using fallback');
  }

  // Brand the image via the og-image edge function
  try {
    imageBuffer = await brandImage(sourceUrl, post.displayTitle, post.category);
    console.log(`[image] branded JPEG: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error('[image] brandImage failed:', err instanceof Error ? err.message : String(err));
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
      await putGitHubBinary(githubToken, githubRepo, githubBranch, imgPath, imageBuffer, existingImgSha, `Add blog hero image: ${slug}`);
      imageUploaded = true;
      console.log(`[image] pushed ${(imageBuffer.length / 1024).toFixed(1)} KB → ${imgPath}`);
    } catch (err) {
      console.error('[image] push to GitHub FAILED:', err instanceof Error ? err.message : String(err));
    }
  } else {
    console.error('[image] No branded buffer — skipping image push');
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
