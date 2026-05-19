import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const BlogPage = () => {
  const posts = [
    {
      title: "How to Get More Google Reviews for Your Business Fast",
      displayTitle: "How to Get More Google Reviews for Your Business Fast (And Why It Matters in 2026)",
      date: "May 19, 2026",
      pubDate: "Tue, 19 May 2026 04:01:14 GMT",
      issue: 'No. 074',
      category: "Digital Marketing",
      excerpt: "Google reviews are one of the most powerful trust signals for local businesses in Arizona. If you are not actively collecting them, you are leaving revenue on the table. This guide breaks down exactly how to get more Google reviews fast and turn them into a competitive advantage.",
      slug: 'how-to-get-more-google-reviews-for-your-business-fast'
    },
    {
      title: "How to Optimize Your Google Business Profile to Rank Higher",
      displayTitle: "How to Optimize Your Google Business Profile to Rank Higher in Local Search",
      date: "May 19, 2026",
      pubDate: "Tue, 19 May 2026 00:02:32 GMT",
      issue: 'No. 073',
      category: "SEO",
      excerpt: "Your Google Business Profile is one of the most powerful free tools available for local businesses in Arizona. When optimized correctly, it can push your business to the top of Google Maps and local search results. Learn the exact steps to outrank your competition and drive more customers through your door.",
      slug: 'how-to-optimize-your-google-business-profile-to-rank-higher'
    },
    {
      title: "SEO for Beginners: Complete Guide for Small Business Owners",
      displayTitle: "SEO for Beginners: The Complete Guide Every Small Business Owner Needs",
      date: "May 18, 2026",
      pubDate: "Mon, 18 May 2026 20:01:51 GMT",
      issue: 'No. 072',
      category: "SEO",
      excerpt: "If you own a small business in Arizona and want more customers finding you online, SEO is the single most powerful tool in your arsenal. This complete beginner's guide breaks down exactly how search engine optimization works, what you need to prioritize first, and how to build a strategy that drives real results. No fluff, no jargon - just actionable steps you can start using today.",
      slug: 'seo-for-beginners-complete-guide-for-small-business-owners'
    },
    {
      title: "How to Get Your Business on the First Page of Google",
      displayTitle: "How to Get Your Business on the First Page of Google in 2026",
      date: "May 18, 2026",
      pubDate: "Mon, 18 May 2026 16:01:57 GMT",
      issue: 'No. 071',
      category: "SEO",
      excerpt: "Getting your business on the first page of Google is no longer optional - it is the difference between growing and getting left behind. In this guide, we break down the exact strategies local Arizona businesses use to dominate search results. From technical SEO to content and local optimization, RAH Operations has you covered.",
      slug: 'how-to-get-your-business-on-the-first-page-of-google'
    },
    {
      title: "What Is a Backlink and Why Does Your Website Need Them",
      displayTitle: "What Is a Backlink and Why Your Website Desperately Needs Them",
      date: "May 18, 2026",
      pubDate: "Mon, 18 May 2026 12:01:22 GMT",
      issue: 'No. 070',
      category: "SEO",
      excerpt: "Backlinks are one of the most powerful ranking factors in SEO, yet most small business owners in Arizona have no idea how they work or why they matter. Understanding backlinks is the first step toward building a website that actually gets found on Google. RAH Operations breaks it all down in plain language so you can take action today.",
      slug: 'what-is-a-backlink-and-why-does-your-website-need-them'
    },
    {
      title: "How to Write SEO Blog Posts That Actually Rank on Google",
      displayTitle: "How to Write SEO Blog Posts That Actually Rank on Google (Step-by-Step Guide)",
      date: "May 18, 2026",
      pubDate: "Mon, 18 May 2026 08:01:47 GMT",
      issue: 'No. 069',
      category: "SEO",
      excerpt: "Writing blog posts that actually rank on Google requires more than good grammar and a catchy headline. You need a strategic approach that combines keyword research, content structure, and on-page optimization. This guide breaks down exactly how to do it.",
      slug: 'how-to-write-seo-blog-posts-that-actually-rank-on-google'
    },
    {
      title: "How to Do Keyword Research for Your Small Business Free",
      displayTitle: "How to Do Keyword Research for Your Small Business for Free (And Actually Rank)",
      date: "May 18, 2026",
      pubDate: "Mon, 18 May 2026 04:01:31 GMT",
      issue: 'No. 068',
      category: "SEO",
      excerpt: "Keyword research does not have to cost you a dime to be effective. In this guide, RAH Operations walks Arizona small business owners through the exact free tools and strategies used to find keywords that drive real traffic and real customers. If you want to rank on Google without guessing, this is where you start.",
      slug: 'how-to-do-keyword-research-for-your-small-business-free'
    },
    {
      title: "On Page SEO Checklist for Small Business Websites 2026",
      displayTitle: "The Complete On Page SEO Checklist for Small Business Websites in 2026",
      date: "May 18, 2026",
      pubDate: "Mon, 18 May 2026 00:01:37 GMT",
      issue: 'No. 067',
      category: "SEO",
      excerpt: "If your small business website is not showing up on Google, your on page SEO is likely the problem. This complete checklist covers every critical element you need to optimize in 2026. Follow these steps or let the experts at RAH Operations handle it for you.",
      slug: 'on-page-seo-checklist-for-small-business-websites-2026'
    },
    {
      title: "How to Rank on Google Without Paying for Ads",
      displayTitle: "How to Rank on Google Without Paying for Ads: A Complete Organic SEO Guide",
      date: "May 17, 2026",
      pubDate: "Sun, 17 May 2026 20:02:01 GMT",
      issue: 'No. 066',
      category: "SEO",
      excerpt: "Ranking on Google without paying for ads is not only possible, it is the most sustainable way to grow your business online. Organic SEO builds long-term visibility that paid ads simply cannot replicate. In this guide, RAH Operations breaks down exactly how to do it.",
      slug: 'how-to-rank-on-google-without-paying-for-ads'
    },
    {
      title: "Local SEO Complete Guide for Small Business Owners 2026",
      displayTitle: "The Local SEO Complete Guide for Small Business Owners in 2026",
      date: "May 17, 2026",
      pubDate: "Sun, 17 May 2026 16:01:49 GMT",
      issue: 'No. 065',
      category: "SEO",
      excerpt: "Local SEO is the single most powerful tool a small business owner can use to attract nearby customers who are ready to buy. This complete guide breaks down every strategy you need to dominate local search results in 2026. From Google Business Profile optimization to citation building, RAH Operations covers it all.",
      slug: 'local-seo-complete-guide-for-small-business-owners-2026'
    },
    {
      title: "How Long Does SEO Take to Work? The Honest Answer",
      displayTitle: "How Long Does SEO Take to Work? The Honest Answer Every Business Owner Needs to Hear",
      date: "May 17, 2026",
      pubDate: "Sun, 17 May 2026 12:02:07 GMT",
      issue: 'No. 064',
      category: "SEO",
      excerpt: "If you have been asking how long does SEO take to work, you deserve a straight answer - not vague promises. SEO results depend on your competition, your website, and the strategy behind your campaign. Here is what Arizona business owners actually need to know before investing in search engine optimization.",
      slug: 'how-long-does-seo-take-to-work-honest-answer'
    },
    {
      title: "What Is SEO and How Does It Work for Small Businesses",
      displayTitle: "What Is SEO and How Does It Work for Small Businesses in Arizona",
      date: "May 17, 2026",
      pubDate: "Sun, 17 May 2026 08:01:48 GMT",
      issue: 'No. 063',
      category: "SEO",
      excerpt: "If you have ever wondered what SEO is and how it works for small businesses, you are not alone. Search engine optimization is one of the most powerful tools available to local Arizona companies looking to grow online. This guide breaks down exactly how SEO works and why it matters for your bottom line.",
      slug: 'what-is-seo-and-how-does-it-work-for-small-businesses'
    },
    {
      title: "Website SEO Checker Free Tool for Small Business Owners",
      displayTitle: "The Best Free Website SEO Checker Tools for Small Business Owners in 2026",
      date: "May 17, 2026",
      pubDate: "Sun, 17 May 2026 04:01:49 GMT",
      issue: 'No. 062',
      category: "SEO",
      excerpt: "Every small business owner deserves to know exactly how their website performs in search engines. Free website SEO checker tools give you instant insight into what is holding your site back from ranking on Google. Learn which tools actually work and how RAH Operations can help you take action on what you find.",
      slug: 'website-seo-checker-free-tool-for-small-business-owners'
    },
    {
      title: "Free Website Grader Tool: What Your Score Actually Means",
      displayTitle: "Free Website Grader Tool: What Your Score Actually Means (And What To Do About It)",
      date: "May 17, 2026",
      pubDate: "Sun, 17 May 2026 03:11:00 GMT",
      issue: 'No. 061',
      category: "SEO",
      excerpt: "Free website grader tools give you a number, but most business owners have no idea what that number actually means or what to do next. This guide breaks down every major metric these tools measure, explains what a good score looks like, and shows you exactly how to turn a low grade into real business growth.",
      slug: 'free-website-grader-tool-what-your-score-actually-means'
    },
    {
      title: "How to Improve Your Website SEO Score Without an Agency",
      displayTitle: "How to Improve Your Website SEO Score Without an Agency (And When to Call One)",
      date: "May 17, 2026",
      pubDate: "Sun, 17 May 2026 00:01:16 GMT",
      issue: 'No. 060',
      category: "SEO",
      excerpt: "Improving your website SEO score does not require a big budget or an agency contract. With the right strategy and consistent effort, Arizona business owners can make meaningful gains on their own. This guide breaks down exactly what to do and when it makes sense to bring in professional support.",
      slug: 'how-to-improve-your-website-seo-score-without-an-agency'
    },
    {
      title: "Technical SEO Audit: What It Is and Why It Matters",
      displayTitle: "Technical SEO Audit: What It Is, Why It Matters, and How to Get One Done Right",
      date: "May 16, 2026",
      pubDate: "Sat, 16 May 2026 20:01:31 GMT",
      issue: 'No. 059',
      category: "SEO",
      excerpt: "A technical SEO audit is the foundation of any serious search engine optimization strategy. Without it, you are guessing at why your site is not ranking. This guide breaks down exactly what a technical audit covers and why every Arizona business needs one.",
      slug: 'technical-seo-audit-what-it-is-and-why-it-matters'
    },
    {
      title: "How Often Should You Audit Your Small Business Website?",
      displayTitle: "How Often Should You Audit Your Small Business Website? A Complete Guide for Arizona Entrepreneurs",
      date: "May 16, 2026",
      pubDate: "Sat, 16 May 2026 16:02:06 GMT",
      issue: 'No. 058',
      category: "Website Design",
      excerpt: "If you are not auditing your small business website on a regular schedule, you are likely losing traffic, leads, and revenue without even knowing it. A website audit reveals broken links, outdated content, slow load times, and SEO gaps that quietly drain your results. This guide breaks down exactly how often you should audit your site and what to look for each time.",
      slug: 'how-often-should-you-audit-your-small-business-website'
    },
    {
      title: "Website Audit vs SEO Audit: What Is the Difference?",
      displayTitle: "Website Audit vs SEO Audit: What Is the Difference and Which One Do You Need?",
      date: "May 16, 2026",
      pubDate: "Sat, 16 May 2026 12:01:22 GMT",
      issue: 'No. 057',
      category: "SEO",
      excerpt: "Many Arizona business owners use the terms website audit and SEO audit interchangeably, but they are not the same thing. Understanding the difference can save you time, money, and missed opportunities online. This guide breaks down exactly what each audit covers and how to know which one your business needs right now.",
      slug: 'website-audit-vs-seo-audit-what-is-the-difference'
    },
    {
      title: "What Is an XML Sitemap and Does Your Website Need One?",
      displayTitle: "What Is an XML Sitemap and Does Your Website Need One? Here Is What Every Arizona Business Owner Should Know",
      date: "May 16, 2026",
      pubDate: "Sat, 16 May 2026 08:01:30 GMT",
      issue: 'No. 056',
      category: "SEO",
      excerpt: "If you have ever wondered what an XML sitemap is and whether your website actually needs one, you are not alone. Most Arizona business owners have heard the term but have no idea how it affects their Google rankings. In this guide, RAH Operations breaks it all down in plain language so you can make smarter decisions about your website.",
      slug: 'what-is-an-xml-sitemap-and-does-your-website-need-one'
    },
    {
      title: "What Is Schema Markup and Does Your Website Have It?",
      displayTitle: "What Is Schema Markup and Does Your Website Have It? Here Is What Arizona Business Owners Need to Know",
      date: "May 16, 2026",
      pubDate: "Sat, 16 May 2026 04:01:55 GMT",
      issue: 'No. 055',
      category: "SEO",
      excerpt: "Schema markup is one of the most overlooked SEO tools available to small business owners, yet it can dramatically improve how your website appears in Google search results. If you have never heard of it or are not sure whether your site uses it, you are not alone. This guide breaks down exactly what schema markup is, why it matters, and how to find out if your website is missing it.",
      slug: 'what-is-schema-markup-and-does-your-website-have-it'
    },
    {
      title: "How to Check Your Website Speed and Fix Slow Load Times",
      displayTitle: "How to Check Your Website Speed and Fix Slow Load Times (And Why It Matters for Your Arizona Business)",
      date: "May 16, 2026",
      pubDate: "Sat, 16 May 2026 00:01:18 GMT",
      issue: 'No. 054',
      category: "Website Design",
      excerpt: "A slow website is costing your Arizona business real money in lost traffic, lower Google rankings, and frustrated visitors who leave before your page even loads. In this guide, we break down exactly how to check your website speed and fix the issues dragging it down. Whether you are a local Scottsdale business or serving clients across Arizona, site speed is one of the highest-ROI improvements you can make right now.",
      slug: 'how-to-check-your-website-speed-and-fix-slow-load-times'
    },
    {
      title: "What Is an SSL Certificate and Why Your Website Needs It",
      displayTitle: "What Is an SSL Certificate and Why Your Website Needs It in 2026",
      date: "May 15, 2026",
      pubDate: "Fri, 15 May 2026 20:03:01 GMT",
      issue: 'No. 053',
      category: "Website Design",
      excerpt: "If you have ever wondered what an SSL certificate is and why your website needs it, you are not alone. SSL certificates are one of the most important foundational elements of a secure, trustworthy, and high-ranking website. In this guide, RAH Operations breaks down everything Arizona business owners need to know.",
      slug: 'what-is-ssl-certificate-and-why-your-website-needs-it'
    },
    {
      title: "How to Check If Your Website Is Mobile Friendly Free Tool",
      displayTitle: "How to Check If Your Website Is Mobile Friendly Using Free Tools (And What to Do Next)",
      date: "May 15, 2026",
      pubDate: "Fri, 15 May 2026 16:01:09 GMT",
      issue: 'No. 052',
      category: "Website Design",
      excerpt: "Not sure if your website passes the mobile test? Discover the best free tools to check mobile friendliness and learn what the results actually mean for your Google rankings. RAH Operations breaks it down so Arizona business owners can take action fast.",
      slug: 'how-to-check-if-your-website-is-mobile-friendly-free-tool'
    },
    {
      title: "Website Health Check: What Every Small Business Owner Needs",
      displayTitle: "Website Health Check: What Every Small Business Owner in Arizona Needs to Know",
      date: "May 15, 2026",
      pubDate: "Fri, 15 May 2026 12:01:05 GMT",
      issue: 'No. 051',
      category: "Website Design",
      excerpt: "Your website is your most important digital asset, but most small business owners have no idea if it is actually working for them. A website health check reveals hidden issues that cost you traffic, leads, and revenue. Learn what to look for and how to fix it fast.",
      slug: 'website-health-check-what-every-small-business-owner-needs'
    },
    {
      title: "How to Fix a Low Website SEO Score Fast in 2026",
      displayTitle: "How to Fix a Low Website SEO Score Fast: A Step-by-Step Guide",
      date: "May 15, 2026",
      pubDate: "Fri, 15 May 2026 08:01:37 GMT",
      issue: 'No. 050',
      category: "SEO",
      excerpt: "A low website SEO score is costing you traffic, leads, and revenue every single day. The good news is that many of the most damaging SEO issues can be identified and corrected quickly with the right approach. This guide walks you through exactly what to fix and how to do it fast.",
      slug: 'how-to-fix-a-low-website-seo-score-fast'
    },
    {
      title: "What Is a Good Website Audit Score and How to Improve It",
      displayTitle: "What Is a Good Website Audit Score and How to Improve It in 2026",
      date: "May 15, 2026",
      pubDate: "Fri, 15 May 2026 04:01:32 GMT",
      issue: 'No. 049',
      category: "SEO",
      excerpt: "A website audit score tells you exactly how healthy your site is and where you are losing rankings, traffic, and customers. Understanding what a good score looks like is the first step toward fixing the problems holding your business back. In this guide, RAH Operations breaks down audit scores, what they mean, and how to improve yours fast.",
      slug: 'what-is-a-good-website-audit-score-and-how-to-improve-it'
    },
    {
      title: "What Does a Free Website Audit Actually Check?",
      displayTitle: "What Does a Free Website Audit Actually Check? Here Is What You Should Expect",
      date: "May 15, 2026",
      pubDate: "Fri, 15 May 2026 01:58:06 GMT",
      issue: 'No. 048',
      category: "SEO",
      excerpt: "A free website audit sounds great, but most business owners have no idea what is actually being evaluated. RAH Operations explains every component a real audit covers, from technical SEO to page speed, so you can make informed decisions about your site. If your Arizona business is not ranking, this is where the answers start.",
      slug: 'what-does-a-free-website-audit-actually-check'
    },
    {
      title: "Website Audit for Med Spas: Attract More Clients Online",
      displayTitle: "The Complete Website Audit for Med Spas: How to Attract More Clients Online in 2026",
      date: "May 15, 2026",
      pubDate: "Fri, 15 May 2026 00:02:07 GMT",
      issue: 'No. 047',
      category: "SEO",
      excerpt: "If your med spa is not showing up on Google or converting visitors into booked appointments, your website may be the problem. A thorough website audit for med spas can uncover hidden issues that are costing you clients every single day. Learn what to look for and how to fix it fast.",
      slug: 'website-audit-for-med-spas-attract-more-clients-online'
    },
    {
      title: "Website Audit for Roofers: Get More Leads From Google",
      displayTitle: "Website Audit for Roofers: How to Get More Leads From Google in 2026",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 20:01:35 GMT",
      issue: 'No. 046',
      category: "SEO",
      excerpt: "Most roofing companies are losing leads every single day because of fixable website problems they do not even know exist. A professional website audit for roofers identifies exactly what is holding your site back from ranking on Google and converting visitors into paying customers. Learn what to look for and how to fix it fast.",
      slug: 'website-audit-for-roofers-get-more-leads-from-google'
    },
    {
      title: "Website Audit for HVAC Companies Local SEO Guide 2026",
      displayTitle: "Website Audit for HVAC Companies: The Complete Local SEO Guide",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 16:01:37 GMT",
      issue: 'No. 045',
      category: "SEO",
      excerpt: "If your HVAC company is not showing up when Arizona homeowners search for heating and cooling services, your website is likely the problem. A thorough website audit reveals the exact technical, content, and local SEO issues holding your rankings back. This guide walks you through every step so you can fix what matters and start generating more local leads.",
      slug: 'website-audit-for-hvac-companies-local-seo-guide-2026'
    },
    {
      title: "Website Audit for Plumbers: How to Rank Locally in 2026",
      displayTitle: "Website Audit for Plumbers: The Complete Guide to Dominating Local Search",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 12:01:52 GMT",
      issue: 'No. 044',
      category: "SEO",
      excerpt: "If your plumbing business is not showing up on Google when local customers search for help, a website audit is the first step to fixing that. This guide walks you through exactly what to look for and how to turn your site into a lead-generating machine. RAH Operations helps Arizona plumbers rank locally and grow fast.",
      slug: 'website-audit-for-plumbers-how-to-rank-locally'
    },
    {
      title: "Website Audit for Law Firms: What Google Looks For",
      displayTitle: "Website Audit for Law Firms: What Google Really Looks For in 2026",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 08:02:06 GMT",
      issue: 'No. 043',
      category: "SEO",
      excerpt: "A website audit for law firms reveals exactly why your site is not ranking on Google and what needs to change. From technical SEO to content quality, Google evaluates dozens of factors that most law firm websites fail to address. Learn what matters most and how to fix it fast.",
      slug: 'website-audit-for-law-firms-what-google-looks-for'
    },
    {
      title: "Website Audit for Real Estate Agents: Complete SEO Guide",
      displayTitle: "Website Audit for Real Estate Agents: The Complete SEO Guide to Ranking Higher and Closing More Deals",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 06:07:14 GMT",
      issue: 'No. 042',
      category: "SEO",
      excerpt: "If your real estate website is not showing up on Google, you are losing listings and buyers to competitors every single day. A complete website audit for real estate agents reveals exactly what is holding your site back and what to fix first. This guide walks you through every critical step so you can rank higher, generate more leads, and close more deals in Arizona.",
      slug: 'website-audit-for-real-estate-agents-complete-seo-guide'
    },
    {
      title: "Website Audit for Dentists: Get More Patients from Google",
      displayTitle: "Website Audit for Dentists: How to Get More Patients from Google in 2026",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 06:02:57 GMT",
      issue: 'No. 041',
      category: "SEO",
      excerpt: "If your dental practice is not showing up on Google, a professional website audit could reveal exactly why. From slow load times to missing local SEO signals, small technical issues are costing you new patients every day. Learn what a website audit for dentists covers and how to turn your site into a patient-generating machine.",
      slug: 'website-audit-for-dentists-get-more-patients-from-google'
    },
    {
      title: "Website Audit for Contractors: Rank Higher in Your City",
      displayTitle: "Website Audit for Contractors: How to Rank Higher in Your City and Win More Local Jobs",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 05:53:05 GMT",
      issue: 'No. 040',
      category: "SEO",
      excerpt: "If your contracting business is not showing up on the first page of Google, a website audit could reveal exactly why. From broken links to missing local SEO signals, small technical issues are costing you real jobs. Learn what a professional audit covers and how it helps contractors rank higher in their city.",
      slug: 'website-audit-for-contractors-rank-higher-in-your-city'
    },
    {
      title: "Website Audit for Restaurants: How to Get Found on Google",
      displayTitle: "Website Audit for Restaurants: How to Get Found on Google and Fill More Tables",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 05:37:30 GMT",
      issue: 'No. 039',
      category: "SEO",
      excerpt: "If your restaurant is not showing up on Google, you are losing customers to competitors every single day. A proper website audit for restaurants reveals exactly what is holding your site back and what needs to change to start ranking. RAH Operations breaks down the entire process so Arizona restaurant owners can take action now.",
      slug: 'website-audit-for-restaurants-how-to-get-found-on-google'
    },
    {
      title: "How to Read a Website Audit Report and What to Fix First",
      displayTitle: "How to Read a Website Audit Report and What to Fix First (A Plain-English Guide)",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 04:30:41 GMT",
      issue: 'No. 038',
      category: "SEO",
      excerpt: "A website audit report can feel overwhelming if you do not know what you are looking at. This guide breaks down every section in plain English and tells you exactly what to fix first so your site starts ranking and converting. RAH Operations helps Arizona businesses turn audit data into real results.",
      slug: 'how-to-read-a-website-audit-report-and-what-to-fix-first'
    },
    {
      title: "Free Website SEO Checker No Account Needed | RAH Ops",
      displayTitle: "Free Website SEO Checker No Account Needed: What These Tools Really Tell You (And What They Miss)",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 04:18:55 GMT",
      issue: 'No. 037',
      category: "SEO",
      excerpt: "Free website SEO checkers with no account needed are a fast way to spot technical issues, missing metadata, and ranking opportunities. But these tools only scratch the surface of what a real SEO strategy requires. Learn what these checkers actually measure, where they fall short, and how to turn audit findings into real traffic growth.",
      slug: 'free-website-seo-checker-no-account-needed'
    },
    {
      title: "Why Your Website Is Not Showing Up on Google – Fix It Now",
      displayTitle: "Why Your Website Is Not Showing Up on Google (And How to Fix It Now)",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 03:56:21 GMT",
      issue: 'No. 036',
      category: "SEO",
      excerpt: "If your website is not showing up on Google, you are losing customers every single day to competitors who figured out what you have not yet. The good news is that most visibility problems have clear, fixable causes. This guide breaks down exactly why your site is invisible and what you can do right now to change it.",
      slug: 'why-your-website-is-not-showing-up-on-google-fix-it-now'
    },
    {
      title: "How to Audit Your Website SEO Step by Step Free Guide",
      displayTitle: "How to Audit Your Website SEO Step by Step: The Complete Free Guide",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 03:51:50 GMT",
      issue: 'No. 035',
      category: "SEO",
      excerpt: "If your website isn't ranking on Google, a thorough SEO audit is the first step to finding out why. This free step-by-step guide walks you through every layer of your site's SEO so you can identify problems, prioritize fixes, and start climbing the search results. Whether you're a small business owner in Arizona or managing a growing brand, this guide gives you the tools to take action.",
      slug: 'how-to-audit-your-website-seo-step-by-step-free-guide'
    },
    {
      title: "Website Audit Checklist for Small Business Owners 2026",
      displayTitle: "The Complete Website Audit Checklist Every Small Business Owner Needs in 2026",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 03:37:59 GMT",
      issue: 'No. 034',
      category: "Website Design",
      excerpt: "If your website isn't generating leads, it's costing you money. Use this complete website audit checklist for small business owners to identify exactly what's broken, what's underperforming, and what needs to change in 2026. RAH Operations breaks it all down so you can take action today.",
      slug: 'website-audit-checklist-for-small-business-owners-2026'
    },
    {
      title: "Free Website Audit Tool for Small Businesses No Signup",
      displayTitle: "The Best Free Website Audit Tool for Small Businesses — No Signup Required",
      date: "May 14, 2026",
      pubDate: "Thu, 14 May 2026 03:05:53 GMT",
      issue: 'No. 033',
      category: "SEO",
      excerpt: "Not sure why your website isn't showing up on Google? A free website audit tool can reveal hidden technical issues, SEO gaps, and performance problems dragging your rankings down — no signup required. This guide breaks down the best options and what to do with the results.",
      slug: 'free-website-audit-tool-for-small-businesses-no-signup-required'
    },
    {
      title: "Ecommerce Website Design Phoenix | RAH Operations",
      displayTitle: "Ecommerce Website Design in Phoenix: Build a Store That Actually Sells",
      date: "May 13, 2026",
      pubDate: "Wed, 13 May 2026 03:04:17 GMT",
      issue: 'No. 032',
      category: "Website Design",
      excerpt: "If your Phoenix business is ready to sell online, the quality of your ecommerce website design can make or break your revenue. RAH Operations builds fast, conversion-focused online stores tailored to Arizona businesses. Discover what separates a store that sells from one that just exists.",
      slug: 'ecommerce-website-design-phoenix'
    },
    {
      title: "Arizona Small Business Growth Strategies That Work",
      displayTitle: "Arizona Small Business Growth Strategies That Actually Move the Needle in 2026",
      date: "May 13, 2026",
      pubDate: "Wed, 13 May 2026 02:47:17 GMT",
      issue: 'No. 031',
      category: "Business Services",
      excerpt: "Growing a small business in Arizona takes more than a great product — it takes a smart, multi-channel strategy built for the local market. From search visibility to business credit, RAH Operations breaks down exactly what Arizona entrepreneurs need to scale. Read on to discover the growth levers most local businesses overlook.",
      slug: 'arizona-small-business-growth-strategies'
    },
    {
      title: "Google Business Profile Optimization Scottsdale",
      displayTitle: "Google Business Profile Optimization in Scottsdale: The Complete Guide to Dominating Local Search",
      date: "May 13, 2026",
      pubDate: "Wed, 13 May 2026 02:38:43 GMT",
      issue: 'No. 030',
      category: "SEO",
      excerpt: "If your Scottsdale business isn't showing up in Google's Local Pack, you're losing customers to competitors who've optimized their Google Business Profile. RAH Operations breaks down exactly what it takes to dominate local search in the Valley. Learn the strategies that actually move the needle.",
      slug: 'google-business-profile-optimization-scottsdale'
    },
    {
      title: "Notary Services Scottsdale AZ | Find & Hire Fast",
      displayTitle: "Notary Services in Scottsdale AZ: What You Need to Know Before You Sign",
      date: "May 13, 2026",
      pubDate: "Wed, 13 May 2026 00:43:45 GMT",
      issue: 'No. 029',
      category: "Business Services",
      excerpt: "Finding reliable notary services in Scottsdale AZ doesn't have to be complicated. Whether you need documents notarized for a real estate deal, business formation, or personal legal matters, knowing your options saves you time and stress. This guide breaks down everything you need to know to get it done right the first time.",
      slug: 'notary-services-scottsdale-az'
    },
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
