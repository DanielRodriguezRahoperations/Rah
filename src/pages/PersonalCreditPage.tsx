import React from 'react';
import { CreditCard, TrendingUp, FileText, Users, CheckCircle, ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const PersonalCreditPage = () => {
  const services = [
    'Credit Report Analysis and Review',
    'Dispute Letter Preparation and Filing',
    'Creditor Negotiation and Settlement',
    'Credit Monitoring and Alerts',
    'Credit Building Strategy Development',
    'Financial Education and Coaching',
    'Identity Theft Protection',
    'Score Improvement Tracking'
  ];

  const results = [
    { metric: '150+', description: 'Average point increase' },
    { metric: '95%', description: 'Client satisfaction rate' },
    { metric: '60-90', description: 'Days to see improvements' },
    { metric: '1000+', description: 'Credit reports repaired' }
  ];

  return (
    <>
      <SEOHead
        title="Personal Credit Repair Services"
        description="Professional personal credit repair services. Improve credit scores, remove negative items, and build better credit. Expert credit repair specialists in Atlanta."
        keywords="credit repair, personal credit repair, improve credit score, credit restoration, remove negative items, Atlanta credit repair"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3CBEC7] to-[#1A7C81] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Personal Credit
                <span className="text-[#97EDED] block">Repair & Restoration</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 leading-relaxed">
                Improve your credit score, remove negative items, and build a stronger financial future. 
                Our proven credit repair process has helped thousands achieve their credit goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" to="/contact">
                  Free Credit Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" href="tel:+1234567890">
                  Call Credit Specialist
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg"
                alt="Personal credit repair and financial planning"
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
              Comprehensive Credit Repair Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From dispute filing to credit building strategies, we provide complete credit restoration solutions.
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

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Credit Repair Works
            </h2>
            <p className="text-xl text-gray-600">
              Our systematic approach to improving your credit score and financial health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: 'Credit Analysis', desc: 'Comprehensive review of your credit reports from all three bureaus' },
              { icon: Users, title: 'Strategy Development', desc: 'Custom plan based on your specific credit situation and goals' },
              { icon: CreditCard, title: 'Dispute Process', desc: 'Professional dispute letters and creditor negotiations' },
              { icon: TrendingUp, title: 'Score Improvement', desc: 'Ongoing monitoring and optimization for maximum results' }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Credit Repair Results</h2>
            <p className="text-xl text-gray-200">Real improvements in credit scores and financial opportunities</p>
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

      {/* Educational Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg"
                alt="Credit education and financial planning"
                className="rounded-xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Credit Education & Support
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We don't just repair your credit – we educate you on how to maintain and improve it long-term. 
                Our clients receive ongoing support and resources to ensure lasting financial success.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#3CBEC7]" />
                  <span className="text-gray-700">Personalized credit education materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#3CBEC7]" />
                  <span className="text-gray-700">Monthly progress reports and analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#3CBEC7]" />
                  <span className="text-gray-700">Ongoing support and guidance</span>
                </div>
              </div>
              <Button to="/contact">
                Start Credit Repair
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Start Improving Your Credit Today"
            subtitle="Get a free credit analysis and learn how we can help improve your credit score and financial opportunities."
          />
        </div>
      </section>
    </>
  );
};

export default PersonalCreditPage;