import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Business Credit Scottsdale AZ | RAH Operations',
  seoDescription: 'Business credit building services in Scottsdale, AZ. We help Scottsdale businesses establish tradelines, build credit profiles, and access the capital they need to grow.',
  seoKeywords: 'business credit Scottsdale, business credit building Scottsdale AZ, build business credit Scottsdale, business credit services Scottsdale Arizona',
  path: '/services/business-credit-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Business Credit in Scottsdale That Separates Your Business Finances From Your Personal Risk.',
  heroSubtitle: 'Most Scottsdale small business owners are personally liable for every business expense. Building a strong business credit profile changes that — giving your business its own financial identity, its own borrowing capacity, and access to capital that does not depend on your personal score.',
  heroCta: 'Start Building Business Credit',
  stats: [
    { value: '72%', label: 'Small Businesses Lack Separate Credit Profile' },
    { value: '$50K+', label: 'Avg. Access After Strong Credit Build' },
    { value: '6-12', label: 'Months to Build an Actionable Profile' },
    { value: '0%', label: 'Personal Credit Risk With Proper Separation' },
  ],
  problemTitle: 'Scottsdale Businesses Are Funding Growth With Personal Credit — And That Is a Risk.',
  problemBody: [
    'When a business has no separate credit profile, the owner\'s personal credit score becomes the only financial instrument available for business needs. That means personal liability on every card, every loan, and every lease. It also means that when the business needs capital — for equipment, inventory, hiring, or expansion — the options are limited and the terms are poor.',
    'Scottsdale is home to a growing number of entrepreneurs and small business owners who are operating without a proper business credit foundation. They are mixing personal and business finances, using personal cards for business expenses, and missing out on net-30 accounts, business lines of credit, and vendor terms that established businesses use to grow without personal risk.',
  ],
  painPoints: [
    'No separate business credit profile — all financing runs through personal credit',
    'Personal score exposed every time the business needs capital or vendor terms',
    'Unable to qualify for business-only credit cards, lines of credit, or equipment financing',
    'No tradeline history — lenders have nothing to evaluate when considering the business',
    'Business structure not properly set up to support credit building',
    'Missed opportunities with net-30 vendor accounts that build business credit for free',
  ],
  solutionTitle: 'A Structured Business Credit Build That Gives Your Scottsdale Business Financial Independence.',
  solutionBody: [
    'Building business credit is a process with a specific sequence. First, the business structure has to be right — proper entity setup, EIN, dedicated business banking, professional presence. Then the foundational credit relationships are established. Then tradelines are built. Then credit lines grow over time.',
    'We work with Scottsdale business owners to build that sequence correctly from the start, or to fix and strengthen an existing credit profile that is not performing. The goal is a business that can access capital, secure vendor terms, and operate with financial flexibility that does not put the owner\'s personal credit at risk.',
  ],
  capabilities: [
    { num: '01', title: 'Credit Foundation Audit', desc: 'Assessment of your current business setup, existing credit profile, and gaps to fill' },
    { num: '02', title: 'Business Structure Review', desc: 'Ensuring your entity, EIN, address, and presence are properly configured for credit building' },
    { num: '03', title: 'Business Banking Guidance', desc: 'Setting up the right business bank account relationships that support credit establishment' },
    { num: '04', title: 'Tradeline Strategy', desc: 'Identifying and applying for the right starter tradelines to begin building business credit history' },
    { num: '05', title: 'Net-30 Accounts', desc: 'Access to net-30 vendor accounts that report to business credit bureaus and build history quickly' },
    { num: '06', title: 'Business Credit Monitoring', desc: 'Ongoing monitoring of your Dun & Bradstreet, Experian Business, and Equifax Business profiles' },
    { num: '07', title: 'Credit Line Progression', desc: 'Strategy for moving from starter accounts to meaningful business credit lines over 6-12 months' },
    { num: '08', title: 'Funding Access', desc: 'Connecting strong credit profiles to appropriate funding options — business cards, lines, and loans' },
  ],
  processTitle: 'How We Build Business Credit for Scottsdale Businesses.',
  processSteps: [
    { num: '01', title: 'Foundation Review', desc: 'We audit your business structure, banking, and any existing credit profile to identify the starting point.' },
    { num: '02', title: 'Credit Roadmap', desc: 'We build a 6-12 month credit development plan specific to your business goals and current standing.' },
    { num: '03', title: 'Account Building', desc: 'We guide you through establishing the foundational accounts, tradelines, and credit relationships in the right order.' },
    { num: '04', title: 'Growth & Funding', desc: 'As the profile strengthens, we identify the right funding opportunities and prepare you to apply successfully.' },
  ],
  localTitle: 'Business Credit for Scottsdale\'s Growing Entrepreneur Community.',
  localBody: [
    'Scottsdale has a strong small business and entrepreneur community — from independent contractors and home service businesses to boutique retail, health and wellness, and professional services. Most of these businesses are operating without a proper business credit foundation, which limits their access to capital and creates unnecessary personal financial risk.',
    'Whether you are launching a new Scottsdale business or trying to unlock funding options for an established one, business credit is a foundational asset. We work with Scottsdale business owners at every stage — from the first LLC to established companies ready to access six-figure credit lines.',
    'If you want to build business credit properly and stop mixing personal finances with your Scottsdale business, let\'s talk.',
  ],
  ctaTitle: 'Give Your Scottsdale Business the Financial Foundation to Grow.',
  ctaBody: 'Business credit is not a luxury — it is a foundational tool for any serious business. Let\'s build yours.',
  relatedServices: [
    { title: 'LLC Setup Scottsdale', to: '/services/llc-setup-scottsdale', desc: 'Proper business structure is the first step in building business credit.' },
    { title: 'Business Funding Arizona', to: '/services/business-funding-arizona', desc: 'Turn your credit profile into actual capital with Arizona business funding strategies.' },
    { title: 'Start a Business Arizona', to: '/services/start-a-business-arizona', desc: 'Complete business setup from entity formation to digital presence.' },
  ],
  formTitle: 'Start Your Business Credit Journey in Scottsdale',
  formSubtitle: 'Tell us about your business and your current financing situation. We\'ll show you what is possible.',
};

export default function BusinessCreditScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
