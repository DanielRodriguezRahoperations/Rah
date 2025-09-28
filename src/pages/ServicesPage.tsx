// Build fix - timestamp: Jan 17 2025
// ...existing code...
import { Globe, CreditCard, BarChart3, Building2, TrendingUp, Users, FileText, ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import InternalLinks from '../components/ui/InternalLinks';

const ServicesPage = () => {
  const services = [
    {
      icon: Globe,
      title: 'Website Design & SEO',
      description: 'Custom website design and search engine optimization to help your Arizona business rank higher on Google and attract more customers.',
      link: '/website-design-and-seo',
      features: [
        'Custom Website Design',
        'Search Engine Optimization (SEO)',
  'Local SEO for Arizona Markets',
        'Mobile-Responsive Design',
        'Google My Business Optimization'
      ]
    },
    {
      icon: Building2,
      title: 'New Business Setup',
      description: 'Complete business formation services including LLC setup, EIN registration, and all required documentation to start your Arizona business properly.',
      link: '/new-business-setup',
      features: [
        'LLC Formation & Registration',
        'EIN Application & Setup',
        'Operating Agreement Drafting',
        'Business License Assistance',
        'Registered Agent Services'
      ]
    },
    {
      icon: CreditCard,
      title: 'Business Credit & Funding',
      description: 'Establish and build business credit, secure funding, and access capital for growth without using your personal credit.',
      link: '/business-credit-and-funding',
      features: [
        'Business Credit Building',
        'Funding Solutions',
        'D-U-N-S Number Setup',
        'Trade Line Development',
        'Business Credit Cards'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Personal Credit Repair',
      description: 'Professional credit repair services to improve your personal credit score, remove negative items, and build better credit history.',
      link: '/personal-credit-repair',
      features: [
        'Credit Report Analysis',
        'Dispute Letter Preparation',
        'Creditor Negotiations',
        'Credit Score Improvement',
        'Financial Education & Coaching'
      ]
    },
    {
      icon: BarChart3,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies including SEO, social media, and lead generation to grow your Arizona business.',
      link: '/digital-marketing',
      features: [
        'Search Engine Optimization',
        'Social Media Marketing',
        'Google Business Optimization',
        'Lead Generation Funnels',
        'Email Marketing Automation'
      ]
    },
    {
      icon: Users,
      title: 'Social Media Management',
      description: 'Professional social media management to build your brand presence, engage customers, and drive business growth across all platforms.',
      link: '/social-media-management',
      features: [
        'Content Creation & Strategy',
        'Daily Social Media Management',
        'Community Engagement',
        'Social Media Advertising',
        'Analytics & Reporting'
      ]
    },
    {
      icon: FileText,
      title: 'Arizona Notary Services',
      description: 'Professional notary services for all your business and personal document needs throughout Arizona.',
      link: '/notary-services',
      features: [
        'Document Notarization',
        'Mobile Notary Services',
        'Real Estate Closings',
        'Business Document Authentication',
        'Loan Signing Services'
      ]
    }
  ];


  return (
    <>
      <SEOHead
        title="Business Services Arizona | RAH Operations"
        description="Comprehensive business services for Arizona companies. Website design, SEO, business credit, and digital marketing solutions. Serving Phoenix, Scottsdale, Tempe."
        url={absoluteUrl("/services")}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
              SERVICES
            </h1>
            <p className="text-xl text-[#104A53] mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive business solutions to help Arizona companies grow and succeed online. From our 
              <InternalLinks 
                links={[
                  { text: 'Phoenix headquarters', url: '/about', title: 'About RAH Operations Arizona Team', context: 'location' }
                ]} 
                className="inline"
              />, we serve businesses throughout Arizona with professional services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mr-3"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" to={service.link} className="w-full">
                    Explore {service.title}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Grow Your Arizona Business?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Let's discuss which services are right for your business goals and budget.
          </p>
          <Button variant="secondary" size="lg" to="/contact">
            Schedule Free Business Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
