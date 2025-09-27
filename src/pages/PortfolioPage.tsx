import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import SEOHead from '../components/ui/SEOHead';
import { ExternalLink, Globe, Code, Monitor, Sparkles, Zap } from 'lucide-react';

// Define the structure of each portfolio item
interface PortfolioItem {
  id: number;
  title: string;
  url: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  features: string[];
}

// Move portfolio items data outside component to prevent recreation
const portfolioItemsData: PortfolioItem[] = [
  {
    id: 1,
    title: "Empire Builds AZ",
    url: "https://www.empirebuildsaz.com",
    description: "Professional construction and building services company showcasing their portfolio of residential and commercial projects",
    image: "/portfolio/empire-builds.png",
    technologies: ["React", "Tailwind CSS", "SEO Optimized", "Mobile Responsive"],
    category: "Construction",
    features: ["Project Gallery", "Service Listings", "Contact Forms", "Testimonials"]
  },
  {
    id: 2,
    title: "Pinnacle Bookkeeping AZ",
    url: "https://www.pinnaclebookkeepingaz.com/",
    description: "Full-service bookkeeping and financial management solutions for small to medium businesses in Arizona",
    image: "/portfolio/pinnacle-bookkeeping.png",
    technologies: ["React", "TypeScript", "Professional Design", "Secure Forms"],
    category: "Finance",
    features: ["Service Calculator", "Client Portal", "Resource Center", "Appointment Booking"]
  },
  {
    id: 3,
    title: "The Scottsdale Injector",
    url: "https://www.thescottsdaleinjector.com/",
    description: "Premium medical aesthetics and cosmetic injection services with a focus on natural-looking results",
    image: "/portfolio/scottsdale-injector.png",
    technologies: ["React", "HIPAA Compliant", "Before/After Gallery", "Booking System"],
    category: "Healthcare",
    features: ["Treatment Menu", "Virtual Consultation", "Patient Forms", "Educational Blog"]
  },
  {
    id: 4,
    title: "SunVision Solar",
    url: "https://www.sunvision-solar.com/",
    description: "Solar energy solutions provider offering installation, maintenance, and consultation services across Arizona",
    image: "/portfolio/sunvision-solar.png",
    technologies: ["React", "Interactive Calculators", "3D Visualizations", "Lead Generation"],
    category: "Energy",
    features: ["Solar Calculator", "Project Showcase", "Financing Options", "Energy Reports"]
  },
  {
    id: 5,
    title: "Daniel Rodriguez",
    url: "https://www.danielrodriguez.org/",
    description: "Professional portfolio and personal brand website showcasing expertise and achievements",
    image: "/portfolio/daniel-rodriguez.png",
    technologies: ["React", "TypeScript", "Analytics", "Performance Optimized"],
    category: "Personal Brand",
    features: ["Portfolio Gallery", "Blog Section", "Resume Download", "Contact Integration"]
  },
  {
    id: 6,
    title: "Daniel Rodriguez Scottsdale",
    url: "https://danielrodriguezscottsdale.carrd.co",
    description: "Streamlined landing page for professional networking and quick contact information",
    image: "/portfolio/daniel-rodriguez-scottsdale.png",
    technologies: ["Carrd", "Single Page", "Fast Loading", "Mobile First"],
    category: "Landing Page",
    features: ["Social Links", "Contact Info", "Bio Section", "Call-to-Action"]
  },
  {
    id: 7,
    title: "Knox Strats",
    url: "https://www.knoxstrats.com/",
    description: "Strategic consulting firm specializing in business development and growth strategies",
    image: "/portfolio/knox-strats.png",
    technologies: ["React", "Data Visualization", "Client Dashboard", "Secure"],
    category: "Consulting",
    features: ["Case Studies", "Service Packages", "Client Resources", "Strategy Tools"]
  }
];

// Utility function for generating screenshot URL with timestamp
const getScreenshotUrl = (url: string, width: number, height: number) => {
  const timestamp = new Date().getTime();
  return `https://screenshot.rocks/api/screenshot?url=${encodeURIComponent(url)}&width=${width}&height=${height}&deviceScaleFactor=1&t=${timestamp}`;
};

const PortfolioPage: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animatedElementsRef = useRef<Set<Element>>(new Set());

  // Memoize portfolio items and calculations
  const portfolioItems = useMemo(() => portfolioItemsData, []);
  const categories = useMemo(
    () => Array.from(new Set(portfolioItems.map(item => item.category))),
    [portfolioItems]
  );
  const totalTechnologies = useMemo(
    () => Array.from(new Set(portfolioItems.flatMap(item => item.technologies))).length,
    [portfolioItems]
  );

  // Intersection Observer callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedElementsRef.current.has(entry.target)) {
        entry.target.classList.add('visible');
        animatedElementsRef.current.add(entry.target);
      }
    });
  }, []);

  // Setup Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      animatedElementsRef.current.clear();
    };
  }, [handleIntersection]);

  // Preload first 3 screenshots
  useEffect(() => {
    const firstThreeItems = portfolioItems.slice(0, 3);
    firstThreeItems.forEach(item => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getScreenshotUrl(item.url, 600, 400);
      document.head.appendChild(link);
    });
  }, [portfolioItems]);

  return (
    <>
      <SEOHead
        title="Portfolio - My Web Development Projects | Professional Websites"
        description="Explore my portfolio of professional websites including business sites, e-commerce platforms, and custom web applications built with modern technologies."
        url="https://www.rahoperations.com/portfolio"
        imageUrl="/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png"
        keywords="web development portfolio, professional websites, Arizona web design, custom web applications"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#F0FFFE]">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 fade-in-up">
                <span className="gradient-text">My Portfolio</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in-up stagger-1">
                Crafting digital experiences that drive results. Each project represents a unique challenge solved with modern web technologies and thoughtful design.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3CBEC7] to-[#1A7C81] rounded-full mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{portfolioItems.length}</div>
                <div className="text-gray-600">Live Websites</div>
              </div>
              <div className="text-center fade-in-up stagger-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#97EDED] to-[#3CBEC7] rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
                <div className="text-gray-600">Industries</div>
              </div>
              <div className="text-center fade-in-up stagger-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C9F8F6] to-[#97EDED] rounded-full mb-4">
                  <Code className="w-8 h-8 text-[#1A7C81]" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{totalTechnologies}+</div>
                <div className="text-gray-600">Technologies</div>
              </div>
              <div className="text-center fade-in-up stagger-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1A7C81] to-[#0F6168] rounded-full mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-gray-600">Responsive</div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`service-card group fade-in-up stagger-${Math.min(index + 1, 6)}`}
                >
                  {/* Website Preview Area */}
                  <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-xl bg-gray-100">
                    <img 
                      src={getScreenshotUrl(item.url, 600, 400)}
                      alt={`${item.title} preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading={index < 3 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = 'true';
                          target.src = `https://image.thum.io/get/width/600/crop/400/${item.url}`;
                        } else {
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />
                    {/* Fallback gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3CBEC7] to-[#1A7C81] opacity-90 hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Monitor className="w-16 h-16 text-white opacity-50 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#3CBEC7] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-[#F0FFFE] text-[#1A7C81] px-2 py-1 rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Built With</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Visit Button */}
                    <div className="pt-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2 w-full justify-center group"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 fade-in-up">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-white/90 mb-8 fade-in-up stagger-1">
              Let's collaborate on your next web project and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-2">
              <a
                href="/contact"
                className="bg-white text-[#1A7C81] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start a Project
              </a>
              <a
                href="/about"
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Learn More About Me
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioPage;
