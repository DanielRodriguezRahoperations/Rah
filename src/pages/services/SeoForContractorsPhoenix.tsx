import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'SEO for Contractors in Phoenix AZ | RAH Operations',
  seoDescription: 'SEO services for contractors in Phoenix, AZ. We help Phoenix contractors rank on Google, dominate the local pack, and generate consistent leads without depending on referrals alone.',
  seoKeywords: 'SEO for contractors Phoenix, contractor SEO Phoenix AZ, contractor website SEO Phoenix, construction company SEO Phoenix, home services SEO Phoenix Arizona',
  path: '/services/seo-for-contractors-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix Contractor SEO',
  heroH1: 'SEO for Phoenix Contractors. Rank Higher, Generate More Leads, Depend Less on Referrals.',
  heroSubtitle: 'Referrals are great when they come in. But they are not predictable. SEO gives Phoenix contractors a consistent, compounding lead source — people actively searching for the service, ready to get a quote. We build and manage contractor SEO systems that deliver.',
  heroCta: 'Get a Contractor SEO Audit',
  heroCtaTo: '/website-audit',
  stats: [
    { value: '97%', label: 'Homeowners Research Contractors Online Before Hiring' },
    { value: '4×', label: 'More Contractor Leads From SEO vs Yellow Pages' },
    { value: '82%', label: 'Contractor Searches Done on Mobile' },
    { value: '#1', label: 'Position Gets 31% of All Clicks in That Search' },
  ],
  problemTitle: 'Phoenix Contractors Are Losing Leads to Competitors Who Invested in SEO Earlier.',
  problemBody: [
    'The Phoenix home services and construction market is enormous. Homeowners here regularly search for roofers, HVAC technicians, plumbers, electricians, general contractors, landscapers, painters, and dozens of other trades. The contractors at the top of those search results — in the local pack and organic results — are capturing a disproportionate share of the market.',
    'Most Phoenix contractors built their business on referrals and word of mouth. That still matters, but it does not scale the way online visibility does. A contractor ranked at the top of Google for "roofer Phoenix" or "HVAC repair North Phoenix" is receiving leads around the clock, even when they are on a job site and not actively prospecting.',
  ],
  painPoints: [
    'Invisible in Google for the most valuable Phoenix contractor keywords',
    'No Google Business Profile or underoptimized profile not showing in the local pack',
    'Website is a generic template with no service-specific pages or local content',
    'Competitors dominate search results in areas where your work is strongest',
    'No review system — few reviews compared to competitors consistently outranking you',
    'No content strategy — website has not been updated in months or years',
  ],
  solutionTitle: 'Contractor SEO Built Specifically for the Phoenix Trade Market.',
  solutionBody: [
    'Contractor SEO in Phoenix requires understanding the specific keyword landscape for trades — the way homeowners search by service type, neighborhood, and urgency. We build contractor SEO strategies that cover every relevant search: service-specific pages for each trade, location pages for Phoenix neighborhoods and surrounding cities, Google Business Profile optimization, and a review generation system that builds the authority Google rewards.',
    'Phoenix contractors we work with see meaningful ranking improvements within 60 to 90 days for lower-competition keywords, and meaningful organic lead growth within four to six months for primary target keywords. The system compounds over time as the website authority and review profile strengthen.',
  ],
  capabilities: [
    { num: '01', title: 'Trade Keyword Research', desc: 'Mapping every search term Phoenix homeowners use to find contractors in your specific trade' },
    { num: '02', title: 'Service Pages', desc: 'Dedicated pages for each service type targeting the specific searches that drive project inquiries' },
    { num: '03', title: 'Location Pages', desc: 'Pages for Phoenix, Scottsdale, Glendale, Tempe, Chandler, Mesa, and other service cities' },
    { num: '04', title: 'GBP Optimization', desc: 'Full Google Business Profile optimization for maximum local pack visibility in your service area' },
    { num: '05', title: 'Review Building', desc: 'Systems to consistently turn completed jobs into five-star reviews on Google and other platforms' },
    { num: '06', title: 'Technical SEO', desc: 'Site speed, mobile optimization, schema markup, and crawlability fixes for your contractor website' },
    { num: '07', title: 'Content Strategy', desc: 'Regular content — project types, FAQs, and local guides — that build authority over time' },
    { num: '08', title: 'Competitor Tracking', desc: 'Monitoring which Phoenix contractors are ranking above you and why, then closing the gap' },
  ],
  processTitle: 'Our Phoenix Contractor SEO Process.',
  processSteps: [
    { num: '01', title: 'Contractor Audit', desc: 'We review your current website, GBP, reviews, and local rankings against the top Phoenix competitors in your trade.' },
    { num: '02', title: 'SEO Roadmap', desc: 'We build a prioritized plan targeting the keywords with the highest lead volume and clearest path to ranking.' },
    { num: '03', title: 'Build & Optimize', desc: 'Service pages, location pages, GBP optimization, and technical fixes implemented.' },
    { num: '04', title: 'Grow & Track', desc: 'Monthly rank tracking, review monitoring, and content expansion as the profile strengthens.' },
  ],
  localTitle: 'Phoenix Contractor SEO That Understands the Market.',
  localBody: [
    'Phoenix is a large metro with distinct service areas — North Phoenix, South Mountain, Ahwatukee, Arcadia, Camelback Corridor, Deer Valley, the West Valley. Homeowners often search with specific neighborhood context, and a contractor website without neighborhood-specific content misses a significant portion of this search traffic.',
    'We build Phoenix contractor SEO with geographic specificity in mind. If you serve multiple cities in the metro — Phoenix, Scottsdale, Tempe, Chandler, Mesa, Gilbert, Glendale, Peoria — we build the page structure to capture search visibility in all of them, not just your primary service address.',
    'Whether you are a roofing company, HVAC company, plumber, electrician, landscaper, painter, or general contractor, we understand the competitive dynamics of the Phoenix home services market and how to build a search presence that consistently delivers leads.',
  ],
  ctaTitle: 'Phoenix Homeowners Are Searching for Your Service Right Now.',
  ctaBody: 'SEO gives Phoenix contractors the one thing referrals cannot: consistent, predictable, scalable lead flow. Let\'s build it.',
  relatedServices: [
    { title: 'Local SEO Phoenix', to: '/services/local-seo-phoenix', desc: 'Google Maps and local pack dominance for Phoenix service area searches.' },
    { title: 'Website Design Phoenix', to: '/services/website-design-phoenix', desc: 'A contractor website built for trust, speed, and lead generation.' },
    { title: 'Reputation Management Phoenix', to: '/services/reputation-management-phoenix', desc: 'Build the review profile that makes Phoenix homeowners choose you first.' },
  ],
  formTitle: 'Get a Free Phoenix Contractor SEO Audit',
  formSubtitle: 'Tell us your trade and service area. We\'ll review your current rankings and show you the path to consistent online leads.',
};

export default function SeoForContractorsPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
