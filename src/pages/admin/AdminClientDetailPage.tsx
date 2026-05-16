import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { adminHeaders, clearAdminToken, isAdminAuthenticated } from '../../lib/adminAuth';
import { BUREAU_ADDRESSES } from '../../lib/letterTemplates';
import { uploadFileToSignedUrl } from '../../utils/uploadFile';

interface ClientDetail {
  client: Record<string, unknown> & {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    status: string;
    goals?: string;
    timeline?: string;
    disputed_accounts?: string;
    signature_name?: string;
    signature_date?: string;
    address_verified?: boolean | null;
    address_flag_notes?: string | null;
    created_at: string;
  };
  letters: Array<Record<string, unknown> & { id: string; recipient_name: string; letter_type: string; created_at: string; pdf_unsigned_path?: string | null; lob_tracking_number?: string | null; mailed_at?: string | null; mail_status?: string | null; }>;
  accounts: Array<Record<string, unknown> & { id: string; creditor_name: string; account_number: string; balance: string; date_opened: string; account_type: string; account_status: string; bureaus: string[]; selected: boolean }>;
  responses: Array<Record<string, unknown> & { id: string; created_at: string }>;
  docUrls: Record<string, string | null>;
  miscFiles: Array<{ path: string; filename: string; uploaded_at: string; signedUrl: string | null }>;
  ftcReportFiles: Array<{ path: string; filename: string; uploaded_at: string; signedUrl: string | null }>;
  additionalFiles: Array<{ path: string; filename: string; uploaded_at: string; signedUrl: string | null }>;
}

const DOC_LABELS: Record<string, string> = {
  doc_dl_front: "Driver's License (Front)",
  doc_dl_back: "Driver's License (Back)",
  doc_ss_card: 'Social Security Card',
  doc_utility_bill: 'Proof of Address',
  doc_cr_equifax: 'Credit Report — Equifax',
  doc_cr_experian: 'Credit Report — Experian',
  doc_cr_transunion: 'Credit Report — TransUnion',
  doc_ftc_report: 'FTC Identity Theft Report',
  doc_police_report: 'Police Report',
};

const STATUS_OPTIONS = [
  'intake',
  'analyzing',
  'letters_drafted',
  'letters_mailed',
  'awaiting_response',
  'in_progress',
  'resolved',
  'closed',
];

type Tab = 'overview' | 'documents' | 'analyze' | 'letters' | 'tracking';

const AdminClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('overview');
  const [busy, setBusy] = useState(false);
  const [busyMsg, setBusyMsg] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const resendPortalEmail = async () => {
    if (!clientId) return;
    try {
      const r = await fetch('/api/resend-portal-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId }),
      });
      const j = await r.json();
      if (r.ok) {
        showToast('Portal login email sent successfully.', 'success');
      } else {
        showToast(j.error || 'Failed to send portal email.', 'error');
      }
    } catch (err) {
      showToast('Network error sending portal email.', 'error');
    }
  };

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    if (clientId) loadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/client-detail?clientId=${clientId}`, { headers: adminHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to load client');
      } else {
        setData(json);
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!clientId) return;
    setBusy(true);
    setBusyMsg('Updating status…');
    try {
      const res = await fetch('/api/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, status: newStatus }),
      });
      if (!res.ok) {
        const json = await res.json();
        alert(json.error || 'Failed to update status');
      } else {
        await loadDetail();
      }
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  const runAnalyze = async () => {
    if (!clientId || !data) return;
    setBusy(true);
    setBusyMsg('Extracting credit reports…');
    try {
      // 1. Extract all available bureaus in parallel
      const bureaus = (['equifax', 'experian', 'transunion'] as const).filter(
        (b) => !!data.docUrls[`doc_cr_${b}` as string],
      );

      if (bureaus.length === 0) {
        alert('No credit reports uploaded — cannot analyze.');
        return;
      }

      setBusyMsg('Extracting credit reports…');
      const results = await Promise.all(
        bureaus.map((bureau) =>
          fetch(`/api/analyze-reports?action=extract&bureau=${bureau}&clientId=${clientId}`, {
            headers: adminHeaders(),
          }).then(async (r) => ({ bureau, r, j: await r.json() })),
        ),
      );

      const failed = results.filter(({ r }) => !r.ok);
      if (failed.length > 0) {
        const msgs = failed.map(({ bureau, r, j }) => `${bureau}: ${j.error ?? r.status}`).join('\n');
        alert(`Bureau extraction failed — analysis aborted:\n\n${msgs}`);
        return;
      }

      const texts: Record<string, string> = {};
      for (const { bureau, j } of results) {
        console.log(`[analyze] ${bureau} text length: ${j.text?.length ?? 0}`);
        texts[bureau] = j.text ?? '';
      }

      // 2. Send to Claude only after all bureaus extracted successfully
      setBusyMsg('Analyzing with Claude…');
      const r2 = await fetch('/api/analyze-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, texts }),
      });
      const j2 = await r2.json();
      if (!r2.ok) {
        alert(j2.error || 'Analysis failed');
      } else {
        alert(`Extracted ${j2.count} negative items.`);
        await loadDetail();
        setTab('analyze');
      }
    } catch (err) {
      console.error(err);
      alert('Analysis error: ' + (err as Error).message);
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-neutral-400">
        Loading client…
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-6">
        <p className="text-red-400 mb-4">{error || 'Client not found'}</p>
        <Link to="/admin/dashboard" className="text-luxury-red hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  const { client, letters, accounts, docUrls, miscFiles, responses } = data;

  return (
    <>
      <SEOHead title={`${client.full_name} — Admin`} description="Restricted area." noIndex={true} />
      <section className="min-h-screen bg-[#0f0f0f] pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/admin/dashboard"
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-luxury-red mb-4 inline-block"
            >
              ← All Clients
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-2">
                  Client Record
                </p>
                <h1 className="font-serif-display text-4xl text-white">{client.full_name}</h1>
                <p className="text-neutral-400 text-sm mt-1 flex items-center gap-3 flex-wrap">
                  <span>{client.email} · {client.phone}</span>
                  <button
                    onClick={resendPortalEmail}
                    disabled={busy}
                    className="text-[10px] uppercase tracking-widest text-luxury-red border border-luxury-red/40 px-2 py-0.5 rounded-sm hover:bg-luxury-red/10 disabled:opacity-40 transition-colors"
                  >
                    Resend Portal Email
                  </button>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={client.status || 'intake'}
                  onChange={(e) => updateStatus(e.target.value)}
                  disabled={busy}
                  className="bg-[#1a1a1a] border border-neutral-800 text-white px-3 py-2 rounded-sm text-xs uppercase tracking-widest focus:outline-none focus:border-luxury-red"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {busy && (
            <div className="bg-amber-950/50 border border-amber-900 text-amber-200 text-sm px-4 py-3 rounded-sm mb-4">
              {busyMsg || 'Working…'}
            </div>
          )}

          {toast && (
            <div className={`text-sm px-4 py-3 rounded-sm mb-4 ${toast.type === 'success' ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-200' : 'bg-red-950/50 border border-red-800 text-red-300'}`}>
              {toast.msg}
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-neutral-800 mb-8 flex flex-wrap gap-1">
            {(
              [
                ['overview', 'Overview'],
                ['documents', 'Documents'],
                ['analyze', `Analyzed Accounts (${accounts.length})`],
                ['letters', `Letters (${letters.length})`],
                ['tracking', 'Tracking'],
              ] as Array<[Tab, string]>
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold transition-colors border-b-2 -mb-px ${
                  tab === key
                    ? 'text-white border-luxury-red'
                    : 'text-neutral-400 border-transparent hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'overview' && (
              <OverviewTab
                client={client}
                clientId={client.id}
                busy={busy}
                onSaveRound={async (round, notes) => {
                  setBusy(true);
                  setBusyMsg('Saving round…');
                  await fetch('/api/update-status', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
                    body: JSON.stringify({ clientId: client.id, dispute_round: round, round_notes: notes }),
                  });
                  await loadDetail();
                  setBusy(false);
                  setBusyMsg('');
                }}
              />
            )}
            {tab === 'documents' && (
              <DocumentsTab
                clientId={client.id}
                docUrls={docUrls}
                miscFiles={miscFiles ?? []}
                ftcReportFiles={data.ftcReportFiles ?? []}
                additionalFiles={data.additionalFiles ?? []}
                onRefresh={loadDetail}
              />
            )}
            {tab === 'analyze' && (
              <AnalyzeTab
                accounts={accounts}
                runAnalyze={runAnalyze}
                busy={busy}
              />
            )}
            {tab === 'letters' && (
              <LettersTab
                clientId={client.id}
                client={client}
                accounts={accounts}
                letters={letters}
                onChange={loadDetail}
                setBusy={setBusy}
                setBusyMsg={setBusyMsg}
                busy={busy}
                disputeRound={Number(client.dispute_round ?? 1)}
                responseCount={data.responses?.length ?? 0}
              />
            )}
            {tab === 'tracking' && <TrackingTab letters={letters} />}
          </motion.div>
        </div>
      </section>
    </>
  );
};

