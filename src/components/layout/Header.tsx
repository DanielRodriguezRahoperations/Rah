import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const serviceLinks = [
    { to: '/website-design-and-seo', label: 'Website Design & SEO' },
    { to: '/new-business-setup', label: 'New Business Setup' },
    { to: '/business-credit-and-funding', label: 'Business Credit & Funding' },
    { to: '/personal-credit-repair', label: 'Personal Credit Repair' },
    { to: '/digital-marketing', label: 'Digital Marketing' },
    { to: '/social-media-management', label: 'Social Media Management' },
    { to: '/notary-services', label: 'Arizona Notary Services' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png"
              alt="RAH Operations Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-[#3CBEC7] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-[#3CBEC7]"
            >
              HOME
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-gray-700 hover:text-[#3CBEC7] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-[#3CBEC7]"
              >
                SERVICES
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  {serviceLinks.map((service, index) => (
                    <Link
                      key={index}
                      to={service.to}
                      className="block px-4 py-3 text-sm text-gray-700 hover:text-[#3CBEC7] hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/about" 
              className="text-gray-700 hover:text-[#3CBEC7] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-[#3CBEC7]"
            >
              ABOUT US
            </Link>
            
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-[#3CBEC7] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-[#3CBEC7]"
            >
              BLOGS
            </Link>
            
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-[#3CBEC7] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-[#3CBEC7]"
            >
              CONTACT
            </Link>
            
            <Link 
              to="/testimonials" 
              className="text-gray-700 hover:text-[#3CBEC7] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-[#3CBEC7]"
            >
              TESTIMONIALS
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/contact"
              className="bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-6 py-2 rounded-lg font-medium hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#3CBEC7] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-[#3CBEC7] font-medium"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {serviceLinks.map((service, index) => (
                      <Link
                        key={index}
                        to={service.to}
                        className="block text-sm text-gray-600 hover:text-[#3CBEC7] py-1"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-[#3CBEC7] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-[#3CBEC7] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-[#3CBEC7] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <Link 
                to="/testimonials" 
                className="text-gray-700 hover:text-[#3CBEC7] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <a 
                  href="tel:+18884724621" 
                  className="flex items-center text-[#3CBEC7] hover:text-[#1A7C81] font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (888) 472-4621
                </a>
                
                <Link 
                  to="/contact"
                  className="inline-block mt-3 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-6 py-2 rounded-lg font-medium hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
