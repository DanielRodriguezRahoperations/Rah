import React, { useState, useEffect, useRef } from 'react';
import { Star, Play, Quote, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  company: string;
  text: string;
  rating: number;
  videoUrl?: string;
  videoThumbnail?: string;
  beforeAfter?: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  };
  companyLogo?: string;
  role?: string;
  featured?: boolean;
}

interface EnhancedTestimonialsProps {
  testimonials?: Testimonial[];
  showClientLogos?: boolean;
  showVideoTestimonials?: boolean;
  autoplay?: boolean;
}

const EnhancedTestimonials: React.FC<EnhancedTestimonialsProps> = ({
  testimonials: propTestimonials,
  showClientLogos = true,
  showVideoTestimonials = true,
  autoplay = true
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Enhanced testimonials data with video and metrics
  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Martinez',
      location: 'Phoenix, AZ',
      company: 'Phoenix Home Services',
      role: 'CEO',
      text: 'RAH Operations transformed our online presence completely. We went from invisible on Google to ranking #1 for "Phoenix home services" in just 3 months. Our leads increased 300% and revenue doubled!',
      rating: 5,
      videoUrl: '/testimonials/sarah-video.mp4',
      videoThumbnail: '/testimonials/sarah-thumb.jpg',
      beforeAfter: {
        metric: 'Monthly Leads',
        before: '12',
        after: '48',
        improvement: '300%'
      },
      companyLogo: '/client-logos/phoenix-home-services.png',
      featured: true
    },
    {
      id: '2',
      name: 'John Davidson',
      location: 'Scottsdale, AZ',
      company: 'Davidson Real Estate Group',
      role: 'Principal Broker',
      text: 'Daniel and his team didn\'t just build us a website - they built us a lead generation machine. Our Google My Business went from 12 reviews to over 100, and we\'re now the top-rated real estate team in Scottsdale.',
      rating: 5,
      beforeAfter: {
        metric: 'Google Reviews',
        before: '12',
        after: '100+',
        improvement: '733%'
      },
      companyLogo: '/client-logos/davidson-real-estate.png',
      featured: true
    },
    {
      id: '3',
      name: 'Lisa Thompson',
      location: 'Tempe, AZ',
      company: 'Thompson Consulting',
      role: 'Founder',
      text: 'I was skeptical about digital marketing agencies, but RAH Operations proved me wrong. They delivered exactly what they promised - real results, not just pretty reports. My business credit went from 0 to 680 in 6 months.',
      rating: 5,
      beforeAfter: {
        metric: 'Business Credit Score',
        before: '0',
        after: '680',
        improvement: 'Built from scratch'
      },
      companyLogo: '/client-logos/thompson-consulting.png'
    },
    {
      id: '4',
      name: 'Marcus Johnson',
      location: 'Chandler, AZ',
      company: 'Johnson Law Firm',
      role: 'Managing Partner',
      text: 'Before RAH Operations, I had zero online presence. Now I\'m ranking on the first page of Google for "Chandler personal injury lawyer" and my phone hasn\'t stopped ringing. ROI has been incredible.',
      rating: 5,
      videoUrl: '/testimonials/marcus-video.mp4',
      videoThumbnail: '/testimonials/marcus-thumb.jpg',
      beforeAfter: {
        metric: 'Monthly Revenue',
        before: '$45K',
        after: '$125K',
        improvement: '178%'
      },
      companyLogo: '/client-logos/johnson-law.png',
      featured: true
    },
    {
      id: '5',
      name: 'Emily Rodriguez',
      location: 'Mesa, AZ',
      company: 'Rodriguez Dental Practice',
      role: 'DDS',
      text: 'RAH Operations helped me establish my practice as the premier dental office in Mesa. Their social media management and SEO work brought in 50+ new patients in the first month alone.',
      rating: 5,
      beforeAfter: {
        metric: 'New Patients/Month',
        before: '8',
        after: '58',
        improvement: '625%'
      },
      companyLogo: '/client-logos/rodriguez-dental.png'
    },
    {
      id: '6',
      name: 'David Chen',
      location: 'Glendale, AZ',
      company: 'Chen Financial Services',
      role: 'Financial Advisor',
      text: 'The business credit program was a game-changer. We secured $150K in business funding without personal guarantees, which allowed us to expand our office and hire 3 new advisors.',
      rating: 5,
      beforeAfter: {
        metric: 'Business Funding',
        before: '$0',
        after: '$150K',
        improvement: 'Fully funded'
      },
      companyLogo: '/client-logos/chen-financial.png'
    }
  ];

  const testimonials = propTestimonials || defaultTestimonials;
  const featuredTestimonials = testimonials.filter(t => t.featured);

  // Client logos for marquee
  const clientLogos = [
    { name: 'Phoenix Home Services', logo: '/client-logos/phoenix-home-services.png' },
    { name: 'Davidson Real Estate', logo: '/client-logos/davidson-real-estate.png' },
    { name: 'Thompson Consulting', logo: '/client-logos/thompson-consulting.png' },
    { name: 'Johnson Law Firm', logo: '/client-logos/johnson-law.png' },
    { name: 'Rodriguez Dental', logo: '/client-logos/rodriguez-dental.png' },
    { name: 'Chen Financial', logo: '/client-logos/chen-financial.png' },
    { name: 'Arizona Auto Group', logo: '/client-logos/arizona-auto.png' },
    { name: 'Desert Landscaping', logo: '/client-logos/desert-landscaping.png' }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % featuredTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredTestimonials.length, autoplay]);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.testimonial-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#3CBEC7] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#97EDED] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 testimonial-animate fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-[#C9F8F6] rounded-full text-[#0F6168] text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Client Success Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real Results for
            <span className="block text-[#1A7C81]">Arizona Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See how we've helped Arizona businesses achieve 
            remarkable growth and dominate their local markets.
          </p>
        </div>

        {/* Featured Video Testimonials */}
        {showVideoTestimonials && (
          <div className="mb-20">
            <div className="text-center mb-12 testimonial-animate fade-in-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Video Testimonials</h3>
              <p className="text-gray-600">Hear directly from our satisfied clients</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTestimonials
                .filter(t => t.videoUrl)
                .slice(0, 2)
                .map((testimonial, index) => (
                <div key={testimonial.id} className={`testimonial-animate fade-in-up stagger-${index + 1}`}>
                  <div className="relative group cursor-pointer" onClick={() => openVideoModal(testimonial.videoUrl!)}>
                    <div className="aspect-video bg-gradient-to-br from-[#97EDED] to-[#C9F8F6] rounded-xl overflow-hidden shadow-lg">
                      {/* Video Thumbnail */}
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                        <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm opacity-90">{testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics Card */}
                    {testimonial.beforeAfter && (
                      <div className="mt-4 bg-white rounded-lg p-4 shadow-md border border-gray-100">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2">{testimonial.beforeAfter.metric}</div>
                          <div className="flex items-center justify-center space-x-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-400">{testimonial.beforeAfter.before}</div>
                              <div className="text-xs text-gray-500">Before</div>
                            </div>
                            <TrendingUp className="w-5 h-5 text-[#3CBEC7]" />
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#1A7C81]">{testimonial.beforeAfter.after}</div>
                              <div className="text-xs text-gray-500">After</div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm font-semibold text-[#3CBEC7]">
                            {testimonial.beforeAfter.improvement} Growth
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Testimonials Carousel */}
        <div className="mb-20">
          <div className="text-center mb-12 testimonial-animate fade-in-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Client Stories</h3>
            <p className="text-gray-600">Read what our clients say about working with us</p>
          </div>

          <div className="relative" ref={testimonialRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials
                .slice(currentSlide * 3, (currentSlide * 3) + 3)
                .map((testimonial, index) => (
                <div key={testimonial.id} className={`testimonial-animate fade-in-up stagger-${index + 1}`}>
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] rounded-full transform translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                      {/* Quote Icon */}
                      <div className="w-12 h-12 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Quote className="w-6 h-6 text-white" />
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 text-[#3CBEC7] fill-current animate-pulse" 
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 mb-6 italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        "{testimonial.text}"
                      </p>

                      {/* Client Info */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          {testimonial.role && (
                            <div className="text-[#1A7C81] text-sm font-medium">{testimonial.role}</div>
                          )}
                          <div className="text-gray-500 text-sm">{testimonial.company}</div>
                          <div className="text-gray-400 text-xs">{testimonial.location}</div>
                        </div>
                        
                        {testimonial.companyLogo && (
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                            <img 
                              src={testimonial.companyLogo} 
                              alt={`${testimonial.company} logo`}
                              className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                              onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                          </div>
                        )}
                      </div>

                      {/* Before/After Metrics */}
                      {testimonial.beforeAfter && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-2">{testimonial.beforeAfter.metric}</div>
                            <div className="flex items-center justify-center space-x-3">
                              <span className="text-lg font-bold text-gray-400">{testimonial.beforeAfter.before}</span>
                              <span className="text-[#3CBEC7]">→</span>
                              <span className="text-lg font-bold text-[#1A7C81]">{testimonial.beforeAfter.after}</span>
                            </div>
                            <div className="text-xs font-semibold text-[#3CBEC7] mt-1">
                              {testimonial.beforeAfter.improvement}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {testimonials.length > 3 && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1A7C81] hover:bg-[#1A7C81] hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-[#1A7C81] scale-125' 
                          : 'bg-gray-300 hover:bg-[#3CBEC7]'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1A7C81] hover:bg-[#1A7C81] hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Client Logos Marquee */}
        {showClientLogos && (
          <div className="testimonial-animate fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted by Arizona Businesses</h3>
              <p className="text-gray-600">Join hundreds of successful Arizona companies</p>
            </div>
            
            <div className="relative overflow-hidden bg-white rounded-xl py-8 shadow-sm border border-gray-100">
              <div className="flex animate-marquee space-x-12">
                {[...clientLogos, ...clientLogos].map((client, index) => (
                  <div key={index} className="flex items-center justify-center min-w-[150px] h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        // Fallback to text if logo fails to load
                        e.currentTarget.style.display = 'none';
                        const textDiv = document.createElement('div');
                        textDiv.className = 'text-gray-400 font-medium text-sm text-center';
                        textDiv.textContent = client.name;
                        e.currentTarget.parentNode?.appendChild(textDiv);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {isVideoModalOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeVideoModal}>
            <div className="relative max-w-4xl w-full aspect-video bg-black rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
              >
                ×
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default EnhancedTestimonials;
