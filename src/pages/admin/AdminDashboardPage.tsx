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

// ─── Component ────────────────────────────────────────────────────────────────

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<'credit-repair' | 'marketing' | 'website'>('credit-repair');

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

  // SMS modal
  const [smsOpen, setSmsOpen] = useState(false);
  const [smsName, setSmsName] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsSending, setSmsSending] = useState(false);
  const [smsError, setSmsError] = useState('');
  const [smsSuccess, setSmsSuccess] = useState('');

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
  }, [mainTab]);

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

  const statusOptions = ['all', 'intake', 'analyzing', 'letters_drafted', 'letters_mailed', 'awaiting_response', 'in_progress', 'resolved', 'closed'];
  const mktgStatusOptions = ['all', 'lead', 'active', 'paused', 'complete'];
  const webStatusOptions = ['all', 'new', 'in_progress', 'complete', 'cancelled'];

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
                {mainTab === 'credit-repair' ? 'Credit Repair Clients' : mainTab === 'marketing' ? 'Marketing Clients' : 'Website Clients'}
              </h1>
            </div>
            <div className="flex items-center gap-3 self-start">
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
              <button
                onClick={handleLogout}
                className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:border-luxury-red px-4 py-2 rounded-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Main tabs */}
          <div className="flex border-b border-neutral-800 mb-6">
            {(['credit-repair', 'marketing', 'website'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMainTab(tab)}
                className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors border-b-2 -mb-px ${
                  mainTab === tab
                    ? 'border-luxury-red text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab === 'credit-repair' ? 'Credit Repair' : tab === 'marketing' ? 'Marketing' : 'Website'}
                {tab === 'credit-repair' && clients.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">
                    {clients.length}
                  </span>
                )}
                {tab === 'marketing' && mktgClients.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">
                    {mktgClients.length}
                  </span>
                )}
                {tab === 'website' && webClients.length > 0 && (
                  <span className="ml-2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-sm">
                    {webClients.length}
                  </span>
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
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
