import React from 'react';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const Tier1CustomsCaseStudy = () => {
  const projectStats = [
    ['Industry', 'Automotive Customization'],
    ['Market', 'Scottsdale / Phoenix'],
    ['Focus', 'Website Design + Local SEO'],
    ['Primary Goal', 'High-Intent Lead Generation']
  ];

  const buildItems = [
    'Premium dark visual direction for automotive authority',
    'Dedicated service-page structure for local SEO growth',
    'Clear hierarchy for wraps, PPF, chrome delete, and ceramic coating',
    'Stronger conversion paths for high-intent vehicle owners',
    'Scottsdale and Phoenix keyword positioning',
    'Improved trust, service clarity, and brand perception'
  ];

  const strategyItems = [
    {
      title: 'Service Architecture',
      description:
        'The site was structured around the actual services customers search for, instead of forcing every offer onto one generic page.'
    },
    {
      title: 'Local SEO Positioning',
      description:
        'Pages were built to support Scottsdale, Phoenix, and Arizona search relevance for high-intent automotive customization keywords.'
    },
    {
      title: 'Premium Brand Perception',
      description:
        'The visual direction was elevated so Tier 1 Customs would feel like a serious automotive customization brand, not a basic wrap shop.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Tier 1 Customs Website Case Study | RAH Operations"
        description="See how RAH Operations built a premium automotive website and local SEO foundation for Tier 1 Customs in Scottsdale and Phoenix Arizona."
        url={absoluteUrl('/case-studies/tier-1-customs')}
      />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_top_left,red,transparent_60%)]" />

        <div className="container-clean grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-red mb-6">
              Case Study — Automotive Customization
            </p>

            <h1 className="text-white mb-6">
              Turning Tier 1 Customs Into a Premium Local Automotive Brand
            </h1>

            <p className="text-lg text-neutral-300 mb-8">
              A high-conversion website and local SEO foundation built for vehicle wraps,
              paint protection film, chrome delete, ceramic coating, and high-intent
              Scottsdale and Phoenix searches.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Start a Project</Button>

              <Button href="https://www.tier1customs.com" variant="outline">
                View Live Website
              </Button>
            </div>
          </div>

          {/* MOCKUP PANEL */}
          <div className="relative">
            <div className="surface-dark rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                <div className="h-6 bg-neutral-900 flex items-center px-3 gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="h-4 w-24 bg-red-600 rounded mb-4" />
                    <div className="h-8 w-3/4 bg-neutral-700 rounded mb-3" />
                    <div className="h-4 w-1/2 bg-neutral-800 rounded" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-28 rounded-lg bg-neutral-900 border border-white/10" />
                    <div className="h-28 rounded-lg bg-neutral-900 border border-white/10" />
                  </div>

                  <div className="mt-5 h-10 w-36 rounded bg-red-600" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 h-40 w-40 bg-red-600 blur-[120px] opacity-40" />
          </div>
        </div>
      </section>

      {/* PROJECT SNAPSHOT */}
      <section className="section">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">The Challenge</p>

            <h2 className="mb-6">
              The Brand Needed to Look as Premium as the Work
            </h2>

            <p className="mb-6">
              Tier 1 Customs needed more than a basic online presence. The business needed a
              website that could instantly communicate quality, trust, and serious automotive
              expertise.
            </p>

            <p>
              The problem was simple: in a competitive local market, a weak website makes even
              great work look average. The site had to position Tier 1 Customs as a premium
              provider while also supporting local SEO for Scottsdale and Phoenix searches.
            </p>
          </div>

          <div className="surface p-8 rounded-2xl border border-neutral-200">
            <h3 className="mb-6">Project Snapshot</h3>

            <div className="space-y-5 text-sm">
              {projectStats.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6 border-b border-neutral-200 pb-3 last:border-0 last:pb-0"
                >
                  <span>{label}</span>
                  <span className="font-semibold text-neutral-950 text-right">
                    {value}
                  </span>
                </div>
              ))}

              <div className="pt-2">
                <a
                  href="https://www.tier1customs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-950 underline underline-offset-4 hover:opacity-70"
                >
                  www.tier1customs.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="section section-tight bg-neutral-50">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Strategic Build</p>

            <h2 className="mb-4">
              We Did Not Just Make It Look Better.
              <br /> We Rebuilt the Website Around Intent.
            </h2>

            <p>
              The goal was to create a structure that made sense for both users and search engines.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {strategyItems.map((item, index) => (
              <div
                key={item.title}
                className="surface p-8 rounded-2xl border border-neutral-200"
              >
                <p className="editorial-number mb-4">
                  0{index + 1}
                </p>

                <h3 className="mb-3">{item.title}</h3>

                <p className="text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="section">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">What We Built</p>

            <h2 className="mb-6">
              A Website Structured for Premium Services and Local Search
            </h2>

            <p className="mb-6">
              RAH Operations created a cleaner digital structure around the services customers
              actually search for: vehicle wraps, paint protection film, chrome delete,
              ceramic coating, and related customization services.
            </p>

            <p>
              The finished site gives Tier 1 Customs a stronger sales asset, clearer service
              hierarchy, and a better foundation for long-term local SEO growth.
            </p>
          </div>

          <div className="grid gap-4">
            {buildItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-neutral-200 pb-4"
              >
                <span className="text-luxury-red font-semibold">
                  0{index + 1}
                </span>

                <p className="text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section section-dark">
        <div className="container-clean grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-red mb-4">The Outcome</p>

            <h2 className="text-white mb-6">
              A Stronger Website That Matches the Quality of the Brand
            </h2>

            <p className="text-neutral-300 mb-6">
              The new website gives Tier 1 Customs a more premium online presence,
              stronger service positioning, and a better structure for local search visibility.
            </p>

            <p className="text-neutral-300">
              Instead of looking like another local automotive shop, the brand now has a site
              that supports trust, authority, and serious buyer intent.
            </p>
          </div>

          <div className="surface-dark rounded-2xl border border-white/10 p-8">
            <h3 className="text-white mb-6">
              The Shift
            </h3>

            <div className="space-y-6">
              <div>
                <p className="eyebrow eyebrow-red mb-2">Before</p>
                <p className="text-sm text-neutral-300">
                  Basic service presentation with limited authority and less strategic SEO structure.
                </p>
              </div>

              <div>
                <p className="eyebrow eyebrow-red mb-2">After</p>
                <p className="text-sm text-neutral-300">
                  Premium automotive positioning, clearer service paths, and a stronger foundation
                  for Scottsdale and Phoenix search visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            Your Website Should Sell Before You Ever Speak
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            If your business relies on local search, trust, and premium presentation,
            your website cannot look average.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default Tier1CustomsCaseStudy;
