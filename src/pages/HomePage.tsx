import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  const proofStats = [
    ['Premium', 'Website design built to increase trust before the first call.'],
    ['Local SEO', 'Structure, content, and page flow built around search intent.'],
    ['Conversion', 'Clear sections, stronger offers, and cleaner paths to inquiry.']
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

  return (
    <>
      <SEOHead
        title="Website Design Scottsdale | High-Converting Websites That Generate Leads"
        description="Website design, website development, and SEO in Scottsdale and Phoenix. RAH Operations builds premium websites designed to rank locally, convert visitors, and generate leads."
        url={absoluteUrl('/')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(122,28,28,0.32),transparent_28%),radial-gradient(circle_at_76%_10%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <div className="container-clean relative grid min-h-[860px] items-center gap-12 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-24">
          <div className="relative z-10 max-w-[760px]">
            <div className="mb-7 inline-flex border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d14b4b]">
                Scottsdale Website Design / Phoenix SEO
              </p>
            </div>

            <h1 className="mb-8 max-w-4xl text-white">
              Your Website Should Make You Look Expensive Before You Say a Word.
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-8 text-neutral-300">
              RAH Operations builds premium websites for businesses that are tired of looking average online. Strategy, design, local SEO, and conversion structure built into one sharper digital presence.
            </p>

            <div className="mb-12 flex flex-wrap gap-4">
              <Button to="/contact" size="lg">
                Start a Project
              </Button>
              <Button to="/case-studies" variant="dark" size="lg">
                View Work
              </Button>
            </div>

            <div className="grid gap-4 border-l border-white/10 pl-5 sm:grid-cols-3">
              {proofStats.map((stat) => (
                <div key={stat[0]}>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-white">
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

            <div className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.48)] backdrop-blur-sm lg:rotate-[1deg]">
              <div className="overflow-hidden border border-white/10 bg-[#111111]">
                <img
                  src="/newhero.png"
                  alt="RAH Operations premium website design and SEO workspace"
                  className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[640px]"
                  style={{ objectPosition: '65% center' }}
                />
              </div>

              <div className="absolute bottom-8 left-8 right-8 hidden border border-white/10 bg-[#111111]/88 p-5 backdrop-blur-md sm:block">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
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
      <section className="section bg-[#fbfaf7]">
        <div className="container-clean">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow-red mb-4">The Problem</p>
              <h2 className="max-w-3xl">
                Most Business Websites Look Fine. That’s the Problem.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-neutral-600 lg:ml-auto">
              Fine does not create urgency. Fine does not build authority. Fine does not make a customer trust you more than the competitor they just opened in another tab.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="red-corner overflow-hidden bg-white p-3 shadow-[0_30px_90px_rgba(17,17,17,0.08)]">
              <img
                src="/theproblem.png"
                alt="Common website problems that stop businesses from generating leads"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>

            <div className="grid gap-5">
              {[
                ['Weak first impression', 'The site does not make the business feel premium, established, or worth contacting.'],
                ['Unclear offer', 'Visitors cannot quickly understand what you do, who you serve, or why you are better.'],
                ['No conversion logic', 'The page has content, but no intentional path from interest to action.'],
                ['Thin SEO structure', 'The site looks designed, but it is not built around search intent or local visibility.']
              ].map((item) => (
                <div key={item[0]} className="surface-white p-7">
                  <h3 className="mb-3 text-2xl">{item[0]}</h3>
                  <p>{item[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section-tight bg-[#111111] text-white">
        <div className="container-clean">
          <div className="grid gap-10 border-y border-white/10 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <p className="eyebrow-red">What RAH Actually Builds</p>
            <h2 className="text-white">
              Not a homepage. Not a brochure. A digital sales asset that makes the business easier to trust, easier to understand, and easier to choose.
            </h2>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-dark grain overflow-hidden py-24">
        <div className="container-clean relative">
          <div className="mb-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
                The Build System
              </p>
              <h2 className="text-white">
                Strategy First. Then Design. Then Development That Has a Job.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-neutral-300 lg:ml-auto">
              The reason most agency sites look generic is because they start with layout. We start with the business case, the offer, the customer psychology, and the conversion path.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 lg:block" />

            <div className="grid gap-6">
              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={`relative grid gap-6 border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm lg:grid-cols-[0.28fr_0.72fr] lg:p-9 ${
                    index % 2 === 1 ? 'lg:ml-28' : 'lg:mr-28'
                  }`}
                >
                  <div>
                    <p className="editorial-number text-7xl">{step.number}</p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-3xl text-white">{step.title}</h3>
                    <p className="max-w-2xl text-neutral-300">{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section bg-[#fbfaf7]">
        <div className="container-clean">
          <div className="mb-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow-red mb-4">Featured Work</p>
              <h2>
                Websites That Make the Brand Feel More Valuable.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-neutral-600 lg:ml-auto">
              These are not random designs sitting inside pretty mockups. Each project is built around perception, clarity, trust, and the next action the visitor should take.
            </p>
          </div>

          <div className="grid gap-10">
            {caseStudies.map((study, index) => (
              <article
                key={study.title}
                className={`grid overflow-hidden border border-neutral-200 bg-white shadow-[0_28px_90px_rgba(17,17,17,0.075)] lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="bg-[#101010] p-4 sm:p-7">
                  <div className="overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                    <img
                      src={study.image}
                      alt={study.alt}
                      className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.025]"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between p-8 lg:p-12">
                  <div>
                    <p className="eyebrow-red mb-4">{study.category}</p>
                    <h3 className="mb-5 text-4xl">{study.title}</h3>
                    <p className="mb-8 text-lg leading-8">{study.copy}</p>

                    <div className="mb-8 border-l-2 border-[#7a1c1c] pl-5">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-950">
                        {study.result}
                      </p>
                      <p>{study.detail}</p>
                    </div>
                  </div>

                  <Button to={study.link} variant="outline">
                    View Case Study
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-white">
        <div className="container-clean">
          <div className="mb-16 max-w-4xl">
            <p className="eyebrow-red mb-4">What We Build</p>
            <h2>
              A Website Is Only One Piece. The Real Product Is Business Growth Infrastructure.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`group relative overflow-hidden border border-neutral-200 bg-[#fbfaf7] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7a1c1c]/50 hover:shadow-[0_28px_80px_rgba(17,17,17,0.08)] ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2 lg:p-10' : ''
                }`}
              >
                <div className="absolute right-6 top-6 text-6xl font-semibold text-[#7a1c1c]/10">
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  <h3 className={`${index === 0 ? 'text-4xl' : 'text-2xl'} mb-5`}>
                    {service.title}
                  </h3>
                  <p className="mb-8 max-w-xl">{service.copy}</p>

                  <Button to={service.link} variant="outline" size="sm">
                    Explore Service
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.28),transparent_30%),linear-gradient(135deg,#111111_0%,#171717_55%,#0b0b0b_100%)]" />

        <div className="container-clean relative py-20 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Start Here
            </p>

            <h2 className="mx-auto mb-8 max-w-4xl text-white">
              If Your Website Looks Average, People Assume Your Business Is Average.
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-neutral-300">
              That is harsh, but it is true. Your website is often the first proof a customer sees. If it looks generic, outdated, or unclear, you are forcing the customer to trust you without evidence.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/contact" size="lg">
                Start a Project
              </Button>
              <Button to="/case-studies" variant="dark" size="lg">
                See the Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200 bg-[#fbfaf7]">
        <div className="container-clean grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow-red mb-4">Project Inquiry</p>
            <h2 className="mb-6">
              Bring the Business. We’ll Build the Digital Presence Around It.
            </h2>
            <p className="text-lg leading-8">
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
