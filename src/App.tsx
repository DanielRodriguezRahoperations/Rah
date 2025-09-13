import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './components/ui/SEOHead';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from './config/site';
import { absoluteUrl } from './utils/url';
import Header from './components/layout/Header';
import Breadcrumbs from './components/ui/Breadcrumbs';
import Footer from './components/layout/Footer';
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

// Loading component
const PageLoader = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#97EDED] border-t-[#3CBEC7] rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#1A7C81] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
  </div>
);

// Page transition wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 50);
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="page-transition animate-in" style={{
      animation: 'fadeInUp 0.5s ease-out'
    }}>
      {children}
    </div>
  );
};

const SEOLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const canonical = absoluteUrl(location.pathname || "/");

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

// Performance monitor component
const PerformanceMonitor = () => {
  useEffect(() => {
    const preloadLinks = [
      '/Updated%20RAH%20LOGO%20with%20Correct%20Color%20scheme.png',
    ];

    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    });

    if (process.env.NODE_ENV === 'production') {
      // Add GA4 tracking code here
    }
  }, []);

  return null;
};

function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsAppReady(true);
      } catch (error) {
        console.warn('App initialization failed:', error);
        setIsAppReady(true);
      }
    };

    initializeApp();

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!isAppReady) {
    return <PageLoader />;
  }

  return (
    <HelmetProvider>
      <Router>
        <SEOLayout>
          <PerformanceMonitor />
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <Breadcrumbs />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                } />
                <Route path="/services" element={
                  <PageTransition>
                    <ServicesPage />
                  </PageTransition>
                } />
                <Route path="/website-design-and-seo" element={
                  <PageTransition>
                    <WebsiteDesignSEOPage />
                  </PageTransition>
                } />
                <Route path="/business-credit-and-funding" element={
                  <PageTransition>
                    <BusinessCreditPage />
                  </PageTransition>
                } />
                <Route path="/digital-marketing" element={
                  <PageTransition>
                    <DigitalMarketingPage />
                  </PageTransition>
                } />
                <Route path="/new-business-setup" element={
                  <PageTransition>
                    <NewBusinessSetupPage />
                  </PageTransition>
                } />
                <Route path="/personal-credit-repair" element={
                  <PageTransition>
                    <PersonalCreditPage />
                  </PageTransition>
                } />
                <Route path="/social-media-management" element={
                  <PageTransition>
                    <SocialMediaManagementPage />
                  </PageTransition>
                } />
                <Route path="/notary-services" element={
                  <PageTransition>
                    <NotaryServicesPage />
                  </PageTransition>
                } />
                <Route path="/about" element={
                  <PageTransition>
                    <AboutPage />
                  </PageTransition>
                } />
                <Route path="/blogs" element={
                  <PageTransition>
                    <BlogPage />
                  </PageTransition>
                } />
                <Route path="/contact" element={
                  <PageTransition>
                    <ContactPage />
                  </PageTransition>
                } />
                <Route path="/testimonials" element={
                  <PageTransition>
                    <TestimonialsPage />
                  </PageTransition>
                } />
                <Route path="/privacy-policy" element={
                  <PageTransition>
                    <PrivacyPolicyPage />
                  </PageTransition>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </SEOLayout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
