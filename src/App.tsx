import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import SEOHead from './components/ui/SEOHead';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from './config/site';
import { absoluteUrl } from './utils/url';

import Layout from './components/layout/Layout';

// HomePage stays eager — it's the most common landing page and sets LCP baseline
import HomePage from './pages/HomePage';

// Everything else is lazy-loaded so the initial bundle only contains what's needed
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const WebsiteDesignSEOPage = React.lazy(() => import('./pages/WebsiteDesignSEOPage'));
const BusinessCreditPage = React.lazy(() => import('./pages/BusinessCreditPage'));
const DigitalMarketingPage = React.lazy(() => import('./pages/DigitalMarketingPage'));
const NewBusinessSetupPage = React.lazy(() => import('./pages/NewBusinessSetupPage'));
const PersonalCreditPage = React.lazy(() => import('./pages/PersonalCreditPage'));
const SocialMediaManagementPage = React.lazy(() => import('./pages/SocialMediaManagementPage'));
const ReputationManagementPage = React.lazy(() => import('./pages/ReputationManagementPage'));
const NotaryServicesPage = React.lazy(() => import('./pages/NotaryServicesPage'));
const LLCSetupPage = React.lazy(() => import('./pages/LLCSetupPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const TestimonialsPage = React.lazy(() => import('./pages/TestimonialsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const CreditRepairIntakePage = React.lazy(() => import('./pages/CreditRepairIntakePage'));

const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const Tier1CustomsCaseStudy = React.lazy(() => import('./pages/case-studies/Tier1CustomsCaseStudy'));
const EverAfterEditCaseStudy = React.lazy(() => import('./pages/case-studies/EverAfterEditCaseStudy'));
const EmpireBuildsAzCaseStudy = React.lazy(() => import('./pages/case-studies/EmpireBuildsAzCaseStudy'));

const AdminLoginPage = React.lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminClientDetailPage = React.lazy(() => import('./pages/admin/AdminClientDetailPage'));
const MarketingClientDetailPage = React.lazy(() => import('./pages/admin/MarketingClientDetailPage'));
const WebsiteClientDetailPage = React.lazy(() => import('./pages/admin/WebsiteClientDetailPage'));

const PortalLoginPage = React.lazy(() => import('./pages/portal/PortalLoginPage'));
const PortalDashboardPage = React.lazy(() => import('./pages/portal/PortalDashboardPage'));

const WebsiteIntakePage = React.lazy(() => import('./pages/WebsiteIntakePage'));
const GetStartedPage = React.lazy(() => import('./pages/GetStartedPage'));
const WebsiteAuditPage = React.lazy(() => import('./pages/WebsiteAuditPage'));
const BookACallPage = React.lazy(() => import('./pages/BookACallPage'));

const MarketingIntakePage = React.lazy(() => import('./pages/marketing/MarketingIntakePage'));
const MarketingPortalLoginPage = React.lazy(() => import('./pages/marketing/MarketingPortalLoginPage'));
const MarketingPortalDashboardPage = React.lazy(() => import('./pages/marketing/MarketingPortalDashboardPage'));

const WebsiteDesignScottsdale = React.lazy(() => import('./pages/services/WebsiteDesignScottsdale'));
const WebsiteDesignPhoenix = React.lazy(() => import('./pages/services/WebsiteDesignPhoenix'));
const WebsiteDevelopmentScottsdale = React.lazy(() => import('./pages/services/WebsiteDevelopmentScottsdale'));
const WebsiteDevelopmentPhoenix = React.lazy(() => import('./pages/services/WebsiteDevelopmentPhoenix'));
const SeoScottsdale = React.lazy(() => import('./pages/services/SeoScottsdale'));
const SeoPhoenix = React.lazy(() => import('./pages/services/SeoPhoenix'));
const LocalSeoScottsdale = React.lazy(() => import('./pages/services/LocalSeoScottsdale'));
const LocalSeoPhoenix = React.lazy(() => import('./pages/services/LocalSeoPhoenix'));
const ReputationManagementScottsdale = React.lazy(() => import('./pages/services/ReputationManagementScottsdale'));
const ReputationManagementPhoenix = React.lazy(() => import('./pages/services/ReputationManagementPhoenix'));
const BusinessCreditScottsdale = React.lazy(() => import('./pages/services/BusinessCreditScottsdale'));
const BusinessCreditPhoenix = React.lazy(() => import('./pages/services/BusinessCreditPhoenix'));
const BusinessFundingArizona = React.lazy(() => import('./pages/services/BusinessFundingArizona'));
const DigitalMarketingScottsdale = React.lazy(() => import('./pages/services/DigitalMarketingScottsdale'));
const DigitalMarketingPhoenix = React.lazy(() => import('./pages/services/DigitalMarketingPhoenix'));
const LlcSetupScottsdale = React.lazy(() => import('./pages/services/LlcSetupScottsdale'));
const StartABusinessArizona = React.lazy(() => import('./pages/services/StartABusinessArizona'));
const CreditRepairScottsdale = React.lazy(() => import('./pages/services/CreditRepairScottsdale'));
const CreditRepairPhoenix = React.lazy(() => import('./pages/services/CreditRepairPhoenix'));
const GoogleBusinessProfileScottsdale = React.lazy(() => import('./pages/services/GoogleBusinessProfileScottsdale'));
const GoogleBusinessProfilePhoenix = React.lazy(() => import('./pages/services/GoogleBusinessProfilePhoenix'));
const SeoForContractorsPhoenix = React.lazy(() => import('./pages/services/SeoForContractorsPhoenix'));
const WebsiteDesignSmallBusinessScottsdale = React.lazy(() => import('./pages/services/WebsiteDesignSmallBusinessScottsdale'));

// Minimal dark fallback — matches site background to avoid flash
const PageShell = () => <div className="min-h-screen bg-[#0A0A0A]" />;

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
          <Suspense fallback={<PageShell />}>
            <Routes>
                {/* /blog → /blogs redirect */}
                <Route path="/blog" element={<Navigate to="/blogs" replace />} />

                {/* Admin — no public nav/footer */}
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/clients/:clientId" element={<AdminClientDetailPage />} />
                <Route path="/admin/marketing/:clientId" element={<MarketingClientDetailPage />} />
                <Route path="/admin/website/:clientId" element={<WebsiteClientDetailPage />} />

                {/* Credit Repair Portal — no public nav/footer */}
                <Route path="/portal" element={<PortalLoginPage />} />
                <Route path="/portal/login" element={<PortalLoginPage />} />
                <Route path="/portal/dashboard" element={<PortalDashboardPage />} />

                {/* Get Started page — Layout in component */}
                <Route path="/get-started" element={<GetStartedPage />} />

                {/* Intake forms — with public nav/footer via Layout in component */}
                <Route path="/website-intake" element={<WebsiteIntakePage />} />
                <Route path="/marketing/intake" element={<MarketingIntakePage />} />
                <Route path="/credit-repair/intake" element={<CreditRepairIntakePage />} />
                <Route path="/marketing/portal" element={<MarketingPortalLoginPage />} />
                <Route path="/marketing/portal/login" element={<MarketingPortalLoginPage />} />
                <Route path="/marketing/portal/dashboard" element={<MarketingPortalDashboardPage />} />

                {/* Public site — wrapped in Layout (nav + breadcrumbs + footer) */}
                <Route element={<Layout><Outlet /></Layout>}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/website-audit" element={<WebsiteAuditPage />} />
                  <Route path="/book-a-call" element={<BookACallPage />} />
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
                </Route>
              </Routes>
          </Suspense>
        </SEOLayout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
