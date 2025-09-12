import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, Users, TrendingUp, Shield, Building2, CreditCard, BarChart3, Globe, Search, FileText, MessageCircle, CheckCircle, Award, Zap } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import InternalLinks from '../components/ui/InternalLinks';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Special handling for stats animation
          if (entry.target.classList.contains('stats-section')) {
            animateNumbers();
          }
          
          // Trigger service card animations
          if (entry.target.classList.contains('services-container')) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 150);
            });
          }
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stats-section, .services-container, .slide-in, .bounce-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Animate numbers in stats section
  const animateNumbers = () => {
    const numbers = document.querySelectorAll('.animate-number');
    numbers.forEach((number) => {
      const target = parseInt(number.getAttribute('data-target') || '0');
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        number.textContent = Math.floor(current).toString() + (number.getAttribute('data-suffix') || '');
      }, 20);
    });
  };

  // Parallax effect for floating elements
  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const services = [
    {
      icon: Globe,
      title: 'Website Design & SEO',
      description: 'Custom website design and search engine optimization to help your Arizona business rank higher on Google and dominate local search results.',
      link: '/website-design-and-seo',
      features: ['Mobile-Responsive Design', 'Local Arizona SEO', 'Google My Business', 'Conversion Optimization'],
      color: 'from-[#3CBEC7] to-[#1A7C81]', // Primary teal gradient
      bgAccent: 'bg-[#3CBEC7]/10',
      iconBg: 'bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81]'
    },
    {
      icon: Building2,
      title: 'New Business Setup',
      description: 'Complete business formation services including LLC setup, EIN registration, and all required documentation to legally establish your Arizona business.',
      link: '/new-business-setup',
      features: ['LLC Formation', 'EIN Registration', 'Operating Agreements', 'Legal Compliance'],
      color: 'from-[#1A7C81] to-[#0F6168]', // Darker teal gradient
      bgAccent: 'bg-[#1A7C81]/10',
      iconBg: 'bg-gradient-to-r from-[#1A7C81] to-[#0F6168]'
    },
    {
      icon: CreditCard,
      title: 'Business Credit & Funding',
      description: 'Establish and build business credit, secure funding, and access capital for growth without relying on personal credit guarantees.',
      link: '/business-credit-and-funding',
      features: ['Credit Building', 'Funding Solutions', 'D-U-N-S Setup', 'Trade Lines'],
      color: 'from-[#97EDED] to-[#3CBEC7]', // Light teal gradient
      bgAccent: 'bg-[#97EDED]/20',
      iconBg: 'bg-gradient-to-r from-[#97EDED] to-[#3CBEC7]'
    },
    {
      icon: TrendingUp,
      title: 'Personal Credit Repair',
      description: 'Professional credit repair services to improve your personal credit score, remove negative items, and build better financial standing.',
      link: '/personal-credit-repair',
      features: ['Credit Analysis', 'Dispute Process', 'Score Improvement', 'Financial Coaching'],
      color: 'from-[#0F6168] to-[#104A53]', // Deep teal gradient
      bgAccent: 'bg-[#0F6168]/10',
      iconBg: 'bg-gradient-to-r from-[#0F6168] to-[#104A53]'
    },
    {
      icon: BarChart3,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies including SEO, social media, and lead generation to grow your Arizona business online.',
      link: '/digital-marketing',
      features: ['SEO Strategy', 'Social Media', 'Lead Generation', 'Analytics'],
      color: 'from-[#C9F8F6] to-[#97EDED]', // Soft teal gradient
      bgAccent: 'bg-[#C9F8F6]/30',
      iconBg: 'bg-gradient-to-r from-[#C9F8F6] to-[#97EDED]'
    },
    {
      icon: Users,
      title: 'Social Media Management',
      description: 'Professional social media management to build your brand presence, engage customers, and drive business growth across all platforms.',
      link: '/social-media-management',
      features: ['Content Creation', 'Community Management', 'Paid Advertising', 'Brand Building'],
      color: 'from-[#B5F3F0] to-[#C9F8F6]', // Gentle teal gradient
      bgAccent: 'bg-[#B5F3F0]/25',
      iconBg: 'bg-gradient-to-r from-[#B5F3F0] to-[#C9F8F6]'
    },
    {
      icon: FileText,
      title: 'Arizona Notary Services',
      description: 'Professional notary services for all your business and personal document needs throughout Arizona with mobile service available.',
      link: '/notary-services',
      features: ['Mobile Notary', 'Business Documents', 'Real Estate', 'Legal Papers'],
      color: 'from-[#3CBEC7] via-[#1A7C81] to-[#0F6168]', // Three-color teal gradient
      bgAccent: 'bg-[#3CBEC7]/15',
      iconBg: 'bg-gradient-to-r from-[#3CBEC7] via-[#1A7C81] to-[#0F6168]'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Phoenix, AZ',
      text: 'Incredible service and support. RAH Operations transformed our online presence and doubled our leads within 3 months!',
      rating: 5,
      company: 'Phoenix Home Services'
    },
    {
      name: 'John D.',
      location: 'Scottsdale, AZ',
      text: 'RAH Operations helped us double our monthly leads and positioned us as a market leader in Arizona!',
      rating: 5,
      company: 'Scottsdale Real Estate'
    },
    {
      name: 'Lisa T.',
      location: 'Tempe, AZ',
      text: 'I was skeptical about digital marketing agencies, but Daniel proved me wrong. He delivered real results in just a few weeks.',
      rating: 5,
      company: 'Tempe Consulting Group'
    },
    {
      name: 'Jamal R.',
      location: 'Chandler, AZ',
      text: 'Before working with RAH Operations, I had no online presence. Now I\'m ranking on Google, and my phone hasn\'t stopped ringing!',
      rating: 5,
      company: 'Chandler Law Firm'
    },
    {
      name: 'Jeremy White',
      location: 'Phoenix, AZ',
      text: 'Daniel helped me take my business from an idea to a fully structured LLC with solid business credit in under 30 days.',
      rating: 5,
      company: 'Arizona Tech Startup'
    }
  ];

  const achievements = [
    { 
      icon: Award,
      number: '500',
      suffix: '+',
      label: 'Arizona Businesses Served',
      description: 'Helping local businesses grow since 2015',
      color: 'text-[#3CBEC7]'
    },
    { 
      icon: Zap,
      number: '1',
      suffix: '',
      label: 'Google Rankings Achieved',
      description: 'Top search results for our clients',
      color: 'text-[#1A7C81]'
    },
    { 
      icon: Star,
      number: '98',
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Consistently exceeding expectations',
      color: 'text-[#97EDED]'
    },
    { 
      icon: TrendingUp,
      number: '10',
      suffix: '+',
      label: 'Years in Arizona',
      description: 'Deep local market expertise',
      color: 'text-[#0F6168]'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RAH Operations',
    description: 'Arizona Website Design & SEO specialists helping businesses rank higher on Google and grow online',
    url: 'https://www.rahoperations.com',
    telephone: '+1-888-472-4621',
    email: 'Daniel@rahoperations.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6301 E Pinnacle Vista Dr Unit 1004',
      addressLocality: 'Scottsdale',
      addressRegion: 'AZ',
      postalCode: '85266',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.6119,
      longitude: -111.8906
    },
    openingHours: 'Mo-Fr 08:00-17:00',
    sameAs: [
      'https://facebook.com/644350702085787',
      'https://www.linkedin.com/company/rah-operations-llc',
      'https://instagram.com/rahoperations/',
      'https://yelp.com/biz/rah-operations-scottsdale'
    ],
    areaServed: [
      'Phoenix',
      'Scottsdale',
      'Tempe',
      'Chandler',
      'Mesa',
      'Glendale',
      'Arizona'
    ],
    image: 'https://www.rahoperations.com/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '5'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Arizona Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Design & SEO Arizona',
            description: 'Custom website design and SEO services for Arizona businesses'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Credit & Funding',
            description: 'Business credit building and funding solutions for Arizona entrepreneurs'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing Arizona',
            description: 'Digital marketing and online advertising for Arizona businesses'
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Arizona Website Design & SEO | RAH Operations - #1 Ranked"
        description="Top-rated Arizona website design and SEO company. We help Arizona businesses rank #1 on Google with custom websites and proven SEO strategies. Serving Phoenix, Scottsdale, Tempe. Get your free quote today!"
        url={absoluteUrl("/")}
        keywords="Arizona website design, Arizona SEO, Phoenix web design, Scottsdale SEO, Arizona digital marketing, web design Arizona, SEO Arizona, Arizona business services"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#B5F3F0] py-20 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full float-animation parallax-element"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full float-animation-delay parallax-element"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full float-animation parallax-element"></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/10 rounded-full float-animation-delay parallax-element"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Animated badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#0F6168] text-sm font-medium mb-6 fade-in-up">
              <Award className="w-4 h-4 mr-2 text-[#1A7C81]" />
              #1 Rated Arizona Business Solutions
            </div>

            <h1 className="hero-title text-4xl lg:text-6xl font-bold text-[#0F6168] mb-6 leading-tight">
              Arizona Website Design
              <span className="text-[#1A7C81] block">& SEO Specialists</span>
            </h1>

            <p className="hero-subtitle text-xl lg:text-2xl text-[#104A53] mb-8 max-w-4xl mx-auto leading-relaxed">
              We help Arizona businesses dominate Google search results with custom website design and proven SEO strategies.
              <strong className="block mt-2"> Serving <InternalLinks
                links={[
                  { text: 'Phoenix', url: '/website-design-and-seo', title: 'Phoenix Website Design & SEO Services', context: 'location' },
                  { text: 'Scottsdale', url: '/digital-marketing', title: 'Scottsdale Digital Marketing Services', context: 'location' },
                  { text: 'Tempe', url: '/business-credit-and-funding', title: 'Tempe Business Credit Services', context: 'location' }
                ]}
                className="inline"
              />, and all of Arizona.</strong>
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" to="/contact" className="pulse-glow btn-magnetic bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] hover:from-[#1A7C81] hover:to-[#0F6168]">
                Get Free SEO Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" href="tel:+14884724621" className="btn-magnetic border-[#1A7C81] text-[#1A7C81] hover:bg-[#1A7C81] hover:text-white">
                Call (888) 472-4621
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-[#1A7C81] text-sm font-medium fade-in-up">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-[#3CBEC7]" />
                500+ Arizona Businesses Served
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#3CBEC7] fill-current" />
                5.0 Star Rating
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-[#3CBEC7]" />
                10+ Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
              Arizona Business Growth Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From website design to business credit, we provide comprehensive solutions to help Arizona businesses succeed online and offline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 services-container">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="service-card group relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Subtle background accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${service.bgAccent} rounded-full transform translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#1A7C81] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#3CBEC7] mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        to={service.link}
                        className="group-hover:bg-[#3CBEC7] group-hover:text-white group-hover:border-[#3CBEC7] border-[#1A7C81] text-[#1A7C81] transition-all duration-300"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="w-2 h-2 bg-[#3CBEC7] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full float-animation"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full float-animation-delay"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full float-animation"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Proven Results for Arizona Businesses</h2>
            <p className="text-xl text-[#C9F8F6]">Numbers that demonstrate our commitment to Arizona business success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className={`text-center fade-in-up stagger-${index + 1} group`}>
                  <div className="relative">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      <Icon className={`w-10 h-10 ${achievement.color}`} />
                    </div>
                    <div className="animate-number stat-number" data-target={achievement.number} data-suffix={achievement.suffix}>
                      0{achievement.suffix}
                    </div>
                    <div className="text-xl font-semibold mb-2 text-[#C9F8F6]">{achievement.label}</div>
                    <p className="text-[#B5F3F0] text-sm">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Arizona Businesses Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from Arizona businesses we've helped grow and succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card fade-in-up stagger-${index + 1} group`}
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#3CBEC7] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-[#1A7C81] text-sm">{testimonial.location}</div>
                    <div className="text-gray-500 text-xs mt-1">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-in-up">
            <Button to="/testimonials" className="btn-magnetic bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white hover:from-[#1A7C81] hover:to-[#0F6168]">
              View All Testimonials
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] bg-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
          <ContactForm
            title="Ready to Dominate Google in Arizona?"
            subtitle="Get a free consultation and discover how we can help your Arizona business rank #1 on Google."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
