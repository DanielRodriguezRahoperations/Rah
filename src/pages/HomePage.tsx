import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="RAH Operations | Website Design, SEO & Business Growth Systems"
        description="RAH Operations builds websites, SEO systems, and digital growth infrastructure for businesses that want more visibility, trust, and qualified leads."
        url={absoluteUrl('/')}
      />

      <section className="section">
        <div className="container-clean max-w-4xl">
          <p className="eyebrow mb-6">RAH Operations</p>

          <h1 className="mb-6">
            We Build Websites and Growth Systems That Turn Attention Into Revenue
          </h1>

          <p className="mb-10 max-w-2xl text-lg">
            Most businesses do not have a traffic problem. They have a positioning,
            trust, and conversion problem. We fix that with strategy, design, SEO,
            and digital systems built to generate real opportunities.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button to="/contact">Start a Project</Button>
            <Button to="/case-studies" variant="outline">View Case Studies</Button>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">The Problem</p>
            <h2 className="mb-6">
              A Nice Website Is Useless If It Doesn’t Create Business
            </h2>

            <p className="mb-6">
              Most companies build websites backwards. They start with colors,
              images, and generic sections instead of strategy, search intent,
              messaging, and conversion.
            </p>

            <p>
              That is why the site may look fine but still fail to generate leads.
              We build from the business goal backward.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What We Fix</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-6">
                <span>Weak positioning</span>
                <span className="font-semibold">Clear authority</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>Poor search visibility</span>
                <span className="font-semibold">SEO structure</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>Low trust</span>
                <span className="font-semibold">Better perception</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>Low conversion</span>
                <span className="font-semibold">More inquiries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Case Studies</p>
            <h2 className="mb-4">
              Selected Work Built Around Positioning, SEO, and Conversion
            </h2>
            <p>
              These are not just websites. They are business assets built to make brands
              look stronger, communicate clearer, and convert better.
            </p>
          </div>

          <div className="divide-y border-y border-neutral-200">
            {[
              {
                title: 'Tier 1 Customs',
                category: 'Automotive Customization',
                description:
                  'A premium automotive customization website built for local SEO, service clarity, and high-intent lead generation.',
                link: '/case-studies/tier-1-customs'
              },
              {
                title: 'The Ever After Edit',
                category: 'Luxury Wedding Signage',
                description:
                  'A refined wedding signage website built around editorial design, premium positioning, and a stronger inquiry experience.',
                link: '/case-studies/ever-after-edit'
              },
              {
                title: 'The Scottsdale Injector',
                category: 'Medical Aesthetics',
                description:
                  'A premium aesthetics website built to strengthen trust, service clarity, and local brand authority.',
                link: '/case-studies/scottsdale-injector'
              }
            ].map((study, index) => (
              <article
                key={index}
                className="grid gap-8 py-10 lg:grid-cols-[0.8fr_1.4fr_auto] lg:items-start"
              >
                <div>
                  <p className="eyebrow mb-3">{study.category}</p>
                  <h3 className="text-2xl">{study.title}</h3>
                </div>

                <p>{study.description}</p>

                <div className="lg:text-right">
                  <Button to={study.link} variant="outline">
                    View Case Study
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">What We Build</p>
            <h2 className="mb-4">
              Growth Systems, Not Random Services
            </h2>
            <p>
              Every service connects back to visibility, trust, conversion, and business growth.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {[
              {
                title: 'Website Design & SEO',
                description:
                  'Custom websites built with search visibility, positioning, and conversion in mind.',
                link: '/website-design-and-seo'
              },
              {
                title: 'Digital Marketing',
                description:
                  'Marketing systems designed to attract better traffic and turn it into real opportunities.',
                link: '/digital-marketing'
              },
              {
                title: 'Social Media Management',
                description:
                  'Content strategy and management built to reinforce trust, authority, and brand consistency.',
                link: '/social-media-management'
              },
              {
                title: 'Reputation Management',
                description:
                  'Systems designed to strengthen online trust and improve how prospects perceive your business.',
                link: '/reputation-management'
              },
              {
                title: 'Business Credit & Funding',
                description:
                  'Credit and funding strategy designed to help businesses access capital and scale correctly.',
                link: '/business-credit-and-funding'
              },
              {
                title: 'Business Setup & Structuring',
                description:
                  'Formation and setup support designed to build the right foundation from day one.',
                link: '/new-business-setup'
              }
            ].map((service, index) => (
              <article key={index} className="card-clean">
                <h3 className="mb-3">{service.title}</h3>
                <p className="mb-6">{service.description}</p>
                <Button to={service.link} variant="outline">
                  Learn More
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Approach</p>
            <h2 className="mb-6">
              Built Like a Sales System, Not a Brochure
            </h2>

            <p className="mb-6">
              Your website should answer the questions prospects are already asking:
              Can I trust you? Do you understand my problem? Are you the right choice?
              What should I do next?
            </p>

            <p>
              We build around those decisions so your site supports sales before
              you ever get on a call.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: 'Positioning First',
                description:
                  'We clarify what makes the business worth choosing before designing anything.'
              },
              {
                title: 'Search Built In',
                description:
                  'SEO structure is planned early so the site can support long-term visibility.'
              },
              {
                title: 'Conversion Path',
                description:
                  'Every page is designed to guide visitors toward the next logical action.'
              }
            ].map((item, index) => (
              <div key={index} className="border-b border-neutral-200 pb-6">
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <p className="eyebrow mb-4">Start Here</p>

          <h2 className="mb-6">
            If Your Website Isn’t Helping You Close, It’s Holding You Back
          </h2>

          <p className="mx-auto mb-10 max-w-xl">
            We’ll review where your business stands now and show you what needs to happen next.
          </p>

          <Button to="/contact">Start a Project</Button>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Project"
            subtitle="Tell us what you're building. We'll show you how to turn it into a growth system."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
