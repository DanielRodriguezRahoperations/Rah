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
  featured?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Tier 1 Customs',
    url: 'https://www.tier1customs.com',
    category: 'Automotive Customization',
    description:
      'High-performance automotive website built for local SEO dominance and premium service positioning.',
    focus: 'Website Design, SEO, Local Service Pages',
    featured: true
  },
  {
    title: 'The Ever After Edit',
    url: 'https://www.everaftereditfl.com',
    category: 'Luxury Wedding Brand',
    description:
      'Editorial-style luxury website designed for high-end custom wedding clientele.',
    focus: 'Brand Positioning, Website Design',
    featured: true
  },
  {
    title: 'The Scottsdale Injector',
    url: 'https://www.thescottsdaleinjector.com',
    category: 'Medical Aesthetics',
    description:
      'Premium aesthetic website built for authority, trust, and local SEO performance.',
    focus: 'Website Design, Local SEO',
    featured: true
  },
  {
    title: 'Empire Builds AZ',
    url: 'https://www.empirebuildsaz.com',
    category: 'Construction',
    description:
      'Professional contractor website focused on service clarity and lead generation.',
    focus: 'Website Design'
  },
  {
    title: 'Pinnacle Bookkeeping AZ',
    url: 'https://www.pinnaclebookkeepingaz.com',
    category: 'Bookkeeping',
    description:
      'Service-based website built for trust, clarity, and client acquisition.',
    focus: 'Website Design'
  },
  {
    title: 'SunVision Solar',
    url: 'https://www.sunvision-solar.com',
    category: 'Solar',
    description:
      'Lead-focused solar website designed to educate and convert homeowners.',
    focus: 'Website Design, Lead Generation'
  }
];

const PortfolioPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Website Portfolio Scottsdale & Phoenix | RAH Operations"
        description="Explore high-conversion website design and SEO projects built for businesses in Scottsdale, Phoenix, and across Arizona."
        url={absoluteUrl('/portfolio')}
      />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_top_left,red,transparent_60%)]" />

        <div className="container-clean max-w-4xl text-center">
          <p className="eyebrow eyebrow-red mb-6">
            Portfolio — Scottsdale & Phoenix
          </p>

          <h1 className="text-white mb-6">
            This Is What High-Performance Websites Look Like
          </h1>

          <p className="text-lg text-neutral-300">
            Every project is built to rank, convert, and position the business as the authority in its market.
          </p>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Featured Work</p>
            <h2 className="mb-4">Top Performing Projects</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {portfolioItems
              .filter((p) => p.featured)
              .map((item, index) => (
                <div
                  key={index}
                  className="surface-dark rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition"
                >
                  {/* MOCKUP */}
                  <div className="mb-6 bg-black rounded-lg border border-white/10 overflow-hidden">
                    <div className="h-6 bg-neutral-900 flex items-center px-3 gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>

                    <div className="h-40 bg-neutral-900" />
                  </div>

                  <p className="eyebrow mb-2">{item.category}</p>
                  <h3 className="text-white mb-3">{item.title}</h3>

                  <p className="text-sm text-neutral-300 mb-4">
                    {item.description}
                  </p>

                  <Button to="/case-studies">
                    View Case Study
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ALL PROJECTS */}
      <section className="section section-tight bg-neutral-50">
        <div className="container-clean">
          <div className="grid md:grid-cols-2 gap-10">
            {portfolioItems
              .filter((p) => !p.featured)
              .map((item, index) => (
                <div
                  key={index}
                  className="surface p-8 rounded-xl border border-neutral-200"
                >
                  <p className="eyebrow mb-2">{item.category}</p>
                  <h3 className="mb-3">{item.title}</h3>

                  <p className="mb-4 text-sm">{item.description}</p>

                  <div className="flex gap-3">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium underline"
                    >
                      Visit Website
                    </a>

                    <span className="text-neutral-400">•</span>

                    <span className="text-sm text-neutral-500">
                      {item.focus}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-4">What This Means</p>

            <h2 className="mb-6">
              These Are Not Just Websites.
              <br /> They Are Revenue Systems.
            </h2>

            <p>
              Every build is designed to eliminate confusion, increase trust,
              and turn traffic into actual business.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Stronger Positioning</h3>
              <p>Clear messaging that instantly communicates value.</p>
            </div>

            <div>
              <h3 className="font-semibold">Higher Conversion</h3>
              <p>Designed to turn visitors into leads and customers.</p>
            </div>

            <div>
              <h3 className="font-semibold">Search Visibility</h3>
              <p>Built with SEO structure for long-term traffic growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="container-clean text-center">
          <h2 className="text-white mb-6">
            Your Website Should Be Doing This For You
          </h2>

          <p className="text-neutral-300 mb-10 max-w-xl mx-auto">
            If it’s not generating leads, building trust, or positioning your business —
            it’s holding you back.
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
