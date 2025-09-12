import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Facebook, Instagram, Linkedin, BadgeHelp as Yelp, ChevronDown, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navigation = [
    { name: 'HOME', href: '/' },
    { 
      name: 'SERVICES', 
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Website Design & SEO', href: '/website-design-and-seo' },
        { name: 'Business Credit & Funding', href: '/business-credit-and-funding' },
        { name: 'Digital Marketing', href: '/digital-marketing' },
        { name: 'New Business Setup', href: '/new-business-setup' },
        { name: 'Personal Credit Repair', href: '/personal-credit-repair' },
        { name: 'Social Media Management', href: '/social-media-management' },
        { name: 'Notary Services', href: '/notary-services' },
      ]
    },
    { name: 'ABOUT US', href: '/about' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'TESTIMONIALS', href: '/testimonials' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Handle dropdown toggle
  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
        : 'bg-white shadow-sm'
    }`}>
      {/* Social Media Bar */}
      <div className={`bg-gradient-to-r from-[#97EDED] via-[#C9F8F6] to-[#B5F3F0] border-b border-gray-100 py-2 transform transition-all duration-500 ${
        isScrolled ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100 h-auto'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {/* Updated social media icons with brand colors */}
                <a
                  href="https://facebook.com/644350702085787"
                  className="text-[#3CBEC7] hover:text-[#1A7C81] transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg rounded-full p-1"
                  aria-label="Follow us on Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/rahoperations/"
                  className="text-[#1A7C81] hover:text-[#0F6168] transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg rounded-full p-1"
                  aria-label="Follow us on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/rah-operations-llc"
                  className="text-[#0F6168] hover:text-[#104A53] transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg rounded-full p-1"
                  aria-label="Connect with us on LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://yelp.com/biz/rah-operations-scottsdale"
                  className="text-[#97EDED] hover:text-[#3CBEC7] transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg rounded-full p-1"
                  aria-label="Review us on Yelp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Yelp className="w-5 h-5" />
                </a>
                {/* NEW: Google My Business Link */}
                <a
                  href="https://www.google.com/maps/place/Rah+Operations+LLC/@33.7335583,-111.9450294,969m/data=!3m2!1e3!4b1!4m6!3m5!1s0x872b790bdab5c151:0xac53f9ac22bb3909!8m2!3d33.7335583!4d-111.9450294!16s%2Fg%2F11mcpjh776?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                  className="text-[#C9F8F6] hover:text-[#97EDED] transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg rounded-full p-1"
                  aria-label="Find us on Google Maps"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
              <div className="hidden sm:flex items-center space-x-4 ml-4">
                <a
                  href="tel:+18884724621"
                  className="flex items-center text-[#1A7C81] hover:text-[#0F6168] transition-colors duration-300 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  (888) 472-4621
                </a>
                <a
                  href="mailto:Daniel@rahoperations.com"
                  className="flex items-center text-[#1A7C81] hover:text-[#0F6168] transition-colors duration-300 text-sm font-medium"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Daniel@rahoperations.com
                </a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#1A7C81] font-bold">Arizona Business Solutions</div>
              <div className="text-xs text-gray-600 font-medium">Professional • Reliable • Results-Driven</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              {/* Updated to use optimized logo with WebP fallback */}
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="RAH Operations - Arizona Business Solutions"
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105 transform-gpu"
                  loading="eager"
                />
              </picture>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative dropdown-container">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className={`nav-link flex items-center text-xs font-medium transition-all duration-300 whitespace-nowrap px-3 py-2 rounded-md hover:bg-gray-50 group ${
                          isActive(item.href) || activeDropdown === item.name
                            ? 'text-[#1A7C81] bg-gray-50 active'
                            : 'text-gray-700 hover:text-[#1A7C81]'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 transform transition-all duration-300 origin-top ${
                        activeDropdown === item.name
                          ? 'opacity-100 scale-100 translate-y-0 visible'
                          : 'opacity-0 scale-95 -translate-y-2 invisible'
                      }`}>
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#C9F8F6] hover:text-[#1A7C81] transition-colors duration-200 transform hover:translate-x-1"
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animation: activeDropdown === item.name ? 'slideIn 0.3s ease-out forwards' : 'none'
                            }}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`nav-link text-xs font-medium transition-all duration-300 whitespace-nowrap px-3 py-2 rounded-md hover:bg-gray-50 ${
                        isActive(item.href)
                          ? 'text-[#1A7C81] bg-gray-50 active'
                          : 'text-gray-700 hover:text-[#1A7C81]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* CTA Button */}
              <Link
                to="/contact"
                className="ml-4 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Free Consultation
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1A7C81] hover:bg-gray-50 transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`w-6 h-6 transition-all duration-300 absolute top-0 left-0 ${
                    isMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`w-6 h-6 transition-all duration-300 absolute top-0 left-0 ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg rounded-b-lg">
            {navigation.map((item, index) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md transform hover:translate-x-2 hover:bg-gray-50 ${
                        activeDropdown === item.name
                          ? 'text-[#1A7C81] bg-gray-50'
                          : 'text-gray-700 hover:text-[#1A7C81]'
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isMenuOpen ? 'fadeInLeft 0.3s ease-out forwards' : 'none'
                      }}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {/* Mobile Dropdown */}
                    <div className={`ml-4 mt-1 space-y-1 transition-all duration-300 ${
                      activeDropdown === item.name ? 'block' : 'hidden'
                    }`}>
                      {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-[#1A7C81] hover:bg-[#C9F8F6] rounded-md transition-all duration-200 transform hover:translate-x-1"
                          style={{
                            animationDelay: `${dropdownIndex * 30}ms`,
                            animation: activeDropdown === item.name ? 'slideIn 0.2s ease-out forwards' : 'none'
                          }}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md transform hover:translate-x-2 hover:bg-gray-50 ${
                      isActive(item.href)
                        ? 'text-[#1A7C81] bg-gray-50'
                        : 'text-gray-700 hover:text-[#1A7C81]'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'fadeInLeft 0.3s ease-out forwards' : 'none'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile CTA */}
            <Link
              to="/contact"
              className="block mx-3 mt-4 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-4 py-3 rounded-lg text-center font-semibold hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Consultation
            </Link>
            
            {/* Mobile Social Media Links */}
            <div className="flex justify-center items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
              <a
                href="https://facebook.com/644350702085787"
                className="text-[#3CBEC7] hover:text-[#1A7C81] transition-colors duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/rahoperations/"
                className="text-[#1A7C81] hover:text-[#0F6168] transition-colors duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/rah-operations-llc"
                className="text-[#0F6168] hover:text-[#104A53] transition-colors duration-300"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://yelp.com/biz/rah-operations-scottsdale"
                className="text-[#97EDED] hover:text-[#3CBEC7] transition-colors duration-300"
                aria-label="Yelp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Yelp className="w-5 h-5" />
              </a>
              <a
                href="https://www.google.com/maps/place/Rah+Operations+LLC/@33.7335583,-111.9450294,969m/data=!3m2!1e3!4b1!4m6!3m5!1s0x872b790bdab5c151:0xac53f9ac22bb3909!8m2!3d33.7335583!4d-111.9450294!16s%2Fg%2F11mcpjh776?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                className="text-[#C9F8F6] hover:text-[#97EDED] transition-colors duration-300"
                aria-label="Google Maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
