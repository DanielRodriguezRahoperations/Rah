import React from 'react';
import { Shield, Star, AlertTriangle, Eye, MessageCircle, ArrowRight, TrendingUp, Users } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const ReputationManagementPage = () => {
  const services = [
    {
      icon: Star,
      title: 'Review Management',
      description: 'Monitor, respond to, and generate positive customer reviews across all platforms.',
      benefits: ['Increase positive reviews', 'Professional response management', 'Review monitoring alerts', 'Customer feedback analysis']
    },
    {
      icon: Eye,
      title: 'Online Monitoring',
      description: '24/7 monitoring of your brand mentions across the web and social media.',
      benefits: ['Real-time alerts', 'Social media monitoring', 'News mention tracking', 'Competitor analysis']
    },
    {
      icon: Shield,
      title: 'Crisis Management',
      description: 'Rapid response strategies to protect your brand during reputation crises.',
      benefits: ['Crisis response plans', 'Damage control strategies', 'Media relations', 'Recovery protocols']
    },
    {
      icon: MessageCircle,
      title: 'Content Strategy',
      description: 'Positive content creation and promotion to improve your online presence.',
      benefits: ['Positive content creation', 'SEO optimization', 'Social media content', 'Brand storytelling']
    }
  ];

  return (
    <>
      <SEOHead
        title="Online Reputation Management Services"
        description="Protect and enhance your brand reputation with professional online reputation management. Review management, crisis response, and brand protection services in Atlanta."
        keywords="reputation management, online reputation, review management, brand protection, crisis management, Atlanta reputation management"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3CBEC7] to-[#1A7C81] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Protect Your
                <span className="text-[#97EDED] block">Brand Reputation</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 leading-relaxed">
                In today's digital world, your online reputation is everything. We help businesses monitor, 
                protect, and enhance their brand reputation across all digital platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" to="/contact">
                  Free Reputation Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" href="tel:+1234567890">
                  Emergency Response
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpg"
                alt="Online reputation management and brand protection"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Reputation Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From proactive monitoring to crisis response, we protect and enhance your brand's online presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Business reputation and customer reviews management"
                className="rounded-xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Why Reputation Management Matters
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-8 h-8 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">90% of consumers read reviews</h3>
                    <p className="text-gray-600">Before making purchasing decisions, customers research your business online.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-8 h-8 text-[#3CBEC7] mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Revenue Impact</h3>
                    <p className="text-gray-600">A one-star increase in reviews can increase revenue by 5-9%.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-[#3CBEC7] mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Credibility</h3>
                    <p className="text-gray-600">Positive online presence builds trust and credibility with potential customers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Reputation Management Process
            </h2>
            <p className="text-xl text-gray-600">
              Systematic approach to building and protecting your online reputation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Audit', 'Monitor', 'Respond', 'Improve'].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step}</h3>
                <p className="text-gray-600">
                  {index === 0 && "Comprehensive analysis of your current online reputation and review profiles."}
                  {index === 1 && "Continuous monitoring of reviews, mentions, and brand conversations online."}
                  {index === 2 && "Professional responses to reviews and proactive customer engagement."}
                  {index === 3 && "Ongoing strategies to improve ratings and build positive brand perception."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Protect Your Brand Today"
            subtitle="Get a free reputation audit and learn how we can help improve your online presence."
          />
        </div>
      </section>
    </>
  );
};

export default ReputationManagementPage;