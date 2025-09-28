import React from 'react';
import { Building2, FileText, CheckCircle, Users, Shield, ArrowRight, Clock, DollarSign } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const NewBusinessSetupPage = () => {
  const services = [
    'LLC Formation & Registration',
    'Corporation Setup (C-Corp, S-Corp)',
    'EIN Application & Processing',
    'Operating Agreement Drafting',
    'Business License Research & Filing',
    'Registered Agent Services',
    'Business Banking Setup Assistance',
    'Annual Compliance Management',
    'Business Structure Consultation',
    'State Filing & Documentation'
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Legal Protection',
      description: 'Protect your personal assets from business liabilities with proper legal structure and compliance.'
    },
    {
      icon: DollarSign,
      title: 'Tax Advantages',
      description: 'Optimize your tax strategy with the right business structure and maximize available deductions.'
    },
    {
      icon: Clock,
      title: 'Fast Setup',
      description: 'Get your Arizona business up and running quickly with our streamlined formation process.'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Business Consultation',
      description: 'We discuss your business goals and recommend the best structure for your needs.'
    },
    {
      step: 2,
      title: 'Entity Formation',
      description: 'We handle all state filings and documentation to legally establish your business.'
    },
    {
      step: 3,
      title: 'EIN & Banking',
      description: 'Get your federal tax ID and assistance setting up business banking accounts.'
    },
    {
      step: 4,
      title: 'Compliance Setup',
      description: 'Ensure ongoing compliance with all state and federal requirements.'
    }
  ];

  return (
    <>
      <SEOHead
        title="New Business Setup Arizona | LLC Formation & Registration"
        description="Professional new business setup services in Arizona. LLC formation, EIN registration, and complete business formation. Start your Arizona business the right way."
        keywords="Arizona business setup, LLC formation Arizona, new business registration Arizona, EIN application Arizona, business formation Phoenix"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
                New Business Setup
                <span className="text-[#1A7C81] block">in Arizona</span>
              </h1>
              <p className="text-xl mb-8 text-[#104A53] leading-relaxed">
                Start your Arizona business the right way with professional formation services. We handle all the paperwork, 
                filings, and legal requirements so you can focus on building your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" to="/contact">
                  Start Your Business Today
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
                  <Building2 className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">NEW BUSINESS SETUP</h3>
                  <p className="text-white text-sm">ARIZONA BUSINESS FORMATION EXPERTS</p>
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
                    Professional business formation services - 
                    <br />serving Arizona entrepreneurs.
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
              Complete Business Formation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to legally establish and operate your Arizona business with confidence.
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
              Why Proper Business Setup Matters
            </h2>
            <p className="text-xl text-gray-600">
              The right business structure provides protection, benefits, and credibility for your Arizona business
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
              Our Business Setup Process
            </h2>
            <p className="text-xl text-gray-600">
              Simple, streamlined process to get your Arizona business legally established
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#104A53] to-[#0F6168] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Arizona Business?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Let us handle the legal requirements while you focus on building your business.
          </p>
          <Button variant="secondary" size="lg" to="/contact">
            Start Your Business Setup Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Start Your Business Formation"
            subtitle="Get expert guidance on setting up your Arizona business the right way."
          />
        </div>
      </section>
    </>
  );
};

export default NewBusinessSetupPage;