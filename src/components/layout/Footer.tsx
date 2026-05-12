import { Link } from 'react-router-dom';

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/blogs', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/rahoperations/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61574789296433' },
  { label: 'Google', href: 'https://share.google/l649HqItg69vKH5sb' },
];

const Footer = () => (
  <footer
    className="border-t border-[#1A1A1A] bg-[#0A0A0A] text-[#888888]"
    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
  >
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      {/* Three-column grid */}
      <div className="grid gap-10 sm:grid-cols-3">
        {/* Left — brand */}
        <div>
          <p className="mb-1 text-[14px] font-semibold text-[#E0E0E0]">RAH Operations</p>
          <p className="text-[13px]">Scottsdale, AZ</p>
          <div className="mt-5 space-y-1">
            <a
              href="tel:+16236408884"
              className="block text-[13px] transition-colors hover:text-[#F5F5F5]"
            >
              (623) 640-8884
            </a>
            <a
              href="mailto:daniel@rahoperations.com"
              className="block text-[13px] transition-colors hover:text-[#F5F5F5]"
            >
              daniel@rahoperations.com
            </a>
          </div>
        </div>

        {/* Center — nav */}
        <div className="flex flex-col gap-2.5">
          {NAV.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] transition-colors hover:text-[#F5F5F5]"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-[#1A1A1A] pt-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#3A3A3A]">Portals</p>
            <Link to="/portal" className="block text-[13px] transition-colors hover:text-[#F5F5F5]">
              Credit Repair Portal
            </Link>
            <Link to="/marketing/portal" className="block mt-1.5 text-[13px] transition-colors hover:text-[#F5F5F5]">
              Marketing Portal
            </Link>
          </div>
        </div>

        {/* Right — social */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#3A3A3A]">Follow</p>
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] transition-colors hover:text-[#F5F5F5]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col gap-3 border-t border-[#1A1A1A] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px]">© {new Date().getFullYear()} RAH Operations LLC</p>
        <div className="flex items-center gap-5 text-[12px]">
          <Link to="/privacy-policy" className="transition-colors hover:text-[#F5F5F5]">
            Privacy Policy
          </Link>
          <Link
            to="/admin/login"
            className="text-[#2A2A2A] transition-colors hover:text-[#555555]"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Design credit */}
      <p className="mt-6 text-center text-[11px]" style={{ opacity: 0.45 }}>
        Designed by{' '}
        <a
          href="https://www.rahoperations.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#F5F5F5]"
        >
          RAH Operations
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
