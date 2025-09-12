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
      action: 'https://www.google.com/maps/place/Rah+Operations+LLC/@33.7335583,-111.9450294,969m/data=!3m2!1e3!4b1!4m6!3m5!1s0x872b790bdab5c151:0xac53f9ac22bb3909!8m2!3d33.7335583!4d-111.9450294!16s%2Fg%2F11mcpjh776?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D'
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
      telephone: '+1-888-472-4621',
      email: 'Daniel@rahoperations.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6301 E Pinnacle Vista Dr Unit 1004',
        addressLocality: 'Scottsdale',
        addressRegion: 'AZ',
        postalCode: '85266',
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
                      target={method.action.startsWith('http') ? '_blank' : undefined}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
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

      {/* Map Section with Embedded Google Map */}
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

          {/* Embedded Google Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.2968507892844!2d-111.94722938482086!3d33.73355558071534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b790bdab5c151%3A0xac53f9ac22bb3909!2sRah%20Operations%20LLC!5e0!3m2!1sen!2sus!4v1694123456789!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RAH Operations Location - 6301 E Pinnacle Vista Dr Unit 1004, Scottsdale, AZ 85266"
            ></iframe>
          </div>

          {/* Address and Directions */}
          <div className="mt-8 text-center">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#3CBEC7] mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">RAH Operations</h3>
              </div>
              <p className="text-gray-600 text-lg mb-2">6301 E Pinnacle Vista Dr Unit 1004</p>
              <p className="text-gray-600 text-lg mb-6">Scottsdale, AZ 85266</p>
              <a
                href="https://www.google.com/maps/place/Rah+Operations+LLC/@33.7335583,-111.9450294,969m/data=!3m2!1e3!4b1!4m6!3m5!1s0x872b790bdab5c151:0xac53f9ac22bb3909!8m2!3d33.7335583!4d-111.9450294!16s%2Fg%2F11mcpjh776?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-6 py-3 rounded-lg font-medium hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 transform hover:scale-105"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Get Directions
              </a>
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
              <h3 className="text-lg font-semibent text-gray-900 mb-2">
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
