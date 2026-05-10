import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { SITE_CONFIG } from '../../config/site';
import { uploadFileToSignedUrl } from '../../utils/uploadFile';

const PORTAL_TOKEN_KEY = 'rah_portal_token';
const PORTAL_CLIENT_KEY = 'rah_portal_client_id';

interface PortalLetter {
  id: string;
  recipient_name: string;
  letter_type: string;
  created_at: string;
  tracking_log?: Array<{
    tracking_number?: string | null;
    date_mailed?: string | null;
    delivered_at?: string | null;
  }>;
}

interface PortalResponse {
  id: string;
  bureau: string;
  response_type: string;
  summary: string | null;
  received_at: string | null;
  created_at: string;
  file_path?: string | null;
  signedUrl?: string | null;
}

interface PortalData {
  client: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    status: string;
    created_at: string;
    goals?: string;
    timeline?: string;
    doc_ftc_report?: boolean;
    doc_police_report?: boolean;
  };
  letters: PortalLetter[];
  responses: PortalResponse[];
}

const STATUS_LABELS: Record<string, string> = {
  intake: 'Intake — Reviewing your file',
  analyzing: 'Analyzing — Extracting negative items from your reports',
  letters_drafted: 'Letters Drafted — Final review by your specialist',
  letters_mailed: 'Letters Mailed — In transit to bureaus / furnishers',
  awaiting_response: 'Awaiting Response — Statutory window in progress',
  in_progress: 'Active Disputes — Working items',
  resolved: 'Resolved — Items removed or corrected',
  closed: 'Closed',
};

const STAGES = [
  'intake',
  'analyzing',
  'letters_drafted',
  'letters_mailed',
  'awaiting_response',
  'in_progress',
  'resolved',
];

const PortalDashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem(PORTAL_TOKEN_KEY);
    if (!token) {
      navigate('/portal/login', { replace: true });
      return;
    }
    fetchData(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (token: string) => {
    try {
      const res = await fetch('/api/portal-data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem(PORTAL_TOKEN_KEY);
        localStorage.removeItem(PORTAL_CLIENT_KEY);
        navigate('/portal/login', { replace: true });
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to load portal');
      } else {
        setData(json);
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(PORTAL_TOKEN_KEY);
    localStorage.removeItem(PORTAL_CLIENT_KEY);
    navigate('/portal/login', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-neutral-400">
        Loading your case…
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-6">
        <p className="text-red-400 mb-4">{error || 'Unable to load your portal.'}</p>
        <button
          onClick={handleLogout}
          className="text-luxury-red hover:underline text-sm"
        >
          Return to login
        </button>
      </div>
    );
  }

  const { client, letters, responses } = data;
  const currentStageIdx = Math.max(0, STAGES.indexOf(client.status));
  const portalToken = localStorage.getItem(PORTAL_TOKEN_KEY) ?? '';

  return (
    <>
      <SEOHead title="My Portal — RAH Operations" description="Your credit repair case." noIndex={true} />
      <section className="min-h-screen bg-cream-50 pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-2">
                Client Portal
              </p>
              <h1 className="font-serif-display text-4xl text-slate-dark">
                Welcome, {client.full_name?.split(' ')[0]}
              </h1>
              <p className="text-neutral-600 text-sm mt-1">
                Case opened {new Date(client.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-luxury-red border border-neutral-300 hover:border-luxury-red px-4 py-2 rounded-sm transition-colors self-start"
            >
              Sign Out
            </button>
          </div>

          {/* Status hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-neutral-200 rounded-sm p-8 mb-8 shadow-sm"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-2">
              Current Status
            </p>
            <h2 className="font-serif-display text-2xl md:text-3xl text-slate-dark mb-6">
              {STATUS_LABELS[client.status] || client.status}
            </h2>

            {/* Progress bar */}
            <div className="relative">
              <div className="absolute top-3 left-0 right-0 h-px bg-neutral-200" />
              <div
                className="absolute top-3 left-0 h-px bg-luxury-red transition-all"
                style={{ width: `${(currentStageIdx / (STAGES.length - 1)) * 100}%` }}
              />
              <div className="relative flex justify-between">
                {STAGES.map((s, i) => (
                  <div key={s} className="flex flex-col items-center max-w-[14%]">
                    <div
                      className={`w-6 h-6 rounded-full border-2 ${
                        i <= currentStageIdx
                          ? 'bg-luxury-red border-luxury-red'
                          : 'bg-white border-neutral-300'
                      }`}
                    />
                    <p
                      className={`text-[9px] uppercase tracking-widest mt-2 text-center leading-tight ${
                        i <= currentStageIdx ? 'text-luxury-red font-semibold' : 'text-neutral-400'
                      }`}
                    >
                      {s.replace(/_/g, ' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Letters */}
          <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden mb-8 shadow-sm">
            <div className="px-6 py-5 border-b border-neutral-200">
              <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-1">
                Mailed Letters
              </p>
              <h3 className="font-serif-display text-2xl text-slate-dark">
                Dispute Letter Activity
              </h3>
            </div>
            {letters.length === 0 ? (
              <div className="p-10 text-center text-neutral-500 text-sm">
                Your specialist is preparing your dispute letters. You'll see them here once they're mailed.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-cream-100 border-b border-neutral-200">
                    <tr className="text-left text-xs uppercase tracking-widest text-neutral-500">
                      <th className="px-5 py-3">Recipient</th>
                      <th className="px-5 py-3">Letter Type</th>
                      <th className="px-5 py-3">Generated</th>
                      <th className="px-5 py-3">Tracking</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {letters.map((l) => {
                      const t = (l.tracking_log || [])[0];
                      let statusLabel = 'Drafted';
                      let statusColor = 'text-neutral-500';
                      if (t?.delivered_at) {
                        statusLabel = 'Delivered';
                        statusColor = 'text-green-600';
                      } else if (t?.tracking_number) {
                        statusLabel = 'In transit';
                        statusColor = 'text-amber-600';
                      } else if (t?.date_mailed) {
                        statusLabel = 'Mailed';
                        statusColor = 'text-blue-600';
                      }
                      return (
                        <tr key={l.id} className="border-b border-neutral-200/60">
                          <td className="px-5 py-4 text-slate-dark font-medium">
                            {l.recipient_name}
                          </td>
                          <td className="px-5 py-4 text-neutral-600 text-xs uppercase tracking-widest">
                            {l.letter_type}
                          </td>
                          <td className="px-5 py-4 text-neutral-600 text-xs">
                            {new Date(l.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-4 text-neutral-600 text-xs font-mono">
                            {t?.tracking_number || '—'}
                          </td>
                          <td className={`px-5 py-4 text-xs font-semibold ${statusColor}`}>
                            {statusLabel}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Upload missing documents */}
          <PortalDocUpload
            token={portalToken}
            hasFtc={!!client.doc_ftc_report}
            hasPolice={!!client.doc_police_report}
            onRefresh={() => fetchData(portalToken)}
          />

          {/* Bureau responses + response upload */}
          <PortalResponseSection
            token={portalToken}
            responses={responses}
            onRefresh={() => fetchData(portalToken)}
          />

          {/* Help footer */}
          <div className="bg-luxury-red text-white rounded-sm p-6 text-center">
            <p className="font-serif-display text-xl mb-2">Need to talk to your specialist?</p>
            <p className="text-sm text-white/80 mb-4">
              Call us, email us, or reply to any letter notification.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href={`tel:${SITE_CONFIG.phoneTel}`} className="font-semibold hover:underline">
                {SITE_CONFIG.phone}
              </a>
              <span className="text-white/40">·</span>
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold hover:underline">
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ===================== Sub-components =====================

const PORTAL_DOC_TYPES = [
  { value: 'ftc-report',    label: 'FTC Identity Theft Report', required: true },
  { value: 'police-report', label: 'Police Report',              required: false },
  { value: 'misc',          label: 'Additional Supporting Document', required: false },
] as const;

type PortalDocType = 'ftc-report' | 'police-report' | 'misc';

function PortalDocUpload({
  token,
  hasFtc,
  hasPolice,
  onRefresh,
}: {
  token: string;
  hasFtc: boolean;
  hasPolice: boolean;
  onRefresh: () => void;
}) {
  const [docType, setDocType] = useState<PortalDocType>(!hasFtc ? 'ftc-report' : 'misc');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const doUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError('');
    setSuccess('');
    try {
      const ext = file.name.split('.').pop() || 'bin';
      const urlRes = await fetch(
        `/api/portal-upload?kind=doc&docType=${docType}&ext=${encodeURIComponent(ext)}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!urlRes.ok) throw new Error((await urlRes.json()).error || 'Could not get upload URL');
      const { signedUrl, path } = await urlRes.json();

      await uploadFileToSignedUrl(signedUrl, file, setProgress);

      const postRes = await fetch('/api/portal-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind: 'doc', docType, path, filename: file.name }),
      });
      if (!postRes.ok) throw new Error((await postRes.json()).error || 'Failed to record upload');

      setSuccess('Document uploaded successfully.');
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      onRefresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-sm p-6 mb-8 shadow-sm">
      <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-1">
        Missing Documents
      </p>
      <h3 className="font-serif-display text-2xl text-slate-dark mb-1">
        Upload Your Documents
      </h3>
      <p className="text-sm text-neutral-500 mb-5">
        Add any documents that were not submitted during your initial intake.
      </p>

      {/* Status pills */}
      <div className="flex flex-wrap gap-3 mb-5">
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${hasFtc ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {hasFtc ? '✓ FTC Report uploaded' : '⚠ FTC Report missing'}
        </span>
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${hasPolice ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
          {hasPolice ? '✓ Police Report uploaded' : 'Police Report (optional)'}
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5">
            Document Type
          </label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value as PortalDocType)}
            disabled={uploading}
            className="w-full border border-neutral-300 text-slate-dark px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red bg-white"
          >
            {PORTAL_DOC_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5">
            File (PDF, JPG, PNG, HEIC)
          </label>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.heic,.heif"
            disabled={uploading}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full border border-neutral-300 text-slate-dark px-3 py-2 rounded-sm text-sm file:bg-cream-100 file:border-0 file:text-slate-dark file:text-xs file:px-3 file:py-1 file:mr-3 file:rounded-sm file:cursor-pointer"
          />
        </div>
      </div>

      {uploading && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Uploading…</span><span>{progress}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-1.5">
            <div className="bg-luxury-red h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">{error}</div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-sm">{success}</div>
      )}

      <button
        onClick={doUpload}
        disabled={uploading || !file}
        className="bg-luxury-red hover:bg-luxury-light disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
      >
        {uploading ? 'Uploading…' : 'Upload Document'}
      </button>
    </div>
  );
}

function PortalResponseSection({
  token,
  responses,
  onRefresh,
}: {
  token: string;
  responses: PortalResponse[];
  onRefresh: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [bureau, setBureau] = useState('');
  const [receivedAt, setReceivedAt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const doUpload = async () => {
    if (!file || !bureau) return;
    setUploading(true);
    setProgress(0);
    setError('');
    setSuccess('');
    try {
      const ext = file.name.split('.').pop() || 'bin';
      const urlRes = await fetch(
        `/api/portal-upload?kind=response&ext=${encodeURIComponent(ext)}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!urlRes.ok) throw new Error((await urlRes.json()).error || 'Could not get upload URL');
      const { signedUrl, path } = await urlRes.json();

      await uploadFileToSignedUrl(signedUrl, file, setProgress);

      const postRes = await fetch('/api/portal-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind: 'response', bureau, receivedAt: receivedAt || null, path, filename: file.name }),
      });
      if (!postRes.ok) throw new Error((await postRes.json()).error || 'Failed to record response');

      setSuccess('Response uploaded. Your specialist has been notified.');
      setBureau('');
      setReceivedAt('');
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      setShowForm(false);
      onRefresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden mb-8 shadow-sm">
      <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-1">
            Bureau & Furnisher Responses
          </p>
          <h3 className="font-serif-display text-2xl text-slate-dark">Response Log</h3>
        </div>
        <button
          onClick={() => { setShowForm((s) => !s); setError(''); setSuccess(''); }}
          className="text-xs uppercase tracking-widest font-semibold border border-luxury-red text-luxury-red hover:bg-luxury-red hover:text-white px-4 py-2 rounded-sm transition-colors whitespace-nowrap"
        >
          {showForm ? 'Cancel' : '+ Upload Response'}
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="px-6 py-5 border-b border-neutral-200 bg-cream-50">
          <p className="text-sm font-semibold text-slate-dark mb-4">
            Upload a letter you received from a bureau or furnisher
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5">
                Bureau / Furnisher Name *
              </label>
              <input
                type="text"
                value={bureau}
                onChange={(e) => setBureau(e.target.value)}
                placeholder="e.g. Experian, Capital One…"
                disabled={uploading}
                className="w-full border border-neutral-300 text-slate-dark px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red bg-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5">
                Date Received (optional)
              </label>
              <input
                type="date"
                value={receivedAt}
                onChange={(e) => setReceivedAt(e.target.value)}
                disabled={uploading}
                className="w-full border border-neutral-300 text-slate-dark px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red bg-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5">
              Response Document * (PDF, JPG, PNG, HEIC)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.heic,.heif"
              disabled={uploading}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full border border-neutral-300 text-slate-dark px-3 py-2 rounded-sm text-sm file:bg-cream-100 file:border-0 file:text-slate-dark file:text-xs file:px-3 file:py-1 file:mr-3 file:rounded-sm file:cursor-pointer"
            />
          </div>

          {uploading && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Uploading…</span><span>{progress}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-1.5">
                <div className="bg-luxury-red h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">{error}</div>
          )}

          <button
            onClick={doUpload}
            disabled={uploading || !file || !bureau}
            className="bg-luxury-red hover:bg-luxury-light disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            {uploading ? 'Uploading…' : 'Submit Response'}
          </button>
        </div>
      )}

      {success && (
        <div className="px-6 py-4 bg-green-50 border-b border-green-200 text-green-700 text-sm">{success}</div>
      )}

      {/* Response list */}
      {responses.length === 0 ? (
        <div className="p-10 text-center text-neutral-500 text-sm">
          No responses yet. Upload any letters you receive from bureaus or furnishers using the button above.
          <br />
          <span className="text-xs text-neutral-400 mt-1 block">Bureaus respond within 30 days; §605B blocks within 4 business days.</span>
        </div>
      ) : (
        <div className="divide-y divide-neutral-200">
          {responses.map((r) => (
            <div key={r.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-3 mb-1">
                <p className="text-sm font-semibold text-slate-dark capitalize">{r.bureau}</p>
                <p className="text-xs text-neutral-500">
                  {r.received_at
                    ? new Date(r.received_at).toLocaleDateString()
                    : new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-xs uppercase tracking-widest text-luxury-red mb-2">{r.response_type}</p>
              {r.summary && (
                <p className="text-sm text-neutral-700 leading-relaxed mb-2">{r.summary}</p>
              )}
              {r.signedUrl && (
                <a
                  href={r.signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-luxury-red hover:text-luxury-accent font-semibold"
                >
                  View document →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PortalDashboardPage;
