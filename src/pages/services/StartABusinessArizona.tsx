import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Start a Business in Arizona | RAH Operations',
  seoDescription: 'Complete business formation services in Arizona. LLC setup, EIN, banking, website, local SEO, and business credit — everything needed to launch a serious Arizona business.',
  seoKeywords: 'start a business Arizona, how to start a business in Arizona, business formation Arizona, business setup Arizona, launch a business Arizona',
  path: '/services/start-a-business-arizona',
  heroEyebrow: 'RAH Operations — Arizona',
  heroH1: 'Start a Business in Arizona With the Foundation That Actually Sets You Up to Win.',
  heroSubtitle: 'Starting a business in Arizona is more than filing paperwork. The businesses that grow are the ones that launch with the right structure, the right digital presence, and the right financial foundation. We build all of it.',
  heroCta: 'Let\'s Launch Your Business',
  stats: [
    { value: '#4', label: 'Arizona Ranked for Business Starts Nationally' },
    { value: '60%', label: 'New Businesses Fail Within Five Years' },
    { value: '30%', label: 'Fail Due to Poor Planning and Structure' },
    { value: '80%', label: 'Success Rate With Professional Guidance' },
  ],
  problemTitle: 'Most Arizona Businesses Launch With Gaps They Do Not Discover Until They Cost Real Money.',
  problemBody: [
    'Arizona makes it relatively easy to start a business — file an LLC, get an EIN, open a bank account, build a quick website. The problem is that doing these steps quickly and doing them correctly are two different things. Most new Arizona business owners discover the gaps months or years later: a website that does not rank, a business that cannot get credit, a structure that exposes personal assets, or a digital presence so inconsistent it creates confusion for customers and search engines alike.',
    'Starting a business with the right foundation does not require a massive budget. It requires doing each step correctly, in the right order, with the right supporting elements in place. That is what we help Arizona entrepreneurs do.',
  ],
  painPoints: [
    'No clear order of operations — what to file first, what to set up second, what to build third',
    'Business launched without a website or with a DIY site that does not build credibility or rank',
    'No business credit path — owner is personally liable from day one and stays that way',
    'Inconsistent business information across Google, Yelp, social media, and directories',
    'No operating agreement or formal business documentation — legal exposure from the start',
    'No local SEO foundation — business invisible to local customers searching online',
  ],
  solutionTitle: 'A Complete Arizona Business Launch That Covers Every Critical Foundation.',
  solutionBody: [
    'Our Arizona business setup service covers every component of a serious business launch. Entity formation, EIN, banking setup, operating agreement, registered agent, professional website, Google Business Profile, local SEO foundation, business credit setup, and a marketing plan that gives the business a clear path to its first and continuing customers.',
    'We serve entrepreneurs launching everything from home service businesses and professional service firms to e-commerce brands, consultants, restaurants, contractors, and technology companies. The structure and sequence adapt to the business type, but the commitment to doing it correctly is the same.',
  ],
  capabilities: [
    { num: '01', title: 'Entity Formation', desc: 'LLC or corporation filing in Arizona — correct structure, name search, and Articles of Organization' },
    { num: '02', title: 'EIN & Compliance', desc: 'Federal EIN registration, Arizona state tax setup, and ongoing compliance calendar' },
    { num: '03', title: 'Operating Agreement', desc: 'Custom operating agreement that defines ownership, management, and liability protection' },
    { num: '04', title: 'Business Banking', desc: 'Dedicated business bank account selection and setup — separated from personal finances from day one' },
    { num: '05', title: 'Professional Website', desc: 'A real business website built for search visibility, credibility, and lead generation — not a template' },
    { num: '06', title: 'Google Business Profile', desc: 'Fully optimized GBP for local search visibility from the first day the business is operational' },
    { num: '07', title: 'Business Credit Path', desc: 'Setting up the structure and first accounts that begin building a separate business credit identity' },
    { num: '08', title: 'Marketing Foundation', desc: 'SEO baseline, content strategy, and local presence so customers can find the business from day one' },
  ],
  processTitle: 'Our Arizona Business Launch Process.',
  processSteps: [
    { num: '01', title: 'Launch Consultation', desc: 'We understand your business type, goals, and target market to build the right setup sequence for you.' },
    { num: '02', title: 'Entity & Compliance', desc: 'We handle all legal filings — LLC, EIN, registered agent, operating agreement, and state requirements.' },
    { num: '03', title: 'Digital Foundation', desc: 'Website, Google Business Profile, business email, and consistent listings across the web.' },
    { num: '04', title: 'Growth Setup', desc: 'Business credit path, marketing foundation, and a 90-day action plan for generating the first customers.' },
  ],
  localTitle: 'Arizona Is a Great Place to Build a Business. Start It Right.',
  localBody: [
    'Arizona has a strong entrepreneurial environment — low taxes, pro-business regulation, a growing population, and a diverse economy. Scottsdale, Phoenix, Tucson, Mesa, Chandler, Gilbert, Tempe, and the surrounding communities all have active small business communities and real demand for quality services.',
    'The businesses that capitalize on Arizona\'s favorable environment are the ones that take their foundation seriously. A professionally launched business with a real website, local search presence, and business credit path has a dramatically different growth trajectory than one pieced together from DIY tools and guesswork.',
    'Whether you are launching your first Arizona business or starting a new venture after years in business, we will make sure the foundation is right from the beginning.',
  ],
  ctaTitle: 'Launch Your Arizona Business With Confidence.',
  ctaBody: 'The right start makes every step that follows easier. Let\'s build your Arizona business foundation together.',
  relatedServices: [
    { title: 'LLC Setup Scottsdale', to: '/services/llc-setup-scottsdale', desc: 'Focused LLC formation for Scottsdale-area entrepreneurs.' },
    { title: 'Business Credit Scottsdale', to: '/services/business-credit-scottsdale', desc: 'Build your business credit identity after your entity is formed.' },
    { title: 'Website Design Scottsdale', to: '/services/website-design-scottsdale', desc: 'A professional website that makes your new Arizona business look established from day one.' },
  ],
  formTitle: 'Start Your Arizona Business the Right Way',
  formSubtitle: 'Tell us about your business idea and where you are in the launch process. We\'ll map out exactly what needs to happen next.',
};

export default function StartABusinessArizona() {
  return <ServiceLocationTemplate content={content} />;
}
