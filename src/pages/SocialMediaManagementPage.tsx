import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const SocialMediaManagementPage = () => {
  return (
    <>
      <SEOHead
        title="Social Media Management | RAH Operations"
        description="Social media strategy and content systems built to strengthen brand positioning and drive real engagement."
        url={absoluteUrl('/social-media-management')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Social Media Management</p>

          <h1 className="mb-6">
            Attention Means Nothing If It Doesn’t Turn Into Business
          </h1>

          <p className="text-lg mb-8">
            Posting content is easy. Building a brand that people recognize,
            trust, and engage with consistently is where most businesses fall apart.
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
              Social Media Should Reinforce Your Business, Not Distract From It
            </h2>

            <p className="mb-6">
              Most companies are posting without direction. No positioning,
              no message, no consistency.
            </p>

            <p>
              We build social media systems that support your brand, reinforce your authority,
              and keep your business relevant in front of the right audience.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What This Looks Like</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Stronger brand presence</span>
                <span className="font-semibold">More recognition</span>
              </div>

              <div className="flex justify-between">
                <span>Better engagement</span>
                <span className="font-semibold">Real interaction</span>
              </div>

              <div className="flex justify-between">
                <span>Consistent content</span>
                <span className="font-semibold">Clear direction</span>
              </div>

              <div className="flex justify-between">
                <span>More trust</span>
                <span className="font-semibold">Better perception</span>
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
              Everything required to maintain a consistent and professional social presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Content strategy and planning',
              'Content creation and posting',
              'Brand voice and messaging',
              'Platform management',
              'Audience engagement and responses',
              'Paid social campaigns',
              'Performance tracking',
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
                desc: 'Understand your current presence and positioning.'
              },
              {
                title: 'Define',
                desc: 'Clarify message, tone, and direction.'
              },
              {
                title: 'Execute',
                desc: 'Create and publish content consistently.'
              },
              {
                title: 'Refine',
                desc: 'Improve based on engagement and performance.'
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
            If Your Social Media Feels Random, It’s Not Working
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll show you how to turn it into something that actually supports your business.
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

export default SocialMediaManagementPage;
