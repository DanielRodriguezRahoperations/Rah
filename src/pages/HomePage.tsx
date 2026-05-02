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

      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0">
          <img
            src="/newhero.png"
            alt="RAH Operations premium website design and SEO workspace"
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-[#111111]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30" />
        </div>

        <div className="container-clean relative py-28 lg:py-40">
          <div className="max-w-3xl">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Scottsdale Website Design / Phoenix SEO
            </p>

            <h1 className="mb-8 max-w-4xl text-white">
              Your Website Should Be Your Best Salesperson.
            </h1>

            <p className="mb-10 max-w-2xl text-lg text-neutral-300">
              We build premium websites for Scottsdale and Phoenix businesses that need more than a pretty homepage. We build for local SEO, trust, conversion, and real lead generation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Start a Project</Button>
              <Button to="/case-studies" variant="secondary">View Work</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#fbfaf7]">
        <div className="container-clean">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow-red mb-4">The Problem</p>
            <h2>Pretty Websites Don’t Pay the Bills. Performing Websites Do.</h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#fbfaf7]">
            <img
              src="/theproblem.png"
              alt="Four premium website problem panels"
              className="absolute inset-0 hidden h-full w-full object-cover lg:block"
            />

            <div className="relative grid gap-6 p-0 lg:grid-cols-4 lg:gap-8 lg:px-8 lg:py-12">
              {[
                ['01', 'No Local SEO', 'Your site does not show up when customers search in Scottsdale or Phoenix.'],
                ['02', 'Weak Design', 'The business looks average before the first conversation starts.'],
                ['03', 'No Conversion Path', 'Visitors land on the site but do not know what to do next.'],
                ['04', 'No Trust System', 'No case studies, proof, reviews, or authority structure.']
              ].map((item) => (
                <div
                  key={item[0]}
                  className="min-h-[280px] bg-white/92 p-7 shadow-xl backdrop-blur-sm lg:min-h-[330px]"
                >
                  <span className="editorial-number block text-6xl font-bold">
                    {item[0]}
                  </span>

                  <h3 className="mt-8 mb-4 text-xl">
                    {item[1]}
                  </h3>

                  <p className="text-sm leading-relaxed">
                    {item[2]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="section">
        <div className="container-clean">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow mb-4">Featured Work</p>
            <h2>Websites Built to Make Businesses Look Sharper and Convert Better</h2>
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
                  <Button to={study.link} variant="outline">View Case Study</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow-red mb-4">What We Build</p>
            <h2>Not Random Services. A Growth System.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              ['Website Design & Development', '/website-design-and-seo'],
              ['Local SEO Optimization', '/website-design-and-seo'],
              ['Digital Marketing', '/digital-marketing'],
              ['Reputation Management', '/reputation-management']
            ].map((service) => (
              <Button key={service[0]} to={service[1]} variant="secondary" className="justify-between">
                {service[0]}
              </Button>
            ))}
          </div>
        </div>
      </section>

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
