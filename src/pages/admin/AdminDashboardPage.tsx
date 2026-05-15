import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { adminHeaders, clearAdminToken, isAdminAuthenticated } from '../../lib/adminAuth';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  address_verified: boolean | null;
  address_flag_notes: string | null;
}

interface MarketingClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_type: string;
  services_requested: string[];
  budget: string;
  status: string;
  created_at: string;
}

interface WebsiteClient {
  id: string;
  name: string;
  email: string;
  business_name: string;
  industry: string;
  budget: string;
  timeline: string;
  status: string;
  created_at: string;
}

interface BlogPost {
  title: string;
  displayTitle: string;
  date: string;
  issue: string;
  category: string;
  slug: string;
}

interface AuditLead {
  id: string;
  domain: string;
  name: string;
  email: string;
  phone: string | null;
  audit_score: number | null;
  audit_results: { grade?: string } | null;
  status: string;
  created_at: string;
}

// ─── Status color maps ────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  intake: 'bg-blue-950/50 text-blue-300 border-blue-900',
  analyzing: 'bg-amber-950/50 text-amber-300 border-amber-900',
  letters_drafted: 'bg-purple-950/50 text-purple-300 border-purple-900',
  letters_mailed: 'bg-indigo-950/50 text-indigo-300 border-indigo-900',
  awaiting_response: 'bg-cyan-950/50 text-cyan-300 border-cyan-900',
  in_progress: 'bg-orange-950/50 text-orange-300 border-orange-900',
  resolved: 'bg-green-950/50 text-green-300 border-green-900',
  closed: 'bg-neutral-800 text-neutral-300 border-neutral-700',
};

const MKTG_STATUS_COLORS: Record<string, string> = {
  lead: 'bg-blue-950/50 text-blue-300 border-blue-900',
  active: 'bg-green-950/50 text-green-300 border-green-900',
  paused: 'bg-amber-950/50 text-amber-300 border-amber-900',
  complete: 'bg-neutral-800 text-neutral-300 border-neutral-700',
};

const WEB_STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-950/50 text-blue-300 border-blue-900',
  in_progress: 'bg-amber-950/50 text-amber-300 border-amber-900',
  complete: 'bg-green-950/50 text-green-300 border-green-900',
  cancelled: 'bg-neutral-800 text-neutral-300 border-neutral-700',
};

const AUDIT_STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-950/50 text-blue-300 border-blue-900',
  contacted: 'bg-amber-950/50 text-amber-300 border-amber-900',
  converted: 'bg-green-950/50 text-green-300 border-green-900',
  closed: 'bg-neutral-800 text-neutral-300 border-neutral-700',
};

// ─── Component ────────────────────────────────────────────────────────────────

function auditScoreColor(score: number | null): string {
  if (score === null) return 'text-neutral-500';
  if (score >= 75) return 'text-green-400';
  if (score >= 60) return 'text-amber-400';
  return 'text-red-400';
}

