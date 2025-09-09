import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  title = "Ready to Get Started?", 
  subtitle = "Let's discuss how we can help your business grow.",
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-xl p-8 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3CBEC7] focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3CBEC7] focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3CBEC7] focus:border-transparent transition-all"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              Service of Interest
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3CBEC7] focus:border-transparent transition-all"
            >
              <option value="">Select a service</option>
              <option value="business-credit">Business Credit & Funding</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="reputation-management">Reputation Management</option>
              <option value="llc-setup">LLC Setup & Structuring</option>
              <option value="personal-credit">Personal Credit Repair</option>
              <option value="consultation">General Consultation</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3CBEC7] focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your business needs and goals..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white py-4 px-6 rounded-lg font-semibold hover:from-[#1A7C81] hover:to-[#0F6168] transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>Send Message</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;