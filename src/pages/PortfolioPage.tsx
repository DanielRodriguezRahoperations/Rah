import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

interface PortfolioItem {
  title: string;
  url: string;
  category: string;
  description: string;
  focus: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Tier 1 Customs',
    url: 'https://www.tier1customs.com',
    category: 'Automotive Customization',
    description:
      'A premium website built for an automotive customization brand focused on wraps, paint protection film, chrome delete, ceramic coating, and high-intent local SEO.',
    focus: 'Website Design, SEO, Local Service Pages'
  },
  {
    title: 'The Ever After Edit',
    url: 'https://www.everaftereditfl.com',
    category: 'Luxury Wedding Signage',
    description:
      'A refined wedding signage website built with a clean editorial feel, elevated visual direction, and a premium inquiry flow for custom event projects.',
    focus: 'Brand Positioning, Website Design, Inquiry Experience'
  },
  {
    title: 'Empire Builds AZ',
    url: 'https://www.empirebuildsaz.com',
    category: 'Construction',
    description:
      'A professional website for a construction and building services company showcasing services, credibility, and project experience.',
    focus: 'Website Design, Service Positioning'
  },
  {
    title: 'Pinnacle Bookkeeping AZ',
    url: 'https://www.pinnaclebookkeepingaz.com',
    category: 'Bookkeeping',
    description:
      'A business services website designed to create trust, explain service offerings, and support lead generation for bookkeeping clients.',
    focus: 'Website Design, Lead Conversion'
  },
  {
    title: 'The Scottsdale Injector',
    url: 'https://www.thescottsdaleinjector.com',
    category: 'Medical Aesthetics',
    description:
      'A premium aesthetic services website built to support authority, service education, and client inquiries in a competitive local market.',
    focus: 'Website Design, Local SEO, Brand Trust'
  },
  {
    title: 'SunVision Solar',
    url: 'https://www.sunvision-solar.com',
    category: 'Solar',
    description:
      'A solar services website created to communicate value, educate homeowners, and generate qualified project inquiries.',
    focus: 'Website Design, Lead Generation'
  },
  {
    title: 'Daniel Rodriguez',
    url: 'https://www.danielrodriguez.org',
    category: 'Personal Brand',
    description:
      'A personal brand website built to support credibility, professional positioning, and online search presence.',
    focus: 'Personal Branding, SEO Presence'
  },
  {
    title: 'Knox Strats',
    url: 'https://www.knoxstrats.com',
    category: 'Consulting',
    description:
      'A consulting website designed around strategic positioning, service clarity, and professional credibility.',
    focus: 'Website Design, Brand Positioning'
  }
];

const PortfolioPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Portfolio | RAH Operations"
        description="Explore website design, SEO, branding, and digital growth projects built by RAH Operations."
        url={absoluteUrl('/portfolio')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Portfolio</p>

          <h1 className="mb-6">
            Websites Built to Position, Convert, and Grow
          </h1>

          <p className="text-lg">
            A look at selected websites and digital projects built for businesses that needed stronger positioning,
            cleaner design, and a better foundation for growth.
          </p>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Selected Work</p>
            <h2 className="mb-4">Recent Projects</h2>
            <p>
              Each project is built around the same core principles: clarity, trust, search visibility,
              and conversion.
            </p>
          </div>

          <div className="divide-y border-y border-neutral-200">
            {portfolioItems.map((item, index) => (
              <article
                key={index}
                className="grid gap-8 py-10 lg:grid-cols-[0.8fr_1.4fr_auto] lg:items-start"
              >
                <div>
                  <p className="eyebrow mb-3">{item.category}</p>
                  <h2 className="text-2xl">{item.title}</h2>
                </div>

                <div>
                  <p className="mb-5">{item.description}</p>
                  <p className="text-sm font-semibold text-neutral-950">{item.focus}</p>
                </div>

                <div className="lg:text-right">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex border border-neutral-950 px-5 py-3 text-sm font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-950 hover:text-white"
                  >
                    View Website
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Approach</p>
            <h2 className="mb-6">
              The Work Is Not Just Design. It’s Business Positioning.
            </h2>

            <p>
              A website should do more than exist online. It should clarify what the business does,
              build trust quickly, support search visibility, and make the next step obvious.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What These Projects Have in Common</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-6">
                <span>Cleaner brand presentation</span>
                <span className="font-semibold">Premium feel</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Improved service clarity</span>
                <span className="font-semibold">Better messaging</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Stronger local positioning</span>
                <span className="font-semibold">SEO foundation</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Clearer conversion path</span>
                <span className="font-semibold">More inquiries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            Your Website Should Be One of Your Strongest Sales Assets
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            If it is not helping you build authority, generate leads, or close trust gaps, it needs to be rebuilt.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
