import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { isAdminAuthenticated, setAdminToken } from '../../lib/adminAuth';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Login failed');
        setSubmitting(false);
        return;
      }
      setAdminToken(json.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError('Network error. Try again.');
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead title="Admin Login — RAH Operations" description="Restricted area." noIndex={true} />
      <section className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-luxury-red/8 rounded-full blur-[120px]" />
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
                RAH Operations
              </p>
              <h1 className="font-serif-display text-3xl text-white mb-2">Admin Portal</h1>
              <p className="text-sm text-neutral-400 font-serif-body">
                Restricted access. Authorized personnel only.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-luxury-red transition-colors"
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !password}
                className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
              >
                {submitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AdminLoginPage;
