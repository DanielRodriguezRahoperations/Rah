import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const CaseStudiesPage = () => {
  const studies = [
    {
      title: 'Tier 1 Customs',
      industry: 'Automotive',
      image: '/t1.png',
      link: '/case-studies/tier-1-customs',
      stat: '+340%',
      challenge: 'Premium brand needing stronger local trust',
      result: 'Positioned as premier local automotive authority'
    },
    {
      title: 'The Ever After Edit',
      industry: 'Luxury Wedding',
      image: '/ee.png',
      link: '/case-studies/ever-after-edit',
      stat: '+89%',
      challenge: 'Luxury brand needing elevated digital presence',
      result: 'Editorial-style site commanding premium inquiries'
    },
    {
      title: 'Empire Builds AZ',
      industry: 'Construction',
      image: '/emp.png',
      link: '/case-studies/empire-builds-az',
      stat: '+156%',
      challenge: 'Contractor site lacking professionalism',
      result: 'Credible platform for qualified project inquiries'
    }
  ];

  return (
    <>
      <SEOHead
        title="Web Design Case Studies & Portfolio | RAH Operations"
        description="See our award-winning website design and SEO case studies. Real results from real businesses."
        url={absoluteUrl('/case-studies')}
      />

      {/* HERO */}
      <section className="relative min-h-screen bg-slate-dark text-white pt-24 lg:pt-32 pb-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-luxury-red" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="eyebrow-red mb-8">Portfolio</p>
            <h1 className="text-6xl md:text-8xl font-serif-display font-bold leading-[0.85] mb-10">
              Websites Built to
              <span className="block text-luxury-red">Produce Results.</span>
            </h1>
            <p className="text-xl text-neutral-300 font-serif-body mb-12 max-w-2xl leading-relaxed">
              These aren't portfolio pieces. They're business systems that rank, convert, and generate qualified leads.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES - FEATURED */}
      <section className="section bg-white">
        <div className="container-clean">
          <div className="space-y-20 lg:space-y-32">
            {studies.map((study, idx) => (
              <motion.article
                key={study.title}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Image */}
                <motion.div
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to={study.link} className="block relative group">
                    <div className="relative overflow-hidden bg-neutral-200 aspect-[4/3]">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/60 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <p className="text-5xl font-serif-display font-bold text-luxury-red mb-2">{study.stat}</p>
                        <p className="text-sm text-white/80 uppercase tracking-wider">Lead Growth</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <p className="eyebrow-red mb-6">{study.industry}</p>
                  <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark mb-8">
                    {study.title}
                  </h2>

                  <div className="space-y-8 mb-10">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3">The Challenge</p>
                      <p className="text-lg text-neutral-700 font-serif-body">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3">The Result</p>
                      <p className="text-lg text-neutral-700 font-serif-body">{study.result}</p>
                    </div>
                  </div>

                  <Button to={study.link} size="lg">
                    View Full Case Study
                  </Button>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - HOW WE WORK */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">Our Approach</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">
              Strategy First. Design Second. Results Always.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: 'Discovery', d: 'Deep dive into your market, competitors, and customer psychology' },
              { t: 'Strategy', d: 'Define positioning, messaging, and conversion architecture before design' },
              { t: 'Design', d: 'Build premium visual identity that communicates authority and trust' },
              { t: 'Development', d: 'Engineer for performance, SEO, and conversion across all devices' },
              { t: 'Launch', d: 'Deploy with analytics, tracking, and optimization framework' },
              { t: 'Growth', d: 'Measure results, test variations, and scale what works' }
            ].map((item, i) => (
              <motion.div
                key={item.t}
                className="border-4 border-slate-dark p-8 hover:bg-luxury-red hover:text-white hover:border-luxury-red group transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <p className="text-2xl font-serif-display font-bold mb-3">0{i + 1}</p>
                <h3 className="text-lg font-serif-display font-bold mb-3">{item.t}</h3>
                <p className="text-sm text-neutral-600 group-hover:text-white/80">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS - PROOF */}
      <section className="section bg-luxury-red text-white">
        <div className="container-clean">
          <motion.div
            className="grid md:grid-cols-4 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { n: '50+', l: 'Sites Built' },
              { n: '+89%', l: 'Avg Lead Growth' },
              { n: '#1', l: 'Rankings' },
              { n: '8+', l: 'Industries' }
            ].map((r) => (
              <div key={r.l} className="text-center border-t border-white/30 pt-6">
                <p className="text-5xl font-serif-display font-bold mb-2">{r.n}</p>
                <p className="text-white/80 uppercase tracking-wider text-sm">{r.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark mb-8">
              Let's Build Your Next Success Story.
            </h2>
            <p className="text-xl text-neutral-600 font-serif-body mb-12 max-w-2xl mx-auto">
              Tell us about your business, your goals, and your market. We'll show you what's possible.
            </p>
            <Button to="/contact" size="lg">Start Your Project</Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesPage;
