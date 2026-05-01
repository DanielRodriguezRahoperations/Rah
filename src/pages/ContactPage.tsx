import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import ContactForm from '../components/ui/ContactForm';
import Button from '../components/ui/Button';

const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="Contact | RAH Operations"
        description="Start your project with RAH Operations. Website design, SEO, and business growth systems built to scale."
        url={absoluteUrl('/contact')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Contact</p>

          <h1 className="mb-6">
            Let’s Build Something That Actually Grows
          </h1>

          <p className="text-lg mb-8">
            If you're serious about scaling your business, we’ll show you exactly what needs to happen next.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="tel:+18884724621" variant="outline">
              (888) 472-4621
            </Button>

            <Button href="mailto:daniel@rahoperations.com" variant="outline">
              Email Us
            </Button>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm />
        </div>
      </section>

      {/* TRUST / POSITIONING */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-4">What Happens Next</p>
            <h2 className="mb-6">Simple. Direct. No Runaround.</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">We Review Your Inquiry</h3>
                <p>We look at your business, goals, and current position.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">We Identify Opportunities</h3>
                <p>We pinpoint exactly where growth is being lost.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">We Show You the Plan</h3>
                <p>No fluff. Just what needs to happen to move forward.</p>
              </div>
            </div>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">Contact Details</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Phone</span>
                <span className="font-semibold">(888) 472-4621</span>
              </div>

              <div className="flex justify-between">
                <span>Email</span>
                <span className="font-semibold">daniel@rahoperations.com</span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span className="font-semibold">Scottsdale, AZ</span>
              </div>

              <div className="flex justify-between">
                <span>Hours</span>
                <span className="font-semibold">Mon–Fri</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
