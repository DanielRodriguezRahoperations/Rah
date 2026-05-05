import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Website Design Phoenix | Professional Websites for Phoenix Businesses',
  seoDescription: 'Need website design in Phoenix? RAH Operations builds high-performance, SEO-ready websites for Phoenix businesses ready to rank locally and generate real leads.',
  seoKeywords: 'website design Phoenix, Phoenix web design, website design Phoenix AZ, web designer Phoenix, custom website Phoenix Arizona',
  path: '/services/website-design-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Website Design in Phoenix Built for a Market That Does Not Wait.',
  heroSubtitle: 'Phoenix is one of the fastest-growing cities in the country. More competition means more pressure on every business to look credible, rank locally, and convert visitors into customers. We build websites for Phoenix businesses ready to compete and win.',
  heroCta: 'Start Your Project',
  stats: [
    { value: '5M+', label: 'Phoenix Metro Population' },
    { value: '88%', label: 'Research Online Before Buying' },
    { value: '60%', label: 'Local Searches Done on Mobile' },
    { value: '3×', label: 'More Leads From SEO-Built Sites' },
  ],
  problemTitle: 'Phoenix Is a High-Volume Market. A Weak Website Means Invisible Growth.',
  problemBody: [
    'Phoenix has seen explosive population growth, which means more businesses competing for the same customers in every category. From contractors and healthcare providers to restaurants, consultants, and service businesses — the Phoenix market is increasingly competitive online. Businesses that invested in professional websites and local SEO are pulling ahead. Businesses that did not are getting buried.',
    'The problem is not that people are not searching. The problem is that most Phoenix business websites are not built to be found, and when found, not built to convert. Poor load times, confusing navigation, weak messaging, and no local SEO signal mean the site exists but delivers nothing.',
  ],
  painPoints: [
    'Website buried in search results because it has no local SEO foundation',
    'High mobile bounce rate due to slow speed and poor responsive design',
    'No clear messaging for Phoenix-area customers about what you offer and why it matters',
    'DIY or template-built site that looks unprofessional compared to competitors',
    'No dedicated service or location pages — one generic page for everything',
    'Low trust signals — no reviews, no proof, no clear call to action',
  ],
  solutionTitle: 'Professional Website Design That Puts Phoenix Businesses Where Customers Are Looking.',
  solutionBody: [
    'We build Phoenix business websites from the ground up with a clear goal: rank, impress, and convert. Every page is structured for local search, every section is written for your target customer, and every design decision is made to create a professional impression that earns trust before a single conversation takes place.',
    'We work with Phoenix businesses across every major corridor — Downtown Phoenix, Camelback, Ahwatukee, Tempe, Chandler, Mesa, Glendale, and the broader metro. Whether you serve local residential customers or regional businesses, the strategy is the same: a fast, clean, credible website that generates real leads.',
  ],
  capabilities: [
    { num: '01', title: 'Custom Page Design', desc: 'Purpose-built layouts that communicate your value and guide visitors toward contacting you' },
    { num: '02', title: 'Phoenix Local SEO', desc: 'Location-aware page structure, headings, and schema that help Phoenix customers find you first' },
    { num: '03', title: 'Conversion-Focused Copy', desc: 'Direct, benefit-driven writing that speaks to Phoenix-area buyers and gets them to act' },
    { num: '04', title: 'Performance Optimization', desc: 'Optimized images, clean code, and fast hosting so the site loads instantly on any device' },
    { num: '05', title: 'Service Area Pages', desc: 'Dedicated pages targeting Phoenix neighborhoods and adjacent cities to expand your local reach' },
    { num: '06', title: 'Lead Capture Systems', desc: 'Forms, CTAs, and contact workflows designed to convert visitor interest into actual inquiries' },
    { num: '07', title: 'Trust Architecture', desc: 'Testimonials, case studies, credentials, and proof elements that build buyer confidence' },
    { num: '08', title: 'Launch & Monitoring', desc: 'Post-launch support including analytics, indexing verification, and ongoing performance review' },
  ],
  processTitle: 'How We Build Phoenix Websites That Perform.',
  processSteps: [
    { num: '01', title: 'Market Research', desc: 'We study your Phoenix competitors, identify what is working, and map the keyword and positioning opportunities for your business.' },
    { num: '02', title: 'Strategy & Architecture', desc: 'We plan the page structure, content hierarchy, and conversion flow before any design begins.' },
    { num: '03', title: 'Design & Development', desc: 'We build the full site — design, copy, code — optimized for speed, SEO, and mobile performance.' },
    { num: '04', title: 'Launch & Growth Plan', desc: 'We launch the site, connect all tracking, and hand off a clear roadmap for continued SEO growth.' },
  ],
  localTitle: 'Deep Roots in the Phoenix Business Market.',
  localBody: [
    'Phoenix is not one market — it is a network of distinct neighborhoods, industries, and customer profiles. A website for a contractor in Ahwatukee needs different positioning than a consulting firm in Downtown Phoenix. A restaurant in Tempe has different conversion needs than a medical practice in Paradise Valley.',
    'We build websites with that nuance in mind. Our Phoenix clients get location-relevant content, properly tagged service areas, neighborhood-specific landing pages where relevant, and a design that speaks to the specific type of customer they are trying to reach.',
    'Many Phoenix small businesses search for website design near me and end up with a template solution that fails to rank or convert. We will show you what your current site is missing and what a professionally built, locally optimized website can change for your Phoenix business.',
  ],
  crossLink: {
    to: '/services/website-design-scottsdale',
    label: 'website design in Scottsdale',
    context: 'We also work with business owners looking for',
  },
  ctaTitle: 'Let\'s Build the Website Your Phoenix Business Deserves.',
  ctaBody: 'Most Phoenix businesses are losing leads because their website is not doing its job. Let\'s fix that.',
  relatedServices: [
    { title: 'SEO in Phoenix', to: '/services/seo-phoenix', desc: 'Rank for the high-intent Phoenix search terms your best customers are using right now.' },
    { title: 'Local SEO Phoenix', to: '/services/local-seo-phoenix', desc: 'Dominate Google Maps and the local pack for Phoenix service area searches.' },
    { title: 'Digital Marketing Phoenix', to: '/services/digital-marketing-phoenix', desc: 'Paid ads and organic content working together to grow your Phoenix customer base.' },
  ],
  formTitle: 'Tell Us About Your Phoenix Business',
  formSubtitle: 'Share what your current website is missing. We\'ll put together a clear plan to fix it.',
};

export default function WebsiteDesignPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
