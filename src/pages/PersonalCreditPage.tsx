import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const PersonalCreditPage = () => {
  return (
    <>
      <SEOHead
        title="Personal Credit Strategy | RAH Operations"
        description="Structured credit improvement and strategy designed to strengthen your financial profile and expand your options."
        url={absoluteUrl('/personal-credit-repair')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Personal Credit</p>

          <h1 className="mb-6">
            If Your Credit Is Weak, Your Options Are Limited
          </h1>

          <p className="text-lg mb-8">
            Credit impacts everything—from financing to housing to business opportunities.
            We focus on improving your profile the right way, with structure and strategy.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button to="/contact">
              Request a Credit Review
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
              Credit Improvement Requires Strategy, Not Shortcuts
            </h2>

            <p className="mb-6">
              Most people are given generic advice or quick fixes that don’t last.
              That approach creates more problems long-term.
            </p>

            <p>
              We take a structured approach—reviewing your profile, identifying issues,
              and improving your credit in a way that holds up over time.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What This Changes</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Stronger credit profile</span>
                <span className="font-semibold">Better access</span>
              </div>

              <div className="flex justify-between">
                <span>Improved approvals</span>
                <span className="font-semibold">More options</span>
              </div>

              <div className="flex justify-between">
                <span>Lower rates</span>
                <span className="font-semibold">Less cost</span>
              </div>

              <div className="flex justify-between">
                <span>Financial stability</span>
                <span className="font-semibold">Long-term benefit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Capabilities</p>
            <h2 className="mb-4">What We Handle</h2>
            <p>
              Everything required to review, improve, and strengthen your credit profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Credit report analysis',
              'Dispute strategy and documentation',
              'Creditor communication guidance',
              'Negative item review',
              'Credit building strategy',
              'Utilization and account structuring',
              'Ongoing monitoring guidance',
              'Long-term credit planning'
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
            <h2 className="mb-4">How We Improve It</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Review',
                desc: 'Analyze your full credit profile.'
              },
              {
                title: 'Identify',
                desc: 'Pinpoint negative and limiting factors.'
              },
              {
                title: 'Correct',
                desc: 'Address inaccuracies and weak areas.'
              },
              {
                title: 'Strengthen',
                desc: 'Build a stronger long-term profile.'
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
            If Your Credit Is Holding You Back, It Needs to Be Fixed Correctly
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll show you exactly where you stand and what needs to happen next.
          </p>

          <Button to="/contact">
            Request a Credit Review
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

export default PersonalCreditPage;
