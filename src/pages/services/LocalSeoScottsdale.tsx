import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Local SEO Scottsdale AZ | RAH Operations',
  seoDescription: 'Local SEO services in Scottsdale, AZ. We help Scottsdale businesses rank in Google Maps, the local pack, and near-me searches to capture high-intent local customers.',
  seoKeywords: 'local SEO Scottsdale, local SEO services Scottsdale AZ, Google Maps Scottsdale, local search optimization Scottsdale, Scottsdale local SEO company',
  path: '/services/local-seo-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Local SEO in Scottsdale That Gets You Found When Customers Are Ready to Buy.',
  heroSubtitle: 'When someone in Scottsdale searches "contractor near me" or "dentist in North Scottsdale," they are ready to call. Local SEO puts your business in front of them at that exact moment — in the Google local pack, in Maps, and at the top of organic results.',
  heroCta: 'Improve My Local Rankings',
  stats: [
    { value: '46%', label: 'Google Searches Have Local Intent' },
    { value: '88%', label: 'Local Searches Call or Visit Same Day' },
    { value: '78%', label: 'Local Mobile Searches Lead to a Purchase' },
    { value: '3×', label: 'More Clicks to Local Pack vs Organic' },
  ],
  problemTitle: 'Your Scottsdale Competitors Are Showing Up in the Map Pack. You Are Not.',
  problemBody: [
    'The Google local pack — the map and three business listings that appear at the top of local search results — captures the majority of clicks for high-intent local searches. If your Scottsdale business is not appearing there for your most valuable service keywords, you are losing customers to whoever is.',
    'Most local business owners do not know why they are not in the local pack. It is rarely one thing. It is a combination of incomplete Google Business Profile, inconsistent business information across directories, weak review signals, thin location-based website content, and poor local citation authority. All of these factors work together, and all of them can be fixed.',
  ],
  painPoints: [
    'Not appearing in the Google local pack for primary Scottsdale service keywords',
    'Incomplete or unoptimized Google Business Profile with missing categories and photos',
    'Inconsistent business name, address, and phone (NAP) across online directories',
    'Few or unmanaged reviews compared to local competitors who rank higher',
    'No location-specific website content that signals relevance to the Scottsdale area',
    'Missing local citations — business not listed in key local and industry directories',
  ],
  solutionTitle: 'A Complete Local SEO System Built for Scottsdale Dominance.',
  solutionBody: [
    'Local SEO for Scottsdale businesses requires attention to every signal Google uses to determine local relevance and authority. We build and manage all of it — Google Business Profile optimization, citation building and cleanup, review strategy, local landing pages, and on-page local signals that tell Google your business belongs at the top of Scottsdale search results.',
    'We do not just get you listed — we build a local search presence that consistently earns high placement for the searches that matter most to your business, and we maintain and strengthen that presence as competition evolves.',
  ],
  capabilities: [
    { num: '01', title: 'Google Business Profile', desc: 'Complete optimization of your GBP — categories, descriptions, photos, services, hours, and Q&A' },
    { num: '02', title: 'Citation Building', desc: 'Listing your business consistently across all major local and industry directories' },
    { num: '03', title: 'NAP Consistency', desc: 'Auditing and correcting every instance of your business name, address, and phone across the web' },
    { num: '04', title: 'Review Strategy', desc: 'Systems to consistently generate positive reviews and professionally respond to all feedback' },
    { num: '05', title: 'Local Landing Pages', desc: 'Service area pages targeting Scottsdale and surrounding neighborhoods for broader local reach' },
    { num: '06', title: 'Local Schema Markup', desc: 'Structured data implementation that helps Google understand your business location and services' },
    { num: '07', title: 'Proximity & Relevance', desc: 'Content and signals optimized to rank for searches closest to your Scottsdale service area' },
    { num: '08', title: 'Monthly Monitoring', desc: 'Ongoing review of local pack positions, profile performance, and competitive movement' },
  ],
  processTitle: 'Our Local SEO Process for Scottsdale Businesses.',
  processSteps: [
    { num: '01', title: 'Local Audit', desc: 'We audit your Google Business Profile, citations, reviews, and website for every local SEO gap and inconsistency.' },
    { num: '02', title: 'Optimization Sprint', desc: 'We fix and build everything — GBP, citations, NAP cleanup, local schema, and landing pages — in a focused initial sprint.' },
    { num: '03', title: 'Review & Content', desc: 'We implement review generation systems and create local content that builds ongoing relevance signals.' },
    { num: '04', title: 'Monitor & Expand', desc: 'Monthly reporting on local pack positions and expansion into additional Scottsdale keyword opportunities.' },
  ],
  localTitle: 'Scottsdale Local Search Has Specific Competitive Dynamics.',
  localBody: [
    'Scottsdale\'s local search results are competitive in categories like home services, legal, medical, hospitality, and fitness. In Old Town Scottsdale, North Scottsdale, and the Scottsdale Airpark area, there are well-established local businesses with strong review profiles and solid local SEO foundations. Breaking into the top three of the local pack requires a systematic approach, not just adding a pin to Google Maps.',
    'We have experience in the Scottsdale local search landscape and we understand what it takes to rank in different neighborhoods and service categories here. Whether you serve the entire Scottsdale area or are focused on a specific corridor, we build the local search presence that gets you found.',
    'Start with a free local SEO audit. We will show you exactly where your Scottsdale business stands in local search results and what changes will have the biggest impact on your local visibility.',
  ],
  ctaTitle: 'Get Found First When Scottsdale Customers Are Ready to Buy.',
  ctaBody: 'The local pack is where high-intent customers make decisions. We put your business there.',
  relatedServices: [
    { title: 'SEO Scottsdale', to: '/services/seo-scottsdale', desc: 'Broader organic search strategy to complement your local visibility.' },
    { title: 'Google Business Profile Optimization', to: '/services/google-business-profile-optimization-scottsdale', desc: 'Deep GBP optimization to maximize your Scottsdale Maps presence.' },
    { title: 'Website Design Scottsdale', to: '/services/website-design-scottsdale', desc: 'A well-built website is the anchor of your local SEO strategy.' },
  ],
  formTitle: 'Get a Free Scottsdale Local SEO Audit',
  formSubtitle: 'We\'ll review your Google Business Profile, local rankings, and citations and tell you exactly what needs to change.',
};

export default function LocalSeoScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
