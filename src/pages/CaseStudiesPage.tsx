import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      title: 'Tier 1 Customs',
      industry: 'Automotive Customization',
      description:
        'A premium automotive website built around service clarity, local SEO visibility, and stronger trust for high-intent vehicle wrap and paint protection film customers.',
      link: '/case-studies/tier-1-customs',
      image: '/t1.png',
      outcome: 'Sharper local service positioning',
      proof: ['Premium service hierarchy', 'Local SEO structure', 'High-intent lead flow']
    },
    {
      title: 'The Ever After Edit',
      industry: 'Luxury Wedding Brand',
      description:
        'An editorial-style website designed to make a custom wedding signage brand feel more refined, premium, and inquiry-ready.',
      link: '/case-studies/ever-after-edit',
      image: '/ee.png',
      outcome: 'Luxury brand perception',
      proof: ['Elevated visual direction', 'Cleaner inquiry path', 'High-end brand trust']
    },
    {
      title: 'Empire Builds AZ',
      industry: 'Construction / Contractor Website',
      description:
        'A professional contractor website built to make construction services feel more credible, organized, and easier to request.',
      link: '/case-studies/empire-builds-az',
      image: '/emp.png',
      outcome: 'Stronger contractor credibility',
      proof: ['Clear service framing', 'Professional presentation', 'Lead-focused CTA path']
    }
  ];

  const thinkingPoints = [
    {
      title: 'Positioning',
      copy: 'The website has to make the business instantly easier to understand and easier to trust.'
    },
    {
      title: 'Conversion Flow',
      copy: 'Every section should move the visitor closer to a call, form submission, or decision.'
    },
    {
      title: 'Search Structure',
      copy: 'The pages need to support service relevance, location intent, and long-term visibility.'
    },
    {
      title: 'Visual Authority',
      copy: 'The brand needs to look credible enough for the price, market, and customer expectation.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Website Case Studies Scottsdale & Phoenix | RAH Operations"
        description="Explore website design and SEO case studies showing how RAH Operations builds premium, high-conversion websites for businesses in Scottsdale, Phoenix, Arizona, and beyond."
        url={absoluteUrl('/case-studies')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(122,28,28,0.32),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <div className="container-clean relative py-16 sm:py-20 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
                Case Studies / Strategy Behind the Work
              </p>

              <h1 className="mb-7 max-w-4xl text-[3.15rem] leading-[0.92] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Pretty Screens Are Not Enough. The Thinking Has to Be Stronger.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
                These case studies show how RAH Operations turns business goals into premium websites built around trust, clarity, SEO structure, and conversion.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm sm:p-7 lg:ml-auto lg:max-w-xl">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-neutral-400">
                Case Study Standard
              </p>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ['01', 'What was weak'],
                  ['02', 'What was rebuilt'],
                  ['03', 'Why it matters']
                ].map((item) => (
                  <div key={item[0]} className="border-t border-white/10 pt-4">
                    <p className="mb-1 text-sm font-semibold text-[#d14b4b]">{item[0]}</p>
                    <p className="text-sm leading-6 text-neutral-300">{item[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="mb-10 grid gap-7 lg:mb-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="eyebrow-red mb-4">Featured Case Studies</p>
              <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
                The Work Only Matters If It Makes the Business Easier to Choose.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:ml-auto">
              A case study should prove more than design taste. It should show how the website improves perception, explains the offer, removes doubt, and supports action.
            </p>
          </div>

          <div className="grid gap-8 lg:gap-10">
            {caseStudies.map((study, index) => (
              <article
                key={study.title}
                className={`grid overflow-hidden border border-neutral-200 bg-white shadow-[0_24px_75px_rgba(17,17,17,0.075)] lg:grid-cols-2 lg:shadow-[0_34px_100px_rgba(17,17,17,0.09)] ${
                  index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="bg-[#101010] p-3 sm:p-5 lg:p-7">
                  <div className="overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
                    <img
                      src={study.image}
                      alt={`${study.title} case study preview`}
                      className="aspect-[16/11] w-full object-cover transition duration-500 hover:scale-[1.025] sm:aspect-[16/10]"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                  <div>
                    <p className="eyebrow-red mb-4">{study.industry}</p>

                    <h3 className="mb-4 text-3xl sm:text-4xl">
                      {study.title}
                    </h3>

                    <p className="mb-6 text-sm leading-6 sm:text-lg sm:leading-8">
                      {study.description}
                    </p>

                    <div className="mb-6 border-l-2 border-[#7a1c1c] pl-4 sm:pl-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950">
                        Primary Outcome
                      </p>
                      <p className="text-sm leading-6 sm:text-base sm:leading-7">
                        {study.outcome}
                      </p>
                    </div>

                    <div className="mb-7 grid gap-3 sm:grid-cols-3">
                      {study.proof.map((proofItem) => (
                        <div key={proofItem} className="border border-neutral-200 bg-[#fbfaf7] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800">
                            {proofItem}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button to={study.link} className="w-full sm:w-auto">
                    View Full Case Study
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE EXPLANATION */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.28),transparent_30%),linear-gradient(135deg,#111111_0%,#171717_55%,#0b0b0b_100%)]" />

        <div className="container-clean relative py-16 sm:py-20 lg:py-32">
          <div className="mb-10 grid gap-7 lg:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
                Why This Matters
              </p>

              <h2 className="text-[2.45rem] text-white sm:text-5xl lg:text-6xl">
                A Portfolio Shows Work. A Case Study Shows Thinking.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 lg:ml-auto">
              Anyone can show screenshots. The stronger question is whether the site was built around a business problem, a customer decision, and a measurable path to action.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {thinkingPoints.map((point, index) => (
              <article
                key={point.title}
                className={`border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm sm:p-7 ${
                  index % 2 === 1 ? 'lg:mt-12' : ''
                }`}
              >
                <p className="mb-8 text-5xl font-semibold leading-none text-[#7a1c1c]/70">
                  0{index + 1}
                </p>

                <h3 className="mb-4 text-2xl text-white">{point.title}</h3>

                <p className="text-sm leading-6 text-neutral-300">
                  {point.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="section bg-white py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-16">
            <div>
              <p className="eyebrow-red mb-4">The RAH Difference</p>

              <h2 className="mb-6 text-[2.45rem] sm:text-5xl lg:text-6xl">
                The Page Has to Do More Than Look Good.
              </h2>

              <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                The work needs to answer the questions visitors are already asking: Can I trust this business? Do they understand my problem? Are they worth contacting? Is this the better choice?
              </p>
            </div>

            <div className="grid gap-4">
              {[
                ['Trust', 'The first impression has to make the business feel legitimate and established.'],
                ['Clarity', 'The service offer must be easy to understand without forcing the visitor to think too hard.'],
                ['Proof', 'The site needs enough credibility to make the visitor feel safe taking the next step.'],
                ['Action', 'The page needs a clear path from attention to inquiry.']
              ].map((item, index) => (
                <div
                  key={item[0]}
                  className="flex gap-4 border border-neutral-200 bg-[#fbfaf7] p-5 transition-all duration-300 hover:border-[#7a1c1c]/40 hover:bg-white hover:shadow-[0_22px_70px_rgba(17,17,17,0.06)]"
                >
                  <span className="shrink-0 text-sm font-semibold text-[#7a1c1c]">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="mb-2 text-2xl">{item[0]}</h3>
                    <p className="text-sm leading-6 sm:text-base sm:leading-7">
                      {item[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.28),transparent_30%),linear-gradient(135deg,#111111_0%,#171717_55%,#0b0b0b_100%)]" />

        <div className="container-clean relative py-16 text-center sm:py-20 lg:py-32">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
            Start Here
          </p>

          <h2 className="mx-auto mb-6 max-w-4xl text-[2.45rem] text-white sm:text-5xl lg:text-6xl">
            Your Website Should Have a Stronger Case for Why Customers Should Choose You.
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
            If your current website looks generic, unclear, or underbuilt, it is not just a design issue. It is a trust issue.
          </p>

          <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
            <Button to="/contact" size="lg" className="w-full sm:w-auto">
              Start a Project
            </Button>

            <Button to="/portfolio" variant="dark" size="lg" className="w-full sm:w-auto">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesPage;
