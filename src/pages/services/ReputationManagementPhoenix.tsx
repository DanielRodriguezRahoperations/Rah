import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Reputation Management Phoenix AZ | RAH Operations',
  seoDescription: 'Online reputation management for Phoenix, AZ businesses. We build review systems, manage feedback, and create trust signals that convert Phoenix customers.',
  seoKeywords: 'reputation management Phoenix, online reputation management Phoenix AZ, reputation management services Phoenix, review management Phoenix Arizona',
  path: '/services/reputation-management-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Reputation Management in Phoenix. Build the Trust That Turns Searches Into Revenue.',
  heroSubtitle: 'In a city with five million people and thousands of competing businesses, your online reputation is often the deciding factor. We help Phoenix businesses build and maintain the review profiles, trust signals, and digital credibility that wins customers at scale.',
  heroCta: 'Get a Reputation Assessment',
  stats: [
    { value: '89%', label: 'Consumers Check Reviews Before Deciding' },
    { value: '33%', label: 'Customers Will Not Use a Business Under 4 Stars' },
    { value: '40+', label: 'Review Sites Google Monitors for Local Signals' },
    { value: '5%', label: 'Rating Increase Drives Up to 9% Revenue Growth' },
  ],
  problemTitle: 'Phoenix Is a Volume Market. A Poor Reputation Means Losing Leads at Scale.',
  problemBody: [
    'When Phoenix customers search for a local business, they compare options quickly. In a market this large, there are always alternatives. A business with 15 reviews and a 3.8 average is competing against a business with 200 reviews and a 4.7 average — and the outcome of that comparison is predictable. Buyers default to the option that looks more established and more trusted.',
    'The challenge for growing Phoenix businesses is that reputation management is often reactive — owners respond to problems only after damage is done. A proactive reputation system prevents that cycle by consistently generating positive signals before negative experiences can define the brand.',
  ],
  painPoints: [
    'Low review volume making the business look new or untrustworthy compared to competitors',
    'Negative reviews sitting unanswered, signaling poor customer service',
    'Inconsistent ratings across Google, Yelp, Facebook, and industry platforms',
    'No system to ask satisfied customers for reviews, so only unhappy customers leave feedback',
    'Search results showing outdated or irrelevant content when business name is Googled',
    'No competitive awareness — not tracking what reputation signals competitors are building',
  ],
  solutionTitle: 'Systematic Reputation Building That Scales With Your Phoenix Business.',
  solutionBody: [
    'Phoenix businesses that win on reputation are not lucky — they have systems. We build those systems: automated review requests that generate a steady stream of new five-star reviews, professional response management for all incoming feedback, platform optimization across every relevant review site, and content strategies that strengthen what Google shows when someone searches your brand.',
    'We manage reputation for Phoenix businesses across home services, healthcare, restaurants, professional services, and multi-location brands. The approach adapts to the business size and category, but the outcome is always the same: a reputation that earns trust at scale.',
  ],
  capabilities: [
    { num: '01', title: 'Reputation Baseline', desc: 'Complete audit of every review platform, search result, and trust signal for your Phoenix business' },
    { num: '02', title: 'Review Automation', desc: 'Systems that automatically request reviews from satisfied customers at the right moment' },
    { num: '03', title: 'Review Response', desc: 'Professional, timely responses to every review — demonstrating care and accountability to future buyers' },
    { num: '04', title: 'Platform Optimization', desc: 'Google, Yelp, Facebook, BBB, and industry-specific platforms fully built out and actively managed' },
    { num: '05', title: 'Sentiment Monitoring', desc: 'Real-time alerts for new reviews and social mentions so nothing goes unmanaged' },
    { num: '06', title: 'Negative Recovery', desc: 'Strategic handling of negative reviews including response, resolution, and reputation rebuilding' },
    { num: '07', title: 'Brand Search Management', desc: 'Optimizing what appears when customers Google your Phoenix business name' },
    { num: '08', title: 'Reporting Dashboard', desc: 'Monthly reports showing review volume, average rating trends, and platform-by-platform performance' },
  ],
  processTitle: 'Our Phoenix Reputation Management Process.',
  processSteps: [
    { num: '01', title: 'Full Reputation Audit', desc: 'We assess your current standing on every platform — ratings, volume, response rate, and sentiment.' },
    { num: '02', title: 'Priority Plan', desc: 'We identify the highest-impact changes and build a timeline for getting them done.' },
    { num: '03', title: 'System Implementation', desc: 'Review requests, response templates, platform optimization, and monitoring tools all deployed.' },
    { num: '04', title: 'Ongoing Management', desc: 'We manage your reputation month over month — handling responses, generating reviews, and reporting results.' },
  ],
  localTitle: 'Phoenix Reputation Management That Accounts for a Large, Diverse Market.',
  localBody: [
    'Phoenix is home to businesses serving vastly different customer segments — luxury home buyers in Arcadia, working families in the West Valley, healthcare patients across the metro, hospitality guests visiting from out of state. Each segment has different review behavior and different expectations.',
    'We tailor our reputation management approach to the specific customer profile your Phoenix business serves. A roofing company generating reviews from residential homeowners uses different systems than a healthcare practice managing patient feedback. The strategy fits the business.',
    'If your Phoenix business\'s online reputation is holding back your growth, start with a free reputation assessment. We will tell you exactly what customers are finding and what it would take to change it.',
  ],
  ctaTitle: 'Your Phoenix Reputation Is Either Working for You or Against You.',
  ctaBody: 'Let\'s build a reputation that makes the decision easy for Phoenix customers every time they search.',
  relatedServices: [
    { title: 'Local SEO Phoenix', to: '/services/local-seo-phoenix', desc: 'Strong local rankings amplified by a strong review profile.' },
    { title: 'Digital Marketing Phoenix', to: '/services/digital-marketing-phoenix', desc: 'Full digital marketing to grow your Phoenix business across all channels.' },
    { title: 'Website Design Phoenix', to: '/services/website-design-phoenix', desc: 'A credible website that reinforces what your reviews already say about you.' },
  ],
  crossLink: {
    to: '/services/reputation-management-scottsdale',
    label: 'reputation management in Scottsdale',
    context: 'We also serve businesses across the metro who need',
  },
  formTitle: 'Get a Free Phoenix Reputation Assessment',
  formSubtitle: 'Tell us about your business and what review challenges you are facing. We\'ll show you what customers are currently finding.',
};

export default function ReputationManagementPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
