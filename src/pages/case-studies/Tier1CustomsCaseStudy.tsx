import React from 'react';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const Tier1CustomsCaseStudy = () => {
  return (
    <>
      <SEOHead
        title="Tier 1 Customs Case Study | RAH Operations"
        description="How RAH Operations built a premium website and SEO foundation for Tier 1 Customs."
        url={absoluteUrl('/case-studies/tier-1-customs')}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Case Study</p>
          <h1 className="mb-6">Tier 1 Customs</h1>
          <p className="text-lg">
            A premium automotive customization website built for service clarity, local SEO, and high-intent lead generation.
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6">The Challenge</h2>
            <p className="mb-6">
              Tier 1 Customs needed to look like a premium automotive customization brand, not another local wrap shop.
            </p>
            <p>
              The site needed to support services like vehicle wraps, paint protection film, chrome delete, ceramic coating, and local Scottsdale/Phoenix search visibility.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">Project Focus</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span>Industry</span><span className="font-semibold">Automotive Customization</span></div>
              <div className="flex justify-between"><span>Primary Goal</span><span className="font-semibold">Local SEO</span></div>
              <div className="flex justify-between"><span>Positioning</span><span className="font-semibold">Premium Service Brand</span></div>
              <div className="flex justify-between"><span>Website</span><span className="font-semibold">tier1customs.com</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-4">What We Built</p>
          <h2 className="mb-6">A Website Structured Around High-Intent Services</h2>
          <p className="mb-6">
            RAH Operations created a cleaner digital structure built around the services customers actually search for.
          </p>
          <p>
            The site now supports dedicated service pages, stronger local targeting, and a more premium brand presentation designed to convert serious vehicle owners into inquiries.
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-10 md:grid-cols-2">
          {[
            'Dedicated service-page structure',
            'Premium automotive positioning',
            'Local Scottsdale/Phoenix SEO foundation',
            'Clearer conversion path',
            'Improved service hierarchy',
            'Stronger trust and authority signals'
          ].map((item, index) => (
            <div key={index} className="border-b border-neutral-200 pb-4">
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">Your Website Should Sell Before You Ever Speak</h2>
          <p className="mb-10 max-w-xl mx-auto">
            If your business relies on local search and premium presentation, your website has to do more than exist.
          </p>
          <Button to="/contact">Start a Project</Button>
        </div>
      </section>
    </>
  );
};

export default Tier1CustomsCaseStudy;
