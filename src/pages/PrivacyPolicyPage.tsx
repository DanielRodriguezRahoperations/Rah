import React from 'react';
import { Shield, Mail, Phone, FileText } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | RAH Operations"
        description="Privacy Policy for RAH Operations - Business Credit & SEO Experts. Learn how we collect, use, and protect your information."
        keywords="privacy policy, RAH Operations privacy, data protection, business credit privacy"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy - RAH Operations',
          description: 'Privacy Policy for RAH Operations - Business Credit & SEO Experts.',
          url: 'https://www.rahoperations.com/privacy-policy',
          mainEntity: {
            '@type': 'LocalBusiness',
            name: 'RAH Operations',
            telephone: '+1-888-472-4621',
            email: 'Daniel@rahoperations.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6301 E Pinnacle Vista Dr Unit 2004',
              addressLocality: 'Scottsdale',
              addressRegion: 'AZ',
              postalCode: '85266',
              addressCountry: 'US'
            }
          }
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 text-[#0F6168] mx-auto mb-6" />
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
              Privacy Policy
            </h1>
            <p className="text-xl text-[#104A53] mb-8 max-w-3xl mx-auto leading-relaxed">
              RAH Operations - Business Credit & SEO Experts
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-8 leading-relaxed">
                At RAH Operations - Business Credit & SEO Experts, we value the privacy and security of our visitors and clients. 
                This privacy policy explains how we collect, use, and protect your information when you visit our Facebook page and interact with our business.
              </p>

              <div className="space-y-8">
                {/* Section 1 */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#3CBEC7] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      1
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                  </div>
                  <p className="text-gray-700 mb-4">We may collect personal information from you, such as:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      Name
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      Email address
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      Phone number
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      Business-related information
                    </li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#3CBEC7] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      2
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                  </div>
                  <p className="text-gray-700 mb-4">We may use your information to:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      Respond to inquiries or provide services
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      Send updates or promotional materials
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                      Improve our services and user experience
                    </li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#3CBEC7] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      3
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
                  </div>
                  <p className="text-gray-700">
                    We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.
                  </p>
                </div>

                {/* Section 4 */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#3CBEC7] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      4
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
                  </div>
                  <p className="text-gray-700">
                    We do not share your personal information with third-party companies unless required by law or to complete a service you've requested.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#3CBEC7] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      5
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
                  </div>
                  <p className="text-gray-700">
                    You may request access to or deletion of your personal data at any time.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#3CBEC7] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      6
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  <p className="text-gray-700 mb-4">
                    For any questions or concerns regarding your privacy, please contact us at:
                  </p>
                  <div className="flex items-center space-x-2 text-[#1A7C81] font-medium">
                    <Mail className="w-5 h-5" />
                    <a href="mailto:info@rahoperations.com" className="hover:text-[#0F6168] transition-colors">
                      info@rahoperations.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;