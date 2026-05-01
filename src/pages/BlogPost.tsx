import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const blogPosts = {
  'the-right-way-to-start-a-business': {
    title: 'The Right Way to Start a Business',
    category: 'Business Formation',
    date: 'January 15, 2024',
    description:
      'Starting a business is not about filing paperwork. It is about building a structure that supports growth, funding, and long-term stability.',
    content: [
      {
        heading: 'Most People Start Backwards',
        body:
          'A lot of new business owners rush to file an LLC, buy a domain, and make a logo. That is not a business foundation. That is surface-level setup. A real business needs structure, banking separation, compliance, positioning, and a plan for how it will operate and grow.'
      },
      {
        heading: 'Your Structure Matters',
        body:
          'The entity you choose affects liability, taxes, banking, credit, funding, and how professionally your business is viewed. Filing paperwork is easy. Structuring the business correctly is the part most people skip.'
      },
      {
        heading: 'The Basic Foundation',
        body:
          'At minimum, a serious business needs the correct entity, EIN, operating agreement, business bank account, domain, professional email, digital presence, and clear record-keeping. Without those pieces, the business looks unfinished and may struggle to access capital or credibility.'
      },
      {
        heading: 'Why This Matters',
        body:
          'When the foundation is weak, every future step gets harder. Business credit becomes harder. Funding becomes harder. Marketing becomes harder. Growth becomes messier. Starting correctly saves time, money, and future cleanup.'
      }
    ]
  },

  'why-websites-fail': {
    title: 'Why Most Business Websites Fail',
    category: 'Website Design',
    date: 'January 12, 2024',
    description:
      'Most websites look fine but do nothing. The difference comes down to structure, positioning, and conversion strategy.',
    content: [
      {
        heading: 'A Good-Looking Website Is Not Enough',
        body:
          'Most business websites fail because they are built around design before strategy. They may look clean, but they do not explain the offer clearly, build trust quickly, or guide the visitor toward action.'
      },
      {
        heading: 'The Real Problem Is Positioning',
        body:
          'If visitors cannot quickly understand what you do, who you help, why you are different, and what they should do next, your website is leaking opportunities.'
      },
      {
        heading: 'SEO and Conversion Have to Work Together',
        body:
          'Traffic without conversion is wasted attention. Conversion without traffic means nobody sees the offer. A strong website needs both search visibility and a clear sales path.'
      },
      {
        heading: 'What to Fix First',
        body:
          'Start with the headline, service clarity, trust signals, page structure, and call to action. Those are the areas that usually create the biggest immediate improvement.'
      }
    ]
  },

  'local-seo-is-not-optional': {
    title: 'Local SEO Is Not Optional Anymore',
    category: 'SEO',
    date: 'January 10, 2024',
    description:
      'If your business does not show up locally, it does not exist to your customers. Here is how to fix that.',
    content: [
      {
        heading: 'Local Search Is Buyer Intent',
        body:
          'When someone searches for a local service, they are usually closer to taking action. That makes local SEO one of the highest-value visibility channels for service businesses.'
      },
      {
        heading: 'Your Website Needs Location Relevance',
        body:
          'Google needs to understand what you do, where you do it, and why your business is relevant. That comes from service pages, location signals, Google Business Profile optimization, reviews, and consistent business information.'
      },
      {
        heading: 'Generic Pages Do Not Win',
        body:
          'A basic services page is not enough in competitive markets. Strong local SEO usually requires dedicated service pages, clearer content, stronger internal linking, and better trust signals.'
      },
      {
        heading: 'The Goal',
        body:
          'The goal is not just ranking. The goal is showing up for the right searches and converting those visitors into qualified inquiries.'
      }
    ]
  },

  'what-drives-business-growth-online': {
    title: 'What Actually Drives Business Growth Online',
    category: 'Digital Marketing',
    date: 'January 8, 2024',
    description:
      'Traffic alone does not matter. Growth comes from the combination of visibility, positioning, and conversion.',
    content: [
      {
        heading: 'Traffic Is Not the Whole Game',
        body:
          'A lot of businesses chase traffic without fixing the business system behind it. More visitors will not solve unclear messaging, weak offers, poor trust, or bad conversion flow.'
      },
      {
        heading: 'Growth Comes From Alignment',
        body:
          'The strongest online growth happens when your website, SEO, marketing, reputation, and follow-up process all support the same business goal.'
      },
      {
        heading: 'Visibility Creates Opportunity',
        body:
          'SEO, content, ads, and social media can create attention. But attention only matters if the business is positioned well enough to turn that attention into action.'
      },
      {
        heading: 'The Real System',
        body:
          'A real growth system includes clear positioning, search visibility, strong trust signals, conversion-focused pages, and a follow-up process that turns inquiries into customers.'
      }
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <>
        <SEOHead
          title="Blog Post Not Found | RAH Operations"
          description="The blog post you are looking for could not be found."
          url={absoluteUrl('/blogs')}
        />

        <section className="section">
          <div className="container-clean max-w-3xl">
            <p className="eyebrow mb-6">Not Found</p>
            <h1 className="mb-6">This Article Could Not Be Found</h1>
            <p className="mb-8">
              The article may have been moved or removed.
            </p>
            <Button to="/blogs">Back to Insights</Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | RAH Operations`}
        description={post.description}
        url={absoluteUrl(`/blogs/${slug}`)}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">{post.category}</p>

          <h1 className="mb-6">
            {post.title}
          </h1>

          <p className="mb-6 text-sm text-neutral-500">
            {post.date}
          </p>

          <p className="text-lg">
            {post.description}
          </p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <article className="container-clean max-w-3xl">
          <div className="space-y-12">
            {post.content.map((section, index) => (
              <div key={index}>
                <h2 className="mb-4 text-2xl">
                  {section.heading}
                </h2>
                <p>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-neutral-200 pt-8">
            <Link
              to="/blogs"
              className="text-sm font-medium text-neutral-950 underline underline-offset-4"
            >
              Back to Insights
            </Link>
          </div>
        </article>
      </section>

      <section className="section border-t border-neutral-200">
        <div className="container-clean text-center">
          <h2 className="mb-6">
            Want Your Business Built the Right Way?
          </h2>

          <p className="mx-auto mb-10 max-w-xl">
            We build websites, SEO systems, and business foundations that support real growth.
          </p>

          <Button to="/contact">Start a Project</Button>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
