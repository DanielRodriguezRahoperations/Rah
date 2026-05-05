import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Business Funding Arizona | RAH Operations',
  seoDescription: 'Business funding services in Arizona. We help Arizona businesses access capital through credit lines, SBA programs, equipment financing, and revenue-based lending.',
  seoKeywords: 'business funding Arizona, small business funding Arizona, business loans Arizona, business capital Arizona, Arizona business financing',
  path: '/services/business-funding-arizona',
  heroEyebrow: 'RAH Operations — Arizona',
  heroH1: 'Business Funding in Arizona. Capital That Moves as Fast as Your Business Needs To.',
  heroSubtitle: 'Arizona businesses ready to grow need access to capital — for equipment, inventory, staffing, expansion, or bridge financing. We help Arizona businesses understand their options, prepare their applications, and access funding that matches their stage and goals.',
  heroCta: 'Explore Funding Options',
  stats: [
    { value: '43%', label: 'Small Businesses Could Not Get Needed Financing' },
    { value: '$150K', label: 'Avg. Amount Applied For by Small Businesses' },
    { value: '29%', label: 'Applications Rejected Due to Poor Credit Profile' },
    { value: '72hrs', label: 'Approval Timelines for Alternative Lending' },
  ],
  problemTitle: 'Arizona Businesses Need Capital to Grow. Most Do Not Know How to Access It.',
  problemBody: [
    'Accessing business funding in Arizona is not simply a matter of walking into a bank and asking for a loan. Traditional lenders want established credit history, two or more years of business tax returns, strong revenue, and collateral. New businesses and growing businesses without a proper financial foundation often get rejected — even when the underlying business is sound.',
    'The funding landscape has changed significantly. There are more options available to Arizona businesses today than ever before — SBA loans, business lines of credit, merchant cash advances, equipment financing, invoice factoring, and revenue-based lending. But navigating those options without understanding the requirements and implications of each can lead to poor decisions, bad terms, or unnecessary credit inquiries.',
  ],
  painPoints: [
    'Rejected by traditional banks due to insufficient credit history or time in business',
    'Unclear on which funding options are appropriate for the business stage and use case',
    'Personal credit being damaged by hard inquiries from multiple funding applications',
    'Business not properly structured to qualify for SBA or traditional lending programs',
    'Cash flow gaps threatening operations while waiting months for approvals',
    'Funding secured at unfavorable terms that strain the business rather than support it',
  ],
  solutionTitle: 'A Strategy-First Approach to Arizona Business Funding.',
  solutionBody: [
    'We help Arizona businesses prepare for and access funding with a strategy-first approach. Before applying anywhere, we assess the business\'s current credit profile, financial documentation, and structural readiness. Then we identify the funding options that match the business\'s stage and the use of funds — and pursue them in the right sequence to maximize approval odds and minimize unnecessary credit damage.',
    'This is not about chasing every option available. It is about understanding which options are realistic for where the business is now, preparing the strongest possible application, and positioning the business for better options in the future as the credit profile and financials strengthen.',
  ],
  capabilities: [
    { num: '01', title: 'Funding Readiness Assessment', desc: 'Evaluating your credit profile, financials, and business structure for funding eligibility' },
    { num: '02', title: 'SBA Loan Guidance', desc: 'Preparing for SBA 7(a) and SBA Express loans — the most favorable terms available for small businesses' },
    { num: '03', title: 'Business Line of Credit', desc: 'Identifying and applying for revolving business credit lines for operational flexibility' },
    { num: '04', title: 'Equipment Financing', desc: 'Access to equipment loans and leases for Arizona businesses with specific asset needs' },
    { num: '05', title: 'Revenue-Based Lending', desc: 'Short-term capital options for businesses with strong revenue but limited credit history' },
    { num: '06', title: 'Business Credit Cards', desc: 'Identifying the right business card products for reward optimization and credit building' },
    { num: '07', title: 'Documentation Prep', desc: 'Organizing bank statements, tax returns, P&L, and business documentation for lender review' },
    { num: '08', title: 'Lender Navigation', desc: 'Direct connections to Arizona lenders, credit unions, and alternative funding sources' },
  ],
  processTitle: 'Our Arizona Business Funding Process.',
  processSteps: [
    { num: '01', title: 'Funding Readiness', desc: 'We assess your credit profile, business financials, and structure to determine what you qualify for today.' },
    { num: '02', title: 'Option Mapping', desc: 'We identify the best-fit funding options for your use case, timeline, and qualification level.' },
    { num: '03', title: 'Application Prep', desc: 'We prepare your documentation and application for the highest approval probability.' },
    { num: '04', title: 'Funding & Next Steps', desc: 'We help secure the funding and build a plan for strengthening your profile for larger amounts in the future.' },
  ],
  localTitle: 'Arizona Business Funding From Phoenix to Scottsdale and Beyond.',
  localBody: [
    'Arizona has a diverse business economy with strong sectors in construction, healthcare, technology, real estate, hospitality, and professional services. Each sector has different financing needs and different access points to capital. A Phoenix contractor may need equipment financing. A Scottsdale consultant may need a business line of credit for cash flow. A Mesa retailer may need inventory financing.',
    'We work with Arizona businesses across the state — from Scottsdale and Phoenix to Tucson, Mesa, Chandler, Gilbert, Tempe, and beyond. Our goal is to connect your business with funding that makes sense for your specific situation, not generic advice that leaves you no closer to capital.',
    'If your Arizona business needs capital to grow and you are not sure what options are realistic, start with a funding readiness conversation. We will tell you where you stand and what is possible.',
  ],
  ctaTitle: 'Arizona Capital Is Available. Let\'s Build Your Path to It.',
  ctaBody: 'Whether you need funding now or are building toward it, we will map out the fastest, most strategic path forward for your Arizona business.',
  relatedServices: [
    { title: 'Business Credit Scottsdale', to: '/services/business-credit-scottsdale', desc: 'Build the credit profile that qualifies your business for better funding terms.' },
    { title: 'Business Credit Phoenix', to: '/services/business-credit-phoenix', desc: 'Establish business credit in Phoenix as the foundation for capital access.' },
    { title: 'LLC Setup Scottsdale', to: '/services/llc-setup-scottsdale', desc: 'Proper entity structure is required before most business funding applications.' },
  ],
  formTitle: 'Explore Business Funding Options for Your Arizona Business',
  formSubtitle: 'Tell us about your business and what you need capital for. We\'ll assess your options and give you a realistic picture.',
};

export default function BusinessFundingArizona() {
  return <ServiceLocationTemplate content={content} />;
}
