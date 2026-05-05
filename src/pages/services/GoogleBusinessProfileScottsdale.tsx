import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Google Business Profile Optimization Scottsdale AZ | RAH Operations',
  seoDescription: 'Google Business Profile optimization in Scottsdale, AZ. Maximize your Maps visibility, improve local pack rankings, and generate more calls from Scottsdale local searches.',
  seoKeywords: 'Google Business Profile optimization Scottsdale, Google My Business Scottsdale AZ, GBP optimization Scottsdale, Google Maps Scottsdale, local listing optimization Scottsdale Arizona',
  path: '/services/google-business-profile-optimization-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Google Business Profile Optimization in Scottsdale. Your Most Powerful Free Marketing Tool — Used Correctly.',
  heroSubtitle: 'Your Google Business Profile is often the first thing a Scottsdale customer sees when they search for your service. An unoptimized profile means lower rankings, fewer calls, and missed opportunities every single day.',
  heroCta: 'Optimize My Google Profile',
  stats: [
    { value: '5×', label: 'More Views With Fully Optimized GBP' },
    { value: '70%', label: 'Customers Visit After Finding Business on Maps' },
    { value: '50%', label: 'More Likely to Lead to Purchase With Complete Profile' },
    { value: '36%', label: 'Local Pack Clicks Go to Google Business Profile' },
  ],
  problemTitle: 'Most Scottsdale Businesses Have a Google Business Profile That Is Costing Them Customers.',
  problemBody: [
    'Google Business Profile is the most visible component of local search for Scottsdale businesses. When someone searches "contractor Scottsdale" or "dentist near me," the three businesses in the local pack are often determined primarily by their GBP strength. An incomplete, unoptimized profile does not just underperform — it actively signals to Google that the business is less relevant than competitors with complete profiles.',
    'Common GBP problems in Scottsdale include missing business categories, outdated hours, no photos or stock-only photos, no products or services listed, no posts, no response to reviews, and missing attributes that affect how Google matches the profile to relevant searches. Each of these gaps is an opportunity a properly optimized profile would capture.',
  ],
  painPoints: [
    'Profile not showing in the local pack for primary Scottsdale service keywords',
    'Missing secondary business categories that could capture additional search traffic',
    'No photos or outdated photos — making the business look inactive or unprofessional',
    'Services and products section empty — Google cannot match you to specific service searches',
    'No regular posts — profile looks dormant compared to actively managed competitors',
    'Unanswered reviews — negative signals to both Google and potential Scottsdale customers',
  ],
  solutionTitle: 'A Fully Optimized Scottsdale GBP That Maximizes Every Local Search Opportunity.',
  solutionBody: [
    'We perform deep GBP optimization for Scottsdale businesses — not just filling in the basics, but maximizing every element Google uses to evaluate profile quality and relevance. This includes primary and secondary category selection, full service and product listings, keyword-rich business descriptions, photo strategy, regular posting, review management, Q&A optimization, and attribute selection.',
    'After optimization, we monitor and manage the profile on an ongoing basis — tracking search impressions, map views, calls, and direction requests to ensure the profile continues to perform as Scottsdale competition evolves.',
  ],
  capabilities: [
    { num: '01', title: 'Category Optimization', desc: 'Selecting the primary and all relevant secondary categories to maximize search relevance' },
    { num: '02', title: 'Business Description', desc: 'Keyword-rich, compelling description that clearly communicates what you do and who you serve' },
    { num: '03', title: 'Services & Products', desc: 'Complete services and product listings with descriptions that help Google match you to specific searches' },
    { num: '04', title: 'Photo Strategy', desc: 'Professional photo guidelines and ongoing image uploads that make the profile look active and credible' },
    { num: '05', title: 'GBP Posts', desc: 'Regular posts about services, promotions, and updates that signal an active, engaged business' },
    { num: '06', title: 'Review Management', desc: 'Professional responses to all reviews and systems to generate more positive reviews consistently' },
    { num: '07', title: 'Q&A Optimization', desc: 'Populating the Q&A section with relevant questions and answers that help searchers and Google' },
    { num: '08', title: 'Insight Tracking', desc: 'Monthly review of GBP analytics — searches, views, calls, and direction requests' },
  ],
  processTitle: 'Our GBP Optimization Process for Scottsdale Businesses.',
  processSteps: [
    { num: '01', title: 'Profile Audit', desc: 'We assess every element of your current profile against Google\'s quality guidelines and local competitors.' },
    { num: '02', title: 'Deep Optimization', desc: 'Every field, category, service, photo, and attribute is optimized for maximum Scottsdale search relevance.' },
    { num: '03', title: 'Activation', desc: 'Review request systems, posting cadence, and Q&A setup to keep the profile active and growing.' },
    { num: '04', title: 'Monitor & Maintain', desc: 'Monthly profile management, insight review, and adjustments based on what Scottsdale search data shows.' },
  ],
  localTitle: 'Scottsdale Google Business Profile Optimization That Compounds Over Time.',
  localBody: [
    'In Scottsdale, Google Business Profile performance directly influences how many calls a local business gets every week. We have seen properly optimized profiles double and triple the call volume for Scottsdale businesses in home services, medical, and professional service categories within 60 to 90 days of full optimization.',
    'The Scottsdale local pack is competitive, but most businesses in it are not maximizing their profiles. A business that takes GBP optimization seriously often outranks competitors with more years in business and more overall reviews — because Google rewards profile completeness, activity, and relevance, not just seniority.',
    'If your Scottsdale GBP is not generating the call volume it should, start with a free profile review.',
  ],
  ctaTitle: 'Turn Your Scottsdale Google Profile Into a Lead Generation Machine.',
  ctaBody: 'Most Scottsdale businesses are leaving local search calls on the table. A fully optimized GBP changes that.',
  relatedServices: [
    { title: 'Local SEO Scottsdale', to: '/services/local-seo-scottsdale', desc: 'GBP optimization is one piece — full local SEO covers the rest.' },
    { title: 'Reputation Management Scottsdale', to: '/services/reputation-management-scottsdale', desc: 'Manage reviews and trust signals across all platforms, not just Google.' },
    { title: 'SEO Scottsdale', to: '/services/seo-scottsdale', desc: 'Organic search strategy that complements your local Maps visibility.' },
  ],
  formTitle: 'Get a Free Google Business Profile Review for Your Scottsdale Business',
  formSubtitle: 'Tell us your business name and category. We\'ll audit your profile and show you exactly what is being missed.',
};

export default function GoogleBusinessProfileScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
