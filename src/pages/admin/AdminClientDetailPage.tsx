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
    personal_info_errors?: { name_variations: Record<string, string[]>; unknown_addresses: Record<string, string[]>; unknown_phone_numbers: Record<string, string[]> } | null;
    inquiries?: Array<{ creditor: string; date: string; bureau: string; potentially_unauthorized: boolean; inquiry_type?: string; reason?: string }> | null;
    ftc_report_numbers?: string[] | null;
    dispute_selections?: Record<string, unknown> | null;
    case_type?: string | null;
    strategy_notes?: string | null;
    positive_accounts?: Array<Record<string, unknown>> | null;
    address_verification_result?: {
      intake_address: string;
      id_address: string | null;
      utility_address: string | null;
      match_status: 'verified' | 'partial' | 'mismatch';
      match_notes: string;
      verified: boolean;
    } | null;
  };
  letters: Array<Record<string, unknown> & { id: string; recipient_name: string; letter_type: string; created_at: string; pdf_unsigned_path?: string | null; lob_tracking_number?: string | null; mailed_at?: string | null; mail_status?: string | null; needs_address?: boolean | null; response_received_at?: string | null; }>;
  accounts: Array<Record<string, unknown> & { id: string; creditor_name: string; account_number: string; account_number_equifax?: string; account_number_experian?: string; account_number_transunion?: string; balance: string; date_opened: string; account_type: string; account_status: string; bureaus: string[]; selected: boolean; dispute_types: string[]; original_creditor?: string; phone_numbers?: string[]; name_variations?: string[]; addresses?: string[]; equifax_data?: Record<string, unknown> | null; experian_data?: Record<string, unknown> | null; transunion_data?: Record<string, unknown> | null; duplicate_flag?: boolean; duplicate_note?: string; balance_inconsistency?: boolean; balance_inconsistency_note?: string; dispute_priority?: string; recommended_fcra_sections?: string[]; letter_targets?: Record<string, unknown>; strategy_notes?: string }>;
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
  const [disputeModal, setDisputeModal] = useState(false);
  const [disputeMsg, setDisputeMsg] = useState('');
  const [disputeSending, setDisputeSending] = useState(false);

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

  const sendWelcomeEmail = async () => {
    if (!clientId) return;
    try {
      const r = await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId }),
      });
      const j = await r.json();
      if (r.ok) {
        showToast('Welcome email sent successfully.', 'success');
      } else {
        showToast(j.error || 'Failed to send welcome email.', 'error');
      }
    } catch (err) {
      showToast('Network error sending welcome email.', 'error');
    }
  };

  const sendDisputeNotice = async () => {
    if (!clientId || !disputeMsg.trim()) return;
    setDisputeSending(true);
    try {
      const r = await fetch('/api/send-dispute-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, message: disputeMsg }),
      });
      const j = await r.json();
      if (r.ok) {
        showToast(`Round ${j.round} dispute notice sent.`, 'success');
        setDisputeModal(false);
        setDisputeMsg('');
        await loadDetail();
      } else {
        showToast(j.error || 'Failed to send dispute notice.', 'error');
      }
    } catch {
      showToast('Network error sending dispute notice.', 'error');
    } finally {
      setDisputeSending(false);
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
                  <button
                    onClick={sendWelcomeEmail}
                    disabled={busy}
                    className="text-[10px] uppercase tracking-widest text-luxury-red border border-luxury-red/40 px-2 py-0.5 rounded-sm hover:bg-luxury-red/10 disabled:opacity-40 transition-colors"
                  >
                    Send Welcome Email
                  </button>
                  <button
                    onClick={() => {
                      setDisputeMsg(`Your Round ${Number(client.dispute_round ?? 1)} dispute letters have been sent to the credit bureaus. Please watch for mailed responses over the next 30-45 days.`);
                      setDisputeModal(true);
                    }}
                    disabled={busy}
                    className="text-[10px] uppercase tracking-widest text-luxury-red border border-luxury-red/40 px-2 py-0.5 rounded-sm hover:bg-luxury-red/10 disabled:opacity-40 transition-colors"
                  >
                    Send Dispute Notice
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
                onSaveCaseType={async (caseType) => {
                  setData((prev) => prev ? { ...prev, client: { ...prev.client, case_type: caseType } } : prev);
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
                clientId={client.id}
                clientEmail={client.email}
                onChange={loadDetail}
                client={client}
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
                docUrls={docUrls}
                ftcReportFileCount={data.ftcReportFiles?.length ?? 0}
              />
            )}
            {tab === 'tracking' && <TrackingTab letters={letters} clientId={client.id} onChange={loadDetail} />}
          </motion.div>
        </div>
      </section>

      {disputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1a1a1a] border border-neutral-700 rounded-sm p-6 w-full max-w-lg">
            <h3 className="text-sm uppercase tracking-widest text-luxury-red font-bold mb-4">Send Dispute Notice</h3>
            <p className="text-neutral-400 text-xs mb-3">This will be emailed to the client and logged as a round update.</p>
            <textarea
              value={disputeMsg}
              onChange={(e) => setDisputeMsg(e.target.value)}
              rows={5}
              className="w-full bg-[#0f0f0f] border border-neutral-700 text-white text-sm p-3 rounded-sm resize-none focus:outline-none focus:border-luxury-red mb-4"
              placeholder="Message to client…"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDisputeModal(false)}
                className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white px-4 py-2 border border-neutral-700 rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendDisputeNotice}
                disabled={disputeSending || !disputeMsg.trim()}
                className="text-xs uppercase tracking-widest bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-2 rounded-sm transition-colors"
              >
                {disputeSending ? 'Sending…' : 'Send Notice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// === Overview Tab ===
const OverviewTab = ({
  client,
  clientId,
  busy,
  onSaveRound,
  onSaveCaseType,
}: {
  client: ClientDetail['client'];
  clientId: string;
  busy: boolean;
  onSaveRound: (round: number, notes: string) => void;
  onSaveCaseType: (caseType: string) => void;
}) => {
  const [round, setRound] = React.useState<number>(Number(client.dispute_round ?? 1));
  const [notes, setNotes] = React.useState<string>(String(client.round_notes ?? ''));
  const [ftcInput, setFtcInput] = React.useState<string>((client.ftc_report_numbers ?? []).join(', '));
  const [ftcSaving, setFtcSaving] = React.useState(false);
  const [ftcFlash, setFtcFlash] = React.useState(false);
  const [caseType, setCaseType] = React.useState<string>(String(client.case_type ?? 'identity_theft'));
  const [caseTypeFlash, setCaseTypeFlash] = React.useState(false);

  type VerifyResult = NonNullable<ClientDetail['client']['address_verification_result']>;
  const [verifying, setVerifying] = React.useState(false);
  const [verifyResult, setVerifyResult] = React.useState<VerifyResult | null>(
    client.address_verification_result ?? null,
  );

  const runVerifyAddress = async () => {
    setVerifying(true);
    try {
      const res = await fetch('/api/verify-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId }),
      });
      const j = await res.json();
      if (!res.ok) {
        alert(j.error || 'Address verification failed');
      } else {
        setVerifyResult(j as VerifyResult);
      }
    } catch {
      alert('Network error during address verification');
    } finally {
      setVerifying(false);
    }
  };

  const markAddressVerified = async () => {
    await fetch('/api/update-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ clientId, address_verified: true }),
    });
    setVerifyResult((prev) =>
      prev ? { ...prev, match_status: 'verified', verified: true, match_notes: 'Manually verified by admin.' } : prev,
    );
  };

  const saveFtcNumbers = async () => {
    setFtcSaving(true);
    const parsed = ftcInput.split(',').map((s) => s.trim()).filter(Boolean);
    await fetch('/api/update-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ clientId, ftc_report_numbers: parsed }),
    });
    setFtcSaving(false);
    setFtcFlash(true);
    setTimeout(() => setFtcFlash(false), 2000);
  };

  const handleCaseTypeChange = async (val: string) => {
    setCaseType(val);
    await fetch('/api/update-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ clientId, case_type: val }),
    });
    onSaveCaseType(val);
    setCaseTypeFlash(true);
    setTimeout(() => setCaseTypeFlash(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Case Type Toggle */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6 lg:col-span-2">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-3">Case Type</h3>
        <div className="flex gap-3 flex-wrap">
          {[
            { value: 'identity_theft', label: 'Identity Theft', desc: '§605B blocks + full packet' },
            { value: 'standard_dispute', label: 'Standard Dispute', desc: '§611 / §623 reinvestigation' },
          ].map(({ value, label, desc }) => (
            <button
              key={value}
              onClick={() => handleCaseTypeChange(value)}
              disabled={busy}
              className={`flex flex-col text-left px-4 py-3 rounded-sm border transition-colors ${
                caseType === value
                  ? 'border-luxury-red bg-luxury-red/10 text-luxury-red'
                  : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <span className="text-xs uppercase tracking-widest font-bold">{label}</span>
              <span className="text-[10px] text-neutral-500 mt-0.5">{desc}</span>
            </button>
          ))}
          {caseTypeFlash && <span className="self-center text-emerald-400 text-xs">✓ Saved</span>}
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">Personal Info</h3>
        <Field label="Full Name" value={client.full_name} />
        <Field label="Email" value={client.email} />
        <Field label="Phone" value={client.phone} />
        <Field label="Address" value={`${client.address}, ${client.city}, ${client.state} ${client.zip}`} />

        {/* Address Verification */}
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Address Verification</p>

          {verifyResult ? (
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm border ${
                  verifyResult.match_status === 'verified'
                    ? 'text-emerald-400 bg-emerald-950/30 border-emerald-800'
                    : verifyResult.match_status === 'partial'
                    ? 'text-amber-400 bg-amber-950/30 border-amber-800'
                    : 'text-red-400 bg-red-950/30 border-red-800'
                }`}>
                  {verifyResult.match_status === 'verified' ? 'Verified' : verifyResult.match_status === 'partial' ? 'Partial Match' : 'Mismatch'}
                </span>
                {verifyResult.match_status !== 'verified' && (
                  <button
                    onClick={markAddressVerified}
                    className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-2 py-0.5 rounded-sm transition-colors"
                  >
                    Mark as Verified
                  </button>
                )}
                <button
                  onClick={runVerifyAddress}
                  disabled={verifying}
                  className="text-[9px] uppercase tracking-widest text-neutral-600 hover:text-neutral-300 disabled:opacity-40 transition-colors"
                >
                  {verifying ? 'Verifying…' : 'Re-verify'}
                </button>
              </div>

              {verifyResult.match_notes && (
                <p className="text-[11px] text-neutral-400 mb-2 leading-relaxed">{verifyResult.match_notes}</p>
              )}

              <table className="w-full text-xs border-collapse mb-1">
                <thead>
                  <tr>
                    <th className="text-left text-[9px] uppercase tracking-widest text-neutral-600 pb-1 pr-3 w-28 font-normal">Source</th>
                    <th className="text-left text-[9px] uppercase tracking-widest text-neutral-600 pb-1 font-normal">Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-0.5 pr-3 text-neutral-500 align-top">Intake Form</td>
                    <td className="py-0.5 text-neutral-200">{verifyResult.intake_address}</td>
                  </tr>
                  {verifyResult.id_address && (
                    <tr>
                      <td className="py-0.5 pr-3 text-neutral-500 align-top">Government ID</td>
                      <td className={`py-0.5 ${verifyResult.match_status !== 'verified' ? 'text-amber-300' : 'text-neutral-200'}`}>{verifyResult.id_address}</td>
                    </tr>
                  )}
                  {verifyResult.utility_address && (
                    <tr>
                      <td className="py-0.5 pr-3 text-neutral-500 align-top">Utility Bill</td>
                      <td className={`py-0.5 ${verifyResult.match_status !== 'verified' ? 'text-amber-300' : 'text-neutral-200'}`}>{verifyResult.utility_address}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-neutral-500">
                {client.address_verified === true
                  ? 'Manually verified'
                  : client.address_verified === false
                  ? `Flagged${client.address_flag_notes ? ' — ' + client.address_flag_notes : ''}`
                  : 'Not yet verified'}
              </span>
              <button
                onClick={runVerifyAddress}
                disabled={verifying}
                className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-widest font-semibold transition-colors"
              >
                {verifying ? 'Verifying…' : 'Verify Address'}
              </button>
            </div>
          )}
        </div>
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
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">FTC Report Numbers</h3>
        <p className="text-[11px] text-neutral-500 mb-3">Enter FTC Identity Theft Report numbers, comma-separated (e.g. 12345678, 87654321). Used automatically in §605B letters.</p>
        <div className="flex gap-3 items-start">
          <input
            type="text"
            value={ftcInput}
            onChange={(e) => setFtcInput(e.target.value)}
            placeholder="e.g. 12345678, 87654321"
            className="flex-1 bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
          />
          <button
            onClick={saveFtcNumbers}
            disabled={ftcSaving}
            className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors whitespace-nowrap"
          >
            {ftcFlash ? 'Saved ✓' : ftcSaving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
      <div className="bg-[#1a1a1a] border border-amber-900/40 rounded-sm p-6 lg:col-span-2">
        <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">AI Dispute Strategy</h3>
        {client.strategy_notes ? (
          <p className="text-sm text-neutral-300 leading-relaxed">{client.strategy_notes}</p>
        ) : (
          <p className="text-xs text-neutral-600">Run analysis to generate strategy.</p>
        )}
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
          {uploading ? 'Uploading…' : docType === 'ftc-report' ? 'Add FTC Report' : 'Upload Document'}
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

const FCRA_SECTIONS = [
  { key: '611',  label: '§611 Reinvestigation' },
  { key: '623',  label: '§623 Furnisher Dispute' },
  { key: '605B', label: '§605B Identity Theft Block' },
  { key: '609',  label: '§609 Full File Disclosure' },
  { key: '809',  label: '§809 FDCPA Debt Validation' },
] as const;

type BureauDataEdit = {
  account_number: string;
  balance: string;
  date_opened: string;
  account_status: string;
  estimated_removal: string;
  addresses: string;
  phone_numbers: string;
  name_variations: string;
};

const COMPARISON_FIELDS: Array<{ key: keyof BureauDataEdit; label: string }> = [
  { key: 'account_number', label: 'Account #' },
  { key: 'balance', label: 'Balance' },
  { key: 'date_opened', label: 'Date Opened' },
  { key: 'account_status', label: 'Status' },
  { key: 'estimated_removal', label: 'Est. Removal' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'phone_numbers', label: 'Phone Numbers' },
  { key: 'name_variations', label: 'Name Variations' },
];

const emptyBureauEdit = (): BureauDataEdit => ({
  account_number: '', balance: '', date_opened: '', account_status: '',
  estimated_removal: '', addresses: '', phone_numbers: '', name_variations: '',
});

const toBureauEdit = (d: Record<string, unknown> | null | undefined): BureauDataEdit | null => {
  if (!d) return null;
  const arrToStr = (v: unknown) => Array.isArray(v) ? v.join(', ') : String(v ?? '');
  return {
    account_number: String(d.account_number ?? ''),
    balance: String(d.balance ?? ''),
    date_opened: String(d.date_opened ?? ''),
    account_status: String(d.account_status ?? ''),
    estimated_removal: String(d.estimated_removal ?? ''),
    addresses: arrToStr(d.addresses),
    phone_numbers: arrToStr(d.phone_numbers),
    name_variations: arrToStr(d.name_variations),
  };
};

const bureauEditToJsonb = (e: BureauDataEdit) => ({
  account_number: e.account_number,
  balance: e.balance,
  date_opened: e.date_opened,
  account_status: e.account_status,
  estimated_removal: e.estimated_removal,
  addresses: e.addresses.split(',').map((s) => s.trim()).filter(Boolean),
  phone_numbers: e.phone_numbers.split(',').map((s) => s.trim()).filter(Boolean),
  name_variations: e.name_variations.split(',').map((s) => s.trim()).filter(Boolean),
});

type TopFields = { creditor_name: string; original_creditor: string; account_type: string };

const buildBureauEdits = (accts: ClientDetail['accounts']): Record<string, Record<string, BureauDataEdit | null>> =>
  Object.fromEntries(accts.map((a) => [a.id, {
    equifax: toBureauEdit(a.equifax_data ?? null),
    experian: toBureauEdit(a.experian_data ?? null),
    transunion: toBureauEdit(a.transunion_data ?? null),
  }]));

const buildTopFields = (accts: ClientDetail['accounts']): Record<string, TopFields> =>
  Object.fromEntries(accts.map((a) => [a.id, {
    creditor_name: a.creditor_name,
    original_creditor: String(a.original_creditor ?? ''),
    account_type: a.account_type,
  }]));

// === Dispute Selections ===
type BureauToggles = { equifax: boolean; experian: boolean; transunion: boolean };
type ItemSelection = { bureaus: BureauToggles; fcra_sections: string[] };
type DisputeSelections = {
  accounts:   Record<string, ItemSelection>;
  names:      Record<string, ItemSelection>;
  addresses:  Record<string, ItemSelection>;
  phones:     Record<string, ItemSelection>;
  inquiries:  Record<string, ItemSelection>;
};

const emptyBureauToggles = (): BureauToggles => ({ equifax: false, experian: false, transunion: false });
const emptyItemSelection = (): ItemSelection => ({ bureaus: emptyBureauToggles(), fcra_sections: [] });

const initDisputeSelections = (raw: unknown): DisputeSelections => {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<DisputeSelections>;
  return {
    accounts:  r.accounts  ?? {},
    names:     r.names     ?? {},
    addresses: r.addresses ?? {},
    phones:    r.phones    ?? {},
    inquiries: r.inquiries ?? {},
  };
};

const PIE_CONFIG: Record<
  'name_variations' | 'unknown_addresses' | 'unknown_phone_numbers',
  { cat: 'names' | 'addresses' | 'phones' }
> = {
  name_variations:       { cat: 'names' },
  unknown_addresses:     { cat: 'addresses' },
  unknown_phone_numbers: { cat: 'phones' },
};

const BUREAU_SHORT: Record<string, string> = { equifax: 'EQ', experian: 'EX', transunion: 'TU' };
const BUREAU_KEYS = ['equifax', 'experian', 'transunion'] as const;

// === Analyze Tab ===
type PersonalInfoErrors = {
  name_variations:       Record<string, string[]>;
  unknown_addresses:     Record<string, string[]>;
  unknown_phone_numbers: Record<string, string[]>;
};

const PRIORITY_STYLES: Record<string, string> = {
  critical: 'bg-red-950/40 border-red-800 text-red-400',
  high:     'bg-orange-950/40 border-orange-800 text-orange-400',
  medium:   'bg-yellow-950/30 border-yellow-800/60 text-yellow-500',
  low:      'bg-neutral-800/40 border-neutral-700 text-neutral-500',
};

const AnalyzeTab = ({
  accounts,
  runAnalyze,
  busy,
  clientId,
  clientEmail,
  onChange,
  client,
}: {
  accounts: ClientDetail['accounts'];
  runAnalyze: () => void;
  busy: boolean;
  clientId: string;
  clientEmail: string;
  onChange: () => void;
  client: ClientDetail['client'];
}) => {
  const getPersonalInfo = (c: ClientDetail['client']): PersonalInfoErrors => {
    const pie = c.personal_info_errors;
    const toMap = (v: unknown): Record<string, string[]> => {
      if (!v || Array.isArray(v)) return {};
      if (typeof v === 'object') return v as Record<string, string[]>;
      return {};
    };
    return {
      name_variations:       toMap(pie?.name_variations),
      unknown_addresses:     toMap(pie?.unknown_addresses),
      unknown_phone_numbers: toMap(pie?.unknown_phone_numbers),
    };
  };

  const [disputeTypes, setDisputeTypes] = React.useState<Record<string, string[]>>(() =>
    Object.fromEntries(accounts.map((a) => [a.id, a.dispute_types ?? []])));
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());
  const [bureauEdits, setBureauEdits] = React.useState<Record<string, Record<string, BureauDataEdit | null>>>(() => buildBureauEdits(accounts));
  const [topFields, setTopFields] = React.useState<Record<string, TopFields>>(() => buildTopFields(accounts));
  const [savedFlash, setSavedFlash] = React.useState<Record<string, boolean>>({});
  const [deleteConfirm, setDeleteConfirm] = React.useState<string | null>(null);
  const [summaryToast, setSummaryToast] = React.useState<{ msg: string; ok: boolean } | null>(null);
  const [personalInfo, setPersonalInfo] = React.useState<PersonalInfoErrors>(() => getPersonalInfo(client));

  React.useEffect(() => {
    setDisputeTypes(Object.fromEntries(accounts.map((a) => [a.id, a.dispute_types ?? []])));
    setBureauEdits(buildBureauEdits(accounts));
    setTopFields(buildTopFields(accounts));
  }, [accounts]);

  React.useEffect(() => {
    setPersonalInfo(getPersonalInfo(client));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const [disputeSelections, setDisputeSelections] = React.useState<DisputeSelections>(() =>
    initDisputeSelections(client.dispute_selections));
  const [selectionFlash, setSelectionFlash] = React.useState(false);

  React.useEffect(() => {
    setDisputeSelections(initDisputeSelections(client.dispute_selections));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const showFlash = (key: string) => {
    setSavedFlash((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setSavedFlash((prev) => ({ ...prev, [key]: false })), 1500);
  };

  const flash = (k: string) =>
    savedFlash[k] ? <span className="text-emerald-400 text-[9px] ml-1">✓</span> : null;

  const patchAccount = (accountId: string, data: Record<string, unknown>) =>
    fetch('/api/analyze-reports', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ accountId, ...data }),
    });

  const toggleExpanded = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleFCRASection = async (accountId: string, section: string) => {
    const current = disputeTypes[accountId] ?? [];
    const next = current.includes(section) ? current.filter((s) => s !== section) : [...current, section];
    setDisputeTypes((prev) => ({ ...prev, [accountId]: next }));
    await patchAccount(accountId, { dispute_types: next });
  };

  const getActiveBureaus = (accountId: string): string[] => {
    const edits = bureauEdits[accountId];
    if (!edits) return [];
    return (['equifax', 'experian', 'transunion'] as const).filter((b) => edits[b] != null);
  };

  const handleTopFieldBlur = async (accountId: string, field: keyof TopFields, value: string) => {
    await patchAccount(accountId, { [field]: value });
    showFlash(`${accountId}:${field}`);
  };

  const handleBureauCellChange = (accountId: string, bureau: string, field: keyof BureauDataEdit, value: string) => {
    setBureauEdits((prev) => ({
      ...prev,
      [accountId]: {
        ...prev[accountId],
        [bureau]: { ...(prev[accountId]?.[bureau] ?? emptyBureauEdit()), [field]: value },
      },
    }));
  };

  const handleBureauCellBlur = async (accountId: string, bureau: string, field: keyof BureauDataEdit) => {
    const edit = bureauEdits[accountId]?.[bureau];
    if (!edit) return;
    const jsonb = bureauEditToJsonb(edit);
    await patchAccount(accountId, {
      [`${bureau}_data`]: jsonb,
      [`account_number_${bureau}`]: jsonb.account_number,
    });
    showFlash(`${accountId}:${bureau}:${field}`);
  };

  const handleDeleteAccount = async (accountId: string) => {
    await fetch('/api/analyze-reports', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ accountId }),
    });
    setDeleteConfirm(null);
    onChange();
  };

  const removePersonalInfoItem = async (field: keyof PersonalInfoErrors, key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _removed, ...rest } = personalInfo[field];
    const updated: PersonalInfoErrors = { ...personalInfo, [field]: rest };
    setPersonalInfo(updated);
    await fetch('/api/update-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ clientId, personal_info_errors: updated }),
    });
  };

  const saveDisputeSelections = async (next: DisputeSelections) => {
    setDisputeSelections(next);
    await fetch('/api/update-dispute-selections', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ clientId, disputeSelections: next }),
    });
    setSelectionFlash(true);
    setTimeout(() => setSelectionFlash(false), 1500);
  };

  const toggleItemBureau = (
    cat: 'names' | 'addresses' | 'phones' | 'inquiries',
    key: string,
    bureau: 'equifax' | 'experian' | 'transunion',
  ) => {
    const prev = disputeSelections[cat][key] ?? emptyItemSelection();
    saveDisputeSelections({
      ...disputeSelections,
      [cat]: { ...disputeSelections[cat], [key]: { ...prev, bureaus: { ...prev.bureaus, [bureau]: !prev.bureaus[bureau] } } },
    });
  };

  const toggleItemFcra = (
    cat: 'names' | 'addresses' | 'phones' | 'inquiries',
    key: string,
    section: string,
  ) => {
    const prev = disputeSelections[cat][key] ?? emptyItemSelection();
    const secs = prev.fcra_sections.includes(section)
      ? prev.fcra_sections.filter((s) => s !== section)
      : [...prev.fcra_sections, section];
    saveDisputeSelections({
      ...disputeSelections,
      [cat]: { ...disputeSelections[cat], [key]: { ...prev, fcra_sections: secs } },
    });
  };

  const toggleAccountBureau = (accountId: string, bureau: 'equifax' | 'experian' | 'transunion') => {
    const prev = disputeSelections.accounts[accountId] ?? emptyItemSelection();
    saveDisputeSelections({
      ...disputeSelections,
      accounts: { ...disputeSelections.accounts, [accountId]: { ...prev, bureaus: { ...prev.bureaus, [bureau]: !prev.bureaus[bureau] } } },
    });
  };

  const sendReportSummary = async () => {
    try {
      const r = await fetch('/api/send-report-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId }),
      });
      const j = await r.json();
      setSummaryToast({ msg: r.ok ? `Report summary sent to ${clientEmail}` : (j.error || 'Failed'), ok: r.ok });
    } catch {
      setSummaryToast({ msg: 'Network error sending report summary', ok: false });
    }
    setTimeout(() => setSummaryToast(null), 4000);
  };

  const inp = 'bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-luxury-red/50 focus:bg-[#111] text-white px-1 py-0.5 text-xs w-full focus:outline-none transition-colors rounded-sm';
  const BUREAU_LABELS: Record<string, string> = { equifax: 'Equifax', experian: 'Experian', transunion: 'TransUnion' };

  const hasPersonalInfo =
    Object.keys(personalInfo.name_variations).length > 0 ||
    Object.keys(personalInfo.unknown_addresses).length > 0 ||
    Object.keys(personalInfo.unknown_phone_numbers).length > 0;

  const unauthorizedInquiries = (client.inquiries ?? []).filter((q) => q.inquiry_type === 'hard' && q.potentially_unauthorized);

  return (
    <div>
      {summaryToast && (
        <div className={`text-sm px-4 py-3 rounded-sm mb-4 ${summaryToast.ok ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-200' : 'bg-red-950/50 border border-red-800 text-red-300'}`}>
          {summaryToast.msg}
        </div>
      )}
      {selectionFlash && (
        <div className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 rounded-sm px-3 py-1.5 mb-4 inline-block">
          ✓ Selections saved
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="font-serif-display text-2xl text-white">Negative Accounts</h2>
          <p className="text-sm text-neutral-400">Click any field to edit inline. Expand rows to compare bureau data.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={sendReportSummary}
            disabled={busy || accounts.length === 0}
            className="border border-luxury-red/40 hover:bg-luxury-red/10 disabled:opacity-40 text-luxury-red px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Send Report Summary
          </button>
          <button
            onClick={runAnalyze}
            disabled={busy}
            className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            {accounts.length === 0 ? 'Run Analysis' : 'Re-run Analysis'}
          </button>
        </div>
      </div>

      {/* Personal Info Errors */}
      {hasPersonalInfo && (
        <div className="bg-[#1a1a1a] border border-amber-900/50 rounded-sm p-5 mb-6">
          <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">Personal Information Errors Detected</h3>
          <p className="text-xs text-neutral-500 mb-3">Remove any item that has been corrected or is not a dispute target.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {([
              { field: 'name_variations' as const, label: 'Name Variations' },
              { field: 'unknown_addresses' as const, label: 'Unknown Addresses' },
              { field: 'unknown_phone_numbers' as const, label: 'Unknown Phone Numbers' },
            ]).map(({ field, label }) =>
              Object.keys(personalInfo[field]).length > 0 ? (
                <div key={field}>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">{label}</p>
                  <div className="flex flex-col gap-1">
                    {Object.entries(personalInfo[field]).map(([item, bureaus]) => {
                      const cfg = PIE_CONFIG[field];
                      const sel = disputeSelections[cfg.cat][item] ?? emptyItemSelection();
                      return (
                        <div key={item} className="bg-[#0f0f0f] border border-neutral-800 rounded-sm px-2 py-1.5 space-y-1.5">
                          {/* Existing: item text + delete */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-300 flex-1">{item}</span>
                            <button
                              onClick={() => removePersonalInfoItem(field, item)}
                              className="text-neutral-600 hover:text-red-400 transition-colors text-sm leading-none flex-shrink-0"
                            >
                              ✕
                            </button>
                          </div>
                          {/* Row 1: Reported by — bureaus come directly from stored attribution */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-600">Reported by:</span>
                            {Array.isArray(bureaus) && bureaus.length > 0
                              ? bureaus.map((b) => (
                                  <span key={b} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border border-luxury-red bg-luxury-red/10 text-luxury-red">
                                    {BUREAU_LABELS[b] ?? b}
                                  </span>
                                ))
                              : <span className="text-[9px] text-neutral-700">Unknown</span>
                            }
                          </div>
                          {/* Row 2: Add to letter */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-600">Add to letter:</span>
                            {BUREAU_KEYS.map((b) => {
                              const active = sel.bureaus[b];
                              return (
                                <label key={b} className="flex items-center gap-1 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={() => toggleItemBureau(cfg.cat, item, b)}
                                    className="accent-luxury-red w-3 h-3 flex-shrink-0"
                                  />
                                  <span className={`text-[9px] uppercase tracking-wider ${active ? 'text-luxury-red' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                    {BUREAU_SHORT[b]}
                                  </span>
                                </label>
                              );
                            })}
                            <span className="text-neutral-700 text-[9px] mx-0.5">|</span>
                            {FCRA_SECTIONS.map(({ key: fkey, label: flabel }) => {
                              const active = sel.fcra_sections.includes(fkey);
                              return (
                                <label key={fkey} className="flex items-center gap-1 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={() => toggleItemFcra(cfg.cat, item, fkey)}
                                    className="accent-luxury-red w-3 h-3 flex-shrink-0"
                                  />
                                  <span className={`text-[9px] uppercase tracking-wider ${active ? 'text-luxury-red' : 'text-neutral-500 group-hover:text-neutral-300'}`} title={flabel}>
                                    {fkey}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {accounts.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-10 text-center text-neutral-400">
          No accounts analyzed yet. Click "Run Analysis" to extract negative items from uploaded credit reports.
        </div>
      ) : (
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0f0f0f] border-b border-neutral-800">
                <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-500">
                  <th className="px-3 py-3 w-8"></th>
                  <th className="px-3 py-3 min-w-[220px]">Creditor / Type</th>
                  <th className="px-3 py-3 min-w-[120px]">Bureaus</th>
                  <th className="px-3 py-3 min-w-[155px]">FCRA Sections</th>
                  <th className="px-3 py-3 min-w-[100px]">Dispute To</th>
                  <th className="px-3 py-3 w-24"></th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => {
                  const isExpanded = expandedRows.has(a.id);
                  const fcra = disputeTypes[a.id] ?? [];
                  const activeBureaus = getActiveBureaus(a.id);
                  const tf = topFields[a.id];
                  if (!tf) return null;
                  const priority = (a.dispute_priority ?? 'medium') as string;
                  const priorityStyle = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.low;

                  return (
                    <React.Fragment key={a.id}>
                      {/* Collapsed row */}
                      <tr className={`border-b border-neutral-800/50 align-top ${isExpanded ? 'bg-[#151515]' : ''}`}>

                        {/* Expand toggle */}
                        <td className="px-3 py-3 text-center align-middle">
                          <button
                            onClick={() => toggleExpanded(a.id)}
                            className="text-neutral-500 hover:text-white transition-colors text-base leading-none select-none"
                          >
                            {isExpanded ? '▾' : '▸'}
                          </button>
                        </td>

                        {/* Creditor / Original / Type + priority badge + flags */}
                        <td className="px-3 py-2">
                          <div className="flex items-start gap-1.5 mb-0.5">
                            <input
                              value={tf.creditor_name}
                              onChange={(e) => setTopFields((p) => ({ ...p, [a.id]: { ...p[a.id], creditor_name: e.target.value } }))}
                              onBlur={(e) => handleTopFieldBlur(a.id, 'creditor_name', e.target.value)}
                              className={`${inp} font-semibold`}
                              placeholder="Creditor"
                            />
                            {flash(`${a.id}:creditor_name`)}
                            <span className={`flex-shrink-0 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm border font-bold ${priorityStyle}`}>
                              {priority}
                            </span>
                            {a.strategy_notes && (
                              <span
                                title={a.strategy_notes}
                                className="flex-shrink-0 text-[11px] text-neutral-500 hover:text-amber-400 cursor-help transition-colors leading-none mt-0.5"
                              >
                                ⓘ
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 flex items-center gap-0.5">
                            <input
                              value={tf.original_creditor}
                              onChange={(e) => setTopFields((p) => ({ ...p, [a.id]: { ...p[a.id], original_creditor: e.target.value } }))}
                              onBlur={(e) => handleTopFieldBlur(a.id, 'original_creditor', e.target.value)}
                              className={`${inp} text-neutral-400`}
                              placeholder="Original creditor"
                            />
                            {flash(`${a.id}:original_creditor`)}
                          </div>
                          <div className="mt-0.5 flex items-center gap-0.5">
                            <input
                              value={tf.account_type}
                              onChange={(e) => setTopFields((p) => ({ ...p, [a.id]: { ...p[a.id], account_type: e.target.value } }))}
                              onBlur={(e) => handleTopFieldBlur(a.id, 'account_type', e.target.value)}
                              className={`${inp} text-neutral-500 text-[10px]`}
                              placeholder="Account type"
                            />
                            {flash(`${a.id}:account_type`)}
                          </div>
                          {a.duplicate_flag && (
                            <p className="mt-1 text-[10px] text-amber-400 bg-amber-950/30 border border-amber-800/50 rounded-sm px-1.5 py-0.5">
                              ⚠ Possible duplicate reporting — verify before disputing
                            </p>
                          )}
                          {a.balance_inconsistency && (
                            <p className="mt-1 text-[10px] text-sky-400 bg-sky-950/30 border border-sky-800/50 rounded-sm px-1.5 py-0.5">
                              ≠ Balance inconsistency across bureaus — dispute angle
                            </p>
                          )}
                        </td>

                        {/* Bureau badges — read-only, derived from non-null jsonb */}
                        <td className="px-3 py-2">
                          <div className="flex flex-col gap-1">
                            {(['equifax', 'experian', 'transunion'] as const).map((b) => {
                              const active = activeBureaus.includes(b);
                              return (
                                <span
                                  key={b}
                                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border w-fit ${
                                    active
                                      ? 'border-luxury-red bg-luxury-red/10 text-luxury-red'
                                      : 'border-neutral-800 text-neutral-700'
                                  }`}
                                >
                                  {BUREAU_LABELS[b]}
                                </span>
                              );
                            })}
                          </div>
                        </td>

                        {/* FCRA Sections — pre-selected from recommended_fcra_sections via dispute_types */}
                        <td className="px-3 py-2">
                          <div className="flex flex-col gap-1">
                            {FCRA_SECTIONS.map(({ key, label }) => {
                              const active = fcra.includes(key);
                              return (
                                <label key={key} className="flex items-center gap-1.5 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={() => handleFCRASection(a.id, key)}
                                    className="accent-luxury-red w-3 h-3 flex-shrink-0"
                                  />
                                  <span className={`text-[10px] uppercase tracking-wider ${active ? 'text-luxury-red' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                    {label}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </td>

                        {/* Dispute To — which bureau letter(s) this account goes into */}
                        <td className="px-3 py-2">
                          <div className="flex flex-col gap-1">
                            {BUREAU_KEYS.map((b) => {
                              const active = (disputeSelections.accounts[a.id] ?? emptyItemSelection()).bureaus[b];
                              return (
                                <label key={b} className="flex items-center gap-1.5 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={() => toggleAccountBureau(a.id, b)}
                                    className="accent-luxury-red w-3 h-3 flex-shrink-0"
                                  />
                                  <span className={`text-[10px] uppercase tracking-wider ${active ? 'text-luxury-red' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                    {BUREAU_SHORT[b]}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </td>

                        {/* Delete */}
                        <td className="px-3 py-2 text-right align-middle">
                          {deleteConfirm === a.id ? (
                            <div className="flex items-center gap-1 justify-end">
                              <span className="text-[9px] text-red-400">Delete?</span>
                              <button
                                onClick={() => handleDeleteAccount(a.id)}
                                className="text-[9px] uppercase tracking-wider text-red-400 border border-red-800 px-1.5 py-0.5 rounded-sm hover:bg-red-950"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-[9px] uppercase tracking-wider text-neutral-400 border border-neutral-700 px-1.5 py-0.5 rounded-sm hover:bg-neutral-800"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(a.id)}
                              className="text-neutral-600 hover:text-red-400 transition-colors text-sm px-1"
                            >
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>

                      {/* Expanded comparison row */}
                      {isExpanded && (
                        <tr className="border-b border-neutral-700 bg-[#111]">
                          <td colSpan={6} className="px-6 py-5">
                            {(a.duplicate_note || a.balance_inconsistency_note) && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {a.duplicate_note && (
                                  <p className="text-[11px] text-amber-300 bg-amber-950/30 border border-amber-800/50 rounded-sm px-3 py-1.5 flex-1 min-w-0">
                                    <span className="font-semibold">Duplicate note:</span> {a.duplicate_note}
                                  </p>
                                )}
                                {a.balance_inconsistency_note && (
                                  <p className="text-[11px] text-sky-300 bg-sky-950/30 border border-sky-800/50 rounded-sm px-3 py-1.5 flex-1 min-w-0">
                                    <span className="font-semibold">Balance note:</span> {a.balance_inconsistency_note}
                                  </p>
                                )}
                              </div>
                            )}
                            <table className="w-full text-xs border-collapse">
                              <thead>
                                <tr className="text-[10px] uppercase tracking-widest">
                                  <th className="text-left py-2 pr-4 text-neutral-500 font-normal w-28">Field</th>
                                  {(['equifax', 'experian', 'transunion'] as const).map((b) => {
                                    const active = activeBureaus.includes(b);
                                    return (
                                      <th key={b} className={`text-left py-2 px-3 font-semibold ${active ? 'text-luxury-red' : 'text-neutral-700'}`}>
                                        {BUREAU_LABELS[b]}
                                        {!active && <span className="ml-1 font-normal text-neutral-700 normal-case tracking-normal">(not reported)</span>}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-neutral-800/50">
                                {COMPARISON_FIELDS.map(({ key, label }) => (
                                  <tr key={key}>
                                    <td className="py-1.5 pr-4 text-neutral-500">{label}</td>
                                    {(['equifax', 'experian', 'transunion'] as const).map((b) => {
                                      const bEdit = bureauEdits[a.id]?.[b] ?? null;
                                      const flashKey = `${a.id}:${b}:${key}`;
                                      return (
                                        <td key={b} className="py-1.5 px-3">
                                          {bEdit !== null ? (
                                            <div className="flex items-center gap-0.5">
                                              <input
                                                value={bEdit[key]}
                                                onChange={(e) => handleBureauCellChange(a.id, b, key, e.target.value)}
                                                onBlur={() => handleBureauCellBlur(a.id, b, key)}
                                                className="bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-luxury-red/50 focus:bg-[#0f0f0f] text-neutral-300 px-1 py-0.5 w-full focus:outline-none transition-colors"
                                                placeholder="—"
                                              />
                                              {flash(flashKey)}
                                            </div>
                                          ) : (
                                            <span className="text-neutral-700">—</span>
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Positive Accounts */}
      {Array.isArray(client.positive_accounts) && client.positive_accounts.length > 0 && (
        <div className="mt-6 bg-[#1a1a1a] border border-emerald-900/40 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-emerald-900/40">
            <h3 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Positive Accounts ({client.positive_accounts.length})
            </h3>
            <p className="text-xs text-neutral-500 mt-1">Accounts in good standing — use to demonstrate creditworthiness in letters.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0f0f0f] border-b border-emerald-900/30">
                <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-500">
                  <th className="px-4 py-3">Creditor</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Balance</th>
                  <th className="px-4 py-3">Opened</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Bureaus</th>
                </tr>
              </thead>
              <tbody>
                {(client.positive_accounts as Array<Record<string, unknown>>).map((pa, i) => (
                  <tr key={i} className="border-b border-neutral-800/50">
                    <td className="px-4 py-3 text-white font-medium">{String(pa.creditor_name ?? '—')}</td>
                    <td className="px-4 py-3 text-neutral-400 text-xs">{String(pa.account_type ?? '—')}</td>
                    <td className="px-4 py-3 text-neutral-300">{String(pa.balance ?? '—')}</td>
                    <td className="px-4 py-3 text-neutral-400 text-xs">{String(pa.date_opened ?? '—')}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 rounded-sm px-2 py-0.5">
                        {String(pa.status ?? '—')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(pa.bureaus) ? pa.bureaus : []).map((b) => (
                          <span key={String(b)} className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm border border-emerald-900/50 text-emerald-500">
                            {String(b)}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hard Unauthorized Inquiries */}
      {unauthorizedInquiries.length > 0 && (
        <div className="mt-6 bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800">
            <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
              Hard Inquiries — Potentially Unauthorized ({unauthorizedInquiries.length})
            </h3>
            <p className="text-xs text-neutral-500 mt-1">Only hard inquiries shown. Confirm each as unauthorized before adding to letters.</p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[#0f0f0f] border-b border-neutral-800">
              <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-500">
                <th className="px-4 py-3">Creditor / Reason</th>
                <th className="px-4 py-3">Bureau</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Confirm</th>
                <th className="px-4 py-3 min-w-[200px]">Add to Letter</th>
              </tr>
            </thead>
            <tbody>
              {unauthorizedInquiries.map((q, i) => {
                const iqKey = `${q.creditor}:${q.bureau}:${q.date}`;
                const iqSel = disputeSelections.inquiries[iqKey] ?? emptyItemSelection();
                const isConfirmed = (iqSel as unknown as Record<string, boolean>).confirmed_unauthorized === true;
                return (
                  <tr key={i} className="border-b border-neutral-800/60 align-top">
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{q.creditor}</div>
                      {q.reason && <div className="text-[10px] text-neutral-500 mt-0.5">{q.reason}</div>}
                    </td>
                    <td className="px-4 py-3 text-neutral-300 capitalize text-xs">{q.bureau}</td>
                    <td className="px-4 py-3 text-neutral-400 text-xs">{q.date}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          const next = {
                            ...disputeSelections,
                            inquiries: {
                              ...disputeSelections.inquiries,
                              [iqKey]: {
                                ...iqSel,
                                confirmed_unauthorized: !isConfirmed,
                              } as unknown as typeof iqSel,
                            },
                          };
                          saveDisputeSelections(next);
                        }}
                        className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm border transition-colors whitespace-nowrap ${
                          isConfirmed
                            ? 'border-red-800 bg-red-950/30 text-red-400 hover:bg-red-950/50'
                            : 'border-neutral-700 text-neutral-500 hover:border-amber-700 hover:text-amber-400'
                        }`}
                      >
                        {isConfirmed ? '✓ Unauthorized' : 'Confirm Unauthorized'}
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          {BUREAU_KEYS.map((b) => {
                            const active = iqSel.bureaus[b];
                            const isHinted = q.bureau?.toLowerCase() === b;
                            return (
                              <label key={b} className="flex items-center gap-1 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={active}
                                  onChange={() => toggleItemBureau('inquiries', iqKey, b)}
                                  className="accent-luxury-red w-3 h-3 flex-shrink-0"
                                />
                                <span className={`text-[9px] uppercase tracking-wider ${active ? 'text-luxury-red' : isHinted ? 'text-amber-500/60 group-hover:text-amber-400' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                  {BUREAU_SHORT[b]}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          {FCRA_SECTIONS.map(({ key: fkey, label: flabel }) => {
                            const active = iqSel.fcra_sections.includes(fkey);
                            return (
                              <label key={fkey} className="flex items-center gap-1 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={active}
                                  onChange={() => toggleItemFcra('inquiries', iqKey, fkey)}
                                  className="accent-luxury-red w-3 h-3 flex-shrink-0"
                                />
                                <span className={`text-[9px] uppercase tracking-wider ${active ? 'text-luxury-red' : 'text-neutral-500 group-hover:text-neutral-300'}`} title={flabel}>
                                  {fkey}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

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
    recipientName: BUREAU_ADDRESSES.transunionFraud.name,
    recipientAddress: `ATTN: ${BUREAU_ADDRESSES.transunionFraud.dept}\n${BUREAU_ADDRESSES.transunionFraud.address}`,
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
    recipientName: BUREAU_ADDRESSES.transunionDispute.name,
    recipientAddress: `ATTN: ${BUREAU_ADDRESSES.transunionDispute.dept}\n${BUREAU_ADDRESSES.transunionDispute.address}`,
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
  docUrls,
  ftcReportFileCount,
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
  docUrls: Record<string, string | null>;
  ftcReportFileCount: number;
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [letterType, setLetterType] = useState<LetterTypeKey>('605B');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [showCustom, setShowCustom] = useState(false);
  const [bureauLetterType, setBureauLetterType] = useState<LetterTypeKey>('611');
  const [phase1Steps, setPhase1Steps] = useState<Array<{ label: string; status: 'pending' | 'generating' | 'done' | 'error' }>>([]);
  const [phase1Running, setPhase1Running] = useState(false);
  const [mailAllModal, setMailAllModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const selectedIds = Object.keys(selected).filter((k) => selected[k]);

  const furnisherMap: Record<string, ClientDetail['accounts']> = {};
  for (const a of accounts) {
    if ((a.dispute_types ?? []).some((t: string) => ['623', '809'].includes(t))) {
      const key = (a.original_creditor as string | undefined) || a.creditor_name;
      furnisherMap[key] = [...(furnisherMap[key] ?? []), a];
    }
  }
  const furnisherGroups = Object.entries(furnisherMap);

  const caseTypeLabel = String(client.case_type ?? 'identity_theft') === 'standard_dispute' ? 'Standard Dispute' : 'Identity Theft';
  const ftcNums = (client.ftc_report_numbers ?? []) as string[];
  const totalSelected = accounts.length;
  const unmairedLetters = letters.filter((l) => !l.lob_tracking_number);

  const addBizDays = (d: Date, n: number): Date => {
    const r = new Date(d);
    let c = 0;
    while (c < n) { r.setDate(r.getDate() + 1); if (r.getDay() !== 0 && r.getDay() !== 6) c++; }
    return r;
  };
  const getDeadline = (mailedAt: string | null | undefined, type: string): Date | null => {
    if (!mailedAt) return null;
    const d = new Date(mailedAt);
    if (type === '605B') return addBizDays(d, 4);
    if (type === '609') { const r = new Date(d); r.setDate(r.getDate() + 15); return r; }
    if (['611', '623', '809'].includes(type)) { const r = new Date(d); r.setDate(r.getDate() + 30); return r; }
    return null;
  };

  const handleGeneratePhase1Packet = async () => {
    const bureaus = (['equifax', 'experian', 'transunion'] as const).filter(
      (b) => accounts.some((a) => (a as Record<string, unknown>)[`${b}_data`] != null),
    );
    if (bureaus.length === 0 && furnisherGroups.length === 0) {
      alert('No credit report data available. Run analysis first.');
      return;
    }
    const phaseType: LetterTypeKey = String(client.case_type ?? 'identity_theft') === 'standard_dispute' ? '611' : '605B';
    const steps = [
      ...bureaus.map((b) => ({ label: `${b.charAt(0).toUpperCase() + b.slice(1)} §${phaseType}`, status: 'pending' as const })),
      ...furnisherGroups.map(([name]) => ({ label: `${name} (Furnisher)`, status: 'pending' as const })),
    ];
    setPhase1Steps(steps);
    setPhase1Running(true);
    setBusy(true);
    try {
      for (let i = 0; i < bureaus.length; i++) {
        const b = bureaus[i];
        setPhase1Steps((p) => p.map((s, idx) => idx === i ? { ...s, status: 'generating' } : s));
        setBusyMsg(`Generating ${b} §${phaseType} letter…`);
        const bureauAccts = accounts.filter((a) => (a as Record<string, unknown>)[`${b}_data`] != null);
        const preset = getBureauPreset(b, phaseType);
        const res = await fetch('/api/generate-letters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...adminHeaders() },
          body: JSON.stringify({
            clientId, letterType: phaseType, recipientName: preset.name, recipientAddress: preset.address,
            accountIds: bureauAccts.map((a) => a.id), bureau: b,
            clientData: { fullName: client.full_name, address: client.address, city: client.city, state: client.state, zip: client.zip, email: client.email, phone: client.phone },
          }),
        });
        setPhase1Steps((p) => p.map((s, idx) => idx === i ? { ...s, status: res.ok ? 'done' : 'error' } : s));
      }
      const offset = bureaus.length;
      for (let i = 0; i < furnisherGroups.length; i++) {
        const [creditorName, credAccts] = furnisherGroups[i];
        setPhase1Steps((p) => p.map((s, idx) => idx === offset + i ? { ...s, status: 'generating' } : s));
        setBusyMsg(`Generating letter to ${creditorName}…`);
        const types = credAccts.flatMap((a) => a.dispute_types ?? []);
        const lType: LetterTypeKey = types.includes('623') ? '623' : '809';
        const res = await fetch('/api/generate-letters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...adminHeaders() },
          body: JSON.stringify({
            clientId, letterType: lType, recipientName: creditorName,
            recipientAddress: 'Address on File — Verify Before Mailing',
            accountIds: credAccts.map((a) => a.id),
            clientData: { fullName: client.full_name, address: client.address, city: client.city, state: client.state, zip: client.zip, email: client.email, phone: client.phone },
          }),
        });
        setPhase1Steps((p) => p.map((s, idx) => idx === offset + i ? { ...s, status: res.ok ? 'done' : 'error' } : s));
      }
      onChange();
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setPhase1Running(false);
      setBusy(false);
      setBusyMsg('');
    }
  };

  const handleMailAll = async () => {
    setMailAllModal(false);
    setBusy(true);
    for (const l of unmairedLetters.filter((x) => x.pdf_unsigned_path)) {
      setBusyMsg(`Mailing to ${l.recipient_name}…`);
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ letterId: l.id, clientId }),
      });
      if (!res.ok) {
        const j = await res.json();
        alert(`Failed to mail to ${l.recipient_name}: ${j.error || 'Unknown error'}`);
      }
    }
    setBusy(false);
    setBusyMsg('');
    onChange();
  };

  const bureauLettersList = letters.filter((l) =>
    ['Experian', 'Equifax', 'TransUnion'].includes(l.recipient_name),
  );
  const furnisherLettersList = letters.filter(
    (l) => !['Experian', 'Equifax', 'TransUnion'].includes(l.recipient_name),
  );

  const getBureauPreset = (bureau: string, type: LetterTypeKey) => {
    const isFraud = type === '605B';
    switch (bureau) {
      case 'equifax':
        return isFraud
          ? { name: BUREAU_ADDRESSES.equifaxFraud.name, address: `${BUREAU_ADDRESSES.equifaxFraud.dept}\n${BUREAU_ADDRESSES.equifaxFraud.address}` }
          : { name: BUREAU_ADDRESSES.equifaxDispute.name, address: `${BUREAU_ADDRESSES.equifaxDispute.dept}\n${BUREAU_ADDRESSES.equifaxDispute.address}` };
      case 'experian':
        return isFraud
          ? { name: BUREAU_ADDRESSES.experianFraud.name, address: `${BUREAU_ADDRESSES.experianFraud.dept}\n${BUREAU_ADDRESSES.experianFraud.address}` }
          : { name: BUREAU_ADDRESSES.experianDispute.name, address: `${BUREAU_ADDRESSES.experianDispute.dept}\n${BUREAU_ADDRESSES.experianDispute.address}` };
      default: // transunion
        return isFraud
          ? { name: BUREAU_ADDRESSES.transunionFraud.name, address: `ATTN: ${BUREAU_ADDRESSES.transunionFraud.dept}\n${BUREAU_ADDRESSES.transunionFraud.address}` }
          : { name: BUREAU_ADDRESSES.transunionDispute.name, address: `ATTN: ${BUREAU_ADDRESSES.transunionDispute.dept}\n${BUREAU_ADDRESSES.transunionDispute.address}` };
    }
  };

  const handleGenerateBureauLetters = async () => {
    const bureaus = ['equifax', 'experian', 'transunion'] as const;
    let anyGenerated = false;
    setBusy(true);
    try {
      for (const bureau of bureaus) {
        const bureauAccts = accounts.filter((a) => (a as Record<string, unknown>)[`${bureau}_data`] != null);
        if (bureauAccts.length === 0) continue;
        const preset = getBureauPreset(bureau, bureauLetterType);
        setBusyMsg(`Generating ${bureau.charAt(0).toUpperCase() + bureau.slice(1)} letter…`);
        const res = await fetch('/api/generate-letters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...adminHeaders() },
          body: JSON.stringify({
            clientId,
            letterType: bureauLetterType,
            recipientName: preset.name,
            recipientAddress: preset.address,
            accountIds: bureauAccts.map((a) => a.id),
            bureau,
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
        if (!res.ok) {
          const j = await res.json();
          alert(`Failed to generate ${bureau} letter: ${j.error || 'Unknown error'}`);
          continue;
        }
        anyGenerated = true;
      }
      if (anyGenerated) onChange();
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  const handleGenerateFurnisherLetters = async () => {
    if (furnisherGroups.length === 0) return;
    let anyGenerated = false;
    setBusy(true);
    try {
      for (const [creditorName, credAccts] of furnisherGroups) {
        const types = credAccts.flatMap((a) => a.dispute_types ?? []);
        const lType: LetterTypeKey = types.includes('623') ? '623' : '809';
        setBusyMsg(`Generating letter to ${creditorName}…`);
        const res = await fetch('/api/generate-letters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...adminHeaders() },
          body: JSON.stringify({
            clientId,
            letterType: lType,
            recipientName: creditorName,
            recipientAddress: 'Address on File — Verify Before Mailing',
            accountIds: credAccts.map((a) => a.id),
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
        if (!res.ok) {
          const j = await res.json();
          alert(`Failed to generate letter to ${creditorName}: ${j.error || 'Unknown error'}`);
          continue;
        }
        anyGenerated = true;
      }
      if (anyGenerated) onChange();
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

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

  const preflightChecks = [
    { label: 'Case type set', ok: !!client.case_type },
    { label: 'FTC report numbers entered', ok: ftcNums.length > 0 },
    { label: 'FTC report PDFs uploaded', ok: ftcReportFileCount > 0 },
    { label: 'Analysis complete', ok: accounts.length > 0 },
    { label: 'Gov ID uploaded', ok: !!docUrls.doc_dl_front },
    { label: 'Proof of address uploaded', ok: !!docUrls.doc_utility_bill },
  ];
  const allChecksPass = preflightChecks.every((c) => c.ok);

  return (
    <div className="space-y-8">

      {/* === Pre-flight Checklist === */}
      <div className="bg-[#111] border border-neutral-800 rounded-sm p-5">
        <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-3">Pre-flight Checklist</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {preflightChecks.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-xs">
              <span className={c.ok ? 'text-emerald-400' : 'text-red-500'}>{c.ok ? '✓' : '✕'}</span>
              <span className={c.ok ? 'text-neutral-300' : 'text-neutral-500'}>{c.label}</span>
            </div>
          ))}
        </div>
        {!allChecksPass && (
          <p className="text-[10px] text-amber-400 mt-3">Complete all items above before generating letters.</p>
        )}
      </div>

      {/* === Phase 1 Packet === */}
      <div className="bg-[#111] border border-luxury-red/25 rounded-sm p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">Phase 1 Packet</h3>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm border border-luxury-red/30 text-luxury-red/80">
                {caseTypeLabel}
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm border border-neutral-700 text-neutral-400">
                Round {disputeRound}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              {ftcNums.length > 0
                ? `FTC Report(s): ${ftcNums.join(', ')}`
                : <span className="text-amber-400">⚠ No FTC report numbers entered — add in Overview tab</span>}
            </p>
          </div>
          <p className="text-xs text-neutral-400">
            <span className="text-white font-semibold">{totalSelected}</span> account{totalSelected !== 1 ? 's' : ''} analyzed
            {totalSelected === 0 && <span className="ml-2 text-amber-400">— run analysis first</span>}
          </p>
        </div>

        {phase1Steps.length > 0 && (
          <div className="mb-5 space-y-1.5">
            {phase1Steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className={`w-4 text-center font-bold ${step.status === 'done' ? 'text-emerald-400' : step.status === 'error' ? 'text-red-400' : step.status === 'generating' ? 'text-amber-400' : 'text-neutral-700'}`}>
                  {step.status === 'done' ? '✓' : step.status === 'error' ? '✕' : step.status === 'generating' ? '…' : '○'}
                </span>
                <span className={step.status === 'generating' ? 'text-amber-300' : step.status === 'done' ? 'text-emerald-300' : step.status === 'error' ? 'text-red-400' : 'text-neutral-500'}>
                  {step.label}
                </span>
                {step.status === 'generating' && <span className="text-amber-400 text-[9px] uppercase tracking-widest">Generating…</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleGeneratePhase1Packet}
            disabled={busy || phase1Running || accounts.length === 0 || !allChecksPass}
            title={!allChecksPass ? 'Complete all pre-flight checks first' : undefined}
            className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            {phase1Running ? 'Generating Packet…' : 'Generate Full Phase 1 Packet'}
          </button>
          {unmairedLetters.length > 0 && !phase1Running && (
            <button
              onClick={() => setMailAllModal(true)}
              disabled={busy}
              className="border border-luxury-red/40 hover:bg-luxury-red/10 disabled:opacity-40 text-luxury-red px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Approve &amp; Mail All ({unmairedLetters.length})
            </button>
          )}
        </div>
      </div>

      {/* Mail All Modal */}
      {mailAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1a1a1a] border border-neutral-700 rounded-sm p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-sm uppercase tracking-widest text-luxury-red font-bold mb-2">Approve &amp; Mail All Letters</h3>
            <p className="text-xs text-neutral-400 mb-4">The following letters will be sent via USPS Certified Mail. Response deadlines are calculated from today's mailing date.</p>
            <div className="space-y-2 mb-5">
              {unmairedLetters.map((l) => {
                const deadline = getDeadline(new Date().toISOString(), l.letter_type);
                return (
                  <div key={l.id} className="flex items-center justify-between text-xs bg-[#0f0f0f] border border-neutral-800 rounded-sm px-4 py-3">
                    <div>
                      <div className="text-white font-semibold">{l.recipient_name}</div>
                      <div className="text-neutral-400 mt-0.5">
                        {l.letter_type} · Response due: <span className="text-neutral-200">{deadline?.toLocaleDateString() ?? '—'}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border ${l.pdf_unsigned_path ? 'border-emerald-800 text-emerald-400' : 'border-amber-800 text-amber-400'}`}>
                      {l.pdf_unsigned_path ? 'PDF Ready' : 'No PDF'}
                    </span>
                  </div>
                );
              })}
            </div>
            {unmairedLetters.some((l) => !l.pdf_unsigned_path) && (
              <div className="mb-4 bg-amber-950/30 border border-amber-800 text-amber-200 text-xs px-4 py-3 rounded-sm">
                ⚠ Some letters have no PDF yet. Generate PDFs first — only PDF-ready letters will be mailed.
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button onClick={() => setMailAllModal(false)} className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white px-4 py-2 border border-neutral-700 rounded-sm transition-colors">
                Cancel
              </button>
              <button
                onClick={handleMailAll}
                disabled={busy || unmairedLetters.every((l) => !l.pdf_unsigned_path)}
                className="text-xs uppercase tracking-widest bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-2 rounded-sm transition-colors"
              >
                Confirm Mail All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced — Individual Generators (collapsible) */}
      <div>
        <button
          onClick={() => setShowAdvanced((s) => !s)}
          className="w-full flex items-center justify-between px-5 py-3 bg-[#1a1a1a] border border-neutral-800 rounded-sm text-xs uppercase tracking-widest text-neutral-500 hover:text-white hover:border-neutral-600 transition-colors"
        >
          <span>Advanced — Individual Letter Generators</span>
          <span className="text-base leading-none">{showAdvanced ? '▾' : '▸'}</span>
        </button>
        {showAdvanced && (
          <div className="space-y-6 mt-4">

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

      {/* Generate Bureau Letters */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-1">
          Bureau Letters
        </h3>
        <p className="text-xs text-neutral-400 mb-4">
          Generates one combined letter per bureau, listing only the accounts that bureau reports.
        </p>
        <div className="flex flex-wrap items-end gap-3 mb-3">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Letter Type</label>
            <select
              value={bureauLetterType}
              onChange={(e) => setBureauLetterType(e.target.value as LetterTypeKey)}
              className="bg-[#0f0f0f] border border-neutral-800 text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-luxury-red"
            >
              <option value="611">FCRA §611 — Dispute & Reinvestigation</option>
              <option value="605B">FCRA §605B — Identity Theft Block</option>
              <option value="609">FCRA §609 — File Disclosure</option>
            </select>
          </div>
          <button
            onClick={handleGenerateBureauLetters}
            disabled={busy || accounts.length === 0}
            className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Generate Bureau Letters
          </button>
        </div>
        {accounts.length > 0 && (
          <div className="flex gap-4 text-xs">
            {(['equifax', 'experian', 'transunion'] as const).map((b) => {
              const cnt = accounts.filter((a) => (a as Record<string, unknown>)[`${b}_data`] != null).length;
              return (
                <span key={b} className={cnt > 0 ? 'text-emerald-400' : 'text-neutral-600'}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}: {cnt} acct{cnt !== 1 ? 's' : ''}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Generate Furnisher Letters */}
      {furnisherGroups.length > 0 && (
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
          <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-1">
            Furnisher Letters
          </h3>
          <p className="text-xs text-neutral-400 mb-3">
            §623/§809 letters for accounts with Furnisher Dispute or Debt Validation selected.
          </p>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-3 mb-4 space-y-1">
            {furnisherGroups.map(([name, accts]) => {
              const types = accts.flatMap((a) => a.dispute_types ?? []);
              const lType = types.includes('623') ? '§623' : '§809';
              return (
                <div key={name} className="flex items-center justify-between text-xs">
                  <span className="text-white">{name}</span>
                  <span className="text-neutral-400">{lType} · {accts.length} acct{accts.length !== 1 ? 's' : ''}</span>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleGenerateFurnisherLetters}
            disabled={busy}
            className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Generate Furnisher Letters
          </button>
        </div>
      )}

      {/* Custom Letter Generator */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-6">
        <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold mb-4">
          Custom Letter
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

          </div>
        )}
      </div>

      {/* Bureau Letters */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800">
          <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
            Bureau Letters ({bureauLettersList.length})
          </h3>
        </div>
        {bureauLettersList.length === 0 ? (
          <div className="p-10 text-center text-neutral-500 text-sm">No bureau letters generated yet.</div>
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
              {bureauLettersList.map((l) => (
                <tr key={l.id} className="border-b border-neutral-800/60">
                  <td className="px-4 py-3 text-white">{l.recipient_name}</td>
                  <td className="px-4 py-3 text-neutral-300 text-xs uppercase tracking-widest">{l.letter_type}</td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">{new Date(l.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-3">
                    <button onClick={() => downloadPdf(l.id)} disabled={busy} className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold">
                      Download PDF
                    </button>
                    {l.lob_tracking_number ? (
                      <span className="text-green-400 text-xs font-mono">Mailed ✓ {l.lob_tracking_number}</span>
                    ) : (
                      <button onClick={() => sendMail(l.id)} disabled={busy || !l.pdf_unsigned_path} className="text-amber-400 hover:text-amber-300 text-xs uppercase tracking-widest font-semibold disabled:opacity-40" title={!l.pdf_unsigned_path ? 'Generate PDF first' : 'Send via USPS Certified Mail'}>
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

      {/* Furnisher Letters */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800">
          <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
            Furnisher Letters ({furnisherLettersList.length})
          </h3>
        </div>
        {furnisherLettersList.length === 0 ? (
          <div className="p-10 text-center text-neutral-500 text-sm">No furnisher letters generated yet.</div>
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
              {furnisherLettersList.map((l) => (
                <tr key={l.id} className="border-b border-neutral-800/60">
                  <td className="px-4 py-3">
                    <div className="text-white">{l.recipient_name}</div>
                    {l.needs_address && (
                      <span className="text-[9px] uppercase tracking-widest text-amber-400 bg-amber-950/30 border border-amber-800/50 rounded-sm px-1.5 py-0.5 mt-0.5 inline-block">
                        ⚠ Verify Address Before Mailing
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-300 text-xs uppercase tracking-widest">{l.letter_type}</td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">{new Date(l.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-3">
                    <button onClick={() => downloadPdf(l.id)} disabled={busy} className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold">
                      Download PDF
                    </button>
                    {l.lob_tracking_number ? (
                      <span className="text-green-400 text-xs font-mono">Mailed ✓ {l.lob_tracking_number}</span>
                    ) : (
                      <button onClick={() => sendMail(l.id)} disabled={busy || !l.pdf_unsigned_path || !!l.needs_address} className="text-amber-400 hover:text-amber-300 text-xs uppercase tracking-widest font-semibold disabled:opacity-40" title={l.needs_address ? 'Verify address first' : !l.pdf_unsigned_path ? 'Generate PDF first' : 'Send via USPS Certified Mail'}>
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
const TrackingTab = ({ letters, clientId, onChange }: { letters: ClientDetail['letters']; clientId: string; onChange: () => void }) => {
  const addBizDays = (d: Date, n: number): Date => {
    const r = new Date(d);
    let c = 0;
    while (c < n) { r.setDate(r.getDate() + 1); if (r.getDay() !== 0 && r.getDay() !== 6) c++; }
    return r;
  };
  const getDeadline = (mailedAt: string | null | undefined, type: string): Date | null => {
    if (!mailedAt) return null;
    const d = new Date(mailedAt);
    if (type === '605B') return addBizDays(d, 4);
    if (type === '609') { const r = new Date(d); r.setDate(r.getDate() + 15); return r; }
    if (['611', '623', '809'].includes(type)) { const r = new Date(d); r.setDate(r.getDate() + 30); return r; }
    return null;
  };
  const today = new Date();
  const daysDiff = (d: Date) => Math.floor((d.getTime() - today.getTime()) / 86400000);

  const [loggingResponse, setLoggingResponse] = React.useState<string | null>(null);

  const logResponseReceived = async (letterId: string) => {
    setLoggingResponse(letterId);
    try {
      await fetch('/api/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ clientId, letterId, response_received_at: new Date().toISOString() }),
      });
      onChange();
    } finally {
      setLoggingResponse(null);
    }
  };

  const mailedLetters = letters.filter((l) => l.mailed_at);
  const totalDaysSinceFirst = mailedLetters.length > 0
    ? Math.floor((today.getTime() - new Date(mailedLetters[0].mailed_at as string).getTime()) / 86400000)
    : null;

  const escalationFlags: string[] = [];
  for (const l of mailedLetters) {
    const daysSince = Math.floor((today.getTime() - new Date(l.mailed_at as string).getTime()) / 86400000);
    if (l.letter_type === '605B' && daysSince >= 6) escalationFlags.push(`⚠ Day ${daysSince}: ${l.recipient_name} §605B — bureau should have responded. Check for confirmation.`);
    if (l.letter_type === '623' && daysSince >= 30) escalationFlags.push(`⚠ Day ${daysSince}: ${l.recipient_name} §623 — 30-day response window expired. Consider CFPB complaint.`);
    if (daysSince >= 35) escalationFlags.push(`🔴 Day ${daysSince}: ${l.recipient_name} — 35+ days elapsed. Prepare CFPB complaint filing.`);
  }

  return (
    <div className="space-y-6">
      {escalationFlags.length > 0 && (
        <div className="space-y-2">
          {escalationFlags.map((flag, i) => (
            <div key={i} className={`text-sm px-4 py-3 rounded-sm border ${flag.startsWith('🔴') ? 'bg-red-950/40 border-red-800 text-red-200' : 'bg-amber-950/40 border-amber-800 text-amber-200'}`}>
              {flag}
            </div>
          ))}
        </div>
      )}

      {totalDaysSinceFirst !== null && (
        <div className="text-xs text-neutral-400 px-1">
          Day <span className="text-white font-bold text-sm">{totalDaysSinceFirst}</span> of dispute cycle — first letter mailed {new Date(mailedLetters[0].mailed_at as string).toLocaleDateString()}
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800">
          <h3 className="text-xs uppercase tracking-widest text-luxury-red font-bold">
            Mailing Timeline ({letters.length} letters)
          </h3>
        </div>
        {letters.length === 0 ? (
          <div className="p-10 text-center text-neutral-500 text-sm">No letters generated yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#0f0f0f] border-b border-neutral-800">
              <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-500">
                <th className="px-4 py-3">Recipient</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Mailed</th>
                <th className="px-4 py-3">Response Due</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tracking #</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {letters.map((l) => {
                const mailedAt = l.mailed_at as string | null | undefined;
                const deadline = getDeadline(mailedAt, l.letter_type);
                const daysLeft = deadline ? daysDiff(deadline) : null;
                const isOverdue = daysLeft !== null && daysLeft < 0;
                return (
                  <tr key={l.id} className="border-b border-neutral-800/60 align-top">
                    <td className="px-4 py-3 text-white">{l.recipient_name}</td>
                    <td className="px-4 py-3 text-neutral-300 text-xs uppercase tracking-widest">{l.letter_type}</td>
                    <td className="px-4 py-3 text-neutral-400 text-xs">
                      {mailedAt ? new Date(mailedAt).toLocaleDateString() : <span className="text-neutral-600">Not yet mailed</span>}
                    </td>
                    <td className="px-4 py-3 text-neutral-300 text-xs">
                      {deadline
                        ? <>
                            {deadline.toLocaleDateString()}
                            <span className="block text-[9px] text-neutral-600 mt-0.5">
                              {l.letter_type === '605B' ? '4 biz days' : l.letter_type === '609' ? '15 cal days' : '30 cal days'}
                            </span>
                          </>
                        : <span className="text-neutral-600">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {!mailedAt ? (
                        <span className="text-[10px] uppercase tracking-wider text-neutral-600 border border-neutral-800 rounded-sm px-2 py-0.5">Pending</span>
                      ) : isOverdue ? (
                        <span className="text-[10px] uppercase tracking-wider text-red-400 bg-red-950/30 border border-red-800/50 rounded-sm px-2 py-0.5">Overdue {Math.abs(daysLeft!)}d</span>
                      ) : daysLeft !== null ? (
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border ${daysLeft <= 3 ? 'text-amber-400 bg-amber-950/30 border-amber-800/50' : 'text-emerald-400 bg-emerald-950/30 border-emerald-800/50'}`}>
                          {daysLeft}d left
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-neutral-400 text-xs font-mono">
                      {l.lob_tracking_number
                        ? <span className="text-green-400">{String(l.lob_tracking_number)}</span>
                        : <span className="text-neutral-600">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {mailedAt && !l.response_received_at ? (
                        <button
                          onClick={() => logResponseReceived(l.id)}
                          disabled={loggingResponse === l.id}
                          className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-emerald-400 border border-neutral-800 hover:border-emerald-800 px-2 py-1 rounded-sm transition-colors disabled:opacity-40 whitespace-nowrap"
                        >
                          {loggingResponse === l.id ? '…' : 'Log Response'}
                        </button>
                      ) : l.response_received_at ? (
                        <span className="text-[9px] text-emerald-400 uppercase tracking-widest">Response ✓</span>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminClientDetailPage;
