import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import ContactForm from '../components/ui/ContactForm';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our experts',
      info: '(888) 472-4621',
      action: 'tel:+18884724621'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message',
      info: 'Daniel@rahoperations.com',
      action: 'mailto:Daniel@rahoperations.com'
    },
    {
      icon: MapPin,
      title: 'Visit Our Office',
      description: 'Meet us in person',
      info: '6301 E Pinnacle Vista Dr Unit 1004, Scottsdale, AZ 85266',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'When we\'re available',
      info: 'Monday - Friday: 8:00 AM - 5:00 PM MST',
      action: '#'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact RAH Operations',
    description: 'Contact RAH Operations for professional business solutions including credit services, digital marketing, and business formation.',
    url: 'https://www.rahoperations.com/contact',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'RAH Operations',
      telephone: '+1-123-456-7890',
      telephone: '+1-888-472-4621',
      email: 'Daniel@rahoperations.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Business Center Dr, Suite 100',
        addressLocality: 'Atlanta',
        addressRegion: 'GA',
        postalCode: '30309',
        addressCountry: 'US'
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Contact RAH Operations | Arizona Business Services"
        description="Contact RAH Operations for Arizona website design, SEO, digital marketing, and business credit services. Free consultation available in Scottsdale, Phoenix, Tempe."
        keywords="contact RAH Operations Arizona, Scottsdale business services, Phoenix web design contact, Arizona SEO consultation"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
              CONTACT
            </h1>
            <p className="text-xl text-[#104A53] mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to grow your Arizona business? Get in touch with our team for a free consultation on website design, SEO, and business services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Multiple ways to connect with our professional team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-[#C9F8F6] transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  {method.action.startsWith('#') ? (
                    <p className="text-[#1A7C81] font-medium">{method.info}</p>
                  ) : (
                    <a
                      href={method.action}
                      className="text-[#1A7C81] font-medium hover:text-[#0F6168] transition-colors"
                    >
                      {method.info}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Send Us a Message"
            subtitle="Fill out the form below and we'll get back to you within 24 hours."
          />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Location
            </h2>
            <p className="text-xl text-gray-600">
              Visit us at our Scottsdale office for in-person consultations
            </p>
          </div>

          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#3CBEC7] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">RAH Operations</h3>
              <p className="text-gray-600">6301 E Pinnacle Vista Dr Unit 1004</p>
              <p className="text-gray-600">Scottsdale, AZ 85266</p>
              <button className="mt-4 text-[#1A7C81] font-medium hover:text-[#0F6168] transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does it take to see results?
              </h3>
              <p className="text-gray-600">
                Results vary by service, but most clients see improvements within 30-90 days. Credit repair and business credit building typically show results in 60-90 days, while digital marketing campaigns can show initial results within 30 days.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer guarantees on your services?
              </h3>
              <p className="text-gray-600">
                We offer satisfaction guarantees on our work quality and process. While we can't guarantee specific outcomes (as results depend on many factors), we guarantee professional service and will work with you until you're satisfied with our efforts.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What makes RAH Operations different?
              </h3>
              <p className="text-gray-600">
                Our comprehensive approach combines multiple business services under one roof. We focus on long-term relationships and provide ongoing support, not just one-time services. Our team has over 50 years of combined experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;