// === Overview Tab ===
const OverviewTab = ({
  client,
  clientId,
  busy,
  onSaveRound,
}: {
  client: ClientDetail['client'];
  clientId: string;
  busy: boolean;
  onSaveRound: (round: number, notes: string) => void;
}) => {
  const [round, setRound] = React.useState<number>(Number(client.dispute_round ?? 1));
  const [notes, setNotes] = React.useState<string>(String(client.round_notes ?? ''));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">Personal Info</h3>
        <Field label="Full Name" value={client.full_name} />
        <Field label="Email" value={client.email} />
        <Field label="Phone" value={client.phone} />
        <Field label="Address" value={`${client.address}, ${client.city}, ${client.state} ${client.zip}`} />
        <Field
          label="Address Verification"
          value={
            client.address_verified === true ? 'Verified'
            : client.address_verified === false ? `Flagged${client.address_flag_notes ? ' — ' + client.address_flag_notes : ''}`
            : 'Pending'
          }
        />
      </div>
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">Case Details</h3>
        <Field label="Goals" value={client.goals || '—'} multiline />
        <Field label="Timeline" value={client.timeline || '—'} />
        <Field label="Disputed Accounts" value={client.disputed_accounts || '—'} multiline />
        <Field label="CROA Signature" value={`${client.signature_name || ''} (${client.signature_date || ''})`} />
        <Field label="Submitted" value={new Date(client.created_at).toLocaleString()} />
      </div>
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6 lg:col-span-2">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">Dispute Round</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Round</label>
            <select
              value={round}
              onChange={(e) => setRound(Number(e.target.value))}
              disabled={busy}
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
            >
              <option value={1}>Round 1 — Initial Dispute</option>
              <option value={2}>Round 2 — Escalated</option>
              <option value={3}>Round 3 — CFPB Threat</option>
              <option value={4}>Round 4 — Legal Action</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Round Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              disabled={busy}
              placeholder="Notes for this round (prior dispute dates, tracking numbers, etc.)"
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red resize-none"
            />
          </div>
        </div>
        <button
          onClick={() => onSaveRound(round, notes)}
          disabled={busy}
          className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          Save Round
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) => (
  <div className="mb-3">
    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
    <p className={`text-sm text-neutral-200 ${multiline ? 'whitespace-pre-wrap' : ''}`}>
      {value || '—'}
    </p>
  </div>
);

// === Documents Tab ===
const ADMIN_UPLOAD_TYPES = [
  { value: 'ftc-report',    label: 'FTC Identity Theft Report' },
  { value: 'police-report', label: 'Police Report' },
  { value: 'misc',          label: 'Additional Supporting Document' },
] as const;

type AdminDocType = 'ftc-report' | 'police-report' | 'misc';

