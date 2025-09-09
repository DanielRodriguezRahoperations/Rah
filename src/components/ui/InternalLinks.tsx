import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface InternalLink {
  text: string;
  url: string;
  title: string;
  context: 'service' | 'location' | 'topic' | 'cta';
}

interface InternalLinksProps {
  links: InternalLink[];
  className?: string;
}

const InternalLinks: React.FC<InternalLinksProps> = ({ links, className = '' }) => {
  const getLinkClasses = (context: string) => {
    const baseClasses = 'transition-colors duration-200';
    
    switch (context) {
      case 'service':
        return `${baseClasses} text-[#1A7C81] hover:text-[#0F6168] font-medium underline decoration-2 underline-offset-2`;
      case 'location':
        return `${baseClasses} text-[#3CBEC7] hover:text-[#1A7C81] font-medium`;
      case 'topic':
        return `${baseClasses} text-gray-700 hover:text-[#1A7C81] underline decoration-1 underline-offset-2`;
      case 'cta':
        return `${baseClasses} bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white px-4 py-2 rounded-lg hover:from-[#1A7C81] hover:to-[#0F6168] font-semibold inline-flex items-center`;
      default:
        return `${baseClasses} text-[#1A7C81] hover:text-[#0F6168]`;
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {links.map((link, index) => (
        <div key={index} className="inline-block mr-4 mb-2">
          <Link
            to={link.url}
            className={getLinkClasses(link.context)}
            title={link.title}
          >
            {link.text}
            {link.context === 'cta' && <ExternalLink className="ml-2 w-4 h-4" />}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default InternalLinks;