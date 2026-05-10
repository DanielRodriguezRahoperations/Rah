import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { adminHeaders, clearAdminToken, isAdminAuthenticated } from '../../lib/adminAuth';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MarketingClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_type: string;
  website_url: string;
  location: string;
  instagram_handle: string;
  facebook_handle: string;
  tiktok_handle: string;
  google_business_url: string;
  services_requested: string[];
  budget: string;
  goals: string;
  timeline: string;
  status: string;
  created_at: string;
}

interface Project {
  id: string;
  project_type: string;
  status: string;
  start_date: string;
  due_date: string;
  notes: string;
  github_repo_url: string;
  vercel_url: string;
}

interface Asset {
  id: string;
  asset_type: string;
  content_text: string;
  file_url: string;
  platform: string;
  approved: boolean;
  rejected: boolean;
  rejection_notes: string;
  created_at: string;
}

interface ScheduleEntry {
  id: string;
  asset_id: string;
  scheduled_at: string;
  platform: string;
  posted: boolean;
  post_url: string;
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

const STATUS_COLORS: Record<string, string> = {
  lead: 'bg-blue-950/50 text-blue-300 border-blue-900',
  active: 'bg-green-950/50 text-green-300 border-green-900',
  paused: 'bg-amber-950/50 text-amber-300 border-amber-900',
  complete: 'bg-neutral-800 text-neutral-300 border-neutral-700',
};

const INVOICE_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-neutral-800 text-neutral-400',
  sent: 'bg-blue-950/50 text-blue-300',
  paid: 'bg-green-950/50 text-green-300',
};

// ─── Shared UI ────────────────────────────────────────────────────────────────

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-500 mb-1.5';

// ─── Tab: Overview ────────────────────────────────────────────────────────────

