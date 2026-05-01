import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      title: 'Tier 1 Customs',
      industry: 'Automotive Customization',
      description:
        'A premium automotive customization website built for service clarity, local SEO, and high-intent lead generation.',
      link: '/case-studies/tier-1-customs'
    },
    {
      title: 'The Ever After Edit',
      industry: 'Luxury Wedding Signage',
      description:
        'A refined wedding signage website built around editorial design, premium positioning, and a stronger inquiry experience.',
      link: '/case-studies/ever-after-edit'
    },
    {
      title: 'The Scottsdale Injector',
      industry: 'Medical Aesthetics',
      description:
        'A premium aesthetics website built to strengthen trust, service clarity, and local brand authority.',
      link: '/case-studies/scottsdale-injector'
    }
  ];

  return (
    <>
      <SEOHead
        title="Case Studies | RAH Operations"
        description="Explore selected case studies from RAH Operations, including website design, SEO, brand positioning, and conversion-focused digital systems."
        url={absoluteUrl('/case-studies')}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Case Studies</p>

          <h1 className="mb-6">
            Proof That Strategy, Design, and Structure Matter
          </h1>

          <p className="text-lg">
            These projects show how RAH Operations helps businesses look more credible,
            communicate more clearly, and build digital systems that support growth.
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="divide-y border-y border-neutral-200">
            {caseStudies.map((study, index) => (
              <article
                key={index}
                className="grid gap-8 py-10 lg:grid-cols-[0.8fr_1.4fr_auto] lg:items-start"
              >
                <div>
                  <p className="eyebrow mb-3">{study.industry}</p>
                  <h2 className="text-2xl">{study.title}</h2>
                </div>

                <div>
                  <p>{study.description}</p>
                </div>

                <div className="lg:text-right">
                  <Link
                    to={study.link}
                    className="inline-flex border border-neutral-950 px-5 py-3 text-sm font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-950 hover:text-white"
                  >
                    View Case Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Why Case Studies Matter</p>

            <h2 className="mb-6">
              Good Work Should Explain the Thinking Behind It
            </h2>

            <p className="mb-6">
              A portfolio shows what was built. A case study shows why it was built,
              how it was structured, and what business problem it solved.
            </p>

            <p>
              That is the difference between showing design work and proving strategic value.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What We Build Around</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-6">
                <span>Positioning</span>
                <span className="font-semibold">Clearer market fit</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Website structure</span>
                <span className="font-semibold">Better conversion</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>SEO foundation</span>
                <span className="font-semibold">More visibility</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Brand perception</span>
                <span className="font-semibold">More trust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            Your Website Should Be a Business Asset
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            If your current site is not helping you build trust, generate leads,
            or position your business properly, it is underperforming.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesPage;
