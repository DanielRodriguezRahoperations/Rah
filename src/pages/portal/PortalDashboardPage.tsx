import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { SITE_CONFIG } from '../../config/site';

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

          {/* Bureau responses */}
          <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden mb-8 shadow-sm">
            <div className="px-6 py-5 border-b border-neutral-200">
              <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-1">
                Bureau & Furnisher Responses
              </p>
              <h3 className="font-serif-display text-2xl text-slate-dark">
                Response Log
              </h3>
            </div>
            {responses.length === 0 ? (
              <div className="p-10 text-center text-neutral-500 text-sm">
                No responses received yet. Bureaus typically respond within 30 calendar days; identity-theft blocks within 4 business days.
              </div>
            ) : (
              <div className="divide-y divide-neutral-200">
                {responses.map((r) => (
                  <div key={r.id} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="text-sm font-semibold text-slate-dark capitalize">
                        {r.bureau}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {r.received_at
                          ? new Date(r.received_at).toLocaleDateString()
                          : new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-luxury-red mb-2">
                      {r.response_type}
                    </p>
                    {r.summary && (
                      <p className="text-sm text-neutral-700 leading-relaxed">{r.summary}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

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

export default PortalDashboardPage;
