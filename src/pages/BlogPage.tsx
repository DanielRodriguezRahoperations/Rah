import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const BlogPage = () => {
  const posts = [
    {
      title: 'The Right Way to Start a Business (And Why Most People Get It Wrong)',
      date: 'January 15, 2024',
      category: 'Business Formation',
      excerpt:
        'Starting a business is not about filing paperwork. It is about building a structure that supports growth, funding, and long-term stability.',
      link: '#'
    },
    {
      title: 'Why Most Business Websites Fail (And How to Fix It)',
      date: 'January 12, 2024',
      category: 'Website Design',
      excerpt:
        'Most websites look fine but do nothing. The difference comes down to structure, positioning, and conversion strategy.',
      link: '#'
    },
    {
      title: 'Local SEO Is Not Optional Anymore',
      date: 'January 10, 2024',
      category: 'SEO',
      excerpt:
        'If your business does not show up locally, it does not exist to your customers. Here is how to fix that.',
      link: '#'
    },
    {
      title: 'What Actually Drives Business Growth Online',
      date: 'January 8, 2024',
      category: 'Digital Marketing',
      excerpt:
        'Traffic alone does not matter. Growth comes from the combination of visibility, positioning, and conversion.',
      link: '#'
    }
  ];

  return (
    <>
      <SEOHead
        title="Insights | RAH Operations"
        description="Insights on business growth, website design, SEO, and digital strategy."
        url={absoluteUrl('/blogs')}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Insights</p>

          <h1 className="mb-6">
            Business Growth Is Not Guesswork
          </h1>

          <p className="text-lg">
            Practical insights on building, positioning, and scaling a business the right way.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="section border-t border-neutral-200">
        <div className="container-clean">
          <div className="divide-y border-y border-neutral-200">
            {posts.map((post, index) => (
              <article
                key={index}
                className="grid gap-6 py-10 lg:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-sm text-neutral-500 mb-2">
                    {post.category} • {post.date}
                  </p>

                  <h2 className="text-2xl mb-3">
                    {post.title}
                  </h2>

                  <p className="max-w-xl">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center">
                  <a
                    href={post.link}
                    className="border border-neutral-950 px-5 py-3 text-sm font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-950 hover:text-white"
                  >
                    Read Article
                  </a>
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
