import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'SEO Phoenix AZ | RAH Operations',
  seoDescription: 'SEO services in Phoenix, AZ. We help Phoenix businesses rank on Google, grow organic search traffic, and generate leads without depending entirely on paid advertising.',
  seoKeywords: 'SEO Phoenix, SEO services Phoenix AZ, search engine optimization Phoenix, Phoenix SEO company, SEO agency Phoenix Arizona',
  path: '/services/seo-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'SEO in Phoenix That Builds Traffic You Own — Not Traffic You Rent.',
  heroSubtitle: 'Phoenix businesses spending thousands on ads each month are renting visibility. SEO builds something better: a search presence that compounds, earns trust, and generates leads long after the initial investment is made.',
  heroCta: 'Request an SEO Audit',
  stats: [
    { value: '#1', label: 'Google Spot Gets 31% of Clicks' },
    { value: '200+', label: 'Ranking Factors Google Evaluates' },
    { value: '6mo', label: 'Avg. Time to See Meaningful Results' },
    { value: '14×', label: 'ROI of SEO vs Traditional Advertising' },
  ],
  problemTitle: 'Phoenix Is One of America\'s Most Competitive Local Search Markets.',
  problemBody: [
    'With over five million people in the metro area and one of the fastest new business formation rates in the country, Phoenix has intense competition in almost every search category. Law firms, contractors, dentists, real estate agents, restaurants, consultants — every category has dozens of established competitors with SEO teams already working on their rankings.',
    'Businesses that wait to invest in SEO fall further behind. Every month without a real SEO strategy is a month competitors are building rankings, earning links, and capturing organic traffic you are not. The gap does not close on its own.',
  ],
  painPoints: [
    'Ranking on page two or three for the highest-value Phoenix keywords',
    'No content strategy — website has not been updated in months or years',
    'Competitors consistently outranking you for the searches that drive real revenue',
    'Spending heavily on PPC with no organic foundation to supplement or replace it',
    'Poor technical SEO — crawl errors, missing metadata, duplicate content issues',
    'No backlinks from authoritative Arizona or local industry sources',
  ],
  solutionTitle: 'Systematic SEO Built Around the Phoenix Market Opportunity.',
  solutionBody: [
    'Phoenix SEO requires understanding both the scale of the opportunity and the depth of competition. We research the actual keywords Phoenix customers are using to find businesses like yours, analyze the top-ranking competitors in detail, and build a prioritized strategy that closes the gap methodically.',
    'We handle every layer of SEO — technical audits and fixes, on-page optimization, content creation, local signals, and link acquisition. Nothing is done in isolation. Every element supports the overall goal of earning you the organic search rankings your competitors already have.',
  ],
  capabilities: [
    { num: '01', title: 'Phoenix Keyword Research', desc: 'Mapping the exact search queries Phoenix customers use to find services in your category' },
    { num: '02', title: 'Competitive Gap Analysis', desc: 'Identifying precisely what your top-ranking Phoenix competitors are doing that you are not' },
    { num: '03', title: 'On-Page SEO', desc: 'Optimizing every page for search intent — titles, meta, headers, content, and structure' },
    { num: '04', title: 'Content Authority', desc: 'Building out the informational and service content that earns long-term rankings' },
    { num: '05', title: 'Technical Foundation', desc: 'Crawlability, indexing, site speed, structured data, and Core Web Vitals optimization' },
    { num: '06', title: 'Link Acquisition', desc: 'Building authoritative backlinks that signal credibility to Google for Phoenix-relevant keywords' },
    { num: '07', title: 'Ranking Tracking', desc: 'Weekly monitoring of target keyword positions with transparent reporting on movement' },
    { num: '08', title: 'Strategy Evolution', desc: 'Monthly strategy reviews — expanding into new opportunities as current rankings mature' },
  ],
  processTitle: 'How We Execute SEO for Phoenix Businesses.',
  processSteps: [
    { num: '01', title: 'Full SEO Audit', desc: 'We run a complete audit of your site\'s technical SEO, on-page factors, content gaps, and backlink profile.' },
    { num: '02', title: 'Phoenix Market Map', desc: 'We research your top Phoenix competitors and map every keyword opportunity by difficulty and business value.' },
    { num: '03', title: 'Systematic Execution', desc: 'Technical fixes first, then content expansion, then link building — each phase building on the last.' },
    { num: '04', title: 'Monthly Reporting', desc: 'Clear reports on ranking movement, organic traffic growth, and ROI. No jargon, just results.' },
  ],
  localTitle: 'Phoenix SEO That Understands This Market.',
  localBody: [
    'Phoenix is a sprawling metro and search behavior reflects that. People search by neighborhood: "dentist Arcadia Phoenix," "contractor Ahwatukee," "attorney Downtown Phoenix," "HVAC Glendale AZ." If your SEO strategy does not account for the geographic specificity of how Phoenix customers actually search, you are leaving a significant amount of local search traffic uncaptured.',
    'Our Phoenix SEO work includes neighborhood-specific content where relevant, proper location schema markup, Google Business Profile optimization, and a content strategy built around how Phoenix-area buyers research your type of service.',
    'If you are ready to stop renting attention from Google and start owning it, request a free SEO audit. We will show you where you stand, where the opportunity is, and what it takes to get there.',
  ],
  ctaTitle: 'Phoenix Customers Are Searching. Make Sure They Find You.',
  ctaBody: 'Every day without a real SEO strategy is a day your competitors earn the leads you should be getting. Let\'s fix that.',
  relatedServices: [
    { title: 'Local SEO Phoenix', to: '/services/local-seo-phoenix', desc: 'Dominate Google Maps and the local pack for Phoenix service searches.' },
    { title: 'Website Design Phoenix', to: '/services/website-design-phoenix', desc: 'Your SEO foundation starts with a properly built website.' },
    { title: 'Digital Marketing Phoenix', to: '/services/digital-marketing-phoenix', desc: 'Combine organic SEO with paid ads for maximum Phoenix market coverage.' },
  ],
  formTitle: 'Request a Free Phoenix SEO Audit',
  formSubtitle: 'Tell us your business and the keywords you want to rank for. We\'ll show you exactly where you stand.',
};

export default function SeoPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
