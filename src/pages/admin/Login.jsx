import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Shield } from '../../components/Icons';

export default function Login() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth(); // Get session & loading status

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- AUTO REDIRECT LOGIC ---
  useEffect(() => {
    // If auth is done loading AND session exists, kick user to Projects page
    if (!authLoading && session) {
      navigate('/admin/projects', { replace: true });
    }
  }, [session, authLoading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Login gagal. Periksa email dan password Anda.');
      setLoading(false);
    } 
    // No need to navigate here manually. 
    // The useEffect above will detect the new session and redirect automatically.
  };

  // Optional: Show nothing or a loader while checking initial session
  // This prevents the Login form from "flashing" briefly before redirecting
  if (authLoading) {
    return <div className="min-h-screen bg-slate-900"></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-800">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Shield className="text-blue-900" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
          <p className="text-slate-500 text-sm mt-1">PT. MANDIRIJAYA MULTI PERKASA</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-sm">
            <p className="font-bold">Error</p>
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-900/30"
          >
            {loading ? 'Memproses...' : 'Masuk Dashboard'} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}