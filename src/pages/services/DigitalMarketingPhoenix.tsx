import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Digital Marketing Phoenix AZ | RAH Operations',
  seoDescription: 'Digital marketing services in Phoenix, AZ. We help Phoenix businesses grow through SEO, paid ads, content, and social media strategies that drive real leads and revenue.',
  seoKeywords: 'digital marketing Phoenix, digital marketing agency Phoenix AZ, online marketing Phoenix, Phoenix digital marketing company, marketing services Phoenix Arizona',
  path: '/services/digital-marketing-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Digital Marketing in Phoenix Built to Compete in One of America\'s Fastest-Growing Markets.',
  heroSubtitle: 'Phoenix is growing faster than almost any other major city. Competition for customers is intensifying in every category. We help Phoenix businesses build digital marketing systems that cut through the noise, capture high-intent buyers, and generate the leads their revenue goals require.',
  heroCta: 'Build My Marketing System',
  stats: [
    { value: '5×', label: 'Growth Rate of Digital Ad Spend in Phoenix Market' },
    { value: '76%', label: 'Phoenix Consumers Research Services Online First' },
    { value: '40%', label: 'Marketing Budget Wasted on Untracked Channels' },
    { value: '8×', label: 'Better ROI From Strategy-Led vs Reactive Marketing' },
  ],
  problemTitle: 'Phoenix Businesses Are Competing for the Same Customers With Outdated Marketing Playbooks.',
  problemBody: [
    'The Phoenix market has matured rapidly. What worked for digital marketing five years ago — a basic Facebook page, occasional Google Ads, a blog with generic articles — no longer moves the needle. The businesses winning online in Phoenix today have invested in sophisticated, integrated marketing systems that compound over time.',
    'Most Phoenix businesses fall into one of two categories: they are either not doing digital marketing seriously at all, or they are doing it reactively — running ads when things are slow, pausing when they get busy, with no consistent strategy or measurement system. Neither approach builds the kind of sustained lead flow that supports aggressive business growth.',
  ],
  painPoints: [
    'No consistent lead pipeline — some months are great, others are dry with no explanation',
    'Spending on ads without a clear way to measure cost per lead or return on spend',
    'Website not converting the paid traffic that marketing dollars are sending to it',
    'Social media presence exists but generates no measurable business results',
    'Content is published occasionally with no keyword strategy or SEO purpose',
    'Marketing and sales are disconnected — leads come in but conversion is poor',
  ],
  solutionTitle: 'Integrated Phoenix Digital Marketing That Builds a Consistent Revenue Engine.',
  solutionBody: [
    'We build Phoenix digital marketing strategies around one thing: predictable, qualified lead generation. That requires every channel working toward a common goal — SEO building long-term organic traffic, paid ads capturing immediate high-intent buyers, content establishing authority, and the website converting all of it into actual inquiries.',
    'Our Phoenix clients do not just get more traffic — they get clearer attribution, better conversion rates, lower cost per lead, and a marketing system that gets more efficient over time. We manage everything and report in plain language on what is working and why.',
  ],
  capabilities: [
    { num: '01', title: 'Phoenix SEO', desc: 'Long-term organic rankings for high-value Phoenix keywords that compound in value month over month' },
    { num: '02', title: 'Google & Meta Ads', desc: 'Managed paid campaigns on Google and Meta platforms targeting Phoenix buyers at the right moment' },
    { num: '03', title: 'Content Strategy', desc: 'Strategic blog and page content that earns rankings, builds authority, and supports the sales process' },
    { num: '04', title: 'Social Media Marketing', desc: 'Platform-appropriate content and community management that grows your Phoenix brand awareness' },
    { num: '05', title: 'Email Campaigns', desc: 'Automated nurture and broadcast campaigns that keep your business top of mind with leads and past clients' },
    { num: '06', title: 'CRO', desc: 'Conversion rate optimization — improving what happens after someone lands on your Phoenix website' },
    { num: '07', title: 'Marketing Attribution', desc: 'Tracking which channels, campaigns, and ads are generating actual business revenue — not just vanity metrics' },
    { num: '08', title: 'Monthly Strategy', desc: 'Regular reviews with clear reporting and adjustments to continuously improve performance' },
  ],
  processTitle: 'How We Build Digital Marketing Systems for Phoenix Businesses.',
  processSteps: [
    { num: '01', title: 'Marketing Audit', desc: 'We review all current marketing activity, ad accounts, website analytics, and competitive positioning in Phoenix.' },
    { num: '02', title: 'Revenue-Focused Strategy', desc: 'We build a plan tied to actual business revenue goals — not generic KPIs.' },
    { num: '03', title: 'Systematic Launch', desc: 'We activate channels in priority order, building the foundation before scaling spend.' },
    { num: '04', title: 'Measure & Scale', desc: 'Monthly performance reviews with transparent reporting and ongoing channel optimization.' },
  ],
  localTitle: 'Phoenix Digital Marketing That Accounts for the Scale of This Market.',
  localBody: [
    'Phoenix is not a small market you can reach with a modest budget and generic strategy. The metro has millions of potential customers and thousands of competing businesses. Winning here requires disciplined channel selection, smart budget allocation, and creative that stands out in a crowded digital environment.',
    'We have built digital marketing systems for Phoenix businesses in home services, healthcare, professional services, real estate, fitness, food and beverage, and B2B categories. Each category has different buyer behavior, different competition levels, and different channels that perform best. Our Phoenix strategies are built specifically for your business type, not copied from a template.',
    'If you are ready to stop guessing at marketing and start building a system that consistently delivers Phoenix customers, let\'s start with a strategy conversation.',
  ],
  ctaTitle: 'Phoenix Business Growth Starts With a Real Marketing System.',
  ctaBody: 'Stop running isolated campaigns and start building a compounding digital marketing engine for your Phoenix business.',
  relatedServices: [
    { title: 'SEO Phoenix', to: '/services/seo-phoenix', desc: 'Organic search strategy — the most cost-effective long-term traffic source for Phoenix businesses.' },
    { title: 'Local SEO Phoenix', to: '/services/local-seo-phoenix', desc: 'Dominate local pack rankings across Phoenix neighborhoods and service areas.' },
    { title: 'Website Design Phoenix', to: '/services/website-design-phoenix', desc: 'A high-converting website is where all your Phoenix marketing investment lands.' },
  ],
  formTitle: 'Let\'s Build a Digital Marketing System for Your Phoenix Business',
  formSubtitle: 'Tell us your revenue goals and current marketing situation. We\'ll show you exactly what it takes to get there.',
};

export default function DigitalMarketingPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
