import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Website Development Phoenix AZ | RAH Operations',
  seoDescription: 'Custom website development for Phoenix, AZ businesses. Fast builds, clean code, technical SEO, and scalable architecture for companies ready to grow.',
  seoKeywords: 'website development Phoenix, web development Phoenix AZ, Phoenix web developer, custom web development Phoenix, website developer Phoenix Arizona',
  path: '/services/website-development-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Website Development in Phoenix Built to Scale With Your Business.',
  heroSubtitle: 'Phoenix businesses need more than a nice-looking website. They need fast load times, technical SEO foundations, mobile-first architecture, and a site that can grow as the business grows. We build it right the first time.',
  heroCta: 'Get a Development Quote',
  stats: [
    { value: '0.1s', label: 'Delay Reduces Conversions by 7%' },
    { value: '68%', label: 'Sites Fail Core Web Vitals' },
    { value: '40%', label: 'Visitors Leave Slow-Loading Sites' },
    { value: '5×', label: 'SEO Value of Technical Foundations' },
  ],
  problemTitle: 'Most Phoenix Businesses Are Sitting on a Technical Time Bomb.',
  problemBody: [
    'Page builders and cheap website subscriptions make it easy to launch a site fast. The problem is what happens after — sluggish performance as content grows, mobile breakdowns, security vulnerabilities, and a technical SEO ceiling that makes it nearly impossible to rank for competitive Phoenix keywords regardless of how good your content is.',
    'Phoenix is a large metro with serious competition in almost every service category. Your website competing against larger, better-built competitors in Phoenix real estate, healthcare, home services, legal, and professional services needs to be technically equal or superior — not held back by the shortcuts taken to launch quickly.',
  ],
  painPoints: [
    'Page builder bloat causing slow speeds and poor Google performance scores',
    'Technical SEO gaps preventing ranking even when content is strong',
    'Mobile rendering issues causing lost leads on smartphone users',
    'No integration support — forms, CRMs, and booking tools poorly connected',
    'Hosting problems causing downtime during high-traffic periods',
    'No scalability — adding pages or features breaks existing layouts',
  ],
  solutionTitle: 'Development That Gives Phoenix Businesses a Real Technical Advantage.',
  solutionBody: [
    'We develop Phoenix business websites on modern, lightweight frameworks that prioritize speed, search performance, and scalability. Our code is clean, documented, and built to last. We do not bolt SEO on after launch — we build it into the structure from the start.',
    'Our Phoenix development work spans businesses of all sizes. Whether you are launching a new professional services site, rebuilding a real estate platform, or developing a high-traffic local service directory, the technical standards are the same: fast, clean, secure, and optimized.',
  ],
  capabilities: [
    { num: '01', title: 'Framework Development', desc: 'Modern frontend and backend development for sites that load fast and scale effortlessly' },
    { num: '02', title: 'Technical SEO', desc: 'Structured data, canonical setup, sitemap generation, and search console integration from day one' },
    { num: '03', title: 'API Integrations', desc: 'CRM systems, scheduling tools, payment gateways, and third-party services connected cleanly' },
    { num: '04', title: 'Performance Auditing', desc: 'Core Web Vitals testing, load time optimization, and image compression for top-tier scores' },
    { num: '05', title: 'Multi-Location Architecture', desc: 'URL structure and content hierarchy for Phoenix businesses with multiple service areas or locations' },
    { num: '06', title: 'E-Commerce Builds', desc: 'Custom product and service store development for Phoenix businesses selling online' },
    { num: '07', title: 'Security Hardening', desc: 'SSL certificates, secure hosting setup, form validation, and basic penetration hardening' },
    { num: '08', title: 'Maintenance & Updates', desc: 'Ongoing development support to keep your Phoenix site current, secure, and optimized' },
  ],
  processTitle: 'Our Development Process for Phoenix Businesses.',
  processSteps: [
    { num: '01', title: 'Technical Discovery', desc: 'We audit your current site, identify technical deficiencies, and scope the full rebuild or new build requirements.' },
    { num: '02', title: 'Architecture Design', desc: 'We plan the page hierarchy, URL structure, content structure, and all integrations before development starts.' },
    { num: '03', title: 'Build & Test', desc: 'We develop the full site and run rigorous cross-device, cross-browser, and performance testing before launch.' },
    { num: '04', title: 'Deploy & Monitor', desc: 'We deploy with proper redirects, verify all search indexing, and monitor for issues in the first 30 days.' },
  ],
  localTitle: 'Phoenix Web Development That Understands the Market.',
  localBody: [
    'Phoenix\'s business landscape is diverse — from small trades and home services in the West Valley to major corporate and medical campuses in the East Valley. We have worked with Phoenix businesses in construction, legal services, healthcare, fitness, hospitality, and professional services. Each vertical has different technical requirements, and we build accordingly.',
    'Whether your Phoenix business is launching its first professional website or replacing a site that has been holding back your growth, we approach every project with the same technical rigor. No shortcuts. No bloated builders. Just clean code that performs.',
    'Contact us to discuss your Phoenix website development project and we will map out exactly what needs to be built and why.',
  ],
  ctaTitle: 'Stop Leaving Technical Performance on the Table.',
  ctaBody: 'A well-built Phoenix website is an investment that compounds. Better rankings, faster loads, more leads — it all starts with a development partner who builds it right.',
  relatedServices: [
    { title: 'Website Design Phoenix', to: '/services/website-design-phoenix', desc: 'Strategy-driven design for Phoenix businesses ready to compete at the next level.' },
    { title: 'SEO Phoenix', to: '/services/seo-phoenix', desc: 'Organic rankings strategy for Phoenix businesses after your new site is launched.' },
    { title: 'Digital Marketing Phoenix', to: '/services/digital-marketing-phoenix', desc: 'Full marketing systems to drive traffic to your new Phoenix website.' },
  ],
  formTitle: 'Tell Us About Your Phoenix Development Project',
  formSubtitle: 'Describe your project needs and current situation. We will review and get back to you within 24 hours.',
};

export default function WebsiteDevelopmentPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
