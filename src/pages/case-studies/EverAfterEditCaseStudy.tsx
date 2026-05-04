import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../../components/ui/Button';

const EverAfterEditCaseStudy = () => {
  const projectStats = [
    ['Industry', 'Luxury Wedding Signage'],
    ['Market', 'Florida'],
    ['Focus', 'Website Design + Brand Positioning'],
    ['Primary Goal', 'Premium Custom Inquiries']
  ];

  const buildItems = [
    'Luxury editorial visual direction',
    'Refined inquiry flow for custom projects',
    'Signature Pieces structure',
    'Premium service positioning',
    'Cleaner hierarchy and spacing',
    'Stronger perceived value for high-end wedding clients'
  ];

  const strategyItems = [
    {
      title: 'Luxury Positioning',
      description:
        'The brand was positioned to feel custom, intentional, and elevated instead of looking like a generic wedding vendor.'
    },
    {
      title: 'Inquiry Experience',
      description:
        'The inquiry flow was structured to create a more refined first impression and guide serious clients toward starting a custom project.'
    },
    {
      title: 'Editorial Presentation',
      description:
        'The design direction used space, contrast, restrained copy, and premium pacing to create a more high-end brand experience.'
    }
  ];

  return (
    <>
      <SEOHead
        title="The Ever After Edit Website Case Study | RAH Operations"
        description="See how RAH Operations built a luxury editorial website and premium inquiry experience for The Ever After Edit."
        url={absoluteUrl('/case-studies/ever-after-edit')}
      />

      {/* HERO */}
      <section className="relative py-32 lg:py-48 bg-gradient-to-br from-emerald-50 via-rose-50 to-amber-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-emerald-200 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-amber-200 rounded-full blur-2xl opacity-20 animate-bounce" />
        </div>

        <div className="container-clean relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-sm uppercase tracking-widest text-emerald-700 mb-6 font-serif">
              Case Study — Luxury Wedding Brand
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-8 leading-tight font-serif">
              Ever After
              <span className="block text-rose-600">Edit</span>
              <span className="block text-emerald-600 text-3xl">Blossoming Elegance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
              Where wedding dreams bloom into reality. A garden of refined signage and timeless elegance.
            </p>

            <motion.div
              className="flex gap-6 flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button to="/contact" size="lg" className="bg-rose-500 text-white hover:bg-rose-600 border border-rose-500 font-serif">
                Begin Your Story
              </Button>
              <Button href="https://www.everaftereditfl.com" variant="outline" size="lg" className="border-emerald-400 text-emerald-700 hover:bg-emerald-50 font-serif">
                Explore the Garden
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
            <div className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-3xl border-2 border-rose-200/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-100/20 to-emerald-100/20" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-rose-400 rounded-full" />
                  <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                  <div className="w-3 h-3 bg-amber-400 rounded-full" />
                </div>

                <div className="space-y-4 mb-8">
                  <div className="h-6 bg-gradient-to-r from-rose-300 to-emerald-300 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="h-24 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg border border-rose-200/50" />
                  <div className="h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg border border-emerald-200/50" />
                  <div className="h-28 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg border border-amber-200/50" />
                </div>

                <div className="h-12 bg-gradient-to-r from-rose-400 to-emerald-400 rounded-lg" />
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-rose-300 rounded-full blur-2xl opacity-50 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* PROJECT SNAPSHOT */}
      <section className="section bg-gradient-to-r from-emerald-50 to-rose-50">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-emerald mb-6">The Challenge</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-800 font-serif">
              From Seed to
              <span className="block text-rose-600">Blooming Beauty</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Every wedding deserves its perfect signage. The Ever After Edit needed a digital presence as elegant as their creations.
            </p>
            <p className="text-lg text-gray-500">
              The journey: Transform a promising concept into a flourishing brand that attracts discerning couples.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-emerald-200/50 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-emerald-700 mb-8 font-serif">PROJECT GARDEN</h3>
            <div className="space-y-6">
              {projectStats.map(([label, value], i) => (
                <motion.div
                  key={label}
                  className="flex justify-between items-center p-4 bg-emerald-50/50 rounded-lg border border-emerald-200/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-gray-600 font-serif">{label}:</span>
                  <span className="text-rose-600 font-bold">{value}</span>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-emerald-200/50">
                <a
                  href="https://www.everaftereditfl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-rose-600 transition-colors font-serif"
                >
                  www.everaftereditfl.com →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="section bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-rose-200 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-emerald-200 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="container-clean relative z-10">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-rose mb-8">Strategic Growth</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-gray-800 font-serif">
              Nurturing a
              <span className="block text-emerald-600">Premium Bloom</span>
            </h2>
            <p className="text-xl opacity-90 text-gray-600">
              Like tending a garden, we cultivated an experience of elegance and refinement.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {strategyItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-rose-200/50 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl font-bold text-rose-500 mb-6 font-serif">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-emerald-700 font-serif">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="section bg-gradient-to-r from-amber-50 to-rose-50">
        <div className="container-clean grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-emerald mb-6">What We Built</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-800 font-serif">
              A Garden of
              <span className="block text-rose-600">Elegant Signage</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Every petal, every leaf, every detail crafted with wedding magic in mind.
            </p>
            <p className="text-lg text-gray-500">
              From first glance to final inquiry, a journey through refined beauty.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {buildItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 bg-white/50 rounded-lg border border-emerald-200/30"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-rose-500 font-bold font-serif text-xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section bg-gradient-to-br from-emerald-100 to-rose-100 text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-200 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.7s' }} />
        </div>
        <div className="container-clean grid gap-16 lg:grid-cols-2 lg:items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-rose mb-6">The Outcome</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-serif">
              A Wedding Brand
              <span className="block text-emerald-600">in Full Bloom</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              The Ever After Edit now radiates the elegance their clients deserve. A garden of possibilities awaits.
            </p>
            <p className="text-lg text-gray-500">
              From humble beginnings to flourishing success, one beautiful redesign at a time.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-rose-200/50 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-rose-600 mb-8 font-serif">THE BLOSSOMING</h3>
            <div className="space-y-8">
              <div className="p-6 bg-rose-50 rounded-lg border border-rose-200/50">
                <p className="eyebrow-rose mb-4">BEFORE</p>
                <p className="text-gray-600">
                  Risk of looking like a small, template-based wedding vendor instead of a custom premium brand.
                </p>
              </div>
              <div className="text-center text-4xl text-emerald-500 font-bold">🌸</div>
              <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200/50">
                <p className="eyebrow-emerald mb-4">AFTER</p>
                <p className="text-gray-600">
                  Editorial luxury positioning, stronger inquiry flow, and a more refined brand presentation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-rose-50 to-emerald-50">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-8">💐✨</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 font-serif">
              Ready to Let Your Brand Bloom?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's create a digital garden that attracts your dream clients.
            </p>
            <Button to="/contact" size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 font-serif">
              PLANT YOUR SEED
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EverAfterEditCaseStudy;
