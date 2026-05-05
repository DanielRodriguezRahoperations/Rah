import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const BlogPage = () => {
  const posts = [
    {
      title: 'The Right Way to Start a Business',
      displayTitle: 'The Right Way to Start a Business (And Why Most People Get It Wrong)',
      date: 'Jan 15, 2024',
      issue: 'No. 001',
      category: 'Business Formation',
      excerpt: 'Starting a business is not about filing paperwork. It is about building the structure, banking, compliance, credit readiness, and digital foundation that support real growth.',
      slug: 'the-right-way-to-start-a-business'
    },
    {
      title: 'Why Most Business Websites Fail',
      displayTitle: 'Why Most Business Websites Fail (And How to Fix It)',
      date: 'Jan 12, 2024',
      issue: 'No. 002',
      category: 'Website Design',
      excerpt: 'Most websites look acceptable but do not convert. The problem is usually weak positioning, poor SEO structure, unclear proof, and no real conversion path.',
      slug: 'why-websites-fail'
    },
    {
      title: 'Local SEO Is Not Optional Anymore',
      displayTitle: 'Local SEO Is Not Optional Anymore',
      date: 'Jan 10, 2024',
      issue: 'No. 003',
      category: 'SEO',
      excerpt: 'Local SEO is where high-intent customers find businesses. If your Google profile, reviews, service pages, and local signals are weak, competitors get the calls.',
      slug: 'local-seo-is-not-optional'
    },
    {
      title: 'What Actually Drives Business Growth Online',
      displayTitle: 'What Actually Drives Business Growth Online',
      date: 'Jan 8, 2024',
      issue: 'No. 004',
      category: 'Digital Marketing',
      excerpt: 'Traffic alone does not grow a business. Growth comes from visibility, positioning, trust, conversion, and follow-up working as one system.',
      slug: 'what-drives-business-growth-online'
    },
    {
      title: 'How Much Does Website Design Cost in Scottsdale?',
      displayTitle: 'How Much Does Website Design Cost in Scottsdale?',
      date: 'Feb 5, 2024',
      issue: 'No. 005',
      category: 'Website Design',
      excerpt: 'An honest breakdown of website design pricing in Scottsdale — what the different tiers actually deliver, what drives cost, and how to avoid paying for the wrong thing.',
      slug: 'how-much-does-website-design-cost-scottsdale'
    },
    {
      title: 'How to Rank on Google Maps in Phoenix',
      displayTitle: 'How to Rank on Google Maps in Phoenix',
      date: 'Feb 12, 2024',
      issue: 'No. 006',
      category: 'Local SEO',
      excerpt: 'Google Maps rankings are where high-intent Phoenix customers make decisions. Here is exactly what moves the needle and what does not.',
      slug: 'how-to-rank-on-google-maps-phoenix'
    },
    {
      title: 'The Best SEO Strategies for Small Businesses in Arizona',
      displayTitle: 'The Best SEO Strategies for Small Businesses in Arizona',
      date: 'Feb 19, 2024',
      issue: 'No. 007',
      category: 'SEO',
      excerpt: 'Most Arizona small businesses are not doing SEO well. That is an opportunity. Here are the five strategies that actually drive local search rankings.',
      slug: 'best-seo-strategies-small-business-arizona'
    },
    {
      title: 'Why Your Google Business Profile Is Not Ranking',
      displayTitle: 'Why Your Google Business Profile Is Not Ranking in Phoenix or Scottsdale',
      date: 'Feb 26, 2024',
      issue: 'No. 008',
      category: 'Local SEO',
      excerpt: 'If your GBP is not showing up in local results, the reasons are almost always identifiable and fixable. Here are the most common culprits.',
      slug: 'why-google-business-profile-not-ranking'
    },
    {
      title: 'Website vs. Landing Page for Lead Generation',
      displayTitle: 'Website vs. Landing Page: What Your Arizona Business Actually Needs',
      date: 'Mar 4, 2024',
      issue: 'No. 009',
      category: 'Website Design',
      excerpt: 'The answer depends entirely on your marketing strategy and traffic source. Here is how to decide which one is right for your Arizona business.',
      slug: 'website-vs-landing-page-lead-generation'
    },
    {
      title: 'How to Get More Reviews for Your Arizona Business',
      displayTitle: 'How to Get More Reviews for Your Arizona Business',
      date: 'Mar 11, 2024',
      issue: 'No. 010',
      category: 'Reputation Management',
      excerpt: 'Reviews influence both your Google rankings and what customers decide when they find you. Here is the systematic approach that generates them consistently.',
      slug: 'how-to-get-more-reviews-for-your-business'
    },
    {
      title: 'What Is Local SEO and Why It Matters',
      displayTitle: 'What Is Local SEO and Why It Matters for Arizona Businesses',
      date: 'Mar 18, 2024',
      issue: 'No. 011',
      category: 'Local SEO',
      excerpt: 'A clear explanation of what local SEO is, how it works, and why it is the most direct path to consistent leads for Arizona service businesses.',
      slug: 'what-is-local-seo-and-why-it-matters'
    },
    {
      title: 'How to Build Business Credit From Scratch in Arizona',
      displayTitle: 'How to Build Business Credit From Scratch in Arizona',
      date: 'Mar 25, 2024',
      issue: 'No. 012',
      category: 'Business Credit',
      excerpt: 'Business credit does not build itself. Here is the step-by-step sequence Arizona business owners need to follow to build a real, independently standing credit profile.',
      slug: 'how-to-build-business-credit-from-scratch'
    },
    {
      title: 'Digital Marketing for Contractors in Arizona',
      displayTitle: 'Digital Marketing for Contractors in Arizona: What Actually Works',
      date: 'Apr 1, 2024',
      issue: 'No. 013',
      category: 'Digital Marketing',
      excerpt: 'Arizona contractors have a digital marketing opportunity most are not capitalizing on. Here is what moves the needle for home services leads in the Phoenix metro.',
      slug: 'digital-marketing-for-contractors-arizona'
    },
    {
      title: 'How to Choose the Right Website Design Company in Scottsdale',
      displayTitle: 'How to Choose the Right Website Design Company in Scottsdale',
      date: 'May 4, 2024',
      issue: 'No. 014',
      category: 'Website Design',
      excerpt: 'A practical guide for Scottsdale business owners on how to evaluate web design options — what to look for, what to avoid, and what questions reveal whether a designer truly understands local performance.',
      slug: 'how-to-choose-website-design-company-scottsdale'
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

      {/* MASTHEAD — broadsheet newspaper aesthetic */}
      <section className="bg-[#faf8f4] border-b-4 border-[#1a1a1a] pt-32 pb-0">
        <div className="container-clean">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-baseline justify-between border-b border-[#1a1a1a]/20 pb-4 mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">RAH Operations</p>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Strategic Intelligence</p>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Arizona</p>
            </div>

            <h1 className="text-[clamp(4rem,12vw,10rem)] font-serif-display font-bold leading-[0.85] text-[#1a1a1a] tracking-tight mb-6">
              The Brief
            </h1>

            <div className="flex items-center justify-between border-t-4 border-[#1a1a1a] pt-6 pb-8">
              <p className="text-sm font-serif-body text-neutral-600 max-w-xl">
                Practical frameworks for businesses that demand precision, credibility, and measurable results in the digital landscape.
              </p>
              <p className="text-xs uppercase tracking-widest text-neutral-400 hidden md:block">Vol. I, 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES — newspaper column layout */}
      <section className="bg-[#faf8f4] py-16 lg:py-24">
        <div className="container-clean">
          <div className="divide-y-2 divide-[#1a1a1a]/10">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                className="group py-12 lg:py-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="grid lg:grid-cols-[2fr_3fr_1fr] gap-8 lg:gap-12 items-start">
                  {/* Left: meta */}
                  <div className="lg:pt-2">
                    <p className="text-[#7a1c1c] text-xs font-bold uppercase tracking-[0.25em] mb-3">{post.issue}</p>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">{post.category}</p>
                    <p className="text-xs text-neutral-400">{post.date}</p>
                  </div>

                  {/* Center: content */}
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif-display font-bold text-[#1a1a1a] mb-5 leading-tight group-hover:text-[#7a1c1c] transition-colors duration-300">
                      {post.displayTitle}
                    </h2>
                    <p className="text-lg text-neutral-600 font-serif-body leading-relaxed mb-8">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-1 hover:text-[#7a1c1c] hover:border-[#7a1c1c] transition-colors"
                    >
                      Read Article
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>

                  {/* Right: decorative number */}
                  <div className="hidden lg:flex items-center justify-end">
                    <span className="text-[8rem] font-serif-display font-bold text-[#1a1a1a]/5 leading-none select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-[#1a1a1a] text-white py-20 lg:py-28">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-6">Put It Into Practice</p>
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold mb-6 leading-tight">
              Read the Strategy. Build the System.
            </h2>
            <p className="text-lg font-serif-body text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
              Every article here reflects how we actually work. If you're ready to apply these principles to your business, let's talk.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-[#1a1a1a] px-10 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-[#faf8f4] transition-colors"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
