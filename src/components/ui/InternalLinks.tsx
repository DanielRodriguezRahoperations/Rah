import React from 'react';
import { Link } from 'react-router-dom';

interface LinkItem {
  text: string;
  url: string;
  title?: string;
  context?: string;
}

interface InternalLinksProps {
  links: LinkItem[];
  className?: string;
}

const InternalLinks: React.FC<InternalLinksProps> = ({ links, className = '' }) => {
  return (
    <span className={className}>
      {links.map((link, index) => (
        <span key={index}>
          <Link
            to={link.url}
            title={link.title}
            className="text-[#1A7C81] hover:text-[#3CBEC7] font-semibold transition-colors duration-300"
          >
            {link.text}
          </Link>
          {index < links.length - 1 && ', '}
        </span>
      ))}
    </span>
  );
};

export default InternalLinks;