const DocumentsTab = ({
  clientId,
  docUrls,
  miscFiles,
  ftcReportFiles,
  additionalFiles,
  onRefresh,
}: {
  clientId: string;
  docUrls: Record<string, string | null>;
  miscFiles: Array<{ path: string; filename: string; uploaded_at: string; signedUrl: string | null }>;
  ftcReportFiles: Array<{ path: string; filename: string; uploaded_at: string; signedUrl: string | null }>;
  additionalFiles: Array<{ path: string; filename: string; uploaded_at: string; signedUrl: string | null }>;
  onRefresh: () => void;
}) => {
  const [docType, setDocType] = useState<AdminDocType>('ftc-report');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setUploadError('');
    try {
      const ext = file.name.split('.').pop() || 'bin';
      const urlRes = await fetch(
        `/api/admin-upload?clientId=${encodeURIComponent(clientId)}&docType=${docType}&ext=${encodeURIComponent(ext)}`,
        { headers: adminHeaders() },
      );
      if (!urlRes.ok) throw new Error((await urlRes.json()).error || 'Failed to get upload URL');
      const { signedUrl, path } = await urlRes.json();

      await uploadFileToSignedUrl(signedUrl, file, setProgress);

      const patchRes = await fetch('/api/admin-upload', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, docType, path, filename: file.name }),
      });
      if (!patchRes.ok) throw new Error((await patchRes.json()).error || 'Failed to record upload');

      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onRefresh();
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-8">
      {/* Existing intake documents */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(DOC_LABELS).map((key) => {
          const url = docUrls[key];
          return (
            <div key={key} className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-5">
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                {DOC_LABELS[key]}
              </p>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-luxury-red hover:text-luxury-accent text-sm font-semibold"
                >
                  View document →
                </a>
              ) : (
                <p className="text-neutral-500 text-sm">Not uploaded</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Admin upload panel */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">
          Admin Document Upload
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Document Type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as AdminDocType)}
              disabled={uploading}
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
            >
              {ADMIN_UPLOAD_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              File (PDF, JPG, PNG, HEIC)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.heic,.heif"
              disabled={uploading}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-neutral-300 px-3 py-2 rounded-sm text-sm file:bg-neutral-800 file:border-0 file:text-white file:text-xs file:px-3 file:py-1 file:mr-3 file:rounded-sm file:cursor-pointer"
            />
          </div>
        </div>

        {uploading && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span>Uploading…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-1.5">
              <div
                className="bg-luxury-red h-1.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {uploadError && (
          <div className="mb-4 bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
            {uploadError}
          </div>
        )}

        <button
          onClick={doUpload}
          disabled={uploading || !file}
          className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          {uploading ? 'Uploading…' : 'Upload Document'}
        </button>
      </div>

      {/* Additional supporting documents list */}
      {miscFiles.length > 0 && (
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800">
            <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
              Additional Supporting Documents ({miscFiles.length})
            </h3>
          </div>
          <div className="divide-y divide-neutral-800">
            {miscFiles.map((f, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white">{f.filename}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {new Date(f.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
                {f.signedUrl ? (
                  <a
                    href={f.signedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold whitespace-nowrap"
                  >
                    Download →
                  </a>
                ) : (
                  <span className="text-neutral-500 text-xs">Link expired</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FTC Identity Theft Reports */}
      {ftcReportFiles.length > 0 && (
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800">
            <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
              FTC Identity Theft Reports ({ftcReportFiles.length})
            </h3>
          </div>
          <div className="divide-y divide-neutral-800">
            {ftcReportFiles.map((f, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white">{f.filename || `FTC Report ${i + 1}`}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{new Date(f.uploaded_at).toLocaleDateString()}</p>
                </div>
                {f.signedUrl ? (
                  <a href={f.signedUrl} target="_blank" rel="noopener noreferrer"
                    className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold whitespace-nowrap">
                    Download →
                  </a>
                ) : <span className="text-neutral-500 text-xs">Link expired</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Client Documents */}
      {additionalFiles.length > 0 && (
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800">
            <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
              Additional Client Documents ({additionalFiles.length})
            </h3>
          </div>
          <div className="divide-y divide-neutral-800">
            {additionalFiles.map((f, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white">{f.filename || `Document ${i + 1}`}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{new Date(f.uploaded_at).toLocaleDateString()}</p>
                </div>
                {f.signedUrl ? (
                  <a href={f.signedUrl} target="_blank" rel="noopener noreferrer"
                    className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold whitespace-nowrap">
                    Download →
                  </a>
                ) : <span className="text-neutral-500 text-xs">Link expired</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// === Analyze Tab ===
const AnalyzeTab = ({
  accounts,
  runAnalyze,
  busy,
}: {
  accounts: ClientDetail['accounts'];
  runAnalyze: () => void;
  busy: boolean;
}) => (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h2 className="font-serif-display text-2xl text-white">Negative Accounts</h2>
        <p className="text-sm text-neutral-400">Extracted by Claude from credit reports.</p>
      </div>
      <button
        onClick={runAnalyze}
        disabled={busy}
        className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
      >
        {accounts.length === 0 ? 'Run Analysis' : 'Re-run Analysis'}
      </button>
    </div>

    {accounts.length === 0 ? (
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-10 text-center text-neutral-400">
        No accounts analyzed yet. Click "Run Analysis" to extract negative items from uploaded credit reports.
      </div>
    ) : (
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0f0f0f] border-b border-neutral-800">
              <tr className="text-left text-xs uppercase tracking-widest text-neutral-400">
                <th className="px-4 py-3">Creditor</th>
                <th className="px-4 py-3">Account #</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Bureaus</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id} className="border-b border-neutral-800/60">
                  <td className="px-4 py-3 text-white">{a.creditor_name}</td>
                  <td className="px-4 py-3 text-neutral-300 font-mono text-xs">{a.account_number}</td>
                  <td className="px-4 py-3 text-neutral-300">{a.balance}</td>
                  <td className="px-4 py-3 text-neutral-300">{a.account_type}</td>
                  <td className="px-4 py-3 text-neutral-300">{a.account_status}</td>
                  <td className="px-4 py-3 text-neutral-300 text-xs uppercase">
                    {(a.bureaus || []).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);

// === Letters Tab ===
type LetterTypeKey = '605B' | '611' | '623' | '609' | '809';

const RECIPIENT_PRESETS: Array<{
  key: string;
  letterType: LetterTypeKey;
  recipientName: string;
  recipientAddress: string;
}> = [
  {
    key: 'experian-fraud',
    letterType: '605B',
    recipientName: BUREAU_ADDRESSES.experianFraud.name,
    recipientAddress: `${BUREAU_ADDRESSES.experianFraud.dept}\n${BUREAU_ADDRESSES.experianFraud.address}`,
  },
  {
    key: 'equifax-fraud',
    letterType: '605B',
    recipientName: BUREAU_ADDRESSES.equifaxFraud.name,
    recipientAddress: `${BUREAU_ADDRESSES.equifaxFraud.dept}\n${BUREAU_ADDRESSES.equifaxFraud.address}`,
  },
  {
    key: 'transunion-fraud',
    letterType: '605B',
    recipientName: BUREAU_ADDRESSES.transunion.name,
    recipientAddress: `${BUREAU_ADDRESSES.transunion.dept}\n${BUREAU_ADDRESSES.transunion.address}`,
  },
  {
    key: 'experian-611',
    letterType: '611',
    recipientName: BUREAU_ADDRESSES.experianDispute.name,
    recipientAddress: `${BUREAU_ADDRESSES.experianDispute.dept}\n${BUREAU_ADDRESSES.experianDispute.address}`,
  },
  {
    key: 'equifax-611',
    letterType: '611',
    recipientName: BUREAU_ADDRESSES.equifaxDispute.name,
    recipientAddress: `${BUREAU_ADDRESSES.equifaxDispute.dept}\n${BUREAU_ADDRESSES.equifaxDispute.address}`,
  },
  {
    key: 'transunion-611',
    letterType: '611',
    recipientName: BUREAU_ADDRESSES.transunion.name,
    recipientAddress: `Dispute Department\n${BUREAU_ADDRESSES.transunion.address}`,
  },
];

const LettersTab = ({
  clientId,
  client,
  accounts,
  letters,
  onChange,
  setBusy,
  setBusyMsg,
  busy,
  disputeRound,
  responseCount,
}: {
  clientId: string;
  client: ClientDetail['client'];
  accounts: ClientDetail['accounts'];
  letters: ClientDetail['letters'];
  onChange: () => void;
  setBusy: (b: boolean) => void;
  setBusyMsg: (m: string) => void;
  busy: boolean;
  disputeRound: number;
  responseCount: number;
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [letterType, setLetterType] = useState<LetterTypeKey>('605B');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [showCustom, setShowCustom] = useState(false);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const selectedIds = Object.keys(selected).filter((k) => selected[k]);

  const sendMail = async (letterId: string) => {
    setBusy(true);
    setBusyMsg('Sending via Lob…');
    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ letterId, clientId }),
      });
      const json = await res.json();
      if (res.ok) {
        alert(`Mailed via USPS Certified Mail. Tracking: ${json.trackingNumber}`);
        onChange();
      } else {
        alert(json.error || 'Failed to send mail');
      }
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  const applyPreset = (key: string) => {
    const preset = RECIPIENT_PRESETS.find((p) => p.key === key);
    if (!preset) return;
    setRecipientName(preset.recipientName);
    setRecipientAddress(preset.recipientAddress);
    setLetterType(preset.letterType);
  };

  const handleGenerate = async () => {
    if (!recipientName || !recipientAddress) {
      alert('Recipient name and address are required.');
      return;
    }
    setBusy(true);
    setBusyMsg('Generating letter with Claude…');
    try {
      const res = await fetch('/api/generate-letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({
          clientId,
          letterType,
          recipientName,
          recipientAddress,
          accountIds: selectedIds,
          clientData: {
            fullName: client.full_name,
            address: client.address,
            city: client.city,
            state: client.state,
            zip: client.zip,
            email: client.email,
            phone: client.phone,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error || 'Failed to generate letter');
      } else {
        alert('Letter generated. Now generating PDF…');
        // Auto-generate PDF
        setBusyMsg('Building PDF packet…');
        const pdfRes = await fetch('/api/generate-pdfs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...adminHeaders() },
          body: JSON.stringify({ clientId, letterId: json.letterId }),
        });
        if (!pdfRes.ok) {
          const pj = await pdfRes.json();
          alert('Letter saved but PDF failed: ' + (pj.error || 'unknown'));
        }
        setRecipientName('');
        setRecipientAddress('');
        setSelected({});
        onChange();
      }
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  const downloadPdf = async (letterId: string) => {
    setBusy(true);
    setBusyMsg('Building PDF packet…');
    try {
      const res = await fetch('/api/generate-pdfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, letterId }),
      });
      const json = await res.json();
      if (res.ok && json.signedUrl) {
        window.open(json.signedUrl, '_blank');
        onChange();
      } else {
        alert(json.error || 'PDF generation failed');
      }
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Round badge + bureau response warning */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-widest bg-luxury-red/20 text-luxury-red rounded-sm border border-luxury-red/30">
          Round {disputeRound}
        </span>
      </div>
      {responseCount > 0 && (
        <div className="bg-amber-950/40 border border-amber-800 text-amber-200 text-sm px-4 py-3 rounded-sm">
          ⚠ {responseCount} bureau/creditor response{responseCount > 1 ? 's' : ''} on file — Claude will analyze {responseCount > 1 ? 'these' : 'this'} in letter generation.
        </div>
      )}
      {/* Generator */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">
          Generate New Letter
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Quick Recipient Preset
            </label>
            <select
              onChange={(e) => applyPreset(e.target.value)}
              defaultValue=""
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
            >
              <option value="">Select a preset…</option>
              {RECIPIENT_PRESETS.map((p) => (
                <option key={p.key} value={p.key}>
                  [{p.letterType}] {p.recipientName} — {p.recipientAddress.split('\n')[0]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Letter Type
            </label>
            <select
              value={letterType}
              onChange={(e) => setLetterType(e.target.value as LetterTypeKey)}
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
            >
              <option value="605B">FCRA §605B — Identity Theft Block (Bureaus)</option>
              <option value="611">FCRA §611 — Dispute & Reinvestigation (Bureaus)</option>
              <option value="623">FCRA §623 — Furnisher Demand</option>
              <option value="609">FCRA §609 — File Disclosure</option>
              <option value="809">FDCPA §809 — Validation Request (Collectors)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Recipient Address (multi-line ok)
            </label>
            <textarea
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              rows={3}
              className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red font-mono"
            />
          </div>
        </div>

        {accounts.length > 0 && (
          <div className="mb-5">
            <button
              onClick={() => setShowCustom((s) => !s)}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white mb-2"
            >
              {showCustom ? 'Hide' : 'Show'} Account Selector ({selectedIds.length} selected)
            </button>
            {showCustom && (
              <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm max-h-72 overflow-y-auto p-2">
                {accounts.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-start gap-3 p-2 hover:bg-[#1a1a1a] rounded-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!selected[a.id]}
                      onChange={() => toggle(a.id)}
                      className="mt-1 accent-luxury-red"
                    />
                    <div className="flex-1 text-xs">
                      <div className="text-white font-semibold">{a.creditor_name}</div>
                      <div className="text-neutral-400">
                        Acct: {a.account_number} · {a.balance} · {(a.bureaus || []).join(', ')}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={busy || !recipientName || !recipientAddress}
          className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          Generate Letter + PDF Packet
        </button>
      </div>

      {/* Existing letters */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800">
          <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
            Generated Letters ({letters.length})
          </h3>
        </div>
        {letters.length === 0 ? (
          <div className="p-10 text-center text-neutral-500 text-sm">No letters generated yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#0f0f0f] border-b border-neutral-800">
              <tr className="text-left text-xs uppercase tracking-widest text-neutral-400">
                <th className="px-4 py-3">Recipient</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((l) => (
                <tr key={l.id} className="border-b border-neutral-800/60">
                  <td className="px-4 py-3 text-white">{l.recipient_name}</td>
                  <td className="px-4 py-3 text-neutral-300 text-xs uppercase tracking-widest">
                    {l.letter_type}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">
                    {new Date(l.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-3">
                    <button
                      onClick={() => downloadPdf(l.id)}
                      disabled={busy}
                      className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold"
                    >
                      Download PDF
                    </button>
                    {l.lob_tracking_number ? (
                      <span className="text-green-400 text-xs font-mono">
                        Mailed ✓ {l.lob_tracking_number}
                      </span>
                    ) : (
                      <button
                        onClick={() => sendMail(l.id)}
                        disabled={busy || !l.pdf_unsigned_path}
                        className="text-amber-400 hover:text-amber-300 text-xs uppercase tracking-widest font-semibold disabled:opacity-40"
                        title={!l.pdf_unsigned_path ? 'Generate PDF first' : 'Send via USPS Certified Mail'}
                      >
                        Send Mail
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// === Tracking Tab ===
const TrackingTab = ({ letters }: { letters: ClientDetail['letters'] }) => (
  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-neutral-800">
      <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
        Mailing Tracking ({letters.length})
      </h3>
    </div>
    {letters.length === 0 ? (
      <div className="p-10 text-center text-neutral-500 text-sm">
        No letters to track yet.
      </div>
    ) : (
      <table className="w-full text-sm">
        <thead className="bg-[#0f0f0f] border-b border-neutral-800">
          <tr className="text-left text-xs uppercase tracking-widest text-neutral-400">
            <th className="px-4 py-3">Recipient</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Generated</th>
            <th className="px-4 py-3">Tracking #</th>
          </tr>
        </thead>
        <tbody>
          {letters.map((l) => {
            const tracking = (l.tracking_log as Array<Record<string, unknown>> | undefined) || [];
            const t = tracking[0];
            return (
              <tr key={l.id} className="border-b border-neutral-800/60">
                <td className="px-4 py-3 text-white">{l.recipient_name}</td>
                <td className="px-4 py-3 text-neutral-300 text-xs uppercase">{l.letter_type}</td>
                <td className="px-4 py-3 text-neutral-400 text-xs">
                  {new Date(l.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-neutral-300 text-xs font-mono">
                  {t && (t.tracking_number as string)
                    ? (t.tracking_number as string)
                    : <span className="text-neutral-500">— not yet mailed —</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
);

export default AdminClientDetailPage;
