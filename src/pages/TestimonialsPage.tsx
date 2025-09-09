import React from 'react';
import { Star, Quote } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Phoenix, AZ',
      text: 'Incredible service and support. I wish we partnered with them sooner!',
      rating: 5
    },
    {
      name: 'John D.',
      location: 'Scottsdale, AZ',
      text: 'RAH Operations helped us double our monthly leads and positioned us as a market leader!',
      rating: 5
    },
    {
      name: 'Lisa T.',
      location: 'Tempe, AZ',
      text: 'I was skeptical about digital marketing agencies, but Daniel proved me wrong. He listened to my goals, created a plan, and delivered real results in just a few weeks.',
      rating: 5
    },
    {
      name: 'Jamal R.',
      location: 'Chandler, AZ',
      text: 'Before working with RAH Operations, I had no online presence and didn\'t know where to start. Now I\'m ranking on Google, and my phone hasn\'t stopped ringing. They know what they\'re doing!',
      rating: 5
    },
    {
      name: 'Jeremy White',
      location: 'Phoenix, AZ',
      text: 'Daniel and the team at RAH Operations helped me take my business from an idea to a fully structured LLC with solid business credit in under 30 days. Their hands-on approach made the process easy to follow and stress-free.',
      rating: 5
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Client Testimonials - RAH Operations',
    description: 'Read testimonials from Arizona businesses who have worked with RAH Operations for website design, SEO, and business services.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'RAH Operations',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: testimonials.length,
        bestRating: '5',
        worstRating: '5'
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Client Testimonials | RAH Operations Arizona"
        description="Read testimonials from Arizona businesses who have worked with RAH Operations for website design, SEO, digital marketing, and business credit services."
        keywords="RAH Operations testimonials, Arizona business testimonials, client reviews Phoenix, Scottsdale business reviews"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
              TESTIMONIALS
            </h1>
            <p className="text-xl text-[#104A53] mb-8 max-w-3xl mx-auto leading-relaxed">
              See what Arizona businesses are saying about working with RAH Operations
            </p>
          </div>
        </div>
      </section>

      {/* RAH Operations Logo Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <img 
              src="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png" 
              alt="RAH Operations Logo" 
              className="h-24 w-auto"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-[#97EDED] mb-4" />
                  <p className="text-gray-700 text-lg leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900 text-lg">— {testimonial.name}</div>
                  <div className="text-[#1A7C81] font-medium">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Let's discuss how RAH Operations can help your Arizona business achieve similar results.
          </p>
          <Button variant="secondary" size="lg" to="/contact">
            Get Started Today
          </Button>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;