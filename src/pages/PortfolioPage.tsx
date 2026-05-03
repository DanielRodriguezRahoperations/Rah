import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

interface PortfolioItem {
  title: string;
  url: string;
  category: string;
  description: string;
  focus: string;
  positioning: string;
  proof: string[];
  image?: string;
  caseStudy?: string;
  featured?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Tier 1 Customs',
    url: 'https://www.tier1customs.com',
    category: 'Automotive Customization',
    description:
      'A premium automotive website built for high-end vehicle wraps, paint protection film, ceramic coating, and local service visibility.',
    focus: 'Website Design, SEO, Local Service Pages',
    positioning: 'Built to make a local automotive brand feel sharper, more credible, and easier to choose.',
    proof: ['Premium service hierarchy', 'Local SEO structure', 'High-intent service flow'],
    image: '/t1.png',
    caseStudy: '/case-studies/tier-1-customs',
    featured: true
  },
  {
    title: 'The Ever After Edit',
    url: 'https://www.everaftereditfl.com',
    category: 'Luxury Wedding Brand',
    description:
      'An editorial-style website designed for a refined wedding signage brand serving high-end custom event clients.',
    focus: 'Brand Positioning, Website Design',
    positioning: 'Built to feel romantic, elevated, and premium without looking like a generic wedding template.',
    proof: ['Luxury visual direction', 'Cleaner inquiry path', 'Elevated brand trust'],
    image: '/ee.png',
    caseStudy: '/case-studies/ever-after-edit',
    featured: true
  },
  {
    title: 'The Scottsdale Injector',
    url: 'https://www.thescottsdaleinjector.com',
    category: 'Medical Aesthetics',
    description:
      'A polished medical aesthetics website created to build authority, trust, and local search relevance.',
    focus: 'Website Design, Local SEO',
    positioning: 'Built to support credibility in a competitive aesthetics market where trust matters immediately.',
    proof: ['Authority-first layout', 'Service clarity', 'Local search intent'],
    caseStudy: '/case-studies/scottsdale-injector',
    featured: true
  },
  {
    title: 'Empire Builds AZ',
    url: 'https://www.empirebuildsaz.com',
    category: 'Construction',
    description:
      'A professional contractor website focused on service clarity, credibility, and lead generation.',
    focus: 'Website Design',
    positioning: 'Built to make construction services easier to understand and easier to request.',
    proof: ['Clear service structure', 'Professional presentation', 'Lead-focused CTA']
  },
  {
    title: 'Pinnacle Bookkeeping AZ',
    url: 'https://www.pinnaclebookkeepingaz.com',
    category: 'Bookkeeping',
    description:
      'A service-based website built for trust, clarity, and client acquisition.',
    focus: 'Website Design',
    positioning: 'Built to make bookkeeping services feel organized, reliable, and easy to start.',
    proof: ['Trust-first copy', 'Simple user path', 'Clean service framing']
  },
  {
    title: 'SunVision Solar',
    url: 'https://www.sunvision-solar.com',
    category: 'Solar',
    description:
      'A lead-focused solar website designed to educate homeowners and create clearer conversion paths.',
    focus: 'Website Design, Lead Generation',
    positioning: 'Built to simplify the solar decision and move homeowners toward a consultation.',
    proof: ['Lead generation focus', 'Homeowner education', 'Clear CTA structure']
  }
];

