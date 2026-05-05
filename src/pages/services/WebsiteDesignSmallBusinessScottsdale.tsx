import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Website Design for Small Business in Scottsdale AZ | RAH Operations',
  seoDescription: 'Website design for small businesses in Scottsdale, AZ. Affordable, professional websites built to rank locally, look credible, and generate leads — not just look good.',
  seoKeywords: 'website design for small business Scottsdale, small business website design Scottsdale AZ, affordable website design Scottsdale, small business web design Scottsdale Arizona',
  path: '/services/website-design-for-small-business-scottsdale',
  heroEyebrow: 'RAH Operations — Small Business Website Design',
  heroH1: 'Website Design for Small Businesses in Scottsdale That Compete With the Big Guys.',
  heroSubtitle: 'Small businesses in Scottsdale do not need a massive budget to have a website that wins. They need the right strategy, the right structure, and a design that earns trust. We build exactly that — and we build it to rank.',
  heroCta: 'Get a Small Business Quote',
  stats: [
    { value: '70%', label: 'Small Businesses Without a Website Miss Online Leads' },
    { value: '$1.6T', label: 'Annual Revenue Driven by Small Business Websites' },
    { value: '3×', label: 'More Credibility Perceived With Professional Website' },
    { value: '81%', label: 'Consumers Research Small Businesses Online Before Visiting' },
  ],
  problemTitle: 'Most Scottsdale Small Business Websites Look Like They Were Built in Five Minutes.',
  problemBody: [
    'The DIY website builder market has made it easy for small businesses to launch a site cheaply. The problem is that cheap and quick usually produces a site that looks exactly like thousands of other small businesses — no distinct positioning, no real SEO structure, poor mobile performance, and messaging that does not clearly explain why someone should choose this business over the one next door.',
    'Scottsdale customers are discerning. When they search for a small business — a personal trainer, a cleaning service, a bookkeeper, a remodeling company, a pet groomer, a massage therapist — they judge the professionalism of the website before they make contact. A site that looks like it was built in an afternoon tells them something about how the business operates.',
  ],
  painPoints: [
    'DIY website that does not look professional or trustworthy to Scottsdale clients',
    'Website not showing up in Google for any local Scottsdale search terms',
    'Template design that looks identical to dozens of competing small businesses',
    'No clear conversion path — visitors land but do not know how to book, call, or inquire',
    'Slow load time caused by bloated builder platform affecting both user experience and SEO',
    'No mobile optimization — poorly displayed on the phones where most local searches happen',
  ],
  solutionTitle: 'Professional Small Business Websites That Scottsdale Clients Take Seriously.',
  solutionBody: [
    'Small businesses in Scottsdale deserve professional web presence that is sized for their budget without compromising on the elements that actually drive results. We build small business websites with the same strategic approach as larger sites — clear positioning, local SEO architecture, mobile-first design, and a conversion path built around how your specific customers make decisions.',
    'We work with Scottsdale small businesses across every category — personal services, home services, professional services, health and wellness, food and beverage, and specialty retail. Whether you need a three-page site or a ten-page service hub, we build it to perform, not just to exist.',
  ],
  capabilities: [
    { num: '01', title: 'Strategic Design', desc: 'Custom layouts — not templates — designed around your brand and Scottsdale client expectations' },
    { num: '02', title: 'Local SEO Built In', desc: 'On-page SEO structure, local schema, and keyword targeting from the first page built' },
    { num: '03', title: 'Clear Messaging', desc: 'Copy that explains what you do, who it is for, and why Scottsdale clients should choose you specifically' },
    { num: '04', title: 'Mobile Performance', desc: 'Optimized for the mobile experience where the majority of Scottsdale local searches begin' },
    { num: '05', title: 'Conversion Flow', desc: 'Clear calls to action — phone, form, booking — designed to turn visitors into actual inquiries' },
    { num: '06', title: 'Google Business Setup', desc: 'GBP creation or optimization alongside the website launch for immediate local visibility' },
    { num: '07', title: 'Speed Optimization', desc: 'Fast load times on clean, lightweight code — not bloated builder platforms' },
    { num: '08', title: 'Growth Ready', desc: 'Built to scale — add new service pages, blog content, or locations without rebuilding' },
  ],
  processTitle: 'How We Build Small Business Websites in Scottsdale.',
  processSteps: [
    { num: '01', title: 'Discovery', desc: 'We learn your business, your target client, and what makes you the right choice for Scottsdale customers.' },
    { num: '02', title: 'Design & Copy', desc: 'We create the visual design and write the content — both built around SEO and conversion, not just aesthetics.' },
    { num: '03', title: 'Build & Optimize', desc: 'We develop the site, connect analytics, set up GBP, and optimize every technical performance factor.' },
    { num: '04', title: 'Launch & Support', desc: 'We launch, verify indexing, and provide the support your small business needs going forward.' },
  ],
  localTitle: 'Scottsdale Small Businesses Deserve a Website That Competes.',
  localBody: [
    'Running a small business in Scottsdale means competing in one of Arizona\'s most active consumer markets. From Old Town and South Scottsdale to McCormick Ranch, Gainey Ranch, and North Scottsdale, the businesses that win customers online are the ones that look and function professionally on the web.',
    'We have worked with Scottsdale small businesses at every stage — from brand new startups that need their first professional website to established businesses that have been operating for years on a site that no longer represents the quality of what they actually offer.',
    'If you are a Scottsdale small business ready to have a website you are proud to send people to — one that actually generates calls and inquiries — we are the team to call.',
  ],
  ctaTitle: 'Your Scottsdale Small Business Deserves a Website That Works as Hard as You Do.',
  ctaBody: 'Let\'s build you a website that makes Scottsdale customers take your business seriously and reaches them where they are searching.',
  relatedServices: [
    { title: 'Local SEO Scottsdale', to: '/services/local-seo-scottsdale', desc: 'Local search visibility that puts your small business in front of Scottsdale buyers.' },
    { title: 'Google Business Profile Scottsdale', to: '/services/google-business-profile-optimization-scottsdale', desc: 'Optimize your Maps presence alongside your new website.' },
    { title: 'SEO Scottsdale', to: '/services/seo-scottsdale', desc: 'Grow your organic search rankings after your new site is live.' },
  ],
  formTitle: 'Get a Quote for Your Scottsdale Small Business Website',
  formSubtitle: 'Tell us about your business and what you need. We\'ll put together a clear plan and honest pricing.',
};

export default function WebsiteDesignSmallBusinessScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
