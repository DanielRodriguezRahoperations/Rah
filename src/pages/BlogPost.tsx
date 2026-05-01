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
      'A complete business setup guide covering LLC formation, EIN setup, business banking, website creation, local SEO, business credit readiness, and the foundation every serious business needs before trying to scale.',
    keywords:
      'how to start a business, business setup, LLC formation, EIN setup, business website creation, website development for small business, local SEO for new businesses, business credit readiness, Scottsdale business setup, Phoenix business website design',
    content: [
      {
        heading: 'Most People Do Not Start Businesses. They Create Problems They Have to Fix Later.',
        body: [
          'Most new business owners think starting a business means filing an LLC, getting a logo, buying a domain, and posting on social media. That is not a real business foundation. That is surface-level setup.',
          'A real business needs structure, banking, documentation, professional branding, a website, local visibility, and a path to generate leads. Without those pieces working together, the business may technically exist, but it is not positioned to grow.',
          'This is where a lot of businesses lose before they even start. They look incomplete online, they have no search presence, their business information is inconsistent, and their website does not clearly explain what they do or why customers should trust them.'
        ]
      },
      {
        heading: 'Your Business Structure Has to Match the Way You Plan to Grow',
        body: [
          'The structure of your business affects liability, taxes, banking, business credit, funding, credibility, and long-term operations. That is why the cheapest filing option is not always the smartest option.',
          'For many small businesses, an LLC makes sense because it can help separate personal and business liability while giving the owner flexibility. But the LLC alone does not make the business professional. The structure has to be supported by clean records, banking, operating documents, tax planning, and consistent business information.',
          'If the business name, address, phone number, website, and records do not match across platforms, lenders, vendors, customers, and search engines can all see the business as weaker than it should be.'
        ]
      },
      {
        heading: 'Your Website Is Part of the Business Foundation, Not a Decoration',
        body: [
          'A lot of new businesses treat website creation like something they can worry about later. That is a mistake.',
          'Your website is often the first serious trust test. Before someone calls, books, requests pricing, or sends an inquiry, they usually look you up. If your website looks cheap, outdated, confusing, or unfinished, the business feels less credible.',
          'A strong business website should clearly explain who you serve, what you offer, where you serve customers, why you are credible, and what the visitor should do next. Website design is not just about appearance. Website development has to support SEO, speed, mobile usability, lead generation, and conversion.'
        ]
      },
      {
        heading: 'Local SEO Should Be Built From the Beginning',
        body: [
          'If your business serves a local market, local SEO should not be added later. It should influence how the website is built from the beginning.',
          'Your homepage, service pages, title tags, meta descriptions, headings, internal links, Google Business Profile, reviews, and location signals all work together. If those pieces are disconnected, your local visibility suffers.',
          'A business trying to rank in Scottsdale, Phoenix, Tempe, Mesa, Chandler, Glendale, or any other service area needs more than a generic website. It needs location-aware content, service-specific pages, accurate contact information, and a clean site structure that helps search engines understand what the business does and where it operates.'
        ]
      },
      {
        heading: 'Business Banking and Credit Readiness Matter Earlier Than Most Owners Think',
        body: [
          'Business credit and funding readiness start long before a business applies for money.',
          'Banks and lenders look for consistency, legitimacy, documentation, revenue, business identity, and risk signals. A professional website, business email, clean banking, proper records, and consistent business listings can all support credibility.',
          'If you wait until you need funding to clean up your business foundation, you are already late. Strong businesses prepare early so they have more options when growth requires capital.'
        ]
      },
      {
        heading: 'The Right Business Setup Creates a Cleaner Growth Path',
        body: [
          'A properly built business foundation should include entity setup, EIN registration, business banking, professional email, domain setup, website creation, local SEO structure, Google Business Profile optimization when applicable, bookkeeping direction, compliance organization, and a basic marketing plan.',
          'That does not mean every business needs a massive launch budget. It means the essentials need to be handled correctly.',
          'The businesses that grow faster are usually not the ones with the flashiest logo. They are the ones with cleaner structure, better visibility, stronger trust signals, and fewer operational gaps.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Starting a business the right way is not about checking random boxes. It is about building a serious foundation that supports trust, search visibility, funding readiness, and lead generation.',
          'If your business is new or early-stage, do not build it like a side project. Build it like something you expect to grow.'
        ]
      }
    ]
  },

  'why-websites-fail': {
    title: 'Why Most Business Websites Fail',
    category: 'Website Design',
    date: 'January 12, 2024',
    description:
      'Most business websites fail because they are built around looks instead of strategy, SEO, conversion, local search intent, and clear website development structure.',
    keywords:
      'why websites fail, website design strategy, website development, website creation, small business website design, local SEO website design, conversion focused website, Scottsdale website design, Phoenix website developer',
    content: [
      {
        heading: 'A Website Can Look Good and Still Be Useless',
        body: [
          'This is the part most business owners need to hear clearly: a pretty website is not automatically a good website.',
          'A website can have nice colors, clean photos, animations, and modern sections while still failing to generate calls, form submissions, quote requests, or booked appointments.',
          'Most websites fail because they are designed before the strategy is clear. The business chooses visuals before answering the questions that matter: who is this for, what problem does it solve, why should someone trust this company, and what action should the visitor take next?'
        ]
      },
      {
        heading: 'Weak Website Positioning Kills Conversion',
        body: [
          'The first job of a business website is to make the value obvious. If the visitor lands on the homepage and cannot quickly understand what you do, who you help, and why you are credible, the site is already losing.',
          'Generic phrases like “quality service,” “experienced team,” “we care about our customers,” and “solutions for your needs” are not enough. Every competitor says the same thing.',
          'Strong website copy needs sharper positioning. A local service business, medical aesthetics brand, contractor, consultant, restaurant, or professional service firm should all have messaging that speaks directly to the customer’s decision process.'
        ]
      },
      {
        heading: 'Most Websites Are Not Built for Local SEO',
        body: [
          'A lot of businesses hire someone to build a website, then later wonder why the site does not rank. The reason is simple: SEO was not built into the structure.',
          'Website development and local SEO have to work together. The site should include proper page titles, meta descriptions, heading structure, service-specific pages, location relevance, internal links, fast load performance, mobile-friendly layouts, and clear content that matches how customers search.',
          'If a business wants to rank for searches like website design Scottsdale, Phoenix website development, local SEO services, notary services near me, business credit help, or personal credit repair, the website needs pages that are built around those search intents.'
        ]
      },
      {
        heading: 'One Generic Services Page Is Usually Not Enough',
        body: [
          'Many business websites make the same mistake: they put every service on one broad services page and expect Google to understand everything.',
          'That is weak structure. If a business offers website design, SEO, social media management, reputation management, business credit, business setup, and notary services, each core service should have its own focused page.',
          'Dedicated service pages give search engines more context and give visitors a better experience. A person searching for website creation does not want to dig through unrelated services. They want a clear page that speaks directly to website design, website development, pricing expectations, process, proof, and next steps.'
        ]
      },
      {
        heading: 'Bad Mobile Experience Is a Silent Lead Killer',
        body: [
          'Most local service searches happen on phones. If the mobile version of the site feels cramped, slow, hard to read, or difficult to navigate, leads disappear quietly.',
          'The user should not have to pinch, zoom, hunt for the phone number, or scroll through clutter to understand the offer.',
          'Good mobile website design is clean, fast, readable, and direct. The headline should be clear. The call to action should be easy to find. The form should be simple. The pages should load quickly.'
        ]
      },
      {
        heading: 'The Website Needs a Real Conversion Path',
        body: [
          'A business website should guide visitors toward action. That does not mean screaming “Buy Now” on every section. It means removing confusion.',
          'A strong conversion path includes a clear hero section, service explanation, proof, case studies, reviews, trust signals, FAQs, contact options, and a call to action that fits the buyer’s stage.',
          'If the visitor does not know what to do next, the website failed. If the visitor does not trust the business enough to take action, the website failed. If the website gets traffic but no leads, the website is not doing its job.'
        ]
      },
      {
        heading: 'What a Better Business Website Should Include',
        body: [
          'A serious business website should include strategic homepage messaging, dedicated service pages, local SEO structure, clean navigation, fast performance, mobile-first layouts, strong internal linking, testimonials, case studies, FAQs, contact forms, and clear calls to action.',
          'For a local business, the site should also support Google Business Profile visibility by reinforcing the services, locations, and trust signals that matter in local search.',
          'The goal is not to build a website that wins design compliments. The goal is to build a website that helps the business get found, look credible, and convert more leads.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Most business websites fail because they are treated like digital brochures instead of growth assets.',
          'A better website needs strategy, SEO, structure, design discipline, and conversion planning from the beginning.',
          'If your website does not help people find you, trust you, and contact you, it is not a business asset. It is just an online placeholder.'
        ]
      }
    ]
  },

  'local-seo-is-not-optional': {
    title: 'Local SEO Is Not Optional Anymore',
    category: 'SEO',
    date: 'January 10, 2024',
    description:
      'Local SEO helps businesses show up when nearby customers search for website design, service providers, business support, professional services, and local solutions.',
    keywords:
      'local SEO, local SEO strategy, Google Business Profile optimization, local SEO for small business, website design local SEO, Scottsdale SEO, Phoenix SEO, local service pages, website development SEO',
    content: [
      {
        heading: 'Local SEO Is Where High-Intent Customers Are Already Looking',
        body: [
          'Local SEO matters because it puts your business in front of people who are already searching for what you offer.',
          'That is a completely different type of attention than social media scrolling. Someone searching for a website designer near me, local SEO company, notary services near me, business setup help, or credit repair services is showing intent.',
          'If your business does not appear in those moments, the opportunity goes to a competitor.'
        ]
      },
      {
        heading: 'Your Website and Google Business Profile Have to Work Together',
        body: [
          'For local businesses, the website and Google Business Profile should not feel disconnected.',
          'Your website should clearly support the services listed on your Google profile. Your Google profile should link to a website that reinforces your credibility, explains your services, and makes it easy to contact you.',
          'When these two assets work together, they create stronger trust for both customers and search engines.'
        ]
      },
      {
        heading: 'Local SEO Starts With Website Structure',
        body: [
          'Local SEO is not just adding a city name to a page. That is lazy and it usually reads badly.',
          'A better local SEO website structure includes service-specific pages, clear headings, local relevance, internal links, FAQs, schema where appropriate, testimonials, portfolio examples, and consistent business information.',
          'For example, a business that wants to rank for website design in Scottsdale or website development in Phoenix should not rely on one vague homepage. It should have focused content that explains website design services, development process, SEO strategy, conversion goals, and the type of businesses served.'
        ]
      },
      {
        heading: 'Service Pages Build Local Search Relevance',
        body: [
          'Dedicated service pages help Google understand what your business offers. They also help customers land on the most relevant page.',
          'A person searching for reputation management should not have to land on a generic digital marketing page and guess whether you offer it. A person searching for website creation should not have to sort through business credit information.',
          'Strong local SEO separates important services into their own pages, then connects them through internal links so the entire website becomes easier to understand.'
        ]
      },
      {
        heading: 'Reviews Are Not Optional Trust Signals',
        body: [
          'Reviews influence how people judge your business before they ever contact you.',
          'A business with a strong review profile has an advantage. A business with weak reviews, outdated reviews, or no review process is making the decision easier for competitors.',
          'Local SEO is not only about ranking. It is about getting chosen after people find you. Reviews, responses, case studies, and proof all affect that decision.'
        ]
      },
      {
        heading: 'Consistency Across the Web Matters',
        body: [
          'Your business name, address, phone number, website, hours, service categories, and descriptions should be consistent across your website, Google Business Profile, directories, and social platforms.',
          'Inconsistent information creates friction. Customers get confused. Search engines get weaker signals. The business looks less organized.',
          'For a local business, consistency is part of credibility.'
        ]
      },
      {
        heading: 'Local SEO Needs Content That Matches Real Searches',
        body: [
          'The best local SEO content is built around how people actually search.',
          'Customers may search for terms like website design Scottsdale, affordable website developer Phoenix, local SEO company near me, Google Business Profile help, business website creation, small business SEO services, or website redesign for small business.',
          'Your website should include clear content that naturally supports those terms without sounding stuffed or robotic. The best SEO copy reads like a strong sales page, not a keyword dump.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Local SEO is no longer optional for businesses that depend on search visibility, calls, appointments, or quote requests.',
          'A strong local SEO system combines website structure, service pages, Google Business Profile optimization, reviews, consistent information, and conversion-focused content.',
          'If your competitors are showing up before you, they are not just ranking higher. They are taking the opportunities you should be competing for.'
        ]
      }
    ]
  },

  'what-drives-business-growth-online': {
    title: 'What Actually Drives Business Growth Online',
    category: 'Digital Marketing',
    date: 'January 8, 2024',
    description:
      'Online business growth comes from website design, local SEO, conversion strategy, reputation, lead follow-up, and a digital system built to turn visibility into revenue.',
    keywords:
      'business growth online, website design for business growth, digital marketing strategy, local SEO strategy, lead generation website, website conversion, online visibility, website development for small business',
    content: [
      {
        heading: 'Traffic Alone Does Not Grow a Business',
        body: [
          'A lot of businesses think they need more traffic. Sometimes they do. But more traffic will not fix a weak website, unclear messaging, poor reviews, bad follow-up, or no conversion strategy.',
          'If your website does not explain your value clearly, more visitors only expose the weakness faster.',
          'Online growth requires a system. Visibility gets people to the business. Positioning makes them care. Trust makes them believe. Conversion gets them to act. Follow-up turns the lead into revenue.'
        ]
      },
      {
        heading: 'Your Website Is the Center of the Growth System',
        body: [
          'Your website should not sit off to the side like an online brochure. It should be the center of your digital growth system.',
          'SEO, Google Business Profile traffic, social media, paid ads, referrals, email, and reputation management often lead people back to the website. If the site is weak, every channel performs worse.',
          'A strong business website should clearly explain the offer, support local SEO, load quickly, work well on mobile, answer common objections, and make the next step obvious.'
        ]
      },
      {
        heading: 'Visibility Gets Attention, But Positioning Converts It',
        body: [
          'Visibility matters. A business needs to show up on Google, maps, social platforms, directories, and search results where customers are looking.',
          'But visibility without positioning is not enough.',
          'When someone lands on your site, they need to quickly understand why your business is the right choice. That comes from sharper messaging, specific service pages, clear proof, strong calls to action, and a website experience that feels credible.'
        ]
      },
      {
        heading: 'Local SEO Creates Compounding Value',
        body: [
          'Paid ads can generate traffic, but the moment you stop paying, the traffic often stops.',
          'Local SEO can build compounding visibility over time when done correctly. That means better service pages, better Google Business Profile signals, better content, better internal linking, stronger reviews, and clearer location relevance.',
          'For local businesses, ranking for the right service and location searches can create consistent inbound opportunities without relying only on paid traffic.'
        ]
      },
      {
        heading: 'Reputation Is Part of Conversion',
        body: [
          'People do not just look at your website. They look at reviews, social proof, photos, case studies, and whether the business feels active and trustworthy.',
          'A weak reputation profile can kill a lead before the business ever knows the person was interested.',
          'Strong reputation management includes asking for reviews, responding professionally, showcasing proof, and making sure the business looks credible wherever customers find it.'
        ]
      },
      {
        heading: 'Follow-Up Is Where Many Businesses Lose the Money',
        body: [
          'Lead generation is only valuable if the business follows up correctly.',
          'If a website form comes in and nobody responds quickly, the lead goes cold. If the first response is weak, the trust drops. If there is no process, leads fall through the cracks.',
          'A serious growth system needs simple lead handling: fast response, clear next step, reminders, organized pipeline tracking, and a sales conversation that diagnoses the customer’s actual need.'
        ]
      },
      {
        heading: 'What a Real Online Growth System Includes',
        body: [
          'A real online growth system includes website design, website development, local SEO, Google Business Profile optimization, reputation management, conversion copy, landing pages, internal linking, analytics, lead tracking, and follow-up structure.',
          'None of those pieces should operate in isolation. A beautiful website with no SEO is limited. SEO with a weak website wastes traffic. Leads with no follow-up waste money. Reviews with no conversion path leave opportunity on the table.',
          'The strongest businesses connect the entire system.'
        ]
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Online growth is not one tactic. It is not just a website, SEO, ads, social media, or reviews.',
          'Growth happens when the entire digital presence works together to attract the right people, build trust, and convert interest into revenue.',
          'If your business has traffic but no leads, leads but no sales, or a website that looks fine but does not produce, the system is broken somewhere. Fix the system.'
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

          <h1 className="mb-6 text-balance">{post.title}</h1>

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

          <div className="mt-14 grid gap-4 border-y border-neutral-200 py-8 md:grid-cols-3">
            <Link
              to="/website-design-and-seo"
              className="border border-neutral-200 p-5 transition-colors duration-300 hover:bg-white"
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Service
              </span>
              <span className="mt-2 block font-semibold text-neutral-950">
                Website Design & SEO
              </span>
            </Link>

            <Link
              to="/digital-marketing"
              className="border border-neutral-200 p-5 transition-colors duration-300 hover:bg-white"
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Service
              </span>
              <span className="mt-2 block font-semibold text-neutral-950">
                Digital Marketing
              </span>
            </Link>

            <Link
              to="/business-credit-and-funding"
              className="border border-neutral-200 p-5 transition-colors duration-300 hover:bg-white"
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Service
              </span>
              <span className="mt-2 block font-semibold text-neutral-950">
                Business Credit & Funding
              </span>
            </Link>
          </div>

          <div className="mt-8">
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
          <p className="eyebrow mb-6">Build the System</p>

          <h2 className="mb-6 text-balance">
            Your Website Should Do More Than Sit Online.
          </h2>

          <p className="mx-auto mb-10 max-w-2xl">
            RAH Operations builds websites, SEO structure, business foundations, and digital systems designed to help serious businesses look credible, rank locally, and convert more leads.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button to="/contact">Start a Project</Button>
            <Button to="/case-studies" variant="secondary">View Case Studies</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
