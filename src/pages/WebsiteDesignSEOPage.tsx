import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const WebsiteDesignSEOPage = () => {
  return (
    <>
      <SEOHead
        title="Website Design & SEO | RAH Operations"
        description="Custom websites and search strategy built to generate visibility, authority, and revenue."
        url={absoluteUrl('/website-design-and-seo')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Website Design & SEO</p>

          <h1 className="mb-6">
            Built to Rank. Designed to Convert.
          </h1>

          <p className="text-lg mb-8">
            We design and build websites that do more than look good.
            Every project is structured for visibility, authority, and conversion from day one.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button to="/contact">
              Start a Project
            </Button>

            <Button variant="outline" href="tel:+18884724621">
              (888) 472-4621
            </Button>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="mb-6">
              Most Websites Don’t Work. Ours Do.
            </h2>

            <p className="mb-6">
              The majority of business websites fail because they are built without strategy.
              No search visibility. No conversion structure. No real positioning.
            </p>

            <p>
              We approach every project differently — starting with how your business gets found,
              how it’s perceived, and how it turns visitors into customers.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What You Get</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Custom Design</span>
                <span className="font-semibold">No templates</span>
              </div>
              <div className="flex justify-between">
                <span>Search Strategy</span>
                <span className="font-semibold">Built-in SEO</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile Optimization</span>
                <span className="font-semibold">Fully responsive</span>
              </div>
              <div className="flex justify-between">
                <span>Conversion Focus</span>
                <span className="font-semibold">Lead-driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES BREAKDOWN */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Capabilities</p>
            <h2 className="mb-4">What We Handle</h2>
            <p>
              Everything required to build, launch, and grow a high-performing website.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Custom website design',
              'Search engine optimization (SEO)',
              'Local search positioning',
              'Content structure and messaging',
              'Mobile-first development',
              'Conversion optimization',
              'Technical SEO foundation',
              'Ongoing performance improvements'
            ].map((item, i) => (
              <div key={i} className="border-b border-neutral-200 pb-4">
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Process</p>
            <h2 className="mb-4">How We Build It</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Strategy',
                desc: 'Define positioning, structure, and search opportunity.'
              },
              {
                title: 'Build',
                desc: 'Design and develop a custom, conversion-focused website.'
              },
              {
                title: 'Optimize',
                desc: 'Implement SEO and technical structure for visibility.'
              },
              {
                title: 'Scale',
                desc: 'Refine and expand based on performance and growth.'
              }
            ].map((step, i) => (
              <div key={i}>
                <p className="text-sm text-neutral-400 mb-2">0{i + 1}</p>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            If Your Website Isn’t Producing, It’s a Liability
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll show you exactly what’s holding it back — and how to fix it.
          </p>

          <Button to="/contact">
            Request a Website Audit
          </Button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Website Project"
            subtitle="Tell us what you're building. We'll show you how to turn it into a growth system."
          />
        </div>
      </section>
    </>
  );
};

export default WebsiteDesignSEOPage;
