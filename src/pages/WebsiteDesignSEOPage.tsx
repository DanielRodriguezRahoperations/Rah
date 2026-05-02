import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const WebsiteDesignSEOPage = () => {
  return (
    <>
      <SEOHead
        title="Website Design & SEO Scottsdale, Phoenix AZ | RAH Operations"
        description="High-conversion website design and SEO services in Scottsdale and Phoenix, Arizona. Custom-built websites engineered for rankings, authority, and lead generation."
        url={absoluteUrl('/website-design-and-seo')}
      />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_top_left,red,transparent_60%)]" />

        <div className="container-clean grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow eyebrow-red mb-6">
              Website Design & SEO — Scottsdale & Phoenix
            </p>

            <h1 className="mb-6 text-white">
              Your Website Should Be Closing Deals.
              <br /> Not Just Sitting There.
            </h1>

            <p className="text-lg text-neutral-300 mb-8">
              We design and build high-performance websites engineered for search visibility,
              authority, and conversion. Every build is structured to generate traffic and turn it into revenue.
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

          {/* MOCKUP PANEL */}
          <div className="relative">
            <div className="surface surface-dark p-6 rounded-2xl shadow-2xl border border-white/10">
              <div className="bg-black rounded-xl overflow-hidden border border-white/10">
                <div className="h-6 bg-neutral-900 flex items-center px-3 gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="h-4 w-3/4 bg-neutral-700 rounded" />
                  <div className="h-4 w-1/2 bg-neutral-800 rounded" />
                  <div className="h-32 bg-neutral-900 rounded-lg border border-white/10" />
                  <div className="h-10 w-32 bg-red-600 rounded" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-red-600 blur-[120px] opacity-40" />
          </div>
        </div>
      </section>

      {/* PROBLEM / POSITIONING */}
      <section className="section">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-4">Reality Check</p>

            <h2 className="mb-6">
              Most Websites Are Built Wrong From Day One
            </h2>

            <p className="mb-6">
              No search structure. No positioning. No conversion strategy.
              Just a design that looks decent and does nothing.
            </p>

            <p>
              That’s why most business websites never rank, never convert,
              and never become a real asset.
            </p>
          </div>

          <div className="surface p-8 rounded-xl border border-neutral-200">
            <h3 className="mb-6">What We Do Differently</h3>

            <div className="space-y-5 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Design</span>
                <span className="font-semibold">Custom — no templates</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>SEO</span>
                <span className="font-semibold">Built into structure</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Strategy</span>
                <span className="font-semibold">Conversion-first</span>
              </div>
              <div className="flex justify-between">
                <span>Outcome</span>
                <span className="font-semibold">Lead generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section section-tight bg-neutral-50">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Capabilities</p>
            <h2 className="mb-4">Everything Required to Perform</h2>
            <p>
              This isn’t pieced together. It’s a complete system built to rank and convert.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Custom website design (no templates)',
              'Search engine optimization (SEO)',
              'Local SEO (Scottsdale, Phoenix, Arizona)',
              'Content structure and messaging',
              'Mobile-first development',
              'Conversion rate optimization',
              'Technical SEO foundation',
              'Ongoing performance scaling'
            ].map((item, i) => (
              <div key={i} className="border-b border-neutral-200 pb-4">
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-dark">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow eyebrow-red mb-4">Process</p>
            <h2 className="mb-4 text-white">Built With Purpose — Not Guesswork</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-white">
            {[
              {
                title: 'Strategy',
                desc: 'Define positioning, competitors, and search opportunity.'
              },
              {
                title: 'Build',
                desc: 'Design and develop a high-conversion custom website.'
              },
              {
                title: 'Optimize',
                desc: 'Implement SEO structure, speed, and indexing.'
              },
              {
                title: 'Scale',
                desc: 'Refine, expand, and increase performance over time.'
              }
            ].map((step, i) => (
              <div key={i}>
                <p className="text-red-500 mb-2">0{i + 1}</p>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY CTA */}
      <section className="section">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            If Your Website Isn’t Producing — It’s Costing You Money
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll break down exactly what’s wrong and show you how to fix it.
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
            subtitle="Tell us what you're building. We'll show you how to turn it into a high-performance growth system."
          />
        </div>
      </section>
    </>
  );
};

export default WebsiteDesignSEOPage;
