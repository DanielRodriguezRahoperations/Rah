import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const NotaryServicesPage = () => {
  return (
    <>
      <SEOHead
        title="Arizona Notary Services | RAH Operations"
        description="Professional notary services for business and personal documents throughout Arizona."
        url={absoluteUrl('/notary-services')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Arizona Notary Services</p>

          <h1 className="mb-6">
            Professional Notary Services Without the Hassle
          </h1>

          <p className="text-lg mb-8">
            Reliable notarization for business documents, personal records, real estate paperwork,
            loan signings, and other important documents throughout Arizona.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button to="/contact">
              Schedule Notary Service
            </Button>

            <Button variant="outline" href="tel:+18884724621">
              (888) 472-4621
            </Button>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="mb-6">
              Important Documents Need to Be Handled Correctly
            </h2>

            <p className="mb-6">
              Notary work is not complicated, but mistakes create delays, rejected documents,
              and unnecessary frustration.
            </p>

            <p>
              We provide professional notary support with clear scheduling, proper document handling,
              and reliable service.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">Service Focus</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Document notarization</span>
                <span className="font-semibold">Personal & business</span>
              </div>

              <div className="flex justify-between">
                <span>Loan signing support</span>
                <span className="font-semibold">Real estate</span>
              </div>

              <div className="flex justify-between">
                <span>Mobile availability</span>
                <span className="font-semibold">By appointment</span>
              </div>

              <div className="flex justify-between">
                <span>Arizona service</span>
                <span className="font-semibold">Local support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Capabilities</p>
            <h2 className="mb-4">Documents We Support</h2>
            <p>
              Notary services for common business, personal, and legal document needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              'Business document notarization',
              'Real estate documents',
              'Loan signing services',
              'Power of attorney documents',
              'Affidavits and sworn statements',
              'Contracts and agreements',
              'Estate planning documents',
              'Mobile notary appointments'
            ].map((item, i) => (
              <div key={i} className="border-b border-neutral-200 pb-4">
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Process</p>
            <h2 className="mb-4">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Schedule',
                desc: 'Contact us to set up the appointment.'
              },
              {
                title: 'Prepare',
                desc: 'Bring valid ID and unsigned documents.'
              },
              {
                title: 'Verify',
                desc: 'Identity and document details are reviewed.'
              },
              {
                title: 'Notarize',
                desc: 'Documents are completed properly.'
              }
            ].map((step, i) => (
              <div key={i}>
                <p className="text-sm text-neutral-400 mb-2">0{i + 1}</p>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            Need Documents Notarized?
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            Schedule a professional notary appointment and get it handled correctly.
          </p>

          <Button to="/contact">
            Schedule Notary Service
          </Button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Schedule Your Notary Appointment"
            subtitle="Tell us what you need notarized and we’ll help you get it handled."
          />
        </div>
      </section>
    </>
  );
};

export default NotaryServicesPage;
