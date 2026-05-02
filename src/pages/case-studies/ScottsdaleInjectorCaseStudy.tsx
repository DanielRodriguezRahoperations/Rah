import React from 'react';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const ScottsdaleInjectorCaseStudy = () => {
  const projectStats = [
    ['Industry', 'Medical Aesthetics'],
    ['Market', 'Scottsdale, Arizona'],
    ['Focus', 'Website Design + Local Authority'],
    ['Primary Goal', 'Trust + Client Inquiries']
  ];

  const buildItems = [
    'Premium medical aesthetics positioning',
    'Clear treatment and service presentation',
    'Trust-focused page structure',
    'Scottsdale local authority messaging',
    'Improved inquiry and booking path',
    'Professional visual experience built around credibility'
  ];

  const strategyItems = [
    {
      title: 'Trust First',
      description:
        'The website needed to immediately communicate professionalism, experience, and credibility in a market where trust drives action.'
    },
    {
      title: 'Service Clarity',
      description:
        'Treatments needed to be easier to understand so visitors could quickly identify the right service and feel confident taking the next step.'
    },
    {
      title: 'Local Authority',
      description:
        'The site was structured to support Scottsdale brand relevance and help position the provider as a premium local option.'
    }
  ];

  return (
    <>
      <SEOHead
        title="The Scottsdale Injector Website Case Study | RAH Operations"
        description="See how RAH Operations built a premium medical aesthetics website for The Scottsdale Injector focused on trust, service clarity, and local authority."
        url={absoluteUrl('/case-studies/scottsdale-injector')}
      />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_top_left,red,transparent_60%)]" />

        <div className="container-clean grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-red mb-6">
              Case Study — Medical Aesthetics
            </p>

            <h1 className="text-white mb-6">
              Building a Premium Digital Presence for The Scottsdale Injector
            </h1>

            <p className="text-lg text-neutral-300 mb-8">
              A premium medical aesthetics website built to strengthen trust,
              improve service clarity, and position the brand as a credible
              Scottsdale provider.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Start a Project</Button>

              <Button href="https://www.thescottsdaleinjector.com" variant="outline">
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 rounded-lg bg-neutral-900 border border-white/10" />
                    <div className="h-32 rounded-lg bg-neutral-900 border border-white/10" />
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
              In Aesthetics, Weak Presentation Kills Trust
            </h2>

            <p className="mb-6">
              Medical aesthetics is not a casual purchase. Clients are comparing
              experience, professionalism, treatment knowledge, visual standards,
              and trust before they ever book.
            </p>

            <p>
              The Scottsdale Injector needed a website that felt polished, credible,
              and premium from the first interaction while making services easier
              to understand and inquiries easier to submit.
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
                  href="https://www.thescottsdaleinjector.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-950 underline underline-offset-4 hover:opacity-70"
                >
                  www.thescottsdaleinjector.com
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
              We Built the Site Around Trust,
              <br /> Clarity, and Confidence
            </h2>

            <p>
              The goal was not just to make the website look better.
              The goal was to make the brand feel safer, more credible,
              and easier to choose.
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
              A Website Designed to Build Confidence Before the First Appointment
            </h2>

            <p className="mb-6">
              RAH Operations created a more polished digital presence that presents
              The Scottsdale Injector as professional, established, and service-focused.
            </p>

            <p>
              The site supports client education, local credibility, and conversion
              by making treatments easier to understand and the next step easier to take.
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
              A More Credible, Premium Website for a Trust-Heavy Market
            </h2>

            <p className="text-neutral-300 mb-6">
              The new website gives The Scottsdale Injector a stronger first impression,
              clearer treatment presentation, and a more polished foundation for client inquiries.
            </p>

            <p className="text-neutral-300">
              Instead of relying only on referrals or social media, the brand now has
              a professional digital asset that supports trust, search, and conversion.
            </p>
          </div>

          <div className="surface-dark rounded-2xl border border-white/10 p-8">
            <h3 className="text-white mb-6">The Shift</h3>

            <div className="space-y-6">
              <div>
                <p className="eyebrow eyebrow-red mb-2">Before</p>
                <p className="text-sm text-neutral-300">
                  Limited digital trust signals and less structured service education for new visitors.
                </p>
              </div>

              <div>
                <p className="eyebrow eyebrow-red mb-2">After</p>
                <p className="text-sm text-neutral-300">
                  Premium aesthetics positioning, clearer service flow, and stronger Scottsdale brand authority.
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
            In Trust-Based Industries, Presentation Is Not Optional
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            If your website does not build confidence quickly,
            prospects will compare you to someone who does.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default ScottsdaleInjectorCaseStudy;
