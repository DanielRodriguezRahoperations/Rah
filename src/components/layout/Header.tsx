import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Briefcase, Home, User, BookOpen, Mail, Star, Layers, Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const serviceLinks = [
    { to: '/website-design-and-seo', label: 'Website Design & SEO', icon: '🎨' },
    { to: '/new-business-setup', label: 'New Business Setup', icon: '🚀' },
    { to: '/business-credit-and-funding', label: 'Business Credit & Funding', icon: '💳' },
    { to: '/personal-credit-repair', label: 'Personal Credit Repair', icon: '📈' },
    { to: '/digital-marketing', label: 'Digital Marketing', icon: '📱' },
    { to: '/social-media-management', label: 'Social Media Management', icon: '📢' },
    { to: '/notary-services', label: 'Arizona Notary Services', icon: '📝' }
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const isServicesActive = () => {
    return serviceLinks.some(link => location.pathname === link.to);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-lg py-2' : 'shadow-md py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <img
              src="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png"
              alt="RAH Operations Logo"
              className={`transition-all duration-300 group-hover:scale-105 ${
                scrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link 
              to="/" 
              className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                ${isActiveRoute('/') 
                  ? 'text-[#3CBEC7]' 
                  : 'text-gray-700 hover:text-[#3CBEC7]'
                }
                group
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-4 h-4" />
                HOME
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] transition-all duration-300 ${
                isActiveRoute('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className={`relative flex items-center px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                  ${isServicesActive() 
                    ? 'text-[#3CBEC7]' 
                    : 'text-gray-700 hover:text-[#3CBEC7]'
                  }
                  group
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  SERVICES
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </span>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] transition-all duration-300 ${
                  isServicesActive() ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />
              </button>
              
              {/* Enhanced Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform origin-top ${
                  isServicesOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <div className="p-2">
                  {serviceLinks.map((service, index) => (
                    <Link
                      key={index}
                      to={service.to}
                      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200 group
                        ${location.pathname === service.to 
                          ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#1A7C81]' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#3CBEC7]'
                        }
                      `}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <span className="text-lg">{service.icon}</span>
                      <span className="font-medium">{service.label}</span>
                    </Link>
                  ))}
                </div>
                <div className="p-3 bg-gradient-to-r from-[#F0FFFE] to-[#E8FCFA] border-t border-gray-100">
                  <Link
                    to="/services"
                    className="block text-center text-sm font-semibold text-[#1A7C81] hover:text-[#3CBEC7] transition-colors duration-200"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/portfolio" 
              className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                ${isActiveRoute('/portfolio') 
                  ? 'text-[#3CBEC7]' 
                  : 'text-gray-700 hover:text-[#3CBEC7]'
                }
                group
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                PORTFOLIO
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] transition-all duration-300 ${
                isActiveRoute('/portfolio') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </Link>

            <Link 
              to="/about" 
              className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                ${isActiveRoute('/about') 
                  ? 'text-[#3CBEC7]' 
                  : 'text-gray-700 hover:text-[#3CBEC7]'
                }
                group
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <User className="w-4 h-4" />
                ABOUT
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] transition-all duration-300 ${
                isActiveRoute('/about') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </Link>
            
            <Link 
              to="/blogs" 
              className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                ${isActiveRoute('/blogs') 
                  ? 'text-[#3CBEC7]' 
                  : 'text-gray-700 hover:text-[#3CBEC7]'
                }
                group
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                BLOG
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] transition-all duration-300 ${
                isActiveRoute('/blogs') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </Link>
            
            <Link 
              to="/testimonials" 
              className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                ${isActiveRoute('/testimonials') 
                  ? 'text-[#3CBEC7]' 
                  : 'text-gray-700 hover:text-[#3CBEC7]'
                }
                group
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Star className="w-4 h-4" />
                REVIEWS
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] transition-all duration-300 ${
                isActiveRoute('/testimonials') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </Link>
            
            <Link 
              to="/contact" 
              className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                ${isActiveRoute('/contact') 
                  ? 'text-[#3CBEC7]' 
                  : 'text-gray-700 hover:text-[#3CBEC7]'
                }
                group
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                CONTACT
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] transition-all duration-300 ${
                isActiveRoute('/contact') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Social Media Links */}
            <div className="hidden xl:flex items-center space-x-1 border-r border-gray-200 pr-4 mr-2">
              <a 
                href="https://share.google/OZPp85BfytCtF10Lj" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-[#3CBEC7] hover:bg-gray-50 rounded-lg transition-all duration-200"
                aria-label="Google Business Profile for RAH Operations"
                title="Google Business"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/rahoperations/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-[#E4405F] hover:bg-pink-50 rounded-lg transition-all duration-200"
                aria-label="RAH Operations Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61574789296433" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-[#1877F2] hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="RAH Operations Facebook"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.yelp.com/biz/rah-operations-scottsdale" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-[#FF1A1A] hover:bg-red-50 rounded-lg transition-all duration-200"
                aria-label="RAH Operations Yelp Reviews"
                title="Yelp"
              >
                <Star className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com/company/rah-operations-llc" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-[#0A66C2] hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="RAH Operations LLC LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            
            <a 
              href="tel:+18884724621" 
              className="hidden xl:flex items-center text-gray-600 hover:text-[#3CBEC7] transition-colors duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">(888) 472-4621</span>
            </a>
            <Link 
              to="/contact"
              className="relative bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-6 py-2.5 rounded-lg font-semibold 
                hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 
                shadow-md hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden group"
            >
              <span className="relative z-10">Free Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A7C81] to-[#0F6168] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div 
          className={`lg:hidden fixed left-0 right-0 top-[60px] bg-white shadow-xl transition-all duration-300 transform ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
          style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}
        >
          <div className="p-4 space-y-2">
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActiveRoute('/') 
                  ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#3CBEC7]' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            
            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-200
                  ${isServicesActive() 
                    ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#3CBEC7]' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5" />
                  Services
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="mt-2 ml-4 mr-2 space-y-1">
                  {serviceLinks.map((service, index) => (
                    <Link
                      key={index}
                      to={service.to}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200
                        ${location.pathname === service.to 
                          ? 'bg-[#F0FFFE] text-[#1A7C81] font-medium' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#3CBEC7]'
                        }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      <span>{service.icon}</span>
                      <span>{service.label}</span>
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="block px-4 py-2.5 text-sm text-center font-semibold text-[#1A7C81] hover:text-[#3CBEC7] transition-colors duration-200"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/portfolio" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActiveRoute('/portfolio') 
                  ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#3CBEC7]' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Briefcase className="w-5 h-5" />
              Portfolio
            </Link>
            
            <Link 
              to="/about" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActiveRoute('/about') 
                  ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#3CBEC7]' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              About Us
            </Link>
            
            <Link 
              to="/blogs" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActiveRoute('/blogs') 
                  ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#3CBEC7]' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5" />
              Blog
            </Link>
            
            <Link 
              to="/testimonials" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActiveRoute('/testimonials') 
                  ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#3CBEC7]' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Star className="w-5 h-5" />
              Reviews
            </Link>
            
            <Link 
              to="/contact" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActiveRoute('/contact') 
                  ? 'bg-gradient-to-r from-[#3CBEC7]/10 to-[#97EDED]/10 text-[#3CBEC7]' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail className="w-5 h-5" />
              Contact
            </Link>
            
            {/* Mobile CTA Section */}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
              {/* Social Media Links for Mobile */}
              <div className="flex items-center justify-center space-x-2 pb-3">
                <a 
                  href="https://share.google/OZPp85BfytCtF10Lj" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#3CBEC7] hover:text-white transition-all duration-200"
                  aria-label="Google Business Profile for RAH Operations"
                >
                  <MapPin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/rahoperations/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#E4405F] hover:text-white transition-all duration-200"
                  aria-label="RAH Operations Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61574789296433" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#1877F2] hover:text-white transition-all duration-200"
                  aria-label="RAH Operations Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.yelp.com/biz/rah-operations-scottsdale" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#FF1A1A] hover:text-white transition-all duration-200"
                  aria-label="RAH Operations Yelp Reviews"
                >
                  <Star className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/rah-operations-llc" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#0A66C2] hover:text-white transition-all duration-200"
                  aria-label="RAH Operations LLC LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              
              <a 
                href="tel:+18884724621" 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-[#3CBEC7] hover:bg-gray-100 font-medium transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                (888) 472-4621
              </a>
              
              <Link 
                to="/contact"
                className="block text-center bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
