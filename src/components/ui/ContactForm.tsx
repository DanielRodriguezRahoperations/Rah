import React, { useState } from 'react';
import Button from './Button';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = "Start Your Project",
  subtitle = "Tell us what you're building. We'll show you how to scale it."
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClass =
    'w-full border-b border-neutral-300 bg-transparent py-3 text-sm outline-none transition-colors duration-300 focus:border-neutral-900';

  return (
    <div className="border border-neutral-200 bg-white p-10 lg:p-14">
      <div className="mb-10">
        <p className="eyebrow mb-4">Contact</p>
        <h2 className="mb-4">{title}</h2>
        <p className="max-w-xl">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
              Name
            </label>
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
            <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
              Email
            </label>
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

        <div>
          <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
            Phone
          </label>
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
          <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
            Project Details
          </label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={inputClass}
            placeholder="Tell us what you're trying to build..."
          />
        </div>

        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full md:w-auto">
            Submit Inquiry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
