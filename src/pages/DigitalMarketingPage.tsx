import React from 'react';
import {
  Search,
  Target,
  BarChart3,
  Globe,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Users,
  Shield,
  Megaphone,
  LineChart,
} from 'lucide-react';

import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import InternalLinks from '../components/ui/InternalLinks';
import { absoluteUrl } from '../utils/url';

const DigitalMarketingPage = () => {
  const services = [
    {
      icon: Search,
      title: 'Search Engine Optimization',
      shortDescription:
        'Capture high-intent traffic from people already searching for what you do.',
      points: [
        'Local keyword targeting for Scottsdale, Phoenix, and surrounding areas',
        'On-page optimization that improves rankings and usability',
        'Service page structure built to rank and convert',
        'Technical cleanup to support crawlability and site performance',
      ],
      details:
        'SEO should not be treated like blog fluff and title tag edits. The goal is to put your business in front of buyers who are actively searching, then give them a page that earns the call or form submission. That means strategy, structure, local relevance, and conversion-focused content all working together.',
    },
    {
      icon: Megaphone,
      title: 'Paid Advertising',
      shortDescription:
        'Generate leads faster with campaigns built around intent, not empty clicks.',
      points: [
        'Google Ads strategy focused on qualified lead flow',
        'Ad messaging aligned with the offer and landing page',
        'Retargeting to recover missed opportunities',
        'Performance tracking to cut waste and scale winners',
      ],
      details:
        'Running ads without a real offer, a real landing page, and real tracking is how businesses burn money. Paid traffic works when the message is clear, the audience is correct, and the conversion path is tight. That is the standard we build around.',
    },
    {
      icon: Globe,
      title: 'Website Conversion Strategy',
      shortDescription:
        'A good-looking website is not enough. It has to turn traffic into opportunities.',
      points: [
        'Clear page structure that guides visitors to take action',
        'Offer positioning that reduces friction and confusion',
        'CTA placement designed around user behavior',
        'Messaging built to create trust quickly',
      ],
      details:
        'Most websites are too vague, too passive, or too cluttered. If your site is not giving people a reason to trust you and a clear next step to take, traffic does not matter. We build pages that do both.',
    },
    {
      icon: BarChart3,
      title: 'Tracking and Optimization',
      shortDescription:
        'Every serious growth system needs visibility into what is working and what is wasting money.',
      points: [
        'Lead source visibility',
        'Campaign performance analysis',
        'Landing page and messaging refinement',
        'Ongoing optimization based on real behavior',
      ],
      details:
        'Without data, marketing decisions turn into guessing. We use tracking and performance analysis to identify where leads come from, what converts, and where your biggest opportunity sits so the system can improve over time.',
    },
  ];

  const authorityPoints = [
    {
      icon: Shield,
      title: 'Local market focus',
      description:
        'Arizona businesses need more than generic agency tactics. Local competition, local search behavior, and local positioning matter.',
    },
    {
      icon: Users,
      title: 'Built for actual buyers',
      description:
        'The goal is not random traffic. The goal is qualified opportunities from people who are ready to act.',
    },
    {
      icon: LineChart,
      title: 'Growth system thinking',
      description:
        'We do not treat SEO, ads, content, and conversion as separate projects. We connect them into one system.',
    },
  ];

  const portfolioItems = [
    {
      image: '/DigitalMarketing.png',
      title: 'Digital marketing campaign structure',
      description:
        'Campaign positioning, lead generation flow, and conversion-oriented execution built around business goals.',
      result: 'Stronger lead flow framework',
    },
    {
      image: '/Websitedesignandseo.png',
      title: 'Website and SEO integration',
      description:
        'Pages built to support rankings, clarity, and conversion instead of just looking polished.',
      result: 'Better ranking and conversion alignment',
    },
    {
      image: '/SocialMediaManagement.png',
      title: 'Content and visibility support',
      description:
        'Brand presence and supporting content strategy designed to reinforce trust and top-of-funnel demand.',
      result: 'More cohesive digital presence',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Audit the current situation',
      description:
        'We identify where the actual bottleneck is. Traffic, positioning, conversion, follow-up, or all of the above.',
    },
    {
      step: '02',
      title: 'Build the right offer and messaging',
      description:
        'If the market does not understand why to choose you, the rest of the system underperforms.',
    },
    {
      step: '03',
      title: 'Deploy traffic channels intentionally',
      description:
        'SEO, paid ads, local optimization, and supporting content are used based on the stage and goal of the business.',
    },
    {
      step: '04',
      title: 'Improve conversion points',
      description:
        'Landing pages, CTAs, page hierarchy, and trust signals get tightened so traffic has a real chance to convert.',
    },
    {
      step: '05',
      title: 'Measure and optimize',
      description:
        'We monitor what is creating qualified leads and refine the system around what actually performs.',
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to see results from digital marketing?',
      answer:
        'That depends on the channel. Paid advertising can generate lead activity faster, while SEO compounds over time and becomes a stronger long-term asset. The point is to build a system that creates both short-term momentum and long-term stability.',
    },
    {
      question: 'What makes your approach different from most agencies?',
      answer:
        'Most agencies sell disconnected services. We focus on the full path from visibility to conversion. If traffic is coming in but the site is weak, that gets fixed. If the offer is unclear, that gets fixed. If ads are spending without enough return, that gets fixed. The work follows the bottleneck.',
    },
    {
      question: 'Do I need SEO, paid ads, or both?',
      answer:
        'Some businesses need immediate lead generation. Others need stronger long-term search visibility. In many cases, the right answer is both, but not in equal weight. Strategy should follow the business stage, budget, and opportunity.',
    },
    {
      question: 'Can you help even if my current website is underperforming?',
      answer:
        'Yes. A weak website is one of the most common reasons marketing underperforms. If the site is vague, slow, cluttered, or weak at conversion, the traffic side will always feel disappointing.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Digital Marketing Scottsdale & Phoenix | RAH Operations"
        description="Digital marketing services for Scottsdale and Phoenix businesses focused on SEO, lead generation, conversion, and real growth."
        url={absoluteUrl('/digital-marketing')}
        keywords="digital marketing Scottsdale, digital marketing Phoenix, Arizona SEO company, lead generation agency Arizona, Scottsdale SEO services, Phoenix digital marketing agency"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-8 top-10 h-28 w-28 rounded-full bg-white blur-2xl" />
          <div className="absolute right-12 top-24 h-36 w-36 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-24 w-24 rounded-full bg-white blur-2xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0F6168]">
              Scottsdale and Phoenix Digital Marketing
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#0F6168] lg:text-6xl">
              If your business is not generating consistent leads online, you do not have a marketing system.
            </h1>

            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-[#104A53]">
              Most companies are posting, boosting, and guessing. That is not strategy.
              We build digital marketing systems that attract the right traffic, convert it
              into leads, and help you scale with more control.
            </p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" to="/contact" className="shadow-lg">
                Get a Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button size="lg" to="/portfolio" variant="outline">
                View Our Work
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="mb-1 text-sm font-semibold text-[#0F6168]">Lead Focused</div>
                <div className="text-sm text-gray-600">Built around inquiries, not empty traffic.</div>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="mb-1 text-sm font-semibold text-[#0F6168]">Local Strategy</div>
                <div className="text-sm text-gray-600">Positioned for Arizona competition.</div>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="mb-1 text-sm font-semibold text-[#0F6168]">System Based</div>
                <div className="text-sm text-gray-600">Traffic, conversion, and optimization aligned.</div>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
              <img
                src="/DigitalMarketing.png"
                alt="RAH Operations digital marketing services"
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="mb-1 text-3xl font-bold text-[#0F6168]">SEO</div>
                  <p className="text-sm text-gray-600">
                    Long-term visibility for people already searching for your services.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="mb-1 text-3xl font-bold text-[#0F6168]">Ads</div>
                  <p className="text-sm text-gray-600">
                    Controlled lead generation for immediate growth opportunities.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="mb-1 text-3xl font-bold text-[#0F6168]">Pages</div>
                  <p className="text-sm text-gray-600">
                    Conversion-focused structure that earns calls and form fills.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="mb-1 text-3xl font-bold text-[#0F6168]">Data</div>
                  <p className="text-sm text-gray-600">
                    Tracking and optimization so decisions are based on reality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results strip */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            {
              value: '2x-5x',
              label: 'stronger lead flow potential',
            },
            {
              value: 'Better',
              label: 'conversion performance from existing traffic',
            },
            {
              value: 'Lower',
              label: 'waste from disconnected marketing efforts',
            },
            {
              value: 'More',
              label: 'clarity on what is working and why',
            },
          ].map((item, index) => (
            <div key={index} className="rounded-2xl bg-gray-50 p-6 text-center shadow-sm">
              <div className="mb-2 text-3xl font-bold text-[#0F6168]">{item.value}</div>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Authority */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Why businesses trust RAH Operations with growth strategy
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Most agencies sell disconnected tactics. We focus on what actually
              creates momentum: positioning, visibility, conversion, and optimization
              working together.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {authorityPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="rounded-2xl bg-white p-8 shadow-sm">
                  <div className="mb-5 inline-flex rounded-2xl bg-[#C9F8F6] p-4">
                    <Icon className="h-7 w-7 text-[#0F6168]" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="leading-relaxed text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Built for businesses that are done wasting time on random marketing
            </h2>
            <p className="text-lg text-gray-600">
              If you need a system that supports real growth, this is where the work begins.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Local service businesses',
                description:
                  'Contractors, med spas, consultants, agencies, home services, and other businesses that depend on lead flow.',
              },
              {
                title: 'Growing companies',
                description:
                  'Businesses that already have momentum but need better structure, stronger visibility, and tighter conversion.',
              },
              {
                title: 'Newer businesses with a real offer',
                description:
                  'If the offer is strong and the execution is serious, we can build a system that starts in the right direction.',
              },
            ].map((item, index) => (
              <div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services cards */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              The digital marketing system we build
            </h2>
            <p className="text-lg text-gray-600">
              These are not random services thrown together. Each piece supports the next.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                  <div className="mb-6 inline-flex rounded-2xl bg-[#C9F8F6] p-4">
                    <Icon className="h-8 w-8 text-[#0F6168]" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900">{service.title}</h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-600">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-3">
                    {service.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start text-gray-600">
                        <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-[#3CBEC7]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dropdown detail section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              What we actually do inside each part of the system
            </h2>
            <p className="text-lg text-gray-600">
              This is where most agencies stay vague. We do not.
            </p>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
              >
                <summary className="cursor-pointer list-none text-xl font-bold text-gray-900">
                  <div className="flex items-center justify-between gap-4">
                    <span>{service.title}</span>
                    <span className="text-sm font-medium text-[#0F6168] group-open:hidden">
                      Open
                    </span>
                    <span className="hidden text-sm font-medium text-[#0F6168] group-open:inline">
                      Close
                    </span>
                  </div>
                </summary>
                <p className="mt-4 leading-relaxed text-gray-600">{service.details}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0F6168] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              How we build predictable growth
            </h2>
            <p className="text-lg text-[#C9F8F6]">
              Good marketing is not random. It is diagnosed, built, tested, and refined.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={index} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#97EDED]">
                  {step.step}
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#DDFDFC]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Real work, not vague claims
            </h2>
            <p className="text-lg text-gray-600">
              If you already have portfolio assets, use them aggressively. Proof should not be hidden.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {portfolioItems.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-3xl bg-gray-50 shadow-sm ring-1 ring-black/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-6">
                  <div className="mb-2 inline-block rounded-full bg-[#C9F8F6] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0F6168]">
                    Portfolio Preview
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mb-4 leading-relaxed text-gray-600">{item.description}</p>
                  <div className="rounded-xl bg-white p-4 text-sm font-medium text-[#0F6168]">
                    Outcome Focus: {item.result}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" to="/portfolio">
              View Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Common questions before businesses commit
            </h2>
            <p className="text-lg text-gray-600">
              Good questions deserve direct answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-gray-900">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
            Digital marketing services in Scottsdale and Phoenix
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-gray-600">
            <p>
              If you are running a business in Scottsdale, Phoenix, or the surrounding Arizona market,
              your prospects are already searching online for solutions. The real question is whether
              they are finding your business in a way that creates trust and action.
            </p>

            <p>
              A strong digital marketing strategy is not just about being visible. It is about being visible
              in the right places, with the right message, and with a page that gives people a reason to contact you.
              That is where many businesses lose the opportunity.
            </p>

            <p>
              Our approach focuses on search visibility, lead generation, offer clarity, and conversion performance.
              Whether the opportunity is local SEO, paid traffic, service page optimization, or a full front-end growth
              system, the goal stays the same: create a stronger pipeline of qualified opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ContactForm
            title="Ready to build a real marketing system?"
            subtitle="If your traffic, messaging, or conversion performance is underdelivering, we will help you identify the real bottleneck and fix it."
          />
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Explore related services
          </h2>
          <p className="mb-8 text-gray-600">
            If you are serious about growth, these areas usually connect.
          </p>

          <InternalLinks
            links={[
              {
                text: 'Website Design & SEO',
                url: '/website-design-and-seo',
                title: 'Website Design & SEO Services',
                context: 'service',
              },
              {
                text: 'Social Media Management',
                url: '/social-media-management',
                title: 'Social Media Management Services',
                context: 'service',
              },
              {
                text: 'Portfolio',
                url: '/portfolio',
                title: 'RAH Operations Portfolio',
                context: 'supporting',
              },
              {
                text: 'Contact Us',
                url: '/contact',
                title: 'Contact RAH Operations',
                context: 'conversion',
              },
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingPage;
