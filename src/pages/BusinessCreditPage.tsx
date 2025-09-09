import React from 'react';
import { CheckCircle, DollarSign, TrendingUp, Clock, Users, ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import RelatedServices from '../components/ui/RelatedServices';
import InternalLinks from '../components/ui/InternalLinks';

const BusinessCreditPage = () => {
  const benefits = [
    'Establish separate business credit profile',
    'Access to higher credit limits',
    'Better loan terms and interest rates',
    'Protection of personal credit score',
    'Faster approval for business financing',
    'Build business credit history'
  ];

  const process = [
    {
      step: 1,
      title: 'Business Structure Review',
      description: 'We analyze your current business structure and identify optimization opportunities.'
    },
    {
      step: 2,
      title: 'Credit Profile Setup',
      description: 'Establish your business credit profile with major reporting agencies.'
    },
    {
      step: 3,
      title: 'Vendor Network Access',
      description: 'Connect with our network of credit-reporting vendors and suppliers.'
    },
    {
      step: 4,
      title: 'Funding Strategy',
      description: 'Develop and execute a customized funding strategy for your business needs.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Business Credit & Funding Arizona | RAH Operations"
        description="Arizona business credit and funding solutions. We help Arizona entrepreneurs establish business credit and secure funding for growth. Serving Phoenix, Scottsdale, Tempe."
        keywords="business credit Arizona, business funding Arizona, Arizona business loans, establish business credit Phoenix, business financing Scottsdale"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3CBEC7] to-[#1A7C81] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Business Credit & Funding
                <span className="text-[#97EDED] block">in Arizona</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 leading-relaxed">
                At RAH Operations, we help Arizona entrepreneurs build strong, independent business credit profiles that 
                don't rely on personal guarantees. Whether you're just starting your LLC or scaling up, we'll guide you step-by-step 
                to establish credibility and access real funding. Our <InternalLinks 
                  links={[
                    { text: 'new business setup services', url: '/new-business-setup', title: 'Arizona LLC Formation Services', context: 'service' }
                  ]} 
                  className="inline"
                /> ensure your business is properly structured for credit building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" to="/contact">
                  Get Free Credit Analysis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" href="tel:+1234567890">
                  Call (888) 472-4621
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="bg-[#97EDED] rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-[#97EDED] text-2xl">💼</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">BUSINESS CREDIT & FUNDING</h3>
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
                    Build business credit without using your personal credit - 
                    <br />serving Scottsdale & Arizona businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Business Credit & Funding in Arizona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At RAH Operations, we help Arizona entrepreneurs build strong, independent business credit profiles that 
              don't rely on personal guarantees. Whether you're just starting your LLC or scaling up, we'll guide you step-by-step 
              to establish credibility and access real funding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-6 bg-gray-50 rounded-lg hover:bg-[#C9F8F6] transition-colors">
                <CheckCircle className="w-6 h-6 text-[#3CBEC7] mt-1 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE HELP Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">WHO WE HELP</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  New LLCs or sole proprietors just starting out
                </li>
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  Businesses rebuilding credit after setbacks
                </li>
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  Companies seeking funding without using their personal credit
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">WHAT WE DO</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  Structure your business for creditworthiness
                </li>
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  Connect you with vendor accounts that report to major bureaus
                </li>
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  Get your D-U-N-S number and track your Paydex score
                </li>
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  Build trade lines and apply for true business credit cards
                </li>
                <li className="flex items-start">
                  <span className="text-[#3CBEC7] mr-2">•</span>
                  Secure lines of credit and loans using your EIN only
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">WHY IT MATTERS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Separate personal and business finances</h3>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Qualify for larger funding amounts</h3>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Get lower interest rates and better terms</h3>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Build long-term financial stability</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#3CBEC7] font-medium">📍 Proudly serving Scottsdale, Phoenix, and all of Arizona</p>
          <div className="mt-4">
            <Button to="/contact">
              Book a consultation →
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Proven Process
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to building your business credit and securing funding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Access Capital for Growth
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <DollarSign className="w-8 h-8 text-[#3CBEC7] mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Funding Options</h3>
                    <p className="text-gray-600">Access to term loans, lines of credit, equipment financing, and alternative funding sources.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-8 h-8 text-[#3CBEC7] mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Credit Building</h3>
                    <p className="text-gray-600">Systematic approach to building strong business credit scores and payment history.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 text-[#3CBEC7] mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Results</h3>
                    <p className="text-gray-600">See improvements in your business credit profile within 30-90 days.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="Business funding and credit building services"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#104A53] to-[#0F6168] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Business Credit?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join hundreds of successful businesses that have transformed their financing capabilities with our expert guidance.
          </p>
          <Button variant="secondary" size="lg" to="/contact">
            Start Your Credit Journey Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentService="/business-credit-and-funding" category="business" />

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Get Your Free Business Credit Analysis"
            subtitle="Discover your current credit position and learn how we can help you secure the funding you need."
          />
        </div>
      </section>
    </>
  );
};

export default BusinessCreditPage;