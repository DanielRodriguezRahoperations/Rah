import React from 'react';
import { FileText, MapPin, Clock, Shield, CheckCircle, ArrowRight, Phone, Home } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const NotaryServicesPage = () => {
  const services = [
    'Real Estate Document Notarization',
    'Loan Signing Services',
    'Business Document Authentication',
    'Power of Attorney Documents',
    'Wills and Estate Planning Documents',
    'Affidavits and Sworn Statements',
    'Contract and Agreement Notarization',
    'Immigration Document Services',
    'Medical and Healthcare Documents',
    'Mobile Notary Services (We Come to You)'
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Available 7 Days a Week',
      description: 'Flexible scheduling including evenings and weekends to accommodate your busy schedule.'
    },
    {
      icon: MapPin,
      title: 'Mobile Service Available',
      description: 'We come to your location anywhere in Arizona - your home, office, or preferred meeting place.'
    },
    {
      icon: Shield,
      title: 'Licensed & Bonded',
      description: 'Fully licensed Arizona notary with $10,000 bond and errors & omissions insurance.'
    }
  ];

  const serviceAreas = [
    'Phoenix', 'Scottsdale', 'Tempe', 'Chandler', 'Mesa', 'Glendale', 
    'Peoria', 'Gilbert', 'Surprise', 'Avondale', 'Goodyear', 'Buckeye'
  ];

  return (
    <>
      <SEOHead
        title="Arizona Notary Services | Mobile Notary Phoenix & Scottsdale"
        description="Professional notary services throughout Arizona. Mobile notary available 7 days a week. Real estate, business documents, and loan signing services."
        keywords="Arizona notary services, mobile notary Phoenix, Scottsdale notary, Arizona loan signing, mobile notary services Arizona"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Arizona Notary Services',
          description: 'Professional notary services throughout Arizona. Mobile notary available 7 days a week.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'RAH Operations',
            telephone: '+1-888-472-4621',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6301 E Pinnacle Vista Dr Unit 2004',
              addressLocality: 'Scottsdale',
              addressRegion: 'AZ',
              postalCode: '85266',
              addressCountry: 'US'
            }
          },
          areaServed: [
            'Phoenix, AZ',
            'Scottsdale, AZ', 
            'Tempe, AZ',
            'Chandler, AZ',
            'Mesa, AZ',
            'Arizona'
          ]
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
                Arizona Notary Services
                <span className="text-[#1A7C81] block">Available 7 Days a Week</span>
              </h1>
              <p className="text-xl mb-8 text-[#104A53] leading-relaxed">
                Professional notary services throughout Arizona. We provide mobile notary services, 
                loan signings, and document authentication with flexible scheduling to meet your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" to="/contact">
                  Schedule Notary Service
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
                  <FileText className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">ARIZONA NOTARY SERVICES</h3>
                  <p className="text-white text-sm">PROFESSIONAL • MOBILE • RELIABLE</p>
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
                    Licensed Arizona notary services - 
                    <br />serving Phoenix, Scottsdale & beyond.
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
              Complete Notary Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional notarization for all your personal and business document needs throughout Arizona.
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
              Why Choose Our Notary Services
            </h2>
            <p className="text-xl text-gray-600">
              Professional, reliable, and convenient notary services throughout Arizona
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

      {/* Service Areas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Arizona Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              Mobile notary services available throughout the Phoenix metropolitan area and beyond
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-[#C9F8F6] transition-colors">
                <MapPin className="w-6 h-6 text-[#3CBEC7] mx-auto mb-2" />
                <span className="text-gray-700 font-medium">{area}</span>
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
              Simple Notary Process
            </h2>
            <p className="text-xl text-gray-600">
              Easy scheduling and professional service for all your notarization needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Phone, title: 'Call or Schedule', desc: 'Contact us to schedule your notary appointment at your convenience' },
              { icon: Home, title: 'We Come to You', desc: 'Our mobile notary travels to your location anywhere in Arizona' },
              { icon: FileText, title: 'Document Review', desc: 'We review and properly notarize all your documents' },
              { icon: CheckCircle, title: 'Complete & Secure', desc: 'Your documents are properly notarized and legally binding' }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#104A53] to-[#0F6168] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Documents Notarized Today?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Professional notary services available 7 days a week throughout Arizona. We come to you!
          </p>
          <Button variant="secondary" size="lg" to="/contact">
            Schedule Notary Service
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Schedule Your Notary Appointment"
            subtitle="Professional notary services available throughout Arizona. Contact us to schedule your appointment."
          />
        </div>
      </section>
    </>
  );
};

export default NotaryServicesPage;