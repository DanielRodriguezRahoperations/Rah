import ServiceLocationTemplate, { ServicePageContent } from '../../components/templates/ServiceLocationTemplate';

const content: ServicePageContent = {
  seoTitle: 'Credit Repair Scottsdale AZ | RAH Operations',
  seoDescription: 'Personal credit repair services in Scottsdale, AZ. We help Scottsdale residents dispute inaccurate items, improve their credit scores, and qualify for better financing.',
  seoKeywords: 'credit repair Scottsdale, credit repair services Scottsdale AZ, fix credit Scottsdale, credit score improvement Scottsdale, credit restoration Scottsdale Arizona',
  path: '/services/credit-repair-scottsdale',
  heroEyebrow: 'RAH Operations — Scottsdale, AZ',
  heroH1: 'Credit Repair in Scottsdale. Fix What Is Holding Your Financial Future Back.',
  heroSubtitle: 'A damaged credit score affects every major financial decision — home buying, auto financing, business funding, and even rental applications. We help Scottsdale residents identify what is on their credit report, dispute what should not be there, and build toward the score they deserve.',
  heroCta: 'Review My Credit',
  stats: [
    { value: '79%', label: 'Credit Reports Have Errors' },
    { value: '1 in 5', label: 'Reports Have Errors Significant Enough to Affect Score' },
    { value: '100+', label: 'Avg. Point Increase With Professional Credit Work' },
    { value: '3-6mo', label: 'Typical Timeline for Meaningful Score Improvement' },
  ],
  problemTitle: 'A Low Credit Score in Scottsdale Costs You More Than Just Loan Approvals.',
  problemBody: [
    'Scottsdale is a market where large financial decisions are common — high home prices, luxury auto purchases, business investments, and high-cost rentals. Every one of these transactions is influenced by your credit score. A score below 680 means higher interest rates on everything. A score below 620 often means outright rejection for mortgages, prime auto loans, and business credit.',
    'Many Scottsdale residents are carrying old collections, medical bills, identity theft items, or reporting errors they do not know are there — items that are dragging down their score and costing them thousands of dollars a year in higher interest rates. Some of these items can be disputed and removed. Others require a strategic rebuilding approach. Either way, the situation is almost always improvable.',
  ],
  painPoints: [
    'Low credit score blocking mortgage qualification or pushing rates to unaffordable levels',
    'Collections from old debts or medical bills still impacting the score years later',
    'Identity theft items that were never disputed and are still on the report',
    'Credit utilization too high because of maxed-out cards lowering the score unnecessarily',
    'No positive credit accounts being reported — nothing building the score up',
    'Hard inquiries from multiple applications dragging the score down',
  ],
  solutionTitle: 'A Systematic Credit Repair Process That Identifies What Can Change and Changes It.',
  solutionBody: [
    'Our credit repair process starts with a full review of all three credit bureau reports — Experian, Equifax, and TransUnion. We identify every item that is negative, assess which are accurate and which are potential disputes, and build a strategy that combines dispute filing with credit building to move the score as efficiently as possible.',
    'We do not make promises about specific score increases — no legitimate credit repair service can guarantee exact numbers. What we do is work methodically through the dispute process, build positive account history, and coach Scottsdale clients on the behaviors that compound into lasting score improvement.',
  ],
  capabilities: [
    { num: '01', title: 'Full Credit Pull', desc: 'Comprehensive review of all three bureau reports — Experian, Equifax, and TransUnion' },
    { num: '02', title: 'Error Identification', desc: 'Finding inaccurate, outdated, or unverifiable items that can be disputed and removed' },
    { num: '03', title: 'Dispute Filing', desc: 'Professional dispute letters sent to all three bureaus and directly to creditors where applicable' },
    { num: '04', title: 'Collections Strategy', desc: 'Guidance on handling collections — pay-for-delete negotiations, statute of limitations, and validation requests' },
    { num: '05', title: 'Credit Building', desc: 'Adding positive accounts — secured cards, credit-builder loans — to improve the score while disputes process' },
    { num: '06', title: 'Score Monitoring', desc: 'Monthly tracking of all three bureau scores and report changes throughout the repair process' },
    { num: '07', title: 'Utilization Management', desc: 'Strategic advice on balances, limits, and usage to optimize the largest factor in the FICO score' },
    { num: '08', title: 'Financial Coaching', desc: 'Education on the behaviors and decisions that build and protect credit long after repair is complete' },
  ],
  processTitle: 'Our Credit Repair Process for Scottsdale Clients.',
  processSteps: [
    { num: '01', title: 'Credit Review', desc: 'We pull and review all three bureau reports and score all negative items for their impact and dispute potential.' },
    { num: '02', title: 'Strategy Build', desc: 'We build a prioritized plan — disputes first, then credit building, then score-boosting behaviors.' },
    { num: '03', title: 'Disputes & Building', desc: 'We file disputes with bureaus and creditors while helping establish positive accounts simultaneously.' },
    { num: '04', title: 'Monitor & Complete', desc: 'Monthly score tracking, follow-up disputes on rejections, and coaching through the full repair timeline.' },
  ],
  localTitle: 'Scottsdale Residents Deserve a Credit Score That Reflects Reality.',
  localBody: [
    'In a market like Scottsdale where real estate, business opportunities, and high-value purchases are common, your credit score directly influences the quality of the financial options available to you. The difference between a 620 and a 720 score in Scottsdale can mean tens of thousands of dollars over the life of a mortgage. It can mean the difference between qualifying for business funding and being rejected.',
    'We work with Scottsdale residents who are dealing with the aftermath of medical debt, old collections, identity theft, divorce-related credit damage, or simply years of credit mismanagement they are now ready to address. There is no judgment — only a clear-eyed look at what is on the report and a systematic approach to improving it.',
    'If you are a Scottsdale resident ready to understand your credit and start improving it, schedule a free credit review.',
  ],
  ctaTitle: 'Your Credit Score in Scottsdale Is Improvable. Let\'s Start.',
  ctaBody: 'Most credit reports have errors. Most scores have room to improve. The question is whether you have a plan to do it.',
  relatedServices: [
    { title: 'Credit Repair Phoenix', to: '/services/credit-repair-phoenix', desc: 'Personal credit repair services for Phoenix metro residents.' },
    { title: 'Business Credit Scottsdale', to: '/services/business-credit-scottsdale', desc: 'Once personal credit is stronger, build a separate business credit profile.' },
    { title: 'Business Funding Arizona', to: '/services/business-funding-arizona', desc: 'Better personal credit opens doors to better business funding options.' },
  ],
  formTitle: 'Schedule a Free Credit Review in Scottsdale',
  formSubtitle: 'Tell us about your credit situation and goals. We\'ll review your report and map a realistic path to improvement.',
};

export default function CreditRepairScottsdale() {
  return <ServiceLocationTemplate content={content} />;
}
