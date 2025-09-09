import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Define custom labels for paths
  const pathLabels: Record<string, string> = {
    'services': 'Services',
    'website-design-and-seo': 'Website Design & SEO',
    'business-credit-and-funding': 'Business Credit & Funding',
    'digital-marketing': 'Digital Marketing',
    'new-business-setup': 'New Business Setup',
    'personal-credit-repair': 'Personal Credit Repair',
    'social-media-management': 'Social Media Management',
    'notary-services': 'Notary Services',
    'about': 'About Us',
    'blogs': 'Blog',
    'contact': 'Contact',
    'testimonials': 'Testimonials',
    'privacy-policy': 'Privacy Policy'
  };

  // Don't show breadcrumbs on homepage
  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    ...pathnames.map((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = pathLabels[pathname] || pathname.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return { label, path };
    })
  ];

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-3 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              {index === 0 && (
                <Home className="w-4 h-4 text-gray-500 mr-1" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-[#1A7C81] hover:text-[#0F6168] transition-colors"
                  title={`Go to ${breadcrumb.label}`}
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;