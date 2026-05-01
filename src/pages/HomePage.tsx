import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="RAH Operations | Website Design Scottsdale, Phoenix SEO & Business Growth Systems"
        description="Website design, website development, and local SEO services in Scottsdale and Phoenix. RAH Operations builds high-converting business websites designed to rank, convert, and generate real leads."
        url={absoluteUrl('/')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-5xl">
          <p className="eyebrow mb-6">RAH Operations</p>

          <h1 className="mb-8 text-balance">
            Website Design in Scottsdale Built to Rank, Convert, and Actually Generate Business
          </h1>

          <p className="mb-10 max-w-2xl text-lg">
            Most business websites look fine but don’t generate leads. We design and build
            websites with SEO structure, conversion strategy, and positioning that actually
            drives revenue.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button to="/contact">Start a Project</Button>
            <Button to="/case-studies" variant="outline">View Case Studies</Button>
          </div>
        </div>
      </section>

      {/* STATEMENT SECTION (NEW — THIS ADDS EDGE) */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-5xl">
          <div className="border-l-2 border-red-800 pl-8">
            <h2 className="text-3xl md:text-4xl leading-tight">
              Most Websites Don’t Fail Because of Design.  
              They Fail Because There’s No Strategy Behind Them.
            </h2>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <div className="container-clean grid gap-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-4">The Problem</p>

            <h2 className="mb-6">
              A “Nice Looking” Website Doesn’t Mean It Works
            </h2>

            <p className="mb-6">
              Most businesses invest in website design without thinking about SEO,
              positioning, or conversion. The result is a site that exists but doesn’t
              generate calls, leads, or revenue.
            </p>

            <p>
              If your website isn’t ranking locally in Scottsdale or Phoenix, or
              converting traffic into inquiries, it’s not doing its job.
            </p>
          </div>

          <div className="space-y-6">
            {[
              ['Weak positioning', 'Clear authority'],
              ['No SEO structure', 'Local visibility'],
              ['Low trust', 'Stronger perception'],
              ['Low conversion', 'More inquiries']
            ].map((row, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-neutral-200 pb-4 text-sm"
              >
                <span className="text-neutral-500">{row[0]}</span>
                <span className="font-semibold text-neutral-950">{row[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Case Studies</p>
            <h2 className="mb-4">
              Real Projects Built for Local SEO and Conversion
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                title: 'Tier 1 Customs',
                desc: 'Local SEO-focused automotive website built to rank and generate high-intent leads.',
                link: '/case-studies/tier-1-customs'
              },
              {
                title: 'The Ever After Edit',
                desc: 'Luxury brand website built around positioning, conversion, and premium perception.',
                link: '/case-studies/ever-after-edit'
              }
            ].map((item, i) => (
              <div key={i} className="grid gap-6 md:grid-cols-[1fr_auto] items-center">
                <div>
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <Button to={item.link} variant="outline">
                  View Case Study
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES (RED ACCENT INTRODUCED) */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">What We Build</p>
            <h2 className="mb-4">
              Website Development, SEO, and Growth Systems
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {[
              {
                title: 'Website Design & SEO',
                link: '/website-design-and-seo'
              },
              {
                title: 'Digital Marketing',
                link: '/digital-marketing'
              },
              {
                title: 'Reputation Management',
                link: '/reputation-management'
              },
              {
                title: 'Business Credit & Funding',
                link: '/business-credit-and-funding'
              }
            ].map((service, i) => (
              <div
                key={i}
                className="border-l-2 border-red-800 pl-6 hover:translate-x-1 transition-all duration-300"
              >
                <h3 className="mb-3 text-lg font-semibold">{service.title}</h3>
                <Button to={service.link} variant="outline">
                  Learn More
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
            If Your Website Isn’t Producing Leads, It’s a Liability
          </h2>

          <p className="mx-auto mb-10 max-w-xl">
            We build websites for businesses in Scottsdale and Phoenix that need
            more than just design — they need results.
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
