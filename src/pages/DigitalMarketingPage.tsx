import React from 'react';
import { Search, Target, BarChart, Globe, TrendingUp, Users, ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const DigitalMarketingPage = () => {
  const services = [
    {
      icon: Search,
      title: 'Search Engine Optimization',
      description: 'Improve your Google rankings with proven SEO strategies that drive organic traffic and qualified leads.',
      features: ['Keyword Research', 'On-Page Optimization', 'Link Building', 'Local SEO']
    },
    {
      icon: Target,
      title: 'Paid Advertising (PPC)',
      description: 'Maximize ROI with targeted Google Ads and social media advertising campaigns.',
      features: ['Google Ads Management', 'Facebook/Instagram Ads', 'Campaign Optimization', 'Conversion Tracking']
    },
    {
      icon: Globe,
      title: 'Social Media Marketing',
      description: 'Build brand awareness and engage your audience across all major social platforms.',
      features: ['Content Strategy', 'Community Management', 'Influencer Partnerships', 'Social Commerce']
    },
    {
      icon: BarChart,
      title: 'Analytics & Reporting',
      description: 'Data-driven insights to optimize your marketing performance and maximize growth.',
      features: ['Performance Tracking', 'ROI Analysis', 'Custom Dashboards', 'Monthly Reports']
    }
  ];

  const results = [
    { metric: '300%', description: 'Average increase in organic traffic' },
    { metric: '250%', description: 'Improvement in lead generation' },
    { metric: '4.8x', description: 'Average return on ad spend' },
    { metric: '85%', description: 'Client retention rate' }
  ];

  return (
    <>
      <SEOHead
        title="Digital Marketing Arizona | RAH Operations"
        description="Arizona digital marketing services that drive results. SEO, paid advertising, and social media marketing for Arizona businesses. Serving Phoenix, Scottsdale, Tempe."
        keywords="digital marketing Arizona, Arizona SEO, Phoenix digital marketing, Scottsdale online marketing, Arizona social media marketing"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
                Digital Marketing
                <span className="text-[#1A7C81] block">That Actually Drives Results</span>
              </h1>
              <p className="text-xl mb-8 text-[#104A53] leading-relaxed">
                At RAH Operations, we help Arizona small businesses grow through real-world digital marketing — not fluff. 
                Whether you're just getting started or need a better ROI, we bring strategies that convert.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" to="/contact">
                  Let's talk marketing →
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="bg-[#97EDED] rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart className="w-8 h-8 text-[#97EDED]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">DIGITAL MARKETING</h3>
                  <p className="text-white text-sm">THAT DRIVES RESULTS</p>
                  <div className="mt-6 bg-white rounded-lg p-4">
                    <img 
                      src="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png" 
                      alt="RAH Operations Logo" 
                      className="h-12 w-auto mx-auto"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm">
                    Digital marketing that drives results — custom 
                    <br />strategies for Arizona entrepreneurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* We Specialize In Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We specialize in:
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-[#3CBEC7] mr-3">•</span>
                Search engine optimization (SEO) for local and national keywords
              </li>
              <li className="flex items-start">
                <span className="text-[#3CBEC7] mr-3">•</span>
                Social media content & ad campaigns
              </li>
              <li className="flex items-start">
                <span className="text-[#3CBEC7] mr-3">•</span>
                Google Business optimization
              </li>
              <li className="flex items-start">
                <span className="text-[#3CBEC7] mr-3">•</span>
                Lead generation funnels
              </li>
              <li className="flex items-start">
                <span className="text-[#3CBEC7] mr-3">•</span>
                Email automation & CRM setup
              </li>
            </ul>
            
            <div className="mt-12 text-center">
              <p className="text-gray-700 mb-6">
                We don't just get you clicks — we get you clients. Every strategy is built to match your budget and scale with 
                your goals.
              </p>
              <p className="text-[#3CBEC7] font-medium mb-2">📍 Serving Scottsdale, Phoenix, and all of Arizona</p>
              <p className="text-gray-600 mb-6">✓ Ready to grow?</p>
              <Button to="/contact">
                Let's talk marketing →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Measurable Marketing Results</h2>
            <p className="text-xl text-gray-200">Our data-driven approach delivers consistent growth for our clients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#97EDED] mb-2">{result.metric}</div>
                <div className="text-lg text-gray-200">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Marketing Process
            </h2>
            <p className="text-xl text-gray-600">
              Strategic, data-driven approach to digital marketing success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Research & Analysis</h3>
              <p className="text-gray-600">Comprehensive market research, competitor analysis, and target audience identification.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Strategy Development</h3>
              <p className="text-gray-600">Custom marketing strategies tailored to your business goals and target market.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Execution & Optimization</h3>
              <p className="text-gray-600">Implementation of campaigns with continuous monitoring and optimization for maximum ROI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Get Your Free Digital Marketing Audit"
            subtitle="Discover opportunities to improve your online presence and drive more qualified leads to your business."
          />
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingPage;