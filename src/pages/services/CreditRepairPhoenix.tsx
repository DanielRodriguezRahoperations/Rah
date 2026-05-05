import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Credit Repair Phoenix AZ | RAH Operations',
  seoDescription: 'Personal credit repair services in Phoenix, AZ. We help Phoenix residents dispute errors, remove damaging items, and build the credit scores needed for homes, cars, and business.',
  seoKeywords: 'credit repair Phoenix, credit repair services Phoenix AZ, fix credit Phoenix, credit score improvement Phoenix, credit restoration Phoenix Arizona',
  path: '/services/credit-repair-phoenix',
  heroEyebrow: 'RAH Operations — Phoenix, AZ',
  heroH1: 'Credit Repair in Phoenix. Take Control of the Score That Controls Your Options.',
  heroSubtitle: 'Whether you are trying to buy a home in Phoenix, qualify for a car loan, start a business, or simply get out from under the weight of a damaged credit history — better credit changes what is available to you. We help Phoenix residents get there.',
  heroCta: 'Start My Credit Repair',
  stats: [
    { value: '34%', label: 'Americans Have Sub-670 Credit Scores' },
    { value: '2.9%', label: 'Higher Rate Paid by 620 vs 760 Score Borrowers' },
    { value: '$28K', label: 'Extra Paid on 30yr Mortgage at Lower Score' },
    { value: '6mo', label: 'Avg. Timeline for Meaningful Credit Improvement' },
  ],
  problemTitle: 'A Damaged Credit Score in Phoenix Has Real Dollar Consequences.',
  problemBody: [
    'Phoenix is a city of opportunity — but accessing those opportunities often requires good credit. A home purchase in Phoenix, an auto loan, a business credit card, or even a rental application can be blocked or made significantly more expensive by a damaged credit score. Every year spent with poor credit is a year of higher costs, fewer options, and lost financial momentum.',
    'Many Phoenix residents do not fully understand what is on their credit report or why their score is where it is. They know it is affecting them, but they have not taken the step of actually reviewing the reports and building a plan. That is where we come in.',
  ],
  painPoints: [
    'Score too low to qualify for a Phoenix mortgage or stuck with a subprime rate',
    'Collections from hospitals, utilities, or old accounts still reporting and dragging the score',
    'Identity theft items or reporting errors that have never been disputed',
    'No positive payment history being reported — the score has nowhere to go but down',
    'Too many recent hard inquiries from rate shopping or rejected applications',
    'Maxed-out credit cards creating high utilization that suppresses the score',
  ],
  solutionTitle: 'Systematic Credit Repair That Gives Phoenix Residents Real Financial Options.',
  solutionBody: [
    'Our Phoenix credit repair service starts with a complete audit of all three bureau reports. We identify every negative item, evaluate its accuracy and dispute potential, and build a plan that works through the highest-impact items first. Alongside the dispute process, we help establish positive credit accounts that build the score while the disputes are working.',
    'We are honest about what is achievable and what is not. Accurate negative information within the statute of limitations cannot be removed with disputes alone — but even in those cases, there are legitimate strategies for score improvement through positive account building, utilization management, and behavioral coaching.',
  ],
  capabilities: [
    { num: '01', title: 'Three-Bureau Review', desc: 'Full analysis of Experian, Equifax, and TransUnion reports for every negative item and error' },
    { num: '02', title: 'Dispute Strategy', desc: 'Identifying which items are disputable — inaccurate, unverifiable, or past the reporting time limit' },
    { num: '03', title: 'Bureau Disputes', desc: 'Professional dispute letters submitted to all three bureaus with proper documentation' },
    { num: '04', title: 'Creditor Disputes', desc: 'Direct disputes and pay-for-delete negotiations with original creditors and collections agencies' },
    { num: '05', title: 'Positive Account Building', desc: 'Adding positive tradelines through secured credit, credit-builder products, and authorized user accounts' },
    { num: '06', title: 'Utilization Coaching', desc: 'Specific guidance on card balances and limits to optimize the credit utilization factor' },
    { num: '07', title: 'Score Monitoring', desc: 'Monthly tracking of all three bureau scores with clear reporting on what changed and why' },
    { num: '08', title: 'Long-Term Strategy', desc: 'Building the habits and account structure that maintain a strong score permanently' },
  ],
  processTitle: 'Our Phoenix Credit Repair Process.',
  processSteps: [
    { num: '01', title: 'Report Review', desc: 'We pull and audit all three bureau reports, score every negative item, and identify opportunities.' },
    { num: '02', title: 'Action Plan', desc: 'We build a prioritized plan — dispute targets, positive accounts to open, behaviors to change.' },
    { num: '03', title: 'Active Repair', desc: 'Disputes filed, negotiations handled, positive accounts established, and score tracked monthly.' },
    { num: '04', title: 'Score & Sustain', desc: 'Score improvement milestones, final coaching, and a plan to maintain the gains long-term.' },
  ],
  localTitle: 'Phoenix Credit Repair for Residents Ready to Move Forward.',
  localBody: [
    'Phoenix has one of the highest rates of new home purchase activity in the country. For Phoenix residents trying to buy a home, a credit score below 620 is often a disqualifier for conventional mortgages, and scores between 620 and 680 come with rates that can mean tens of thousands of extra dollars over the life of the loan.',
    'We work with Phoenix residents who are recovering from job loss, medical debt, divorce, identity theft, or past financial mistakes. We also work with people who simply never focused on credit and are now in a position where a strong score would open significant doors — home ownership, a business, or financial flexibility.',
    'If you are a Phoenix resident ready to address your credit, start with a free consultation. We will pull your reports and give you an honest assessment of where you stand and what is possible.',
  ],
  ctaTitle: 'Phoenix Opportunities Are Reserved for People With Good Credit. Get Yours.',
  ctaBody: 'Your credit score is not permanent — it is a number that changes with the right strategy. Let\'s build that strategy.',
  relatedServices: [
    { title: 'Credit Repair Scottsdale', to: '/services/credit-repair-scottsdale', desc: 'Credit repair services specifically serving the Scottsdale area.' },
    { title: 'Business Credit Phoenix', to: '/services/business-credit-phoenix', desc: 'Build a separate business credit profile once your personal credit is restored.' },
    { title: 'Business Funding Arizona', to: '/services/business-funding-arizona', desc: 'Better personal credit means better business funding options in Arizona.' },
  ],
  crossLink: {
    to: '/services/credit-repair-scottsdale',
    label: 'credit repair in Scottsdale',
    context: 'We also serve residents across the valley who need',
  },
  formTitle: 'Get a Free Credit Review in Phoenix',
  formSubtitle: 'Tell us about your credit situation and what you are trying to qualify for. We\'ll review your reports and build a plan.',
};

export default function CreditRepairPhoenix() {
  return <ServiceLocationTemplate content={content} />;
}
