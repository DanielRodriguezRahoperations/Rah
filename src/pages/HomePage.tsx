import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoOpacity = Math.max(0, 1 - scrollY / window.innerHeight);
  const contentOpacity = Math.min(1, Math.max(0, (scrollY - window.innerHeight * 0.4) / (window.innerHeight * 0.4)));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 0.66, 0.66, 1] }
    }
  };

  return (
    <>
      <SEOHead
        title="Website Design Scottsdale | High-Converting Websites That Generate Leads"
        description="Website design, website development, and SEO in Scottsdale and Phoenix. RAH Operations builds premium websites designed to rank locally, convert visitors, and generate leads."
        url={absoluteUrl('/')}
      />

      {/* VIDEO HERO - Fixed fullscreen, fades on scroll */}
      <div
        className="fixed inset-0 w-full h-screen z-0"
        style={{
          opacity: videoOpacity,
          pointerEvents: videoOpacity === 0 ? 'none' : 'auto',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero.mp4"
        />
        {/* Subtle dark overlay for legibility */}
        <div className="absolute inset-0 bg-slate-dark/30" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-3 opacity-60">Scroll</p>
          <div className="w-px h-10 bg-white/40 mx-auto" />
        </motion.div>
      </div>

      {/* Spacer — keeps video visible for one full viewport height */}
      <div className="relative h-screen z-10" style={{ pointerEvents: 'none' }} />

      {/* SITE CONTENT — fades in as video fades out */}
      <div
        className="relative z-10"
        style={{ opacity: contentOpacity }}
      >

      {/* HERO TEXT — first content section after video */}
      <section className="relative bg-gradient-to-br from-slate-dark via-cream-50 to-cream-100 overflow-hidden pt-24 lg:pt-32 pb-20 lg:pb-32">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-luxury-red/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-luxury-red/3 to-transparent rounded-full blur-3xl" />

        <div className="container-clean relative z-10">
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <div className="mb-8 inline-block">
              <p className="eyebrow-red">Website Design • SEO • Scottsdale</p>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif-display font-bold leading-[0.95] mb-10 text-slate-dark">
              Your Website Should Prove You're Worth Contacting.
              <span className="block text-luxury-red mt-4">Before you say anything.</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mb-12 font-serif-body leading-relaxed">
              RAH Operations builds premium websites that work harder than copy, design, or hope. Strategy, visual direction, SEO structure, and conversion architecture all working together.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Button to="/contact" size="lg" className="w-full sm:w-auto">
                  Start Your Project
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button to="/case-studies" variant="secondary" size="lg" className="w-full sm:w-auto">
                  See Our Work
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-300"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { number: '50+', label: 'Premium Websites' },
                { number: '89%', label: 'Lead Growth Average' },
                { number: '#1', label: 'Local Search Rankings' }
              ].map((stat) => (
                <motion.div key={stat.label} variants={itemVariants}>
                  <p className="text-3xl md:text-4xl font-serif-display font-bold text-luxury-red mb-2">
                    {stat.number}
                  </p>
                  <p className="text-sm text-neutral-600 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION - ASYMMETRIC LAYOUT */}
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cream-100 to-transparent" />
        
        <div className="container-clean relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="eyebrow-red mb-6">The Reality</p>
              <h2 className="text-5xl md:text-6xl font-serif-display font-bold mb-8 text-slate-dark">
                Most Business Websites Create Doubt.
              </h2>
              <p className="text-lg text-neutral-600 mb-8 font-serif-body leading-relaxed">
                They're not ugly. They're unclear. They don't build urgency. They don't prove authority. They let visitors walk away and choose your competitor instead.
              </p>

              {/* Problem List */}
              <ul className="space-y-4">
                {[
                  'Weak first impression → low perceived value',
                  'Unclear offer → wasted traffic',
                  'No conversion logic → forgotten in browser tab',
                  'Poor mobile experience → bounce immediately'
                ].map((problem) => (
                  <li key={problem} className="flex gap-4">
                    <span className="text-luxury-red text-2xl leading-none mt-1">—</span>
                    <span className="text-neutral-700">{problem}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image Side - Offset */}
            <motion.div
              className="relative lg:mt-20"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-luxury-red/5 -rotate-3" />
                <div className="relative bg-white border-4 border-slate-dark p-2">
                  <img
                    src="/theproblem.png"
                    alt="Generic website problem"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-luxury-red text-white p-6 font-serif-display">
                  <p className="text-sm font-bold uppercase">The Cost</p>
                  <p className="text-4xl font-bold">87%</p>
                  <p className="text-xs">lost visitors</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RAH APPROACH - NUMBERED BRUTALIST */}
      <section className="section bg-slate-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-96 h-96 bg-luxury-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-luxury-red/10 rounded-full blur-3xl" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">Our Method</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-white mb-6">
              We Don't Design Websites.
              <span className="block text-luxury-red">We Build Lead Generation Systems.</span>
            </h2>
            <p className="text-xl text-neutral-300 font-serif-body max-w-2xl">
              Every element has a job. Every section moves closer to business outcomes.
            </p>
          </motion.div>

          {/* Numbered Steps - Brutalist Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                number: '01',
                title: 'Strategic Positioning',
                description: 'We start with your market, your customer psychology, and what makes you genuinely different. No generic playbook.'
              },
              {
                number: '02',
                title: 'Visual Identity System',
                description: 'Build a custom design language that communicates premium quality and establishes immediate trust.'
              },
              {
                number: '03',
                title: 'SEO Architecture',
                description: 'Structure every page around actual search intent, keywords, and local visibility signals.'
              },
              {
                number: '04',
                title: 'Conversion Engineering',
                description: 'Map the journey from curiosity to action. Eliminate friction. Guide toward decision.'
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                className="relative border-l-4 border-luxury-red pl-8 py-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-6xl font-serif-display font-bold text-luxury-red/20 mb-2">
                  {step.number}
                </p>
                <h3 className="text-2xl font-serif-display font-bold mb-3 -mt-8 relative z-10">
                  {step.title}
                </h3>
                <p className="text-neutral-300 font-serif-body">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF - CASE STUDIES GRID */}
      <section className="section bg-white">
        <div className="container-clean">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">Featured Work</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark">
              Websites That Perform.
            </h2>
          </motion.div>

          {/* Case Study Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Tier 1 Customs',
                category: 'Automotive',
                image: '/t1.png',
                link: '/case-studies/tier-1-customs',
                stat: '+340%'
              },
              {
                name: 'The Ever After Edit',
                category: 'Luxury Wedding',
                image: '/ee.png',
                link: '/case-studies/ever-after-edit',
                stat: '+89%'
              },
              {
                name: 'Empire Builds AZ',
                category: 'Construction',
                image: '/emp.png',
                link: '/case-studies/empire-builds-az',
                stat: '+156%'
              }
            ].map((study, index) => (
              <motion.article
                key={study.name}
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={study.link} className="block overflow-hidden bg-neutral-200 aspect-square relative">
                  <img
                    src={study.image}
                    alt={study.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/80 via-transparent to-transparent" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <p className="eyebrow-red">{study.category}</p>
                    <div>
                      <h3 className="text-2xl font-serif-display font-bold text-white mb-2">
                        {study.name}
                      </h3>
                      <p className="text-4xl font-serif-display font-bold text-luxury-red">
                        {study.stat}
                      </p>
                      <p className="text-sm text-neutral-300 mt-1">Lead growth</p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button to="/case-studies" variant="outline" size="lg">
              View All Work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SHOWCASE - ASYMMETRIC */}
      <section className="section bg-gradient-to-b from-cream-100 to-white">
        <div className="container-clean">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">What We Offer</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark max-w-4xl">
              One Website Can Serve Many Strategic Goals.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {[
              {
                title: 'Website Design & Development',
                description: 'Premium custom websites built to look established, communicate clearly, and convert visitors into real inquiries.',
                link: '/website-design-and-seo',
                highlight: true
              },
              {
                title: 'Local SEO & Strategy',
                description: 'Strategic page structure and content designed around real customer search behavior and local visibility.',
                link: '/website-design-and-seo'
              },
              {
                title: 'Digital Marketing',
                description: 'Campaign strategy, content direction, and paid optimization to extend reach and authority.',
                link: '/digital-marketing'
              },
              {
                title: 'Reputation Management',
                description: 'Build trust signals, manage online presence, and establish authority before customers contact you.',
                link: '/reputation-management'
              }
            ].map((service, index) => (
              <motion.article
                key={service.title}
                className={`${service.highlight ? 'lg:row-span-2' : ''} border-3 border-slate-dark p-8 lg:p-12 flex flex-col justify-between group hover:bg-luxury-red hover:text-white hover:border-luxury-red transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className={`text-3xl ${service.highlight ? 'lg:text-4xl' : ''} font-serif-display font-bold mb-4`}>
                    {service.title}
                  </h3>
                  <p className={`${service.highlight ? 'text-lg' : ''} font-serif-body leading-relaxed mb-8`}>
                    {service.description}
                  </p>
                </div>
                <Button
                  to={service.link}
                  variant={service.highlight ? 'primary' : 'text'}
                  className="w-fit group-hover:text-white"
                >
                  Learn More →
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - BOLD & DIRECT */}
      <section className="section bg-luxury-red text-white relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1))] bg-[length:40px_40px]" />
        </div>

        <div className="container-narrow relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-serif-display font-bold mb-8">
              Ready to Look More Valuable Online?
            </h2>
            <p className="text-xl font-serif-body mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
              Let's talk about your business, your market, and what a real premium website could do for your leads and authority.
            </p>
            <Button to="/contact" variant="primary" size="lg" className="bg-white text-luxury-red hover:bg-cream-50">
              Start Your Project Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER TRUST SECTION */}
      <section className="section bg-slate-dark text-white py-16 lg:py-20">
        <div className="container-clean">
          <motion.div
            className="grid md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: 'Industries Served', value: '8+' },
              { label: 'Websites Launched', value: '50+' },
              { label: 'Average Lead Growth', value: '+87%' }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center border-t border-luxury-red/30 pt-6"
                variants={itemVariants}
              >
                <p className="text-5xl font-serif-display font-bold text-luxury-red mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-400 uppercase tracking-wider text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      </div>{/* end content fade-in wrapper */}
    </>
  );
};

export default HomePage;
