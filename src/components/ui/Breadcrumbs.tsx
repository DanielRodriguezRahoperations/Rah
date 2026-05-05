import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="border-b border-neutral-200 bg-cream-100" aria-label="Breadcrumb">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 py-2.5 overflow-x-auto scrollbar-none">
          <Link to="/" className="flex-shrink-0 text-neutral-400 hover:text-[#7a1c1c] transition-colors" aria-label="Home">
            <Home className="w-3.5 h-3.5" />
          </Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={name}>
                <ChevronRight className="w-3 h-3 flex-shrink-0 text-neutral-300" />
                {isLast ? (
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-600 capitalize whitespace-nowrap">
                    {name.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400 hover:text-[#7a1c1c] transition-colors capitalize whitespace-nowrap"
                  >
                    {name.replace(/-/g, ' ')}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
