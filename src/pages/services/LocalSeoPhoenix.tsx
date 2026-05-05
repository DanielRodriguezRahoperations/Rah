import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Local SEO Phoenix AZ | RAH Operations',
  seoDescription: 'Local SEO services in Phoenix, AZ. Rank in Google Maps and the local pack for Phoenix area searches. We help Phoenix businesses get found by customers ready to buy.',
  seoKeywords: 'local SEO Phoenix, local SEO services Phoenix AZ, Google Maps Phoenix, local search optimization Phoenix, Phoenix local SEO company',
  path: '/services/local-seo-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Local SEO in Phoenix That Puts Your Business in Front of Buyers, Not Browsers.',
  heroSubtitle: 'People searching "plumber near me" or "SEO company Phoenix" are not browsing — they are deciding. Local SEO puts your business in front of those high-intent searchers in the Google local pack, Maps, and top organic results across the Phoenix metro.',
  heroCta: 'Boost My Local Visibility',
  stats: [
    { value: '97%', label: 'Consumers Search Online for Local Businesses' },
    { value: '72%', label: 'Visit a Store Within 5 Miles After Local Search' },
    { value: '28%', label: 'Local Searches Result in a Purchase' },
    { value: '92%', label: 'Clicks Go to First-Page Local Results' },
  ],
  problemTitle: 'Phoenix Has 5 Million People Searching Locally. Most Are Finding Your Competitors.',
  problemBody: [
    'Phoenix\'s sheer size means local search is hyper-competitive. There are thousands of businesses in every service category competing for the same local pack positions. Three spots show up for every local search. If your business is not in one of them for your most important keywords, someone else is getting those calls.',
    'The barrier to entry for local pack rankings has gone up significantly. A few years ago, a complete Google Business Profile was enough. Today, Google evaluates review volume, review recency, citation consistency, website authority, proximity signals, behavioral data, and more. Businesses that have not kept up with these standards are falling further behind every month.',
  ],
  painPoints: [
    'Absent from the Google local pack for high-value Phoenix service searches',
    'Fewer reviews than competitors who consistently outrank you in Maps',
    'Business listed inconsistently — different address formats, old phone numbers, wrong categories',
    'No Phoenix-specific content on the website to establish local relevance',
    'Google Business Profile not updated with current photos, services, or attributes',
    'No local link signals — no mentions from Phoenix media, organizations, or directories',
  ],
  solutionTitle: 'Complete Local SEO for Phoenix Businesses That Want to Own Their Area.',
  solutionBody: [
    'We build and manage every component of a strong Phoenix local search presence. That means a fully optimized Google Business Profile, consistent citations across hundreds of directories, a review generation system, location-relevant website content, and structured data that tells Google exactly what you do and where you do it.',
    'Phoenix businesses we work with see improved local pack rankings, more profile views, more calls from Maps, and better quality leads because local searchers are high-intent — they are already in the market and looking for the best option. We make sure your business looks like the obvious choice.',
  ],
  capabilities: [
    { num: '01', title: 'Google Business Profile', desc: 'Full GBP setup and optimization — every category, attribute, photo, service, and post type used correctly' },
    { num: '02', title: 'Phoenix Citation Network', desc: 'Building your business listing across the top national and Phoenix-specific local directories' },
    { num: '03', title: 'Data Cleanup', desc: 'Finding and correcting every inconsistent, duplicate, or incorrect listing across the web' },
    { num: '04', title: 'Review Generation', desc: 'Systematic processes to increase review volume and improve average rating across all platforms' },
    { num: '05', title: 'Local Content', desc: 'Phoenix neighborhood pages and location-specific content that strengthens your local relevance' },
    { num: '06', title: 'Schema & Signals', desc: 'LocalBusiness schema, geo meta tags, and embedded maps for stronger location signals' },
    { num: '07', title: 'Rank Monitoring', desc: 'Tracking your local pack position for target keywords across the Phoenix metro weekly' },
    { num: '08', title: 'Monthly Strategy', desc: 'Regular review of what Phoenix competitors are doing and how to stay ahead of them' },
  ],
  processTitle: 'How We Build Phoenix Local Search Authority.',
  processSteps: [
    { num: '01', title: 'Local Baseline Audit', desc: 'We document your current local pack positions, GBP status, citation landscape, and review standing.' },
    { num: '02', title: 'Optimize & Clean', desc: 'We optimize your GBP, build missing citations, and fix inconsistencies across the web.' },
    { num: '03', title: 'Review & Content', desc: 'We deploy review generation systems and develop Phoenix-relevant local content for your website.' },
    { num: '04', title: 'Monitor & Maintain', desc: 'Weekly rank checks, monthly strategy reviews, and continuous optimization as the market shifts.' },
  ],
  localTitle: 'Phoenix Local Search Requires Neighborhood-Level Thinking.',
  localBody: [
    'Phoenix is not a monolithic market. Residents search by neighborhood and submarket: Ahwatukee, Arcadia, Camelback East, Laveen, Maryvale, South Mountain, Deer Valley, and dozens of others. A roofing company serving South Phoenix competes differently than one serving Arcadia. A physical therapist in Ahwatukee targets different keywords than one near Camelback Mountain.',
    'Our local SEO strategy accounts for the geographic specificity of how Phoenix customers actually search. We build neighborhood-level content, optimize for proximity-based signals, and ensure your business profile is structured to appear in the searches that matter most in the specific areas you serve.',
    'If you want to stop watching competitors show up above you in Phoenix Maps results, let\'s start with a free local audit. We will show you the gaps and tell you exactly what will move the needle.',
  ],
  ctaTitle: 'Own the Phoenix Local Pack for Your Service Category.',
  ctaBody: 'High-intent Phoenix buyers are searching right now. Local SEO determines who they call. Let\'s make sure it\'s you.',
  relatedServices: [
    { title: 'SEO Phoenix', to: '/services/seo-phoenix', desc: 'Organic search strategy to complement your local pack presence.' },
    { title: 'Google Business Profile Phoenix', to: '/services/google-business-profile-optimization-phoenix', desc: 'Deep profile optimization for maximum Phoenix Maps visibility.' },
    { title: 'Website Design Phoenix', to: '/services/website-design-phoenix', desc: 'The website anchor that supports and amplifies your local search presence.' },
  ],
  formTitle: 'Get a Free Phoenix Local SEO Audit',
  formSubtitle: 'Tell us your business name and category. We\'ll run a full local search audit and show you where you stand in Phoenix.',
};

export default function LocalSeoPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
