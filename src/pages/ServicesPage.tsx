import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const services = [
  {
    num: '01',
    title: 'Website Design & SEO',
    desc: 'High-conversion websites engineered to rank in Scottsdale and Phoenix while turning traffic into qualified leads.',
    link: '/website-design-and-seo',
    keywords: 'Web development & SEO Scottsdale AZ',
  },
  {
    num: '02',
    title: 'Digital Marketing',
    desc: 'Integrated traffic and lead-generation systems built to scale revenue consistently across every channel.',
    link: '/digital-marketing',
    keywords: 'Digital marketing Phoenix AZ',
  },
  {
    num: '03',
    title: 'Social Media Management',
    desc: 'Strategic brand positioning and content that builds trust, authority, and audience over time.',
    link: '/social-media-management',
    keywords: 'Social media management near Scottsdale',
  },
  {
    num: '04',
    title: 'Business Credit & Funding',
    desc: 'Build business credit, unlock capital, and structure your company to access real funding.',
    link: '/business-credit-and-funding',
    keywords: 'Business credit building Arizona',
  },
  {
    num: '05',
    title: 'Personal Credit Repair',
    desc: 'Structured credit improvement to strengthen your financial profile and expand your options.',
    link: '/personal-credit-repair',
    keywords: 'Personal credit repair Scottsdale',
  },
  {
    num: '06',
    title: 'New Business Setup',
    desc: 'Start with the right structure, compliance, and foundation so your business can actually scale.',
    link: '/new-business-setup',
    keywords: 'New business formation Arizona',
  },
  {
    num: '07',
    title: 'Arizona Notary Services',
    desc: 'Professional notarization for business and personal documents throughout Arizona.',
    link: '/notary-services',
    keywords: 'Mobile notary Scottsdale Phoenix',
  },
];

const marqueeItems = [
  'WEB DEVELOPMENT',
  'SEO',
  'DIGITAL MARKETING',
  'BUSINESS CREDIT',
  'SCOTTSDALE',
  'PHOENIX',
  'LLC FORMATION',
  'LEAD GENERATION',
];

const ServicesPage = () => {
  return (
    <>
      <SEOHead
        title="Business Services Scottsdale & Phoenix AZ | RAH Operations"
        description="Web development, SEO, digital marketing, and business growth systems in Scottsdale and Phoenix Arizona. Built to generate traffic, leads, and real revenue."
        url={absoluteUrl('/services')}
      />

      {/* HERO — full-height dark, stacked editorial type */}
      <section className="relative min-h-screen bg-[#0f0f0f] flex flex-col justify-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-luxury-red/8 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-luxury-red/5 rounded-full blur-[100px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="container-clean relative z-10">
          <motion.p
            className="eyebrow-red mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All Services — Scottsdale & Phoenix, AZ
          </motion.p>

          <motion.h1
            className="font-serif-display font-bold text-white leading-[0.88] mb-8"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
          >
            We Don't Offer
            <br />
            <span className="text-luxury-red">Services.</span>
            <br />
            We Build Growth
            <br />
            Systems.
          </motion.h1>

          <motion.p
            className="text-xl text-neutral-300 font-serif-body max-w-2xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Every service we offer is engineered around one outcome: turning your market
            presence into measurable, compounding revenue growth.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Button to="/contact" size="lg">Start a Project</Button>
            <Button to="/case-studies" variant="secondary" size="lg">See Results</Button>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { n: '7', suffix: '+', label: 'Specialized Services' },
              { n: '100', suffix: '%', label: 'Revenue-Focused' },
              { n: 'AZ', suffix: '', label: 'Scottsdale & Phoenix' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-5xl md:text-6xl font-serif-display font-bold text-luxury-red leading-none">
                  {s.n}<span className="text-3xl">{s.suffix}</span>
                </p>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-3">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-luxury-red py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="inline-block text-white font-serif-display font-bold text-sm uppercase tracking-[0.2em] mx-8">
              {item} <span className="text-white/40 mx-4">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES LIST — staggered reveal */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <div className="mb-20">
            <motion.p
              className="eyebrow-red mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Full Service Suite
            </motion.p>
            <motion.h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Everything Your Business
              <br />Needs to Dominate.
            </motion.h2>
          </div>

          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                className="group border-t border-neutral-200 last:border-b py-8 lg:py-12 grid lg:grid-cols-[80px_1fr_auto] gap-6 lg:gap-12 items-center hover:bg-white transition-colors duration-300 px-4 -mx-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <span className="text-sm font-mono text-neutral-400 group-hover:text-luxury-red transition-colors">
                  {service.num}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif-display font-bold text-slate-dark mb-3 group-hover:text-luxury-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 text-base">{service.desc}</p>
                </div>
                <Link
                  to={service.link}
                  className="shrink-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-neutral-400 group-hover:text-luxury-red transition-colors"
                  title={service.keywords}
                >
                  Explore
                  <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING — dark split */}
      <section className="section section-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-red/10 rounded-full blur-[120px]" />
        </div>
        <div className="container-clean relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="eyebrow-red mb-6">Our Approach</p>
            <h2
              className="font-serif-display font-bold text-white mb-8 leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Most Agencies Sell Hours.
              <br />
              <span className="text-luxury-red">We Sell Outcomes.</span>
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              We don't pad retainers or inflate deliverables. Every project we take on is
              structured around a measurable result — more visibility, more leads, or stronger
              financial positioning for your business.
            </p>
            <Button to="/about" variant="secondary">About RAH Operations</Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {[
              { title: 'No Fluff Execution', body: 'Every decision is tied to performance.' },
              { title: 'Revenue Focused', body: 'Systems built to generate real business results.' },
              { title: 'Built for Scale', body: 'We build infrastructure that grows with you.' },
              { title: 'Local Authority', body: 'Deep expertise in Scottsdale & Phoenix markets.' },
            ].map((card, i) => (
              <div
                key={card.title}
                className="border border-white/10 p-6 hover:border-luxury-red/50 transition-colors duration-300"
              >
                <div className="w-8 h-1 bg-luxury-red mb-4" />
                <h4 className="text-white font-serif-display font-bold text-lg mb-2">{card.title}</h4>
                <p className="text-neutral-400 text-sm">{card.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-luxury-red overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="container-clean relative z-10 text-center">
          <motion.p
            className="text-white/60 text-xs uppercase tracking-[0.2em] font-semibold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Build?
          </motion.p>
          <motion.h2
            className="font-serif-display font-bold text-white mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            If You're Serious About Growth —<br />Let's Build It Right.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button to="/contact" size="lg" className="bg-white text-luxury-red hover:bg-cream-100 border-white">
              Start a Project
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
