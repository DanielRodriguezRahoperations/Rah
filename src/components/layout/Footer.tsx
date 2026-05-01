import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const services = [
    { to: '/website-design-and-seo', label: 'Website Design & SEO' },
    { to: '/digital-marketing', label: 'Digital Marketing' },
    { to: '/social-media-management', label: 'Social Media Management' },
    { to: '/business-credit-and-funding', label: 'Business Credit & Funding' },
    { to: '/personal-credit-repair', label: 'Personal Credit Repair' },
    { to: '/new-business-setup', label: 'New Business Setup' }
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
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              RAH Operations
            </p>

            <h2 className="mb-6 max-w-xl text-3xl font-semibold leading-tight text-white lg:text-4xl">
              Website design, SEO, and digital systems for serious business growth.
            </h2>

            <div className="space-y-2 text-sm text-neutral-400">
              <p>
                <a href="tel:+18884724621" className="hover:text-white">
                  (888) 472-4621
                </a>
              </p>
              <p>
                <a href="mailto:daniel@rahoperations.com" className="hover:text-white">
                  daniel@rahoperations.com
                </a>
              </p>
              <p>Scottsdale, Arizona</p>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              Services
            </p>

            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-neutral-400 hover:text-white">
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
                  <Link to={link.to} className="text-sm text-neutral-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-800 pt-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} RAH Operations. All rights reserved.</p>
          <p>Website Design & SEO Specialists</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export default Footer;
