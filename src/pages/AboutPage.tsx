import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="About | RAH Operations"
        description="RAH Operations builds website design, SEO, and business growth systems for companies that want to scale."
        url={absoluteUrl('/about')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">About</p>

          <h1 className="mb-6">
            Built on Execution, Not Empty Strategy
          </h1>

          <p className="text-lg">
            RAH Operations was built around one idea — most businesses don’t need more ideas,
            they need the right systems executed the right way.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="mb-6">How It Started</h2>

            <p className="mb-6">
              After years working across sales, marketing, and business development,
              it became obvious why most businesses struggle to grow.
            </p>

            <p className="mb-6">
              They invest in pieces — a website here, marketing there — but nothing is
              built as a system.
            </p>

            <p>
              RAH Operations was created to fix that. Every service is designed to
              work together, so businesses don’t just look better — they actually perform.
            </p>
          </div>

          <div className="card-clean">
            <h3 className="mb-4">What We Focus On</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Visibility</span>
                <span className="font-semibold">Search & positioning</span>
              </div>

              <div className="flex justify-between">
                <span>Authority</span>
                <span className="font-semibold">Brand perception</span>
              </div>

              <div className="flex justify-between">
                <span>Conversion</span>
                <span className="font-semibold">Lead generation</span>
              </div>

              <div className="flex justify-between">
                <span>Growth</span>
                <span className="font-semibold">Scalable systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="/Daniel%20Rodriguez%20Image.png"
              alt="Daniel Rodriguez"
              className="w-full max-w-md object-cover"
            />
          </div>

          <div>
            <p className="eyebrow mb-4">Founder</p>
            <h2 className="mb-4">Daniel Rodriguez</h2>

            <p className="mb-6">
              Daniel built RAH Operations from real-world experience — not theory.
              With a background in sales, digital marketing, and business strategy,
              his focus has always been the same: results.
            </p>

            <p className="mb-6">
              Instead of offering disconnected services, he built a model where
              everything works together — from how a business is positioned,
              to how it’s found, to how it converts.
            </p>

            <p>
              That’s what separates RAH Operations from typical agencies.
              It’s not about activity. It’s about execution that drives growth.
            </p>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-4">Approach</p>

          <h2 className="mb-6">
            We Don’t Sell Services. We Build Systems.
          </h2>

          <p className="mb-6">
            Most agencies focus on deliverables. We focus on outcomes.
          </p>

          <p className="mb-6">
            Every project is structured around one goal:
            helping your business grow in a way that’s measurable and sustainable.
          </p>

          <p>
            That means no fluff, no unnecessary complexity, and no wasted time.
            Just clear strategy and execution that moves the business forward.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            If You’re Serious About Growth, Let’s Talk
          </h2>

          <p className="mb-10 max-w-xl mx-auto">
            We’ll show you exactly what’s working, what’s not, and what needs to happen next.
          </p>

          <Button to="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