function auditGrade(score: number | null): string {
  if (score === null) return '—';
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<'credit-repair' | 'marketing' | 'website' | 'audits' | 'blog'>('credit-repair');

  // Credit repair state
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Marketing state
  const [mktgClients, setMktgClients] = useState<MarketingClient[]>([]);
  const [mktgLoading, setMktgLoading] = useState(false);
  const [mktgError, setMktgError] = useState('');
  const [mktgSearch, setMktgSearch] = useState('');
  const [mktgFilter, setMktgFilter] = useState('all');

  // Website state
  const [webClients, setWebClients] = useState<WebsiteClient[]>([]);
  const [webLoading, setWebLoading] = useState(false);
  const [webError, setWebError] = useState('');
  const [webSearch, setWebSearch] = useState('');
  const [webFilter, setWebFilter] = useState('all');

  // Audit leads state
  const [auditLeads, setAuditLeads] = useState<AuditLead[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState('');
  const [auditSearch, setAuditSearch] = useState('');
  const [auditFilter, setAuditFilter] = useState('all');
  const [auditUpdating, setAuditUpdating] = useState<string | null>(null);

  // SMS modal
  const [smsOpen, setSmsOpen] = useState(false);
  const [smsName, setSmsName] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsSending, setSmsSending] = useState(false);
  const [smsError, setSmsError] = useState('');
  const [smsSuccess, setSmsSuccess] = useState('');

  // Blog posts tab state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogPostsLoading, setBlogPostsLoading] = useState(false);
  const [blogPostsError, setBlogPostsError] = useState('');
  const [fixImageState, setFixImageState] = useState<Record<string, 'idle' | 'loading' | 'ok' | 'err'>>({});

  // Blog generation
  const [blogGenerating, setBlogGenerating] = useState(false);
  const [blogResult, setBlogResult] = useState<{ title: string; url: string } | null>(null);
  const [blogError, setBlogError] = useState('');

  // Reel generation
  const [reelGenerating, setReelGenerating] = useState(false);
  const [reelResult, setReelResult] = useState<{ video_url: string; script: string } | null>(null);
  const [reelError, setReelError] = useState('');

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    fetchClients();
  }, [navigate]);

  // Fetch marketing clients when tab switches to marketing
  useEffect(() => {
    if (mainTab === 'marketing' && mktgClients.length === 0 && !mktgLoading) {
      fetchMarketingClients();
    }
    if (mainTab === 'website' && webClients.length === 0 && !webLoading) {
      fetchWebsiteClients();
    }
    if (mainTab === 'audits' && auditLeads.length === 0 && !auditLoading) {
      fetchAuditLeads();
    }
    if (mainTab === 'blog' && blogPosts.length === 0 && !blogPostsLoading) {
      fetchBlogPosts();
    }
  }, [mainTab]);

  const fetchBlogPosts = async () => {
    setBlogPostsLoading(true);
    setBlogPostsError('');
    try {
      const res = await fetch('/api/blog-posts', { headers: adminHeaders() });
      if (res.status === 401) { clearAdminToken(); navigate('/admin/login', { replace: true }); return; }
      const json = await res.json();
      if (!res.ok) { setBlogPostsError(json.error || 'Failed to load blog posts'); }
      else { setBlogPosts(json.posts || []); }
    } catch { setBlogPostsError('Network error'); }
    finally { setBlogPostsLoading(false); }
  };

  const handleFixImage = async (slug: string) => {
    setFixImageState((prev) => ({ ...prev, [slug]: 'loading' }));
    try {
      const res = await fetch('/api/fix-blog-image', {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setFixImageState((prev) => ({ ...prev, [slug]: 'ok' }));
    } catch {
      setFixImageState((prev) => ({ ...prev, [slug]: 'err' }));
    }
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/clients', { headers: adminHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to load clients');
      } else {
        setClients(json.clients || []);
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketingClients = async () => {
    setMktgLoading(true);
    setMktgError('');
    try {
      const res = await fetch('/api/marketing-clients', { headers: adminHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setMktgError(json.error || 'Failed to load marketing clients');
      } else {
        setMktgClients(json.clients || []);
      }
    } catch {
      setMktgError('Network error');
    } finally {
      setMktgLoading(false);
    }
  };

  const fetchWebsiteClients = async () => {
    setWebLoading(true);
    setWebError('');
    try {
      const res = await fetch('/api/website-clients', { headers: adminHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setWebError(json.error || 'Failed to load website clients');
      } else {
        setWebClients(json.clients || []);
      }
    } catch {
      setWebError('Network error');
    } finally {
      setWebLoading(false);
    }
  };

  const fetchAuditLeads = async () => {
    setAuditLoading(true);
    setAuditError('');
    try {
      const res = await fetch('/api/audit-leads', { headers: adminHeaders() });
      if (res.status === 401) { clearAdminToken(); navigate('/admin/login', { replace: true }); return; }
      const json = await res.json();
      if (!res.ok) { setAuditError(json.error || 'Failed to load audit leads'); }
      else { setAuditLeads(json.leads || []); }
    } catch { setAuditError('Network error'); }
    finally { setAuditLoading(false); }
  };

  const handleAuditStatusChange = async (leadId: string, status: string) => {
    setAuditUpdating(leadId);
    try {
      await fetch('/api/audit-update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ leadId, status }),
      });
      setAuditLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status } : l));
    } catch { /* silent */ }
    finally { setAuditUpdating(null); }
  };

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  const openSms = () => {
    setSmsName('');
    setSmsPhone('');
    setSmsError('');
    setSmsSuccess('');
    setSmsOpen(true);
  };

  const closeSms = () => {
    if (smsSending) return;
    setSmsOpen(false);
  };

  const handleSendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    setSmsError('');
    setSmsSuccess('');
    setSmsSending(true);
    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ name: smsName, phone: smsPhone }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSmsError(json.error || 'Failed to send message');
      } else {
        setSmsSuccess(`Text sent to ${smsName} at ${smsPhone}`);
      }
    } catch {
      setSmsError('Network error — check your connection');
    } finally {
      setSmsSending(false);
    }
  };

  const handleGenerateBlog = async () => {
    setBlogGenerating(true);
    setBlogResult(null);
    setBlogError('');
    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      });
      const json = await res.json();
      if (!res.ok) {
        setBlogError(json.error || 'Blog generation failed');
      } else if (json.success === false) {
        setBlogError(json.message || 'No topics remaining');
      } else {
        setBlogResult({ title: json.title, url: json.url });
      }
    } catch {
      setBlogError('Network error — check your connection');
    } finally {
      setBlogGenerating(false);
    }
  };

  const handleGenerateReel = async () => {
    setReelGenerating(true);
    setReelResult(null);
    setReelError('');
    try {
      const res = await fetch('/api/generate-reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      });
      const json = await res.json();
      if (!res.ok) {
        setReelError(json.error || 'Reel generation failed');
      } else {
        setReelResult({ video_url: json.video_url, script: json.script });
      }
    } catch {
      setReelError('Network error — check your connection');
    } finally {
      setReelGenerating(false);
    }
  };

  const filtered = clients.filter((c) => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.full_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q)
    );
  });

  const filteredMktg = mktgClients.filter((c) => {
    if (mktgFilter !== 'all' && c.status !== mktgFilter) return false;
    if (!mktgSearch) return true;
    const q = mktgSearch.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.business_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    );
  });

  const filteredWeb = webClients.filter((c) => {
    if (webFilter !== 'all' && c.status !== webFilter) return false;
    if (!webSearch) return true;
    const q = webSearch.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.business_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    );
  });

  const filteredAudits = auditLeads.filter((l) => {
    if (auditFilter !== 'all' && l.status !== auditFilter) return false;
    if (!auditSearch) return true;
    const q = auditSearch.toLowerCase();
    return (
      l.domain?.toLowerCase().includes(q) ||
      l.name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q)
    );
  });

  const statusOptions = ['all', 'intake', 'analyzing', 'letters_drafted', 'letters_mailed', 'awaiting_response', 'in_progress', 'resolved', 'closed'];
  const mktgStatusOptions = ['all', 'lead', 'active', 'paused', 'complete'];
  const webStatusOptions = ['all', 'new', 'in_progress', 'complete', 'cancelled'];
  const auditStatusOptions = ['all', 'new', 'contacted', 'converted', 'closed'];

  return (
    <>
      <SEOHead title="Admin Dashboard — RAH Operations" description="Restricted area." noIndex={true} />

      {/* SMS Modal */}
      {smsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          onClick={(e) => e.target === e.currentTarget && closeSms()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 bg-[#1a1a1a] border border-neutral-800 rounded-sm p-8 w-full max-w-md"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-1">
                  Send Intake Link
                </p>
                <h2 className="font-serif-display text-2xl text-white">Invite by Text</h2>
              </div>
              <button
                onClick={closeSms}
                disabled={smsSending}
                className="text-neutral-500 hover:text-white text-xl leading-none mt-1"
              >
                ×
              </button>
            </div>

            {smsSuccess ? (
              <div className="space-y-4">
                <div className="bg-green-950/50 border border-green-900 text-green-200 px-4 py-4 rounded-sm text-sm">
                  <p className="font-semibold mb-1">Message sent!</p>
                  <p>{smsSuccess}</p>
                </div>
                <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3 text-xs text-neutral-400 font-mono leading-relaxed">
                  &quot;Hi {smsName.trim().split(/\s+/)[0]}, Daniel from RAH Operations here. Ready to start your credit repair journey? Fill out your intake form here: rahoperations.com/credit-repair/intake - Questions? Call (623) 640-8884&quot;
                </div>
                <button
                  onClick={closeSms}
                  className="w-full bg-luxury-red hover:bg-luxury-light text-white py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendSms} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Recipient Name</label>
                  <input
                    type="text"
                    value={smsName}
                    onChange={(e) => setSmsName(e.target.value)}
                    required
                    disabled={smsSending}
                    placeholder="Jane Smith"
                    className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={smsPhone}
                    onChange={(e) => setSmsPhone(e.target.value)}
                    required
                    disabled={smsSending}
                    placeholder="(623) 555-0100"
                    className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                  />
                </div>

                {smsName && (
                  <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3 text-xs text-neutral-400 font-mono leading-relaxed">
                    &quot;Hi {smsName.trim().split(/\s+/)[0]}, Daniel from RAH Operations here. Ready to start your credit repair journey? Fill out your intake form here: rahoperations.com/credit-repair/intake - Questions? Call (623) 640-8884&quot;
                  </div>
                )}

                {smsError && (
                  <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
                    {smsError}
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={closeSms}
                    disabled={smsSending}
                    className="flex-1 border border-neutral-700 text-neutral-400 hover:text-white py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={smsSending || !smsName || !smsPhone}
                    className="flex-1 bg-luxury-red hover:bg-luxury-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    {smsSending ? 'Sending…' : 'Send Text'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      <section className="min-h-screen bg-[#0f0f0f] pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-2">
                Admin Dashboard
              </p>
              <h1 className="font-serif-display text-4xl text-white">
                {mainTab === 'credit-repair' ? 'Credit Repair Clients' : mainTab === 'marketing' ? 'Marketing Clients' : mainTab === 'website' ? 'Website Clients' : 'Audit Leads'}
              </h1>
            </div>
            <div className="flex items-center gap-3 self-start flex-wrap">
              <button
                onClick={handleGenerateBlog}
                disabled={blogGenerating}
                className="bg-[#1a3a1a] hover:bg-[#224422] border border-green-900 disabled:opacity-50 disabled:cursor-not-allowed text-green-300 px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
              >
                {blogGenerating && (
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {blogGenerating ? 'Generating…' : 'Generate Blog Post'}
              </button>

              <button
                onClick={handleGenerateReel}
                disabled={reelGenerating}
                style={{ backgroundColor: reelGenerating ? '#5a1111' : '#8B1E1E', borderColor: '#6b1818' }}
                className="hover:opacity-90 border disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-opacity flex items-center gap-2"
              >
                {reelGenerating && (
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {reelGenerating ? 'Generating Reel... this takes 2-5 minutes' : 'Generate Reel'}
              </button>

              {mainTab === 'credit-repair' && (
                <button
                  onClick={openSms}
                  className="bg-luxury-red hover:bg-luxury-light text-white px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Send Intake Link
                </button>
              )}
              {mainTab === 'marketing' && (
                <a
                  href="/marketing/intake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-luxury-red hover:bg-luxury-light text-white px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Marketing Intake Form →
                </a>
              )}
              {mainTab === 'website' && (
                <a
                  href="/website-intake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-luxury-red hover:bg-luxury-light text-white px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Website Intake Form →
                </a>
              )}
              {mainTab === 'audits' && (
                <button
                  onClick={fetchAuditLeads}
                  className="bg-luxury-red hover:bg-luxury-light text-white px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Refresh
                </button>
              )}
              <button
                onClick={handleLogout}
                className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:border-luxury-red px-4 py-2 rounded-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Blog generation result */}
          {blogResult && (
            <div className="bg-green-950/50 border border-green-900 text-green-200 px-5 py-4 rounded-sm mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-sm mb-1">
                  ✓ {blogResult.title} published! Live in ~60 seconds.
                </p>
                <p className="text-xs text-green-400">GMB + Instagram will post within 15 minutes.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a href={blogResult.url} target="_blank" rel="noopener noreferrer" className="text-xs underline underline-offset-2 hover:text-white">
                  View Post →
                </a>
                <button onClick={() => setBlogResult(null)} className="text-green-600 hover:text-white text-lg leading-none">×</button>
              </div>
            </div>
          )}
          {blogError && (
            <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-5 py-3 rounded-sm mb-6 flex items-center justify-between">
              <span>{blogError}</span>
              <button onClick={() => setBlogError('')} className="text-red-600 hover:text-white text-lg leading-none ml-4">×</button>
            </div>
          )}

          {/* Reel generation result */}
          {reelResult && (
            <div className="bg-[#2a0f0f] border border-[#6b1818] text-red-100 px-5 py-4 rounded-sm mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="font-semibold text-sm">Reel ready!</p>
                <button onClick={() => setReelResult(null)} className="text-[#6b1818] hover:text-white text-lg leading-none">×</button>
              </div>
              <a
                href={reelResult.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline underline-offset-2 hover:text-white break-all"
              >
                {reelResult.video_url}
              </a>
              <div className="mt-3 bg-black/30 border border-[#4a1010] rounded-sm px-4 py-3 text-xs text-red-200 leading-relaxed whitespace-pre-wrap font-mono">
                {reelResult.script}
              </div>
            </div>
          )}
          {reelError && (
            <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-5 py-3 rounded-sm mb-6 flex items-center justify-between">
              <span>{reelError}</span>
              <button onClick={() => setReelError('')} className="text-red-600 hover:text-white text-lg leading-none ml-4">×</button>
            </div>
          )}

          {/* Main tabs */}
          <div className="flex border-b border-neutral-800 mb-6 overflow-x-auto">
            {(['credit-repair', 'marketing', 'website', 'audits', 'blog'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMainTab(tab)}
                className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  mainTab === tab
                    ? 'border-luxury-red text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab === 'credit-repair' ? 'Credit Repair' : tab === 'marketing' ? 'Marketing' : tab === 'website' ? 'Website' : tab === 'audits' ? 'Audits' : 'Blog'}
                {tab === 'credit-repair' && clients.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">{clients.length}</span>
                )}
                {tab === 'marketing' && mktgClients.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">{mktgClients.length}</span>
                )}
                {tab === 'website' && webClients.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">{webClients.length}</span>
                )}
                {tab === 'audits' && auditLeads.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">{auditLeads.length}</span>
                )}
                {tab === 'blog' && blogPosts.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">{blogPosts.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* ── Credit Repair Tab ── */}
          {mainTab === 'credit-repair' && (
            <>
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-4 mb-6 flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or phone…"
                  className="flex-1 bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.replace(/_/g, ' ')}</option>
                  ))}
                </select>
                <button
                  onClick={fetchClients}
                  className="bg-luxury-red hover:bg-luxury-light text-white px-4 py-2 rounded-sm text-sm uppercase tracking-widest transition-colors"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="text-center py-20 text-neutral-500">Loading clients…</div>
              ) : error ? (
                <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">{error}</div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                  {clients.length === 0 ? 'No clients yet.' : 'No clients match your filters.'}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#0f0f0f] border-b border-neutral-800">
                        <tr className="text-left text-xs uppercase tracking-widest text-neutral-400">
                          <th className="px-5 py-4">Name</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Phone</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Address</th>
                          <th className="px-5 py-4">Submitted</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((c) => (
                          <tr key={c.id} className="border-b border-neutral-800/60 hover:bg-[#0f0f0f]/60 transition-colors">
                            <td className="px-5 py-4 text-white font-medium">{c.full_name}</td>
                            <td className="px-5 py-4 text-neutral-300">{c.email}</td>
                            <td className="px-5 py-4 text-neutral-300">{c.phone}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border ${STATUS_COLORS[c.status] || STATUS_COLORS.intake}`}>
                                {c.status?.replace(/_/g, ' ') || 'intake'}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {c.address_verified === true ? (
                                <span className="text-green-400 text-xs">Verified</span>
                              ) : c.address_verified === false ? (
                                <span className="text-amber-400 text-xs" title={c.address_flag_notes ?? ''}>Flagged</span>
                              ) : (
                                <span className="text-neutral-500 text-xs">—</span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-neutral-400 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                            <td className="px-5 py-4 text-right">
                              <Link to={`/admin/clients/${c.id}`} className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold">
                                View →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {!loading && clients.length > 0 && (
                <div className="mt-6 text-xs text-neutral-500 text-right">
                  Showing {filtered.length} of {clients.length} clients
                </div>
              )}
            </>
          )}

          {/* ── Marketing Tab ── */}
          {mainTab === 'marketing' && (
            <>
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-4 mb-6 flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={mktgSearch}
                  onChange={(e) => setMktgSearch(e.target.value)}
                  placeholder="Search by name, business, or email…"
                  className="flex-1 bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                />
                <select
                  value={mktgFilter}
                  onChange={(e) => setMktgFilter(e.target.value)}
                  className="bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                >
                  {mktgStatusOptions.map((s) => (
                    <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <button
                  onClick={fetchMarketingClients}
                  className="bg-luxury-red hover:bg-luxury-light text-white px-4 py-2 rounded-sm text-sm uppercase tracking-widest transition-colors"
                >
                  Refresh
                </button>
              </div>

              {mktgLoading ? (
                <div className="text-center py-20 text-neutral-500">Loading marketing clients…</div>
              ) : mktgError ? (
                <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">{mktgError}</div>
              ) : filteredMktg.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                  {mktgClients.length === 0 ? 'No marketing clients yet.' : 'No clients match your filters.'}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#0f0f0f] border-b border-neutral-800">
                        <tr className="text-left text-xs uppercase tracking-widest text-neutral-400">
                          <th className="px-5 py-4">Business</th>
                          <th className="px-5 py-4">Owner</th>
                          <th className="px-5 py-4">Services</th>
                          <th className="px-5 py-4">Budget</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Joined</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMktg.map((c) => (
                          <tr key={c.id} className="border-b border-neutral-800/60 hover:bg-[#0f0f0f]/60 transition-colors">
                            <td className="px-5 py-4">
                              <p className="text-white font-medium">{c.business_name}</p>
                              <p className="text-neutral-500 text-xs mt-0.5">{c.business_type}</p>
                            </td>
                            <td className="px-5 py-4">
                              <p className="text-neutral-300">{c.name}</p>
                              <p className="text-neutral-500 text-xs mt-0.5">{c.email}</p>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex flex-wrap gap-1">
                                {(c.services_requested || []).slice(0, 2).map((s) => (
                                  <span key={s} className="text-[10px] bg-luxury-dark/30 text-luxury-accent px-2 py-0.5 rounded-sm">
                                    {s}
                                  </span>
                                ))}
                                {(c.services_requested?.length || 0) > 2 && (
                                  <span className="text-[10px] text-neutral-500">+{c.services_requested.length - 2}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-neutral-300 text-xs">{c.budget || '—'}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border ${MKTG_STATUS_COLORS[c.status] || MKTG_STATUS_COLORS.lead}`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-neutral-400 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                            <td className="px-5 py-4 text-right">
                              <Link to={`/admin/marketing/${c.id}`} className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold">
                                View →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {!mktgLoading && mktgClients.length > 0 && (
                <div className="mt-6 text-xs text-neutral-500 text-right">
                  Showing {filteredMktg.length} of {mktgClients.length} clients
                </div>
              )}
            </>
          )}

          {/* ── Website Tab ── */}
          {mainTab === 'website' && (
            <>
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-4 mb-6 flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={webSearch}
                  onChange={(e) => setWebSearch(e.target.value)}
                  placeholder="Search by name, business, or email…"
                  className="flex-1 bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                />
                <select
                  value={webFilter}
                  onChange={(e) => setWebFilter(e.target.value)}
                  className="bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                >
                  {webStatusOptions.map((s) => (
                    <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
                  ))}
                </select>
                <button
                  onClick={fetchWebsiteClients}
                  className="bg-luxury-red hover:bg-luxury-light text-white px-4 py-2 rounded-sm text-sm uppercase tracking-widest transition-colors"
                >
                  Refresh
                </button>
              </div>

              {webLoading ? (
                <div className="text-center py-20 text-neutral-500">Loading website clients…</div>
              ) : webError ? (
                <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">{webError}</div>
              ) : filteredWeb.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                  {webClients.length === 0 ? 'No website clients yet.' : 'No clients match your filters.'}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#0f0f0f] border-b border-neutral-800">
                        <tr className="text-left text-xs uppercase tracking-widest text-neutral-400">
                          <th className="px-5 py-4">Business</th>
                          <th className="px-5 py-4">Owner</th>
                          <th className="px-5 py-4">Budget</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredWeb.map((c) => (
                          <tr key={c.id} className="border-b border-neutral-800/60 hover:bg-[#0f0f0f]/60 transition-colors">
                            <td className="px-5 py-4">
                              <p className="text-white font-medium">{c.business_name}</p>
                              <p className="text-neutral-500 text-xs mt-0.5">{c.industry}</p>
                            </td>
                            <td className="px-5 py-4">
                              <p className="text-neutral-300">{c.name}</p>
                              <p className="text-neutral-500 text-xs mt-0.5">{c.email}</p>
                            </td>
                            <td className="px-5 py-4 text-neutral-300 text-xs">{c.budget || '—'}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border ${WEB_STATUS_COLORS[c.status] || WEB_STATUS_COLORS.new}`}>
                                {c.status.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-neutral-400 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                            <td className="px-5 py-4 text-right">
                              <Link to={`/admin/website/${c.id}`} className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold">
                                View →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {!webLoading && webClients.length > 0 && (
                <div className="mt-6 text-xs text-neutral-500 text-right">
                  Showing {filteredWeb.length} of {webClients.length} clients
                </div>
              )}
            </>
          )}

          {/* ── Audits Tab ── */}
          {mainTab === 'audits' && (
            <>
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-4 mb-6 flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  placeholder="Search by domain, name, or email…"
                  className="flex-1 bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                />
                <select
                  value={auditFilter}
                  onChange={(e) => setAuditFilter(e.target.value)}
                  className="bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
                >
                  {auditStatusOptions.map((s) => (
                    <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <button
                  onClick={fetchAuditLeads}
                  className="bg-luxury-red hover:bg-luxury-light text-white px-4 py-2 rounded-sm text-sm uppercase tracking-widest transition-colors"
                >
                  Refresh
                </button>
              </div>

              {auditLoading ? (
                <div className="text-center py-20 text-neutral-500">Loading audit leads…</div>
              ) : auditError ? (
                <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">{auditError}</div>
              ) : filteredAudits.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                  {auditLeads.length === 0 ? 'No audit leads yet.' : 'No leads match your filters.'}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#0f0f0f] border-b border-neutral-800">
                        <tr className="text-left text-xs uppercase tracking-widest text-neutral-400">
                          <th className="px-5 py-4">Domain</th>
                          <th className="px-5 py-4">Name</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Score / Grade</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAudits.map((l) => {
                          const grade = auditGrade(l.audit_score);
                          return (
                            <tr key={l.id} className="border-b border-neutral-800/60 hover:bg-[#0f0f0f]/60 transition-colors">
                              <td className="px-5 py-4 text-white font-medium">{l.domain}</td>
                              <td className="px-5 py-4 text-neutral-300">{l.name}</td>
                              <td className="px-5 py-4 text-neutral-300">{l.email}</td>
                              <td className="px-5 py-4">
                                {l.audit_score !== null ? (
                                  <div className="flex items-center gap-2">
                                    <span className={`font-mono font-bold text-sm ${auditScoreColor(l.audit_score)}`}>
                                      {l.audit_score}
                                    </span>
                                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-sm border ${
                                      grade === 'A' || grade === 'B'
                                        ? 'bg-green-950/50 text-green-300 border-green-900'
                                        : grade === 'C'
                                        ? 'bg-amber-950/50 text-amber-300 border-amber-900'
                                        : 'bg-red-950/50 text-red-300 border-red-900'
                                    }`}>
                                      {grade}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-neutral-600 text-xs">—</span>
                                )}
                              </td>
                              <td className="px-5 py-4">
                                <select
                                  value={l.status}
                                  disabled={auditUpdating === l.id}
                                  onChange={(e) => handleAuditStatusChange(l.id, e.target.value)}
                                  className={`bg-transparent text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-sm border focus:outline-none focus:border-luxury-red cursor-pointer ${AUDIT_STATUS_COLORS[l.status] || AUDIT_STATUS_COLORS.new}`}
                                >
                                  {auditStatusOptions.filter(s => s !== 'all').map((s) => (
                                    <option key={s} value={s} className="bg-[#1a1a1a] text-white">{s}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-5 py-4 text-neutral-400 text-xs">{new Date(l.created_at).toLocaleDateString()}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {!auditLoading && auditLeads.length > 0 && (
                <div className="mt-6 text-xs text-neutral-500 text-right">
                  Showing {filteredAudits.length} of {auditLeads.length} leads
                </div>
              )}
            </>
          )}

          {/* ── Blog Tab ── */}
          {mainTab === 'blog' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-neutral-400">{blogPosts.length} published post{blogPosts.length !== 1 ? 's' : ''}</p>
                <button
                  onClick={fetchBlogPosts}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-sm text-xs uppercase tracking-widest transition-colors"
                >
                  Refresh
                </button>
              </div>

              {blogPostsLoading ? (
                <div className="text-center py-20 text-neutral-500">Loading posts…</div>
              ) : blogPostsError ? (
                <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">{blogPostsError}</div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">No posts found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-widest">
                        <th className="text-left py-3 px-4 font-medium">Issue</th>
                        <th className="text-left py-3 px-4 font-medium">Title</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-right py-3 px-4 font-medium">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post) => {
                        const state = fixImageState[post.slug] ?? 'idle';
                        return (
                          <tr key={post.slug} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                            <td className="py-3 px-4 text-neutral-500 text-xs whitespace-nowrap">{post.issue}</td>
                            <td className="py-3 px-4 text-white max-w-xs">
                              <a
                                href={`/blogs/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-luxury-accent transition-colors line-clamp-2"
                              >
                                {post.displayTitle || post.title}
                              </a>
                            </td>
                            <td className="py-3 px-4 text-neutral-400 whitespace-nowrap">{post.category}</td>
                            <td className="py-3 px-4 text-neutral-500 whitespace-nowrap text-xs">{post.date}</td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              {state === 'idle' && (
                                <button
                                  onClick={() => handleFixImage(post.slug)}
                                  className="text-xs px-3 py-1.5 rounded-sm border border-neutral-700 text-neutral-300 hover:border-luxury-red hover:text-white transition-colors"
                                >
                                  Fix Image
                                </button>
                              )}
                              {state === 'loading' && (
                                <span className="text-xs text-neutral-400 inline-flex items-center gap-1.5">
                                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                  </svg>
                                  Generating…
                                </span>
                              )}
                              {state === 'ok' && (
                                <span className="text-xs text-green-400 inline-flex items-center gap-1">
                                  ✓ Fixed
                                  <button
                                    onClick={() => setFixImageState((p) => ({ ...p, [post.slug]: 'idle' }))}
                                    className="ml-1 text-neutral-500 hover:text-white"
                                  >
                                    ×
                                  </button>
                                </span>
                              )}
                              {state === 'err' && (
                                <span className="text-xs text-red-400 inline-flex items-center gap-1">
                                  ✗ Failed
                                  <button
                                    onClick={() => setFixImageState((p) => ({ ...p, [post.slug]: 'idle' }))}
                                    className="ml-1 text-neutral-500 hover:text-white"
                                  >
                                    Retry
                                  </button>
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
