import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'SEO Scottsdale AZ | RAH Operations',
  seoDescription: 'SEO services in Scottsdale, AZ. We help Scottsdale businesses rank higher on Google, build organic search authority, and generate consistent leads from search traffic.',
  seoKeywords: 'SEO Scottsdale, SEO services Scottsdale AZ, search engine optimization Scottsdale, Scottsdale SEO company, SEO agency Scottsdale Arizona',
  path: '/services/seo-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'SEO in Scottsdale That Turns Search Traffic Into Qualified Business Leads.',
  heroSubtitle: 'If your Scottsdale business is not appearing when potential clients search for your service, you are invisible to some of your best leads. We build and execute SEO strategies that move Scottsdale businesses up the rankings and keep them there.',
  heroCta: 'Get an SEO Audit',
  stats: [
    { value: '68%', label: 'Online Experiences Start with Search' },
    { value: '75%', label: 'Users Never Scroll Past Page One' },
    { value: '10×', label: 'SEO Traffic vs Paid — Long Term ROI' },
    { value: '53%', label: 'Website Traffic Comes From Organic Search' },
  ],
  problemTitle: 'Scottsdale Businesses Are Paying for Ads While Their Competitors Rank for Free.',
  problemBody: [
    'Paid advertising works when it is managed well, but the moment you stop paying, the traffic stops. SEO builds organic search authority that compounds over time — when done right, your Scottsdale business shows up every time someone searches for your service, without paying per click.',
    'Most Scottsdale businesses have an SEO problem they do not fully see yet. Their site may get some traffic, but it is not ranking for the high-intent keywords that drive real business. Competitors with better SEO foundations are consistently capturing the leads that should be going to them.',
  ],
  painPoints: [
    'Invisible in Google results for the most valuable Scottsdale service keywords',
    'Relying entirely on paid ads for online leads with no organic backup',
    'Poorly structured website with no SEO architecture beyond a homepage',
    'Thin or duplicate content that does not satisfy search intent',
    'No backlink profile — the site has no domain authority in the eyes of Google',
    'Keyword strategy based on guesses, not data from real Scottsdale search behavior',
  ],
  solutionTitle: 'A Complete SEO System Built Around What Scottsdale Customers Are Searching For.',
  solutionBody: [
    'Our Scottsdale SEO work starts with research — understanding which keywords your target customers are actually using, where your competitors are ranking, and what gaps exist in the current market. From there we build a strategy that covers on-page structure, content development, technical optimization, and link building.',
    'SEO is not a one-time fix. It is an ongoing system. We track what is working, adapt to algorithm changes, expand into new keyword opportunities, and report clearly on how rankings and organic traffic are improving over time.',
  ],
  capabilities: [
    { num: '01', title: 'Keyword Research', desc: 'Data-driven keyword mapping around how Scottsdale customers search for your service' },
    { num: '02', title: 'On-Page Optimization', desc: 'Title tags, meta descriptions, heading structure, content, and internal linking — all optimized' },
    { num: '03', title: 'Content Development', desc: 'Authority-building content that targets search intent and earns rankings over time' },
    { num: '04', title: 'Technical SEO', desc: 'Site speed, crawlability, structured data, and technical foundations reviewed and fixed' },
    { num: '05', title: 'Link Building', desc: 'Legitimate backlink acquisition to build domain authority for competitive Scottsdale keywords' },
    { num: '06', title: 'Competitive Analysis', desc: 'Regular audits of what competing Scottsdale businesses are doing and how to outperform them' },
    { num: '07', title: 'Monthly Reporting', desc: 'Clear reports showing ranking movement, traffic growth, and organic lead trends' },
    { num: '08', title: 'Google Search Console', desc: 'Full GSC management — monitoring, error resolution, and indexing verification' },
  ],
  processTitle: 'Our Scottsdale SEO Approach.',
  processSteps: [
    { num: '01', title: 'Audit & Research', desc: 'We audit your current site, research your Scottsdale competitors, and identify the keyword opportunities with the clearest path to results.' },
    { num: '02', title: 'Strategy Build', desc: 'We build a prioritized SEO roadmap — technical fixes first, then content, then link building.' },
    { num: '03', title: 'Execution', desc: 'We implement across all layers of SEO: on-page, technical, content creation, and off-page authority.' },
    { num: '04', title: 'Monitor & Grow', desc: 'Monthly tracking, reporting, and iteration — expanding into new keywords as rankings grow.' },
  ],
  localTitle: 'Why Scottsdale SEO Requires a Specific Approach.',
  localBody: [
    'Scottsdale is not a generic market. The search behavior here is shaped by the types of businesses that dominate the local economy — luxury services, healthcare, real estate, home improvement, hospitality, and professional services. Ranking for Scottsdale-specific keywords means understanding the competitive landscape in each of these verticals.',
    'A pest control company in North Scottsdale competes differently than a financial advisor near Kierland Commons. A cosmetic dentist in Old Town Scottsdale has different keyword opportunities than a general contractor in the Scottsdale Airpark area. We build SEO strategies that are specific to your business, your location, and your target customer — not generic templates applied to every client.',
    'If your Scottsdale business is ready to invest in organic search authority that compounds over time, reach out for a free audit. We will show you exactly where you stand and what it would take to rank for the terms that matter most.',
  ],
  ctaTitle: 'Stop Being Invisible in Scottsdale Search Results.',
  ctaBody: 'The customers who are searching for your service right now are choosing someone. Make sure it is you.',
  relatedServices: [
    { title: 'Local SEO Scottsdale', to: '/services/local-seo-scottsdale', desc: 'Rank in the Google local pack and Maps for Scottsdale service area searches.' },
    { title: 'Website Design Scottsdale', to: '/services/website-design-scottsdale', desc: 'A well-designed website built for SEO performance from the ground up.' },
    { title: 'Digital Marketing Scottsdale', to: '/services/digital-marketing-scottsdale', desc: 'Paid and organic strategies working together to grow your Scottsdale business.' },
  ],
  formTitle: 'Get a Free Scottsdale SEO Audit',
  formSubtitle: 'Tell us about your business and the keywords you want to rank for. We\'ll analyze your current visibility and show you the path forward.',
};

export default function SeoScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
