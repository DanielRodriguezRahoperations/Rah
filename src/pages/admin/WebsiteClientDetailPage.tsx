import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { adminHeaders, clearAdminToken, isAdminAuthenticated } from '../../lib/adminAuth';

// ─── Types ────────────────────────────────────────────────────────────────────

interface WebsiteClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  industry: string;
  target_customer: string;
  site_feeling: string;
  brands_they_love: string;
  brands_they_hate: string;
  has_logo: boolean;
  has_photos: boolean;
  has_copy: boolean;
  primary_goal: string;
  budget: string;
  timeline: string;
  additional_notes: string;
  status: string;
  created_at: string;
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-950/50 text-blue-300 border-blue-900',
  in_progress: 'bg-amber-950/50 text-amber-300 border-amber-900',
  complete: 'bg-green-950/50 text-green-300 border-green-900',
  cancelled: 'bg-neutral-800 text-neutral-300 border-neutral-700',
};

// ─── Shared UI helpers ────────────────────────────────────────────────────────

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-500 mb-1.5';

const Field: React.FC<{ label: string; value?: string | boolean | null }> = ({ label, value }) => (
  <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3">
    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
    <p className="text-sm text-white whitespace-pre-line">{value === true ? 'Yes' : value === false ? 'No' : (value as string) || '—'}</p>
  </div>
);

// ─── Tab: Overview ────────────────────────────────────────────────────────────

const OverviewTab: React.FC<{ client: WebsiteClient }> = ({ client }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Owner" value={client.name} />
      <Field label="Email" value={client.email} />
      <Field label="Phone" value={client.phone} />
      <Field label="Industry" value={client.industry} />
      <Field label="Budget" value={client.budget} />
      <Field label="Timeline" value={client.timeline} />
      <Field label="Has Logo" value={client.has_logo} />
      <Field label="Has Photos" value={client.has_photos} />
      <Field label="Has Copy" value={client.has_copy} />
      <Field label="Site Feeling" value={client.site_feeling} />
    </div>

    {client.primary_goal && (
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-4">
        <p className={labelClass}>Primary Goal</p>
        <p className="text-sm text-neutral-300 leading-relaxed">{client.primary_goal}</p>
      </div>
    )}

    {client.target_customer && (
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-4">
        <p className={labelClass}>Target Customer</p>
        <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">{client.target_customer}</p>
      </div>
    )}

    {client.brands_they_love && (
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-4">
        <p className={labelClass}>Brands They Love</p>
        <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">{client.brands_they_love}</p>
      </div>
    )}

    {client.brands_they_hate && (
      <div className="bg-[#0f0f0f] border border-luxury-red/20 rounded-sm px-4 py-4">
        <p className={labelClass}>Hard No's</p>
        <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">{client.brands_they_hate}</p>
      </div>
    )}

    {client.additional_notes && (
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-4">
        <p className={labelClass}>Additional Notes</p>
        <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">{client.additional_notes}</p>
      </div>
    )}
  </div>
);

// ─── Tab: Brief ───────────────────────────────────────────────────────────────

