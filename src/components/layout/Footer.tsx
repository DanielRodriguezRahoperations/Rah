import { Link } from 'react-router-dom';

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rahoperations/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61574789296433',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px]">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
      </svg>
    ),
  },
  {
    label: 'Google Business',
    href: 'https://share.google/l649HqItg69vKH5sb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px]">
        <path d="M21.805 10.023H12.18v3.954h5.507c-.237 1.246-.957 2.302-2.04 3.008v2.498h3.304c1.933-1.78 3.048-4.403 3.048-7.46 0-.513-.044-1.008-.194-2z" fill="#4285F4"/>
        <path d="M12.18 22c2.763 0 5.08-.916 6.772-2.517l-3.304-2.498c-.916.614-2.087.977-3.468.977-2.664 0-4.922-1.8-5.73-4.218H3.05v2.573A10.197 10.197 0 0 0 12.18 22z" fill="#34A853"/>
        <path d="M6.45 13.744a6.133 6.133 0 0 1 0-3.488V7.683H3.05a10.197 10.197 0 0 0 0 9.134l3.4-3.073z" fill="#FBBC05"/>
        <path d="M12.18 5.038c1.5 0 2.847.516 3.907 1.527l2.928-2.928C17.254 1.956 14.938 1 12.18 1A10.197 10.197 0 0 0 3.05 7.683l3.4 3.073c.808-2.418 3.066-4.218 5.73-4.218z" fill="#EA4335"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const services = [
    { to: '/website-design-and-seo', label: 'Website Design & SEO' },
    { to: '/digital-marketing', label: 'Digital Marketing' },
    { to: '/social-media-management', label: 'Social Media Management' },
    { to: '/business-credit-and-funding', label: 'Business Credit & Funding' },
    { to: '/personal-credit-repair', label: 'Personal Credit Repair' },
    { to: '/new-business-setup', label: 'New Business Setup' }
  ];

  const localServices = [
    { to: '/services/website-design-scottsdale', label: 'Website Design Scottsdale' },
    { to: '/services/website-design-phoenix', label: 'Website Design Phoenix' },
    { to: '/services/seo-scottsdale', label: 'SEO Scottsdale' },
    { to: '/services/seo-phoenix', label: 'SEO Phoenix' },
    { to: '/services/local-seo-scottsdale', label: 'Local SEO Scottsdale' },
    { to: '/services/local-seo-phoenix', label: 'Local SEO Phoenix' },
    { to: '/services/credit-repair-scottsdale', label: 'Credit Repair Scottsdale' },
    { to: '/services/credit-repair-phoenix', label: 'Credit Repair Phoenix' },
    { to: '/services/digital-marketing-scottsdale', label: 'Digital Marketing Scottsdale' },
    { to: '/services/digital-marketing-phoenix', label: 'Digital Marketing Phoenix' },
  ];

  const company = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/about', label: 'About' },
    { to: '/blogs', label: 'Blog' },
    { to: '/testimonials', label: 'Reviews' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy-policy', label: 'Privacy Policy' }
  ];

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-white">
      <div className="container-clean py-16 lg:py-20">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              RAH Operations
            </p>

            <h2 className="mb-6 max-w-xl text-3xl font-semibold leading-tight text-white lg:text-4xl">
              Website design, SEO, and digital systems for serious business growth.
            </h2>

            <div className="space-y-2 text-sm text-neutral-400 mb-8">
              <p>
                <a href="tel:+16236408884" className="hover:text-white transition-colors">
                  (623) 640-8884
                </a>
              </p>
              <p>
                <a href="mailto:daniel@rahoperations.com" className="hover:text-white transition-colors">
                  daniel@rahoperations.com
                </a>
              </p>
              <p>Scottsdale, Arizona</p>
            </div>

            {/* Social Icons */}
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-600">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-10 h-10 border border-neutral-700 text-neutral-400 hover:border-[#7a1c1c] hover:text-white hover:bg-[#7a1c1c]/10 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              Services
            </p>

            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              Local Services
            </p>

            <ul className="space-y-3">
              {localServices.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              Company
            </p>

            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-800 pt-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} RAH Operations LLC. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-neutral-600 hover:text-[#7a1c1c] transition-colors duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
