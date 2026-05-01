import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="RAH Operations | Website Design & SEO Specialists"
        description="High-end website design, SEO, and digital growth systems for businesses that want to dominate their market."
        url={absoluteUrl("/")}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean text-center">
          <p className="eyebrow mb-6">RAH Operations</p>

          <h1 className="max-w-4xl mx-auto mb-6 text-balance">
            Website Design & SEO Systems Built to Drive Revenue
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-lg">
            We help businesses build authority, rank higher on Google, and convert more customers through
            strategic design, search visibility, and digital infrastructure.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button to="/contact" className="btn-primary">
              Start a Project
            </Button>
            <Button variant="outline" href="tel:+18884724621" className="btn-secondary">
              (888) 472-4621
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Services</p>
            <h2 className="mb-4">What We Do</h2>
            <p>
              We build the systems behind business growth. Every service is designed to increase visibility,
              credibility, and conversion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Website Design & SEO', link: '/website-design-and-seo' },
              { title: 'Digital Marketing', link: '/digital-marketing' },
              { title: 'Social Media Management', link: '/social-media-management' },
              { title: 'Business Credit & Funding', link: '/business-credit-and-funding' },
              { title: 'Personal Credit Repair', link: '/personal-credit-repair' },
              { title: 'New Business Setup', link: '/new-business-setup' }
            ].map((service, i) => (
              <div key={i} className="card-clean hover-lift">
                <h3 className="mb-3">{service.title}</h3>
                <p className="mb-6">
                  Strategic execution designed to move your business forward with clarity and measurable results.
                </p>
                <Button to={service.link} variant="outline" className="btn-secondary">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY SECTION */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">Why RAH Operations</p>
            <h2 className="mb-6">Built for Businesses That Want to Win</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Strategic Approach</h3>
                <p>Everything we build is designed to generate real business outcomes, not just look good.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Search-First Thinking</h3>
                <p>We prioritize visibility and rankings from day one so your business gets found.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Execution That Converts</h3>
                <p>Design, messaging, and structure built to turn visitors into paying customers.</p>
              </div>
            </div>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">Key Results</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Clients Served</span>
                <span className="font-semibold">500+</span>
              </div>
              <div className="flex justify-between">
                <span>Years Experience</span>
                <span className="font-semibold">10+</span>
              </div>
              <div className="flex justify-between">
                <span>Client Satisfaction</span>
                <span className="font-semibold">98%</span>
              </div>
              <div className="flex justify-between">
                <span>Search Growth</span>
                <span className="font-semibold">Top Rankings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="max-w-xl mb-16">
            <p className="eyebrow mb-4">Testimonials</p>
            <h2>What Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              'RAH Operations completely transformed our online presence. We are now ranking and generating real leads.',
              'Professional, direct, and results-driven. Best decision we made for our business.',
              'They built everything the right way from the start. We finally feel like a real company online.'
            ].map((quote, i) => (
              <div key={i} className="card-clean">
                <p className="mb-6 italic">"{quote}"</p>
                <div className="text-sm font-semibold">Verified Client</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">Start Building a Business That Actually Scales</h2>
          <p className="mb-10 max-w-xl mx-auto">
            If you're serious about growth, visibility, and building something that lasts, this is where it starts.
          </p>

          <Button to="/contact" className="btn-primary">
            Get Started
          </Button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <ContactForm
            title="Start Your Project"
            subtitle="Tell us what you're building. We'll show you how to scale it."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
