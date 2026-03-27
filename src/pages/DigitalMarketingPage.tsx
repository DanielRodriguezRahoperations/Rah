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
      description: 'Rank higher on Google and dominate local search results in Arizona.',
      features: ['Keyword Strategy', 'On-Page SEO', 'Local SEO', 'Technical Optimization']
    },
    {
      icon: Target,
      title: 'Paid Advertising',
      description: 'Generate leads instantly with high-converting Google and social ad campaigns.',
      features: ['Google Ads', 'Meta Ads', 'Retargeting', 'Conversion Tracking']
    },
    {
      icon: Globe,
      title: 'Social Media Growth',
      description: 'Build a brand that attracts, engages, and converts your audience.',
      features: ['Content Strategy', 'Posting Systems', 'Audience Growth', 'Brand Positioning']
    },
    {
      icon: BarChart,
      title: 'Analytics & Optimization',
      description: 'Track performance and continuously improve ROI across all channels.',
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
        title="Digital Marketing Arizona | RAH Operations"
        description="Results-driven digital marketing in Arizona. SEO, paid ads, and social media strategies that generate real leads."
        keywords="digital marketing Arizona, SEO Arizona, Phoenix marketing agency, Scottsdale SEO services"
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0F6168] mb-6">
            Digital Marketing That Actually Makes You Money
          </h1>

          <p className="text-xl text-[#104A53] max-w-3xl mx-auto mb-8">
            We don’t run campaigns for vanity metrics. We build systems that generate leads, close clients, and scale your business.
          </p>

          <Button size="lg" to="/contact">
            Get Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Why Businesses Choose RAH Operations
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Most marketing agencies focus on impressions and clicks. We focus on revenue.
            Every strategy we build is designed to bring you qualified leads and turn them into paying clients.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="text-[#3CBEC7] mb-3" />
              <p>Data-driven decisions</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="text-[#3CBEC7] mb-3" />
              <p>ROI-focused strategies</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="text-[#3CBEC7] mb-3" />
              <p>Built for real growth</p>
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
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

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
