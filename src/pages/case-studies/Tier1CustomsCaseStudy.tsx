import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const Tier1CustomsCaseStudy = () => {
  const projectStats = [
    ['Industry', 'Automotive Customization'],
    ['Market', 'Scottsdale / Phoenix'],
    ['Focus', 'Website Design + Local SEO'],
    ['Primary Goal', 'High-Intent Lead Generation']
  ];

  const buildItems = [
    'Premium dark visual direction for automotive authority',
    'Dedicated service-page structure for local SEO growth',
    'Clear hierarchy for wraps, PPF, chrome delete, and ceramic coating',
    'Stronger conversion paths for high-intent vehicle owners',
    'Scottsdale and Phoenix keyword positioning',
    'Improved trust, service clarity, and brand perception'
  ];

  const strategyItems = [
    {
      title: 'Service Architecture',
      description:
        'The site was structured around the actual services customers search for, instead of forcing every offer onto one generic page.'
    },
    {
      title: 'Local SEO Positioning',
      description:
        'Pages were built to support Scottsdale, Phoenix, and Arizona search relevance for high-intent automotive customization keywords.'
    },
    {
      title: 'Premium Brand Perception',
      description:
        'The visual direction was elevated so Tier 1 Customs would feel like a serious automotive customization brand, not a basic wrap shop.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Tier 1 Customs Website Case Study | RAH Operations"
        description="See how RAH Operations built a premium automotive website and local SEO foundation for Tier 1 Customs in Scottsdale and Phoenix Arizona."
        url={absoluteUrl('/case-studies/tier-1-customs')}
      />

      {/* HERO */}
      <section className="relative py-32 lg:py-48 bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-cyan-400 rounded-full animate-spin opacity-20" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-pink-400 rotate-45 animate-pulse opacity-30" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400 rounded-full blur-xl animate-bounce" />
        </div>

        <div className="container-clean relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-sm uppercase tracking-widest text-cyan-400 mb-6 font-mono">
              Case Study — Automotive Customization
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight font-mono">
              Tier 1
              <span className="block text-cyan-400">Customs</span>
              <span className="block text-pink-400 text-4xl">NEON ERA</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              High-octane website design for Scottsdale's premier automotive customization studio. Where pixel meets piston.
            </p>

            <motion.div
              className="flex gap-6 flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button to="/contact" size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 border border-cyan-500 font-mono">
                INITIATE PROJECT
              </Button>
              <Button href="https://www.tier1customs.com" variant="outline" size="lg" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-mono">
                VIEW MATRIX
              </Button>
            </motion.div>
          </motion.div>

          {/* MOCKUP PANEL */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border-2 border-cyan-400/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>

                <div className="space-y-4 mb-8">
                  <div className="h-6 bg-gradient-to-r from-cyan-400 to-pink-400 rounded" />
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg border border-cyan-400/30" />
                  <div className="h-20 bg-gradient-to-br from-pink-600 to-red-600 rounded-lg border border-pink-400/30" />
                </div>

                <div className="h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg" />
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* PROJECT SNAPSHOT */}
      <section className="section bg-gray-900 text-white">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-cyan mb-6">The Challenge</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              From Garage to
              <span className="block text-cyan-400">Cyber Garage</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Tier 1 Customs needed a digital presence that matched their high-end automotive craftsmanship. No more basic websites.
            </p>
            <p className="text-lg text-gray-400">
              The mission: Create a retro-futuristic interface that screams premium customization while dominating local search.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-3xl border border-cyan-400/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-8 font-mono">PROJECT MATRIX</h3>
            <div className="space-y-6">
              {projectStats.map(([label, value], i) => (
                <motion.div
                  key={label}
                  className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-gray-400 font-mono">{label}:</span>
                  <span className="text-cyan-400 font-bold">{value}</span>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-gray-700">
                <a
                  href="https://www.tier1customs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-pink-400 transition-colors font-mono"
                >
                  www.tier1customs.com →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="section bg-gradient-to-r from-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 border border-cyan-400 rounded-full animate-spin" />
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-pink-400 rotate-45 animate-pulse" />
        </div>
        <div className="container-clean relative z-10">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-pink mb-8">Strategic Build</p>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Rebuilding the
              <span className="block text-cyan-400">Digital Engine</span>
            </h2>
            <p className="text-xl opacity-90">
              Code meets chrome in this high-performance redesign.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {strategyItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-5xl font-bold text-pink-400 mb-6 font-mono">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="section bg-black text-white">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-cyan mb-6">What We Built</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Premium Services
              <span className="block text-pink-400">in Neon</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              A website that turns automotive customization into a digital art form.
            </p>
            <p className="text-lg text-gray-400">
              Every service page optimized for search, every pixel engineered for trust.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {buildItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-cyan-400/20"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-cyan-400 font-bold font-mono text-xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-gray-300 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section bg-gradient-to-br from-cyan-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-pink-400 rounded-full animate-spin" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-cyan-400 rotate-45 animate-pulse" />
        </div>
        <div className="container-clean grid gap-16 lg:grid-cols-2 lg:items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-pink mb-6">The Outcome</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Automotive
              <span className="block text-cyan-400">Excellence</span>
              <span className="block text-pink-400 text-3xl">DIGITIZED</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Tier 1 Customs now has a website that matches their craftsmanship. Premium, powerful, unforgettable.
            </p>
            <p className="text-lg text-gray-400">
              From basic shop to digital powerhouse in one rebuild.
            </p>
          </motion.div>

          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-3xl border border-pink-400/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-pink-400 mb-8 font-mono">THE TRANSFORMATION</h3>
            <div className="space-y-8">
              <div className="p-6 bg-red-900/20 rounded-lg border border-red-500/30">
                <p className="eyebrow-red mb-4">BEFORE</p>
                <p className="text-gray-300">
                  Basic service presentation with limited authority and less strategic SEO structure.
                </p>
              </div>
              <div className="text-center text-4xl text-cyan-400 font-bold">↓</div>
              <div className="p-6 bg-green-900/20 rounded-lg border border-green-500/30">
                <p className="eyebrow-green mb-4">AFTER</p>
                <p className="text-gray-300">
                  Premium automotive positioning, clearer service paths, and a stronger foundation for Scottsdale and Phoenix search visibility.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-black text-white">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-8">🚗⚡</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Upgrade Your Digital Engine?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's build a website that accelerates your business growth.
            </p>
            <Button to="/contact" size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 font-mono">
              START PROJECT
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Tier1CustomsCaseStudy;
