import { useEffect } from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const BookACallPage = () => {
  useEffect(() => {
    // Load Calendly widget script
    const existing = document.getElementById('calendly-widget-script');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'calendly-widget-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Book a Free Strategy Call | RAH Operations"
        description="Schedule a free 30-minute strategy call with RAH Operations. We'll review your website, SEO, or marketing and give you a clear action plan."
        canonical={absoluteUrl('/book-a-call')}
      />

      <section className="bg-[#0A0A0A] pt-20 pb-0 min-h-screen">
        <div className="mx-auto max-w-3xl px-5 text-center pt-12 pb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-luxury-accent mb-5">
            Free Consultation
          </p>
          <h1 className="font-serif-display text-4xl font-bold text-white sm:text-5xl leading-tight mb-5">
            Book a Free Strategy Call
          </h1>
          <p className="text-[#888888] text-lg leading-relaxed max-w-xl mx-auto">
            30 minutes. No pitch. Just a clear plan for your website, marketing, or credit repair.
          </p>
          <div className="mt-4 h-px w-16 bg-luxury-red mx-auto" />
        </div>

        {/* Calendly inline widget */}
        <div className="mx-auto max-w-3xl px-5 pb-16">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/daniel-rahoperations/30min"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </section>
    </>
  );
};

export default BookACallPage;
