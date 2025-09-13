import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  showClientLogos?: boolean;
  showVideoTestimonials?: boolean;
  autoplay?: boolean;
}

const EnhancedTestimonials: React.FC<TestimonialProps> = ({
  showClientLogos = false,
  showVideoTestimonials = false,
  autoplay = false
}) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Phoenix Marketing Group",
      rating: 5,
      text: "RAH Operations transformed our online presence. Our website traffic increased by 300% in just 3 months!"
    },
    {
      name: "Mike Rodriguez",
      company: "Scottsdale Auto Repair",
      rating: 5,
      text: "Best investment we've made for our business. The SEO results speak for themselves."
    },
    {
      name: "Lisa Chen",
      company: "Tempe Consulting",
      rating: 5,
      text: "Professional, reliable, and results-driven. Highly recommend their services."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Arizona Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Real results from real Arizona businesses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
