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
      challenge:
        'A high-end automotive brand with strong services but a digital presence that did not reflect the level of work or build immediate trust.',
      rebuilt:
        'We rebuilt the site around premium positioning, clear service hierarchy, and local SEO intent to support high-value leads.',
      outcome: 'Sharper service positioning and stronger local credibility',
      proof: ['Premium service hierarchy', 'Local SEO structure', 'High-intent lead flow']
    },
    {
      title: 'The Ever After Edit',
      industry: 'Luxury Wedding Brand',
      description:
        'An editorial-style website designed to make a custom wedding signage brand feel more refined, premium, and inquiry-ready.',
      link: '/case-studies/ever-after-edit',
      image: '/ee.png',
      challenge:
        'The brand needed to feel elevated, emotional, and high-end without falling into generic wedding design patterns.',
      rebuilt:
        'We created an editorial-style experience with refined typography, stronger emotional flow, and a cleaner inquiry path.',
      outcome: 'Higher-end brand perception and improved inquiry quality',
      proof: ['Elevated visual direction', 'Cleaner inquiry path', 'Luxury positioning']
    },
    {
      title: 'Empire Builds AZ',
      industry: 'Construction / Contractor Website',
      description:
        'A professional contractor website built to make construction services feel more credible, organized, and easier to request.',
      link: '/case-studies/empire-builds-az',
      image: '/emp.png',
      challenge:
        'A contractor website that did not fully communicate professionalism, trust, or service clarity.',
      rebuilt:
        'We rebuilt the site around contractor credibility, clearer service breakdown, and a stronger first impression.',
      outcome: 'Stronger contractor trust and clearer lead flow',
      proof: ['Clear service framing', 'Professional presentation', 'Lead-focused CTA path']
    }
  ];

  return (
    <>
      <SEOHead
        title="Website Case Studies Scottsdale & Phoenix | RAH Operations"
        description="Explore high-end website design case studies from RAH Operations showing how strategy, SEO, and design come together to drive real business results."
        url={absoluteUrl('/case-studies')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.3),transparent_30%)]" />

        <div className="container-clean relative py-16 sm:py-20 lg:py-32">
          <div className="max-w-4xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Case Studies
            </p>

            <h1 className="mb-6 text-[3.2rem] leading-[0.92] sm:text-6xl lg:text-7xl">
              This Is Where Strategy Shows.
            </h1>

            <p className="text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
              These are not just designs. Each project shows how we take a business problem and turn it into a stronger digital presence built around trust, clarity, and conversion.
            </p>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean grid gap-10">
          {caseStudies.map((study, index) => (
            <article
              key={study.title}
              className={`grid border border-neutral-200 bg-white shadow-[0_25px_80px_rgba(17,17,17,0.07)] lg:grid-cols-2 ${
                index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="bg-[#101010] p-4 sm:p-6">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <p className="eyebrow-red mb-3">{study.industry}</p>

                  <h2 className="mb-4 text-3xl sm:text-4xl">{study.title}</h2>

                  <p className="mb-6 text-sm sm:text-base leading-7">
                    {study.description}
                  </p>

                  {/* CHALLENGE */}
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                      Challenge
                    </p>
                    <p className="text-sm leading-6">{study.challenge}</p>
                  </div>

                  {/* REBUILT */}
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                      What We Rebuilt
                    </p>
                    <p className="text-sm leading-6">{study.rebuilt}</p>
                  </div>

                  {/* OUTCOME */}
                  <div className="mb-6 border-l-2 border-[#7a1c1c] pl-4">
                    <p className="text-xs uppercase tracking-[0.2em] mb-2">
                      Outcome
                    </p>
                    <p className="text-sm leading-6">{study.outcome}</p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3 mb-6">
                    {study.proof.map((p) => (
                      <div key={p} className="border p-3 text-xs">
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <Button to={study.link}>
                  View Full Case Study
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] text-white py-20 text-center">
        <div className="container-clean max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl mb-6">
            Your Website Should Do This Too.
          </h2>

          <p className="mb-8 text-neutral-300">
            If your current website is unclear, outdated, or generic, it’s costing you trust and leads.
          </p>

          <Button to="/contact" size="lg">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesPage;
