import React from 'react';
import { Globe, Search, TrendingUp, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import RelatedServices from '../components/ui/RelatedServices';
import InternalLinks from '../components/ui/InternalLinks';

const WebsiteDesignSEOPage = () => {
  const services = [
    'Custom Website Design for Arizona Businesses',
    'Search Engine Optimization (SEO)',
    'Local SEO for Arizona Markets',
    'Mobile-Responsive Design',
    'E-commerce Website Development',
    'Website Maintenance & Updates',
    'Google My Business Optimization',
    'Content Management Systems'
  ];

  const benefits = [
    {
      icon: Search,
      title: 'Rank #1 on Google',
      description: 'Our proven SEO strategies help Arizona businesses dominate local search results and attract more customers.'
    },
    {
      icon: Globe,
      title: 'Professional Web Design',
      description: 'Custom websites that represent your Arizona business professionally and convert visitors into customers.'
    },
    {
      icon: TrendingUp,
      title: 'Increase Online Visibility',
      description: 'Get found by more Arizona customers searching for your services online with our comprehensive SEO approach.'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Website Design & SEO Arizona',
    description: 'Professional website design and SEO services for Arizona businesses. Custom websites that rank #1 on Google.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'RAH Operations',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6301 E Pinnacle Vista Dr Unit 2004',
        addressLocality: 'Scottsdale',
        addressRegion: 'AZ',
        postalCode: '85266',
        addressCountry: 'US'
      },
      telephone: '+1-888-472-4621'
    },
    areaServed: [
      'Phoenix, AZ',
      'Scottsdale, AZ',
      'Tempe, AZ',
      'Chandler, AZ',
      'Mesa, AZ',
      'Glendale, AZ',
      'Arizona'
    ],
    serviceType: 'Website Design and SEO',
    offers: {
      '@type': 'Offer',
      description: 'Custom website design and SEO services for Arizona businesses'
    }
  };

  return (
    <>
      <SEOHead
        title="Website Design & SEO Arizona | #1 Ranked Web Design Company"
        description="Arizona's top website design and SEO company. We create custom websites that rank #1 on Google. Serving Phoenix, Scottsdale, Tempe, and all of Arizona. Get your free quote today!"
        keywords="website design Arizona, SEO Arizona, web design Phoenix, Scottsdale web design, Arizona SEO company, website development Arizona"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
                Website Design & SEO
                <span className="text-[#1A7C81] block">That Ranks #1 in Arizona</span>
              </h1>
              <p className="text-xl mb-8 text-[#104A53] leading-relaxed">
                We create stunning, mobile-responsive websites that rank at the top of Google search results. 
                Our Arizona-focused SEO strategies help local businesses dominate their competition online. 
                Combined with our <InternalLinks 
                  links={[
                    { text: 'digital marketing services', url: '/digital-marketing', title: 'Arizona Digital Marketing Services', context: 'service' },
                    { text: 'social media management', url: '/social-media-management', title: 'Arizona Social Media Management', context: 'service' }
                  ]} 
                  className="inline"
                />, we provide complete online growth solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" to="/contact">
                  Get Free Website Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" href="tel:+14804724621">
                  Call (888) 472-4621
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="bg-[#97EDED] rounded-lg p-6 text-center">
                  <Globe className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">WEBSITE DESIGN & SEO</h3>
                  <p className="text-white text-sm">ARIZONA BUSINESS GROWTH STARTS HERE</p>
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
                    Custom websites that rank #1 on Google - 
                    <br />serving Arizona businesses.
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
              Complete Website Design & SEO Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your Arizona business needs to succeed online, from custom website design to top Google rankings.
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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Arizona Businesses Choose RAH Operations
            </h2>
            <p className="text-xl text-gray-600">
              We understand the Arizona market and know what it takes to rank #1 on Google
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Proven Process
            </h2>
            <p className="text-xl text-gray-600">
              How we help Arizona businesses dominate Google search results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Discovery', desc: 'We analyze your business, competitors, and target Arizona market' },
              { title: 'Design', desc: 'Create a custom website that represents your brand professionally' },
              { title: 'Optimize', desc: 'Implement proven SEO strategies for Arizona local search' },
              { title: 'Dominate', desc: 'Watch your business rank #1 and attract more customers' }
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

      {/* Arizona Focus Section */}
      <section className="py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Proudly Serving Arizona Businesses</h2>
            <p className="text-xl text-gray-200">Local expertise for Phoenix, Scottsdale, Tempe, and all of Arizona</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#97EDED] mb-2">Phoenix</div>
              <div className="text-sm">Web Design & SEO</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#97EDED] mb-2">Scottsdale</div>
              <div className="text-sm">Web Design & SEO</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#97EDED] mb-2">Tempe</div>
              <div className="text-sm">Web Design & SEO</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#97EDED] mb-2">Chandler</div>
              <div className="text-sm">Web Design & SEO</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentService="/website-design-and-seo" category="digital" />

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Ready to Rank #1 on Google?"
            subtitle="Get a free website audit and SEO consultation for your Arizona business."
          />
        </div>
      </section>
    </>
  );
};

export default WebsiteDesignSEOPage;