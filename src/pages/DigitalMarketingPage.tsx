import React from 'react';
import { ArrowRight } from 'lucide-react';

import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import InternalLinks from '../components/ui/InternalLinks';

const DigitalMarketingPage = () => {
  return (
    <>
      <SEOHead
        title="Digital Marketing Scottsdale & Phoenix | RAH Operations"
        description="Digital marketing systems that generate consistent leads and real revenue for Arizona businesses."
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-28 text-center">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-4xl lg:text-5xl font-bold text-[#0F6168] mb-6 leading-tight">
            If Your Business Isn’t Generating Consistent Leads Online, You Don’t Have a Marketing System
          </h1>

          <p className="text-lg text-[#104A53] mb-6">
            Most companies are guessing. Running ads without a funnel. Posting content without strategy.
          </p>

          <p className="text-lg text-[#104A53] mb-10">
            We build systems that attract the right people, convert them into leads, and turn those leads into paying customers.
          </p>

          <Button size="lg" to="/contact">
            Get a Real Strategy <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

        </div>
      </section>

      {/* CORE POSITIONING */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6 text-lg text-gray-700">

          <h2 className="text-3xl font-bold text-black">
            Most Marketing Fails Because There’s No System
          </h2>

          <p>
            Businesses don’t fail because marketing “doesn’t work.”
            They fail because everything they’re doing is disconnected.
          </p>

          <p>
            SEO is treated separately from ads.
            Ads are run without a real conversion strategy.
            Websites are built to look good — not to generate leads.
          </p>

          <p className="font-semibold text-black">
            That’s why results feel inconsistent.
          </p>

          <p>
            What we do is different.
          </p>

          <p>
            We build a complete system — where traffic, messaging, conversion, and follow-up all work together.
          </p>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-10 text-center">
            How Growth Actually Happens
          </h2>

          <div className="space-y-8 text-gray-700 text-lg">

            <p>
              First, we identify where your current bottleneck is — traffic, conversion, or follow-up.
            </p>

            <p>
              Then we fix that problem directly instead of throwing more marketing at it.
            </p>

            <p>
              Once the foundation is solid, we scale what’s already working.
            </p>

            <p>
              That’s how you move from inconsistent results to predictable growth.
            </p>

          </div>

        </div>
      </section>

      {/* SERVICES (REAL EXPLANATION) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-10">

          <h2 className="text-3xl font-bold text-center">
            What We Actually Do
          </h2>

          <div className="space-y-6 text-gray-700 text-lg">

            <p>
              SEO is used to capture long-term demand from people actively searching for your service.
            </p>

            <p>
              Paid advertising is used to generate immediate leads and test what messaging converts.
            </p>

            <p>
              Your website is optimized to turn visitors into inquiries — not just look good.
            </p>

            <p>
              Tracking systems are implemented so every lead and conversion is measurable.
            </p>

            <p className="font-semibold text-black">
              This isn’t “marketing services.”
              It’s a system designed to produce results.
            </p>

          </div>

        </div>
      </section>

      {/* RESULTS EXPECTATION */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-6">
            What This Looks Like in Practice
          </h2>

          <div className="space-y-4 text-gray-700 text-lg">
            <p>More inbound leads from people actively searching</p>
            <p>Higher conversion rates from your existing traffic</p>
            <p>Lower cost per lead over time</p>
            <p>More predictable and scalable growth</p>
          </div>

        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">

          <h2 className="text-3xl font-bold mb-6">
            What Makes This Different
          </h2>

          <p>No long-term contracts</p>
          <p>No generic strategies</p>
          <p>No focus on vanity metrics</p>
          <p>Everything is built around results</p>

        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-gray-700 space-y-6">

          <h2 className="text-3xl font-bold">
            Digital Marketing in Scottsdale & Phoenix
          </h2>

          <p>
            If you’re running a business in Arizona, your customers are already searching online for what you offer.
          </p>

          <p>
            The difference is whether they find you — or your competitors.
          </p>

          <p>
            A strong digital marketing system ensures your business shows up, stands out, and converts.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <ContactForm
          title="Get a Real Strategy for Your Business"
          subtitle="We’ll show you exactly what’s working, what’s not, and what to fix."
        />
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-16 text-center">
        <InternalLinks
          links={[
            { text: 'Website Design & SEO', url: '/website-design-and-seo' },
            { text: 'Business Credit & Funding', url: '/business-credit-and-funding' },
            { text: 'Contact Us', url: '/contact' }
          ]}
        />
      </section>

    </>
  );
};

export default DigitalMarketingPage;
