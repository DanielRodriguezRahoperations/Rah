import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Star, Globe } from 'lucide-react';

const Footer = () => {
  // Social links with brand colors
  const socialLinks = [
    {
      href: 'https://www.instagram.com/rahoperations/',
      label: 'Instagram',
      icon: <Instagram className="w-5 h-5" />, 
      color: 'hover:bg-[#E4405F] hover:text-white',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=61574789296433',
      label: 'Facebook',
      icon: <Facebook className="w-5 h-5" />, 
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      href: 'https://linkedin.com/company/rah-operations-llc',
      label: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />, 
      color: 'hover:bg-[#0A66C2] hover:text-white',
    },
    {
      href: 'https://www.yelp.com/biz/rah-operations-scottsdale',
      label: 'Yelp',
      icon: <Star className="w-5 h-5" />, 
      color: 'hover:bg-[#FF1A1A] hover:text-white',
    },
    {
      href: 'https://share.google/OZPp85BfytCtF10Lj',
      label: 'Google',
      icon: <Globe className="w-5 h-5" />, 
      color: 'hover:bg-[#4285F4] hover:text-white',
    },
  ];

  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">RAH Operations</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                (888) 472-4621
              </p>
              <p className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                daniel@rahoperations.com
              </p>
              <p className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                Scottsdale, AZ
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`p-2.5 bg-gray-200 rounded-lg text-gray-700 transition-all duration-200 ${link.color}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#3CBEC7]">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-[#3CBEC7]">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#3CBEC7]">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#3CBEC7]">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-[#3CBEC7]">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter or Extra Column (optional for symmetry) */}
        <div className="hidden md:block" />

        {/* Copyright */}
        <div className="col-span-full mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} RAH Operations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
