import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const BlogPage = () => {
  const posts = [
    {
      title: 'The Right Way to Start a Business',
      displayTitle: 'The Right Way to Start a Business (And Why Most People Get It Wrong)',
      date: 'January 15, 2024',
      category: 'Business Formation',
      excerpt:
        'Starting a business is not about filing paperwork. It is about building the structure, banking, compliance, credit readiness, and digital foundation that support real growth.',
      slug: 'the-right-way-to-start-a-business'
    },
    {
      title: 'Why Most Business Websites Fail',
      displayTitle: 'Why Most Business Websites Fail (And How to Fix It)',
      date: 'January 12, 2024',
      category: 'Website Design',
      excerpt:
        'Most websites look acceptable but do not convert. The problem is usually weak positioning, poor SEO structure, unclear proof, and no real conversion path.',
      slug: 'why-websites-fail'
    },
    {
      title: 'Local SEO Is Not Optional Anymore',
      displayTitle: 'Local SEO Is Not Optional Anymore',
      date: 'January 10, 2024',
      category: 'SEO',
      excerpt:
        'Local SEO is where high-intent customers find businesses. If your Google profile, reviews, service pages, and local signals are weak, competitors get the calls.',
      slug: 'local-seo-is-not-optional'
    },
    {
      title: 'What Actually Drives Business Growth Online',
      displayTitle: 'What Actually Drives Business Growth Online',
      date: 'January 8, 2024',
      category: 'Digital Marketing',
      excerpt:
        'Traffic alone does not grow a business. Growth comes from visibility, positioning, trust, conversion, and follow-up working as one system.',
      slug: 'what-drives-business-growth-online'
    }
  ];

  return (
    <>
      <SEOHead
        title="Business Growth Insights | RAH Operations"
        description="Strategic insights on website design, SEO, business setup, local visibility, digital marketing, and business growth systems."
        url={absoluteUrl('/blogs')}
        keywords="business growth insights, website design strategy, SEO insights, local SEO, digital marketing strategy, business setup"
      />

      {/* HERO */}
      <section className="section bg-gradient-to-br from-stone-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-800 to-slate-600" />
        <div className="container-clean max-w-5xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-sm uppercase tracking-widest text-slate-600 mb-6 font-medium">
              Strategic Insights
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif-display font-bold text-slate-900 mb-8 leading-tight">
              Business
              <span className="block text-slate-700">Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 font-serif-body leading-relaxed max-w-3xl">
              Practical frameworks for businesses that demand precision, credibility, and measurable results in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="section bg-white">
        <div className="container-clean max-w-6xl">
          <div className="grid gap-12">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                className="group border-b border-slate-200 pb-12 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                        {post.category}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs text-slate-500">
                        {post.date}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif-display font-bold text-slate-900 mb-6 leading-tight group-hover:text-slate-700 transition-colors">
                      {post.displayTitle}
                    </h2>

                    <p className="text-lg text-slate-600 font-serif-body leading-relaxed mb-8 max-w-2xl">
                      {post.excerpt}
                    </p>

                    <Link
                      to={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-2 text-slate-900 font-medium hover:text-slate-700 transition-colors group"
                    >
                      <span>Read Full Article</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-slate-100 h-48 rounded-lg flex items-center justify-center text-slate-400 text-sm font-medium">
                      Article Preview
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-900 text-white">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold mb-6">
              Stay Informed
            </h2>
            <p className="text-lg font-serif-body mb-8 max-w-xl mx-auto opacity-90">
              Subscribe for weekly insights on business growth, digital strategy, and market positioning.
            </p>
            <button className="bg-white text-slate-900 px-8 py-3 font-medium hover:bg-slate-100 transition-colors">
              Subscribe to Updates
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
