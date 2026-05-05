import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Reputation Management Scottsdale AZ | RAH Operations',
  seoDescription: 'Online reputation management for Scottsdale, AZ businesses. Build trust, manage reviews, and control what customers find when they search your business name.',
  seoKeywords: 'reputation management Scottsdale, online reputation management Scottsdale AZ, reputation management services Scottsdale, review management Scottsdale Arizona',
  path: '/services/reputation-management-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Reputation Management in Scottsdale. Because What They Find Before They Call Determines Everything.',
  heroSubtitle: 'Scottsdale customers research before they buy. A strong, well-managed online reputation is the difference between being the obvious choice and being passed over. We build and protect the digital trust signals that close deals before the first conversation.',
  heroCta: 'Start My Reputation Audit',
  stats: [
    { value: '93%', label: 'Consumers Read Reviews Before Buying' },
    { value: '4.1★', label: 'Avg. Star Rating That Earns Maximum Trust' },
    { value: '91%', label: 'Trust Online Reviews as Much as Referrals' },
    { value: '4×', label: 'Revenue Lift From Strong Review Profiles' },
  ],
  problemTitle: 'In Scottsdale, a Weak Online Reputation Costs You the Sale Before You Know You Lost It.',
  problemBody: [
    'Scottsdale customers are accustomed to quality. When they search for a business — a contractor, medical professional, restaurant, attorney, or service provider — they look at reviews, check ratings, scan search results, and form a judgment in under a minute. If your reputation does not reflect the quality of your work, you lose those leads silently.',
    'One bad review with no response, an outdated Yelp page with a 3.2 rating, or a Google Business Profile with no photos and minimal reviews — any of these signals can push a Scottsdale buyer toward a competitor who looks more trustworthy, even if your service is genuinely better.',
  ],
  painPoints: [
    'A few negative reviews dragging down your average star rating on Google or Yelp',
    'No response strategy for negative feedback — problems left visible with no resolution shown',
    'Competitor has more reviews and a higher rating, wins business by default',
    'Inconsistent presence across review platforms — strong on Google, invisible everywhere else',
    'No proactive system to generate new positive reviews from satisfied customers',
    'Outdated or incomplete business profiles undermining credibility',
  ],
  solutionTitle: 'A Proactive Reputation System That Consistently Earns Trust in the Scottsdale Market.',
  solutionBody: [
    'Our reputation management for Scottsdale businesses is built around one principle: a strong reputation should not be reactive — it should be systematically built and maintained. We create the structures, processes, and content strategies that make your business consistently look like the most credible option in your category.',
    'This includes review generation, professional response management, platform optimization, trust signal development, and search result management. Everything working together to ensure that when a Scottsdale customer searches your business name or your service category, what they find builds confidence and closes the sale.',
  ],
  capabilities: [
    { num: '01', title: 'Reputation Audit', desc: 'Complete assessment of your current review profiles, ratings, and search result reputation across all platforms' },
    { num: '02', title: 'Review Generation', desc: 'Automated and manual systems that consistently turn happy Scottsdale clients into five-star reviews' },
    { num: '03', title: 'Response Management', desc: 'Professional, on-brand responses to every review — positive and negative — that demonstrate accountability' },
    { num: '04', title: 'Platform Management', desc: 'Full management of Google, Yelp, Facebook, industry-specific platforms, and relevant local directories' },
    { num: '05', title: 'Trust Signal Development', desc: 'Building out testimonials, case studies, credentials, and authority content across your digital presence' },
    { num: '06', title: 'Negative Review Strategy', desc: 'Tactical response and resolution processes that mitigate the impact of negative feedback' },
    { num: '07', title: 'Competitive Benchmarking', desc: 'Tracking how your Scottsdale reputation compares to competitors and closing the gap' },
    { num: '08', title: 'Monthly Reporting', desc: 'Clear reporting on review volume, average rating, new reviews, and reputation trend' },
  ],
  processTitle: 'Our Scottsdale Reputation Management Approach.',
  processSteps: [
    { num: '01', title: 'Audit', desc: 'We document your full reputation landscape — every platform, every review, every gap and opportunity.' },
    { num: '02', title: 'Strategy', desc: 'We build a prioritized plan targeting the biggest reputation gaps first for fastest visible improvement.' },
    { num: '03', title: 'Execution', desc: 'We implement review systems, optimize profiles, respond to existing reviews, and build trust content.' },
    { num: '04', title: 'Maintain & Grow', desc: 'Ongoing review management, monthly reporting, and strategic evolution as your reputation strengthens.' },
  ],
  localTitle: 'Scottsdale\'s Standards Are High. Your Reputation Should Match.',
  localBody: [
    'Scottsdale is a market built on quality and trust. Residents here regularly research businesses extensively before making purchase decisions, especially for high-ticket services like home improvement, healthcare, legal, financial, and personal services. A 3-star rating or an ignored one-star review can quietly cost a Scottsdale business thousands of dollars a month in lost leads.',
    'We have worked with Scottsdale businesses in medical and wellness, home services, hospitality, professional services, and retail. In each category, a well-managed reputation consistently shows up as a top differentiator in why customers choose one business over another.',
    'If you are ready to make your Scottsdale reputation a competitive asset instead of a liability, start with a free reputation audit.',
  ],
  ctaTitle: 'Make Your Scottsdale Reputation Your Strongest Sales Asset.',
  ctaBody: 'What customers find when they search your name should make the decision easy. Let\'s build that.',
  relatedServices: [
    { title: 'Local SEO Scottsdale', to: '/services/local-seo-scottsdale', desc: 'Rank in local search results alongside a strong review profile for maximum impact.' },
    { title: 'Website Design Scottsdale', to: '/services/website-design-scottsdale', desc: 'A credibility-focused website that reinforces your strong reputation.' },
    { title: 'Digital Marketing Scottsdale', to: '/services/digital-marketing-scottsdale', desc: 'Amplify your reputation across paid and organic channels in Scottsdale.' },
  ],
  formTitle: 'Request a Free Scottsdale Reputation Audit',
  formSubtitle: 'Tell us about your business and current review situation. We\'ll assess your full digital reputation and identify the highest-priority improvements.',
};

export default function ReputationManagementScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
