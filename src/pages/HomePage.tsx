import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="Website Design Scottsdale | High-Converting Websites That Generate Leads"
        description="Website design, website development, and SEO in Scottsdale and Phoenix. RAH Operations builds premium websites designed to rank locally, convert visitors, and generate leads."
        url={absoluteUrl('/')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0">
          <img
            src="/newhero.png"
            alt="RAH Operations premium website design and SEO workspace"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/95 via-[#111111]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-[#111111]/20" />
        </div>

        <div className="container-clean relative py-28 lg:py-44">
          <div className="max-w-3xl">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Scottsdale Website Design / Phoenix SEO
            </p>

            <h1 className="mb-8 text-white drop-shadow-2xl">
              Your Website Should Be Your Best Salesperson.
            </h1>

            <p className="mb-10 max-w-2xl text-lg text-neutral-200">
              We build premium websites for Scottsdale and Phoenix businesses that need more than a pretty homepage. We build for local SEO, trust, conversion, and real lead generation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Start a Project</Button>
              <Button to="/case-studies" variant="secondary">View Work</Button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section bg-[#fbfaf7]">
        <div className="container-clean">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow-red mb-4">The Problem</p>
            <h2>Pretty Websites Don’t Pay the Bills. Performing Websites Do.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'No Local SEO', 'Your site does not show up when customers search in Scottsdale or Phoenix.'],
              ['02', 'Weak Design', 'The business looks average before the first conversation starts.'],
              ['03', 'No Conversion Path', 'Visitors land on the site but do not know what to do next.'],
              ['04', 'No Trust System', 'No case studies, proof, reviews, or authority structure.']
            ].map((item, index) => (
              <div
                key={item[0]}
                className="group relative min-h-[390px] overflow-hidden bg-white shadow-[0_25px_80px_rgba(0,0,0,0.10)]"
              >
                {/* IMAGE TOP */}
                <div className="h-[190px] overflow-hidden bg-[#111111]">
                  <img
                    src="/theproblem.png"
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                    style={{
                      objectPosition:
                        index === 0
                          ? 'left center'
                          : index === 1
                          ? '35% center'
                          : index === 2
                          ? '65% center'
                          : 'right center'
                    }}
                  />
                </div>

                {/* CONTENT */}
                <div className="relative p-7">
                  <span className="mb-5 block text-5xl font-bold text-[#7a1c1c]">
                    {item[0]}
                  </span>

                  <h3 className="mb-3 text-xl text-neutral-950">
                    {item[1]}
                  </h3>

                  <p className="text-sm leading-relaxed text-neutral-700">
                    {item[2]}
                  </p>
                </div>

                {/* CORNERS */}
                <div className="absolute left-0 top-0 h-10 w-10 border-l border-t border-[#7a1c1c]" />
                <div className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-[#7a1c1c]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-dark grain py-24">
        <div className="container-clean relative">
          <div className="mb-20 text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Our Website Design Process
            </p>
            <h2 className="text-white">Strategy. Design. Development. Launch. Growth.</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {[
              ['01', 'Strategy', 'We study the business, market, competitors, offer, and local search opportunities.'],
              ['02', 'Design', 'We create a premium visual direction built around trust, clarity, and conversion.'],
              ['03', 'Development', 'We build clean, responsive, SEO-ready pages that work across devices.'],
              ['04', 'Launch', 'We check performance, metadata, redirects, mobile flow, and core page structure.'],
              ['05', 'Growth', 'We continue improving SEO, content, reputation, and conversion opportunities.']
            ].map((step, index) => (
              <div key={step[0]} className={`${index % 2 === 1 ? 'lg:mt-16' : ''}`}>
                <div className="mb-5 text-6xl font-bold text-[#d14b4b]">{step[0]}</div>
                <h3 className="mb-4 text-2xl text-white">{step[1]}</h3>
                <p className="text-sm text-neutral-300">{step[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#111111] text-white">
        <div className="container-clean text-center">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
            Start Here
          </p>

          <h2 className="mx-auto mb-8 max-w-3xl text-white">
            If Your Website Looks Average, Your Business Feels Average.
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-neutral-300">
            RAH Operations builds websites for Scottsdale and Phoenix businesses that need stronger visibility, better trust, and a cleaner path from visitor to lead.
          </p>

          <Button to="/contact">Start a Project</Button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Project"
            subtitle="Tell us what you're building. We'll show you how to turn it into a website and growth system that actually performs."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