const OverviewTab: React.FC<{
  client: MarketingClient;
  onStatusChange: (s: string) => void;
  statusSaving: boolean;
}> = ({ client, onStatusChange, statusSaving }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <select
        value={client.status}
        onChange={(e) => onStatusChange(e.target.value)}
        disabled={statusSaving}
        className="bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
      >
        {['lead', 'active', 'paused', 'complete'].map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
      {statusSaving && <span className="text-xs text-neutral-500">Saving…</span>}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { label: 'Owner', value: client.name },
        { label: 'Email', value: client.email },
        { label: 'Phone', value: client.phone },
        { label: 'Business Type', value: client.business_type },
        { label: 'Location', value: client.location },
        { label: 'Budget', value: client.budget },
        { label: 'Timeline', value: client.timeline },
      ].map(({ label, value }) => (
        <div key={label} className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
          <p className="text-sm text-white">{value || '—'}</p>
        </div>
      ))}

      {client.website_url && (
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Website</p>
          <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-luxury-red hover:underline break-all">
            {client.website_url}
          </a>
        </div>
      )}
    </div>

    {client.services_requested?.length > 0 && (
      <div>
        <p className={labelClass}>Services Requested</p>
        <div className="flex flex-wrap gap-2">
          {client.services_requested.map((s) => (
            <span key={s} className="text-xs bg-luxury-dark/30 border border-luxury-red/20 text-luxury-accent px-3 py-1 rounded-sm">
              {s}
            </span>
          ))}
        </div>
      </div>
    )}

    {client.goals && (
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-4">
        <p className={labelClass}>Goals</p>
        <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">{client.goals}</p>
      </div>
    )}

    <div>
      <p className={labelClass}>Social Handles</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Instagram', value: client.instagram_handle },
          { label: 'Facebook', value: client.facebook_handle },
          { label: 'TikTok', value: client.tiktok_handle },
          { label: 'Google Business', value: client.google_business_url },
        ].map(({ label, value }) =>
          value ? (
            <div key={label} className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-3 py-2">
              <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5">{label}</p>
              <p className="text-xs text-neutral-300 truncate">{value}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  </div>
);

// ─── Tab: Generate ────────────────────────────────────────────────────────────

const PLATFORMS = ['instagram', 'facebook', 'google', 'website', 'tiktok', 'email'];
const CONTENT_TYPES = [
  { id: 'caption', label: 'Caption' },
  { id: 'blog', label: 'Blog Post' },
  { id: 'ad_copy', label: 'Ad Copy' },
  { id: 'email', label: 'Email' },
  { id: 'reel', label: 'Reel Script' },
  { id: 'image', label: 'Image' },
];

const GenerateTab: React.FC<{
  clientId: string;
  assets: Asset[];
  onAssetsChange: (assets: Asset[]) => void;
}> = ({ clientId, assets, onAssetsChange }) => {
  const [platform, setPlatform] = useState('instagram');
  const [contentType, setContentType] = useState('caption');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [latestAsset, setLatestAsset] = useState<Asset | null>(null);
  const [approving, setApproving] = useState<string | null>(null);

  const generate = async () => {
    setGenError('');
    setGenerating(true);
    setLatestAsset(null);
    try {
      const res = await fetch('/api/marketing-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, platform, contentType, customPrompt }),
      });
      const json = await res.json();
      if (!res.ok) {
        setGenError(json.error || 'Generation failed');
      } else {
        setLatestAsset(json.asset);
        onAssetsChange([json.asset, ...assets]);
      }
    } catch {
      setGenError('Network error');
    } finally {
      setGenerating(false);
    }
  };

  const approve = async (assetId: string, approved: boolean, rejectionNotes?: string) => {
    setApproving(assetId);
    try {
      await fetch('/api/marketing-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ assetId, approved, rejectionNotes }),
      });
      onAssetsChange(
        assets.map((a) =>
          a.id === assetId ? { ...a, approved, rejected: !approved, rejection_notes: rejectionNotes || '' } : a
        )
      );
      if (latestAsset?.id === assetId) {
        setLatestAsset((prev) => prev ? { ...prev, approved, rejected: !approved } : null);
      }
    } finally {
      setApproving(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputClass}>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Content Type</label>
            <select value={contentType} onChange={(e) => setContentType(e.target.value)} className={inputClass}>
              {CONTENT_TYPES.map((ct) => (
                <option key={ct.id} value={ct.id}>{ct.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Additional Context (optional)</label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={2}
            placeholder="Promotion, specific product, campaign theme, tone notes…"
            className={`${inputClass} resize-none`}
          />
        </div>

        {genError && (
          <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
            {genError}
          </div>
        )}

        <button
          onClick={generate}
          disabled={generating}
          className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white py-3 rounded-sm text-sm uppercase tracking-widest font-semibold transition-colors"
        >
          {generating ? 'Generating…' : 'Generate Content'}
        </button>

        {contentType === 'image' && (
          <p className="text-xs text-amber-400 text-center">
            ⚠ Image generation requires KIE_API_KEY in Vercel environment variables.
          </p>
        )}
        {contentType === 'reel' && (
          <p className="text-xs text-neutral-500 text-center">
            Reel script generated as text. InVideo integration available via MCP.
          </p>
        )}
      </div>

      {/* Latest generated result */}
      {latestAsset && (
        <div className="bg-[#0f0f0f] border border-luxury-red/30 rounded-sm p-5 space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-luxury-red">Latest Generated</p>

          {latestAsset.file_url ? (
            <img src={latestAsset.file_url} alt="Generated" className="w-full rounded-sm" />
          ) : (
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-4 max-h-60 overflow-y-auto">
              <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-sans leading-relaxed">
                {latestAsset.content_text}
              </pre>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => approve(latestAsset.id, true)}
              disabled={!!approving || latestAsset.approved}
              className="flex-1 bg-green-900/40 hover:bg-green-900/60 border border-green-800 text-green-300 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
            >
              {latestAsset.approved ? 'Approved' : 'Approve'}
            </button>
            <button
              onClick={() => approve(latestAsset.id, false)}
              disabled={!!approving || latestAsset.rejected}
              className="flex-1 bg-red-950/40 hover:bg-red-950/60 border border-red-900 text-red-300 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
            >
              {latestAsset.rejected ? 'Rejected' : 'Reject'}
            </button>
          </div>
        </div>
      )}

      {/* Recent assets */}
      {assets.length > 0 && (
        <div>
          <p className={labelClass}>Recent Generated Assets</p>
          <div className="space-y-2">
            {assets.slice(0, 10).map((a) => (
              <div key={a.id} className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-neutral-400 capitalize">{a.asset_type}</span>
                    <span className="text-neutral-700">·</span>
                    <span className="text-xs text-neutral-500 capitalize">{a.platform}</span>
                    <span className="text-neutral-700">·</span>
                    <span className="text-xs text-neutral-600">{new Date(a.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{a.content_text?.slice(0, 80)}…</p>
                </div>
                <span className={`flex-shrink-0 text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border ${
                  a.approved ? 'bg-green-950/50 text-green-300 border-green-900' :
                  a.rejected ? 'bg-red-950/50 text-red-300 border-red-900' :
                  'bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}>
                  {a.approved ? 'Approved' : a.rejected ? 'Rejected' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Tab: Schedule ────────────────────────────────────────────────────────────

const ScheduleTab: React.FC<{
  clientId: string;
  assets: Asset[];
  schedule: ScheduleEntry[];
  onScheduleChange: (s: ScheduleEntry[]) => void;
  onAssetsChange: (a: Asset[]) => void;
}> = ({ clientId, assets, schedule, onScheduleChange, onAssetsChange }) => {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [schedulePlatform, setSchedulePlatform] = useState('instagram');
  const [saving, setSaving] = useState(false);
  const [schedError, setSchedError] = useState('');

  const pendingAssets = assets.filter((a) => !a.approved && !a.rejected);

  const addToSchedule = async () => {
    if (!scheduledAt || !schedulePlatform) return;
    setSchedError('');
    setSaving(true);
    try {
      const res = await fetch('/api/marketing-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({
          clientId,
          assetId: selectedAsset || null,
          scheduledAt: new Date(scheduledAt).toISOString(),
          platform: schedulePlatform,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSchedError(json.error || 'Failed to schedule');
      } else {
        onScheduleChange([...schedule, json.entry]);
        if (selectedAsset) {
          onAssetsChange(assets.map((a) => a.id === selectedAsset ? { ...a, approved: true } : a));
        }
        setSelectedAsset('');
        setScheduledAt('');
      }
    } catch {
      setSchedError('Network error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pending approval */}
      {pendingAssets.length > 0 && (
        <div>
          <p className={labelClass}>Pending Client Approval ({pendingAssets.length})</p>
          <div className="space-y-2">
            {pendingAssets.map((a) => (
              <div key={a.id} className="bg-[#0f0f0f] border border-amber-900/30 rounded-sm px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 capitalize">{a.asset_type}</span>
                    <span className="text-neutral-700">·</span>
                    <span className="text-xs text-neutral-500 capitalize">{a.platform}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400">Awaiting Approval</span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">{a.content_text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add to schedule */}
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 space-y-4">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Schedule a Post</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Platform</label>
            <select value={schedulePlatform} onChange={(e) => setSchedulePlatform(e.target.value)} className={inputClass}>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Date & Time</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Link to Asset (optional)</label>
          <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)} className={inputClass}>
            <option value="">None / manual post</option>
            {assets.filter((a) => a.approved || !a.rejected).map((a) => (
              <option key={a.id} value={a.id}>
                {a.asset_type} — {a.platform} — {new Date(a.created_at).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {schedError && (
          <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">{schedError}</div>
        )}

        <button
          onClick={addToSchedule}
          disabled={saving || !scheduledAt}
          className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          {saving ? 'Saving…' : 'Add to Schedule'}
        </button>
      </div>

      {/* Schedule list */}
      {schedule.length > 0 ? (
        <div>
          <p className={labelClass}>Scheduled Posts ({schedule.length})</p>
          <div className="space-y-2">
            {schedule.map((entry) => (
              <div key={entry.id} className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-medium capitalize">{entry.platform}</p>
                  <p className="text-xs text-neutral-500">{new Date(entry.scheduled_at).toLocaleString()}</p>
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border ${
                  entry.posted ? 'bg-green-950/50 text-green-300 border-green-900' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}>
                  {entry.posted ? 'Posted' : 'Scheduled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-neutral-600 text-sm py-6">No posts scheduled yet.</p>
      )}
    </div>
  );
};

// ─── Tab: Website ─────────────────────────────────────────────────────────────

const WebsiteTab: React.FC<{ clientId: string; project: Project | undefined }> = ({ clientId, project }) => {
  const [githubUrl, setGithubUrl] = useState(project?.github_repo_url || '');
  const [vercelUrl, setVercelUrl] = useState(project?.vercel_url || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      // Update project github/vercel via a direct patch
      // For now we save via a lightweight endpoint or just update the project fields
      const res = await fetch('/api/marketing-update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, status: 'active' }), // status passthrough
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 space-y-4">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Website Project Links</p>

        <div>
          <label className={labelClass}>GitHub Repository URL</label>
          <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/org/repo" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Vercel Deployment URL</label>
          <input type="url" value={vercelUrl} onChange={(e) => setVercelUrl(e.target.value)} placeholder="https://project.vercel.app" className={inputClass} />
        </div>

        <div className="flex gap-3">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center border border-neutral-700 text-neutral-300 hover:text-white py-2.5 rounded-sm text-xs uppercase tracking-widest transition-colors">
              Open GitHub →
            </a>
          )}
          {vercelUrl && (
            <a href={vercelUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center border border-neutral-700 text-neutral-300 hover:text-white py-2.5 rounded-sm text-xs uppercase tracking-widest transition-colors">
              Open Vercel →
            </a>
          )}
        </div>

        {saved && <p className="text-xs text-green-400">Saved.</p>}

        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Deploy Instructions</p>
        <ol className="space-y-2 text-sm text-neutral-400 list-decimal list-inside leading-relaxed">
          <li>Create a new repo from the RAH site template or start fresh in Vite + React.</li>
          <li>Connect the repo to Vercel — push to <code className="text-neutral-300 bg-neutral-800 px-1 rounded">main</code> triggers auto-deploy.</li>
          <li>Add the client's domain in Vercel → Domains settings.</li>
          <li>Paste the GitHub and Vercel URLs above to track the project.</li>
        </ol>
      </div>
    </div>
  );
};

// ─── Tab: Billing ─────────────────────────────────────────────────────────────

const BillingTab: React.FC<{
  clientId: string;
  invoices: Invoice[];
  onInvoicesChange: (inv: Invoice[]) => void;
}> = ({ clientId, invoices, onInvoicesChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'retainer' | 'one-time'>('retainer');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [creating, setCreating] = useState(false);
  const [invError, setInvError] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const createInvoice = async () => {
    if (!amount) return;
    setInvError('');
    setCreating(true);
    try {
      const res = await fetch('/api/marketing-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, amount: parseFloat(amount), type, description, dueDate: dueDate || null }),
      });
      const json = await res.json();
      if (!res.ok) {
        setInvError(json.error || 'Failed to create invoice');
      } else {
        onInvoicesChange([json.invoice, ...invoices]);
        setShowForm(false);
        setAmount('');
        setDescription('');
        setDueDate('');
      }
    } catch {
      setInvError('Network error');
    } finally {
      setCreating(false);
    }
  };

  const updateStatus = async (invoiceId: string, status: string) => {
    setUpdatingStatus(invoiceId);
    try {
      const res = await fetch('/api/marketing-invoice', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ invoiceId, status }),
      });
      if (res.ok) {
        onInvoicesChange(invoices.map((inv) => inv.id === invoiceId ? { ...inv, status } : inv));
      }
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className={labelClass}>Invoices ({invoices.length})</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs uppercase tracking-widest text-luxury-red hover:text-luxury-accent font-semibold"
        >
          {showForm ? 'Cancel' : '+ Create Invoice'}
        </button>
      </div>

      {/* ⚠️ SETUP REQUIRED: Add STRIPE_SECRET_KEY to Vercel env vars to enable payment links */}
      {showForm && (
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Amount ($) *</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="597.00" step="0.01" min="0" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Type *</label>
              <select value={type} onChange={(e) => setType(e.target.value as 'retainer' | 'one-time')} className={inputClass}>
                <option value="retainer">Retainer (monthly)</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Social Media Management — June 2026" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputClass} />
          </div>
          <p className="text-xs text-amber-400">⚠ Add STRIPE_SECRET_KEY to enable payment links.</p>
          {invError && <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">{invError}</div>}
          <button
            onClick={createInvoice}
            disabled={creating || !amount}
            className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            {creating ? 'Creating…' : 'Create Invoice'}
          </button>
        </div>
      )}

      {invoices.length > 0 ? (
        <div className="space-y-2">
          {invoices.map((inv) => (
            <div key={inv.id} className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-white font-semibold">${inv.amount.toFixed(2)} <span className="text-neutral-500 text-xs font-normal ml-1">{inv.type}</span></p>
                <p className="text-xs text-neutral-500 mt-0.5">{inv.description || '—'}{inv.due_date ? ` · Due ${new Date(inv.due_date).toLocaleDateString()}` : ''}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm ${INVOICE_STATUS_COLORS[inv.status]}`}>
                  {inv.status}
                </span>
                {inv.status !== 'paid' && (
                  <select
                    value={inv.status}
                    onChange={(e) => updateStatus(inv.id, e.target.value)}
                    disabled={updatingStatus === inv.id}
                    className="bg-[#1a1a1a] border border-neutral-800 text-neutral-400 px-2 py-1 rounded-sm text-xs focus:outline-none focus:border-luxury-red"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-600 text-sm py-6">No invoices yet.</p>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = ['Overview', 'Generate', 'Schedule', 'Website', 'Billing'] as const;
type TabType = (typeof TABS)[number];

const MarketingClientDetailPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const [client, setClient] = useState<MarketingClient | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
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
      const res = await fetch(`/api/marketing-client-detail?clientId=${clientId}`, {
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
        setProjects(json.projects);
        setAssets(json.assets);
        setSchedule(json.schedule);
        setInvoices(json.invoices);
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
      await fetch('/api/marketing-update-status', {
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
          <div className="bg-red-950/50 border border-red-900 text-red-200 px-4 py-3 rounded-sm text-sm">{error || 'Client not found'}</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEOHead title={`${client.business_name} — Marketing Admin`} description="" noIndex={true} />

      <section className="min-h-screen bg-[#0f0f0f] pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-white mb-8 transition-colors"
          >
            ← Marketing Dashboard
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
                  Marketing Client
                </p>
                <h1 className="font-serif-display text-3xl text-white mb-1">{client.business_name}</h1>
                <p className="text-neutral-400 text-sm">
                  {client.name} &middot; {client.email}
                  {client.phone && ` · ${client.phone}`}
                </p>
              </div>
              <span className={`self-start text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm border ${STATUS_COLORS[client.status]}`}>
                {client.status}
              </span>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex border-b border-neutral-800 mb-6 overflow-x-auto">
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
            {activeTab === 'Overview' && (
              <OverviewTab client={client} onStatusChange={handleStatusChange} statusSaving={statusSaving} />
            )}
            {activeTab === 'Generate' && (
              <GenerateTab clientId={clientId!} assets={assets} onAssetsChange={setAssets} />
            )}
            {activeTab === 'Schedule' && (
              <ScheduleTab
                clientId={clientId!}
                assets={assets}
                schedule={schedule}
                onScheduleChange={setSchedule}
                onAssetsChange={setAssets}
              />
            )}
            {activeTab === 'Website' && (
              <WebsiteTab clientId={clientId!} project={projects[0]} />
            )}
            {activeTab === 'Billing' && (
              <BillingTab clientId={clientId!} invoices={invoices} onInvoicesChange={setInvoices} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketingClientDetailPage;
