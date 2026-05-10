import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { SITE_CONFIG } from '../../config/site';

const MKTG_TOKEN_KEY = 'rah_mktg_portal_token';
const MKTG_CLIENT_KEY = 'rah_mktg_portal_client_id';

function mktgPortalHeaders(): Record<string, string> {
  const token = localStorage.getItem(MKTG_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortalClient {
  id: string;
  name: string;
  email: string;
  business_name: string;
  business_type: string;
  services_requested: string[];
  budget: string;
  goals: string;
  status: string;
  website_url: string;
}

interface Project {
  id: string;
  project_type: string;
  status: string;
  start_date: string;
  due_date: string;
}

interface PendingAsset {
  id: string;
  asset_type: string;
  content_text: string;
  file_url: string;
  platform: string;
  created_at: string;
}

interface UpcomingPost {
  id: string;
  scheduled_at: string;
  platform: string;
  asset_id: string;
}

interface Invoice {
  id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  due_date: string;
  created_at: string;
}

// ─── Status config ────────────────────────────────────────────────────────────

const PROJECT_STATUS_LABELS: Record<string, string> = {
  planning: 'In Planning',
  active: 'Active',
  review: 'In Review',
  complete: 'Complete',
  paused: 'Paused',
};

const INVOICE_STATUS_COLORS: Record<string, string> = {
  draft: 'text-neutral-400',
  sent: 'text-blue-400',
  paid: 'text-green-400',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ServiceStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    lead: 'bg-blue-950/50 text-blue-300 border-blue-900',
    active: 'bg-green-950/50 text-green-300 border-green-900',
    paused: 'bg-amber-950/50 text-amber-300 border-amber-900',
    complete: 'bg-neutral-800 text-neutral-400 border-neutral-700',
  };
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border ${colors[status] || colors.lead}`}>
      {status}
    </span>
  );
};

const AssetApprovalCard: React.FC<{
  asset: PendingAsset;
  onApprove: (id: string, approved: boolean, notes?: string) => Promise<void>;
}> = ({ asset, onApprove }) => {
  const [action, setAction] = useState<'idle' | 'approving' | 'rejecting'>('idle');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectNotes, setRejectNotes] = useState('');
  const [done, setDone] = useState(false);

  const handleApprove = async () => {
    setAction('approving');
    await onApprove(asset.id, true);
    setDone(true);
  };

  const handleReject = async () => {
    setAction('rejecting');
    await onApprove(asset.id, false, rejectNotes);
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-4 text-center text-sm text-neutral-500">
        Response recorded — thank you!
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-neutral-400 capitalize">{asset.asset_type}</span>
          <span className="text-neutral-700 mx-2">·</span>
          <span className="text-xs text-neutral-500 capitalize">{asset.platform}</span>
        </div>
        <span className="text-xs text-neutral-600">{new Date(asset.created_at).toLocaleDateString()}</span>
      </div>

      {asset.file_url ? (
        <img src={asset.file_url} alt="Generated content" className="w-full rounded-sm" />
      ) : (
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-4 max-h-48 overflow-y-auto">
          <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-sans leading-relaxed">
            {asset.content_text}
          </pre>
        </div>
      )}

      {showRejectForm ? (
        <div className="space-y-3">
          <textarea
            value={rejectNotes}
            onChange={(e) => setRejectNotes(e.target.value)}
            rows={3}
            placeholder="Tell us what to change…"
            className="w-full bg-[#1a1a1a] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red resize-none"
          />
          <div className="flex gap-3">
            <button
              onClick={() => setShowRejectForm(false)}
              className="flex-1 border border-neutral-700 text-neutral-400 py-2 rounded-sm text-xs uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              disabled={action === 'rejecting'}
              className="flex-1 bg-red-900/40 border border-red-800 text-red-300 py-2 rounded-sm text-xs uppercase tracking-widest disabled:opacity-50"
            >
              {action === 'rejecting' ? 'Sending…' : 'Send Feedback'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            disabled={action !== 'idle'}
            className="flex-1 bg-green-900/40 hover:bg-green-900/60 border border-green-800 text-green-300 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
          >
            {action === 'approving' ? 'Approving…' : 'Approve'}
          </button>
          <button
            onClick={() => setShowRejectForm(true)}
            disabled={action !== 'idle'}
            className="flex-1 border border-neutral-700 text-neutral-400 hover:text-white py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
          >
            Request Changes
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const MarketingPortalDashboardPage = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<PortalClient | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pendingAssets, setPendingAssets] = useState<PendingAsset[]>([]);
  const [upcomingPosts, setUpcomingPosts] = useState<UpcomingPost[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<'overview' | 'content' | 'schedule' | 'billing'>('overview');

  const logout = useCallback(() => {
    localStorage.removeItem(MKTG_TOKEN_KEY);
    localStorage.removeItem(MKTG_CLIENT_KEY);
    navigate('/marketing/portal', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem(MKTG_TOKEN_KEY);
    if (!token) {
      navigate('/marketing/portal', { replace: true });
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/marketing-portal-data', {
        headers: mktgPortalHeaders(),
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to load data');
      } else {
        setClient(json.client);
        setProjects(json.projects);
        setPendingAssets(json.pendingAssets);
        setUpcomingPosts(json.upcomingPosts);
        setInvoices(json.invoices);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAssetApproval = async (assetId: string, approved: boolean, notes?: string) => {
    await fetch('/api/marketing-portal-approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...mktgPortalHeaders() },
      body: JSON.stringify({ assetId, approved, rejectionNotes: notes }),
    });
    setPendingAssets((prev) => prev.filter((a) => a.id !== assetId));
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-neutral-500">Loading your portal…</p>
      </section>
    );
  }

  if (error || !client) {
    return (
      <section className="min-h-screen bg-[#0f0f0f] pt-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-950/50 border border-red-900 text-red-200 px-4 py-3 rounded-sm text-sm">{error || 'Failed to load portal'}</div>
          <button onClick={logout} className="mt-4 text-xs text-neutral-400 hover:text-white uppercase tracking-widest">Sign Out</button>
        </div>
      </section>
    );
  }

  const firstName = client.name.split(' ')[0];
  const NAV_ITEMS = [
    { key: 'overview', label: 'Overview' },
    { key: 'content', label: `Content${pendingAssets.length > 0 ? ` (${pendingAssets.length})` : ''}` },
    { key: 'schedule', label: 'Schedule' },
    { key: 'billing', label: 'Billing' },
  ] as const;

  return (
    <>
      <SEOHead
        title={`${client.business_name} Portal — RAH Operations`}
        description="Manage your marketing content and campaign."
        noIndex={true}
      />

      <section className="min-h-screen bg-[#0f0f0f] pt-20 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8 pt-4">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold">
                Client Portal
              </p>
              <p className="text-sm text-neutral-400 mt-0.5">
                {client.business_name}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-white border border-neutral-800 hover:border-luxury-red px-4 py-2 rounded-sm transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-serif-display text-3xl text-white mb-1">
              Hey, {firstName}.
            </h1>
            <div className="flex items-center gap-2">
              <ServiceStatusBadge status={client.status} />
              {client.services_requested?.length > 0 && (
                <span className="text-xs text-neutral-500">
                  {client.services_requested.length} service{client.services_requested.length !== 1 ? 's' : ''} active
                </span>
              )}
            </div>
          </motion.div>

          {/* Pending content banner */}
          {pendingAssets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-luxury-dark/20 border border-luxury-red/30 rounded-sm px-5 py-4 mb-6 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-white">{pendingAssets.length} item{pendingAssets.length !== 1 ? 's' : ''} waiting for your approval</p>
                <p className="text-xs text-neutral-400 mt-0.5">Review and approve your content before it goes live.</p>
              </div>
              <button
                onClick={() => setActiveSection('content')}
                className="text-xs uppercase tracking-widest text-luxury-red hover:text-luxury-accent font-semibold whitespace-nowrap ml-4"
              >
                Review →
              </button>
            </motion.div>
          )}

          {/* Nav */}
          <div className="flex border-b border-neutral-800 mb-6 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeSection === item.key
                    ? 'border-luxury-red text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Overview ─────────────────────────────────────────────── */}
          {activeSection === 'overview' && (
            <div className="space-y-5">
              {/* Services */}
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-5">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Your Services</p>
                {client.services_requested?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {client.services_requested.map((s) => (
                      <span key={s} className="text-xs bg-luxury-dark/30 border border-luxury-red/20 text-luxury-accent px-3 py-1.5 rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">Services being set up…</p>
                )}
              </div>

              {/* Projects */}
              {projects.length > 0 && (
                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-5">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Active Projects</p>
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div key={p.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white capitalize">{p.project_type.replace('-', ' ')}</p>
                          {p.due_date && (
                            <p className="text-xs text-neutral-500 mt-0.5">Due {new Date(p.due_date).toLocaleDateString()}</p>
                          )}
                        </div>
                        <span className="text-xs text-neutral-400 bg-neutral-800 px-3 py-1 rounded-sm">
                          {PROJECT_STATUS_LABELS[p.status] || p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Goals */}
              {client.goals && (
                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-5">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Your Goals</p>
                  <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">{client.goals}</p>
                </div>
              )}

              {/* Contact */}
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-5">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Questions?</p>
                <p className="text-sm text-neutral-400">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-luxury-red hover:underline">{SITE_CONFIG.email}</a>
                  {' '}or{' '}
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-luxury-red hover:underline">{SITE_CONFIG.phone}</a>
                </p>
              </div>
            </div>
          )}

          {/* ── Content Approval ──────────────────────────────────────── */}
          {activeSection === 'content' && (
            <div className="space-y-5">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Review each piece of content below. Approve it to schedule, or request changes and we'll revise.
              </p>
              {pendingAssets.length > 0 ? (
                pendingAssets.map((asset) => (
                  <AssetApprovalCard
                    key={asset.id}
                    asset={asset}
                    onApprove={handleAssetApproval}
                  />
                ))
              ) : (
                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-8 text-center">
                  <p className="text-neutral-500 text-sm">No content waiting for approval.</p>
                  <p className="text-neutral-600 text-xs mt-2">Check back soon — we'll notify you when new content is ready.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Schedule ─────────────────────────────────────────────── */}
          {activeSection === 'schedule' && (
            <div className="space-y-4">
              {upcomingPosts.length > 0 ? (
                <>
                  <p className="text-sm text-neutral-400">Upcoming posts scheduled for your accounts:</p>
                  {upcomingPosts.map((post) => (
                    <div key={post.id} className="bg-[#1a1a1a] border border-neutral-800 rounded-sm px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white capitalize font-medium">{post.platform}</p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {new Date(post.scheduled_at).toLocaleDateString('en-US', {
                            weekday: 'long', month: 'long', day: 'numeric',
                          })}{' '}
                          at{' '}
                          {new Date(post.scheduled_at).toLocaleTimeString('en-US', {
                            hour: 'numeric', minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 bg-neutral-800 px-2 py-1 rounded-sm">
                        Scheduled
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-8 text-center">
                  <p className="text-neutral-500 text-sm">No posts scheduled yet.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Billing ──────────────────────────────────────────────── */}
          {activeSection === 'billing' && (
            <div className="space-y-4">
              {invoices.length > 0 ? (
                invoices.map((inv) => (
                  <div key={inv.id} className="bg-[#1a1a1a] border border-neutral-800 rounded-sm px-5 py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold">
                        ${inv.amount.toFixed(2)}{' '}
                        <span className="text-neutral-500 font-normal text-sm">{inv.type}</span>
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {inv.description || '—'}
                        {inv.due_date ? ` · Due ${new Date(inv.due_date).toLocaleDateString()}` : ''}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-widest ${INVOICE_STATUS_COLORS[inv.status]}`}>
                      {inv.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-8 text-center">
                  <p className="text-neutral-500 text-sm">No invoices yet.</p>
                </div>
              )}

              <p className="text-xs text-neutral-600 text-center pt-2">
                Questions about billing?{' '}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-luxury-red hover:underline">
                  {SITE_CONFIG.email}
                </a>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MarketingPortalDashboardPage;
