import React from 'react';
import { Building2, FileText, CheckCircle, Users, Shield, ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const LLCSetupPage = () => {
  const services = [
    'Business Entity Formation (LLC, Corporation, Partnership)',
    'EIN Registration and Tax Setup',
    'Operating Agreement Drafting',
    'Business License and Permit Assistance',
    'Registered Agent Services',
    'Annual Compliance Management',
    'Business Banking Setup',
    'Business Structure Optimization'
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Asset Protection',
      description: 'Protect your personal assets from business liabilities with proper legal structure.'
    },
    {
      icon: FileText,
      title: 'Tax Advantages',
      description: 'Optimize your tax strategy with the right business structure and deductions.'
    },
    {
      icon: Users,
      title: 'Professional Credibility',
      description: 'Establish credibility with customers, vendors, and financial institutions.'
    }
  ];

  return (
    <>
      <SEOHead
        title="LLC Setup & Business Structuring Services"
        description="Professional LLC formation, business structuring, and compliance services. Expert guidance for business entity setup, tax optimization, and legal protection in Atlanta."
        keywords="LLC setup, business formation, business structuring, entity formation, business registration, Atlanta LLC services"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#0F6168]">
                LLC Setup &
                <span className="text-[#1A7C81] block">Business Structuring</span>
              </h1>
              <p className="text-xl mb-8 text-[#104A53] leading-relaxed">
                Start your business on the right foundation. Our expert team handles all aspects of business formation, 
                from entity selection to compliance management, ensuring your business is properly structured for success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" to="/contact">
                  Start Business Formation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" href="tel:+1234567890">
                  Free Consultation
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg"
                alt="LLC setup and business formation services"
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
              Complete Business Formation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to establish and maintain your business entity with full legal compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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
              Why Proper Business Structure Matters
            </h2>
            <p className="text-xl text-gray-600">
              The right business structure provides protection, tax benefits, and professional credibility
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
              Simple Formation Process
            </h2>
            <p className="text-xl text-gray-600">
              We handle all the paperwork and legal requirements so you can focus on your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { title: 'Consultation', desc: 'Discuss your business goals and structure options' },
              { title: 'Entity Selection', desc: 'Choose the best business entity for your needs' },
              { title: 'Filing', desc: 'We handle all state filings and documentation' },
              { title: 'Setup', desc: 'EIN registration, banking, and operational setup' },
              { title: 'Ongoing Support', desc: 'Continued compliance and growth support' }
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#104A53] to-[#0F6168] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Structure Your Business?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Get expert guidance on business formation and structuring. Protect your assets and optimize for growth.
          </p>
          <Button variant="secondary" size="lg" to="/contact">
            Start Business Formation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Get Started with Business Formation"
            subtitle="Schedule a consultation to discuss your business structure needs and formation options."
          />
        </div>
      </section>
    </>
  );
};

export default LLCSetupPage;