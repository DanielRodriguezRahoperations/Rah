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
    { to: '/notary-services', label: 'Arizona Notary Services', eyebrow: 'Local support' },
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
    { to: '/portfolio', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsPortalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
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

  const isHomePage = location.pathname === '/';
  const isActiveRoute = (path: string) => location.pathname === path;
  const isServicesActive = () =>
    location.pathname === '/services' || serviceLinks.some((l) => location.pathname === l.to);
  const isPortalActive = () =>
    ['/portal', '/portal/dashboard', '/marketing/portal', '/marketing/portal/dashboard'].includes(
      location.pathname,
    );

  const navCls = (active: boolean) =>
    `relative px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-200 ${
      active ? 'text-[#F5F5F5]' : 'text-[#666666] hover:text-[#F5F5F5]'
    }`;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-400"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundColor: scrolled || !isHomePage ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled || !isHomePage ? 'blur(12px)' : 'none',
        borderBottom: scrolled || !isHomePage ? '1px solid #1A1A1A' : '1px solid transparent',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[64px]' : 'h-[72px]'}`}>

          {/* Logo */}
          <Link to="/" onClick={closeAllMenus} className="flex shrink-0 items-center" aria-label="RAH Operations">
            <img
              src="/newlogo.png"
              alt="RAH Operations"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-9' : 'h-10'}`}
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 lg:flex">
            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen((o) => !o)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className={`${navCls(isServicesActive())} flex items-center gap-1`}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${isServicesActive() ? 'w-full' : 'w-0'}`} />
              </button>

              <div
                onMouseLeave={() => setIsServicesOpen(false)}
                className={`absolute left-1/2 top-full mt-4 w-[720px] -translate-x-1/2 overflow-hidden border border-[#222222] bg-[#0D0D0D] shadow-[0_24px_60px_rgba(0,0,0,0.6)] transition-all duration-200 ${
                  isServicesOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
              >
                <div className="grid grid-cols-[0.75fr_1.65fr]">
                  {/* Left panel */}
                  <div className="relative overflow-hidden bg-[#111111] p-8">
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7A1C1C]/15 blur-3xl" />
                    <p className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7A1C1C]">Services</p>
                    <p className="relative mt-4 text-[22px] font-semibold leading-snug text-[#F5F5F5]">
                      Business infrastructure built for growth.
                    </p>
                    <p className="relative mt-4 text-[13px] leading-relaxed text-[#888888]">
                      Websites, SEO, reputation, credit, and more — built around your goals.
                    </p>
                    <Link
                      to="/services"
                      onClick={() => setIsServicesOpen(false)}
                      className="relative mt-8 inline-flex border border-[#333333] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#888888] transition-colors duration-200 hover:border-[#888888] hover:text-[#F5F5F5]"
                    >
                      All Services
                    </Link>
                  </div>

                  {/* Right panel */}
                  <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-px bg-[#222222]">
                      {serviceLinks.map((svc) => (
                        <Link
                          key={svc.to}
                          to={svc.to}
                          onClick={() => setIsServicesOpen(false)}
                          className={`group bg-[#0D0D0D] p-5 transition-colors duration-200 hover:bg-[#161616] ${location.pathname === svc.to ? 'bg-[#161616]' : ''}`}
                        >
                          <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-[#555555] group-hover:text-[#7A1C1C]">
                            {svc.eyebrow}
                          </span>
                          <span className="mt-2 block text-[13px] font-semibold leading-snug text-[#CCCCCC]">
                            {svc.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[#222222] bg-[#0A0A0A] px-5 py-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#444444]">Local:</span>
                      {locationLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsServicesOpen(false)}
                          className="text-[11px] font-medium text-[#666666] transition-colors duration-200 hover:text-[#F5F5F5]"
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
              <Link key={link.to} to={link.to} className={navCls(isActiveRoute(link.to))}>
                {link.label}
                <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${isActiveRoute(link.to) ? 'w-full' : 'w-0'}`} />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA cluster */}
          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            {/* Client Portal dropdown */}
            <div className="relative" ref={portalRef}>
              <button
                type="button"
                onClick={() => setIsPortalOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-200 border ${
                  isPortalActive()
                    ? 'border-[#555555] text-[#F5F5F5]'
                    : 'border-[#2A2A2A] text-[#666666] hover:border-[#444444] hover:text-[#F5F5F5]'
                }`}
                aria-expanded={isPortalOpen}
              >
                Client Portal
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isPortalOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-48 border border-[#222222] bg-[#111111] shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-200 ${
                  isPortalOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                }`}
              >
                <Link
                  to="/portal"
                  onClick={() => setIsPortalOpen(false)}
                  className="flex flex-col border-b border-[#222222] px-5 py-4 transition-colors hover:bg-[#1A1A1A]"
                >
                  <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.24em] text-[#555555]">Credit Repair</span>
                  <span className="text-[13px] font-semibold text-[#CCCCCC]">Repair Portal →</span>
                </Link>
                <Link
                  to="/marketing/portal"
                  onClick={() => setIsPortalOpen(false)}
                  className="flex flex-col px-5 py-4 transition-colors hover:bg-[#1A1A1A]"
                >
                  <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.24em] text-[#555555]">Marketing</span>
                  <span className="text-[13px] font-semibold text-[#CCCCCC]">Marketing Portal →</span>
                </Link>
              </div>
            </div>

            {/* Single CTA */}
            <Link
              to="/credit-repair/intake"
              className="border border-[#7A1C1C] bg-[#7A1C1C] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-opacity duration-200 hover:opacity-80 whitespace-nowrap"
            >
              Start Your Case
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#2A2A2A] bg-[#111111] text-[#888888] transition-colors duration-200 hover:bg-[#1A1A1A] hover:text-[#F5F5F5] lg:hidden"
            onClick={() => { setIsMenuOpen((o) => !o); setIsServicesOpen(false); setIsPortalOpen(false); }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed left-0 right-0 top-[64px] z-40 border-t border-[#1A1A1A] bg-[#0A0A0A] shadow-[0_24px_60px_rgba(0,0,0,0.6)] transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
        style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
      >
        <div className="px-5 py-5">
          <div className="mb-5 border border-[#1A1A1A] bg-[#111111] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A1C1C]">RAH Operations</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#888888]">
              Websites, marketing systems, and business automation for Arizona.
            </p>
          </div>

          <div className="space-y-0">
            {/* Services */}
            <button
              type="button"
              onClick={() => setIsServicesOpen((o) => !o)}
              className={`flex w-full items-center justify-between border-b border-[#1A1A1A] py-4 text-left text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                isServicesActive() ? 'text-[#F5F5F5]' : 'text-[#666666]'
              }`}
              aria-expanded={isServicesOpen}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="border-b border-[#1A1A1A] bg-[#111111]">
                {serviceLinks.map((svc) => (
                  <Link
                    key={svc.to}
                    to={svc.to}
                    onClick={closeAllMenus}
                    className={`block border-b border-[#1A1A1A] px-4 py-3 last:border-b-0 ${
                      location.pathname === svc.to ? 'text-[#F5F5F5]' : 'text-[#888888]'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#444444]">{svc.eyebrow}</span>
                    <span className="mt-1 block text-[13px]">{svc.label}</span>
                  </Link>
                ))}
                <Link
                  to="/services"
                  onClick={closeAllMenus}
                  className="block border border-[#333333] m-3 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]"
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
                className={`block border-b border-[#1A1A1A] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  isActiveRoute(link.to) ? 'text-[#F5F5F5]' : 'text-[#666666]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Client portals */}
            <div className="border-b border-[#1A1A1A] py-2">
              <p className="py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#444444]">Client Portals</p>
              <Link
                to="/portal"
                onClick={closeAllMenus}
                className="block py-2.5 text-[13px] font-semibold text-[#888888] transition-colors hover:text-[#F5F5F5]"
              >
                Credit Repair Portal →
              </Link>
              <Link
                to="/marketing/portal"
                onClick={closeAllMenus}
                className="block py-2.5 text-[13px] font-semibold text-[#888888] transition-colors hover:text-[#F5F5F5]"
              >
                Marketing Portal →
              </Link>
            </div>
          </div>

          {/* Mobile CTAs */}
          <div className="mt-6 grid gap-3">
            <a
              href="tel:+16236408884"
              onClick={closeAllMenus}
              className="border border-[#2A2A2A] bg-[#111111] px-5 py-4 text-center text-[13px] font-semibold text-[#888888]"
            >
              (623) 640-8884
            </a>
            <Link
              to="/credit-repair/intake"
              onClick={closeAllMenus}
              className="bg-[#7A1C1C] px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Start Your Case
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
