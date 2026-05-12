import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const BlogPage = () => {
  const posts = [
    {
      title: "LLC Setup Arizona: Complete Guide for 2026",
      displayTitle: "LLC Setup Arizona: Everything You Need to Know to Launch Your Business the Right Way",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 22:55:49 GMT",
      issue: 'No. 028',
      category: "Business Services",
      excerpt: "Setting up an LLC in Arizona is one of the smartest moves you can make as an entrepreneur, but the process has specific requirements you need to get right from day one. From filing your Articles of Organization to building your digital presence, this guide covers everything Arizona business owners need to know. RAH Operations helps local founders launch with confidence and grow with strategy.",
      slug: 'llc-setup-arizona'
    },
    {
      title: "Credit Repair Services Scottsdale | RAH Operations",
      displayTitle: "Credit Repair Services in Scottsdale: Rebuild Your Score and Unlock Real Financial Opportunities",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 21:26:30 GMT",
      issue: 'No. 027',
      category: "Credit Repair",
      excerpt: "Your credit score controls more of your life than most people realize — from the interest rate on your car loan to whether a landlord approves your application. RAH Operations provides professional credit repair services in Scottsdale designed to remove inaccurate negative items, strengthen your credit profile, and help you qualify for the financing you deserve. If a poor credit score has been holding you back, it's time to do something about it.",
      slug: 'credit-repair-services-scottsdale'
    },
    {
      title: "Reputation Management Scottsdale | RAH Operations",
      displayTitle: "Reputation Management in Scottsdale: How to Protect and Build Your Brand Online",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 10:00:00 GMT",
      issue: 'No. 030',
      category: "Digital Marketing",
      excerpt: "Your online reputation is your most valuable business asset in today's digital-first world. Whether you're dealing with negative reviews, outdated information, or a brand image that doesn't match your quality, reputation management in Scottsdale is a critical investment. RAH Operations helps local businesses take control of their narrative and turn their online presence into a competitive advantage.",
      slug: 'reputation-management-scottsdale'
    },
    {
      title: "Business Credit Building Arizona | RAH Operations",
      displayTitle: "Business Credit Building in Arizona: How to Fund Your Growth the Right Way",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 09:00:00 GMT",
      issue: 'No. 029',
      category: "Credit Repair",
      excerpt: "Building business credit in Arizona is one of the most powerful moves a small business owner can make—yet most skip it entirely. This guide walks you through every step, from setting up your business foundation to accessing real funding. RAH Operations helps Arizona businesses build the credit profile they need to grow.",
      slug: 'business-credit-building-arizona'
    },
    {
      title: "Digital Marketing Agency Phoenix AZ | RAH Operations",
      displayTitle: "Why Phoenix Businesses Are Choosing a Local Digital Marketing Agency to Dominate Their Market",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 07:52:18 GMT",
      issue: 'No. 024',
      category: "Digital Marketing",
      excerpt: "Phoenix is one of the fastest-growing business markets in the country, and standing out online requires more than a basic website. RAH Operations is the Scottsdale-based digital marketing agency helping Phoenix businesses build visibility, generate leads, and grow revenue through proven strategies. Here's what working with a local agency actually looks like.",
      slug: 'digital-marketing-agency-phoenix-az'
    },
    {
      title: "Social Media Management Scottsdale | RAH Operations",
      displayTitle: "Social Media Management in Scottsdale: How Local Businesses Are Winning Online in 2025",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 06:15:00 GMT",
      issue: 'No. 023',
      category: "Social Media",
      excerpt: "Scottsdale businesses are leaving revenue on the table by ignoring social media — or worse, managing it inconsistently. RAH Operations delivers professional social media management built specifically for the Arizona market, turning followers into loyal customers and likes into real revenue.",
      slug: 'social-media-management-scottsdale'
    },
    {
      title: "Affordable SEO Services Scottsdale | RAH Operations",
      displayTitle: "Affordable SEO Services in Scottsdale: What You Actually Get — and Why It Matters",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 05:00:00 GMT",
      issue: 'No. 022',
      category: "SEO",
      excerpt: "Affordable SEO in Scottsdale doesn't have to mean cutting corners. RAH Operations helps local businesses rank higher on Google with transparent, results-driven strategies built for the Arizona market. Here's exactly what smart SEO investment looks like in 2024.",
      slug: 'affordable-seo-services-scottsdale'
    },
    {
      title: "Website Design Company Scottsdale AZ | RAH Operations",
      displayTitle: "Why Scottsdale Businesses Choose RAH Operations as Their Website Design Company",
      date: "May 12, 2026",
      pubDate: "Tue, 12 May 2026 04:00:00 GMT",
      issue: 'No. 021',
      category: "Website Design",
      excerpt: "Your website is your most powerful sales tool — but only if it's built to convert. RAH Operations is a Scottsdale-based website design company that combines stunning design with proven SEO strategy to help Arizona businesses grow online. Discover what sets us apart.",
      slug: 'website-design-company-scottsdale-az'
    },
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
    },
    {
      title: 'How Much Does SEO Cost for a Small Business in Scottsdale?',
      displayTitle: 'How Much Does SEO Cost for a Small Business in Scottsdale?',
      date: 'May 5, 2025',
      issue: 'No. 015',
      category: 'SEO',
      excerpt: 'An honest breakdown of what SEO actually costs for Scottsdale small businesses — what different price tiers deliver, what drives pricing, and how to evaluate whether the investment makes sense.',
      slug: 'how-much-does-seo-cost-small-business-scottsdale'
    },
    {
      title: 'Website Design vs SEO: Which Should Scottsdale Businesses Fix First?',
      displayTitle: 'Website Design vs SEO: Which Should Scottsdale Businesses Fix First?',
      date: 'May 5, 2025',
      issue: 'No. 016',
      category: 'Website Design',
      excerpt: 'A practical answer to the most common Scottsdale business dilemma — whether to fix the website or invest in SEO first, and why the answer depends entirely on where your biggest bottleneck is.',
      slug: 'website-design-vs-seo-scottsdale-businesses'
    },
    {
      title: 'Why Phoenix Businesses Struggle to Rank on Google',
      displayTitle: 'Why Phoenix Businesses Struggle to Rank on Google',
      date: 'May 5, 2025',
      issue: 'No. 017',
      category: 'SEO',
      excerpt: 'The five most common reasons Phoenix businesses fail to rank on Google — from website structure problems to weak local SEO foundations — and what to do about each one.',
      slug: 'why-phoenix-businesses-struggle-to-rank-on-google'
    },
    {
      title: 'How to Improve Your Google Business Profile in Scottsdale',
      displayTitle: 'How to Improve Your Google Business Profile in Scottsdale',
      date: 'May 5, 2025',
      issue: 'No. 018',
      category: 'Local SEO',
      excerpt: 'A step-by-step guide to improving your Google Business Profile in Scottsdale — categories, photos, posts, reviews, and the specific optimizations that move local pack rankings.',
      slug: 'how-to-improve-google-business-profile-scottsdale'
    },
    {
      title: 'Best Website Features for Local Service Businesses in Arizona',
      displayTitle: 'Best Website Features for Local Service Businesses in Arizona',
      date: 'May 5, 2025',
      issue: 'No. 019',
      category: 'Website Design',
      excerpt: 'The specific website features Arizona local service businesses need to rank on Google, earn customer trust, and convert visitors into leads — explained without the jargon.',
      slug: 'best-website-features-local-service-businesses-arizona'
    },
    {
      title: 'How Long Does SEO Take for a Scottsdale Business?',
      displayTitle: 'How Long Does SEO Take for a Scottsdale Business?',
      date: 'May 5, 2025',
      issue: 'No. 020',
      category: 'SEO Strategy',
      excerpt: 'Realistic SEO timelines for Scottsdale businesses — what to expect in the first 30, 60, 90, and 180 days of a professional SEO campaign, and the factors that determine how fast results appear.',
      slug: 'how-long-does-seo-take-scottsdale-business'
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

                  {/* Right: cover image */}
                  <div className="hidden lg:block">
                    <Link to={`/blogs/${post.slug}`} className="block overflow-hidden border border-[#1a1a1a]/10 group-hover:border-[#7a1c1c] transition-colors duration-300">
                      <img
                        src={`/blogs/${post.slug}.jpg`}
                        alt={post.title}
                        className="w-full aspect-[16/10] object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                      />
                    </Link>
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
