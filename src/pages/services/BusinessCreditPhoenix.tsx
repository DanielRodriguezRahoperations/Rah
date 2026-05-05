import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Business Credit Phoenix AZ | RAH Operations',
  seoDescription: 'Business credit building services in Phoenix, AZ. We help Phoenix entrepreneurs establish a business credit profile, access vendor accounts, and qualify for business funding.',
  seoKeywords: 'business credit Phoenix, build business credit Phoenix AZ, business credit services Phoenix, business credit building Phoenix Arizona',
  path: '/services/business-credit-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Business Credit in Phoenix That Unlocks Capital Without Touching Your Personal Score.',
  heroSubtitle: 'Phoenix is one of the top cities for new business formation in the country. But most new and growing Phoenix businesses have no separate credit identity. We fix that — building the business credit foundation that creates real financial options.',
  heroCta: 'Build My Business Credit',
  stats: [
    { value: '82%', label: 'Small Businesses Use Personal Funds for Operations' },
    { value: '45%', label: 'Business Owners Rejected for Funding Due to No Profile' },
    { value: '12mo', label: 'Typical Timeline to Strong Business Profile' },
    { value: '$250K+', label: 'Credit Available With Strong Business Profile' },
  ],
  problemTitle: 'Phoenix Businesses Are Growing on Personal Debt Instead of Business Credit.',
  problemBody: [
    'Phoenix has seen a surge of new businesses and entrepreneurs over the past several years. Many of them are ambitious and capable — but they are funding their business growth with personal credit cards, personal loans, and out-of-pocket savings because they have not built a separate business credit identity. This approach creates personal financial risk and limits the scale of growth that is possible.',
    'Business credit and personal credit are two different systems. A business with a strong Dun & Bradstreet score and established business tradelines can access vendor net terms, business-only credit cards, equipment financing, and lines of credit that do not affect the owner\'s personal credit at all. But getting there requires building the profile intentionally — it does not happen automatically.',
  ],
  painPoints: [
    'No Dun & Bradstreet number, Experian Business, or Equifax Business profile established',
    'Using personal credit cards for all business expenses — personal credit at risk every month',
    'Applying for business financing with only personal credit history — getting rejected or getting bad terms',
    'No vendor accounts reporting to business credit bureaus',
    'Business structure gaps preventing proper credit profile establishment',
    'No understanding of how to sequence credit accounts for maximum profile growth',
  ],
  solutionTitle: 'A Clear Business Credit Build Strategy for Phoenix Entrepreneurs.',
  solutionBody: [
    'We take Phoenix business owners through a structured credit building process that starts with the right foundation and progresses to real credit access. This is not a shortcut — it is a systematic approach that builds a legitimate business credit profile the right way, so it holds up when it matters.',
    'Our process covers every step: making sure the business entity and EIN are properly configured, establishing the right banking relationships, opening foundational credit accounts in the right sequence, monitoring all three business credit bureaus, and eventually connecting the profile to funding sources that match your business goals.',
  ],
  capabilities: [
    { num: '01', title: 'Business Credit Audit', desc: 'Full review of what credit bureaus currently show for your Phoenix business and where the gaps are' },
    { num: '02', title: 'Entity & EIN Setup', desc: 'Ensuring your LLC, corporation, or other structure is properly configured for credit building' },
    { num: '03', title: 'DUNS Number', desc: 'Establishing your Dun & Bradstreet number — the foundation of business credit in the US' },
    { num: '04', title: 'Starter Accounts', desc: 'The right starter credit accounts and net-30 vendors that report to all three business bureaus' },
    { num: '05', title: 'Business Banking', desc: 'Guidance on business bank accounts that support credit establishment and lender requirements' },
    { num: '06', title: 'Credit Bureau Monitoring', desc: 'Ongoing monitoring of D&B, Experian Business, and Equifax Business profiles' },
    { num: '07', title: 'Credit Line Growth', desc: 'Phased strategy for growing from starter accounts to significant business credit lines' },
    { num: '08', title: 'Funding Navigation', desc: 'Connecting your credit profile to the right Phoenix-area and national funding opportunities' },
  ],
  processTitle: 'Our Phoenix Business Credit Building Process.',
  processSteps: [
    { num: '01', title: 'Baseline Assessment', desc: 'We review your business structure, existing accounts, and all three business credit bureau reports.' },
    { num: '02', title: 'Foundation Fixes', desc: 'We correct any structural issues — entity setup, EIN registration, and business information consistency.' },
    { num: '03', title: 'Account Sequencing', desc: 'We identify and open the right accounts in the right order to build your profile as efficiently as possible.' },
    { num: '04', title: 'Profile Growth', desc: 'Ongoing credit monitoring and account expansion as the profile builds over 6-12 months.' },
  ],
  localTitle: 'Phoenix Business Credit — Built for Entrepreneurs Ready to Scale.',
  localBody: [
    'Phoenix\'s entrepreneurial ecosystem is one of the strongest in the Southwest. The city\'s business-friendly environment, growing population, and expanding economy create real opportunities — but only for businesses that have the financial foundation to move when those opportunities appear.',
    'Whether you are running a food truck in Downtown Phoenix, a home services company in the East Valley, a consulting business, or a retail brand, business credit gives you options. Options to buy equipment, hire staff, take on larger contracts, or weather a slow season without personal financial exposure.',
    'We work with Phoenix businesses at every stage of credit development. Whether you are starting from zero or trying to understand why your existing profile is not opening the doors you expected, we will show you exactly what to do next.',
  ],
  ctaTitle: 'Build the Credit Profile That Opens Doors for Your Phoenix Business.',
  ctaBody: 'Stop mixing personal and business finances. Start building a credit identity that belongs to your business — not you personally.',
  relatedServices: [
    { title: 'Business Funding Arizona', to: '/services/business-funding-arizona', desc: 'Turn a strong credit profile into actual funding for your Arizona business.' },
    { title: 'Start a Business Arizona', to: '/services/start-a-business-arizona', desc: 'Complete business formation services including credit-ready entity setup.' },
    { title: 'LLC Setup Scottsdale', to: '/services/llc-setup-scottsdale', desc: 'Proper LLC structure is the foundation of business credit building.' },
  ],
  formTitle: 'Start Building Business Credit in Phoenix',
  formSubtitle: 'Tell us about your business and your current financing situation. We\'ll map out a realistic path to a strong business credit profile.',
};

export default function BusinessCreditPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
