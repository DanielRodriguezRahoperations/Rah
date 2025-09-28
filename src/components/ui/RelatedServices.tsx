import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedService {
  title: string;
  description: string;
  path: string;
  category: string;
}

interface RelatedServicesProps {
  currentService: string;
  category?: string;
}

const RelatedServices: React.FC<RelatedServicesProps> = ({ currentService, category }) => {
  const allServices: RelatedService[] = [
    {
      title: 'Website Design & SEO',
      description: 'Custom websites that rank #1 on Google for Arizona businesses',
      path: '/website-design-and-seo',
      category: 'digital'
    },
    {
      title: 'Digital Marketing',
      description: 'SEO, social media, and lead generation strategies',
      path: '/digital-marketing',
      category: 'digital'
    },
    {
      title: 'Social Media Management',
      description: 'Professional social media management and content creation',
      path: '/social-media-management',
      category: 'digital'
    },
    {
      title: 'Business Credit & Funding',
      description: 'Establish business credit and secure funding for growth',
      path: '/business-credit-and-funding',
      category: 'business'
    },
    {
      title: 'New Business Setup',
      description: 'Complete LLC formation and business registration services',
      path: '/new-business-setup',
      category: 'business'
    },
    {
      title: 'Personal Credit Repair',
      description: 'Improve your credit score and remove negative items',
      path: '/personal-credit-repair',
      category: 'credit'
    },
    {
      title: 'Notary Services',
      description: 'Professional notary services throughout Arizona',
      path: '/notary-services',
      category: 'business'
    }
  ];

  // Filter out current service and get related services
  const relatedServices = allServices
    .filter(service => service.path !== currentService)
    .filter(service => !category || service.category === category)
    .slice(0, 3);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Related Services
          </h2>
          <p className="text-lg text-gray-600">
            Explore our other Arizona business solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedServices.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link 
                  to={service.path}
                  className="hover:text-[#1A7C81] transition-colors"
                  title={`Learn more about ${service.title}`}
                >
                  {service.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              <Link
                to={service.path}
                className="inline-flex items-center text-[#1A7C81] hover:text-[#0F6168] font-medium transition-colors"
                title={`Get ${service.title} services`}
              >
                View {service.title} Details
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 transform hover:scale-105"
            title="View all Arizona business services"
          >
            View All Arizona Business Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;