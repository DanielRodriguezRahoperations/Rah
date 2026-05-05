import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Website Design Scottsdale AZ | RAH Operations',
  seoDescription: 'Professional website design in Scottsdale, AZ. Custom-built websites engineered for local search rankings, credibility, and lead generation. Serving Scottsdale businesses.',
  seoKeywords: 'website design Scottsdale, Scottsdale web design, website design Scottsdale AZ, web designer Scottsdale, custom website design Scottsdale Arizona',
  path: '/services/website-design-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Website Design in Scottsdale That Earns Trust Before the First Call.',
  heroSubtitle: 'Scottsdale businesses compete in one of Arizona\'s most saturated markets. A generic website does not cut it here. We build custom websites that match the expectations of Scottsdale customers — polished, fast, and built to convert serious leads.',
  heroCta: 'Get a Free Website Audit',
  stats: [
    { value: '94%', label: 'First Impressions Are Design-Driven' },
    { value: '3s', label: 'Avg. User Abandons After 3 Seconds' },
    { value: '75%', label: 'Judge Credibility By Website Alone' },
    { value: '2×', label: 'Avg. Lead Increase Post-Redesign' },
  ],
  problemTitle: 'Most Scottsdale Businesses Are Losing Leads to Competitors With Better Websites.',
  problemBody: [
    'Scottsdale attracts high-income residents, luxury service buyers, and discerning business owners. When those people search for a service — a contractor, a consultant, a medical professional, a restaurant — they compare websites before they make contact. If your site looks dated, loads slowly, or fails to communicate value clearly, they move on to whoever looks more credible.',
    'The reality is that most small businesses in Scottsdale are operating with websites built years ago, or assembled with DIY builders that cap their professional ceiling. Those sites may exist online, but they are not performing. They are not ranking, they are not converting, and they are actively costing the business leads every single day.',
  ],
  painPoints: [
    'Outdated design that signals low quality to potential clients',
    'No SEO structure — invisible in local Scottsdale search results',
    'Slow load times on mobile causing visitors to leave immediately',
    'Unclear messaging that fails to explain the value of the service',
    'No conversion path — visitors land but have no clear next step',
    'Generic templates that make the brand look exactly like competitors',
  ],
  solutionTitle: 'We Build Scottsdale Websites That Are Designed to Rank, Impress, and Convert.',
  solutionBody: [
    'Our website design process starts with strategy — not visuals. Before we design a single page, we clarify your positioning, identify your target customer, map the competitive landscape in Scottsdale, and build a conversion framework around how your ideal clients make decisions.',
    'Every website we build is custom-coded for performance, structured for local SEO from the ground up, and designed to create the kind of first impression that converts a visitor into a qualified lead. We do not use drag-and-drop templates. Every element is intentional.',
  ],
  capabilities: [
    { num: '01', title: 'Custom Design', desc: 'Fully custom layouts built around your brand positioning and Scottsdale market standards' },
    { num: '02', title: 'Local SEO Structure', desc: 'On-page SEO architecture built in from day one so Google knows exactly what you do and where you serve' },
    { num: '03', title: 'Conversion Copywriting', desc: 'Clear, compelling messaging written for the Scottsdale buyer — not generic filler content' },
    { num: '04', title: 'Mobile Optimization', desc: 'Flawless performance on every device, especially mobile where most local searches happen' },
    { num: '05', title: 'Speed Engineering', desc: 'Optimized assets and clean code to hit top-tier performance scores on Core Web Vitals' },
    { num: '06', title: 'Lead Generation Pages', desc: 'Dedicated service and landing pages that target the search terms your best clients are typing' },
    { num: '07', title: 'Analytics Integration', desc: 'Full tracking setup so you know where visitors come from and what they do on your site' },
    { num: '08', title: 'Ongoing Support', desc: 'Post-launch support to keep your site current, fast, and growing as your business evolves' },
  ],
  processTitle: 'Our Four-Phase Website Design Process.',
  processSteps: [
    { num: '01', title: 'Discovery & Strategy', desc: 'We study your business, your competitors in Scottsdale, your ideal clients, and what search terms matter most to your growth.' },
    { num: '02', title: 'Design & Content', desc: 'We build the visual design and write all copy — headlines, service descriptions, calls to action — built to convert.' },
    { num: '03', title: 'Development & SEO', desc: 'We develop the site with clean code, fast load times, proper heading structure, schema markup, and local SEO foundations.' },
    { num: '04', title: 'Launch & Optimize', desc: 'We launch, connect analytics, verify search indexing, and monitor performance in the weeks after going live.' },
  ],
  localTitle: 'Built for the Scottsdale Market.',
  localBody: [
    'Scottsdale is a different kind of market. Clients in Old Town Scottsdale, North Scottsdale, Gainey Ranch, and the surrounding corridors have high expectations. They look for polished, professional presentation before they reach out. That standard raises the bar for every local business that wants to compete seriously.',
    'We understand the Scottsdale business environment. Whether you are a medical spa in the McCormick Ranch area, a contractor serving luxury custom homes in DC Ranch, a law firm near the Scottsdale Financial Center, or a consultant building a client base in North Scottsdale — your website needs to meet the visual and functional standards your potential clients expect.',
    'Our team has worked with Scottsdale-area businesses across multiple industries and we build every website with local relevance in mind: the right messaging, the right structure, and the right signals to show Google that your business belongs at the top of local search results.',
  ],
  ctaTitle: 'Ready for a Website That Actually Works?',
  ctaBody: 'Let\'s talk about what your current site is missing and what a redesigned, SEO-built website could do for your Scottsdale business.',
  relatedServices: [
    { title: 'Local SEO in Scottsdale', to: '/services/local-seo-scottsdale', desc: 'Rank higher in local search and Google Maps for your Scottsdale service area.' },
    { title: 'SEO in Scottsdale', to: '/services/seo-scottsdale', desc: 'Full SEO strategy to grow your organic search visibility across competitive Scottsdale keywords.' },
    { title: 'Digital Marketing Scottsdale', to: '/services/digital-marketing-scottsdale', desc: 'Paid ads, social media, and content systems working together to grow your Scottsdale business.' },
  ],
  formTitle: 'Get a Free Scottsdale Website Audit',
  formSubtitle: 'Tell us about your business and current website. We\'ll review it and show you exactly what needs to improve.',
};

export default function WebsiteDesignScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
