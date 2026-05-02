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
      <section className="relative min-h-[780px] overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0">
          <img
            src="/newhero.png"
            alt="RAH Operations workspace"
            className="h-full w-full object-cover scale-[1.05]"
            style={{ objectPosition: '70% center' }} // 🔥 pushes laptop right
          />

          {/* smarter gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-transparent" />
        </div>

        <div className="container-clean relative flex min-h-[780px] items-center py-28">
          <div className="max-w-3xl">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
              Scottsdale Website Design / Phoenix SEO
            </p>

            <h1 className="mb-8 text-white drop-shadow-2xl">
              Your Website Should Be Your Best Salesperson.
            </h1>

            <p className="mb-10 max-w-2xl text-lg text-neutral-200">
              We build premium websites for Scottsdale and Phoenix businesses that need more than a pretty homepage.
            </p>

            <div className="flex gap-4">
              <Button to="/contact">Start a Project</Button>
              <Button to="/case-studies" variant="secondary">View Work</Button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION (THIS IS THE CORRECT WAY) */}
      <section className="section bg-[#fbfaf7]">
        <div className="container-clean">
          <div className="mb-16 max-w-4xl">
            <p className="eyebrow-red mb-4">The Problem</p>
            <h2>Pretty Websites Don’t Pay the Bills. Performing Websites Do.</h2>
          </div>

          <div className="relative">
            <img
              src="/theproblem.png"
              alt="Website problems"
              className="w-full"
            />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 hidden lg:block">
              <div className="grid h-full grid-cols-4">
                {[
                  ['01', 'No Local SEO', 'Your site does not show up when customers search in Scottsdale or Phoenix.'],
                  ['02', 'Weak Design', 'The business looks average before the first conversation starts.'],
                  ['03', 'No Conversion Path', 'Visitors land on the site but do not know what to do next.'],
                  ['04', 'No Trust System', 'No case studies, proof, reviews, or authority structure.']
                ].map((item) => (
                  <div key={item[0]} className="flex items-end pb-[8%] px-[12%]">
                    <div>
                      <p className="text-4xl font-bold text-[#8f1d1d] mb-3">
                        {item[0]}
                      </p>

                      <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                        {item[1]}
                      </h3>

                      <div className="h-[2px] w-6 bg-[#8f1d1d] mb-3" />

                      <p className="text-sm text-neutral-700 leading-relaxed max-w-[220px]">
                        {item[2]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE FALLBACK */}
            <div className="grid gap-6 lg:hidden mt-10">
              {[
                ['01', 'No Local SEO', 'Your site does not show up when customers search in Scottsdale or Phoenix.'],
                ['02', 'Weak Design', 'The business looks average before the first conversation starts.'],
                ['03', 'No Conversion Path', 'Visitors land on the site but do not know what to do next.'],
                ['04', 'No Trust System', 'No case studies, proof, reviews, or authority structure.']
              ].map((item) => (
                <div key={item[0]} className="bg-white p-6 shadow-md">
                  <p className="text-3xl font-bold text-[#8f1d1d] mb-2">{item[0]}</p>
                  <h3 className="font-semibold mb-2">{item[1]}</h3>
                  <p className="text-sm text-neutral-600">{item[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Project"
            subtitle="Tell us what you're building."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
