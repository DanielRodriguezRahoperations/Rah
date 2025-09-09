import React, { useEffect, useRef } from 'react';
import { Users, Target, Award, Heart, ArrowRight, CheckCircle, Star, TrendingUp, Globe, Building, Users2 } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          if (entry.target.classList.contains('stats-trigger')) {
            animateStats();
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stats-trigger').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-animate');
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0');
      let current = 0;
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current).toString() + (stat.getAttribute('data-suffix') || '');
      }, 40);
    });
  };

  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable results that directly impact your business growth and success.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your success is our priority. We provide personalized service and ongoing support for every client.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Award,
      title: 'Expert Knowledge',
      description: 'Our team brings decades of combined experience in business services and financial solutions.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Heart,
      title: 'Integrity First',
      description: 'We operate with complete transparency and honesty, building long-term relationships based on trust.',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const expertiseAreas = [
    {
      icon: Globe,
      title: 'Website Design & SEO',
      description: 'Custom websites that rank #1 on Google for Arizona businesses',
      stats: '500+ Websites Built'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns that drive Arizona business growth',
      stats: '300% Avg Growth'
    },
    {
      icon: Building,
      title: 'eCommerce Development',
      description: 'High-converting online stores for Arizona entrepreneurs',
      stats: '$2M+ Revenue Generated'
    },
    {
      icon: Users2,
      title: 'Business Strategy',
      description: 'Strategic planning and execution for Arizona business success',
      stats: '98% Success Rate'
    }
  ];

  const achievements = [
    { number: '10', suffix: '+', label: 'Years of Experience' },
    { number: '500', suffix: '+', label: 'Arizona Businesses Served' },
    { number: '1', suffix: '', label: 'Google Rankings' },
    { number: '98', suffix: '%', label: 'Client Satisfaction' }
  ];

  return (
    <>
      <SEOHead
        title="About RAH Operations | Arizona Business Solutions Team"
        description="Learn about RAH Operations' mission and expert team. Arizona business solutions including website design, SEO, digital marketing, and business credit since 2015."
        keywords="about RAH Operations Arizona, Arizona business solutions team, Scottsdale business consultants, Phoenix web design team"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full float-animation"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full float-animation-delay"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full float-animation"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="hero-title text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
              ABOUT US
            </h1>
            <p className="hero-subtitle text-xl lg:text-2xl text-[#104A53] mb-8 max-w-4xl mx-auto leading-relaxed">
              For over a decade, we've been helping Arizona businesses achieve their growth goals through expert website design,
              SEO, digital marketing, and business credit solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                To empower Arizona businesses with the digital tools and strategies they need to succeed online.
                We believe every Arizona business deserves access to professional website design, effective SEO,
                and proven marketing strategies.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Since 2015, we've built our reputation on delivering real results for Arizona businesses.
                Our comprehensive approach combines technical expertise with local market knowledge, ensuring
                each client receives solutions tailored to the Arizona market.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] rounded-xl">
                  <div className="text-2xl font-bold text-[#1A7C81] mb-1">2015</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] rounded-xl">
                  <div className="text-2xl font-bold text-[#1A7C81] mb-1">100%</div>
                  <div className="text-sm text-gray-600">Arizona Focused</div>
                </div>
              </div>
            </div>
            <div className="fade-in-right">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                  alt="RAH Operations team working on Arizona business solutions"
                  className="rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3CBEC7]/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide every client interaction and business decision
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className={`text-center group fade-in-up stagger-${index + 1}`}>
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                    <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#1A7C81] transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our CEO & Founder
            </h2>
            <p className="text-xl text-gray-600">
              Visionary leadership driving Arizona business success
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left fade-in-left">
                  <div className="relative inline-block">
                    <img
                      src="/Daniel%20Rodriguez%20Image.png"
                      alt="Daniel Rodriguez - CEO & Founder of RAH Operations"
                      className="w-64 h-64 rounded-full mx-auto lg:mx-0 mb-8 object-cover shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 w-64 h-64 rounded-full bg-gradient-to-tr from-[#3CBEC7]/20 to-transparent mx-auto lg:mx-0"></div>
                  </div>
                </div>
                <div className="fade-in-right">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Daniel Rodriguez</h3>
                  <p className="text-[#1A7C81] font-semibold text-xl mb-6">CEO & Founder</p>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    <p>
                      Daniel Rodriguez is the visionary CEO of RAH Operations, bringing over 15 years of expertise in business development, marketing, consulting, and eCommerce. His deep understanding of how to drive traffic, generate buzz, and build strong business foundations is the cornerstone of the company's success.
                    </p>
                    <p>
                      Daniel specializes in helping entrepreneurs launch and grow their businesses—from setting up entities, domains, and email systems to designing high-converting eCommerce websites and executing strategic marketing campaigns. His holistic, hands-on approach ensures that businesses are not only built the right way, but are also positioned for long-term growth.
                    </p>
                    <p>
                      Under his leadership, RAH Operations has guided startups and rebrands alike through brand reputation management, consulting, business strategy consulting, and business management consulting. Daniel's forward-thinking mindset, passion for innovation, and proven track record make him a trusted partner for businesses looking to scale and succeed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Daniel's Areas of Expertise
            </h2>
            <p className="text-xl text-gray-600">
              15+ years of proven experience helping Arizona businesses succeed online
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className={`service-card fade-in-up stagger-${index + 1}`}>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#3CBEC7] via-[#1A7C81] to-[#0F6168] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                      <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1A7C81] transition-colors duration-300">{area.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-4">{area.description}</p>
                    <div className="text-[#3CBEC7] font-semibold text-sm">{area.stats}</div>
                    <div className="w-2 h-2 bg-[#3CBEC7] rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-trigger py-20 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full float-animation"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full float-animation-delay"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full float-animation"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Why Choose RAH Operations?</h2>
            <p className="text-xl text-gray-200">What sets us apart in the Arizona market</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className={`text-center fade-in-up stagger-${index + 1}`}>
                <div className="stat-animate text-5xl font-bold text-[#97EDED] mb-4" data-target={achievement.number} data-suffix={achievement.suffix}>0{achievement.suffix}</div>
                <div className="text-xl font-semibold mb-2">{achievement.label}</div>
                <p className="text-gray-200 text-sm">
                  {index === 0 && "Deep understanding of the Arizona business landscape."}
                  {index === 1 && "Local businesses we've helped grow and succeed online."}
                  {index === 2 && "We help Arizona businesses rank #1 on Google."}
                  {index === 3 && "Client satisfaction and retention rate."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Grow Your Arizona Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how RAH Operations can help your Arizona business dominate online.
          </p>
          <Button size="lg" to="/contact" className="pulse-glow">
            Get Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;