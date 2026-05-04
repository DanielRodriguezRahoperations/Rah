import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

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
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    'w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-950 outline-none transition-colors duration-300 placeholder:text-neutral-400 focus:border-[#7a1c1c]';
  const labelClass =
    'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500';

  return (
    <div className="relative overflow-hidden border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(17,17,17,0.075)]">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          /* ── THANK YOU SCREEN ── */
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-[#0f0f0f] min-h-[520px] flex flex-col items-center justify-center text-center px-8 py-16 overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-luxury-red/10 blur-[100px]" />
            </div>

            {/* Animated seal */}
            <motion.div
              className="relative mb-10"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.33, 0.66, 0.66, 1] }}
            >
              <div className="relative w-28 h-28 flex items-center justify-center mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-luxury-red"
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border border-luxury-red/40"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.span
                  className="text-luxury-red text-4xl relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  ✓
                </motion.span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="font-serif-display font-bold text-white mb-4 leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Thank You for
              <span className="block text-luxury-red">Your Inquiry.</span>
            </motion.h2>

            {/* Body */}
            <motion.p
              className="text-neutral-300 font-serif-body text-lg max-w-md leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              A member of our team will be in contact with you within{' '}
              <span className="text-white font-semibold">24–48 hours</span> to discuss
              your goals and next steps.
            </motion.p>

            {/* Divider detail */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="h-px w-16 bg-luxury-red/50" />
              <span className="text-luxury-red text-xs uppercase tracking-[0.25em] font-semibold">RAH Operations</span>
              <div className="h-px w-16 bg-luxury-red/50" />
            </motion.div>

            {/* Quick info row */}
            <motion.div
              className="grid grid-cols-2 gap-6 w-full max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { label: 'Response Time', val: '24–48 hrs' },
                { label: 'Service Area', val: 'Scottsdale & Phoenix' },
              ].map((item) => (
                <div key={item.label} className="border border-white/10 p-4 text-center">
                  <p className="text-white font-serif-display font-bold text-base">{item.val}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          /* ── FORM ── */
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 sm:p-10 lg:p-14"
          >
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

              {status === 'error' && (
                <p className="text-sm text-luxury-red">
                  Something went wrong. Please try again or email us directly at daniel@rahoperations.com.
                </p>
              )}

              <div className="flex flex-col gap-5 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-6 text-neutral-500">
                  Serious inquiries only. The goal is not to make your site prettier. The goal is to make your business look more credible and easier to choose.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Submit Inquiry'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
