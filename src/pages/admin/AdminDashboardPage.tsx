import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import { adminHeaders, clearAdminToken, isAdminAuthenticated } from '../../lib/adminAuth';

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

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    fetchClients();
  }, [navigate]);

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

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
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

  const statusOptions = ['all', 'intake', 'analyzing', 'letters_drafted', 'letters_mailed', 'awaiting_response', 'in_progress', 'resolved', 'closed'];

  return (
    <>
      <SEOHead title="Admin Dashboard — RAH Operations" description="Restricted area." noIndex={true} />
      <section className="min-h-screen bg-[#0f0f0f] pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-2">
                Admin Dashboard
              </p>
              <h1 className="font-serif-display text-4xl text-white">Credit Repair Clients</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:border-luxury-red px-4 py-2 rounded-sm transition-colors self-start"
            >
              Sign Out
            </button>
          </div>

          {/* Filters */}
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
                <option key={s} value={s}>
                  {s === 'all' ? 'All Statuses' : s.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
            <button
              onClick={fetchClients}
              className="bg-luxury-red hover:bg-luxury-light text-white px-4 py-2 rounded-sm text-sm uppercase tracking-widest transition-colors"
            >
              Refresh
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-20 text-neutral-500">Loading clients…</div>
          ) : error ? (
            <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
              {error}
            </div>
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
                      <tr
                        key={c.id}
                        className="border-b border-neutral-800/60 hover:bg-[#0f0f0f]/60 transition-colors"
                      >
                        <td className="px-5 py-4 text-white font-medium">{c.full_name}</td>
                        <td className="px-5 py-4 text-neutral-300">{c.email}</td>
                        <td className="px-5 py-4 text-neutral-300">{c.phone}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border ${STATUS_COLORS[c.status] || STATUS_COLORS.intake}`}
                          >
                            {c.status?.replace(/_/g, ' ') || 'intake'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {c.address_verified === true ? (
                            <span className="text-green-400 text-xs">Verified</span>
                          ) : c.address_verified === false ? (
                            <span className="text-amber-400 text-xs" title={c.address_flag_notes ?? ''}>
                              Flagged
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-neutral-400 text-xs">
                          {new Date(c.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            to={`/admin/clients/${c.id}`}
                            className="text-luxury-red hover:text-luxury-accent text-xs uppercase tracking-widest font-semibold"
                          >
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

          {/* Stats */}
          {!loading && clients.length > 0 && (
            <div className="mt-6 text-xs text-neutral-500 text-right">
              Showing {filtered.length} of {clients.length} clients
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
