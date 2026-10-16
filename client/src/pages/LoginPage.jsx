import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, Sprout, ArrowRight, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      addToast('Welcome back! Successfully logged in.', 'success');
      navigate('/history');
    } catch (err) {
      addToast(err.message || 'Login failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin@cropcare.ai');
    setPassword('Admin@123456');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-agri-800 text-white flex items-center justify-center mx-auto shadow-soft">
          <Sprout className="w-6 h-6 text-agri-300" />
        </div>
        <h1 className="font-serif font-black text-2xl text-slate-900 dark:text-white">
          Sign In to CropCare AI
        </h1>
        <p className="text-xs text-slate-500">
          Access your historical diagnosis logs and PDF reports.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-agri-500"
              placeholder="farmer@domain.com"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-agri-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xs py-3 gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : t('nav.login')}</span>
          </button>
        </form>

        {/* Demo Admin Credentials Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            type="button"
            onClick={handleFillAdmin}
            className="text-[11px] font-semibold text-agri-700 dark:text-agri-400 hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <KeyRound className="w-3.5 h-3.5" />
            Use Default Admin Credentials (admin@cropcare.ai)
          </button>
        </div>
      </div>

      <div className="text-center space-y-2 text-xs text-slate-500">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-agri-700 dark:text-agri-400 hover:underline">
            Register here
          </Link>
        </p>
        <p>
          Or{' '}
          <Link to="/predict" className="font-semibold text-slate-700 dark:text-slate-300 hover:underline">
            continue as guest without an account →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
