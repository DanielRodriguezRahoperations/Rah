import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A7C81] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img
              src="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png"
              alt="RAH Operations"
              className="h-12 w-auto mb-4"
            />
            <p className="text-[#C9F8F6] mb-4">
              Arizona's premier website design and SEO company helping businesses grow online.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#97EDED] hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#97EDED] hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#97EDED] hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#97EDED]">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/website-design-and-seo" className="text-[#C9F8F6] hover:text-white transition-colors">Website Design & SEO</Link></li>
              <li><Link to="/digital-marketing" className="text-[#C9F8F6] hover:text-white transition-colors">Digital Marketing</Link></li>
              <li><Link to="/business-credit-and-funding" className="text-[#C9F8F6] hover:text-white transition-colors">Business Credit</Link></li>
              <li><Link to="/new-business-setup" className="text-[#C9F8F6] hover:text-white transition-colors">Business Setup</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#97EDED]">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[#C9F8F6] hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="text-[#C9F8F6] hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/testimonials" className="text-[#C9F8F6] hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="text-[#C9F8F6] hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#97EDED]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-[#97EDED]" />
                <a href="tel:+18884724621" className="text-[#C9F8F6] hover:text-white transition-colors">
                  (888) 472-4621
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-[#97EDED]" />
                <a href="mailto:Daniel@rahoperations.com" className="text-[#C9F8F6] hover:text-white transition-colors">
                  Daniel@rahoperations.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-[#97EDED]" />
                <span className="text-[#C9F8F6]">
                  Scottsdale, AZ 85266
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#0F6168] mt-8 pt-8 text-center">
          <p className="text-[#C9F8F6]">
            © 2024 RAH Operations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
