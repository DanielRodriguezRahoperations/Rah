import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

type BlogSection = {
  heading: string;
  body: string[];
};

type BlogPostData = {
  title: string;
  category: string;
  date: string;
  description: string;
  keywords: string;
  content: BlogSection[];
};

const blogPosts: Record<string, BlogPostData> = {
  'the-right-way-to-start-a-business': {
    title: 'The Right Way to Start a Business',
    category: 'Business Formation',
    date: 'January 15, 2024',
    description:
      'Learn how to start a business the right way with proper structure, business setup, banking, compliance, credit readiness, and digital foundation.',
    keywords:
      'how to start a business, business setup, LLC formation, new business checklist, EIN setup, business structure, business credit readiness',
    content: [
      {
        heading: 'Most New Businesses Start With the Wrong Priorities',
        body: [
          'A lot of new business owners start with the fun pieces first. They pick a logo, buy a domain, create social media pages, and maybe file an LLC. Those things matter, but they are not the full foundation of a real business.',
          'The truth is simple: starting a business the right way is not just about filing paperwork. It is about building a structure that protects you, supports banking, prepares you for funding, and gives customers confidence that they are working with a legitimate company.',
          'If you skip the foundation, you usually pay for it later. You may run into banking issues, credit limitations, tax confusion, compliance problems, or a weak online presence that makes the business look unfinished.'
        ]
      },
      {
        heading: 'Start With the Right Business Structure',
        body: [
          'Your business structure affects liability, taxes, credibility, banking, credit, and funding. That is why choosing the right structure should not be treated like a random online filing.',
          'For many small businesses, an LLC is a strong starting point because it can help separate personal and business liability while keeping the structure flexible. Some businesses may need a corporation or a more specific setup depending on ownership, tax goals, funding plans, or long-term growth strategy.',
          'The mistake most people make is assuming the cheapest or fastest setup is the best setup. It is not. The best setup is the one that supports how the business will operate, grow, and protect itself.'
        ]
      },
      {
        heading: 'Get Your EIN and Business Banking Correct',
        body: [
          'Once your entity is formed, your EIN and business bank account become key parts of your foundation. Your EIN is used for taxes, banking, vendor relationships, business credit, and many funding applications.',
          'Your business bank account matters because it creates financial separation. Mixing personal and business money is sloppy, risky, and makes your business harder to understand from a financial standpoint.',
          'A serious business should have clean banking, organized records, and a system for tracking money from day one. That does not need to be complicated, but it does need to be intentional.'
        ]
      },
      {
        heading: 'Build a Professional Digital Presence Early',
        body: [
          'You do not need a massive website on day one, but you do need a professional digital footprint. At minimum, your business should have a domain, professional email, clear website, Google Business Profile if applicable, and consistent contact information.',
          'Customers judge quickly. If your email looks unprofessional, your website is missing, or your business information is inconsistent, you create doubt before the conversation even starts.',
          'A clean digital presence helps your business look legitimate, improves trust, supports SEO, and gives people a clear way to contact you.'
        ]
      },
      {
        heading: 'Prepare for Business Credit and Funding Before You Need It',
        body: [
          'Most business owners wait until they need money before thinking about business credit. That is a mistake. Funding readiness starts long before the application.',
          'Your business name, address, phone number, website, banking, entity documents, D-U-N-S profile, vendor relationships, and payment history can all affect how fundable your business appears.',
          'If you build the foundation correctly early, you give yourself better options later. If you wait, you may find out too late that your business is not structured or documented well enough to qualify.'
        ]
      },
      {
        heading: 'The Real Checklist for Starting Correctly',
        body: [
          'A real business setup should include the right entity structure, EIN registration, operating agreement, business bank account, professional email, domain, website, Google Business Profile when relevant, bookkeeping system, compliance plan, and credit-readiness strategy.',
          'This is the difference between having a registered business and having a business that is actually prepared to operate.',
          'The goal is not to check boxes. The goal is to build a foundation that supports growth, credibility, and financial opportunity.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Starting a business correctly is not about doing the bare minimum. It is about building the foundation so the business can function, look professional, qualify for opportunities, and scale without unnecessary cleanup.',
          'If you are starting a business, do it once and do it correctly. The foundation you build now will either support your growth or create problems later.'
        ]
      }
    ]
  },

  'why-websites-fail': {
    title: 'Why Most Business Websites Fail',
    category: 'Website Design',
    date: 'January 12, 2024',
    description:
      'Most business websites fail because they lack positioning, SEO structure, conversion strategy, and clear messaging. Learn what to fix first.',
    keywords:
      'why websites fail, website design strategy, conversion focused website, business website design, SEO website structure, website conversion',
    content: [
      {
        heading: 'A Good-Looking Website Can Still Be a Bad Website',
        body: [
          'This is the part most business owners do not want to hear: a website can look polished and still fail completely.',
          'Most websites fail because they are built around design before strategy. The business chooses colors, images, layouts, and animations before answering the questions that actually matter: Who is this for? What problem does it solve? Why should someone trust this business? What should the visitor do next?',
          'If those questions are not answered clearly, the website becomes a digital brochure. It exists, but it does not sell.'
        ]
      },
      {
        heading: 'The First Failure Is Weak Positioning',
        body: [
          'Positioning is what tells a visitor why your business is the right choice. Without it, your site sounds like everyone else.',
          'Generic claims like “quality service,” “experienced team,” and “customer satisfaction” do not separate you from competitors. Every business says those things.',
          'Strong positioning makes the value obvious. It tells people what you do, who you help, why it matters, and why they should choose you instead of comparing ten other options.'
        ]
      },
      {
        heading: 'The Second Failure Is Poor SEO Structure',
        body: [
          'A lot of websites are designed without search intent in mind. That means the pages may look clean, but they are not structured to rank for what customers are actually searching.',
          'If you offer multiple services, each important service usually needs its own focused page. If you serve specific locations, your site needs local relevance. If your content is vague, Google has a harder time understanding what the page should rank for.',
          'SEO is not something you sprinkle on after the site is built. It should influence the site structure from the beginning.'
        ]
      },
      {
        heading: 'The Third Failure Is No Conversion Path',
        body: [
          'A website should guide visitors toward action. If the visitor has to think too hard, search for the next step, or wonder whether the business is credible, conversion drops.',
          'Strong conversion structure includes clear headlines, strong service sections, proof, trust signals, direct calls to action, and a simple contact path.',
          'The site should answer objections before they become reasons to leave.'
        ]
      },
      {
        heading: 'The Fourth Failure Is Too Much Clutter',
        body: [
          'Many businesses overload their websites with too many images, icons, animations, buttons, and sections. More is not better. More often creates confusion.',
          'High-performing websites are usually clear, controlled, and intentional. Every section should have a job. If a section does not build trust, explain value, improve SEO, or move the visitor toward action, it probably does not need to be there.',
          'Clarity beats clutter every time.'
        ]
      },
      {
        heading: 'What to Fix First',
        body: [
          'Start with your homepage headline. It should clearly explain what you do and why it matters. Then look at your service pages. Each one should speak to a specific problem, not just list generic features.',
          'Next, review your calls to action. Are you asking people to take a clear next step? Finally, check your trust signals. Do you show proof, case studies, testimonials, examples, or credibility markers?',
          'Most websites do not need more decoration. They need sharper strategy.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'A website is not successful because it looks modern. It is successful when it helps the business get found, build trust, and convert visitors into leads.',
          'If your website is not producing opportunities, it is not a design problem. It is a strategy problem.'
        ]
      }
    ]
  },

  'local-seo-is-not-optional': {
    title: 'Local SEO Is Not Optional Anymore',
    category: 'SEO',
    date: 'January 10, 2024',
    description:
      'Local SEO helps businesses show up when nearby customers search for services. Learn why local visibility, Google Business Profile, reviews, and service pages matter.',
    keywords:
      'local SEO, local SEO strategy, Google Business Profile optimization, SEO for local businesses, local service pages, Scottsdale SEO, Phoenix SEO',
    content: [
      {
        heading: 'Local Search Is Where High-Intent Customers Are',
        body: [
          'When someone searches for a local service, they are usually not casually browsing. They are looking for a provider, comparing options, and deciding who to contact.',
          'That is why local SEO matters. It puts your business in front of people who already have intent. They are not being interrupted by an ad. They are actively searching.',
          'If your business does not show up in those moments, you are invisible to some of your best potential customers.'
        ]
      },
      {
        heading: 'Your Google Business Profile Is a Trust Asset',
        body: [
          'For many local businesses, the Google Business Profile is just as important as the website. It shows reviews, photos, location, hours, services, and contact options.',
          'An incomplete or neglected profile can make a legitimate business look less trustworthy. A strong profile can increase calls, direction requests, website visits, and overall confidence.',
          'The profile should be accurate, active, optimized, and supported by a review strategy.'
        ]
      },
      {
        heading: 'Service Pages Matter More Than Most Businesses Think',
        body: [
          'One generic services page is usually not enough. If you offer multiple services, each major service should have a focused page that explains the service clearly and gives search engines a specific topic to understand.',
          'For example, a business offering wraps, paint protection film, ceramic coating, and chrome delete should not rely on one general automotive page. Each service deserves its own page because customers search for those services separately.',
          'This is how local SEO becomes specific instead of vague.'
        ]
      },
      {
        heading: 'Reviews Influence Rankings and Decisions',
        body: [
          'Reviews are not just social proof. They influence trust, click behavior, and local competitiveness.',
          'A business with weak reviews or no review strategy is giving competitors an easy advantage. Review quality, quantity, recency, and response quality all matter.',
          'The goal is not fake reviews. The goal is building a real system that consistently turns satisfied customers into visible trust signals.'
        ]
      },
      {
        heading: 'Consistency Across the Web Matters',
        body: [
          'Your name, address, phone number, website, and business details should be consistent across your website, Google profile, directories, and social platforms.',
          'Inconsistent information creates confusion for customers and weakens trust. It can also make it harder for search engines to confidently understand your business.',
          'Local SEO is not one tactic. It is a system of signals that all need to point in the same direction.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Local SEO is not optional for businesses that depend on local customers. It is one of the most important foundations for visibility and lead generation.',
          'If customers are searching locally and your competitors are showing up before you, your business is losing opportunities every day.'
        ]
      }
    ]
  },

  'what-drives-business-growth-online': {
    title: 'What Actually Drives Business Growth Online',
    category: 'Digital Marketing',
    date: 'January 8, 2024',
    description:
      'Online growth comes from visibility, positioning, trust, conversion, and follow-up working together. Learn why traffic alone is not enough.',
    keywords:
      'business growth online, digital marketing strategy, lead generation system, website conversion, online visibility, business growth system',
    content: [
      {
        heading: 'Traffic Alone Does Not Build a Business',
        body: [
          'A lot of businesses think they need more traffic. Sometimes they do. But traffic alone does not fix weak positioning, unclear messaging, poor trust, or a bad sales process.',
          'If your website does not explain your value clearly, more visitors will only expose the problem faster.',
          'Online growth comes from a system. Visibility gets people in. Positioning creates interest. Trust lowers resistance. Conversion turns attention into action. Follow-up turns leads into revenue.'
        ]
      },
      {
        heading: 'Visibility Creates Opportunity',
        body: [
          'People need to find you before they can buy from you. That is where SEO, local search, content, social media, ads, and reputation all matter.',
          'But visibility has to be relevant. Random traffic is not the goal. Qualified attention is the goal.',
          'The right people need to see the right message at the right time.'
        ]
      },
      {
        heading: 'Positioning Decides Whether People Care',
        body: [
          'Once someone finds your business, they immediately judge whether you look credible and relevant.',
          'Positioning answers the question: why should this person choose you instead of someone else?',
          'Strong positioning is specific. It communicates who you help, what problem you solve, and why your approach is better.'
        ]
      },
      {
        heading: 'Trust Signals Reduce Friction',
        body: [
          'Customers hesitate when they do not trust what they see. Trust is built through reviews, case studies, professional design, clear service explanations, strong copy, consistent branding, and easy contact options.',
          'Every trust gap creates friction. Friction lowers conversion.',
          'A strong online presence removes doubt before the sales conversation begins.'
        ]
      },
      {
        heading: 'Conversion Is Where Most Businesses Lose Money',
        body: [
          'If your site has weak calls to action, confusing page structure, vague messaging, or too many distractions, visitors leave.',
          'Conversion-focused design does not mean being pushy. It means making the next step obvious and logical.',
          'The visitor should never wonder what to do next.'
        ]
      },
      {
        heading: 'Follow-Up Turns Leads Into Revenue',
        body: [
          'Lead generation is only half the game. If inquiries are not followed up quickly and professionally, revenue leaks out of the system.',
          'Businesses need a simple follow-up process: immediate response, clear next steps, reminders, and a sales conversation that diagnoses before pitching.',
          'The best marketing system still fails if the follow-up is weak.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Online growth is not one thing. It is not just SEO, ads, social media, or a good website.',
          'Real growth happens when visibility, positioning, trust, conversion, and follow-up work together. That is the system every serious business needs.'
        ]
      }
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPosts[slug] : null;

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
            <p className="mb-8">The article may have been moved or removed.</p>
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
        keywords={post.keywords}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">{post.category}</p>

          <h1 className="mb-6">{post.title}</h1>

          <p className="mb-6 text-sm text-neutral-500">{post.date}</p>

          <p className="text-lg">{post.description}</p>
        </div>
      </section>

      <section className="section border-t border-neutral-200">
        <article className="container-clean max-w-3xl">
          <div className="space-y-12">
            {post.content.map((section, index) => (
              <div key={index}>
                <h2 className="mb-4 text-2xl">{section.heading}</h2>
                <div className="space-y-5">
                  {section.body.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
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
          <h2 className="mb-6">Want Your Business Built the Right Way?</h2>

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
