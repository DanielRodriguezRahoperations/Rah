import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const DigitalMarketingPage = () => {
  return (
    <>
      <SEOHead
        title="Digital Marketing | RAH Operations"
        description="Digital marketing systems built to generate visibility, qualified leads, and measurable business growth."
        url={absoluteUrl('/digital-marketing')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Digital Marketing</p>

          <h1 className="mb-6">
            If Your Marketing Doesn’t Produce Leads, It’s Broken
          </h1>

          <p className="text-lg mb-8">
            Most businesses are posting, boosting, and guessing. That is not a system.
            We build marketing that attracts the right traffic and turns it into real opportunities.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button to="/contact">
              Start a Strategy Call
            </Button>

            <Button to="/portfolio" variant="outline">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="mb-6">
              Marketing Should Be a System, Not Random Activity
            </h2>

            <p className="mb-6">
              Businesses waste money when marketing is disconnected.
              SEO in one place, ads somewhere else, and a website that does not convert.
            </p>

            <p>
              We build everything to work together — visibility, messaging, and conversion —
              so your marketing actually produces results.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What This Means</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Better traffic</span>
                <span className="font-semibold">More qualified</span>
              </div>

              <div className="flex justify-between">
                <span>Stronger messaging</span>
                <span className="font-semibold">Clear positioning</span>
              </div>

              <div className="flex justify-between">
                <span>Higher conversion</span>
                <span className="font-semibold">More inquiries</span>
              </div>

              <div className="flex justify-between">
                <span>Less waste</span>
                <span className="font-semibold">Smarter spend</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Capabilities</p>
            <h2 className="mb-4">What We Handle</h2>
            <p>
              Every part of your marketing system is built to support visibility and conversion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Search engine optimization (SEO)',
              'Local search positioning',
              'Google Ads and paid campaigns',
              'Website conversion strategy',
              'Landing page development',
              'Messaging and offer clarity',
              'Tracking and performance analysis',
              'Ongoing optimization'
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
                title: 'Audit',
                desc: 'Identify where growth is being lost.'
              },
              {
                title: 'Position',
                desc: 'Clarify messaging and offer.'
              },
              {
                title: 'Deploy',
                desc: 'Drive traffic through the right channels.'
              },
              {
                title: 'Optimize',
                desc: 'Refine based on performance.'
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

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            If Your Marketing Feels Inconsistent, It’s Not Built Right
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll show you exactly what’s holding it back — and how to fix it.
          </p>

          <Button to="/contact">
            Start a Strategy Call
          </Button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingPage;
