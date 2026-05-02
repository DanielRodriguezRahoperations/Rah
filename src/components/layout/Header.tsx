import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const serviceLinks = [
    { to: '/website-design-and-seo', label: 'Website Design & SEO', eyebrow: 'Search-ready websites' },
    { to: '/digital-marketing', label: 'Digital Marketing', eyebrow: 'Growth strategy' },
    { to: '/social-media-management', label: 'Social Media Management', eyebrow: 'Brand visibility' },
    { to: '/reputation-management', label: 'Reputation Management', eyebrow: 'Trust building' },
    { to: '/business-credit-and-funding', label: 'Business Credit & Funding', eyebrow: 'Capital readiness' },
    { to: '/personal-credit-repair', label: 'Personal Credit Repair', eyebrow: 'Credit strategy' },
    { to: '/new-business-setup', label: 'New Business Setup', eyebrow: 'Launch structure' },
    { to: '/notary-services', label: 'Arizona Notary Services', eyebrow: 'Local support' }
  ];

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/case-studies', label: 'Case Studies' },
    { to: '/about', label: 'About' },
    { to: '/blogs', label: 'Insights' },
    { to: '/contact', label: 'Contact' }
  ];

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  const isActiveRoute = (path: string) => location.pathname === path;

  const isServicesActive = () => {
    return location.pathname === '/services' || serviceLinks.some((link) => location.pathname === link.to);
  };

  const navClass = (active: boolean) =>
    `relative px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
      active ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-neutral-200 bg-[#fbfaf7]/96 shadow-[0_14px_44px_rgba(15,15,15,0.06)] backdrop-blur-xl'
          : 'border-neutral-200/70 bg-[#fbfaf7]/92 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[72px]' : 'h-20'}`}>
          <Link to="/" onClick={closeAllMenus} className="flex shrink-0 items-center" aria-label="RAH Operations Home">
            <img
              src="/newlogo.png"
              alt="RAH Operations Logo"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-11' : 'h-12'}`}
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link to="/" className={navClass(isActiveRoute('/'))}>
              Home
              <span className={`absolute bottom-0 left-0 h-px bg-neutral-950 transition-all duration-300 ${isActiveRoute('/') ? 'w-full' : 'w-0'}`} />
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen((open) => !open)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className={`${navClass(isServicesActive())} flex items-center gap-1.5`}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px bg-neutral-950 transition-all duration-300 ${isServicesActive() ? 'w-full' : 'w-0'}`} />
              </button>

              <div
                onMouseLeave={() => setIsServicesOpen(false)}
                className={`absolute left-1/2 top-full mt-5 w-[760px] -translate-x-1/2 overflow-hidden border border-neutral-200 bg-[#fbfaf7] shadow-[0_34px_90px_rgba(15,15,15,0.16)] transition-all duration-300 ${
                  isServicesOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
              >
                <div className="grid grid-cols-[0.82fr_1.58fr]">
                  <div className="relative overflow-hidden bg-neutral-950 p-8 text-white">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#7a1c1c]/25 blur-3xl" />
                    <p className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d14b4b]">
                      Services
                    </p>

                    <p className="relative mt-5 text-3xl font-semibold leading-tight">
                      Business infrastructure built for credibility, visibility, and growth.
                    </p>

                    <p className="relative mt-5 text-sm leading-6 text-neutral-400">
                      Website design, SEO, reputation, credit, setup, and support services built around sharper business presentation.
                    </p>

                    <Link
                      to="/services"
                      onClick={() => setIsServicesOpen(false)}
                      className="relative mt-8 inline-flex border border-white/25 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-white hover:text-neutral-950"
                    >
                      View All Services
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-neutral-200">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.to}
                        to={service.to}
                        onClick={() => setIsServicesOpen(false)}
                        className={`group bg-[#fbfaf7] p-5 transition-colors duration-300 hover:bg-white ${
                          location.pathname === service.to ? 'bg-white' : ''
                        }`}
                      >
                        <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400 group-hover:text-[#7a1c1c]">
                          {service.eyebrow}
                        </span>
                        <span className="mt-2 block text-sm font-semibold leading-snug text-neutral-950">
                          {service.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link key={link.to} to={link.to} className={navClass(isActiveRoute(link.to))}>
                {link.label}
                <span className={`absolute bottom-0 left-0 h-px bg-neutral-950 transition-all duration-300 ${isActiveRoute(link.to) ? 'w-full' : 'w-0'}`} />
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center lg:flex">
            <Link
              to="/contact"
              className="border border-neutral-950 bg-neutral-950 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-[#7a1c1c] hover:bg-[#7a1c1c]"
            >
              Start a Project
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-neutral-300 bg-[#fbfaf7] text-neutral-950 transition-colors duration-300 hover:bg-neutral-950 hover:text-white lg:hidden"
            onClick={() => {
              setIsMenuOpen((open) => !open);
              setIsServicesOpen(false);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed left-0 right-0 top-[72px] z-40 border-t border-neutral-200 bg-[#fbfaf7] shadow-[0_30px_80px_rgba(15,15,15,0.14)] transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
        style={{ maxHeight: 'calc(100vh - 72px)', overflowY: 'auto' }}
      >
        <div className="px-5 py-5">
          <div className="mb-5 border border-neutral-200 bg-white p-5 shadow-[0_16px_45px_rgba(17,17,17,0.045)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7a1c1c]">
              RAH Operations
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Premium websites, SEO, and business growth infrastructure.
            </p>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={closeAllMenus}
              className={`block border-b border-neutral-200 py-4 text-sm font-semibold uppercase tracking-[0.18em] ${
                isActiveRoute('/') ? 'text-neutral-950' : 'text-neutral-500'
              }`}
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setIsServicesOpen((open) => !open)}
              className={`flex w-full items-center justify-between border-b border-neutral-200 py-4 text-left text-sm font-semibold uppercase tracking-[0.18em] ${
                isServicesActive() ? 'text-neutral-950' : 'text-neutral-500'
              }`}
              aria-expanded={isServicesOpen}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="border-b border-neutral-200 bg-white px-3 py-3">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.to}
                    to={service.to}
                    onClick={closeAllMenus}
                    className={`block border-b border-neutral-100 px-3 py-3 last:border-b-0 ${
                      location.pathname === service.to ? 'font-semibold text-neutral-950' : 'text-neutral-600'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      {service.eyebrow}
                    </span>
                    <span className="mt-1 block text-sm">{service.label}</span>
                  </Link>
                ))}

                <Link
                  to="/services"
                  onClick={closeAllMenus}
                  className="mt-3 block border border-neutral-950 bg-neutral-950 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white"
                >
                  View All Services
                </Link>
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeAllMenus}
                className={`block border-b border-neutral-200 py-4 text-sm font-semibold uppercase tracking-[0.18em] ${
                  isActiveRoute(link.to) ? 'text-neutral-950' : 'text-neutral-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            <a
              href="tel:+18884724621"
              onClick={closeAllMenus}
              className="border border-neutral-300 bg-white px-5 py-4 text-center text-sm font-semibold text-neutral-950"
            >
              (888) 472-4621
            </a>

            <Link
              to="/contact"
              onClick={closeAllMenus}
              className="bg-neutral-950 px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
