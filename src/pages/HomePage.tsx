import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  const proofStats = [
    ['Premium', 'Design that makes the business feel established before the first call.'],
    ['Local SEO', 'Page structure and content built around how customers actually search.'],
    ['Conversion', 'Clearer offers, stronger trust signals, and cleaner inquiry paths.']
  ];

  const auditPoints = [
    ['First Impression', 'Does the site immediately make the business look credible, premium, and worth contacting?'],
    ['Offer Clarity', 'Can visitors understand what you do, who you help, and why you are different in seconds?'],
    ['Local SEO Structure', 'Are the pages built around real service keywords, location intent, and internal links?'],
    ['Conversion Flow', 'Does every section move the visitor closer to a call, form submission, or next step?'],
    ['Mobile Experience', 'Does the site feel sharp on a phone, or does it look like the desktop was simply squeezed down?'],
    ['Trust Signals', 'Is there enough proof, positioning, and authority to make the visitor choose you over competitors?']
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Market Positioning',
      copy: 'We clarify what makes the business worth choosing, who it serves, and what must be communicated immediately.'
    },
    {
      number: '02',
      title: 'Conversion Architecture',
      copy: 'We structure the page around trust, objections, service clarity, proof, and lead flow before design ever starts.'
    },
    {
      number: '03',
      title: 'Premium Visual System',
      copy: 'We build a sharper visual direction with stronger typography, spacing, contrast, and brand presence.'
    },
    {
      number: '04',
      title: 'SEO-Ready Development',
      copy: 'We develop responsive, fast, search-ready pages with clean structure, metadata, internal links, and mobile polish.'
    },
    {
      number: '05',
      title: 'Launch + Growth',
      copy: 'We refine visibility, content, reputation, and conversion opportunities after launch so the site keeps working.'
    }
  ];

  const caseStudies = [
    {
      title: 'Tier 1 Customs',
      category: 'Automotive / Local SEO / Web Design',
      copy: 'A stronger digital presence for a premium vehicle wrap and paint protection film brand built around service clarity, local trust, and high-intent visitors.',
      link: '/case-studies/tier-1-customs',
      image: '/t1.png',
      alt: 'Tier 1 Customs website case study preview',
      result: 'Sharper service positioning',
      detail: 'Built for local search and premium automotive trust.'
    },
    {
      title: 'The Ever After Edit',
      category: 'Luxury Wedding Brand / Custom Website',
      copy: 'A refined brand experience designed for high-end wedding clients, stronger inquiry quality, and a more polished first impression.',
      link: '/case-studies/ever-after-edit',
      image: '/ee.png',
      alt: 'The Ever After Edit website case study preview',
      result: 'Luxury inquiry experience',
      detail: 'Built for emotional impact, clarity, and elevated perception.'
    }
  ];

  const services = [
    {
      title: 'Website Design & Development',
      copy: 'Premium websites built to look custom, communicate clearly, and convert visitors into real inquiries.',
      link: '/website-design-and-seo'
    },
    {
      title: 'Local SEO Optimization',
      copy: 'Page structure, content strategy, and local search foundations built around how customers actually search.',
      link: '/website-design-and-seo'
    },
    {
      title: 'Digital Marketing',
      copy: 'Campaign and content direction that gives the website more reach, more authority, and more lead opportunities.',
      link: '/digital-marketing'
    },
    {
      title: 'Reputation Management',
      copy: 'Trust-building systems that make your business look stronger before the customer ever contacts you.',
      link: '/reputation-management'
    }
  ];

  const industries = [
    'Home Services',
    'Automotive Brands',
    'Medical Aesthetics',
    'Wedding & Event Brands',
    'Professional Services',
    'Finance & Credit',
    'Local Service Businesses',
    'New Business Launches'
  ];

  return (
    <>
      <SEOHead
        title="Website Design Scottsdale | High-Converting Websites That Generate Leads"
        description="Website design, website development, and SEO in Scottsdale and Phoenix. RAH Operations builds premium websites designed to rank locally, convert visitors, and generate leads."
        url={absoluteUrl('/')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(122,28,28,0.34),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.08),transparent_22%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <div className="container-clean relative grid gap-10 py-12 sm:py-16 lg:min-h-[860px] lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12 lg:py-24">
          <div className="relative z-10 max-w-[760px]">
            <div className="mb-6 inline-flex border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-sm sm:px-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d14b4b] sm:text-[10px] sm:tracking-[0.28em]">
                Scottsdale Website Design / Phoenix SEO
              </p>
            </div>

            <h1 className="mb-6 max-w-4xl text-[3.15rem] leading-[0.92] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Your Website Should Make You Look Expensive Before You Say a Word.
            </h1>

            <p className="mb-8 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 lg:mb-10">
              RAH Operations builds premium websites for businesses that are tired of looking average online. Strategy, design, local SEO, and conversion structure built into one sharper digital presence.
            </p>

            <div className="mb-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4 lg:mb-12">
              <Button to="/contact" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
              <Button to="/case-studies" variant="dark" size="lg" className="w-full sm:w-auto">
                View Work
              </Button>
            </div>

            <div className="grid gap-3 border-l border-white/10 pl-4 sm:grid-cols-3 sm:gap-4 sm:pl-5">
              {proofStats.map((stat) => (
                <div key={stat[0]} className="border-b border-white/10 pb-3 last:border-b-0 sm:border-b-0 sm:pb-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white sm:mb-2 sm:text-sm">
                    {stat[0]}
                  </p>
                  <p className="text-sm leading-6 text-neutral-400">
                    {stat[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 hidden h-48 w-48 border border-[#7a1c1c]/50 lg:block" />
            <div className="absolute -bottom-10 right-2 hidden h-60 w-60 bg-[#7a1c1c]/20 blur-3xl lg:block" />

            <div className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-sm sm:p-3 lg:rotate-[1deg] lg:shadow-[0_40px_120px_rgba(0,0,0,0.48)]">
              <div className="overflow-hidden border border-white/10 bg-[#111111]">
                <img
                  src="/newhero.png"
                  alt="RAH Operations premium website design and SEO workspace"
                  className="h-[300px] w-full object-cover sm:h-[440px] lg:h-[640px]"
                  style={{ objectPosition: '65% center' }}
                />
              </div>

              <div className="border-t border-white/10 bg-[#111111]/92 p-4 backdrop-blur-md sm:absolute sm:bottom-8 sm:left-8 sm:right-8 sm:border">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-[10px] sm:tracking-[0.24em]">
                    Website Performance System
                  </p>
                  <span className="h-2 w-2 rounded-full bg-[#d14b4b]" />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {['Trust', 'SEO', 'Leads'].map((item) => (
                    <div key={item} className="border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-sm font-semibold text-white">{item}</p>
                      <div className="mt-3 h-1.5 w-full bg-white/10">
                        <div className="h-full w-3/4 bg-[#7a1c1c]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-10 hidden border border-white/10 bg-[#151515] px-5 py-4 shadow-[0_22px_60px_rgba(0,0,0,0.34)] lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d14b4b]">
                Built to convert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
            <div>
              <p className="eyebrow-red mb-4">The Problem</p>
              <h2 className="max-w-3xl text-[2.45rem] sm:text-5xl lg:text-6xl">
                Most Business Websites Look Fine. That’s the Problem.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:ml-auto">
              Fine does not create urgency. Fine does not build authority. Fine does not make a customer trust you more than the competitor they just opened in another tab.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-8">
            <div className="red-corner overflow-hidden bg-white p-2 shadow-[0_22px_70px_rgba(17,17,17,0.08)] sm:p-3 lg:shadow-[0_30px_90px_rgba(17,17,17,0.08)]">
              <img
                src="/theproblem.png"
                alt="Common website problems that stop businesses from generating leads"
                className="h-full min-h-[240px] w-full object-cover sm:min-h-[320px]"
              />
            </div>

            <div className="grid gap-4 sm:gap-5">
              {[
                ['Weak first impression', 'The site does not make the business feel premium, established, or worth contacting.'],
                ['Unclear offer', 'Visitors cannot quickly understand what you do, who you serve, or why you are better.'],
                ['No conversion logic', 'The page has content, but no intentional path from interest to action.'],
                ['Thin SEO structure', 'The site looks designed, but it is not built around search intent or local visibility.']
              ].map((item) => (
                <div key={item[0]} className="surface-white p-5 sm:p-7">
                  <h3 className="mb-2 text-2xl sm:mb-3">{item[0]}</h3>
                  <p className="text-sm leading-6 sm:text-base sm:leading-7">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE AFTER */}
      <section className="section-tight bg-white py-16 lg:py-24">
        <div className="container-clean">
          <div className="mb-10 max-w-4xl lg:mb-14">
            <p className="eyebrow-red mb-4">The Transformation</p>
            <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
              The Goal Is Not Just a Better Looking Website. It Is a Better Business Impression.
            </h2>
          </div>

          <div className="grid overflow-hidden border border-neutral-200 bg-[#fbfaf7] shadow-[0_28px_90px_rgba(17,17,17,0.07)] lg:grid-cols-2">
            <div className="border-b border-neutral-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Before RAH
              </p>

              <div className="space-y-4">
                {[
                  'Generic layout that looks like every other local business site.',
                  'Weak service explanation and unclear next step.',
                  'No strong reason to trust the company quickly.',
                  'Design that looks acceptable, but not memorable.'
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                    <p className="text-sm leading-6 sm:text-base sm:leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d14b4b]">
                After RAH
              </p>

              <div className="space-y-4">
                {[
                  'Premium visual direction that makes the business feel more valuable.',
                  'Clear service hierarchy built around customer decision-making.',
                  'SEO-ready sections that support local visibility and authority.',
                  'Sharper conversion flow from first impression to inquiry.'
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d14b4b]" />
                    <p className="text-sm leading-6 text-neutral-300 sm:text-base sm:leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section-tight bg-[#111111] text-white">
        <div className="container-clean">
          <div className="grid gap-6 border-y border-white/10 py-10 sm:gap-10 sm:py-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <p className="eyebrow-red">What RAH Actually Builds</p>
            <h2 className="text-[2.25rem] text-white sm:text-5xl lg:text-6xl">
              Not a homepage. Not a brochure. A digital sales asset that makes the business easier to trust, easier to understand, and easier to choose.
            </h2>
          </div>
        </div>
      </section>

      {/* AUDIT */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="mb-10 grid gap-7 lg:mb-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-12">
            <div>
              <p className="eyebrow-red mb-4">Website Audit Lens</p>
              <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
                This Is What We Fix Before We Make Anything Pretty.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:ml-auto">
              A redesign without strategy is just decoration. We look at the problems that actually affect trust, visibility, and conversion.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {auditPoints.map((point, index) => (
              <article
                key={point[0]}
                className="group relative overflow-hidden border border-neutral-200 bg-white p-5 shadow-[0_18px_55px_rgba(17,17,17,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#7a1c1c]/40 hover:shadow-[0_28px_80px_rgba(17,17,17,0.08)] sm:p-7"
              >
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a1c1c]">
                    0{index + 1}
                  </p>
                  <span className="h-px w-12 bg-neutral-200 group-hover:bg-[#7a1c1c]/50" />
                </div>

                <h3 className="mb-3 text-2xl">{point[0]}</h3>
                <p className="text-sm leading-6 sm:text-base sm:leading-7">{point[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-dark grain overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="container-clean relative">
          <div className="mb-10 grid gap-7 lg:mb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-10">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
                The Build System
              </p>
              <h2 className="text-[2.45rem] text-white sm:text-5xl lg:text-6xl">
                Strategy First. Then Design. Then Development That Has a Job.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 lg:ml-auto">
              The reason most agency sites look generic is because they start with layout. We start with the business case, the offer, the customer psychology, and the conversion path.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 lg:block" />

            <div className="grid gap-4 sm:gap-6">
              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={`relative grid gap-4 border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm sm:gap-6 sm:p-7 lg:grid-cols-[0.28fr_0.72fr] lg:p-9 ${
                    index % 2 === 1 ? 'lg:ml-28' : 'lg:mr-28'
                  }`}
                >
                  <div>
                    <p className="editorial-number text-5xl sm:text-7xl">{step.number}</p>
                  </div>

                  <div>
                    <h3 className="mb-3 text-2xl text-white sm:mb-4 sm:text-3xl">{step.title}</h3>
                    <p className="max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base sm:leading-7">
                      {step.copy}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="mb-10 grid gap-7 lg:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-10">
            <div>
              <p className="eyebrow-red mb-4">Featured Work</p>
              <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
                Websites That Make the Brand Feel More Valuable.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:ml-auto">
              These are not random designs sitting inside pretty mockups. Each project is built around perception, clarity, trust, and the next action the visitor should take.
            </p>
          </div>

          <div className="grid gap-7 lg:gap-10">
            {caseStudies.map((study, index) => (
              <article
                key={study.title}
                className={`grid overflow-hidden border border-neutral-200 bg-white shadow-[0_22px_70px_rgba(17,17,17,0.07)] lg:grid-cols-2 lg:shadow-[0_28px_90px_rgba(17,17,17,0.075)] ${
                  index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="bg-[#101010] p-3 sm:p-5 lg:p-7">
                  <div className="overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-[0_24px_70px_rgba(0,0,0,0.32)] lg:shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                    <img
                      src={study.image}
                      alt={study.alt}
                      className="aspect-[16/11] w-full object-cover transition duration-500 hover:scale-[1.025] sm:aspect-[16/10]"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                  <div>
                    <p className="eyebrow-red mb-4">{study.category}</p>
                    <h3 className="mb-4 text-3xl sm:text-4xl">{study.title}</h3>
                    <p className="mb-6 text-sm leading-6 sm:mb-8 sm:text-lg sm:leading-8">{study.copy}</p>

                    <div className="mb-7 border-l-2 border-[#7a1c1c] pl-4 sm:mb-8 sm:pl-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950 sm:text-sm sm:tracking-[0.2em]">
                        {study.result}
                      </p>
                      <p className="text-sm leading-6 sm:text-base sm:leading-7">{study.detail}</p>
                    </div>
                  </div>

                  <Button to={study.link} variant="outline" className="w-full sm:w-auto">
                    View Case Study
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-white py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="mb-10 max-w-4xl lg:mb-16">
            <p className="eyebrow-red mb-4">What We Build</p>
            <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
              A Website Is Only One Piece. The Real Product Is Business Growth Infrastructure.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`group relative overflow-hidden border border-neutral-200 bg-[#fbfaf7] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#7a1c1c]/50 hover:shadow-[0_28px_80px_rgba(17,17,17,0.08)] sm:p-7 ${
                  index === 0 ? 'sm:col-span-2 lg:row-span-2 lg:p-10' : ''
                }`}
              >
                <div className="absolute right-5 top-5 text-5xl font-semibold text-[#7a1c1c]/10 sm:right-6 sm:top-6 sm:text-6xl">
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  <h3 className={`${index === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl'} mb-4 sm:mb-5`}>
                    {service.title}
                  </h3>
                  <p className="mb-6 max-w-xl text-sm leading-6 sm:mb-8 sm:text-base sm:leading-7">
                    {service.copy}
                  </p>

                  <Button to={service.link} variant="outline" size="sm" className="w-full sm:w-auto">
                    Explore Service
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-tight bg-[#fbfaf7] py-16 lg:py-24">
        <div className="container-clean">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow-red mb-4">Who This Is For</p>
              <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
                Built for Businesses That Need to Look More Credible Fast.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="border border-neutral-200 bg-white px-5 py-4 shadow-[0_14px_40px_rgba(17,17,17,0.04)]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-900">
                    {industry}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.28),transparent_30%),linear-gradient(135deg,#111111_0%,#171717_55%,#0b0b0b_100%)]" />

        <div className="container-clean relative py-16 sm:py-20 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b] sm:mb-6">
              Start Here
            </p>

            <h2 className="mx-auto mb-6 max-w-4xl text-[2.45rem] text-white sm:mb-8 sm:text-5xl lg:text-6xl">
              Send Us Your Current Website. We’ll Tell You What Is Holding It Back.
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-neutral-300 sm:mb-10 sm:text-lg sm:leading-8">
              If your website looks generic, outdated, or unclear, it is costing you trust before the customer ever reaches out. The fix is not more decoration. The fix is better strategy, stronger design, and cleaner conversion flow.
            </p>

            <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
              <Button to="/contact" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
              <Button to="/case-studies" variant="dark" size="lg" className="w-full sm:w-auto">
                See the Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200 bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow-red mb-4">Project Inquiry</p>
            <h2 className="mb-5 text-[2.45rem] sm:mb-6 sm:text-5xl lg:text-6xl">
              Bring the Business. We’ll Build the Digital Presence Around It.
            </h2>
            <p className="text-base leading-7 sm:text-lg sm:leading-8">
              Tell us what you do, where you are trying to grow, and what your current website is failing to communicate.
            </p>
          </div>

          <ContactForm
            title="Start Your Project"
            subtitle="Send the details. We’ll review your business, your current digital presence, and the best path to make the website sharper, clearer, and more conversion-focused."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
