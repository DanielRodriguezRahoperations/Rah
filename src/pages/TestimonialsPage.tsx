import { motion } from 'framer-motion';
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
    description: 'Client feedback from businesses that worked with RAH Operations.',
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

      {/* HERO — Spotlight dark: charcoal + gold accent */}
      <section className="relative bg-[#111111] text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(196,155,75,0.12),transparent_55%)]" />

        <div className="container-clean relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[#c49b4b] text-xs uppercase tracking-[0.3em] mb-8">Client Testimonials</p>
            <h1 className="text-[clamp(3rem,9vw,8rem)] font-serif-display font-bold leading-[0.88] mb-8 max-w-4xl">
              What Clients Say After the Work Gets Done.
            </h1>
            <p className="text-xl text-white/60 font-serif-body max-w-2xl leading-relaxed">
              Real feedback from businesses that needed more than a nice-looking website. They needed clarity, execution, and a better system for growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS — Oversized quote wall */}
      <section className="bg-[#111111] pb-24">
        <div className="container-clean">
          <div className="grid md:grid-cols-2 gap-px bg-white/5">
            {testimonials.map((t, i) => (
              <motion.article
                key={i}
                className="bg-[#111111] p-10 lg:p-14 relative group hover:bg-[#1a1a1a] transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="absolute top-8 left-10 text-[8rem] font-serif-display font-bold text-[#c49b4b]/10 leading-none select-none pointer-events-none">
                  "
                </span>
                <div className="relative z-10">
                  <p className="text-xl md:text-2xl font-serif-body text-white/80 leading-relaxed mb-10 italic">
                    "{t.text}"
                  </p>
                  <div className="border-t border-white/10 pt-6">
                    <p className="font-bold text-white uppercase tracking-widest text-sm">{t.name}</p>
                    <p className="text-[#c49b4b] text-xs tracking-widest mt-1">{t.location}</p>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Fifth card spans full or gets its own spot */}
            {testimonials.length % 2 !== 0 && (
              <div className="bg-[#c49b4b] p-10 lg:p-14 flex items-center justify-center md:col-span-1">
                <div className="text-center">
                  <p className="text-6xl font-serif-display font-bold text-[#111111] mb-3">5★</p>
                  <p className="text-sm uppercase tracking-widest text-[#111111]/70">Average Client Rating</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section bg-[#faf8f4]">
        <div className="container-clean grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-8">Client Experience</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-[#1a1a1a] mb-8 leading-[0.95]">
              The Goal Is Not to Look Busy.
              <span className="block text-neutral-400">The Goal Is to Build Correctly.</span>
            </h2>
            <p className="text-lg text-neutral-600 font-serif-body leading-relaxed">
              Clients work with RAH Operations because they need structure, clarity, and execution. The work is built around visibility, authority, and measurable business growth — not vanity metrics.
            </p>
          </motion.div>

          <motion.div
            className="border-l-4 border-[#7a1c1c] pl-8 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6">Common Outcomes</p>
            {[
              ['Better positioning', 'Clearer message'],
              ['Stronger web presence', 'More authority'],
              ['Improved structure', 'Cleaner systems'],
              ['More confidence', 'Better execution'],
            ].map(([left, right], i) => (
              <div key={i} className="flex justify-between gap-8 border-b border-neutral-200 pb-6 last:border-0 last:pb-0">
                <span className="text-neutral-500 text-sm">{left}</span>
                <span className="font-semibold text-[#1a1a1a] text-sm">{right}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#7a1c1c] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(-45deg,#fff_0px,#fff_1px,transparent_1px,transparent_60px)]" />
        <div className="container-clean text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold mb-8 leading-[0.95]">
              Ready to Build the Right Foundation?
            </h2>
            <p className="text-xl font-serif-body opacity-90 mb-12 max-w-xl mx-auto leading-relaxed">
              We'll review where your business stands and show you what needs to happen next.
            </p>
            <Button to="/contact" size="lg" className="bg-white text-[#7a1c1c] hover:bg-[#faf8f4] border-white">
              Start a Project
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
