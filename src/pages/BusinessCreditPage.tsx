import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const BusinessCreditPage = () => {
  return (
    <>
      <SEOHead
        title="Business Credit & Funding | RAH Operations"
        description="Business credit strategy and funding systems designed to help companies access capital and scale with confidence."
        url={absoluteUrl('/business-credit-and-funding')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Business Credit & Funding</p>

          <h1 className="mb-6">
            If Your Business Depends on Your Personal Credit, It’s Not Structured Correctly
          </h1>

          <p className="text-lg mb-8">
            Most businesses are set up in a way that limits their ability to access capital.
            We fix the structure, build the credit profile, and create a path to real funding.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button to="/contact">
              Request a Credit Analysis
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
              Access to Capital Comes Down to Structure
            </h2>

            <p className="mb-6">
              Lenders don’t just look at your business. They look at how it’s built,
              how it reports, and how it performs.
            </p>

            <p>
              We position your business to meet those standards so you’re not relying
              on personal guarantees or limited financing options.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What This Changes</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Stronger credit profile</span>
                <span className="font-semibold">More approvals</span>
              </div>

              <div className="flex justify-between">
                <span>Higher limits</span>
                <span className="font-semibold">Better access</span>
              </div>

              <div className="flex justify-between">
                <span>Better terms</span>
                <span className="font-semibold">Lower rates</span>
              </div>

              <div className="flex justify-between">
                <span>Less personal risk</span>
                <span className="font-semibold">More protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE HANDLE */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Capabilities</p>
            <h2 className="mb-4">What We Handle</h2>
            <p>
              Everything required to build, strengthen, and leverage your business credit profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Business structure optimization',
              'Credit profile setup',
              'Vendor and trade line strategy',
              'D-U-N-S and reporting setup',
              'Business credit building',
              'Funding and financing strategy',
              'Application guidance',
              'Ongoing credit optimization'
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
                title: 'Assess',
                desc: 'Evaluate your current structure and credit position.'
              },
              {
                title: 'Build',
                desc: 'Establish and strengthen your business credit profile.'
              },
              {
                title: 'Position',
                desc: 'Prepare your business for funding approval.'
              },
              {
                title: 'Access',
                desc: 'Secure funding and expand credit opportunities.'
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
            If You’re Not Set Up Correctly, You’re Leaving Money on the Table
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll show you exactly where your business stands and what needs to happen next.
          </p>

          <Button to="/contact">
            Get a Credit Analysis
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

export default BusinessCreditPage;
