import React, { useState } from 'react';
import { ExternalLink, Code, Palette, Smartphone, Globe, ArrowRight, Calendar, Users, Star } from 'lucide-react';

const Portfoliopage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      title: "Arizona Restaurant Association",
      category: "website",
      image: "/api/placeholder/600/400",
      description: "Modern restaurant website with online ordering system and member portal",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      features: ["Online Ordering", "Member Portal", "Event Management", "Mobile Responsive"],
      completedDate: "2024",
      clientType: "Association"
    },
    {
      id: 2,
      title: "Phoenix Medical Group",
      category: "website",
      image: "/api/placeholder/600/400",
      description: "Healthcare website with appointment booking and patient portal integration",
      technologies: ["WordPress", "PHP", "MySQL", "HIPAA Compliant"],
      liveUrl: "#",
      features: ["Appointment Booking", "Patient Portal", "HIPAA Compliant", "Telemedicine Ready"],
      completedDate: "2024",
      clientType: "Healthcare"
    },
    {
      id: 3,
      title: "Desert Solar Solutions",
      category: "website",
      image: "/api/placeholder/600/400",
      description: "Solar energy company website with cost calculator and lead generation",
      technologies: ["React", "TypeScript", "Tailwind CSS", "HubSpot"],
      liveUrl: "#",
      features: ["Solar Calculator", "Lead Generation", "ROI Analysis", "3D Visualization"],
      completedDate: "2023",
      clientType: "Energy"
    },
    {
      id: 4,
      title: "Scottsdale Law Firm",
      category: "website",
      image: "/api/placeholder/600/400",
      description: "Professional law firm website with case management system",
      technologies: ["WordPress", "Custom Theme", "SEO Optimized", "Security Enhanced"],
      liveUrl: "#",
      features: ["Case Management", "Client Portal", "SEO Optimized", "Secure Communications"],
      completedDate: "2023",
      clientType: "Legal"
    },
    {
      id: 5,
      title: "Arizona Real Estate App",
      category: "mobile",
      image: "/api/placeholder/600/400",
      description: "Mobile app for real estate listings with AR property viewing",
      technologies: ["React Native", "Firebase", "ARKit", "Google Maps"],
      liveUrl: "#",
      features: ["AR Property View", "Virtual Tours", "Mortgage Calculator", "Location Services"],
      completedDate: "2024",
      clientType: "Real Estate"
    },
    {
      id: 6,
      title: "Valley Fitness Chain",
      category: "branding",
      image: "/api/placeholder/600/400",
      description: "Complete brand identity and digital marketing campaign",
      technologies: ["Adobe Creative Suite", "Brand Strategy", "Social Media", "Print Design"],
      liveUrl: "#",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Social Media Kit"],
      completedDate: "2023",
      clientType: "Fitness"
    },
    {
      id: 7,
      title: "Tech Startup Dashboard",
      category: "webapp",
      image: "/api/placeholder/600/400",
      description: "SaaS analytics dashboard with real-time data visualization",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      liveUrl: "#",
      features: ["Real-time Analytics", "Custom Reports", "API Integration", "Multi-tenant"],
      completedDate: "2024",
      clientType: "Technology"
    },
    {
      id: 8,
      title: "Arizona Tourism Board",
      category: "website",
      image: "/api/placeholder/600/400",
      description: "Interactive tourism website with virtual tours and booking system",
      technologies: ["Next.js", "Sanity CMS", "Stripe", "Google Analytics"],
      liveUrl: "#",
      features: ["Virtual Tours", "Booking System", "Multi-language", "Interactive Maps"],
      completedDate: "2023",
      clientType: "Tourism"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'website', name: 'Websites', icon: Globe },
    { id: 'webapp', name: 'Web Apps', icon: Code },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'branding', name: 'Branding', icon: Palette }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const stats = [
    { number: "150+", label: "Projects Completed", icon: Star },
    { number: "98%", label: "Client Satisfaction", icon: Users },
    { number: "5+", label: "Years Experience", icon: Calendar },
    { number: "50+", label: "Happy Clients", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#3CBEC7] via-[#1A7C81] to-[#0F6168] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-100">
              Showcasing innovative digital solutions for Arizona businesses
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${300 + index * 100}ms`}}>
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-[#97EDED]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === category.id
                    ? 'bg-[#3CBEC7] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={item.liveUrl}
                      className="bg-white text-[#1A7C81] p-2 rounded-full hover:bg-[#3CBEC7] hover:text-white transition-colors duration-300"
                      aria-label="View project"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#C9F8F6] text-[#1A7C81] px-3 py-1 rounded-full text-sm font-medium">
                      {item.clientType}
                    </span>
                    <span className="text-gray-500 text-sm">{item.completedDate}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1A7C81] transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        +{item.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {item.features.slice(0, 2).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <ArrowRight className="w-4 h-4 text-[#3CBEC7] mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={item.liveUrl}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white py-3 px-4 rounded-lg font-medium hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#97EDED] via-[#C9F8F6] to-[#B5F3F0] py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A7C81] mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Let's work together to create something amazing for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Project
            </a>
            <a
              href="tel:+18884724621"
              className="bg-white text-[#1A7C81] px-8 py-4 rounded-lg font-semibold border-2 border-[#3CBEC7] hover:bg-[#3CBEC7] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Call (888) 472-4621
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfoliopage;
