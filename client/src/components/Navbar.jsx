import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sprout,
  Sun,
  Moon,
  Globe,
  User,
  LogOut,
  Menu,
  X,
  History,
  BookOpen,
  Info,
  Activity,
  Shield,
  Upload,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-parchment-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-agri-800 dark:bg-agri-700 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-agri-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-serif font-bold text-lg text-agri-900 dark:text-agri-100 tracking-tight">
                  CropCare
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-300">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider font-semibold uppercase block">
                Phytopathology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/predict"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/predict')
                  ? 'bg-agri-100 dark:bg-agri-900/60 text-agri-800 dark:text-agri-200'
                  : 'text-slate-600 dark:text-slate-300 hover:text-agri-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Upload className="w-4 h-4 text-agri-600" />
              <span>Predict Disease</span>
            </Link>

            <Link
              to="/library"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/library')
                  ? 'bg-agri-100 dark:bg-agri-900/60 text-agri-800 dark:text-agri-200'
                  : 'text-slate-600 dark:text-slate-300 hover:text-agri-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-olive-600" />
              <span>Disease Library</span>
            </Link>

            <Link
              to="/history"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/history')
                  ? 'bg-agri-100 dark:bg-agri-900/60 text-agri-800 dark:text-agri-200'
                  : 'text-slate-600 dark:text-slate-300 hover:text-agri-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4 text-agri-600" />
              <span>Prediction History</span>
            </Link>

            <Link
              to="/intelligence"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/intelligence') || isActive('/dashboard') || isActive('/about')
                  ? 'bg-agri-100 dark:bg-agri-900/60 text-agri-800 dark:text-agri-200 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-agri-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Field Intelligence</span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/admin')
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
                    : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-600" />
                {t('nav.admin')}
              </Link>
            )}
          </nav>

          {/* Right Controls: Language, Theme, Auth */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                title="Switch Language"
              >
                <Globe className="w-4 h-4 text-agri-600" />
                <span>{i18n.language?.substring(0, 2) || 'en'}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-parchment-800 shadow-soft-lg border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-fade-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-agri-50 dark:hover:bg-agri-950/50 ${
                        i18n.language === lang.code
                          ? 'text-agri-700 dark:text-agri-300 font-bold bg-agri-50/60 dark:bg-agri-950/30'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User Auth Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 pl-1">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-agri-800 hover:bg-agri-700 shadow-sm"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-parchment-900/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/predict"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-agri-50 dark:hover:bg-agri-950"
          >
            <Upload className="w-4 h-4 text-agri-600" />
            <span>Predict Disease</span>
          </Link>
          <Link
            to="/library"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-agri-50 dark:hover:bg-agri-950"
          >
            <BookOpen className="w-4 h-4 text-olive-600" />
            <span>Disease Library</span>
          </Link>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-agri-50 dark:hover:bg-agri-950"
          >
            <History className="w-4 h-4 text-agri-600" />
            <span>Prediction History</span>
          </Link>
          <Link
            to="/intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-agri-50 dark:hover:bg-agri-950"
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Field Intelligence</span>
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
            >
              <Shield className="w-4 h-4" />
              {t('nav.admin')}
            </Link>
          )}

          {!isAuthenticated && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center rounded-xl text-xs font-semibold text-white bg-agri-800"
              >
                {t('nav.register')}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
