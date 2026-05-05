import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    description: 'A complete business setup guide covering LLC formation, EIN setup, business banking, website creation, local SEO, business credit readiness, and the foundation every serious business needs before trying to scale.',
    keywords: 'how to start a business, business setup, LLC formation, EIN setup, business website creation, website development for small business, local SEO for new businesses, business credit readiness, Scottsdale business setup, Phoenix business website design',
    content: [
      { heading: 'Most People Do Not Start Businesses. They Create Problems They Have to Fix Later.', body: ['Most new business owners think starting a business means filing an LLC, getting a logo, buying a domain, and posting on social media. That is not a real business foundation. That is surface-level setup.', 'A real business needs structure, banking, documentation, professional branding, a website, local visibility, and a path to generate leads. Without those pieces working together, the business may technically exist, but it is not positioned to grow.', 'This is where a lot of businesses lose before they even start. They look incomplete online, they have no search presence, their business information is inconsistent, and their website does not clearly explain what they do or why customers should trust them.'] },
      { heading: 'Your Business Structure Has to Match the Way You Plan to Grow', body: ['The structure of your business affects liability, taxes, banking, business credit, funding, credibility, and long-term operations. That is why the cheapest filing option is not always the smartest option.', 'For many small businesses, an LLC makes sense because it can help separate personal and business liability while giving the owner flexibility. But the LLC alone does not make the business professional. The structure has to be supported by clean records, banking, operating documents, tax planning, and consistent business information.', 'If the business name, address, phone number, website, and records do not match across platforms, lenders, vendors, customers, and search engines can all see the business as weaker than it should be.'] },
      { heading: 'Your Website Is Part of the Business Foundation, Not a Decoration', body: ['A lot of new businesses treat website creation like something they can worry about later. That is a mistake.', 'Your website is often the first serious trust test. Before someone calls, books, requests pricing, or sends an inquiry, they usually look you up. If your website looks cheap, outdated, confusing, or unfinished, the business feels less credible.', 'A strong business website should clearly explain who you serve, what you offer, where you serve customers, why you are credible, and what the visitor should do next. Website design is not just about appearance. Website development has to support SEO, speed, mobile usability, lead generation, and conversion.'] },
      { heading: 'Local SEO Should Be Built From the Beginning', body: ['If your business serves a local market, local SEO should not be added later. It should influence how the website is built from the beginning.', 'Your homepage, service pages, title tags, meta descriptions, headings, internal links, Google Business Profile, reviews, and location signals all work together. If those pieces are disconnected, your local visibility suffers.', 'A business trying to rank in Scottsdale, Phoenix, Tempe, Mesa, Chandler, Glendale, or any other service area needs more than a generic website. It needs location-aware content, service-specific pages, accurate contact information, and a clean site structure that helps search engines understand what the business does and where it operates.'] },
      { heading: 'Business Banking and Credit Readiness Matter Earlier Than Most Owners Think', body: ['Business credit and funding readiness start long before a business applies for money.', 'Banks and lenders look for consistency, legitimacy, documentation, revenue, business identity, and risk signals. A professional website, business email, clean banking, proper records, and consistent business listings can all support credibility.', 'If you wait until you need funding to clean up your business foundation, you are already late. Strong businesses prepare early so they have more options when growth requires capital.'] },
      { heading: 'The Right Business Setup Creates a Cleaner Growth Path', body: ['A properly built business foundation should include entity setup, EIN registration, business banking, professional email, domain setup, website creation, local SEO structure, Google Business Profile optimization when applicable, bookkeeping direction, compliance organization, and a basic marketing plan.', 'That does not mean every business needs a massive launch budget. It means the essentials need to be handled correctly.', 'The businesses that grow faster are usually not the ones with the flashiest logo. They are the ones with cleaner structure, better visibility, stronger trust signals, and fewer operational gaps.'] },
      { heading: 'Final Takeaway', body: ['Starting a business the right way is not about checking random boxes. It is about building a serious foundation that supports trust, search visibility, funding readiness, and lead generation.', 'If your business is new or early-stage, do not build it like a side project. Build it like something you expect to grow.'] }
    ]
  },
  'why-websites-fail': {
    title: 'Why Most Business Websites Fail',
    category: 'Website Design',
    date: 'January 12, 2024',
    description: 'Most business websites fail because they are built around looks instead of strategy, SEO, conversion, local search intent, and clear website development structure.',
    keywords: 'why websites fail, website design strategy, website development, website creation, small business website design, local SEO website design, conversion focused website, Scottsdale website design, Phoenix website developer',
    content: [
      { heading: 'A Website Can Look Good and Still Be Useless', body: ['This is the part most business owners need to hear clearly: a pretty website is not automatically a good website.', 'A website can have nice colors, clean photos, animations, and modern sections while still failing to generate calls, form submissions, quote requests, or booked appointments.', 'Most websites fail because they are designed before the strategy is clear. The business chooses visuals before answering the questions that matter: who is this for, what problem does it solve, why should someone trust this company, and what action should the visitor take next?'] },
      { heading: 'Weak Website Positioning Kills Conversion', body: ['The first job of a business website is to make the value obvious. If the visitor lands on the homepage and cannot quickly understand what you do, who you help, and why you are credible, the site is already losing.', 'Generic phrases like "quality service," "experienced team," "we care about our customers," and "solutions for your needs" are not enough. Every competitor says the same thing.', 'Strong website copy needs sharper positioning. A local service business, medical aesthetics brand, contractor, consultant, restaurant, or professional service firm should all have messaging that speaks directly to the customer\'s decision process.'] },
      { heading: 'Most Websites Are Not Built for Local SEO', body: ['A lot of businesses hire someone to build a website, then later wonder why the site does not rank. The reason is simple: SEO was not built into the structure.', 'Website development and local SEO have to work together. The site should include proper page titles, meta descriptions, heading structure, service-specific pages, location relevance, internal links, fast load performance, mobile-friendly layouts, and clear content that matches how customers search.', 'If a business wants to rank for searches like website design Scottsdale, Phoenix website development, local SEO services, notary services near me, business credit help, or personal credit repair, the website needs pages that are built around those search intents.'] },
      { heading: 'One Generic Services Page Is Usually Not Enough', body: ['Many business websites make the same mistake: they put every service on one broad services page and expect Google to understand everything.', 'That is weak structure. If a business offers website design, SEO, social media management, reputation management, business credit, business setup, and notary services, each core service should have its own focused page.', 'Dedicated service pages give search engines more context and give visitors a better experience. A person searching for website creation does not want to dig through unrelated services. They want a clear page that speaks directly to website design, website development, pricing expectations, process, proof, and next steps.'] },
      { heading: 'Bad Mobile Experience Is a Silent Lead Killer', body: ['Most local service searches happen on phones. If the mobile version of the site feels cramped, slow, hard to read, or difficult to navigate, leads disappear quietly.', 'The user should not have to pinch, zoom, hunt for the phone number, or scroll through clutter to understand the offer.', 'Good mobile website design is clean, fast, readable, and direct. The headline should be clear. The call to action should be easy to find. The form should be simple. The pages should load quickly.'] },
      { heading: 'The Website Needs a Real Conversion Path', body: ['A business website should guide visitors toward action. That does not mean screaming "Buy Now" on every section. It means removing confusion.', 'A strong conversion path includes a clear hero section, service explanation, proof, case studies, reviews, trust signals, FAQs, contact options, and a call to action that fits the buyer\'s stage.', 'If the visitor does not know what to do next, the website failed. If the visitor does not trust the business enough to take action, the website failed. If the website gets traffic but no leads, the website is not doing its job.'] },
      { heading: 'Final Takeaway', body: ['Most business websites fail because they are treated like digital brochures instead of growth assets.', 'A better website needs strategy, SEO, structure, design discipline, and conversion planning from the beginning.', 'If your website does not help people find you, trust you, and contact you, it is not a business asset. It is just an online placeholder.'] }
    ]
  },
  'local-seo-is-not-optional': {
    title: 'Local SEO Is Not Optional Anymore',
    category: 'SEO',
    date: 'January 10, 2024',
    description: 'Local SEO helps businesses show up when nearby customers search for website design, service providers, business support, professional services, and local solutions.',
    keywords: 'local SEO, local SEO strategy, Google Business Profile optimization, local SEO for small business, website design local SEO, Scottsdale SEO, Phoenix SEO, local service pages, website development SEO',
    content: [
      { heading: 'Local SEO Is Where High-Intent Customers Are Already Looking', body: ['Local SEO matters because it puts your business in front of people who are already searching for what you offer.', 'That is a completely different type of attention than social media scrolling. Someone searching for a website designer near me, local SEO company, notary services near me, business setup help, or credit repair services is showing intent.', 'If your business does not appear in those moments, the opportunity goes to a competitor.'] },
      { heading: 'Your Website and Google Business Profile Have to Work Together', body: ['For local businesses, the website and Google Business Profile should not feel disconnected.', 'Your website should clearly support the services listed on your Google profile. Your Google profile should link to a website that reinforces your credibility, explains your services, and makes it easy to contact you.', 'When these two assets work together, they create stronger trust for both customers and search engines.'] },
      { heading: 'Local SEO Starts With Website Structure', body: ['Local SEO is not just adding a city name to a page. That is lazy and it usually reads badly.', 'A better local SEO website structure includes service-specific pages, clear headings, local relevance, internal links, FAQs, schema where appropriate, testimonials, portfolio examples, and consistent business information.', 'For example, a business that wants to rank for website design in Scottsdale or website development in Phoenix should not rely on one vague homepage. It should have focused content that explains website design services, development process, SEO strategy, conversion goals, and the type of businesses served.'] },
      { heading: 'Service Pages Build Local Search Relevance', body: ['Dedicated service pages help Google understand what your business offers. They also help customers land on the most relevant page.', 'A person searching for reputation management should not have to land on a generic digital marketing page and guess whether you offer it. A person searching for website creation should not have to sort through business credit information.', 'Strong local SEO separates important services into their own pages, then connects them through internal links so the entire website becomes easier to understand.'] },
      { heading: 'Reviews Are Not Optional Trust Signals', body: ['Reviews influence how people judge your business before they ever contact you.', 'A business with a strong review profile has an advantage. A business with weak reviews, outdated reviews, or no review process is making the decision easier for competitors.', 'Local SEO is not only about ranking. It is about getting chosen after people find you. Reviews, responses, case studies, and proof all affect that decision.'] },
      { heading: 'Final Takeaway', body: ['Local SEO is no longer optional for businesses that depend on search visibility, calls, appointments, or quote requests.', 'A strong local SEO system combines website structure, service pages, Google Business Profile optimization, reviews, consistent information, and conversion-focused content.', 'If your competitors are showing up before you, they are not just ranking higher. They are taking the opportunities you should be competing for.'] }
    ]
  },
  'what-drives-business-growth-online': {
    title: 'What Actually Drives Business Growth Online',
    category: 'Digital Marketing',
    date: 'January 8, 2024',
    description: 'Online business growth comes from website design, local SEO, conversion strategy, reputation, lead follow-up, and a digital system built to turn visibility into revenue.',
    keywords: 'business growth online, website design for business growth, digital marketing strategy, local SEO strategy, lead generation website, website conversion, online visibility, website development for small business',
    content: [
      { heading: 'Traffic Alone Does Not Grow a Business', body: ['A lot of businesses think they need more traffic. Sometimes they do. But more traffic will not fix a weak website, unclear messaging, poor reviews, bad follow-up, or no conversion strategy.', 'If your website does not explain your value clearly, more visitors only expose the weakness faster.', 'Online growth requires a system. Visibility gets people to the business. Positioning makes them care. Trust makes them believe. Conversion gets them to act. Follow-up turns the lead into revenue.'] },
      { heading: 'Your Website Is the Center of the Growth System', body: ['Your website should not sit off to the side like an online brochure. It should be the center of your digital growth system.', 'SEO, Google Business Profile traffic, social media, paid ads, referrals, email, and reputation management often lead people back to the website. If the site is weak, every channel performs worse.', 'A strong business website should clearly explain the offer, support local SEO, load quickly, work well on mobile, answer common objections, and make the next step obvious.'] },
      { heading: 'Visibility Gets Attention, But Positioning Converts It', body: ['Visibility matters. A business needs to show up on Google, maps, social platforms, directories, and search results where customers are looking.', 'But visibility without positioning is not enough.', 'When someone lands on your site, they need to quickly understand why your business is the right choice. That comes from sharper messaging, specific service pages, clear proof, strong calls to action, and a website experience that feels credible.'] },
      { heading: 'Local SEO Creates Compounding Value', body: ['Paid ads can generate traffic, but the moment you stop paying, the traffic often stops.', 'Local SEO can build compounding visibility over time when done correctly. That means better service pages, better Google Business Profile signals, better content, better internal linking, stronger reviews, and clearer location relevance.', 'For local businesses, ranking for the right service and location searches can create consistent inbound opportunities without relying only on paid traffic.'] },
      { heading: 'Follow-Up Is Where Many Businesses Lose the Money', body: ['Lead generation is only valuable if the business follows up correctly.', 'If a website form comes in and nobody responds quickly, the lead goes cold. If the first response is weak, the trust drops. If there is no process, leads fall through the cracks.', 'A serious growth system needs simple lead handling: fast response, clear next step, reminders, organized pipeline tracking, and a sales conversation that diagnoses the customer\'s actual need.'] },
      { heading: 'Final Takeaway', body: ['Online growth is not one tactic. It is not just a website, SEO, ads, social media, or reviews.', 'Growth happens when the entire digital presence works together to attract the right people, build trust, and convert interest into revenue.', 'If your business has traffic but no leads, leads but no sales, or a website that looks fine but does not produce, the system is broken somewhere. Fix the system.'] }
    ]
  },
  'how-much-does-website-design-cost-scottsdale': {
    title: 'How Much Does Website Design Cost in Scottsdale?',
    category: 'Website Design',
    date: 'February 5, 2024',
    description: 'An honest breakdown of website design costs in Scottsdale, AZ — what drives pricing, what you get at different price points, and what to watch out for.',
    keywords: 'website design cost Scottsdale, how much does a website cost Scottsdale AZ, website design pricing Scottsdale, web design cost Arizona, website development cost Scottsdale',
    content: [
      { heading: 'The Real Range of Website Design Pricing in Scottsdale', body: ['If you search for website design in Scottsdale, you will find quotes ranging from a few hundred dollars to tens of thousands. That range is real, and the difference in what you get is equally significant.', 'There are roughly four tiers of website design in the Scottsdale market: DIY platforms like Wix or Squarespace ($10–$50 per month), cheap freelance builds ($500–$2,000), mid-range professional builds ($2,500–$8,000), and full-service agency builds ($8,000–$30,000+). Each tier has its place, but only some of them make sense for a Scottsdale business trying to compete seriously online.'] },
      { heading: 'What DIY Website Builders Actually Cost Your Business', body: ['DIY platforms feel affordable because the subscription price is low. But the real cost of a DIY website is in performance — slow load times, limited SEO control, generic appearance, and templates used by thousands of other businesses.', 'For a Scottsdale business competing in a market where first impressions drive decisions, a DIY site often communicates the wrong things about the quality of your service. The monthly platform cost is low. The opportunity cost of looking unprofessional is much higher.'] },
      { heading: 'What a $2,500–$8,000 Professional Website Includes', body: ['This is the range where most serious small and mid-sized Scottsdale businesses should be investing for a first professional website. At this price point you should expect: custom or significantly customized design, SEO-structured page architecture, professional copywriting or copy guidance, mobile-first development, fast load performance, Google Analytics setup, and a meaningful number of service pages.', 'What you are paying for at this tier is not just the visual design. You are paying for strategy — understanding who the website is for, what they need to see, and how to move them from visitor to inquiry.'] },
      { heading: 'What the Higher End Gets You', body: ['Above $8,000 in Scottsdale website design, you are typically getting larger scope, more pages, custom functionality, e-commerce, complex integrations, or a full brand and content strategy package included.', 'For a Scottsdale business with a large service offering, multiple locations, an online store, or a complex buyer journey, this investment can be justified. For a focused local service business, it often is not necessary.'] },
      { heading: 'Questions to Ask Before Hiring Any Scottsdale Web Designer', body: ['Before hiring any website designer or agency in Scottsdale, ask these questions: Does the price include copywriting or just design? Is SEO architecture built into the site structure or bolted on after? Who owns the website files when the project is complete? What does ongoing support look like? How do you measure whether the site is performing after launch?', 'The answers will reveal a lot about whether the firm is building a marketing asset or just a visual product.'] },
      { heading: 'The Cheapest Scottsdale Website Often Costs the Most Over Time', body: ['A $900 website built by an inexperienced freelancer with no SEO strategy can end up costing far more than a $5,000 professional build when you factor in the redesign you will need in 18 months, the SEO work required to fix a broken structure, and the leads you lost while operating a site that was not performing.', 'Website design in Scottsdale is not just a purchase. It is an investment in a business asset. Treat the pricing decision accordingly.'] }
    ]
  },
  'how-to-rank-on-google-maps-phoenix': {
    title: 'How to Rank on Google Maps in Phoenix',
    category: 'Local SEO',
    date: 'February 12, 2024',
    description: 'A practical guide to ranking higher on Google Maps in Phoenix, AZ — covering Google Business Profile optimization, reviews, citations, and the local SEO signals that matter most.',
    keywords: 'rank on Google Maps Phoenix, Google Maps ranking Phoenix AZ, local SEO Phoenix, Google Business Profile Phoenix, how to show up on Google Maps Phoenix',
    content: [
      { heading: 'Why Google Maps Rankings Matter More Than You Think', body: ['When Phoenix residents search for a local business — a plumber, a restaurant, a dentist, a contractor, a gym — Google often shows a map with three local listings before the organic results. This is called the local pack, and it captures a significant share of the clicks for local service searches.', 'If your Phoenix business is not in that local pack for your most important keywords, you are invisible to a large portion of high-intent local buyers. They are not going to scroll past the map to find page two organic results. They are going to call one of the three businesses Google surfaces.'] },
      { heading: 'The Foundation: Your Google Business Profile', body: ['Your Google Business Profile is the most important single asset for Google Maps rankings in Phoenix. A fully optimized, actively managed GBP consistently outranks incomplete profiles — even if the incomplete profile has more years in business.', 'Full optimization means: correct primary and secondary categories, a keyword-rich business description, complete service listings, regular photo uploads, weekly or bi-weekly posts, all available attributes selected, and consistent business name, address, and phone number matching every other listing on the web.'] },
      { heading: 'Reviews Are a Ranking Signal, Not Just a Trust Signal', body: ['Reviews influence Google Maps rankings directly. Google\'s local ranking algorithm considers review count, review recency, response rate, and average star rating. A Phoenix business with 200 reviews and a 4.7 average will generally outrank a competitor with 20 reviews and a 4.3 average, all else being equal.', 'The most effective review strategy is systematic: ask every satisfied customer for a review at the moment they are most likely to respond — immediately after a positive service interaction. A simple text or email with a direct link to your Google review form converts at a much higher rate than a generic ask.'] },
      { heading: 'Citations and NAP Consistency', body: ['A local citation is any mention of your business name, address, and phone number on the web. Yelp, Facebook, Bing Places, Apple Maps, HomeAdvisor, Angi, the Better Business Bureau, and hundreds of niche and local directories all contribute to your citation profile.', 'Google cross-references these listings. If your business shows up with different phone numbers, different address formats, or different business names across directories, those inconsistencies create doubt about which information is accurate. Consistent NAP across all listings strengthens your local authority.'] },
      { heading: 'Your Website Has to Support Your Maps Rankings', body: ['Your website is a supporting signal for Google Maps rankings. A Phoenix business whose website clearly identifies its service area, services offered, and location consistently outranks businesses with generic websites that provide no local context.', 'Specific improvements: add your service area to page titles and meta descriptions, include your address in the website footer with schema markup, create location-specific service pages for the Phoenix neighborhoods you serve, and embed a Google Map on the contact page.'] },
      { heading: 'What Not to Do When Trying to Rank on Google Maps in Phoenix', body: ['Avoid buying fake reviews — Google detects and removes them, and the business can be penalized. Avoid using a P.O. box as a business address — Google requires a physical service location. Avoid keyword-stuffing your business name on the GBP — Google flags this as spam.', 'The legitimate path to Phoenix Maps rankings takes 60 to 120 days of consistent work. There are no shortcuts that hold up long-term.'] }
    ]
  },
  'best-seo-strategies-small-business-arizona': {
    title: 'The Best SEO Strategies for Small Businesses in Arizona',
    category: 'SEO',
    date: 'February 19, 2024',
    description: 'Practical SEO strategies for Arizona small businesses — covering local SEO, on-page optimization, content, Google Business Profile, and the approach that gets real results.',
    keywords: 'SEO strategies small business Arizona, small business SEO Arizona, local SEO small business AZ, SEO tips Arizona business, how to rank on Google Arizona',
    content: [
      { heading: 'Arizona Small Businesses Have a Real SEO Opportunity Right Now', body: ['Most Arizona small businesses are not doing SEO well. That sounds harsh, but it means there is a genuine opportunity for the businesses that take it seriously. In markets like Scottsdale, Phoenix, Tempe, Chandler, and Gilbert, there are competitive categories where a focused local SEO effort can move a small business into the top search positions within six to twelve months.', 'The following strategies are not theoretical. They reflect what actually drives search rankings for small businesses in Arizona markets.'] },
      { heading: 'Strategy 1: Build Service-Specific Pages', body: ['One of the most impactful things an Arizona small business can do for SEO is create individual pages for each core service. A business that offers website design, SEO, and digital marketing should not lump all three onto a single services page.', 'Google ranks pages, not entire websites. A dedicated page for "website design Scottsdale" can rank for that specific search even if the overall website is modest. A page for "local SEO Phoenix" can rank independently. Service-specific pages create more opportunities to rank for more searches.'] },
      { heading: 'Strategy 2: Optimize for the Local Pack, Not Just Organic', body: ['For service businesses in Arizona, the Google local pack (the map and three listings) is often more valuable than organic results. Local pack optimization requires a fully built out Google Business Profile, consistent citations across directories, active review generation, and location-relevant website content.', 'Small businesses often overlook citation building because it seems tedious. But consistent listings on Yelp, Bing Places, Apple Maps, Facebook, HomeAdvisor, and industry-specific directories send strong local signals to Google.'] },
      { heading: 'Strategy 3: Create Content That Matches Real Search Intent', body: ['Blogging for the sake of blogging rarely moves SEO results. Content works when it directly matches what potential Arizona customers are searching for.', 'The most effective small business content strategy in Arizona starts with keyword research: What questions are local customers asking? What problems are they researching? What comparisons are they making before they hire someone? Build content that answers those specific questions clearly and thoroughly, and Google will reward it with rankings.'] },
      { heading: 'Strategy 4: Get Your Technical Foundation Right', body: ['Technical SEO problems can prevent good content from ranking at all. Common small business technical SEO issues include missing title tags, no meta descriptions, slow page speed, broken links, no sitemap, and no schema markup.', 'An Arizona small business does not need a technically perfect website. But it needs a technically adequate one: fast enough, crawlable, properly tagged, and structured in a way Google can understand.'] },
      { heading: 'Strategy 5: Build Local Links and Mentions', body: ['Links from other reputable websites tell Google your business has authority. For Arizona small businesses, the most accessible links come from local sources: Scottsdale or Phoenix business associations, local media coverage, guest posts on Arizona-relevant publications, partnerships with complementary local businesses, and charity or community sponsorships that include website mentions.', 'A small number of relevant, locally authoritative links can significantly outperform hundreds of low-quality links from irrelevant directories.'] }
    ]
  },
  'why-google-business-profile-not-ranking': {
    title: 'Why Your Google Business Profile Is Not Ranking in Phoenix or Scottsdale',
    category: 'Local SEO',
    date: 'February 26, 2024',
    description: 'The most common reasons a Google Business Profile is not ranking in the local pack for Phoenix and Scottsdale area searches — and exactly what to do about each one.',
    keywords: 'Google Business Profile not ranking, GBP not showing up Phoenix, Google Maps ranking Scottsdale, why is my business not on Google Maps, local pack ranking problems Arizona',
    content: [
      { heading: 'If Your GBP Is Not Showing Up, There Is Usually a Clear Reason', body: ['Many Phoenix and Scottsdale business owners have claimed and set up a Google Business Profile only to find it does not appear in local pack results for their most important searches. The frustration is real, and the good news is that in most cases the reasons are identifiable and fixable.', 'Google\'s local ranking algorithm considers three primary factors: relevance (how well the profile matches the search), distance (how close the business is to the searcher), and prominence (how well-established the business appears to be online). Weaknesses in any of these three areas can suppress rankings.'] },
      { heading: 'Reason 1: Incomplete or Poorly Configured Profile', body: ['The most common reason a GBP does not rank is that it is incomplete. Missing categories, empty service descriptions, no photos, no business hours, or sparse business information all signal a low-quality profile to Google.', 'The fix: complete every section of the profile. Select a highly specific primary category that matches your core service. Add every relevant secondary category. Write a detailed, keyword-relevant business description. List all services with descriptions. Add photos of the business, team, and work. Ensure hours are accurate and current.'] },
      { heading: 'Reason 2: Inconsistent Business Information', body: ['Google verifies business information by cross-referencing the GBP with other sources on the web — Yelp, Bing, Facebook, Apple Maps, Better Business Bureau, and industry directories. If the business name, address, or phone number appears differently across these sources, it creates doubt about which information is accurate.', 'The fix: audit your business information across the top local directories. Find every listing where the name, address, or phone is different from your Google profile and correct it. Consistency across all platforms is a direct local ranking signal.'] },
      { heading: 'Reason 3: Not Enough Reviews or Too Low a Rating', body: ['Review volume and rating directly influence local pack rankings. A profile with 10 reviews and a 4.0 rating competing against profiles with 100+ reviews and 4.7+ ratings is at a significant disadvantage for competitive searches.', 'The fix: implement a systematic review request process. Ask every satisfied customer immediately after service. Make it easy — a direct link to the Google review form via text or email removes friction. Respond to every review, positive and negative. Consistent new reviews and a high response rate both support rankings.'] },
      { heading: 'Reason 4: Your Website Does Not Support Local Relevance', body: ['Google looks at the website linked to a GBP as a supporting signal. If the website is generic, slow, has no local content, or does not clearly describe the services listed on the profile, it weakens the overall local relevance signal.', 'The fix: ensure the website clearly identifies the service area, includes location-specific content, loads quickly, and is mobile-optimized. Add LocalBusiness schema markup to the website. Embed a Google Map on the contact page. Create service pages that match the categories listed on the GBP.'] },
      { heading: 'Reason 5: Competitive Keyword and Distance Dynamics', body: ['Some searches are simply more competitive than others. Ranking in the Phoenix or Scottsdale local pack for "attorney Phoenix" is harder than ranking for "estate planning attorney Scottsdale AZ." If you are targeting the most competitive version of your keyword, ranking will take longer and require more sustained effort.', 'The fix: focus initial efforts on longer-tail, more specific keyword variations where competition is lower. Build authority there first, then compete for broader terms as the profile strengthens.'] }
    ]
  },
  'website-vs-landing-page-lead-generation': {
    title: 'Website vs. Landing Page: What Your Arizona Business Actually Needs for Lead Generation',
    category: 'Website Design',
    date: 'March 4, 2024',
    description: 'The difference between a full website and a landing page for lead generation — which one Arizona businesses need based on their marketing strategy and customer journey.',
    keywords: 'website vs landing page, landing page lead generation Arizona, small business website or landing page, website design Arizona lead generation, Scottsdale Phoenix website conversion',
    content: [
      { heading: 'The Question Most Arizona Business Owners Get Wrong', body: ['Many Arizona small business owners start their digital presence with either a full multi-page website or a single landing page — often without a clear strategy for why they chose one over the other.', 'The answer to which one your Arizona business needs depends entirely on your marketing strategy, traffic source, and where customers are in their buying journey when they find you.'] },
      { heading: 'What a Landing Page Is and When It Works', body: ['A landing page is a single page designed for one specific purpose: converting a visitor from a specific campaign into a lead. No navigation menu. No distractions. Just a clear headline, a specific offer, and a call to action.', 'Landing pages work best when paired with paid traffic — Google Ads, Meta Ads, or email campaigns — where you control what the visitor sees immediately before they arrive. A Phoenix contractor running a Google Ad for "emergency roof repair" should send that traffic to a landing page specifically about emergency roof repair, not a homepage with ten other services.'] },
      { heading: 'What a Full Website Does That a Landing Page Cannot', body: ['A full website with multiple pages does things a landing page cannot. It builds organic search authority through multiple pages targeting different keywords. It establishes overall brand credibility through the about page, portfolio, testimonials, and case studies. It captures visitors at every stage of the buying journey — those ready to contact you today and those who are still researching.', 'For SEO, a multi-page website is essential. A landing page does not rank organically because it has almost no content and no internal link structure. If you want Phoenix or Scottsdale customers to find you through search without paying for every click, you need a real website.'] },
      { heading: 'The Right Answer for Most Arizona Small Businesses', body: ['Most Arizona small businesses should have a professional multi-page website as their primary web presence — this is what gets found in search, establishes overall credibility, and serves the full range of customer needs.', 'Landing pages are a supplement for specific paid campaigns, not a replacement for a website. If you are running Google Ads in Phoenix, a targeted landing page for that campaign will convert better than sending ad traffic to a homepage. But that landing page does not replace the need for a full website.'] },
      { heading: 'What to Prioritize When Building Your Arizona Web Presence', body: ['If you are starting from zero, build the website first. Focus on a homepage that clearly communicates your value, individual pages for each core service, an about page that builds trust, a contact page with multiple contact options, and a local SEO structure that helps Google understand your service area.', 'Once the website is in place and organic traffic begins to grow, add landing pages for specific paid campaigns to maximize conversion on that traffic. The website builds what you own permanently. Landing pages optimize the traffic you are actively buying.'] }
    ]
  },
  'how-to-get-more-reviews-for-your-business': {
    title: 'How to Get More Reviews for Your Arizona Business',
    category: 'Reputation Management',
    date: 'March 11, 2024',
    description: 'Practical strategies for Arizona businesses to consistently generate five-star Google reviews, handle negative feedback, and build a review profile that earns customer trust.',
    keywords: 'how to get more Google reviews, get more business reviews Arizona, Google review strategy Scottsdale Phoenix, reputation management reviews Arizona, review generation business',
    content: [
      { heading: 'Reviews Are the Most Trusted Marketing Your Arizona Business Has', body: ['Advertising tells customers you are good. Reviews prove it. Ninety-three percent of consumers say online reviews influence their purchase decisions, and local customers in Phoenix and Scottsdale rely heavily on Google reviews when choosing between competing businesses.', 'Beyond trust, reviews directly influence your Google Maps rankings. Review volume, recency, and response rate are all signals Google uses to determine which businesses show up in the local pack. More reviews from real customers consistently translates to better local visibility.'] },
      { heading: 'The Single Biggest Mistake Arizona Businesses Make With Reviews', body: ['The most common mistake is asking for reviews once, getting a few, and then letting the process stop. Review velocity matters. A business with 50 reviews all posted in one month and no reviews since then does not look as authoritative as a business with 150 reviews spread consistently over the past two years.', 'Google\'s algorithm weights recency. A profile with consistent new reviews signals an active, engaged business. A profile with stale reviews signals a business that has stopped caring or stopped growing.'] },
      { heading: 'The Review Request System That Actually Works', body: ['The most effective review generation system is simple: ask at the right moment with a direct link. The right moment is immediately after the customer has had a positive experience — after a service call, after project completion, after a follow-up that confirmed they were satisfied.', 'A text message with a direct Google review link converts at a much higher rate than a generic email newsletter or a sign on your counter asking for reviews. Make it frictionless. One tap should get them to the review form.'] },
      { heading: 'How to Handle Negative Reviews Without Making Things Worse', body: ['Negative reviews are inevitable for any active business. How you respond to them matters as much as the reviews themselves — potential customers read the responses carefully.', 'Respond to every negative review promptly, professionally, and without being defensive. Acknowledge the experience, explain what happened if appropriate, and offer to make it right. A business that handles criticism gracefully and transparently actually builds more trust with prospective customers than a business with only five-star reviews and no negatives.'] },
      { heading: 'Review Platforms Beyond Google That Matter for Arizona Businesses', body: ['Google is the most important review platform for local search rankings, but it is not the only one that influences customer decisions. Yelp drives significant traffic for restaurants, home services, and personal services in the Phoenix and Scottsdale market. Facebook reviews matter for businesses with active social media audiences. Industry-specific platforms like Houzz for contractors, Healthgrades for medical, or Avvo for legal professionals can be equally influential within their categories.', 'A complete Arizona business reputation strategy covers Google, Yelp, Facebook, and at least one or two industry-relevant platforms — with active review generation and response management on all of them.'] }
    ]
  },
  'what-is-local-seo-and-why-it-matters': {
    title: 'What Is Local SEO and Why It Matters for Arizona Businesses',
    category: 'Local SEO',
    date: 'March 18, 2024',
    description: 'A clear explanation of local SEO for Arizona business owners — what it is, how it works, and why it matters more than generic SEO for businesses serving local customers.',
    keywords: 'what is local SEO, local SEO explained, local SEO Arizona, local SEO Scottsdale Phoenix, how local SEO works, local search optimization Arizona',
    content: [
      { heading: 'Local SEO Is How Customers in Your Area Find Your Business', body: ['Local SEO is the practice of optimizing your online presence so that your business appears prominently when nearby customers search for your service. When someone in Scottsdale searches "plumber near me" or "best dentist Scottsdale AZ," they are performing a local search. Local SEO determines whether your business shows up in those results and where.', 'Unlike traditional SEO, which can target audiences anywhere, local SEO focuses on geographic relevance. The goal is to make your business the most visible option for customers searching within your service area.'] },
      { heading: 'The Three Components of Local Search', body: ['Local search results in Google typically have three components. The first is the Google local pack — the map and three business listings that appear at the top of results for local service searches. The second is organic results — the traditional blue link web results. The third is Google Business Profile features — photos, reviews, and business information that appear in the right sidebar when someone searches a specific business name.', 'A complete local SEO strategy addresses all three components because each captures a different type of searcher and a different stage of the buying journey.'] },
      { heading: 'What Google Uses to Rank Local Businesses', body: ['Google\'s local ranking algorithm evaluates businesses on three primary factors. Relevance is how closely the business matches the search intent — determined by business categories, service listings, website content, and keywords. Distance is how close the business is to the searcher. Prominence is how well-established the business is online — determined by review volume and quality, citation consistency, website authority, and the overall quality of the digital presence.', 'Improving local SEO means improving on all three factors, not just one.'] },
      { heading: 'Why Local SEO Matters More Than General SEO for Service Businesses', body: ['For a business that serves customers in a specific geographic area — Scottsdale, Phoenix, Tempe, Chandler, or any Arizona market — local SEO is more directly tied to revenue than general SEO. A Scottsdale HVAC company does not benefit from ranking nationally for "air conditioning repair." It benefits from ranking in Scottsdale and the surrounding Phoenix metro area.', 'Local SEO connects your business to high-intent searches from people who are physically in your service area and ready to take action. The conversion rate from local search traffic is significantly higher than from general organic traffic.'] },
      { heading: 'How Long Does Local SEO Take to Show Results?', body: ['Local SEO results depend on the competitiveness of the keyword and market, the current state of the business\'s online presence, and the consistency of the optimization effort. Basic GBP optimization can show improved visibility within 30 to 60 days. More competitive keywords in densely served Arizona markets like Phoenix and Scottsdale typically require three to six months of sustained work before significant ranking movement occurs.', 'The effort compounds. A business that invests in local SEO consistently for 12 months typically has a significantly stronger local search presence than it could achieve in three. The businesses that win local search in Arizona are the ones that started sooner and stayed consistent.'] }
    ]
  },
  'how-to-build-business-credit-from-scratch': {
    title: 'How to Build Business Credit From Scratch in Arizona',
    category: 'Business Credit',
    date: 'March 25, 2024',
    description: 'A step-by-step guide to building business credit in Arizona — from LLC formation and EIN registration to tradelines, business banking, and accessing real capital.',
    keywords: 'how to build business credit Arizona, build business credit from scratch, business credit building Arizona, business credit Scottsdale Phoenix, start building business credit',
    content: [
      { heading: 'Business Credit Does Not Build Itself', body: ['Many Arizona business owners assume that having a business automatically means building business credit. It does not. A sole proprietorship with no EIN, no business bank account, and no vendor accounts is not building any business credit profile at all — regardless of how long it has been operating.', 'Building business credit requires intentional steps, done in the right order. Most business owners who struggle to access funding do so because they skipped several foundational steps years earlier without realizing it.'] },
      { heading: 'Step 1: Get Your Business Structure Right', body: ['Business credit starts with a properly structured business entity. A sole proprietorship is the owner — there is no separate business identity for credit purposes. An LLC or corporation, properly filed with the state and paired with a federal EIN, creates a separate legal entity that can begin building its own credit profile.', 'For Arizona businesses, this means filing your LLC with the Arizona Corporation Commission, obtaining a federal EIN from the IRS, setting up a dedicated business address (not a P.O. box), and opening a business bank account that is completely separate from personal finances.'] },
      { heading: 'Step 2: Establish Your Business Identity Online', body: ['Before lenders and vendors will extend credit to your business, they want to see that it is legitimate. A consistent, professional business presence across the web is part of what signals legitimacy.', 'This includes a professional website, a fully completed Google Business Profile, consistent business listings across major directories, a dedicated business phone number, and a professional business email address using your domain. These elements seem basic, but they directly influence how lenders and vendors evaluate your business.'] },
      { heading: 'Step 3: Get Your DUNS Number and Establish the Profile', body: ['Dun and Bradstreet is one of the three major business credit bureaus. Your DUNS number is a unique identifier for your business in their system. Many vendors and lenders check your D&B profile as part of extending credit.', 'Establishing your DUNS number is free. After that, the first accounts that report to D&B are typically net-30 vendor accounts — suppliers who sell on terms and report payment history to the business credit bureaus. These are the foundation of your business credit history.'] },
      { heading: 'Step 4: Open Starter Accounts and Build History', body: ['The first business credit accounts are net-30 vendor accounts with suppliers who report to the business credit bureaus. Office supply companies, marketing services, and other vendors offer net-30 terms where you buy and pay within 30 days, and the payment history is reported.', 'After establishing several net-30 accounts and building a payment history, you become eligible for business credit cards that do not require a personal guarantee and business lines of credit. The key is sequencing — starter accounts first, then credit cards, then lines of credit.'] },
      { heading: 'How Long Does It Take to Build Business Credit in Arizona?', body: ['A realistic timeline for building a usable business credit profile in Arizona is 12 months with consistent effort. In the first three months, the foundation is established — entity, EIN, banking, D&B number, and starter accounts. By six months, payment history is building and additional accounts are accessible. By twelve months, the profile is strong enough to pursue meaningful business credit lines.', 'There are no legitimate shortcuts. Any service promising significant business credit in 30 days is either building personal-guarantee accounts or fabricating credit — neither of which creates the real, independently standing business credit that protects the owner and expands borrowing capacity.'] }
    ]
  },
  'digital-marketing-for-contractors-arizona': {
    title: 'Digital Marketing for Contractors in Arizona: What Actually Works',
    category: 'Digital Marketing',
    date: 'April 1, 2024',
    description: 'A practical guide to digital marketing for Arizona contractors — covering Google Maps, local SEO, paid search, websites, and reviews to generate consistent leads without depending on referrals.',
    keywords: 'digital marketing for contractors Arizona, contractor marketing Phoenix Scottsdale, SEO for contractors Arizona, contractor website design Arizona, Google Ads contractors Phoenix',
    content: [
      { heading: 'Arizona Contractors Are Sitting on a Massive Digital Opportunity', body: ['The Phoenix metro is one of the most active construction and home services markets in the country. Roofing, HVAC, plumbing, electrical, landscaping, general contracting, painting, flooring, and dozens of other trades are in high demand from a growing population across Scottsdale, Phoenix, Chandler, Mesa, Gilbert, Glendale, and Peoria.', 'Most of the contractors in this market are still building their business primarily through referrals and reputation — which works but does not scale. The contractors generating consistent high-volume leads are the ones who have invested in digital marketing that captures online searches, and the market is not saturated with them yet.'] },
      { heading: 'Your Google Business Profile Is Your Most Important Marketing Asset', body: ['For Arizona contractors, the Google local pack — the map and three business listings — is where the highest-intent leads come from. Homeowners searching "roofer near me" or "HVAC repair Scottsdale" are ready to call. The three businesses in that local pack get the overwhelming majority of those calls.', 'Fully optimizing your Google Business Profile with the right categories, a keyword-rich description, regular photos of completed projects, consistent reviews, and weekly posts takes less than a week of focused effort and can meaningfully improve local pack rankings within 30 to 60 days.'] },
      { heading: 'Your Website Has to Be Built for Lead Generation, Not Just Information', body: ['Many Arizona contractor websites exist as digital brochures — they list services and have a contact page, but they do not actively generate leads. A lead-generating contractor website is built differently: fast load time, mobile-optimized, individual service pages for each trade, location pages for the service area, clear calls to action above the fold, and a form that works on mobile.', 'The website should also be built for local SEO. Every service page should target the service and location together — "roof replacement Phoenix," "HVAC installation Scottsdale," "landscaping Chandler AZ." This structure allows the website to rank for searches far beyond just the business name.'] },
      { heading: 'Google Ads for Contractors: When It Makes Sense', body: ['Google Ads can generate immediate leads for Arizona contractors while organic SEO is building. For emergency services like HVAC repair, plumbing, or roofing after a storm, paid search is often the right channel because those searches happen urgently and the cost per lead can be justified by the job value.', 'The key is sending Google Ads traffic to a dedicated landing page, not a homepage. An Arizona homeowner searching "emergency roof repair Phoenix" who clicks a Google Ad should land on a page specifically about emergency roof repair — with a phone number large and visible, a fast-loading form, and no distractions.'] },
      { heading: 'Reviews Are the Contractor\'s Unfair Advantage', body: ['Arizona homeowners trust other homeowners. A roofing company with 200 five-star Google reviews showing real project photos wins business from a newer company with 15 reviews every time, even if the newer company is technically more skilled.', 'The review gap between established Arizona contractors and newer ones is closeable — but it requires a systematic approach. Ask every customer immediately after a completed project. Make it easy with a direct text link. Respond to every review. Post project photos to Google Business Profile. Do this consistently for 12 months and the review authority becomes a durable competitive advantage that is very hard for competitors to quickly close.'] }
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
        <section className="section bg-[#faf8f4] pt-32">
          <div className="container-clean max-w-3xl">
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-6">Not Found</p>
            <h1 className="text-5xl font-serif-display font-bold text-[#1a1a1a] mb-6">This Article Could Not Be Found</h1>
            <p className="text-lg text-neutral-600 mb-8">The article may have been moved or removed.</p>
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

      {/* ARTICLE HEADER — long-form magazine aesthetic */}
      <section className="bg-[#1a1a1a] pt-32 pb-16">
        <div className="container-clean max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em]">{post.category}</span>
              <span className="w-px h-4 bg-white/20" />
              <span className="text-white/40 text-xs">{post.date}</span>
            </div>

            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-serif-display font-bold text-white leading-[0.95] mb-8">
              {post.title}
            </h1>

            <p className="text-xl text-white/60 font-serif-body leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="bg-[#faf8f4] py-16 lg:py-24">
        <article className="container-clean max-w-3xl">
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {post.content.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-[#1a1a1a] mb-6 leading-tight border-l-4 border-[#7a1c1c] pl-6">
                  {section.heading}
                </h2>
                <div className="space-y-5 pl-6">
                  {section.body.map((paragraph, pi) => (
                    <p key={pi} className="text-lg text-neutral-700 font-serif-body leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Related links */}
          <div className="mt-16 grid gap-4 border-y-2 border-[#1a1a1a]/10 py-10 md:grid-cols-3">
            {[
              { to: '/website-design-and-seo', label: 'Website Design & SEO' },
              { to: '/digital-marketing', label: 'Digital Marketing' },
              { to: '/business-credit-and-funding', label: 'Business Credit & Funding' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group border border-neutral-200 bg-white p-5 hover:border-[#7a1c1c] transition-colors"
              >
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mb-2">Service</span>
                <span className="block font-semibold text-[#1a1a1a] group-hover:text-[#7a1c1c] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link to="/blogs" className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-0.5 hover:text-[#7a1c1c] hover:border-[#7a1c1c] transition-colors">
              ← Back to Insights
            </Link>
          </div>
        </article>
      </section>

      {/* CTA */}
      <section className="section bg-[#1a1a1a] text-white">
        <div className="container-clean text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-6">Build the System</p>
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold mb-6 leading-tight">
              Your Website Should Do More Than Sit Online.
            </h2>
            <p className="text-lg text-white/60 font-serif-body max-w-2xl mx-auto mb-10 leading-relaxed">
              RAH Operations builds websites, SEO structure, and digital systems designed to help serious businesses look credible, rank locally, and convert more leads.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/contact">Start a Project</Button>
              <Button to="/case-studies" variant="secondary">View Case Studies</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
