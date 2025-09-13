import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img
              src="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png"
              alt="RAH Operations Logo"
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center">
            <a href="tel:+18884724621" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <Phone className="w-4 h-4 mr-2" />
              (888) 472-4621
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <a href="tel:+18884724621" className="flex items-center text-blue-600">
                <Phone className="w-4 h-4 mr-2" />
                (888) 472-4621
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
