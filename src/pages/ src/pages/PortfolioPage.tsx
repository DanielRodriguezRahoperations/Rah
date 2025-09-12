import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Eye, Code, TrendingUp, Award, Filter, Search, ArrowRight, Star, Calendar, MapPin, Zap, Target, Users, Clock } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  category: string;
  industry: string;
  url: string;
  image: string;
  mobileImage?: string;
  technologies: string[];
  completionDate: string;
  location: string;
  featured: boolean;
  results: {
    metric: string;
    improvement: string;
    description: string;
  }[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    rating: number;
  };
  services: string[];
  challenges: string[];
  timeline: string;
}

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 'empire-builds',
      title: 'Empire Builds AZ',
      client: 'Empire Builds Arizona',
      description: 'A premium construction company website featuring modern design, project galleries, and lead generation optimization. Built for maximum conversion and local SEO dominance.',
      category: 'business-website',
      industry: 'Construction',
      url: 'https://www.empirebuildsaz.com',
      image: '/portfolio/empire-builds-desktop.jpg',
      mobileImage: '/portfolio/empire-builds-mobile.jpg',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'SEO Optimization', 'Google Analytics'],
      completionDate: '2024-11',
      location: 'Phoenix, AZ',
      featured: true,
      timeline: '4 weeks',
      results: [
        { metric: 'Lead Generation', improvement: '+285%', description: 'Monthly qualified leads increased' },
        { metric: 'Google Rankings', improvement: 'Top 3', description: 'Now ranking for "Arizona construction"' },
        { metric: 'Page Speed', improvement: '94/100', description: 'Google PageSpeed score' }
      ],
      testimonial: {
        text: 'RAH Operations delivered exactly what we needed. Our new website has generated more leads in 2 months than our old site did all year.',
        author: 'Mike Johnson',
        role: 'Owner, Empire Builds AZ',
        rating: 5
      },
      services: ['Website Design', 'SEO Optimization', 'Lead Generation Setup', 'Mobile Optimization'],
      challenges: ['Complex project portfolio display', 'Mobile-first design', 'Local SEO targeting']
    },
    {
      id: 'pinnacle-bookkeeping',
      title: 'Pinnacle Bookkeeping AZ',
      client: 'Pinnacle Bookkeeping',
      description: 'Professional accounting services website with client portal integration, service booking system, and trust-building design elements.',
      category: 'business-website',
      industry: 'Accounting/Finance',
      url: 'https://www.pinnaclebookkeepingaz.com/',
      image: '/portfolio/pinnacle-bookkeeping-desktop.jpg',
      mobileImage: '/portfolio/pinnacle-bookkeeping-mobile.jpg',
      technologies: ['WordPress', 'Custom CSS', 'Booking System', 'SSL Security', 'Client Portal'],
      completionDate: '2024-10',
      location: 'Scottsdale, AZ',
      featured: true,
      timeline: '3 weeks',
      results: [
        { metric: 'Client Inquiries', improvement: '+320%', description: 'Online consultation requests' },
        { metric: 'Conversion Rate', improvement: '12.8%', description: 'Visitor to client conversion' },
        { metric: 'Trust Score', improvement: '+95%', description: 'Based on user engagement metrics' }
      ],
      testimonial: {
        text: 'The new website has completely transformed our business. We went from getting 2-3 inquiries per month to 2-3 per week.',
        author: 'Sarah Mitchell',
        role: 'CPA, Pinnacle Bookkeeping',
        rating: 5
      },
      services: ['Website Design', 'Client Portal Setup', 'SEO', 'Security Implementation'],
      challenges: ['Client data security', 'Professional trust design', 'Service booking integration']
    },
    {
      id: 'scottsdale-injector',
      title: 'The Scottsdale Injector',
      client: 'Medical Aesthetics Practice',
      description: 'Luxury medical spa website featuring appointment booking, treatment galleries, and compliance with medical advertising regulations.',
      category: 'medical-website',
      industry: 'Medical/Aesthetics',
      url: 'https://www.thescottsdaleinjector.com/',
      image: '/portfolio/scottsdale-injector-desktop.jpg',
      mobileImage: '/portfolio/scottsdale-injector-mobile.jpg',
      technologies: ['React', 'Appointment System', 'HIPAA Compliant', 'Image Galleries', 'Payment Integration'],
      completionDate: '2024-09',
      location: 'Scottsdale, AZ',
      featured: true,
      timeline: '5 weeks',
      results: [
        { metric: 'Online Bookings', improvement: '+450%', description: 'Monthly appointment bookings' },
        { metric: 'Local Visibility', improvement: 'Top 1', description: 'Google Maps ranking' },
        { metric: 'Revenue Growth', improvement: '+180%', description: 'Monthly recurring revenue' }
      ],
      testimonial: {
        text: 'Our online presence went from invisible to industry-leading. The booking system alone has revolutionized our practice.',
        author: 'Dr. Jennifer Walsh',
        role: 'Medical Director',
        rating: 5
      },
      services: ['Medical Website Design', 'HIPAA Compliance', 'Booking System', 'SEO'],
      challenges: ['Medical compliance', 'Luxury brand positioning', 'Complex booking requirements']
    },
    {
      id: 'sunvision-solar',
      title: 'SunVision Solar',
      client: 'SunVision Solar Energy',
      description: 'Solar energy company website with interactive solar calculator, financing options, and lead capture optimization for high-value solar installations.',
      category: 'business-website',
      industry: 'Solar/Energy',
      url: 'https://www.sunvision-solar.com/',
      image: '/portfolio/sunvision-solar-desktop.jpg',
      mobileImage: '/portfolio/sunvision-solar-mobile.jpg',
      technologies: ['Vue.js', 'Solar Calculator', 'CRM Integration', 'Lead Tracking', 'Analytics'],
      completionDate: '2024-08',
      location: 'Arizona Statewide',
      featured: false,
      timeline: '6 weeks',
      results: [
        { metric: 'Solar Quotes', improvement: '+380%', description: 'Qualified solar installation quotes' },
        { metric: 'Average Deal Size', improvement: '+65%', description: 'Higher value customers' },
        { metric: 'Conversion Rate', improvement: '18.5%', description: 'Quote to customer rate' }
      ],
      services: ['Website Design', 'Solar Calculator Development', 'CRM Integration', 'Lead Optimization'],
      challenges: ['Complex pricing calculator', 'High-value lead qualification', 'Technical solar education']
    },
    {
      id: 'daniel-rodriguez-org',
      title: 'Daniel Rodriguez Official',
      client: 'Political Campaign',
      description: 'Professional political campaign website with volunteer registration, donation integration, and event management system.',
      category: 'campaign-website',
      industry: 'Politics/Government',
      url: 'https://www.danielrodriguez.org/',
      image: '/portfolio/daniel-rodriguez-org-desktop.jpg',
      mobileImage: '/portfolio/daniel-rodriguez-org-mobile.jpg',
      technologies: ['React', 'Donation Platform', 'Volunteer Management', 'Event System', 'Analytics'],
      completionDate: '2024-07',
      location: 'Scottsdale, AZ',
      featured: false,
      timeline: '3 weeks',
      results: [
        { metric: 'Volunteer Signups', improvement: '+520%', description: 'Campaign volunteer registration' },
        { metric: 'Online Donations', improvement: '+290%', description: 'Digital fundraising success' },
        { metric: 'Event Attendance', improvement: '+215%', description: 'Campaign event participation' }
      ],
      services: ['Campaign Website', 'Donation Integration', 'Volunteer Portal', 'Event Management'],
      challenges: ['Political compliance', 'Rapid deployment', 'Multi-platform integration']
    },
    {
      id: 'daniel-rodriguez-carrd',
      title: 'Daniel Rodriguez Landing',
      client: 'Political Campaign',
      description: 'High-converting single-page campaign landing site optimized for mobile engagement and quick information access.',
      category: 'landing-page',
      industry: 'Politics/Government',
      url: 'https://danielrodriguezscottsdale.carrd.co',
      image: '/portfolio/daniel-rodriguez-carrd-desktop.jpg',
      mobileImage: '/portfolio/daniel-rodriguez-carrd-mobile.jpg',
      technologies: ['Carrd', 'Mobile Optimization', 'Contact Forms', 'Social Integration'],
      completionDate: '2024-07',
      location: 'Scottsdale, AZ',
      featured: false,
      timeline: '1 week',
      results: [
        { metric: 'Mobile Engagement', improvement: '+340%', description: 'Mobile user interaction' },
        { metric: 'Contact Rate', improvement: '+280%', description: 'Visitor contact conversion' },
        { metric: 'Social Shares', improvement: '+450%', description: 'Campaign message amplification' }
      ],
      services: ['Landing Page Design', 'Mobile Optimization', 'Social Integration'],
      challenges: ['Single-page efficiency', 'Mobile-first design', 'Quick deployment']
    },
    {
      id: 'knox-strats',
      title: 'Knox Strategies',
      client: 'Knox Strategies Consulting',
      description: 'Strategic consulting firm website featuring case studies, team profiles, and client success stories with professional B2B design.',
      category: 'business-website',
      industry: 'Consulting/Strategy',
      url: 'https://www.knoxstrats.com/',
      image: '/portfolio/knox-strats-desktop.jpg',
      mobileImage: '/portfolio/knox-strats-mobile.jpg',
      technologies: ['React', 'Case Study System', 'Team Profiles', 'Client Portal', 'Analytics'],
      completionDate: '2024-06',
      location: 'Phoenix, AZ',
      featured: false,
      timeline: '4 weeks',
      results: [
        { metric: 'B2B Inquiries', improvement: '+265%', description: 'Qualified business inquiries' },
        { metric: 'Proposal Requests', improvement: '+340%', description: 'Strategic consulting proposals' },
        { metric: 'Client Retention', improvement: '+85%', description: 'Improved client communication' }
      ],
      services: ['B2B Website Design', 'Case Study Development', 'Client Portal', 'Professional Branding'],
      challenges: ['B2B trust building', 'Complex service explanation', 'Client confidentiality']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'business-website', label: 'Business Websites', count: projects.filter(p => p.category === 'business-website').length },
    { id: 'medical-website', label: 'Medical/Healthcare', count: projects.filter(p => p.category === 'medical-website').length },
    { id: 'campaign-website', label: 'Political Campaigns', count: projects.filter(p => p.category === 'campaign-website').length },
    { id: 'landing-page', label: 'Landing Pages', count: projects.filter(p => p.category === 'landing-page').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = projects.filter(p => p.featured);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.portfolio-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const totalProjects = projects.length;
  const totalClients = new Set(projects.map(p => p.client)).size;
  const avgImprovement = Math.round(
    projects.reduce((acc, p) => acc + parseInt(p.results[0]?.improvement.replace(/[^0-9]/g, '') || '0'), 0) / projects.length
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RAH Operations Portfolio',
    description: 'Professional web development and digital marketing portfolio showcasing Arizona business websites',
    url: 'https://www.rahoperations.com/portfolio',
    sameAs: [
      'https://facebook.com/644350702085787',
      'https://www.linkedin.com/company/rah-operations-llc',
      'https://instagram.com/rahoperations/'
    ]
  };

  return (
    <>
      <SEOHead
        title="Portfolio - Professional Websites Built in Arizona | RAH Operations"
        description="View our portfolio of professional websites built for Arizona businesses. See real results including 285% lead increases and top Google rankings. Custom website design and SEO."
        url={absoluteUrl("/portfolio")}
        keywords="Arizona website portfolio, custom website design, Phoenix web development, Scottsdale website design, business website examples"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#97EDED] via-[#C9F8F6] to-[#B5F3F0] py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full float-animation"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full float-animation-delay"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full float-animation"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#0F6168] text-sm font-medium mb-6 portfolio-animate fade-in-up">
              <Award className="w-4 h-4 mr-2 text-[#1A7C81]" />
              Professional Portfolio
            </div>

            <h1 className="hero-title text-4xl lg:text-6xl font-bold text-[#0F6168] mb-6 leading-tight">
              Websites That
              <span className="text-[#1A7C81] block">Drive Real Results</span>
            </h1>

            <p className="hero-subtitle text-xl lg:text-2xl text-[#104A53] mb-8 max-w-4xl mx-auto leading-relaxed">
              Explore our portfolio of custom websites built for Arizona businesses. 
              Each project delivers measurable growth and dominates local search results.
            </p>

            {/* Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
              <div className="portfolio-animate fade-in-up stagger-1">
                <div className="text-3xl font-bold text-[#1A7C81] mb-2">{totalProjects}+</div>
                <div className="text-[#104A53] font-medium">Websites Built</div>
              </div>
              <div className="portfolio-animate fade-in-up stagger-2">
                <div className="text-3xl font-bold text-[#1A7C81] mb-2">{totalClients}+</div>
                <div className="text-[#104A53] font-medium">Happy Clients</div>
              </div>
              <div className="portfolio-animate fade-in-up stagger-3">
                <div className="text-3xl font-bold text-[#1A7C81] mb-2">{avgImprovement}%</div>
                <div className="text-[#104A53] font-medium">Avg Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 portfolio-animate fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most impactful website builds showcasing dramatic business growth and market domination.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featuredProjects.slice(0, 4).map((project, index) => (
              <div key={project.id} className={`portfolio-animate fade-in-up stagger-${index + 1}`}>
                <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} website preview`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback gradient background
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Overlay buttons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => openProjectModal(project)}
                          className="bg-white text-[#1A7C81] px-4 py-2 rounded-lg font-medium hover:bg-[#1A7C81] hover:text-white transition-colors duration-300 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#1A7C81] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0F6168] transition-colors duration-300 flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Site
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#C9F8F6] text-[#1A7C81]">
                        {project.industry}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.completionDate}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1A7C81] transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Results */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {project.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-[#1A7C81]">{result.improvement}</div>
                          <div className="text-xs text-gray-600">{result.metric}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Section */}
      <section ref={portfolioRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 portfolio-animate fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Projects</h2>
            <p className="text-lg text-gray-600">
              Browse our complete portfolio of successful website builds
            </p>
          </div>

          {/* Filter and Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 portfolio-animate fade-in-up">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-[#1A7C81] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-[#C9F8F6] hover:text-[#1A7C81]'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3CBEC7] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className={`portfolio-animate fade-in-up stagger-${(index % 3) + 1}`}>
                <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  {/* Live Website Preview */}
                  <div className="relative h-48 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] overflow-hidden">
                    {/* Live Badge */}
                    <div className="absolute top-2 left-2 z-20 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-[#1A7C81] flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Live
                    </div>
                    
                    {/* Direct Website Link */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center"
                    >
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2 text-[#1A7C81]" />
                        <span className="font-medium text-[#1A7C81] text-sm">View Live Site</span>
                      </div>
                    </a>

                    {/* Website Preview */}
                    <div className="relative w-full h-full">
                      <iframe
                        src={project.url}
                        title={`${project.title} preview`}
                        className="w-full h-full scale-75 transform origin-top-left pointer-events-none border-2 border-white/20 rounded"
                        style={{ width: '133.33%', height: '133.33%' }}
                        loading="lazy"
                      />
                      
                      {/* Fallback gradient when iframe doesn't load */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0] opacity-0 flex items-center justify-center">
                        <div className="text-center text-[#1A7C81]">
                          <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-sm font-medium">Click to Visit</div>
                          <div className="text-xs opacity-75">{project.url.replace('https://', '').replace('www.', '')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Corner Link Icon */}
                    <div className="absolute top-2 right-2 z-20">
                      <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1A7C81] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#C9F8F6] text-[#1A7C81]">
                        {project.industry}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1A7C81] transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {project.description.length > 120 
                        ? `${project.description.substring(0, 120)}...` 
                        : project.description}
                    </p>

                    {/* Key Metric */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#1A7C81]">
                          {project.results[0]?.improvement}
                        </div>
                        <div className="text-xs text-gray-600">
                          {project.results[0]?.metric}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openProjectModal(project)}
                        className="flex-1 bg-[#1A7C81] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#0F6168] transition-colors duration-300 flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </button>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-[#1A7C81] text-[#1A7C81] px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#1A7C81] hover:text-white transition-colors duration-300 flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Visit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No projects found matching your criteria.</div>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchTerm('');
                }}
                className="mt-4 text-[#1A7C81] hover:text-[#0F6168] font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center portfolio-animate fade-in-up">
          <h2 className="text-3xl font-bold text-[#0F6168] mb-4">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-[#104A53] mb-8">
            Let's build a website that drives real results for your Arizona business.
          </p>
          <Button
            to="/contact"
            size="lg"
            className="bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white hover:from-[#1A7C81] hover:to-[#0F6168]"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeProjectModal}>
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              ×
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Project Header */}
              <div className="relative h-64 bg-gradient-to-br from-[#C9F8F6] to-[#B5F3F0]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-lg opacity-90">{selectedProject.client}</p>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{selectedProject.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {selectedProject.results.map((result, index) => (
                          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-[#1A7C81] mb-2">
                              {result.improvement}
                            </div>
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {result.metric}
                            </div>
                            <div className="text-xs text-gray-600">
                              {result.description}
                            </div>
                          </div>
                        ))}
                      </div>

                      {selectedProject.challenges && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Challenges</h4>
                          <ul className="space-y-2">
                            {selectedProject.challenges.map((challenge, index) => (
                              <li key={index} className="flex items-start">
                                <Target className="w-4 h-4 text-[#3CBEC7] mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedProject.testimonial && (
                        <div className="bg-[#C9F8F6] rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            {[...Array(selectedProject.testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-[#3CBEC7] fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-700 italic mb-4">"{selectedProject.testimonial.text}"</p>
                          <div>
                            <div className="font-semibold text-gray-900">{selectedProject.testimonial.author}</div>
                            <div className="text-sm text-gray-600">{selectedProject.testimonial.role}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Project Details */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">Completed: {selectedProject.completionDate}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">Timeline: {selectedProject.timeline}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">{selectedProject.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Services Provided */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Services Provided</h4>
                      <div className="space-y-2">
                        {selectedProject.services.map((service, index) => (
                          <div key={index} className="flex items-center">
                            <Zap className="w-4 h-4 text-[#3CBEC7] mr-2" />
                            <span className="text-gray-600 text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#1A7C81] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0F6168] transition-colors duration-300 text-center"
                    >
                      <ExternalLink className="w-4 h-4 inline mr-2" />
                      Visit Live Site
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioPage;
