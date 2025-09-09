import React, { useState } from 'react';
import { Calendar, User, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';

const BlogPage = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const togglePost = (index: number) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  const blogPosts = [
    {
      title: 'The Ultimate Checklist for Starting Your Business the Right Way',
      excerpt: 'Starting a business is exciting, but it can also be overwhelming. Follow this ultimate checklist to start your business with confidence, clarity, and compliance.',
      author: 'Daniel Rodriguez',
      date: '2024-01-15',
      category: 'Business Formation',
      readTime: '8 min read',
      image: '/Blog logo for the The Ultimate Checklist for Starting Your Business the Right Way.png',
      content: `So, you've got a killer idea and the drive to make it happen—but now what?

Starting a business is exciting, but let's be honest—it can also be overwhelming. There are legal steps to follow, documents to file, and choices to make that could affect your business for years to come.

That's why we put together this ultimate checklist to help you start your business the right way—with confidence, clarity, and compliance.

## 1. Decide on Your Business Structure

First things first: how will your business be structured?

Most small businesses choose one of the following:

• **Sole Proprietorship** – Easiest and cheapest, but offers no liability protection.
• **LLC (Limited Liability Company)** – Offers personal liability protection and flexibility.
• **Corporation (C-Corp or S-Corp)** – Best for larger businesses or those planning to raise capital.

**Pro Tip:** Most new entrepreneurs go with an LLC for flexibility and protection.

## 2. Register Your Business Name

You'll need to make your business name official by registering it in your state. This often means:

• Checking if the name is available
• Registering a DBA (Doing Business As) if needed
• Securing your domain name and social handles

This ensures no one else can legally operate under the same name in your state.

## 3. File for an EIN (Employer Identification Number)

Even if you don't plan on hiring employees right away, you'll likely need an EIN for:

• Opening a business bank account
• Filing taxes
• Applying for business credit or funding

## 4. Open a Business Bank Account

Keeping your business and personal finances separate is non-negotiable.

You'll want:

• A checking account
• Possibly a business savings account
• A business credit card (which also helps build credit)

📌 **Note:** Many funding opportunities require a separate business account to prove financial legitimacy.

## 5. Get All Required Licenses & Permits

Depending on your location and industry, you may need:

• A general business license
• A sales tax permit
• Zoning permits
• State-specific certifications

Not sure what you need? That's where professionals like RAH Operations step in—we'll guide you through every requirement specific to your business and location.

## 6. Set Up Your Record-keeping System

Good bookkeeping from Day 1 = fewer headaches at tax time.

Whether you use:

• QuickBooks
• A spreadsheet
• Or hire a bookkeeper

...just make sure you track every dollar that moves in and out of your business.

## 7. Build Your Brand Presence (Even Before You Launch)

Yes, this includes:

• A basic website
• Professional email (not just Gmail)
• Google Business Profile
• Social media profiles

You don't need a fancy website on day one—but you do need a digital footprint. Luckily RAH OPERATIONS can help you with all that.

## 8. Don't Forget Business Insurance

Depending on what you do, you may need:

• General liability insurance
• Professional liability
• Workers comp (if you'll hire)

It protects your business from unexpected lawsuits, accidents, or issues down the line.

## 9. Work with a Professional to Avoid Mistakes

Can you do it all yourself? Maybe.

But a small mistake now can become a big problem later—whether it's a tax filing error or a funding rejection because of a missing step.

RAH Operations helps business owners launch confidently and legally, with expert guidance through:

• LLC formation
• EIN setup
• Compliance
• Funding-readiness

## Ready to Launch Like a Pro?

Don't let overwhelm or confusion delay your business dreams. Let RAH Operations walk you through the entire setup—from structure to strategy.

**📞 Book a Free Consultation Today**
Contact us now to get started the right way.`
    },
    {
      title: 'Website Design Trends for Arizona Businesses in 2024',
      excerpt: 'Discover the latest website design trends that Arizona businesses are using to attract more customers and increase conversions.',
      author: 'Daniel Rodriguez',
      date: '2024-01-12',
      category: 'Website Design',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      content: 'Full content for this blog post will be added when you provide it.'
    },
    {
      title: 'Local SEO for Phoenix Businesses: Complete Strategy Guide',
      excerpt: 'Master local SEO for your Phoenix business. Learn how to optimize Google My Business and rank higher in local search results.',
      author: 'Daniel Rodriguez',
      date: '2024-01-10',
      category: 'Local SEO',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
      content: 'Full content for this blog post will be added when you provide it.'
    },
    {
      title: 'Why Arizona Businesses Need Professional Website Design',
      excerpt: 'Learn why professional website design is crucial for Arizona businesses and how it impacts your online success and customer trust.',
      author: 'Daniel Rodriguez',
      date: '2024-01-08',
      category: 'Website Design',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg',
      content: 'Full content for this blog post will be added when you provide it.'
    },
    {
      title: 'Scottsdale SEO Success: Case Study and Best Practices',
      excerpt: 'Real case study of how we helped a Scottsdale business achieve #1 Google rankings and increase their online visibility.',
      author: 'Daniel Rodriguez',
      date: '2024-01-05',
      category: 'Case Studies',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      content: 'Full content for this blog post will be added when you provide it.'
    }
  ];

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>;
      } else if (line.startsWith('• **') && line.includes('**')) {
        const parts = line.split('**');
        return (
          <li key={index} className="mb-2 ml-4">
            <strong>{parts[1]}</strong> {parts[2]}
          </li>
        );
      } else if (line.startsWith('• ')) {
        return <li key={index} className="mb-2 ml-4">{line.replace('• ', '')}</li>;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-gray-900 mb-4">{line.replace(/\*\*/g, '')}</p>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-4 leading-relaxed text-gray-700">{line}</p>;
      }
    });
  };

  return (
    <>
      <SEOHead
        title="Arizona Business Blog | RAH Operations"
        description="Expert insights on Arizona business growth, website design, SEO, digital marketing, and business credit. Resources for Arizona entrepreneurs and business owners."
        keywords="Arizona business blog, Arizona SEO tips, Phoenix business advice, Scottsdale marketing insights, Arizona business resources"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#3CBEC7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#0F6168]">
              BLOGS
            </h1>
            <p className="text-xl text-[#104A53] mb-8 max-w-3xl mx-auto leading-relaxed">
              Expert insights and resources for Arizona businesses looking to grow online and build stronger operations.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {['All Posts', 'Website Design', 'Arizona SEO', 'Local SEO', 'Case Studies'].map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  index === 0
                    ? 'bg-[#3CBEC7] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-[#C9F8F6] hover:text-[#1A7C81]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 lg:h-80 object-contain bg-gray-50"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#3CBEC7] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {expandedPost === index && (
                      <div className="prose prose-lg max-w-none mb-6">
                        {renderContent(post.content)}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <button 
                        onClick={() => togglePost(index)}
                        className="text-[#3CBEC7] hover:text-[#1A7C81] font-medium flex items-center transition-colors"
                      >
                        {expandedPost === index ? (
                          <>
                            Show Less
                            <ChevronUp className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Read More
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-[#104A53] to-[#0F6168] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Updated with Business Insights
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Subscribe to our newsletter for weekly business tips, industry updates, and exclusive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#97EDED]"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;