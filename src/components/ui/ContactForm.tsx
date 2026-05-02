import React, { useState } from 'react';
import Button from './Button';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = 'Start Your Project',
  subtitle = "Tell us what you're building. We'll show you how to scale it."
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
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClass =
    'w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-950 outline-none transition-colors duration-300 placeholder:text-neutral-400 focus:border-[#7a1c1c]';

  const labelClass =
    'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500';

  return (
    <div className="relative overflow-hidden border border-neutral-200 bg-white p-8 shadow-[0_30px_90px_rgba(17,17,17,0.075)] sm:p-10 lg:p-14">
      <div className="absolute right-0 top-0 h-32 w-32 border-l border-b border-[#7a1c1c]/20" />

      <div className="relative mb-10">
        <p className="eyebrow-red mb-4">Contact</p>
        <h2 className="mb-4">{title}</h2>
        <p className="max-w-2xl text-lg leading-8">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className={labelClass}>Main Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select one</option>
              <option value="Website Design & Development">Website Design & Development</option>
              <option value="Local SEO">Local SEO</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Reputation Management">Reputation Management</option>
              <option value="Business Credit & Funding">Business Credit & Funding</option>
              <option value="Business Setup">Business Setup</option>
              <option value="Personal Credit Repair">Personal Credit Repair</option>
              <option value="Notary Services">Notary Services</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Project Details</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={inputClass}
            placeholder="Tell us what your current site is missing, what you want built, or where your business needs more visibility..."
          />
        </div>

        <div className="flex flex-col gap-5 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-6 text-neutral-500">
            Serious inquiries only. The goal is not to make your site prettier. The goal is to make your business look more credible and easier to choose.
          </p>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Submit Inquiry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
