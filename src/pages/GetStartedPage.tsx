import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import Layout from '../components/layout/Layout';
import { absoluteUrl } from '../utils/url';

const check = '✓';

const GetStartedPage = () => (
  <Layout>
    <SEOHead
      title="Get Started | RAH Operations — Scottsdale, AZ"
      description="Tell us what you need. Custom websites, digital marketing, or credit repair — most RAH Operations projects start within 24 hours. Scottsdale & Phoenix, AZ."
      url={absoluteUrl('/get-started')}
    />

    {/* HERO */}
    <section className="relative bg-[#0f0f0f] pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-luxury-red/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-luxury-red/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>
      <div className="container-clean relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.33, 0.66, 0.66, 1] }}
        >
          <p className="eyebrow-red mb-5">RAH Operations — Scottsdale, AZ</p>
          <h1
            className="font-serif-display font-bold text-white leading-[1.0] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
          >
            What can we
            <span className="block text-luxury-red">help you with?</span>
          </h1>
          <p className="text-neutral-400 font-serif-body text-lg max-w-xl mx-auto leading-relaxed">
            Tell us what you need. Most projects start within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>

    {/* THREE MAIN SERVICE CARDS */}
    <section className="relative bg-[#0f0f0f] pb-20">
      <div className="container-clean">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Card 1 — Website Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative bg-[#141414] border border-neutral-800 flex flex-col overflow-hidden"
          >
            {/* Most Popular badge */}
            <div className="absolute top-0 right-0 bg-luxury-red px-4 py-1.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white">Most Popular</span>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="w-8 h-1 bg-luxury-red mb-6" />
              <h2 className="font-serif-display font-bold text-white text-2xl mb-3 leading-tight">
                I need a website
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Custom React website built in 7 days. SEO-ready from day one, mobile-first, with intake
                forms and client portal already connected. Not a template. Never.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  'Custom design built from scratch',
                  'SEO setup + Google Business optimization',
                  'Intake form + client portal included',
                  'Live in 7 days guaranteed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <span className="text-luxury-red font-bold mt-0.5 shrink-0">{check}</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">From $1,500</p>
                <Link
                  to="/website-intake"
                  className="block w-full bg-luxury-red text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-4 text-center hover:bg-luxury-dark transition-colors duration-200"
                >
                  Start My Website Project
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Digital Marketing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#141414] border border-neutral-800 flex flex-col"
          >
            <div className="p-8 flex flex-col flex-grow">
              <div className="w-8 h-1 bg-luxury-red mb-6" />
              <h2 className="font-serif-display font-bold text-white text-2xl mb-3 leading-tight">
                I need more clients
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Done-for-you social media content, SEO, and Google Business management. AI-powered posts
                that keep your brand active and your phone ringing. From $297/month.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  '10-20 posts/month on Instagram + Facebook',
                  'Google Business updates + review management',
                  'Monthly SEO content',
                  'No contracts — cancel anytime',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <span className="text-luxury-red font-bold mt-0.5 shrink-0">{check}</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">From $297/mo</p>
                <Link
                  to="/marketing/intake"
                  className="block w-full bg-luxury-red text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-4 text-center hover:bg-luxury-dark transition-colors duration-200"
                >
                  Grow My Business
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — Credit Repair */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#141414] border border-neutral-800 flex flex-col"
          >
            <div className="p-8 flex flex-col flex-grow">
              <div className="w-8 h-1 bg-luxury-red mb-6" />
              <h2 className="font-serif-display font-bold text-white text-2xl mb-3 leading-tight">
                I need to fix my credit
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                FCRA-compliant dispute letters sent via certified mail to all 3 bureaus. Client portal to
                track every step. Most clients see movement in 30-60 days.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  'Dispute letters for Experian, Equifax, TransUnion',
                  'Certified mail with tracking',
                  'Client portal with real-time updates',
                  'Identity theft cases accepted',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <span className="text-luxury-red font-bold mt-0.5 shrink-0">{check}</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Free consultation</p>
                <Link
                  to="/credit-repair/intake"
                  className="block w-full bg-luxury-red text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-4 text-center hover:bg-luxury-dark transition-colors duration-200"
                >
                  Start My Case
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ADDITIONAL BUSINESS SERVICES */}
    <section className="bg-[#0a0a0a] py-20 border-t border-neutral-900">
      <div className="container-clean">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="eyebrow-red mb-4">Additional Business Services</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Business Credit & Funding', desc: 'Build credit. Unlock capital.', to: '/business-credit-and-funding' },
            { title: 'LLC Setup & Formation', desc: 'Right structure from day one.', to: '/llc-setup' },
            { title: 'New Business Setup', desc: 'Launch ready in days.', to: '/new-business-setup' },
            { title: 'Notary Services', desc: 'Professional notarization, AZ.', to: '/notary-services' },
          ].map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={item.to}
                className="group block bg-[#141414] border border-neutral-800 p-6 hover:border-luxury-red/50 transition-colors duration-200"
              >
                <div className="w-6 h-0.5 bg-luxury-red mb-4 group-hover:w-10 transition-all duration-200" />
                <h3 className="font-serif-display font-bold text-white text-base mb-2 leading-snug">{item.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                <span className="mt-4 block text-[10px] uppercase tracking-widest text-luxury-red font-semibold">
                  Learn More →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section className="bg-[#0f0f0f] py-20 border-t border-neutral-900">
      <div className="container-clean text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow-red mb-5">Not sure where to start?</p>
          <h2
            className="font-serif-display font-bold text-white mb-5 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Book a free 15-minute call.
          </h2>
          <p className="text-neutral-400 font-serif-body text-lg max-w-lg mx-auto leading-relaxed mb-8">
            We'll tell you exactly what will move the needle for your business.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-luxury-red text-white text-xs font-bold uppercase tracking-[0.2em] px-10 py-4 hover:bg-luxury-dark transition-colors duration-200"
          >
            Book a Free Call
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default GetStartedPage;
