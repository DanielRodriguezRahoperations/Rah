import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import SEOHead from './components/ui/SEOHead';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from './config/site';
import { absoluteUrl } from './utils/url';

import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WebsiteDesignSEOPage from './pages/WebsiteDesignSEOPage';
import BusinessCreditPage from './pages/BusinessCreditPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import NewBusinessSetupPage from './pages/NewBusinessSetupPage';
import PersonalCreditPage from './pages/PersonalCreditPage';
import SocialMediaManagementPage from './pages/SocialMediaManagementPage';
import NotaryServicesPage from './pages/NotaryServicesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import PortfolioPage from './pages/PortfolioPage';

/* --------
   CLEAN SCROLL HANDLER
--------- */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
};

/* --------
   SEO WRAPPER
--------- */
const SEOLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const canonical = absoluteUrl(location.pathname || '/');

  return (
    <>
      <SEOHead
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        url={canonical}
        imageUrl={DEFAULT_OG_IMAGE}
      />
      {children}
    </>
  );
};

/* --------
   PERFORMANCE PRELOAD
--------- */
const PerformanceMonitor = () => {
  useEffect(() => {
    const preloadLinks = [
      '/logo.webp',
    ];

    preloadLinks.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {});
    }
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <SEOLayout>
          <PerformanceMonitor />
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/website-design-and-seo" element={<WebsiteDesignSEOPage />} />
              <Route path="/business-credit-and-funding" element={<BusinessCreditPage />} />
              <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
              <Route path="/new-business-setup" element={<NewBusinessSetupPage />} />
              <Route path="/personal-credit-repair" element={<PersonalCreditPage />} />
              <Route path="/social-media-management" element={<SocialMediaManagementPage />} />
              <Route path="/notary-services" element={<NotaryServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </Layout>
        </SEOLayout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
