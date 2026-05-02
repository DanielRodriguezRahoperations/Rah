import React from 'react';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const EverAfterEditCaseStudy = () => {
  const projectStats = [
    ['Industry', 'Luxury Wedding Signage'],
    ['Market', 'Florida'],
    ['Focus', 'Website Design + Brand Positioning'],
    ['Primary Goal', 'Premium Custom Inquiries']
  ];

  const buildItems = [
    'Luxury editorial visual direction',
    'Refined inquiry flow for custom projects',
    'Signature Pieces structure',
    'Premium service positioning',
    'Cleaner hierarchy and spacing',
    'Stronger perceived value for high-end wedding clients'
  ];

  const strategyItems = [
    {
      title: 'Luxury Positioning',
      description:
        'The brand was positioned to feel custom, intentional, and elevated instead of looking like a generic wedding vendor.'
    },
    {
      title: 'Inquiry Experience',
      description:
        'The inquiry flow was structured to create a more refined first impression and guide serious clients toward starting a custom project.'
    },
    {
      title: 'Editorial Presentation',
      description:
        'The design direction used space, contrast, restrained copy, and premium pacing to create a more high-end brand experience.'
    }
  ];

  return (
    <>
      <SEOHead
        title="The Ever After Edit Website Case Study | RAH Operations"
        description="See how RAH Operations built a luxury editorial website and premium inquiry experience for The Ever After Edit."
        url={absoluteUrl('/case-studies/ever-after-edit')}
      />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_top_left,red,transparent_60%)]" />

        <div className="container-clean grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-red mb-6">
              Case Study — Luxury Wedding Brand
            </p>

            <h1 className="text-white mb-6">
              Turning The Ever After Edit Into a Premium Editorial Wedding Brand
            </h1>

            <p className="text-lg text-neutral-300 mb-8">
              A refined wedding signage website built around luxury positioning,
              editorial design, and a stronger inquiry experience for custom event projects.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Start a Project</Button>

              <Button href="https://www.everaftereditfl.com" variant="outline">
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

                <div className="p-6 bg-neutral-950">
                  <div className="mb-6">
                    <div className="h-4 w-28 bg-red-600 rounded mb-4" />
                    <div className="h-8 w-3/4 bg-neutral-700 rounded mb-3" />
                    <div className="h-4 w-1/2 bg-neutral-800 rounded" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-28 rounded-lg bg-neutral-900 border border-white/10" />
                    <div className="h-36 rounded-lg bg-neutral-900 border border-white/10" />
                    <div className="h-28 rounded-lg bg-neutral-900 border border-white/10" />
                  </div>

                  <div className="mt-5 h-10 w-36 rounded bg-red-600" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 h-40 w-40 bg-red-600 blur-[120px] opacity-35" />
          </div>
        </div>
      </section>

      {/* PROJECT SNAPSHOT */}
      <section className="section">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">The Challenge</p>

            <h2 className="mb-6">
              The Brand Could Not Afford to Look Basic
            </h2>

            <p className="mb-6">
              The Ever After Edit needed to avoid the common trap most wedding vendors fall into:
              looking handmade, small, or template-based when the offer is actually custom and premium.
            </p>

            <p>
              The site needed to feel elevated, refined, and intentional enough to support higher-value
              wedding projects while making the inquiry process feel curated and professional.
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
                  href="https://www.everaftereditfl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-950 underline underline-offset-4 hover:opacity-70"
                >
                  www.everaftereditfl.com
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
              We Built a Brand Experience,
              <br /> Not Just a Website
            </h2>

            <p>
              The goal was to make the digital experience feel like the type of event work the brand wants to attract:
              refined, selective, polished, and premium.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {strategyItems.map((item, index) => (
              <div
                key={item.title}
                className="surface p-8 rounded-2xl border border-neutral-200"
              >
                <p className="editorial-number mb-4">0{index + 1}</p>

                <h3 className="mb-3">{item.title}</h3>

                <p className="text-sm">{item.description}</p>
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
              A More Elevated Path From First Impression to Inquiry
            </h2>

            <p className="mb-6">
              RAH Operations created a cleaner website experience with stronger spacing,
              visual hierarchy, refined copy, and a more premium service structure.
            </p>

            <p>
              The site now supports custom signage inquiries through a stronger brand presence,
              clearer project categories, and a more intentional inquiry flow.
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

                <p className="text-sm">{item}</p>
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
              A More Premium Digital Presence for a More Premium Client
            </h2>

            <p className="text-neutral-300 mb-6">
              The new site helps The Ever After Edit feel more refined, more intentional,
              and more aligned with custom wedding clients who care about design quality.
            </p>

            <p className="text-neutral-300">
              Instead of feeling like a standard vendor site, the brand now has a digital experience
              that supports higher perceived value and stronger inquiry confidence.
            </p>
          </div>

          <div className="surface-dark rounded-2xl border border-white/10 p-8">
            <h3 className="text-white mb-6">The Shift</h3>

            <div className="space-y-6">
              <div>
                <p className="eyebrow eyebrow-red mb-2">Before</p>
                <p className="text-sm text-neutral-300">
                  Risk of looking like a small, template-based wedding vendor instead of a custom premium brand.
                </p>
              </div>

              <div>
                <p className="eyebrow eyebrow-red mb-2">After</p>
                <p className="text-sm text-neutral-300">
                  Editorial luxury positioning, stronger inquiry flow, and a more refined brand presentation.
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
            Premium Brands Need Premium Digital Experiences
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            If your website makes your business look smaller, cheaper, or less polished than it really is,
            it is costing you better clients.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default EverAfterEditCaseStudy;
