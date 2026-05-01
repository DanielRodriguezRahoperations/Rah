import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const NewBusinessSetupPage = () => {
  return (
    <>
      <SEOHead
        title="New Business Setup | RAH Operations"
        description="Business formation and setup systems designed to build a strong, scalable foundation from day one."
        url={absoluteUrl('/new-business-setup')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">New Business Setup</p>

          <h1 className="mb-6">
            Most Businesses Fail Before They Ever Start Operating
          </h1>

          <p className="text-lg mb-8">
            Not because of the idea—but because the foundation is built wrong.
            We structure your business the right way from the start so it can actually scale.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button to="/contact">
              Start Your Business Setup
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
              Formation Is Not Just Paperwork. It’s Structure.
            </h2>

            <p className="mb-6">
              Most people treat business setup like a checklist—file the LLC,
              get the EIN, open a bank account.
            </p>

            <p>
              That’s not enough. If the structure isn’t built correctly,
              it limits your ability to access credit, scale operations,
              and operate professionally.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What This Impacts</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Legal protection</span>
                <span className="font-semibold">Personal separation</span>
              </div>

              <div className="flex justify-between">
                <span>Tax structure</span>
                <span className="font-semibold">Better positioning</span>
              </div>

              <div className="flex justify-between">
                <span>Business credibility</span>
                <span className="font-semibold">Stronger presence</span>
              </div>

              <div className="flex justify-between">
                <span>Future funding</span>
                <span className="font-semibold">Easier approvals</span>
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
              Everything required to properly establish and structure your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'LLC and corporation formation',
              'Business structure consultation',
              'EIN registration and setup',
              'Operating agreement drafting',
              'Business compliance guidance',
              'Banking and financial setup',
              'Licensing and registration support',
              'Ongoing structure optimization'
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
                title: 'Plan',
                desc: 'Define the right structure for your goals.'
              },
              {
                title: 'Form',
                desc: 'Handle all filings and documentation.'
              },
              {
                title: 'Set Up',
                desc: 'Establish banking and compliance systems.'
              },
              {
                title: 'Position',
                desc: 'Prepare for growth, credit, and scalability.'
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
            If You Start Wrong, You’ll Spend Time Fixing It Later
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We make sure your business is built correctly from day one.
          </p>

          <Button to="/contact">
            Start Your Business Setup
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

export default NewBusinessSetupPage;
