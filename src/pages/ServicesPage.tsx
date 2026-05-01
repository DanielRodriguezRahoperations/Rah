import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const ServicesPage = () => {
  const services = [
    {
      title: 'Website Design & SEO',
      description:
        'Custom websites and search strategy built to rank, convert, and position your business as the authority in your market.',
      link: '/website-design-and-seo'
    },
    {
      title: 'Digital Marketing',
      description:
        'Strategic marketing systems designed to generate consistent traffic, leads, and revenue across digital channels.',
      link: '/digital-marketing'
    },
    {
      title: 'Social Media Management',
      description:
        'Brand positioning and content execution that builds trust, visibility, and long-term audience growth.',
      link: '/social-media-management'
    },
    {
      title: 'Business Credit & Funding',
      description:
        'Structure your business for capital access, build credit, and unlock funding opportunities for growth.',
      link: '/business-credit-and-funding'
    },
    {
      title: 'Personal Credit Repair',
      description:
        'Strategic credit improvement systems to strengthen your financial profile and expand your options.',
      link: '/personal-credit-repair'
    },
    {
      title: 'New Business Setup',
      description:
        'Build your business the right way from the start with proper structure, compliance, and foundation.',
      link: '/new-business-setup'
    },
    {
      title: 'Arizona Notary Services',
      description:
        'Reliable notary services for business and personal documents across Arizona.',
      link: '/notary-services'
    }
  ];

  return (
    <>
      <SEOHead
        title="Business Services | RAH Operations"
        description="Website design, SEO, digital marketing, and business systems built for growth-focused companies."
        url={absoluteUrl('/services')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Services</p>

          <h1 className="mb-6">
            Built to Scale Businesses, Not Just Support Them
          </h1>

          <p className="text-lg">
            Every service we offer is designed to increase visibility, strengthen positioning,
            and drive measurable business growth.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="divide-y border-y border-neutral-200">
            {services.map((service, index) => (
              <div
                key={index}
                className="grid gap-6 py-10 lg:grid-cols-[1fr_auto] items-start"
              >
                <div>
                  <h2 className="text-2xl mb-3">{service.title}</h2>
                  <p className="max-w-xl">{service.description}</p>
                </div>

                <div className="flex items-center">
                  <Button to={service.link} variant="outline">
                    View Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING BLOCK */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-4">Approach</p>
            <h2 className="mb-6">
              We Focus on Outcomes, Not Activities
            </h2>
            <p>
              Most agencies sell services. We build systems that generate measurable business results.
              Every decision we make is tied to growth, visibility, and conversion.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Clarity Over Complexity</h3>
              <p>No fluff. No unnecessary layers. Just execution that moves the business forward.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Built for Longevity</h3>
              <p>We don’t chase trends. We build foundations that last and scale.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Designed to Convert</h3>
              <p>Every system is built with one goal: turning attention into revenue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            Let’s Build Something That Actually Grows
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            If you’re serious about scaling your business, we’ll show you exactly what that looks like.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
