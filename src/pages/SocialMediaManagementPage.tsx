import React from 'react';
import { Users, MessageCircle, TrendingUp, Camera, BarChart3, ArrowRight, CheckCircle, Star } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const SocialMediaManagementPage = () => {
  const services = [
    'Social Media Strategy Development',
    'Content Creation & Design',
    'Daily Social Media Management',
    'Community Engagement & Response',
    'Social Media Advertising (Facebook, Instagram, LinkedIn)',
    'Influencer Partnership Coordination',
    'Social Commerce Setup',
    'Analytics & Performance Reporting',
    'Brand Voice Development',
    'Crisis Management & Reputation Monitoring'
  ];

  const platforms = [
    {
      name: 'Facebook',
      description: 'Build community and drive local engagement for your Arizona business.',
      features: ['Business Page Management', 'Facebook Ads', 'Community Building', 'Event Promotion']
    },
    {
      name: 'Instagram',
      description: 'Visual storytelling and brand building through engaging content.',
      features: ['Content Creation', 'Stories & Reels', 'Instagram Shopping', 'Influencer Partnerships']
    },
    {
      name: 'LinkedIn',
      description: 'Professional networking and B2B lead generation.',
      features: ['Company Page Management', 'Professional Content', 'Lead Generation', 'Industry Networking']
    },
    {
      name: 'TikTok',
      description: 'Reach younger audiences with creative, trending content.',
      features: ['Viral Content Creation', 'Trend Participation', 'Brand Awareness', 'Creative Campaigns']
    }
  ];

  const results = [
    { metric: '300%', description: 'Average increase in social engagement' },
    { metric: '250%', description: 'Growth in social media followers' },
    { metric: '180%', description: 'Increase in website traffic from social' },
    { metric: '95%', description: 'Client satisfaction rate' }
  ];

  return (
    <>
      <SEOHead
        title="Social Media Management Arizona | RAH Operations"
        description="Professional social media management for Arizona businesses. Content creation, community management, and social advertising. Grow your brand on all platforms."
        keywords="social media management Arizona, Arizona social media marketing, Phoenix social media, Scottsdale social media management, Arizona social media advertising"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
                Social Media Management
                <span className="text-[#1A7C81] block">That Builds Your Brand</span>
              </h1>
              <p className="text-xl mb-8 text-[#104A53] leading-relaxed">
                Professional social media management for Arizona businesses. We create engaging content, 
                build communities, and drive real business results across all major social platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" to="/contact">
                  Grow Your Social Presence
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" href="tel:+18884724621">
                  Call (888) 472-4621
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="bg-[#97EDED] rounded-lg p-6 text-center">
                  <Users className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">SOCIAL MEDIA MANAGEMENT</h3>
                  <p className="text-white text-sm">BUILD YOUR BRAND & COMMUNITY</p>
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
                    Professional social media management - 
                    <br />growing Arizona businesses online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Social Media Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From strategy to execution, we handle every aspect of your social media presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-[#C9F8F6] transition-colors">
                <CheckCircle className="w-6 h-6 text-[#3CBEC7] flex-shrink-0" />
                <span className="text-gray-700 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We Manage All Major Platforms
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive social media management across the platforms that matter most to your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{platform.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{platform.description}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Social Media Results That Matter</h2>
            <p className="text-xl text-gray-200">Real growth and engagement for Arizona businesses</p>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Social Media Process
            </h2>
            <p className="text-xl text-gray-600">
              Strategic approach to building your brand and community on social media
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Strategy', desc: 'Develop comprehensive social media strategy aligned with your business goals' },
              { title: 'Create', desc: 'Design engaging content that resonates with your Arizona audience' },
              { title: 'Engage', desc: 'Build community through active engagement and customer interaction' },
              { title: 'Analyze', desc: 'Track performance and optimize for maximum reach and engagement' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Ready to Grow Your Social Media Presence?"
            subtitle="Get a free social media audit and strategy consultation for your Arizona business."
          />
        </div>
      </section>
    </>
  );
};

export default SocialMediaManagementPage;