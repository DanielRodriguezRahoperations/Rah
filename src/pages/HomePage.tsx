import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="Website Design Scottsdale | High-Converting Websites That Generate Leads"
        description="Website design and SEO in Scottsdale and Phoenix. We build websites that rank, convert, and generate real revenue — not just look good."
        url={absoluteUrl('/')}
      />

      {/* HERO — DIRECT + HIGH CONVERSION */}
      <section className="section">
        <div className="container-clean max-w-5xl">

          <p className="eyebrow-red mb-6">RAH OPERATIONS</p>

          <h1 className="mb-6">
            If Your Website Isn’t Bringing In Leads,
            <br />
            It’s Costing You Money.
          </h1>

          <p className="mb-10 max-w-2xl text-lg">
            We design and build high-converting websites for businesses in Scottsdale and Phoenix.
            Built for SEO, built for trust, built to generate real opportunities.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button to="/contact">Start a Project</Button>
            <Button to="/case-studies" variant="secondary">See Results</Button>
          </div>

        </div>
      </section>

      {/* PAIN SECTION — BLUNT */}
      <section className="section-tight border-t border-neutral-200">
        <div className="container-clean max-w-4xl">

          <h2 className="mb-8">
            Most Business Websites Are Quietly Killing Growth.
          </h2>

          <div className="space-y-6 text-lg">
            <p>They don’t rank.</p>
            <p>They don’t build trust.</p>
            <p>They don’t convert visitors into leads.</p>
            <p className="text-neutral-900 font-semibold">
              And most owners don’t realize how much revenue they’re losing because of it.
            </p>
          </div>

        </div>
      </section>

      {/* POSITIONING */}
      <section className="section-dark">
        <div className="container-narrow">

          <h2 className="mb-6">
            We Don’t Build “Nice Websites.”
          </h2>

          <p className="text-lg">
            We build websites that rank locally, position your business correctly,
            and convert traffic into actual opportunities.
          </p>

        </div>
      </section>

      {/* SERVICES — REVENUE DRIVEN */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">

          <div className="mb-16">
            <p className="eyebrow mb-4">What We Do</p>
            <h2>Built Around Revenue, Not Just Design</h2>
          </div>

          <div className="space-y-10">
            {[
              'Website Design & Development',
              'Local SEO Optimization',
              'Conversion Optimization',
              'Reputation & Trust Systems'
            ].map((service, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b border-neutral-200 pb-5 hover:pl-2 transition-all"
              >
                <h3 className="text-xl">{service}</h3>
                <span className="text-neutral-400">→</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RESULTS / CASE STUDIES */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">

          <div className="mb-16">
            <p className="eyebrow mb-4">Results</p>
            <h2>What This Looks Like in Real Businesses</h2>
          </div>

          <div className="space-y-16">

            {[
              {
                title: 'Tier 1 Customs',
                result: 'Stronger local SEO + more inbound leads',
                link: '/case-studies/tier-1-customs'
              },
              {
                title: 'The Ever After Edit',
                result: 'Higher-end positioning + better inquiry conversion',
                link: '/case-studies/ever-after-edit'
              }
            ].map((item, i) => (
              <div key={i} className="grid gap-6 lg:grid-cols-[1fr_auto] items-center">

                <div>
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.result}</p>
                </div>

                <Button to={item.link} variant="outline">
                  View Case Study
                </Button>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">

          <h2 className="mb-6">
            If You’re Serious About Growth,
            <br />
            Your Website Has to Perform.
          </h2>

          <p className="mx-auto mb-10 max-w-xl">
            We’ll show you exactly what’s broken — and how to fix it.
          </p>

          <Button to="/contact">Start a Project</Button>

        </div>
      </section>

      {/* FORM */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Project"
            subtitle="Tell us about your business. We'll show you what’s holding your site back."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
