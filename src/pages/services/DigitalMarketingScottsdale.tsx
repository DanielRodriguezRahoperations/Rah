import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Digital Marketing Scottsdale AZ | RAH Operations',
  seoDescription: 'Digital marketing services in Scottsdale, AZ. SEO, paid ads, content, and social media systems built to grow Scottsdale businesses and generate consistent leads.',
  seoKeywords: 'digital marketing Scottsdale, digital marketing agency Scottsdale AZ, online marketing Scottsdale, Scottsdale digital marketing company, marketing services Scottsdale Arizona',
  path: '/services/digital-marketing-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Digital Marketing in Scottsdale That Grows Revenue, Not Just Traffic.',
  heroSubtitle: 'Scottsdale businesses need marketing that converts. We build integrated digital marketing systems — SEO, paid ads, content, and social — that work together to drive consistent, qualified leads for businesses competing in the Scottsdale market.',
  heroCta: 'Get a Marketing Strategy',
  stats: [
    { value: '4.5×', label: 'ROI From Integrated Digital Marketing' },
    { value: '80%', label: 'Buyers Research Online Before Purchasing' },
    { value: '3×', label: 'More Leads With Multi-Channel vs Single-Channel' },
    { value: '61%', label: 'Marketers Say SEO Is Top Inbound Lead Source' },
  ],
  problemTitle: 'Scottsdale Businesses Are Running Marketing in Silos and Getting Fragmented Results.',
  problemBody: [
    'Running paid ads without SEO means stopping the moment the budget runs out. Doing SEO without content means slow progress. Posting on social media without a strategy means wasted time with nothing to show. Most Scottsdale businesses have tried one or two digital marketing tactics and been disappointed — not because digital marketing does not work, but because disconnected tactics rarely compound into real growth.',
    'Digital marketing that actually moves the needle for a Scottsdale business requires all the channels working together toward a common goal. SEO builds long-term organic traffic. Paid ads accelerate results while SEO grows. Content establishes authority and feeds both. Social builds brand awareness and creates touchpoints. When these are coordinated, the results compound.',
  ],
  painPoints: [
    'Running Google Ads with no SEO — paying for every click with nothing building in the background',
    'Social media presence with no strategy — posting without engagement or lead generation',
    'No content strategy — website not attracting organic traffic from relevant search queries',
    'Marketing spend with no clear attribution — no idea which channels are generating ROI',
    'Inconsistent brand voice across channels creating confusion rather than authority',
    'No lead nurturing after the first contact — leads going cold because of no follow-up system',
  ],
  solutionTitle: 'An Integrated Digital Marketing System Built Around the Scottsdale Customer Journey.',
  solutionBody: [
    'We build digital marketing strategies that account for every stage of how a Scottsdale customer finds, evaluates, and decides to hire a business. Awareness comes from SEO and social. Evaluation comes from content, reviews, and the website experience. Conversion comes from clear calls to action and a professional digital presence that earns trust.',
    'Our Scottsdale digital marketing work integrates paid and organic channels, builds content that serves both SEO and sales, and measures everything so you always know where your marketing dollars are going and what they are producing.',
  ],
  capabilities: [
    { num: '01', title: 'SEO Strategy', desc: 'Organic search rankings that build Scottsdale traffic month over month without per-click cost' },
    { num: '02', title: 'Google Ads Management', desc: 'Paid search campaigns targeting high-intent Scottsdale keywords with aggressive ROI optimization' },
    { num: '03', title: 'Content Marketing', desc: 'Blog posts, service pages, and authority content that rank and convert Scottsdale buyers' },
    { num: '04', title: 'Social Media', desc: 'Consistent, strategic social presence that builds your Scottsdale brand authority' },
    { num: '05', title: 'Email Marketing', desc: 'Nurture sequences that convert cold leads and reactivate past Scottsdale clients' },
    { num: '06', title: 'Conversion Optimization', desc: 'Improving the website and landing pages to convert more of the traffic you are already getting' },
    { num: '07', title: 'Analytics & Reporting', desc: 'Clear dashboards showing traffic, leads, cost per lead, and revenue attribution' },
    { num: '08', title: 'Strategy Reviews', desc: 'Monthly strategy sessions to reallocate spend, expand what works, and cut what does not' },
  ],
  processTitle: 'Our Digital Marketing Process for Scottsdale Businesses.',
  processSteps: [
    { num: '01', title: 'Audit & Discovery', desc: 'We audit all current marketing efforts, identify what is working, and map the opportunity landscape for Scottsdale.' },
    { num: '02', title: 'Strategy Build', desc: 'We build a prioritized, integrated marketing plan with budget allocation, channel mix, and 90-day milestones.' },
    { num: '03', title: 'Launch & Execute', desc: 'We activate all channels — SEO, ads, content, social — with consistent messaging and clear conversion goals.' },
    { num: '04', title: 'Optimize & Scale', desc: 'Monthly reporting, budget reallocation, and strategic expansion as results compound.' },
  ],
  localTitle: 'Scottsdale Digital Marketing That Understands the Local Buyer.',
  localBody: [
    'Scottsdale buyers interact with digital marketing differently than buyers in other markets. They research extensively, compare multiple providers, and are sensitive to brand quality signals. A Scottsdale-focused digital marketing strategy accounts for the longer research cycle, the higher quality bar, and the specific platforms and content formats that perform best in this market.',
    'We have worked with Scottsdale businesses across healthcare, home improvement, professional services, retail, and food and beverage. Each category has its own digital marketing dynamics, and we build strategies that fit the specific competitive landscape and customer behavior of your category.',
    'If you want digital marketing in Scottsdale that is actually tied to business outcomes — not just impressions, clicks, or followers — let\'s talk.',
  ],
  ctaTitle: 'Stop Running Disconnected Marketing Campaigns.',
  ctaBody: 'Scottsdale businesses that win online are running integrated systems, not isolated tactics. Let\'s build yours.',
  relatedServices: [
    { title: 'SEO Scottsdale', to: '/services/seo-scottsdale', desc: 'The organic foundation that makes every other marketing channel more effective.' },
    { title: 'Local SEO Scottsdale', to: '/services/local-seo-scottsdale', desc: 'Local search dominance for Scottsdale service area searches.' },
    { title: 'Website Design Scottsdale', to: '/services/website-design-scottsdale', desc: 'The conversion hub where all your digital marketing sends traffic.' },
  ],
  formTitle: 'Get a Digital Marketing Strategy for Your Scottsdale Business',
  formSubtitle: 'Tell us about your business goals and current marketing. We\'ll build a clear, integrated plan.',
};

export default function DigitalMarketingScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
