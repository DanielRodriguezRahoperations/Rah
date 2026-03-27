import React from 'react';
import { Search, Target, BarChart, Globe, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import InternalLinks from '../components/ui/InternalLinks';

const DigitalMarketingPage = () => {

  const services = [
    {
      icon: Search,
      title: 'Search Engine Optimization',
      description: 'Rank higher on Google and dominate local Arizona search results.',
      features: ['Keyword Strategy', 'On-Page SEO', 'Local SEO', 'Technical Optimization']
    },
    {
      icon: Target,
      title: 'Paid Advertising',
      description: 'Generate leads fast with high-converting Google and Meta ad campaigns.',
      features: ['Google Ads', 'Facebook Ads', 'Retargeting', 'Conversion Tracking']
    },
    {
      icon: Globe,
      title: 'Social Media Growth',
      description: 'Build a brand that attracts and converts your ideal audience.',
      features: ['Content Strategy', 'Posting Systems', 'Audience Growth', 'Brand Positioning']
    },
    {
      icon: BarChart,
      title: 'Analytics & Optimization',
      description: 'Track performance and continuously improve ROI.',
      features: ['Tracking Setup', 'ROI Analysis', 'Monthly Reporting', 'Optimization']
    }
  ];

  const results = [
    { metric: '300%', description: 'Increase in organic traffic' },
    { metric: '250%', description: 'More inbound leads' },
    { metric: '4.8x', description: 'Return on ad spend' },
    { metric: '85%', description: 'Client retention rate' }
  ];

  return (
    <>
      <SEOHead
        title="Digital Marketing Scottsdale & Phoenix | RAH Operations"
        description="Results-driven digital marketing for Arizona businesses. SEO, paid ads, and growth strategies that generate real clients."
      />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-24 overflow-hidden">

        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">

          <p className="text-sm font-semibold text-[#0F6168] mb-3 uppercase tracking-wide">
            Scottsdale & Phoenix Digital Marketing Experts
          </p>

          <h1 className="text-4xl lg:text-5xl font-bold text-[#0F6168] mb-6 leading-tight">
            Digital Marketing That Actually Brings You Clients — Not Just Clicks
          </h1>

          <p className="text-lg text-[#104A53] max-w-2xl mx-auto mb-8">
            We help Arizona businesses generate real leads, close more customers, and scale with proven digital marketing systems — not guesswork.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" to="/contact" className="shadow-lg hover:scale-105 transition-transform">
              Get Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button size="lg" to="/services" variant="outline">
              View Services
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[#0F6168]/80">
            <span>✔ Arizona-Based Experts</span>
            <span>✔ ROI-Focused Strategies</span>
            <span>✔ Built for Local Growth</span>
          </div>

        </div>
      </section>

      {/* AUTHORITY */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-6">
            Why Arizona Businesses Trust RAH Operations
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Most marketing agencies focus on impressions and vanity metrics. We focus on what actually matters — generating leads, increasing revenue, and helping your business grow consistently.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 rounded-xl bg-gray-50 shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-[#0F6168]">
                Local Market Expertise
              </h3>
              <p className="text-gray-600 text-sm">
                We understand the Arizona market, your competition, and how to position your business to stand out locally.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-[#0F6168]">
                Built for Real ROI
              </h3>
              <p className="text-gray-600 text-sm">
                Every campaign is designed to generate measurable results — more leads, more clients, and more revenue.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-[#0F6168]">
                Transparent & Scalable
              </h3>
              <p className="text-gray-600 text-sm">
                No fluff, no confusion — just clear strategy, execution, and scaling as your business grows.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">
            Our Digital Marketing Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;

              return (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm">

                  <Icon className="w-8 h-8 text-[#3CBEC7] mb-4" />

                  <h3 className="text-xl font-bold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#3CBEC7] mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* RESULTS */}
      <section className="py-20 bg-[#0F6168] text-white text-center">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-10">
            Real Results for Arizona Businesses
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {results.map((r, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-[#97EDED] mb-2">
                  {r.metric}
                </div>
                <p>{r.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center px-4">

          <h2 className="text-3xl font-bold mb-10">
            Our Process
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <Search className="mx-auto mb-3 text-[#3CBEC7]" />
              <h3 className="font-bold mb-2">Research</h3>
              <p className="text-gray-600">We analyze your market and competition</p>
            </div>

            <div>
              <Target className="mx-auto mb-3 text-[#3CBEC7]" />
              <h3 className="font-bold mb-2">Strategy</h3>
              <p className="text-gray-600">We build a custom growth plan</p>
            </div>

            <div>
              <TrendingUp className="mx-auto mb-3 text-[#3CBEC7]" />
              <h3 className="font-bold mb-2">Execution</h3>
              <p className="text-gray-600">We launch and optimize for results</p>
            </div>

          </div>

        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-16 bg-gray-50 text-center">
        <InternalLinks
          links={[
            { text: 'Website Design & SEO', url: '/website-design-and-seo' },
            { text: 'Business Credit & Funding', url: '/business-credit-and-funding' },
            { text: 'Contact Us', url: '/contact' }
          ]}
        />
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4">

          <ContactForm
            title="Get Your Free Marketing Strategy"
            subtitle="We’ll show you exactly how to generate more leads and clients."
          />

        </div>
      </section>

    </>
  );
};

export default DigitalMarketingPage;
