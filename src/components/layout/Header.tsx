import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

type DropdownKey = 'webdesign' | 'marketing' | 'business' | 'portal' | null;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileExpandedSections, setMobileExpandedSections] = useState<Set<string>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const location = useLocation();

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpandedSections(new Set());
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node),
      );
      if (!isInAnyDropdown) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  const navCls = (active: boolean) =>
    `relative px-1 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-200 ${
      active ? 'text-[#F5F5F5]' : 'text-[#666666] hover:text-[#F5F5F5]'
    }`;

  const toggle = (key: DropdownKey) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  const dropdownCls = (visible: boolean) =>
    `absolute top-full mt-4 border border-[#222222] bg-[#0D0D0D] shadow-[0_24px_60px_rgba(0,0,0,0.6)] transition-all duration-200 ${
      visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
    }`;

  const isPortalActive = ['/portal', '/portal/dashboard', '/marketing/portal', '/marketing/portal/dashboard'].includes(location.pathname);
  const isWebDesignActive = location.pathname === '/website-design-and-seo';
  const isMarketingActive = ['/digital-marketing', '/social-media-management', '/reputation-management', '/services/google-business-profile-optimization-scottsdale'].includes(location.pathname);
  const isBusinessActive = ['/services', '/business-credit-and-funding', '/llc-setup', '/new-business-setup', '/notary-services'].includes(location.pathname);

  const toggleMobileSection = (key: string) => {
    setMobileExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      return next;
    });
  };

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
          <nav className="hidden items-center gap-2 lg:flex">

            {/* Website Design & SEO — direct link */}
            <Link to="/website-design-and-seo" className={navCls(isWebDesignActive)}>
              Web Design & SEO
              <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${isWebDesignActive ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* Digital Marketing — direct link */}
            <Link to="/digital-marketing" className={navCls(isMarketingActive)}>
              Digital Marketing
              <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${isMarketingActive ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* Credit Repair — direct link */}
            <Link to="/personal-credit-repair" className={navCls(location.pathname === '/personal-credit-repair')}>
              Credit Repair
              <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${location.pathname === '/personal-credit-repair' ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* Business Services dropdown */}
            <div
              className="relative"
              ref={(el) => { dropdownRefs.current.business = el; }}
            >
              <button
                type="button"
                onClick={() => toggle('business')}
                onMouseEnter={() => setOpenDropdown('business')}
                className={`${navCls(isBusinessActive)} flex items-center gap-1`}
                aria-expanded={openDropdown === 'business'}
              >
                Business Services
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === 'business' ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${isBusinessActive ? 'w-full' : 'w-0'}`} />
              </button>
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className={`${dropdownCls(openDropdown === 'business')} w-64 left-0`}
              >
                {[
                  { to: '/services', label: 'All Business Services', eyebrow: 'Overview' },
                  { to: '/business-credit-and-funding', label: 'Business Credit & Funding', eyebrow: 'Capital Readiness' },
                  { to: '/llc-setup', label: 'LLC Setup & Formation', eyebrow: 'Entity Structure' },
                  { to: '/new-business-setup', label: 'New Business Setup', eyebrow: 'Launch Structure' },
                  { to: '/notary-services', label: 'Notary Services', eyebrow: 'Local Support' },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpenDropdown(null)}
                    className="flex flex-col border-b border-[#1A1A1A] last:border-b-0 px-5 py-3.5 transition-colors hover:bg-[#161616]"
                  >
                    <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#555555] mb-1">{item.eyebrow}</span>
                    <span className="text-[13px] font-semibold text-[#CCCCCC]">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Work */}
            <Link to="/portfolio" className={navCls(location.pathname === '/portfolio')}>
              Work
              <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${location.pathname === '/portfolio' ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* About */}
            <Link to="/about" className={navCls(location.pathname === '/about')}>
              About
              <span className={`absolute bottom-0 left-0 h-px bg-[#F5F5F5] transition-all duration-200 ${location.pathname === '/about' ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* Free Audit accent link */}
            <Link
              to="/website-audit"
              className={`relative px-1 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-200 ${
                location.pathname === '/website-audit' ? 'text-luxury-accent' : 'text-luxury-light hover:text-luxury-accent'
              }`}
            >
              Audit →
              <span className={`absolute bottom-0 left-0 h-px bg-luxury-accent transition-all duration-200 ${location.pathname === '/website-audit' ? 'w-full' : 'w-0'}`} />
            </Link>
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            {/* Client Portal dropdown */}
            <div
              className="relative"
              ref={(el) => { dropdownRefs.current.portal = el; }}
            >
              <button
                type="button"
                onClick={() => toggle('portal')}
                className={`flex items-center gap-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 border ${
                  isPortalActive
                    ? 'border-[#555555] text-[#F5F5F5]'
                    : 'border-[#2A2A2A] text-[#666666] hover:border-[#444444] hover:text-[#F5F5F5]'
                }`}
                aria-expanded={openDropdown === 'portal'}
              >
                Client Portal
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === 'portal' ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`absolute right-0 top-full mt-2 w-48 border border-[#222222] bg-[#111111] shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-200 ${
                  openDropdown === 'portal' ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                }`}
              >
                <Link
                  to="/portal"
                  onClick={() => setOpenDropdown(null)}
                  className="flex flex-col border-b border-[#222222] px-5 py-4 transition-colors hover:bg-[#1A1A1A]"
                >
                  <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.24em] text-[#555555]">Credit Repair</span>
                  <span className="text-[13px] font-semibold text-[#CCCCCC]">Repair Portal →</span>
                </Link>
                <Link
                  to="/marketing/portal"
                  onClick={() => setOpenDropdown(null)}
                  className="flex flex-col px-5 py-4 transition-colors hover:bg-[#1A1A1A]"
                >
                  <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.24em] text-[#555555]">Marketing</span>
                  <span className="text-[13px] font-semibold text-[#CCCCCC]">Marketing Portal →</span>
                </Link>
              </div>
            </div>

            {/* Get Started CTA */}
            <Link
              to="/get-started"
              className="border border-[#7A1C1C] bg-[#7A1C1C] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity duration-200 hover:opacity-80 whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#2A2A2A] bg-[#111111] text-[#888888] transition-colors duration-200 hover:bg-[#1A1A1A] hover:text-[#F5F5F5] lg:hidden"
            onClick={() => { setIsMenuOpen((o) => !o); setOpenDropdown(null); }}
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
            {/* Website Design & SEO — direct */}
            <Link to="/website-design-and-seo" onClick={closeAllMenus} className="block border-b border-[#1A1A1A] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#666666]">
              Website Design & SEO
            </Link>

            {/* Digital Marketing — direct */}
            <Link to="/digital-marketing" onClick={closeAllMenus} className="block border-b border-[#1A1A1A] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#666666]">
              Digital Marketing
            </Link>

            {/* Credit Repair — direct */}
            <Link to="/personal-credit-repair" onClick={closeAllMenus} className="block border-b border-[#1A1A1A] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#666666]">
              Credit Repair
            </Link>

            {/* Business Services mobile */}
            <button
              type="button"
              onClick={() => toggleMobileSection('business')}
              className="flex w-full items-center justify-between border-b border-[#1A1A1A] py-4 text-left text-[12px] font-semibold uppercase tracking-[0.18em] text-[#666666] transition-colors"
            >
              Business Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpandedSections.has('business') ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpandedSections.has('business') && (
              <div className="border-b border-[#1A1A1A] bg-[#111111]">
                {[
                  { to: '/services', label: 'All Business Services' },
                  { to: '/business-credit-and-funding', label: 'Business Credit & Funding' },
                  { to: '/llc-setup', label: 'LLC Setup & Formation' },
                  { to: '/new-business-setup', label: 'New Business Setup' },
                  { to: '/notary-services', label: 'Notary Services' },
                ].map((item) => (
                  <Link key={item.to} to={item.to} onClick={closeAllMenus} className="block border-b border-[#1A1A1A] px-4 py-3 last:border-b-0 text-[13px] text-[#888888]">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/portfolio" onClick={closeAllMenus} className="block border-b border-[#1A1A1A] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#666666]">Work</Link>
            <Link to="/about" onClick={closeAllMenus} className="block border-b border-[#1A1A1A] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#666666]">About</Link>
            <Link to="/website-audit" onClick={closeAllMenus} className="block border-b border-[#1A1A1A] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9d3f3f]">Free Website Audit →</Link>

            {/* Client portals */}
            <div className="border-b border-[#1A1A1A] py-2">
              <p className="py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#444444]">Client Portals</p>
              <Link to="/portal" onClick={closeAllMenus} className="block py-2.5 text-[13px] font-semibold text-[#888888] transition-colors hover:text-[#F5F5F5]">Credit Repair Portal →</Link>
              <Link to="/marketing/portal" onClick={closeAllMenus} className="block py-2.5 text-[13px] font-semibold text-[#888888] transition-colors hover:text-[#F5F5F5]">Marketing Portal →</Link>
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
              to="/book-a-call"
              onClick={closeAllMenus}
              className="border border-luxury-red px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Book a Free Call
            </Link>
            <Link
              to="/get-started"
              onClick={closeAllMenus}
              className="bg-[#7A1C1C] px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