const BriefTab: React.FC<{ client: WebsiteClient }> = ({ client }) => {
  const [copied, setCopied] = useState(false);

  const brief = `New client website. Read ~/.claude/skills/design-director/SKILL.md then use this brief:

Business: ${client.business_name}
Industry: ${client.industry || '—'}
Target customer: ${client.target_customer || '—'}
Site feeling: ${client.site_feeling || '—'}
Primary goal: ${client.primary_goal || '—'}
Brands they love: ${client.brands_they_love || '—'}
Hard no's: ${client.brands_they_hate || '—'}
Has logo: ${client.has_logo ? 'Yes' : 'No'}
Has photos: ${client.has_photos ? 'Yes' : 'No'}
Has copy: ${client.has_copy ? 'Yes' : 'No'}
Budget: ${client.budget || '—'}
Timeline: ${client.timeline || '—'}
Notes: ${client.additional_notes || '—'}

Generate the design system, show it to me for approval, then build and push to GitHub.`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select the pre text
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className={labelClass}>Claude Code Prompt</p>
          <p className="text-xs text-neutral-600">Paste this into a new Claude Code session to kick off the build.</p>
        </div>
        <button
          onClick={copyBrief}
          className={`px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-all ${
            copied
              ? 'bg-green-900/40 border border-green-800 text-green-300'
              : 'bg-luxury-red hover:bg-luxury-light text-white'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy Brief'}
        </button>
      </div>

      <pre className="bg-[#0a0a0a] border border-neutral-800 rounded-sm p-5 text-xs text-neutral-300 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
        {brief}
      </pre>
    </div>
  );
};

// ─── Tab: Status ──────────────────────────────────────────────────────────────

const StatusTab: React.FC<{
  client: WebsiteClient;
  onStatusChange: (s: string) => void;
  statusSaving: boolean;
}> = ({ client, onStatusChange, statusSaving }) => (
  <div className="space-y-6">
    <div>
      <label className={labelClass}>Project Status</label>
      <select
        value={client.status}
        onChange={(e) => onStatusChange(e.target.value)}
        disabled={statusSaving}
        className={`${inputClass} max-w-xs`}
      >
        {['new', 'in_progress', 'complete', 'cancelled'].map((s) => (
          <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
        ))}
      </select>
      {statusSaving && <p className="mt-2 text-xs text-neutral-500">Saving…</p>}
    </div>

    <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 space-y-3">
      <p className={labelClass}>Project Info</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-neutral-500 text-xs mb-0.5">Submitted</p>
          <p className="text-white">{new Date(client.created_at).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs mb-0.5">Budget</p>
          <p className="text-white">{client.budget || '—'}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs mb-0.5">Timeline</p>
          <p className="text-white">{client.timeline || '—'}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs mb-0.5">Client Email</p>
          <a href={`mailto:${client.email}`} className="text-luxury-red hover:underline text-xs">{client.email}</a>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = ['Overview', 'Brief', 'Status'] as const;
type TabType = (typeof TABS)[number];

const WebsiteClientDetailPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const [client, setClient] = useState<WebsiteClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [statusSaving, setStatusSaving] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    if (!clientId) return;
    fetchClient();
  }, [clientId, navigate]);

  const fetchClient = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/website-client-detail?clientId=${clientId}`, {
        headers: adminHeaders(),
      });
      if (res.status === 401) {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to load client');
      } else {
        setClient(json.client);
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }, [clientId, navigate]);

  const handleStatusChange = async (newStatus: string) => {
    if (!client) return;
    setStatusSaving(true);
    try {
      await fetch('/api/website-update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, status: newStatus }),
      });
      setClient({ ...client, status: newStatus });
    } finally {
      setStatusSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f0f0f] pt-24 px-6 flex items-center justify-center">
        <p className="text-neutral-500">Loading…</p>
      </section>
    );
  }

  if (error || !client) {
    return (
      <section className="min-h-screen bg-[#0f0f0f] pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-950/50 border border-red-900 text-red-200 px-4 py-3 rounded-sm text-sm">
            {error || 'Client not found'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEOHead title={`${client.business_name} — Website Admin`} description="" noIndex={true} />

      <section className="min-h-screen bg-[#0f0f0f] pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-white mb-8 transition-colors"
          >
            ← Website Dashboard
          </Link>

          {/* Client header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-1">
                  Website Client
                </p>
                <h1 className="font-serif-display text-3xl text-white mb-1">{client.business_name}</h1>
                <p className="text-neutral-400 text-sm">
                  {client.name} &middot; {client.email}
                  {client.phone && ` · ${client.phone}`}
                </p>
              </div>
              <span className={`self-start text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm border ${STATUS_COLORS[client.status] || STATUS_COLORS.new}`}>
                {client.status.replace(/_/g, ' ')}
              </span>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex border-b border-neutral-800 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-luxury-red text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
            {activeTab === 'Overview' && <OverviewTab client={client} />}
            {activeTab === 'Brief' && <BriefTab client={client} />}
            {activeTab === 'Status' && (
              <StatusTab
                client={client}
                onStatusChange={handleStatusChange}
                statusSaving={statusSaving}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WebsiteClientDetailPage;
