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
        'Rebuilt a local automotive brand into a high-authority website focused on service clarity, SEO visibility, and lead generation.',
      link: '/case-studies/tier-1-customs',
      featured: true
    },
    {
      title: 'The Ever After Edit',
      industry: 'Luxury Wedding Brand',
      description:
        'Transformed a basic offering into a premium, editorial-style brand experience designed for high-end clientele.',
      link: '/case-studies/ever-after-edit',
      featured: true
    },
    {
      title: 'The Scottsdale Injector',
      industry: 'Medical Aesthetics',
      description:
        'Built a high-trust aesthetic website designed to increase credibility, service clarity, and client inquiries.',
      link: '/case-studies/scottsdale-injector',
      featured: true
    }
  ];

  return (
    <>
      <SEOHead
        title="Website Case Studies Scottsdale & Phoenix | RAH Operations"
        description="Explore real website design and SEO case studies showing how RAH Operations builds high-conversion systems for businesses in Scottsdale, Phoenix, and Arizona."
        url={absoluteUrl('/case-studies')}
      />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_top_left,red,transparent_60%)]" />

        <div className="container-clean max-w-4xl text-center">
          <p className="eyebrow eyebrow-red mb-6">
            Case Studies — Scottsdale & Phoenix
          </p>

          <h1 className="text-white mb-6">
            This Is What Happens When Strategy Meets Execution
          </h1>

          <p className="text-lg text-neutral-300">
            These case studies break down how we take underperforming websites
            and turn them into high-conversion business assets.
          </p>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="section">
        <div className="container-clean">
          <div className="grid lg:grid-cols-3 gap-10">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="surface-dark rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition"
              >
                {/* MOCKUP */}
                <div className="mb-6 bg-black rounded-lg border border-white/10 overflow-hidden">
                  <div className="h-6 bg-neutral-900 flex items-center px-3 gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>

                  <div className="h-40 bg-neutral-900" />
                </div>

                <p className="eyebrow mb-2">{study.industry}</p>
                <h3 className="text-white mb-3">{study.title}</h3>

                <p className="text-sm text-neutral-300 mb-6">
                  {study.description}
                </p>

                <Link
                  to={study.link}
                  className="inline-flex bg-red-600 px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                >
                  View Full Case Study
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE EXPLANATION */}
      <section className="section section-tight bg-neutral-50">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Why This Matters</p>

            <h2 className="mb-6">
              A Portfolio Shows Work.
              <br /> A Case Study Shows Thinking.
            </h2>

            <p>
              Anyone can design a website. Very few can structure one
              that actually improves business performance.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Clear Positioning</h3>
              <p>Eliminating confusion so customers instantly understand value.</p>
            </div>

            <div>
              <h3 className="font-semibold">Stronger Conversion</h3>
              <p>Designing the site to guide users toward taking action.</p>
            </div>

            <div>
              <h3 className="font-semibold">Search Visibility</h3>
              <p>Structuring content to rank and generate long-term traffic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="container-clean text-center">
          <h2 className="text-white mb-6">
            Your Website Should Be Doing This Too
          </h2>

          <p className="text-neutral-300 mb-10 max-w-xl mx-auto">
            If your current website isn’t generating leads or building authority,
            it’s costing you opportunities.
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
