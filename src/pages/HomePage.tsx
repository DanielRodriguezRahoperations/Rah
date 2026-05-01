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

      {/* HERO — COMPLETELY UPGRADED */}
      <section className="section">
        <div className="container-clean grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          
          {/* LEFT */}
          <div>
            <p className="eyebrow mb-6">RAH Operations</p>

            <h1 className="mb-8 text-balance">
              Website Design in Scottsdale That Actually Brings You Business
            </h1>

            <p className="mb-10 max-w-xl text-lg">
              We design and build websites for businesses in Scottsdale and Phoenix
              that need more than something that “looks good.” You need visibility,
              trust, and conversion.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Start a Project</Button>
              <Button to="/case-studies" variant="outline">View Case Studies</Button>
            </div>
          </div>

          {/* RIGHT — STRATEGY PANEL (THIS IS WHAT YOU WERE MISSING) */}
          <div className="border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">
              What’s Broken on Most Sites
            </p>

            <div className="space-y-5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">No SEO structure</span>
                <span className="font-semibold">No visibility</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Weak messaging</span>
                <span className="font-semibold">No trust</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Generic design</span>
                <span className="font-semibold">No differentiation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">No conversion path</span>
                <span className="font-semibold">No leads</span>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-neutral-600">
                If your website has any of these issues, it’s not helping your business grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DARK SECTION (ADDS PREMIUM CONTRAST) */}
      <section className="section bg-neutral-950 text-white">
        <div className="container-clean max-w-4xl">
          <h2 className="text-3xl md:text-4xl leading-tight">
            Most Businesses Don’t Need a Better Website.
            <br />
            They Need a Smarter One.
          </h2>

          <p className="mt-6 text-neutral-300 max-w-2xl">
            A website should rank locally, build trust instantly, and guide visitors
            toward action. If it doesn’t do those things, it’s not a growth asset.
          </p>
        </div>
      </section>

      {/* CASE STUDIES — LESS TEMPLATE FEEL */}
      <section className="section">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Case Studies</p>
            <h2>Built for Real Businesses, Not Just Design Awards</h2>
          </div>

          <div className="space-y-16">
            {[
              {
                title: 'Tier 1 Customs',
                desc: 'SEO-driven automotive website built to capture high-intent local traffic.',
                link: '/case-studies/tier-1-customs'
              },
              {
                title: 'The Ever After Edit',
                desc: 'Luxury brand positioning through refined design and stronger inquiry flow.',
                link: '/case-studies/ever-after-edit'
              }
            ].map((item, i) => (
              <div key={i} className="grid gap-6 lg:grid-cols-[1fr_auto] items-center">
                <div>
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="max-w-xl">{item.desc}</p>
                </div>

                <Button to={item.link} variant="outline">
                  View Case Study
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — CLEANER, LESS CARDY */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">What We Do</p>
            <h2>Website Design, SEO, and Growth Systems</h2>
          </div>

          <div className="space-y-10">
            {[
              'Website Design & SEO',
              'Digital Marketing',
              'Reputation Management',
              'Business Credit & Funding'
            ].map((service, i) => (
              <div
                key={i}
                className="border-b border-neutral-200 pb-6 flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold">{service}</h3>
                <span className="text-sm text-neutral-500">Learn More</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            If Your Website Isn’t Bringing In Leads, It’s Not Doing Its Job
          </h2>

          <p className="mx-auto mb-10 max-w-xl">
            We help businesses in Scottsdale and Phoenix build websites that rank,
            convert, and support real growth.
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
