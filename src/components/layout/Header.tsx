import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
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

  const locationLinks = [
    { to: '/services/website-design-scottsdale', label: 'Website Design Scottsdale' },
    { to: '/services/website-design-phoenix', label: 'Website Design Phoenix' },
    { to: '/services/seo-scottsdale', label: 'SEO Scottsdale' },
    { to: '/services/seo-phoenix', label: 'SEO Phoenix' },
    { to: '/services/local-seo-scottsdale', label: 'Local SEO Scottsdale' },
    { to: '/services/local-seo-phoenix', label: 'Local SEO Phoenix' },
  ];

  const navLinks = [
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/case-studies', label: 'Case Studies' },
    { to: '/about', label: 'About' },
    { to: '/blogs', label: 'Insights' },
    { to: '/contact', label: 'Contact' }
  ];

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsPortalOpen(false);
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
      if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
        setIsPortalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  const isActiveRoute = (path: string) => location.pathname === path;

  const isServicesActive = () =>
    location.pathname === '/services' || serviceLinks.some((link) => location.pathname === link.to);

  const isPortalActive = () =>
    ['/portal', '/portal/dashboard', '/marketing/portal', '/marketing/portal/dashboard'].includes(location.pathname);

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
          {/* Logo */}
          <Link to="/" onClick={closeAllMenus} className="flex shrink-0 items-center" aria-label="RAH Operations Home">
            <img
              src="/newlogo.png"
              alt="RAH Operations Logo"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-11' : 'h-12'}`}
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen((o) => !o)}
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
                    <p className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d14b4b]">Services</p>
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
                  <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-px bg-neutral-200">
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.to}
                          to={service.to}
                          onClick={() => setIsServicesOpen(false)}
                          className={`group bg-[#fbfaf7] p-5 transition-colors duration-300 hover:bg-white ${location.pathname === service.to ? 'bg-white' : ''}`}
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
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-neutral-200 bg-[#f5f3f0] px-5 py-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">Local:</span>
                      {locationLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsServicesOpen(false)}
                          className="text-[11px] font-medium text-neutral-500 transition-colors duration-200 hover:text-[#7a1c1c]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard nav links */}
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={navClass(isActiveRoute(link.to))}>
                {link.label}
                <span className={`absolute bottom-0 left-0 h-px bg-neutral-950 transition-all duration-300 ${isActiveRoute(link.to) ? 'w-full' : 'w-0'}`} />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA cluster */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {/* Client Portal dropdown */}
            <div className="relative" ref={portalRef}>
              <button
                type="button"
                onClick={() => setIsPortalOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 border ${
                  isPortalActive()
                    ? 'border-neutral-950 text-neutral-950'
                    : 'border-neutral-300 text-neutral-500 hover:border-neutral-950 hover:text-neutral-950'
                }`}
                aria-expanded={isPortalOpen}
              >
                Client Portal
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isPortalOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-52 border border-neutral-200 bg-[#fbfaf7] shadow-[0_20px_60px_rgba(15,15,15,0.12)] transition-all duration-200 ${
                  isPortalOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                }`}
              >
                <Link
                  to="/portal"
                  onClick={() => setIsPortalOpen(false)}
                  className="flex flex-col px-5 py-4 border-b border-neutral-200 hover:bg-white transition-colors"
                >
                  <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-neutral-400 mb-1">Credit Repair</span>
                  <span className="text-sm font-semibold text-neutral-950">Repair Portal →</span>
                </Link>
                <Link
                  to="/marketing/portal"
                  onClick={() => setIsPortalOpen(false)}
                  className="flex flex-col px-5 py-4 hover:bg-white transition-colors"
                >
                  <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-neutral-400 mb-1">Marketing</span>
                  <span className="text-sm font-semibold text-neutral-950">Marketing Portal →</span>
                </Link>
              </div>
            </div>

            {/* Start Your Case */}
            <Link
              to="/credit-repair/intake"
              className="border border-[#7a1c1c] bg-[#7a1c1c] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#9d3f3f] hover:border-[#9d3f3f] whitespace-nowrap"
            >
              Start Your Case
            </Link>

            {/* Grow My Business */}
            <Link
              to="/marketing/intake"
              className="border border-neutral-950 bg-neutral-950 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-[#7a1c1c] hover:bg-[#7a1c1c] whitespace-nowrap"
            >
              Grow My Business
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-neutral-300 bg-[#fbfaf7] text-neutral-950 transition-colors duration-300 hover:bg-neutral-950 hover:text-white lg:hidden"
            onClick={() => { setIsMenuOpen((o) => !o); setIsServicesOpen(false); setIsPortalOpen(false); }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed left-0 right-0 top-[72px] z-40 border-t border-neutral-200 bg-[#fbfaf7] shadow-[0_30px_80px_rgba(15,15,15,0.14)] transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
        style={{ maxHeight: 'calc(100vh - 72px)', overflowY: 'auto' }}
      >
        <div className="px-5 py-5">
          <div className="mb-5 border border-neutral-200 bg-white p-5 shadow-[0_16px_45px_rgba(17,17,17,0.045)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7a1c1c]">RAH Operations</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Premium websites, SEO, digital marketing, and credit repair.
            </p>
          </div>

          <div className="space-y-1">
            {/* Services */}
            <button
              type="button"
              onClick={() => setIsServicesOpen((o) => !o)}
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
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400">{service.eyebrow}</span>
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

            {navLinks.map((link) => (
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

            {/* Client portals in mobile nav */}
            <div className="border-b border-neutral-200 py-2">
              <p className="py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">Client Portals</p>
              <Link
                to="/portal"
                onClick={closeAllMenus}
                className="block py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-950"
              >
                Credit Repair Portal →
              </Link>
              <Link
                to="/marketing/portal"
                onClick={closeAllMenus}
                className="block py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-950"
              >
                Marketing Portal →
              </Link>
            </div>
          </div>

          {/* Mobile CTA buttons */}
          <div className="mt-6 grid gap-3">
            <a
              href="tel:+16236408884"
              onClick={closeAllMenus}
              className="border border-neutral-300 bg-white px-5 py-4 text-center text-sm font-semibold text-neutral-950"
            >
              (623) 640-8884
            </a>
            <Link
              to="/credit-repair/intake"
              onClick={closeAllMenus}
              className="bg-[#7a1c1c] px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white"
            >
              Start Your Case — Credit Repair
            </Link>
            <Link
              to="/marketing/intake"
              onClick={closeAllMenus}
              className="bg-neutral-950 px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white"
            >
              Grow My Business — Marketing
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
