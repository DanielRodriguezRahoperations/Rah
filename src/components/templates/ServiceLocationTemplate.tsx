import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../ui/SEOHead';
import { absoluteUrl } from '../../utils/url';
import Button from '../ui/Button';
import ContactForm from '../ui/ContactForm';

export interface ServicePageContent {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  path: string;
  heroEyebrow: string;
  heroH1: string;
  heroSubtitle: string;
  heroCta: string;
  problemTitle: string;
  problemBody: string[];
  painPoints: string[];
  solutionTitle: string;
  solutionBody: string[];
  capabilities: { num: string; title: string; desc: string }[];
  processTitle: string;
  processSteps: { num: string; title: string; desc: string }[];
  localTitle: string;
  localBody: string[];
  crossLink?: { to: string; label: string; context: string };
  stats: { value: string; label: string }[];
  ctaTitle: string;
  ctaBody: string;
  relatedServices: { title: string; to: string; desc: string }[];
  formTitle: string;
  formSubtitle: string;
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.33, 0.66, 0.66, 1] } },
};

export default function ServiceLocationTemplate({ content }: { content: ServicePageContent }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.seoTitle,
    description: content.seoDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'RAH Operations',
      url: 'https://www.rahoperations.com',
      telephone: '+16236408884',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Scottsdale',
        addressRegion: 'AZ',
        postalCode: '85266',
        addressCountry: 'US',
      },
    },
    areaServed: ['Scottsdale, AZ', 'Phoenix, AZ', 'Arizona'],
  };

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={absoluteUrl(content.path)}
        structuredData={schema}
      />

      {/* HERO */}
      <section className="relative min-h-[80vh] bg-[#0f0f0f] flex items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#7a1c1c]/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[#7a1c1c]/5 blur-[80px]" />
        </div>
        <div className="container-clean relative z-10">
          <motion.p
            className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {content.heroEyebrow}
          </motion.p>
          <motion.h1
            className="text-[clamp(2.8rem,7vw,6.5rem)] font-serif-display font-bold leading-[0.92] text-white mb-10 max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.33, 0.66, 0.66, 1] }}
          >
            {content.heroH1}
          </motion.h1>
          <motion.p
            className="text-lg text-white/65 font-serif-body leading-relaxed max-w-2xl mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {content.heroSubtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button to="/contact" size="lg">{content.heroCta}</Button>
            <Button to="tel:+16236408884" variant="dark" size="lg">(623) 640-8884</Button>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-white/10 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {content.stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-serif-display font-bold text-[#c9a96e]">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/45 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section bg-white">
        <div className="container-clean grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-6">The Problem</p>
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-[#0f0f0f] leading-[1.05] mb-8">
              {content.problemTitle}
            </h2>
            {content.problemBody.map((p, i) => (
              <p key={i} className="text-neutral-600 font-serif-body text-lg leading-relaxed mb-5 last:mb-0">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="space-y-0"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6">Common Challenges</p>
            {content.painPoints.map((point, i) => (
              <motion.div
                key={i}
                className="flex gap-4 items-start border-b border-neutral-100 py-5 last:border-0"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <span className="text-[#7a1c1c] font-bold text-lg leading-none mt-0.5">✕</span>
                <span className="text-neutral-700 font-serif-body leading-relaxed">{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section bg-[#0f0f0f] text-white">
        <div className="container-clean">
          <motion.div
            className="mb-16 max-w-3xl"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-6">The Solution</p>
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold leading-[1.05] mb-8">
              {content.solutionTitle}
            </h2>
            {content.solutionBody.map((p, i) => (
              <p key={i} className="text-white/65 font-serif-body text-lg leading-relaxed mb-5 last:mb-0">
                {p}
              </p>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {content.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="bg-[#141414] p-8 hover:bg-[#7a1c1c]/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <p className="text-[#c9a96e] text-xs font-bold mb-4">{cap.num}</p>
                <h3 className="text-lg font-serif-display font-bold mb-3">{cap.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-[#f9f7f4]">
        <div className="container-clean">
          <motion.div
            className="mb-16 max-w-2xl"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-6">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-[#0f0f0f] leading-[1.05]">
              {content.processTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {content.processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="text-[5rem] font-serif-display font-bold text-[#7a1c1c]/15 leading-none mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-serif-display font-bold text-[#0f0f0f] mb-3">{step.title}</h3>
                <p className="text-neutral-600 font-serif-body leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL RELEVANCE */}
      <section className="section bg-white">
        <div className="container-clean max-w-4xl">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-6">Serving the Area</p>
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-[#0f0f0f] leading-[1.05] mb-10">
              {content.localTitle}
            </h2>
            {content.localBody.map((p, i) => (
              <p key={i} className="text-neutral-600 font-serif-body text-lg leading-relaxed mb-6 last:mb-0">
                {p}
              </p>
            ))}
            {content.crossLink && (
              <p className="text-neutral-600 font-serif-body text-lg leading-relaxed mt-6">
                {content.crossLink.context}{' '}
                <Link
                  to={content.crossLink.to}
                  className="text-[#7a1c1c] underline underline-offset-2 hover:text-[#0f0f0f] transition-colors"
                >
                  {content.crossLink.label}
                </Link>
                .
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="section bg-[#0f0f0f]">
        <div className="container-clean">
          <motion.div
            className="mb-12"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-4">Related Services</p>
            <h2 className="text-3xl md:text-4xl font-serif-display font-bold text-white">More Ways We Can Help</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {content.relatedServices.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={svc.to}
                  className="block border border-white/10 p-8 hover:border-[#7a1c1c]/60 transition-colors duration-300 group"
                >
                  <h3 className="text-lg font-serif-display font-bold text-white group-hover:text-[#c9a96e] transition-colors mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{svc.desc}</p>
                  <span className="text-[#7a1c1c] text-xs uppercase tracking-widest font-semibold group-hover:text-[#c9a96e] transition-colors">
                    Learn More →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#7a1c1c] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff_0px,#fff_1px,transparent_1px,transparent_50px)]" />
        <div className="container-narrow text-center relative z-10">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif-display font-bold mb-8 leading-[0.95]">
              {content.ctaTitle}
            </h2>
            <p className="text-xl font-serif-body mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
              {content.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/contact" size="lg" className="bg-white text-[#7a1c1c] hover:bg-[#f5f0e8] border-white">
                {content.heroCta}
              </Button>
              <Button to="tel:+16236408884" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                (623) 640-8884
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section bg-white">
        <div className="container-clean max-w-4xl">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <ContactForm title={content.formTitle} subtitle={content.formSubtitle} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
