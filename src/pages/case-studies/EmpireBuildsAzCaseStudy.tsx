import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const EmpireBuildsAzCaseStudy = () => {
  const projectStats = [
    ['Industry', 'Construction / Contractor Services'],
    ['Market', 'Arizona'],
    ['Focus', 'Website Design + Service Clarity'],
    ['Primary Goal', 'Credibility + Lead Inquiries']
  ];

  const buildItems = [
    'Premium contractor website positioning',
    'Clear construction service presentation',
    'Trust-focused page structure',
    'Arizona market credibility messaging',
    'Cleaner inquiry and consultation path',
    'Professional visual experience built around confidence'
  ];

  const strategyItems = [
    {
      title: 'Credibility First',
      description:
        'The website needed to make Empire Builds AZ look professional, reliable, and capable from the first impression.'
    },
    {
      title: 'Service Clarity',
      description:
        'Construction visitors need to quickly understand what the company does, what type of projects it handles, and how to take the next step.'
    },
    {
      title: 'Lead Flow',
      description:
        'The site was structured to remove confusion and guide visitors toward contacting the business for project inquiries.'
    }
  ];

  const outcomeItems = [
    ['Before', 'A basic digital presence that did not fully communicate professionalism, service clarity, or project confidence.'],
    ['After', 'A sharper contractor website with stronger positioning, cleaner service flow, and a better path to inquiry.']
  ];

  return (
    <>
      <SEOHead
        title="Empire Builds AZ Website Case Study | RAH Operations"
        description="See how RAH Operations built a professional construction website for Empire Builds AZ focused on credibility, service clarity, and lead generation."
        url={absoluteUrl('/case-studies/empire-builds-az')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(122,28,28,0.34),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.08),transparent_22%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <div className="container-clean relative grid gap-10 py-16 sm:py-20 lg:min-h-[760px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:py-28">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Case Study / Construction Website
            </p>

            <h1 className="mb-7 max-w-4xl text-[3.15rem] leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              Building a Stronger Digital Presence for Empire Builds AZ.
            </h1>

            <p className="mb-9 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
              A professional contractor website built to make the brand feel more credible, clearly explain services, and create a cleaner path from visitor to project inquiry.
            </p>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Button to="/contact" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>

              <Button href="https://www.empirebuildsaz.com" variant="dark" size="lg" className="w-full sm:w-auto">
                View Live Website
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 hidden h-44 w-44 border border-[#7a1c1c]/50 lg:block" />
            <div className="absolute -bottom-8 right-4 hidden h-56 w-56 bg-[#7a1c1c]/20 blur-3xl lg:block" />

            <div className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-2 shadow-[0_35px_110px_rgba(0,0,0,0.46)] backdrop-blur-sm sm:p-3 lg:rotate-[1deg]">
              <div className="overflow-hidden border border-white/10 bg-[#111111]">
                <img
                  src="/emp.png"
                  alt="Empire Builds AZ website case study preview"
                  className="h-[300px] w-full object-cover sm:h-[440px] lg:h-[600px]"
                />
              </div>

              <div className="border-t border-white/10 bg-[#111111]/92 p-4 backdrop-blur-md sm:absolute sm:bottom-8 sm:left-8 sm:right-8 sm:border">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-[10px] sm:tracking-[0.24em]">
                    Contractor Website System
                  </p>
                  <span className="h-2 w-2 rounded-full bg-[#d14b4b]" />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {['Trust', 'Services', 'Leads'].map((item) => (
                    <div key={item} className="border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-sm font-semibold text-white">{item}</p>
                      <div className="mt-3 h-1.5 w-full bg-white/10">
                        <div className="h-full w-3/4 bg-[#7a1c1c]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SNAPSHOT */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow-red mb-4">The Challenge</p>

            <h2 className="mb-6 text-[2.45rem] sm:text-5xl lg:text-6xl">
              Contractor Websites Cannot Afford to Look Unclear or Underbuilt.
            </h2>

            <p className="mb-6 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Construction clients are not just buying a service. They are trusting a company with property, timelines, budgets, and project execution. That trust starts before the first phone call.
            </p>

            <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Empire Builds AZ needed a website that felt professional, organized, and easy to understand while giving visitors a clear reason to reach out.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-6 shadow-[0_28px_90px_rgba(17,17,17,0.075)] sm:p-8 lg:p-10">
            <h3 className="mb-7 text-3xl">Project Snapshot</h3>

            <div className="space-y-5 text-sm">
              {projectStats.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6 border-b border-neutral-200 pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-neutral-500">{label}</span>
                  <span className="text-right font-semibold text-neutral-950">
                    {value}
                  </span>
                </div>
              ))}

              <div className="pt-2">
                <a
                  href="https://www.empirebuildsaz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-950 underline underline-offset-4 hover:opacity-70"
                >
                  www.empirebuildsaz.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.28),transparent_30%),linear-gradient(135deg,#111111_0%,#171717_55%,#0b0b0b_100%)]" />

        <div className="container-clean relative py-16 sm:py-20 lg:py-32">
          <div className="mb-10 grid gap-7 lg:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
                Strategic Build
              </p>

              <h2 className="text-[2.45rem] text-white sm:text-5xl lg:text-6xl">
                We Built the Site Around Credibility, Clarity, and Action.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 lg:ml-auto">
              The goal was not just to make the website look better. The goal was to make the company feel more capable, more professional, and easier to contact.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {strategyItems.map((item, index) => (
              <article
                key={item.title}
                className={`border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm sm:p-7 ${
                  index === 1 ? 'md:mt-10' : ''
                }`}
              >
                <p className="mb-8 text-5xl font-semibold leading-none text-[#7a1c1c]/70">
                  0{index + 1}
                </p>

                <h3 className="mb-4 text-2xl text-white">{item.title}</h3>

                <p className="text-sm leading-6 text-neutral-300 sm:text-base sm:leading-7">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="section bg-white py-16 sm:py-20 lg:py-32">
        <div className="container-clean grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow-red mb-4">What We Built</p>

            <h2 className="mb-6 text-[2.45rem] sm:text-5xl lg:text-6xl">
              A Contractor Website Designed to Build Confidence Before the First Estimate.
            </h2>

            <p className="mb-6 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              RAH Operations created a more polished digital presence that presents Empire Builds AZ as professional, reliable, and service-focused.
            </p>

            <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              The site supports trust, service education, and lead generation by making the company’s work easier to understand and the next step easier to take.
            </p>
          </div>

          <div className="grid gap-4">
            {buildItems.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 border border-neutral-200 bg-[#fbfaf7] p-5 transition-all duration-300 hover:border-[#7a1c1c]/40 hover:bg-white hover:shadow-[0_22px_70px_rgba(17,17,17,0.06)]"
              >
                <span className="shrink-0 text-sm font-semibold text-[#7a1c1c]">
                  0{index + 1}
                </span>

                <p className="text-sm leading-6 sm:text-base sm:leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow-red mb-4">The Outcome</p>

            <h2 className="mb-6 text-[2.45rem] sm:text-5xl lg:text-6xl">
              A More Credible Website for a Trust-Driven Construction Brand.
            </h2>

            <p className="mb-6 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              The new website gives Empire Builds AZ a stronger first impression, clearer service presentation, and a more professional foundation for project inquiries.
            </p>

            <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Instead of looking like another basic contractor site, the brand now has a sharper digital asset that supports credibility, clarity, and conversion.
            </p>
          </div>

          <div className="overflow-hidden border border-neutral-200 bg-white shadow-[0_28px_90px_rgba(17,17,17,0.075)]">
            {outcomeItems.map(([label, copy], index) => (
              <div
                key={label}
                className={`p-6 sm:p-8 lg:p-10 ${
                  index === 1 ? 'bg-[#111111] text-white' : 'border-b border-neutral-200'
                }`}
              >
                <p className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] ${
                  index === 1 ? 'text-[#d14b4b]' : 'text-neutral-500'
                }`}
                >
                  {label}
                </p>

                <p className={`text-sm leading-6 sm:text-base sm:leading-7 ${
                  index === 1 ? 'text-neutral-300' : 'text-neutral-600'
                }`}
                >
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.28),transparent_30%),linear-gradient(135deg,#111111_0%,#171717_55%,#0b0b0b_100%)]" />

        <div className="container-clean relative py-16 text-center sm:py-20 lg:py-32">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
            Start Here
          </p>

          <h2 className="mx-auto mb-6 max-w-4xl text-[2.45rem] text-white sm:text-5xl lg:text-6xl">
            Contractor Websites Should Make the Business Look Like the Safer Choice.
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
            If your website does not build confidence quickly, prospects will compare you to someone who looks more prepared, more polished, and easier to trust.
          </p>

          <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
            <Button to="/contact" size="lg" className="w-full sm:w-auto">
              Start a Project
            </Button>

            <Button to="/portfolio" variant="dark" size="lg" className="w-full sm:w-auto">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmpireBuildsAzCaseStudy;
