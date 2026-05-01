import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const ReputationManagementPage = () => {
  return (
    <>
      <SEOHead
        title="Reputation Management | RAH Operations"
        description="Reputation management systems designed to strengthen trust, improve brand perception, and support business growth."
        url={absoluteUrl('/reputation-management')}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Reputation Management</p>

          <h1 className="mb-6">
            Your Reputation Is Part of Your Sales System
          </h1>

          <p className="text-lg mb-8">
            Before people contact you, they check how your business looks online.
            We help strengthen the trust signals that influence whether prospects move forward or disappear.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button to="/contact">Request a Reputation Review</Button>
            <Button variant="outline" href="tel:+18884724621">(888) 472-4621</Button>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="mb-6">
              Trust Gets Built Before the First Conversation
            </h2>

            <p className="mb-6">
              Reviews, search results, social presence, and brand consistency all shape how a prospect judges your business.
            </p>

            <p>
              If your reputation is weak, outdated, inconsistent, or unmanaged, you lose opportunities before you know they existed.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What This Improves</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Review presence</span>
                <span className="font-semibold">More trust</span>
              </div>
              <div className="flex justify-between">
                <span>Brand perception</span>
                <span className="font-semibold">Stronger credibility</span>
              </div>
              <div className="flex justify-between">
                <span>Local visibility</span>
                <span className="font-semibold">Better authority</span>
              </div>
              <div className="flex justify-between">
                <span>Response quality</span>
                <span className="font-semibold">Professional tone</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Capabilities</p>
            <h2 className="mb-4">What We Handle</h2>
            <p>
              Everything required to improve how your business is perceived online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Review profile analysis',
              'Review response strategy',
              'Google Business Profile support',
              'Brand mention monitoring',
              'Customer feedback systems',
              'Reputation improvement planning',
              'Trust signal optimization',
              'Ongoing reputation guidance'
            ].map((item, i) => (
              <div key={i} className="border-b border-neutral-200 pb-4">
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Process</p>
            <h2 className="mb-4">How We Improve It</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Audit', desc: 'Review your current online reputation.' },
              { title: 'Identify', desc: 'Find gaps that damage trust or visibility.' },
              { title: 'Improve', desc: 'Strengthen reviews, responses, and perception.' },
              { title: 'Maintain', desc: 'Keep your reputation consistent over time.' }
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

      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            If Prospects Don’t Trust What They See, They Won’t Reach Out
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll review your online reputation and show you what needs to improve.
          </p>

          <Button to="/contact">Request a Reputation Review</Button>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Reputation Review"
            subtitle="Tell us where your business stands now and we’ll help identify the trust gaps."
          />
        </div>
      </section>
    </>
  );
};

export default ReputationManagementPage;
