import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Google Business Profile Optimization Phoenix AZ | RAH Operations',
  seoDescription: 'Google Business Profile optimization in Phoenix, AZ. We help Phoenix businesses rank in the local pack, generate more Map views, and drive more calls from local searches.',
  seoKeywords: 'Google Business Profile optimization Phoenix, Google My Business Phoenix AZ, GBP optimization Phoenix, Google Maps Phoenix, local listing optimization Phoenix Arizona',
  path: '/services/google-business-profile-optimization-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Google Business Profile Optimization in Phoenix. More Visibility. More Calls. Zero Ad Spend.',
  heroSubtitle: 'Every day Phoenix customers search for businesses like yours on Google Maps. Whether your profile shows up and what they see when it does determines whether they call you or the competitor ranked above you. We optimize Phoenix GBPs to win both of those battles.',
  heroCta: 'Optimize My Profile',
  stats: [
    { value: '86%', label: 'Consumers Use Google Maps to Find Local Businesses' },
    { value: '29%', label: 'More Conversions With Optimized Business Profile' },
    { value: '2×', label: 'More Map Views After Full Profile Optimization' },
    { value: '64%', label: 'Local Searches End in a Store Visit or Call' },
  ],
  problemTitle: 'In Phoenix\'s Competitive Market, an Unoptimized Google Profile Is Invisible.',
  problemBody: [
    'Phoenix has a saturated local search market in almost every business category. When a customer searches "HVAC Phoenix" or "attorney near me," Google selects the three businesses to show based on relevance, proximity, and prominence. An unoptimized profile loses on relevance and prominence — regardless of how long the business has been operating or how good the service actually is.',
    'Most Phoenix businesses have claimed their Google Business Profile and filled in the basics. But there is a significant gap between a claimed profile and a fully optimized one. Missing categories, empty services sections, no regular posts, no photos, and no active review management all contribute to lower local pack rankings — and every position lower means fewer calls.',
  ],
  painPoints: [
    'Profile shows up but is ranked in position four, five, or lower — below the local pack',
    'Business categories not fully mapped to all relevant Phoenix search queries',
    'No photos or photos from years ago — profile looks inactive to both users and Google',
    'Services section empty — customers and Google cannot quickly understand the full offering',
    'No GBP posts since the profile was set up — profile signals low engagement',
    'Review responses inconsistent or absent — poor impression for undecided searchers',
  ],
  solutionTitle: 'Full-Spectrum GBP Optimization That Puts Phoenix Businesses in the Map Pack.',
  solutionBody: [
    'Our GBP optimization for Phoenix businesses goes well beyond the basics. We evaluate every ranking signal Google uses for local pack placement and systematically address each one. Categories, descriptions, services, attributes, photos, posts, reviews, Q&A, and business information consistency — all optimized and maintained.',
    'Phoenix businesses we work with see measurable increases in profile views, direct calls, direction requests, and website visits from their GBP within the first 30 to 90 days of full optimization. The impact compounds over time as review volume grows and profile activity signals ongoing business health to Google.',
  ],
  capabilities: [
    { num: '01', title: 'Category Mapping', desc: 'Identifying and adding every primary and secondary category that expands your Phoenix search relevance' },
    { num: '02', title: 'Profile Content', desc: 'Keyword-optimized descriptions, service listings, and product entries that communicate full business scope' },
    { num: '03', title: 'Visual Optimization', desc: 'Photo strategy, image uploads, and virtual tour guidance for a profile that looks active and professional' },
    { num: '04', title: 'GBP Posting', desc: 'Regular offers, updates, and event posts that signal ongoing engagement to Google and visitors' },
    { num: '05', title: 'Attribute Selection', desc: 'Maximizing all available business attributes that match Phoenix customer search filters' },
    { num: '06', title: 'Review System', desc: 'Review generation strategy and professional response management to grow star rating and volume' },
    { num: '07', title: 'Citation Alignment', desc: 'Ensuring business information is consistent between GBP and all major Phoenix directory listings' },
    { num: '08', title: 'Performance Reporting', desc: 'Monthly GBP analytics showing search types, map views, click-throughs, and call volume' },
  ],
  processTitle: 'Our Phoenix GBP Optimization Process.',
  processSteps: [
    { num: '01', title: 'Profile Audit', desc: 'Full review of your current GBP, competitor profiles, and local pack ranking factors.' },
    { num: '02', title: 'Complete Optimization', desc: 'Every element of the profile updated, added, or improved according to Google\'s quality guidelines.' },
    { num: '03', title: 'Systems Launch', desc: 'Review request automation, post schedule, and Q&A seeding all activated.' },
    { num: '04', title: 'Monthly Management', desc: 'Ongoing profile management, review responses, insight tracking, and strategy updates.' },
  ],
  localTitle: 'Phoenix GBP Optimization for Every Business Category.',
  localBody: [
    'Phoenix\'s business diversity means GBP optimization needs differ by category. A restaurant needs menu items, hours, and regular photo updates. A contractor needs detailed service listings and project photos. A healthcare provider needs telehealth attributes and appointment links. A professional service firm needs accreditations and specialties highlighted.',
    'We optimize Phoenix GBPs with category-specific expertise, ensuring that your profile is not just complete in the generic sense but fully built out for the specific way Phoenix customers search for your type of business.',
    'If your Phoenix Google Business Profile is not generating the calls it should, start with a free profile audit. We will show you exactly what is missing and what needs to change.',
  ],
  ctaTitle: 'Make Your Phoenix Google Profile Your Best-Performing Marketing Channel.',
  ctaBody: 'Fully optimized GBPs generate calls every day without ongoing ad spend. Phoenix customers are already searching — let\'s make sure they find you.',
  relatedServices: [
    { title: 'Local SEO Phoenix', to: '/services/local-seo-phoenix', desc: 'Local SEO covers every factor beyond GBP that drives local pack rankings.' },
    { title: 'Reputation Management Phoenix', to: '/services/reputation-management-phoenix', desc: 'Review management and trust signals across all platforms.' },
    { title: 'SEO Phoenix', to: '/services/seo-phoenix', desc: 'Organic search strategy that amplifies your local Maps presence.' },
  ],
  formTitle: 'Get a Free Phoenix Google Business Profile Audit',
  formSubtitle: 'Give us your business name and we will run a full profile audit and show you the gaps and opportunities.',
};

export default function GoogleBusinessProfilePhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
