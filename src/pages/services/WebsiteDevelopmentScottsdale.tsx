import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Website Development Scottsdale AZ | RAH Operations',
  seoDescription: 'Custom website development in Scottsdale, AZ. Fast, scalable, SEO-optimized builds for Scottsdale businesses that need more than a template site.',
  seoKeywords: 'website development Scottsdale, web development Scottsdale AZ, Scottsdale web developer, custom web development Scottsdale, website developer Scottsdale Arizona',
  path: '/services/website-development-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Website Development in Scottsdale Built for Performance, Not Just Appearance.',
  heroSubtitle: 'Template builders cap what your website can do. We develop custom websites for Scottsdale businesses that need speed, scalability, clean SEO structure, and a digital presence that can grow alongside the business.',
  heroCta: 'Discuss Your Build',
  stats: [
    { value: '1s', label: 'Ideal Page Load Target' },
    { value: '53%', label: 'Users Leave After 3-Second Load' },
    { value: '200+', label: 'Ranking Factors Affected by Site Code' },
    { value: '4×', label: 'Faster Load = Better Conversion' },
  ],
  problemTitle: 'A Poorly Built Website Costs More Than You Think.',
  problemBody: [
    'Most Scottsdale business owners underestimate how much their website\'s technical foundation affects results. A site built on a bloated page builder with unoptimized images, excessive plugins, and messy code can look acceptable on the surface but perform poorly — slow load times, broken mobile layouts, weak SEO signals, and security vulnerabilities that create real business risk.',
    'When a website is built right, it loads fast, ranks well, and handles traffic without breaking. When it is built wrong, you end up spending money on fixes, redesigns, and SEO patches that would not have been necessary with proper development from the start. Scottsdale businesses operating in competitive niches cannot afford a site that technically underperforms.',
  ],
  painPoints: [
    'Slow load times caused by bloated page builders and unoptimized code',
    'Mobile layout issues that break on certain screen sizes or devices',
    'Weak technical SEO — missing schema, improper heading hierarchy, no sitemap',
    'Security vulnerabilities from outdated plugins or cheap shared hosting',
    'No scalability — site cannot easily add new pages, services, or features',
    'Developer handoff problems — no documentation, locked to proprietary systems',
  ],
  solutionTitle: 'Clean, Fast, Scalable Development Built for How Scottsdale Businesses Grow.',
  solutionBody: [
    'Our development approach prioritizes performance from the first line of code. We build on modern frameworks optimized for speed, structure our pages for technical SEO, and make sure every site we deliver works flawlessly on every device and connection speed.',
    'We work with Scottsdale businesses across a range of complexity levels — from professional service firms that need a clean, fast five-page site, to established companies that need multi-location pages, custom integrations, booking systems, or complex service architectures. Every build gets the same level of technical care.',
  ],
  capabilities: [
    { num: '01', title: 'Custom Development', desc: 'No drag-and-drop. Clean, organized code built for your specific business structure and goals' },
    { num: '02', title: 'Technical SEO Build', desc: 'Proper heading hierarchy, schema markup, canonical tags, sitemap generation, and robots.txt from day one' },
    { num: '03', title: 'Core Web Vitals', desc: 'Optimized builds that hit Google\'s performance benchmarks for LCP, FID, and CLS' },
    { num: '04', title: 'Mobile-First', desc: 'Built for mobile from the start — not adapted after the fact — for a seamless experience on any screen' },
    { num: '05', title: 'Scalable Architecture', desc: 'Page structure designed to grow — add new services, locations, or content without rebuilding from scratch' },
    { num: '06', title: 'Third-Party Integrations', desc: 'CRM connections, booking tools, payment systems, analytics, and form platforms integrated cleanly' },
    { num: '07', title: 'Security & Hosting Guidance', desc: 'SSL setup, secure hosting recommendations, and basic hardening for a reliable, protected site' },
    { num: '08', title: 'Documentation & Handoff', desc: 'Clear documentation so you can manage basic updates without being locked into expensive retainers' },
  ],
  processTitle: 'Our Website Development Process.',
  processSteps: [
    { num: '01', title: 'Architecture Planning', desc: 'We map every page, every URL, every integration point, and every content need before a line of code is written.' },
    { num: '02', title: 'Design Approval', desc: 'Visual designs are approved in full before development begins — no surprises midway through the build.' },
    { num: '03', title: 'Development & QA', desc: 'We build the site, test across devices and browsers, run performance audits, and fix everything before delivery.' },
    { num: '04', title: 'Launch & Verify', desc: 'We handle the launch, submit to search engines, verify all tracking, and do a final performance check.' },
  ],
  localTitle: 'Technical Web Development for Scottsdale\'s Demanding Market.',
  localBody: [
    'Scottsdale businesses serve clients with high expectations. A medical practice near the Scottsdale Airpark, a luxury real estate team in the Silverleaf area, or a boutique fitness studio in North Scottsdale — each of these businesses needs a website that reflects the quality of the service it delivers. A technically weak site contradicts a premium brand.',
    'We have developed websites for Scottsdale businesses across health and wellness, professional services, home improvement, hospitality, and business services. Each project is treated as a serious technical build — not a template swap.',
    'If you are looking for a Scottsdale web developer who understands both the technical requirements and the local market, we are the team to call.',
  ],
  ctaTitle: 'Let\'s Build Something That Actually Performs.',
  ctaBody: 'Talk to us about your project. We\'ll review what you have now and give you a clear picture of what a properly built site could do for your Scottsdale business.',
  relatedServices: [
    { title: 'Website Design Scottsdale', to: '/services/website-design-scottsdale', desc: 'Strategy-first design for Scottsdale businesses that want a site that converts, not just impresses.' },
    { title: 'SEO Scottsdale', to: '/services/seo-scottsdale', desc: 'Organic search strategy to grow your rankings after your new site is live.' },
    { title: 'Local SEO Scottsdale', to: '/services/local-seo-scottsdale', desc: 'Dominate the Scottsdale local pack and Google Maps results for your service category.' },
  ],
  formTitle: 'Tell Us About Your Development Project',
  formSubtitle: 'Share what you are building or what your current site is missing. We\'ll give you a clear scope and timeline.',
};

export default function WebsiteDevelopmentScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
