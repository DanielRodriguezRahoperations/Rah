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
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-24 text-center">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold text-[#0F6168] mb-3 uppercase tracking-wide">
            Scottsdale & Phoenix Digital Marketing Experts
          </p>

          <h1 className="text-4xl lg:text-5xl font-bold text-[#0F6168] mb-6">
            Digital Marketing That Actually Brings You Clients — Not Just Clicks
          </h1>

          <p className="text-lg text-[#104A53] max-w-2xl mx-auto mb-8">
            We help Arizona businesses generate real leads, close more customers, and scale with proven systems.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" to="/contact">
              Get Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button size="lg" to="/services" variant="outline">
              View Services
            </Button>
          </div>

        </div>
      </section>

      {/* AUTHORITY */}
      <section className="py-20 text-center">
        <div className="max-w-5xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-6">
            Why Arizona Businesses Trust RAH Operations
          </h2>

          <p className="text-gray-600 mb-12">
            We focus on results — leads, clients, and revenue — not vanity metrics.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold">Local Expertise</h3>
              <p className="text-sm text-gray-600 mt-2">We understand the Arizona market.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold">ROI Focused</h3>
              <p className="text-sm text-gray-600 mt-2">We build strategies that make money.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold">Scalable Growth</h3>
              <p className="text-sm text-gray-600 mt-2">We help you grow consistently.</p>
            </div>
          </div>

        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Built for Businesses Ready to Grow
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            Local Service Businesses
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            Growing Companies
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            New Businesses
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Digital Marketing Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;

              return (
                <div key={i} className="p-8 bg-gray-50 rounded-xl">
                  <Icon className="mb-4 text-[#3CBEC7]" />
                  <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-3">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-[#3CBEC7]" />
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

      {/* ACCORDION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {services.map((s, i) => (
            <details key={i} className="mb-4 bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-bold">{s.title}</summary>
              <p className="mt-2 text-gray-600">{s.description}</p>
            </details>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-20 bg-[#0F6168] text-white text-center">
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {results.map((r, i) => (
            <div key={i}>
              <div className="text-4xl font-bold">{r.metric}</div>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <details className="bg-white p-5 rounded-lg">
            <summary className="font-bold">How long does it take?</summary>
            <p className="text-gray-600 mt-2">Depends on strategy, ads are faster than SEO.</p>
          </details>

          <details className="bg-white p-5 rounded-lg">
            <summary className="font-bold">Do you require contracts?</summary>
            <p className="text-gray-600 mt-2">No long-term lock-ins.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <ContactForm
          title="Get Your Free Marketing Strategy"
          subtitle="Let’s show you how to grow your business."
        />
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-16 text-center">
        <InternalLinks
          links={[
            { text: 'Website Design & SEO', url: '/website-design-and-seo' },
            { text: 'Business Credit & Funding', url: '/business-credit-and-funding' },
            { text: 'Contact Us', url: '/contact' }
          ]}
        />
      </section>

    </>
  );
};

export default DigitalMarketingPage;
