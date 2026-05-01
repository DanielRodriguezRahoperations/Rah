import React from 'react';
import { Link } from 'react-router-dom';
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

      <section className="section">
        <div className="container-clean max-w-4xl">
          <p className="eyebrow mb-6">Insights</p>

          <h1 className="mb-6 text-balance">
            Strategy Notes for Businesses That Want to Look Sharper, Rank Better, and Convert More Leads.
          </h1>

          <p className="max-w-2xl text-lg">
            Practical thinking on website design, SEO, business structure, reputation, and the systems that make a business look credible before the first conversation.
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="grid gap-5">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="card-clean hover-lift grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                    {post.category} / {post.date}
                  </p>

                  <h2 className="mb-4 text-2xl md:text-3xl">
                    {post.displayTitle}
                  </h2>

                  <p className="max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex lg:justify-end">
                  <Link
                    to={`/blogs/${post.slug}`}
                    aria-label={`Read article: ${post.title}`}
                    className="inline-flex border border-neutral-950 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-950 transition-all duration-300 hover:bg-neutral-950 hover:text-white"
                  >
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
