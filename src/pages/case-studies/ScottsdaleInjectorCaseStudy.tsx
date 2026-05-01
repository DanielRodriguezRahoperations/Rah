import React from 'react';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const ScottsdaleInjectorCaseStudy = () => {
  return (
    <>
      <SEOHead
        title="The Scottsdale Injector Case Study | RAH Operations"
        description="How RAH Operations positioned The Scottsdale Injector with a premium aesthetics website."
        url={absoluteUrl('/case-studies/scottsdale-injector')}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Case Study</p>
          <h1 className="mb-6">The Scottsdale Injector</h1>
          <p className="mb-8 text-lg">
            A premium medical aesthetics website built to strengthen trust, service clarity, and local brand authority.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button to="/contact">Start a Project</Button>
            <Button href="https://www.thescottsdaleinjector.com" variant="outline">
              View Live Website
            </Button>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6">The Challenge</h2>
            <p className="mb-6">
              Medical aesthetics is a trust-heavy market. The website needed to feel professional, premium, and credible from the first interaction.
            </p>
            <p>
              The brand needed clear service presentation, stronger local positioning, and a polished experience that matched the quality of the provider.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">Project Focus</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-6">
                <span>Industry</span>
                <span className="font-semibold">Medical Aesthetics</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>Primary Goal</span>
                <span className="font-semibold">Trust + Inquiries</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>Positioning</span>
                <span className="font-semibold">Premium Injector Brand</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>Website</span>
                <a
                  href="https://www.thescottsdaleinjector.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-neutral-950 underline underline-offset-4 hover:opacity-70"
                >
                  www.thescottsdaleinjector.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-4">What We Built</p>
          <h2 className="mb-6">A Website Designed to Build Trust Quickly</h2>
          <p className="mb-6">
            RAH Operations built a digital presence that presents the brand as credible, established, and service-focused.
          </p>
          <p>
            The site supports client education, local visibility, and conversion by making treatments easier to understand and the next step easier to take.
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-10 md:grid-cols-2">
          {[
            'Premium aesthetics positioning',
            'Clear service presentation',
            'Trust-focused page structure',
            'Local Scottsdale brand authority',
            'Improved inquiry path',
            'Professional visual experience'
          ].map((item, index) => (
            <div key={index} className="border-b border-neutral-200 pb-4">
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">In Trust-Based Industries, Presentation Matters</h2>
          <p className="mb-10 max-w-xl mx-auto">
            If your website does not build confidence quickly, prospects will compare you to someone who does.
          </p>
          <Button to="/contact">Start a Project</Button>
        </div>
      </section>
    </>
  );
};

export default ScottsdaleInjectorCaseStudy;
