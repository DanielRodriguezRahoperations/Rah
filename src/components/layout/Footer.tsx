import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, BadgeHelp as Yelp, ArrowUp, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const serviceLinks = [
    { name: 'Website Design & SEO', path: '/website-design-and-seo' },
    { name: 'Business Credit & Funding', path: '/business-credit-and-funding' },
    { name: 'Digital Marketing', path: '/digital-marketing' },
    { name: 'New Business Setup', path: '/new-business-setup' }
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Contact', path: '/contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animate footer elements when they come into view
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.footer-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-[#97EDED] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full float-animation"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full float-animation-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full float-animation"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="footer-animate fade-in-up stagger-1">
            <div className="group">
              <img
                src="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png"
                alt="RAH Operations Logo"
                className="h-16 w-auto mb-4 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-sm text-white mb-4 leading-relaxed">
              Arizona's premier business solutions provider. Helping businesses grow through website design, SEO, and business credit services.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-white hover:text-gray-200 transition-colors duration-300">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>6301 E Pinnacle Vista Dr Unit 1004, Scottsdale, AZ 85266</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="tel:+18884724621" className="text-white hover:text-gray-200 transition-colors duration-300">
                  (888) 472-4621
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="mailto:Daniel@rahoperations.com" className="text-white hover:text-gray-200 transition-colors duration-300">
                  Daniel@rahoperations.com
                </a>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div className="footer-animate fade-in-up stagger-2">
            <h3 className="text-lg font-semibold mb-4 relative">
              Services
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white transform origin-left transition-all duration-300 hover:w-full"></div>
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <Link
                    to={link.path}
                    className="text-sm text-white hover:text-gray-200 transition-colors duration-300 relative group"
                    title={`${link.name} in Arizona`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300 rounded"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-animate fade-in-up stagger-3">
            <h3 className="text-lg font-semibold mb-4 relative">
              Company
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white transform origin-left transition-all duration-300 hover:w-full"></div>
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <Link
                    to={link.path}
                    className="text-sm text-white hover:text-gray-200 transition-colors duration-300 relative group"
                    title={link.name}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300 rounded"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-animate fade-in-up stagger-4">
            <h3 className="text-lg font-semibold mb-4 relative">
              Connect With Us
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white transform origin-left transition-all duration-300 hover:w-full"></div>
            </h3>
            <p className="text-sm text-white mb-4">
              Follow us on social media for the latest updates and business tips.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com/644350702085787" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#97EDED] transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/rahoperations/" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#97EDED] transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/rah-operations-llc" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#97EDED] transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://yelp.com/biz/rah-operations-scottsdale" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#97EDED] transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                aria-label="Review us on Yelp"
              >
                <Yelp className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="text-sm font-semibold mb-2">Stay Updated</h4>
              <p className="text-xs text-white/80 mb-3">Get Arizona business tips delivered to your inbox.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-white/20 border border-white/30 rounded-l-md placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-4 py-2 bg-white text-[#97EDED] text-sm font-semibold rounded-r-md hover:bg-gray-100 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Links */}
        <div className="footer-animate fade-in-up border-t border-white/20 pt-6 text-center mb-6">
          <div className="flex justify-center space-x-6 mb-4">
            <Link 
              to="/privacy-policy" 
              className="text-white hover:text-gray-200 text-sm transition-colors duration-300 relative group"
            >
              Privacy Policy
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-animate fade-in-up text-center border-t border-white/20 pt-6">
          <div className="text-xs mb-4">
            COPYRIGHT © 2024 RAH OPERATIONS - ALL RIGHTS RESERVED.
          </div>
          <div className="text-xs text-white/80">
            Proudly serving Phoenix, Scottsdale, Tempe, and all of Arizona with professional business solutions.
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3CBEC7] focus:ring-offset-2 z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 mx-auto group-hover:animate-bounce" />
      </button>
    </footer>
  );
};

export default Footer;