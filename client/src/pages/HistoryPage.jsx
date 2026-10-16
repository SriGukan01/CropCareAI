import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  History,
  Search,
  Filter,
  Trash2,
  Download,
  Eye,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Lock,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { predictionApi, SERVER_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatDiseaseName } from '../utils/diseaseUtils';

const HistoryPage = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHistory = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await predictionApi.getHistory({
        page,
        limit: 8,
        status: statusFilter || undefined,
        search: searchQuery || undefined
      });
      if (res.data) {
        setPredictions(res.data.predictions || []);
        setTotalPages(res.data.pagination?.pages || 1);
      }
    } catch (err) {
      addToast(err.message || 'Failed to fetch history.', 'error');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, page, statusFilter, searchQuery, addToast]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scan from history?')) return;
    try {
      await predictionApi.delete(id);
      addToast('Scan record deleted.', 'success');
      fetchHistory();
    } catch (err) {
      addToast(err.message || 'Delete failed.', 'error');
    }
  };

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${SERVER_URL}${path}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4 glass-card rounded-3xl p-8">
        <div className="w-14 h-14 rounded-2xl bg-agri-100 dark:bg-agri-900/60 text-agri-800 dark:text-agri-200 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
          Authentication Required
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Guests can predict leaves instantly, but an account is required to sync and maintain cloud diagnosis logs.
        </p>
        <div className="flex gap-3 pt-2">
          <Link to="/login" className="flex-1 btn-primary text-xs py-2.5">
            {t('nav.login')}
          </Link>
          <Link to="/register" className="flex-1 btn-secondary text-xs py-2.5">
            {t('nav.register')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {t('history.title')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('history.subtitle')}
          </p>
        </div>

        <Link to="/predict" className="btn-primary text-xs py-2.5 px-4 self-start sm:self-auto">
          Scan New Leaf
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder={t('history.searchPlaceholder')}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="text-xs p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800 text-slate-800 dark:text-slate-100"
          >
            <option value="">{t('history.filterStatus')}</option>
            <option value="confident">Confident Detection</option>
            <option value="uncertain">Uncertain Detection</option>
          </select>
        </div>
      </div>

      {/* History Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 text-agri-600 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading history...</p>
        </div>
      ) : predictions.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <History className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
            {t('history.emptyTitle')}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t('history.emptyDesc')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {predictions.map((item) => {
            const isHealthy = item.disease ? item.disease.isHealthy : item.finalLabel.toLowerCase().includes('healthy');
            const confPct = Math.round((item.confidence || 0) * 100);

            return (
              <div
                key={item._id}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img
                      src={getFullUrl(item.imagePath)}
                      alt={item.finalLabel}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isHealthy ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {isHealthy ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                        {isHealthy ? 'Healthy' : 'Diseased'}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      {confPct}%
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
                      {formatDiseaseName(item.finalLabel || item.disease?.name)}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {item.disease?.description || 'Phytopathological deep feature classification completed.'}
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    to={`/result/${item._id}`}
                    className="btn-secondary text-[11px] py-1.5 px-3"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{t('history.viewDetails')}</span>
                  </Link>

                  <div className="flex items-center gap-1">
                    <a
                      href={predictionApi.getPdfUrl(item._id)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-agri-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      title={t('history.delete')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
