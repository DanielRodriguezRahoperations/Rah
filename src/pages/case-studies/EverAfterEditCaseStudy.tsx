import React from 'react';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const EverAfterEditCaseStudy = () => {
  return (
    <>
      <SEOHead
        title="The Ever After Edit Case Study | RAH Operations"
        description="How RAH Operations built a luxury editorial website for The Ever After Edit."
        url={absoluteUrl('/case-studies/ever-after-edit')}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Case Study</p>
          <h1 className="mb-6">The Ever After Edit</h1>
          <p className="text-lg">
            A luxury wedding signage website built around editorial design, premium positioning, and a refined inquiry experience.
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6">The Challenge</h2>
            <p className="mb-6">
              The Ever After Edit needed to avoid looking like a basic Etsy-style wedding vendor.
            </p>
            <p>
              The brand needed to feel elevated, refined, editorial, and worthy of premium custom wedding projects.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">Project Focus</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span>Industry</span><span className="font-semibold">Luxury Wedding Signage</span></div>
              <div className="flex justify-between"><span>Primary Goal</span><span className="font-semibold">Premium Inquiry Flow</span></div>
              <div className="flex justify-between"><span>Positioning</span><span className="font-semibold">Editorial Luxury</span></div>
              <div className="flex justify-between"><span>Website</span><span className="font-semibold">everaftereditfl.com</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-4">What We Built</p>
          <h2 className="mb-6">A Brand Experience, Not Just a Website</h2>
          <p className="mb-6">
            RAH Operations created a refined website experience with cleaner spacing, stronger visual hierarchy, and luxury-focused copy.
          </p>
          <p>
            The site supports premium custom signage inquiries through a more intentional flow, elevated service structure, and stronger brand perception.
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-10 md:grid-cols-2">
          {[
            'Luxury editorial visual direction',
            'Cleaner inquiry experience',
            'Premium service positioning',
            'Signature Pieces structure',
            'More refined brand messaging',
            'Stronger perceived value'
          ].map((item, index) => (
            <div key={index} className="border-b border-neutral-200 pb-4">
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">Premium Brands Need Premium Digital Experiences</h2>
          <p className="mb-10 max-w-xl mx-auto">
            If your website makes your business look smaller than it is, it is costing you better clients.
          </p>
          <Button to="/contact">Start a Project</Button>
        </div>
      </section>
    </>
  );
};

export default EverAfterEditCaseStudy;