const PortfolioPage: React.FC = () => {
  const featuredProjects = portfolioItems.filter((project) => project.featured);
  const additionalProjects = portfolioItems.filter((project) => !project.featured);

  return (
    <>
      <SEOHead
        title="Website Portfolio Scottsdale & Phoenix | RAH Operations"
        description="Explore premium website design, local SEO, and high-conversion website projects built by RAH Operations for businesses in Scottsdale, Phoenix, and beyond."
        url={absoluteUrl('/portfolio')}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(122,28,28,0.32),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <div className="container-clean relative py-16 sm:py-20 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
                Portfolio / Website Design Work
              </p>

              <h1 className="mb-7 max-w-4xl text-[3.15rem] leading-[0.92] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Websites Built to Make Businesses Look More Valuable.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
                This is not a gallery of pretty screens. Every project is shaped around trust, service clarity, local search intent, and the path from visitor to inquiry.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm sm:p-7 lg:ml-auto lg:max-w-xl">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-neutral-400">
                Portfolio Standard
              </p>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ['01', 'Premium first impression'],
                  ['02', 'Clearer business positioning'],
                  ['03', 'Stronger conversion structure']
                ].map((item) => (
                  <div key={item[0]} className="border-t border-white/10 pt-4">
                    <p className="mb-1 text-sm font-semibold text-[#d14b4b]">{item[0]}</p>
                    <p className="text-sm leading-6 text-neutral-300">{item[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="mb-10 grid gap-7 lg:mb-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="eyebrow-red mb-4">Featured Builds</p>
              <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
                The Work Has to Sell the Business Before the Sales Call.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:ml-auto">
              A strong website changes how people judge the company. It should make the brand feel sharper, more trusted, and more prepared to solve the customer’s problem.
            </p>
          </div>

          <div className="grid gap-8 lg:gap-10">
            {featuredProjects.map((item, index) => (
              <article
                key={item.title}
                className={`grid overflow-hidden border border-neutral-200 bg-white shadow-[0_24px_75px_rgba(17,17,17,0.075)] lg:grid-cols-2 lg:shadow-[0_34px_100px_rgba(17,17,17,0.09)] ${
                  index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="bg-[#101010] p-3 sm:p-5 lg:p-7">
                  {item.image ? (
                    <div className="overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
                      <img
                        src={item.image}
                        alt={`${item.title} website portfolio preview`}
                        className="aspect-[16/11] w-full object-cover transition duration-500 hover:scale-[1.025] sm:aspect-[16/10]"
                      />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden border border-white/10 bg-[#151515] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.35)] sm:p-7">
                      <div className="mb-8 flex items-center gap-2 border-b border-white/10 pb-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#7a1c1c]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      </div>

                      <div className="space-y-4">
                        <div className="h-8 w-3/4 bg-white/10" />
                        <div className="h-3 w-full bg-white/10" />
                        <div className="h-3 w-5/6 bg-white/10" />
                      </div>

                      <div className="mt-10 grid gap-3 sm:grid-cols-2">
                        <div className="h-24 border border-white/10 bg-white/[0.035]" />
                        <div className="h-24 border border-white/10 bg-white/[0.035]" />
                      </div>

                      <div className="mt-8 border-l-2 border-[#7a1c1c] pl-4">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-neutral-400">{item.category}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                  <div>
                    <p className="eyebrow-red mb-4">{item.category}</p>
                    <h3 className="mb-4 text-3xl sm:text-4xl">{item.title}</h3>

                    <p className="mb-6 text-sm leading-6 sm:text-lg sm:leading-8">
                      {item.description}
                    </p>

                    <div className="mb-6 border-l-2 border-[#7a1c1c] pl-4 sm:pl-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950">
                        Strategic Positioning
                      </p>
                      <p className="text-sm leading-6 sm:text-base sm:leading-7">{item.positioning}</p>
                    </div>

                    <div className="mb-7 grid gap-3 sm:grid-cols-3">
                      {item.proof.map((proofItem) => (
                        <div key={proofItem} className="border border-neutral-200 bg-[#fbfaf7] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800">
                            {proofItem}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:flex sm:flex-wrap">
                    {item.caseStudy && (
                      <Button to={item.caseStudy} className="w-full sm:w-auto">
                        View Case Study
                      </Button>
                    )}

                    <Button href={item.url} variant="outline" className="w-full sm:w-auto">
                      Visit Website
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL PROJECTS */}
      <section className="section bg-white py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="mb-10 max-w-4xl lg:mb-16">
            <p className="eyebrow-red mb-4">Additional Work</p>
            <h2 className="text-[2.45rem] sm:text-5xl lg:text-6xl">
              Clean, Strategic Websites for Service-Based Businesses.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {additionalProjects.map((item, index) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden border border-neutral-200 bg-[#fbfaf7] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#7a1c1c]/50 hover:bg-white hover:shadow-[0_28px_80px_rgba(17,17,17,0.08)] sm:p-7 ${
                  index === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="absolute right-5 top-5 text-5xl font-semibold text-[#7a1c1c]/10">
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  <p className="eyebrow-red mb-4">{item.category}</p>
                  <h3 className="mb-4 text-3xl">{item.title}</h3>

                  <p className="mb-6 text-sm leading-6 sm:text-base sm:leading-7">
                    {item.description}
                  </p>

                  <div className="mb-7 border-t border-neutral-200 pt-5">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Focus
                    </p>
                    <p className="text-sm font-semibold text-neutral-900">{item.focus}</p>
                  </div>

                  <Button href={item.url} variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO METHOD */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(122,28,28,0.28),transparent_30%),linear-gradient(135deg,#111111_0%,#171717_55%,#0b0b0b_100%)]" />

        <div className="container-clean relative py-16 sm:py-20 lg:py-32">
          <div className="mb-10 grid gap-7 lg:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d14b4b]">
                What This Work Proves
              </p>

              <h2 className="text-[2.45rem] text-white sm:text-5xl lg:text-6xl">
                The Website Has to Make the Business Easier to Trust.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 lg:ml-auto">
              Pretty is not enough. The real standard is whether the website makes the business clearer, sharper, more credible, and easier to contact.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {[
              ['Positioning', 'The site must explain why the business is worth choosing.'],
              ['Visual Authority', 'The design must make the brand feel serious and premium.'],
              ['SEO Structure', 'The pages must support local search and service relevance.'],
              ['Conversion Path', 'The visitor must know exactly what to do next.']
            ].map((item, index) => (
              <article
                key={item[0]}
                className={`border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm sm:p-7 ${
                  index % 2 === 1 ? 'lg:mt-12' : ''
                }`}
              >
                <p className="mb-8 text-5xl font-semibold leading-none text-[#7a1c1c]/70">
                  0{index + 1}
                </p>
                <h3 className="mb-4 text-2xl text-white">{item[0]}</h3>
                <p className="text-sm leading-6 text-neutral-300">{item[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#fbfaf7] py-16 sm:py-20 lg:py-32">
        <div className="container-clean">
          <div className="mx-auto max-w-5xl border border-neutral-200 bg-white p-6 text-center shadow-[0_30px_90px_rgba(17,17,17,0.075)] sm:p-10 lg:p-14">
            <p className="eyebrow-red mb-5">Start Here</p>

            <h2 className="mx-auto mb-6 max-w-4xl text-[2.45rem] sm:text-5xl lg:text-6xl">
              Your Website Should Make Your Business Look Like the Obvious Choice.
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Send us your current website. We’ll identify what is making it feel generic, unclear, or underbuilt, then show you how to make it stronger.
            </p>

            <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
              <Button to="/contact" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>

              <Button to="/case-studies" variant="outline" size="lg" className="w-full sm:w-auto">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
