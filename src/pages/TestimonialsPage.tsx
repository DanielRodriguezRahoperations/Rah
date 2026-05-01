import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Phoenix, AZ',
      text: 'RAH Operations gave us a clearer online presence and helped us understand what needed to change. The process was direct, organized, and easy to follow.'
    },
    {
      name: 'John D.',
      location: 'Scottsdale, AZ',
      text: 'We needed more than a better-looking website. We needed structure, positioning, and a plan. RAH Operations helped us tighten everything up.'
    },
    {
      name: 'Lisa T.',
      location: 'Tempe, AZ',
      text: 'Daniel listened to what we were trying to accomplish and gave us a practical plan. It did not feel like a generic agency pitch.'
    },
    {
      name: 'Jamal R.',
      location: 'Chandler, AZ',
      text: 'Before working with RAH Operations, we had no real online direction. Now we have a stronger foundation and a clearer path to generate leads.'
    },
    {
      name: 'Jeremy White',
      location: 'Phoenix, AZ',
      text: 'Daniel helped me move from an idea to a real business structure. The process was hands-on, simple to understand, and focused on getting things done correctly.'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Client Testimonials | RAH Operations',
    description:
      'Client feedback from businesses that worked with RAH Operations for website design, SEO, digital marketing, business setup, and growth systems.',
    url: 'https://www.rahoperations.com/testimonials'
  };

  return (
    <>
      <SEOHead
        title="Client Testimonials | RAH Operations"
        description="Read client feedback from businesses that worked with RAH Operations for website design, SEO, digital marketing, business setup, and growth systems."
        url={absoluteUrl('/testimonials')}
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Testimonials</p>

          <h1 className="mb-6">
            What Clients Say After the Work Gets Done
          </h1>

          <p className="text-lg">
            Real feedback from businesses that needed more than a nice-looking website.
            They needed clarity, execution, and a better system for growth.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <article key={index} className="card-clean">
                <p className="mb-8 text-lg leading-relaxed">
                  “{testimonial.text}”
                </p>

                <div className="border-t border-neutral-200 pt-5">
                  <p className="font-semibold text-neutral-950">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Client Experience</p>
            <h2 className="mb-6">
              The Goal Is Not to Look Busy. The Goal Is to Build Correctly.
            </h2>

            <p>
              Clients work with RAH Operations because they need structure, clarity, and execution.
              The work is not built around vanity metrics. It is built around visibility,
              authority, and measurable business growth.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">Common Outcomes</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-6">
                <span>Better positioning</span>
                <span className="font-semibold">Clearer message</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Stronger web presence</span>
                <span className="font-semibold">More authority</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Improved structure</span>
                <span className="font-semibold">Cleaner systems</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>More confidence</span>
                <span className="font-semibold">Better execution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            Ready to Build the Right Foundation?
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll review where your business is now and show you what needs to happen next.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
