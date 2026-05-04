import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const SocialMediaManagementPage = () => {
  return (
    <>
      <SEOHead
        title="Social Media Management | RAH Operations"
        description="Social media strategy and content systems built to strengthen brand positioning and drive real engagement."
        url={absoluteUrl('/social-media-management')}
      />

      {/* HERO */}
      <section className="relative py-32 lg:py-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full blur-xl animate-bounce" />
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-300 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-red-300 rounded-full blur-lg animate-ping" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="max-w-4xl text-center"
          >
            <div className="text-8xl mb-8">📱✨🎉</div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.8] text-white mb-10 drop-shadow-lg">
              Social Media Magic!
            </h1>
            <p className="text-2xl text-white font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Turn your feeds into funnels! We sprinkle strategy dust to make your brand sparkle and convert likes into leads.
            </p>

            <motion.div
              className="flex gap-6 justify-center flex-wrap"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button to="/contact" size="lg" className="bg-white text-purple-600 hover:bg-yellow-100 transform hover:scale-110 transition-all">
                🚀 Start the Fun!
              </Button>
              <Button to="/portfolio" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-110 transition-all">
                👀 See Our Sparkles
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section bg-yellow-50 relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-pink-200 to-blue-200 transform -skew-y-1" />
        <div className="container-clean grid lg:grid-cols-2 gap-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-purple-800 mb-8 leading-tight">
              Social Media Should Be a Party, Not a Chore! 🎈
            </h2>
            <p className="text-xl text-purple-700 mb-6 font-medium">
              Most businesses post like robots. Boring! We turn your feeds into festivals of engagement.
            </p>
            <p className="text-lg text-purple-600">
              Strategic fun that builds trust, drives traffic, and makes your competitors jealous.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-pink-600 mb-6">What You'll Get 🎁</h3>
            <div className="space-y-4">
              {[
                { label: 'Viral Vibes', value: 'Trending content' },
                { label: 'Engaged Fans', value: 'Real interactions' },
                { label: 'Brand Buzz', value: 'Word-of-mouth magic' },
                { label: 'Lead Lightning', value: 'Conversions galore' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="font-semibold text-purple-800">{item.label}</span>
                  <span className="text-pink-600 font-bold">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-gradient-to-r from-green-400 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full blur-xl" />
        </div>
        <div className="container-clean relative z-10">
          <motion.div
            className="max-w-3xl mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-white mb-6">Our Superpowers 🦸‍♀️</p>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              What We Handle Like Pros
            </h2>
            <p className="text-xl font-light">
              From strategy to sparkle, we've got your social covered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🎯', title: 'Content Strategy', desc: 'Planned perfection' },
              { icon: '🎨', title: 'Creative Creation', desc: 'Art that pops' },
              { icon: '💬', title: 'Voice & Messaging', desc: 'Your unique tone' },
              { icon: '📊', title: 'Platform Magic', desc: 'All channels optimized' },
              { icon: '❤️', title: 'Engagement Boost', desc: 'Fans that love you' },
              { icon: '💰', title: 'Paid Promotions', desc: 'Targeted growth' },
              { icon: '📈', title: 'Analytics Wizardry', desc: 'Data-driven wins' },
              { icon: '🔄', title: 'Constant Optimization', desc: 'Always improving' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-pink-50">
        <div className="container-clean">
          <motion.div
            className="max-w-3xl mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">The Fun Process 🎢</p>
            <h2 className="text-6xl md:text-7xl font-bold text-purple-800 mb-8">
              How We Make Magic Happen
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Audit Adventure', desc: 'Discover your current sparkle level', color: 'from-red-400 to-pink-500' },
              { num: '02', title: 'Strategy Spark', desc: 'Craft your winning plan', color: 'from-yellow-400 to-orange-500' },
              { num: '03', title: 'Content Carnival', desc: 'Create and launch amazing posts', color: 'from-green-400 to-blue-500' },
              { num: '04', title: 'Growth Galaxy', desc: 'Optimize and expand your reach', color: 'from-purple-400 to-indigo-500' }
            ].map((step, i) => (
              <motion.div
                key={i}
                className={`relative bg-gradient-to-br ${step.color} rounded-3xl p-8 text-white text-center transform hover:rotate-3 transition-transform`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring" }}
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-4">{step.title}</h3>
                <p className="text-sm opacity-90">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-300 rounded-full blur-2xl animate-bounce" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-8">🎊</div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Social Media Superstar?
            </h2>
            <p className="text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's turn your feeds into fan clubs and your posts into profits!
            </p>
            <Button to="/contact" size="lg" className="bg-white text-purple-600 hover:bg-yellow-100 transform hover:scale-110 transition-all">
              Let's Get Social! 🚀
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section bg-yellow-50">
        <div className="container-clean max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm
              title="Start Your Social Journey"
              subtitle="Tell us about your brand and we'll craft a social strategy that's uniquely you!"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SocialMediaManagementPage;
