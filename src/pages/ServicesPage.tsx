import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const ServicesPage = () => {
  const services = [
    {
      title: 'Website Design & SEO',
      description:
        'High-performance websites engineered to rank in Scottsdale and Phoenix while converting traffic into real revenue.',
      link: '/website-design-and-seo',
      featured: true
    },
    {
      title: 'Digital Marketing',
      description:
        'Traffic and lead generation systems designed to scale your business consistently across channels.',
      link: '/digital-marketing'
    },
    {
      title: 'Social Media Management',
      description:
        'Strategic brand positioning and content systems that build trust and authority over time.',
      link: '/social-media-management'
    },
    {
      title: 'Business Credit & Funding',
      description:
        'Build business credit, unlock funding, and structure your company for financial growth.',
      link: '/business-credit-and-funding'
    },
    {
      title: 'Personal Credit Repair',
      description:
        'Improve your credit profile strategically to expand your financial options and opportunities.',
      link: '/personal-credit-repair'
    },
    {
      title: 'New Business Setup',
      description:
        'Start your business the right way with proper structure, compliance, and foundation.',
      link: '/new-business-setup'
    },
    {
      title: 'Arizona Notary Services',
      description:
        'Professional notary services across Arizona for business and personal documentation.',
      link: '/notary-services'
    }
  ];

  return (
    <>
      <SEOHead
        title="Business Services Scottsdale & Phoenix | RAH Operations"
        description="Website design, SEO, digital marketing, and business systems in Scottsdale and Phoenix Arizona built to generate traffic, leads, and revenue."
        url={absoluteUrl('/services')}
      />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_top_left,red,transparent_60%)]" />

        <div className="container-clean max-w-4xl text-center">
          <p className="eyebrow eyebrow-red mb-6">
            Services — Scottsdale & Phoenix
          </p>

          <h1 className="text-white mb-6">
            We Don’t Offer Services.
            <br /> We Build Growth Systems.
          </h1>

          <p className="text-lg text-neutral-300 mb-10">
            Every service we provide is designed to increase visibility,
            strengthen authority, and drive measurable revenue.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>

      {/* FEATURED SERVICE */}
      <section className="section">
        <div className="container-clean">
          <div className="surface-dark rounded-2xl p-10 grid lg:grid-cols-2 gap-10 items-center border border-white/10">
            <div>
              <p className="eyebrow eyebrow-red mb-4">Primary Focus</p>

              <h2 className="text-white mb-6">
                Website Design & SEO Is The Core Of Everything
              </h2>

              <p className="text-neutral-300 mb-6">
                If your website isn’t ranking or converting, nothing else matters.
                This is where most businesses fail — and where we focus first.
              </p>

              <Button to="/website-design-and-seo">
                Explore Website Design & SEO
              </Button>
            </div>

            {/* MOCKUP PANEL */}
            <div className="relative">
              <div className="bg-black rounded-xl border border-white/10 overflow-hidden">
                <div className="h-6 bg-neutral-900 flex items-center px-3 gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="h-4 w-2/3 bg-neutral-700 rounded" />
                  <div className="h-32 bg-neutral-900 rounded-lg border border-white/10" />
                  <div className="h-10 w-32 bg-red-600 rounded" />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-red-600 blur-[120px] opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section section-tight bg-neutral-50">
        <div className="container-clean">
          <div className="grid md:grid-cols-2 gap-10">
            {services
              .filter((s) => !s.featured)
              .map((service, index) => (
                <div
                  key={index}
                  className="surface p-8 rounded-xl border border-neutral-200 hover:shadow-lg transition"
                >
                  <h3 className="mb-3">{service.title}</h3>
                  <p className="mb-6 text-sm">{service.description}</p>

                  <Button to={service.link} variant="outline">
                    View Service
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-4">How We Operate</p>

            <h2 className="mb-6">
              Most Agencies Sell Tasks.
              <br /> We Build Systems That Produce.
            </h2>

            <p>
              We don’t focus on activity. We focus on outcomes.
              Every decision is tied to growth, visibility, and conversion.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">No Fluff Execution</h3>
              <p>Everything we do has a purpose tied to performance.</p>
            </div>

            <div>
              <h3 className="font-semibold">Built for Scale</h3>
              <p>We build systems that grow with your business.</p>
            </div>

            <div>
              <h3 className="font-semibold">Revenue Focused</h3>
              <p>Every system is designed to generate real business results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="container-clean text-center">
          <h2 className="text-white mb-6">
            If You’re Serious About Growth — Let’s Build It Right
          </h2>

          <p className="text-neutral-300 mb-10 max-w-xl mx-auto">
            We’ll show you exactly where you’re losing opportunities
            and how to turn your business into a high-performance system.
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
