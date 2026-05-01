import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';

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
    { to: '/about', label: 'About' },
    { to: '/blogs', label: 'Blog' },
    { to: '/testimonials', label: 'Reviews' },
    { to: '/contact', label: 'Contact' }
  ];

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
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (path: string) => location.pathname === path;

  const isServicesActive = () => {
    return location.pathname === '/services' || serviceLinks.some((link) => location.pathname === link.to);
  };

  const navClass = (active: boolean) =>
    `relative px-1 py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
      active ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-neutral-200 bg-white/95 shadow-[0_12px_40px_rgba(15,15,15,0.06)] backdrop-blur-xl'
          : 'border-neutral-100 bg-[#fbfaf7]/90 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-20' : 'h-24'}`}>
          <Link to="/" className="flex items-center" aria-label="RAH Operations Home">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.png"
                alt="RAH Operations Logo"
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-11' : 'h-14'}`}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.slice(0, 1).map((link) => (
              <Link key={link.to} to={link.to} className={navClass(isActiveRoute(link.to))}>
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-neutral-950 transition-all duration-300 ${
                    isActiveRoute(link.to) ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            ))}

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
                <span
                  className={`absolute bottom-0 left-0 h-px bg-neutral-950 transition-all duration-300 ${
                    isServicesActive() ? 'w-full' : 'w-0'
                  }`}
                />
              </button>

              <div
                onMouseLeave={() => setIsServicesOpen(false)}
                className={`absolute left-1/2 top-full mt-6 w-[620px] -translate-x-1/2 overflow-hidden border border-neutral-200 bg-[#fbfaf7] shadow-[0_30px_80px_rgba(15,15,15,0.14)] transition-all duration-300 ${
                  isServicesOpen
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 pointer-events-none opacity-0'
                }`}
              >
                <div className="grid grid-cols-[0.9fr_1.4fr]">
                  <div className="bg-neutral-950 p-8 text-white">
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-400">
                      RAH Operations
                    </p>
                    <p className="mt-4 text-2xl font-semibold leading-tight">
                      Strategy, visibility, and digital systems built to convert.
                    </p>
                    <Link
                      to="/services"
                      onClick={() => setIsServicesOpen(false)}
                      className="mt-8 inline-flex border border-white/25 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-neutral-950"
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
                        className={`bg-[#fbfaf7] p-5 transition-colors duration-300 hover:bg-white ${
                          location.pathname === service.to ? 'bg-white' : ''
                        }`}
                      >
                        <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400">
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
                <span
                  className={`absolute bottom-0 left-0 h-px bg-neutral-950 transition-all duration-300 ${
                    isActiveRoute(link.to) ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+18884724621"
              className="hidden items-center gap-2 text-sm font-medium text-neutral-500 transition-colors duration-300 hover:text-neutral-950 xl:flex"
            >
              <Phone className="h-4 w-4" />
              (888) 472-4621
            </a>

            <Link
              to="/contact"
              className="border border-neutral-950 bg-neutral-950 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-transparent hover:text-neutral-950"
            >
              Start a Project
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-neutral-200 bg-white text-neutral-950 transition-colors duration-300 hover:bg-neutral-950 hover:text-white lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed left-0 right-0 top-20 z-40 border-t border-neutral-200 bg-[#fbfaf7] shadow-[0_30px_80px_rgba(15,15,15,0.14)] transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 pointer-events-none opacity-0'
        }`}
        style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
      >
        <div className="px-5 py-6">
          <div className="space-y-1">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block border-b border-neutral-200 py-4 text-sm font-semibold uppercase tracking-[0.18em] ${
                  isActiveRoute(link.to) ? 'text-neutral-950' : 'text-neutral-500'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setIsServicesOpen((open) => !open)}
              className={`flex w-full items-center justify-between border-b border-neutral-200 py-4 text-left text-sm font-semibold uppercase tracking-[0.18em] ${
                isServicesActive() ? 'text-neutral-950' : 'text-neutral-500'
              }`}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="border-b border-neutral-200 py-3">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.to}
                    to={service.to}
                    className={`block px-4 py-3 text-sm ${
                      location.pathname === service.to ? 'font-semibold text-neutral-950' : 'text-neutral-600'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      {service.eyebrow}
                    </span>
                    <span className="mt-1 block">{service.label}</span>
                  </Link>
                ))}

                <Link
                  to="/services"
                  className="mt-2 block px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950"
                >
                  View All Services
                </Link>
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
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
              className="flex items-center justify-center gap-2 border border-neutral-300 px-5 py-4 text-sm font-semibold text-neutral-950"
            >
              <Phone className="h-4 w-4" />
              (888) 472-4621
            </a>

            <Link
              to="/contact"
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
