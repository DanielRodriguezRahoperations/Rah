import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-teal-600">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-teal-600">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-teal-600">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-teal-600">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-teal-600">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} RAH Operations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
