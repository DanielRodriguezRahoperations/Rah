import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="RAH Operations | Website Design Scottsdale, Phoenix SEO & Growth Systems"
        description="Website design and SEO services in Scottsdale and Phoenix. High-converting websites built to rank locally, build trust, and generate real leads."
        url={absoluteUrl('/')}
      />

      {/* HERO — LAYERED + PREMIUM */}
      <section className="section">
        <div className="container-clean relative grid gap-20 lg:grid-cols-[1fr_1fr] items-center">

          {/* LEFT */}
          <div>
            <p className="eyebrow-red mb-6">RAH Operations</p>

            <h1 className="mb-8">
              Website Design in Scottsdale
              <br />
              That Actually Produces Revenue
            </h1>

            <p className="mb-10 max-w-xl text-lg">
              We design and build websites for businesses in Scottsdale and Phoenix
              that need more than just something that looks good. You need visibility,
              positioning, and conversion.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Start a Project</Button>
              <Button to="/case-studies" variant="secondary">View Case Studies</Button>
            </div>
          </div>

          {/* RIGHT — LAYERED PANEL */}
          <div className="relative">

            {/* BACK PANEL (DEPTH) */}
            <div className="absolute top-6 left-6 right-0 bottom-0 border border-neutral-200 bg-[#f3eee7]" />

            {/* FRONT PANEL */}
            <div className="relative surface-white p-10 red-corner">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-6">
                Why Most Websites Fail
              </p>

              <div className="space-y-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">No SEO strategy</span>
                  <span className="font-semibold">Invisible online</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Weak positioning</span>
                  <span className="font-semibold">No trust</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Template design</span>
                  <span className="font-semibold">No differentiation</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">No conversion path</span>
                  <span className="font-semibold">No leads</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATEMENT — HIGH-END SECTION */}
      <section className="section-dark">
        <div className="container-narrow">
          <h2>
            Most Agencies Build Websites.
            <br />
            We Build Business Assets.
          </h2>

          <div className="luxury-rule mt-8 mb-8" />

          <p>
            A website should rank locally, build trust instantly, and convert traffic into
            real opportunities. If it doesn’t do those things, it’s not an asset.
          </p>
        </div>
      </section>

      {/* CASE STUDIES — OFFSET */}
      <section className="section">
        <div className="container-clean">

          <div className="mb-20 max-w-xl">
            <p className="eyebrow mb-4">Case Studies</p>
            <h2>Work That Actually Moves the Business</h2>
          </div>

          <div className="space-y-24">

            {[
              {
                title: 'Tier 1 Customs',
                desc: 'SEO-focused automotive website built to capture high-intent local traffic and convert leads.',
                link: '/case-studies/tier-1-customs'
              },
              {
                title: 'The Ever After Edit',
                desc: 'Luxury brand positioning with editorial design and stronger inquiry flow.',
                link: '/case-studies/ever-after-edit'
              }
            ].map((item, i) => (
              <div key={i} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">

                <div>
                  <h3 className="text-3xl mb-4">{item.title}</h3>
                  <p className="max-w-lg">{item.desc}</p>
                </div>

                <div className="lg:text-right">
                  <Button to={item.link} variant="outline">
                    View Case Study
                  </Button>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* SERVICES — NOT CARDS ANYMORE */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">

          <div className="mb-16 max-w-xl">
            <p className="eyebrow mb-4">Services</p>
            <h2>What We Build</h2>
          </div>

          <div className="space-y-8">
            {[
              'Website Design & SEO',
              'Digital Marketing',
              'Reputation Management',
              'Business Credit & Funding'
            ].map((service, i) => (
              <div key={i} className="flex justify-between items-center border-b border-neutral-200 pb-5 hover:pl-2 transition-all">
                <h3 className="text-lg">{service}</h3>
                <span className="text-sm text-neutral-400">→</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            If Your Website Isn’t Producing Leads, It’s a Liability
          </h2>

          <p className="mx-auto mb-10 max-w-xl">
            We build websites for Scottsdale and Phoenix businesses that need real results.
          </p>

          <Button to="/contact">Start a Project</Button>
        </div>
      </section>

      {/* FORM */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Project"
            subtitle="Tell us what you're building. We'll show you how to turn it into a growth system."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
