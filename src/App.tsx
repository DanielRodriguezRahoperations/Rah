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
import ReputationManagementPage from './pages/ReputationManagementPage';
import NotaryServicesPage from './pages/NotaryServicesPage';
import LLCSetupPage from './pages/LLCSetupPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import PortfolioPage from './pages/PortfolioPage';
import CreditRepairIntakePage from './pages/CreditRepairIntakePage';
import TestUploadPage from './pages/TestUploadPage';

import CaseStudiesPage from './pages/CaseStudiesPage';
import Tier1CustomsCaseStudy from './pages/case-studies/Tier1CustomsCaseStudy';
import EverAfterEditCaseStudy from './pages/case-studies/EverAfterEditCaseStudy';
import EmpireBuildsAzCaseStudy from './pages/case-studies/EmpireBuildsAzCaseStudy';

// SEO Service Location Pages
import WebsiteDesignScottsdale from './pages/services/WebsiteDesignScottsdale';
import WebsiteDesignPhoenix from './pages/services/WebsiteDesignPhoenix';
import WebsiteDevelopmentScottsdale from './pages/services/WebsiteDevelopmentScottsdale';
import WebsiteDevelopmentPhoenix from './pages/services/WebsiteDevelopmentPhoenix';
import SeoScottsdale from './pages/services/SeoScottsdale';
import SeoPhoenix from './pages/services/SeoPhoenix';
import LocalSeoScottsdale from './pages/services/LocalSeoScottsdale';
import LocalSeoPhoenix from './pages/services/LocalSeoPhoenix';
import ReputationManagementScottsdale from './pages/services/ReputationManagementScottsdale';
import ReputationManagementPhoenix from './pages/services/ReputationManagementPhoenix';
import BusinessCreditScottsdale from './pages/services/BusinessCreditScottsdale';
import BusinessCreditPhoenix from './pages/services/BusinessCreditPhoenix';
import BusinessFundingArizona from './pages/services/BusinessFundingArizona';
import DigitalMarketingScottsdale from './pages/services/DigitalMarketingScottsdale';
import DigitalMarketingPhoenix from './pages/services/DigitalMarketingPhoenix';
import LlcSetupScottsdale from './pages/services/LlcSetupScottsdale';
import StartABusinessArizona from './pages/services/StartABusinessArizona';
import CreditRepairScottsdale from './pages/services/CreditRepairScottsdale';
import CreditRepairPhoenix from './pages/services/CreditRepairPhoenix';
import GoogleBusinessProfileScottsdale from './pages/services/GoogleBusinessProfileScottsdale';
import GoogleBusinessProfilePhoenix from './pages/services/GoogleBusinessProfilePhoenix';
import SeoForContractorsPhoenix from './pages/services/SeoForContractorsPhoenix';
import WebsiteDesignSmallBusinessScottsdale from './pages/services/WebsiteDesignSmallBusinessScottsdale';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
};

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

const PerformanceMonitor = () => {
  useEffect(() => {
    const preloadLinks = ['/newlogo.png'];

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
      navigator.serviceWorker.register('/sw.js').catch(() => {});
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
              <Route path="/reputation-management" element={<ReputationManagementPage />} />
              <Route path="/notary-services" element={<NotaryServicesPage />} />
              <Route path="/llc-setup" element={<LLCSetupPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/tier-1-customs" element={<Tier1CustomsCaseStudy />} />
              <Route path="/case-studies/ever-after-edit" element={<EverAfterEditCaseStudy />} />
              <Route path="/case-studies/empire-builds-az" element={<EmpireBuildsAzCaseStudy />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/credit-repair/intake" element={<CreditRepairIntakePage />} />
              <Route path="/test-upload" element={<TestUploadPage />} />

              {/* SEO Service Location Pages */}
              <Route path="/services/website-design-scottsdale" element={<WebsiteDesignScottsdale />} />
              <Route path="/services/website-design-phoenix" element={<WebsiteDesignPhoenix />} />
              <Route path="/services/website-development-scottsdale" element={<WebsiteDevelopmentScottsdale />} />
              <Route path="/services/website-development-phoenix" element={<WebsiteDevelopmentPhoenix />} />
              <Route path="/services/seo-scottsdale" element={<SeoScottsdale />} />
              <Route path="/services/seo-phoenix" element={<SeoPhoenix />} />
              <Route path="/services/local-seo-scottsdale" element={<LocalSeoScottsdale />} />
              <Route path="/services/local-seo-phoenix" element={<LocalSeoPhoenix />} />
              <Route path="/services/reputation-management-scottsdale" element={<ReputationManagementScottsdale />} />
              <Route path="/services/reputation-management-phoenix" element={<ReputationManagementPhoenix />} />
              <Route path="/services/business-credit-scottsdale" element={<BusinessCreditScottsdale />} />
              <Route path="/services/business-credit-phoenix" element={<BusinessCreditPhoenix />} />
              <Route path="/services/business-funding-arizona" element={<BusinessFundingArizona />} />
              <Route path="/services/digital-marketing-scottsdale" element={<DigitalMarketingScottsdale />} />
              <Route path="/services/digital-marketing-phoenix" element={<DigitalMarketingPhoenix />} />
              <Route path="/services/llc-setup-scottsdale" element={<LlcSetupScottsdale />} />
              <Route path="/services/start-a-business-arizona" element={<StartABusinessArizona />} />
              <Route path="/services/credit-repair-scottsdale" element={<CreditRepairScottsdale />} />
              <Route path="/services/credit-repair-phoenix" element={<CreditRepairPhoenix />} />
              <Route path="/services/google-business-profile-optimization-scottsdale" element={<GoogleBusinessProfileScottsdale />} />
              <Route path="/services/google-business-profile-optimization-phoenix" element={<GoogleBusinessProfilePhoenix />} />
              <Route path="/services/seo-for-contractors-phoenix" element={<SeoForContractorsPhoenix />} />
              <Route path="/services/website-design-for-small-business-scottsdale" element={<WebsiteDesignSmallBusinessScottsdale />} />
            </Routes>
          </Layout>
        </SEOLayout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
