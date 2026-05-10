import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { SITE_CONFIG } from '../../config/site';

const MKTG_TOKEN_KEY = 'rah_mktg_portal_token';
const MKTG_CLIENT_KEY = 'rah_mktg_portal_client_id';

const MarketingPortalLoginPage = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    const tok = localStorage.getItem(MKTG_TOKEN_KEY);
    if (tok) navigate('/marketing/portal/dashboard', { replace: true });
  }, [navigate]);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/marketing-portal-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to send code');
      } else {
        setInfo('A 6-digit code was sent to your email. Check your inbox.');
        setStage('code');
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/marketing-portal-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Verification failed');
      } else {
        localStorage.setItem(MKTG_TOKEN_KEY, json.token);
        localStorage.setItem(MKTG_CLIENT_KEY, json.clientId);
        navigate('/marketing/portal/dashboard', { replace: true });
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Marketing Client Portal — RAH Operations"
        description="Sign in to your RAH Operations marketing client portal."
        noIndex={true}
      />
      <section className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-luxury-red/8 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[20vw] h-[20vw] bg-luxury-red/5 rounded-full blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-8 lg:p-10">
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-3">
                Marketing Client Portal
              </p>
              <h1 className="font-serif-display text-3xl text-white mb-2">
                {stage === 'email' ? 'Welcome Back' : 'Enter Your Code'}
              </h1>
              <p className="text-sm text-neutral-400 font-serif-body">
                {stage === 'email'
                  ? 'Enter the email you used when signing up.'
                  : `We sent a 6-digit code to ${email}.`}
              </p>
            </div>

            {stage === 'email' ? (
              <form onSubmit={sendCode} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-luxury-red transition-colors"
                    placeholder="you@yourbusiness.com"
                  />
                </div>

                {info && (
                  <div className="bg-green-950/40 border border-green-900 text-green-200 text-sm px-4 py-3 rounded-sm">
                    {info}
                  </div>
                )}
                {error && (
                  <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !email}
                  className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
                >
                  {submitting ? 'Sending…' : 'Send Login Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={verifyCode} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    6-Digit Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    required
                    className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-4 rounded-sm focus:outline-none focus:border-luxury-red transition-colors text-center text-3xl tracking-[0.5em] font-mono"
                    placeholder="••••••"
                  />
                </div>

                {error && (
                  <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || code.length !== 6}
                  className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
                >
                  {submitting ? 'Verifying…' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => { setStage('email'); setCode(''); setError(''); }}
                  className="w-full text-xs uppercase tracking-widest text-neutral-400 hover:text-white py-2"
                >
                  Use a different email
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-neutral-500 mt-6">
            Need help? Email{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-luxury-red hover:underline">
              {SITE_CONFIG.email}
            </a>
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default MarketingPortalLoginPage;
