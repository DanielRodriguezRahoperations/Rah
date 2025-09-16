import React from 'react';
import { ExternalLink, Globe, Code, Palette } from 'lucide-react';

// Define the structure of each portfolio item
interface PortfolioItem {
  id: number;
  title: string;
  url: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
}

const Portfolio: React.FC = () => {
  // Your portfolio websites data
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Empire Builds AZ",
      url: "https://www.empirebuildsaz.com",
      description: "Construction and building services company website showcasing projects and services",
      technologies: ["React", "Tailwind CSS", "Responsive Design"],
      category: "Business"
    },
    {
      id: 2,
      title: "Pinnacle Bookkeeping AZ",
      url: "https://www.pinnaclebookkeepingaz.com/",
      description: "Professional bookkeeping services website with client resources and service information",
      technologies: ["React", "TypeScript", "Modern UI"],
      category: "Finance"
    },
    {
      id: 3,
      title: "The Scottsdale Injector",
      url: "https://www.thescottsdaleinjector.com/",
      description: "Medical aesthetics and cosmetic injection services website",
      technologies: ["React", "Responsive Design", "SEO Optimized"],
      category: "Healthcare"
    },
    {
      id: 4,
      title: "SunVision Solar",
      url: "https://www.sunvision-solar.com/",
      description: "Solar energy solutions and installation services company website",
      technologies: ["React", "Interactive Design", "Performance Optimized"],
      category: "Energy"
    },
    {
      id: 5,
      title: "Daniel Rodriguez",
      url: "https://www.danielrodriguez.org/",
      description: "Personal website and professional portfolio",
      technologies: ["React", "TypeScript", "Clean Design"],
      category: "Personal"
    },
    {
      id: 6,
      title: "Daniel Rodriguez Scottsdale",
      url: "https://danielrodriguezscottsdale.carrd.co",
      description: "Landing page and contact information site",
      technologies: ["Carrd", "Single Page", "Mobile First"],
      category: "Personal"
    },
    {
      id: 7,
      title: "Knox Strats",
      url: "https://www.knoxstrats.com/",
      description: "Strategic consulting and business development services",
      technologies: ["React", "Professional Design", "Business Focused"],
      category: "Business"
    }
  ];

  // Group items by category
  const categories = Array.from(new Set(portfolioItems.map(item => item.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of websites I've designed and developed for various clients and projects
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{portfolioItems.length}</div>
            <div className="text-gray-600">Live Websites</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Code className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
            <div className="text-gray-600">Industries</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Palette className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Responsive Design</div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Placeholder for website preview - you can add screenshots later */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <Globe className="w-16 h-16 text-white opacity-50" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {item.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Visit Website Button */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Interested in working together? Let's connect!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
