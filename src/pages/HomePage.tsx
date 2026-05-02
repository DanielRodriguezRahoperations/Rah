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
        description="Website design, website development, and SEO in Scottsdale and Phoenix."
        url={absoluteUrl('/')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        
        {/* MOBILE IMAGE */}
        <div className="block h-[420px] overflow-hidden lg:hidden">
          <img
            src="/newhero.png"
            alt="RAH Operations workspace"
            className="h-full w-full object-cover"
            style={{ objectPosition: '70% center' }}
          />
        </div>

        {/* DESKTOP IMAGE */}
        <div className="absolute bottom-0 right-[-7%] top-0 hidden w-[72%] lg:block">
          <img
            src="/newhero.png"
            alt="RAH Operations workspace"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/55 via-[#111111]/18 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="container-clean relative py-14 lg:flex lg:min-h-[780px] lg:items-center lg:py-28">
          <div className="max-w-[720px]">
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
              <Button to="/case-studies" variant="secondary">
                View Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section bg-[#fbfaf7]">
        <div className="container-clean">
          <div className="mb-16 max-w-4xl">
            <p className="eyebrow-red mb-4">The Problem</p>

            <h2>
              Pretty Websites Don’t Pay the Bills.
              <br />
              Performing Websites Do.
            </h2>
          </div>

          <img
            src="/theproblem.png"
            alt="Website problems"
            className="w-full rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-dark grain py-24">
        <div className="container-clean relative">
          <div className="mb-20 text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Our Website Design Process
            </p>

            <h2 className="text-white">
              Strategy. Design. Development. Launch. Growth.
            </h2>
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
                <div className="mb-5 text-6xl font-bold text-[#d14b4b]">
                  {step[0]}
                </div>

                <h3 className="mb-4 text-2xl text-white">
                  {step[1]}
                </h3>

                <p className="text-sm text-neutral-300">
                  {step[2]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section">
        <div className="container-clean">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow mb-4">Featured Work</p>

            <h2>
              Websites Built to Make Businesses Look Sharper and Convert Better
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {[
              {
                title: 'Tier 1 Customs',
                category: 'Automotive / Local SEO',
                copy: 'A stronger digital presence built around service clarity, premium positioning, and local search intent.',
                link: '/case-studies/tier-1-customs'
              },
              {
                title: 'The Ever After Edit',
                category: 'Luxury Wedding Brand',
                copy: 'A refined website experience built for high-end perception, cleaner inquiry flow, and stronger brand trust.',
                link: '/case-studies/ever-after-edit'
              }
            ].map((study) => (
              <article key={study.title} className="surface-white overflow-hidden">
                <div className="bg-[#111111] p-6">
                  <div className="rounded-t-xl border border-white/10 bg-[#1a1a1a] p-3">
                    <div className="mb-3 flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#d14b4b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                    </div>

                    <div className="bg-[#fbfaf7] p-5">
                      <div className="mb-4 h-2 w-24 bg-[#7a1c1c]" />
                      <div className="mb-3 h-7 w-3/4 bg-neutral-950" />
                      <div className="mb-6 h-7 w-1/2 bg-neutral-300" />

                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-20 bg-white shadow-sm" />
                        <div className="h-20 bg-neutral-200 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="eyebrow-red mb-3">{study.category}</p>
                  <h3 className="mb-4">{study.title}</h3>
                  <p className="mb-8">{study.copy}</p>

                  <Button to={study.link} variant="outline">
                    View Case Study
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Project"
            subtitle="Tell us what you're building. We'll show you how to turn it into a website that actually performs."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
