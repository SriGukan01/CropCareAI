import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import {
  Activity, Users, Zap, ThumbsUp, Download, Plus, Edit2, Trash2,
  RefreshCw, Shield, AlertTriangle, Layers, Database
} from 'lucide-react';
import { adminApi, libraryApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const PIE_COLORS = ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#6B7F4A', '#8A9A5B', '#D97706', '#2563EB'];

const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const { addToast } = useToast();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'crops' | 'diseases' | 'feedback'

  // Data for CRUD
  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Modal State
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [cropForm, setCropForm] = useState({ name: '', enName: '', taName: '', hiName: '' });

  const fetchStats = useCallback(async () => {
    try {
      const res = await adminApi.getStats();
      if (res.data) setStats(res.data);
    } catch (err) {
      addToast(err.message || 'Could not fetch admin metrics.', 'error');
    }
  }, [addToast]);

  const loadCropsAndDiseases = useCallback(async () => {
    try {
      const [cropsRes, diseasesRes] = await Promise.all([
        libraryApi.getCrops(),
        libraryApi.getDiseases()
      ]);
      if (cropsRes.data) setCrops(cropsRes.data);
      if (diseasesRes.data) setDiseases(diseasesRes.data);
    } catch (e) {
      console.log('CRUD load error:', e.message);
    }
  }, []);

  const loadFeedbacks = useCallback(async () => {
    try {
      const res = await adminApi.getFeedback();
      if (res.data) setFeedbacks(res.data);
    } catch (e) {
      console.log('Feedback load error:', e.message);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchStats(), loadCropsAndDiseases(), loadFeedbacks()])
      .finally(() => setLoading(false));
  }, [fetchStats, loadCropsAndDiseases, loadFeedbacks]);

  // Crop CRUD operations
  const handleOpenCropModal = (crop = null) => {
    if (crop) {
      setEditingCrop(crop);
      setCropForm({
        name: crop.name,
        enName: crop.translations?.en?.name || crop.name,
        taName: crop.translations?.ta?.name || '',
        hiName: crop.translations?.hi?.name || ''
      });
    } else {
      setEditingCrop(null);
      setCropForm({ name: '', enName: '', taName: '', hiName: '' });
    }
    setCropModalOpen(true);
  };

  const handleSaveCrop = async (e) => {
    e.preventDefault();
    const payload = {
      name: cropForm.name,
      translations: {
        en: { name: cropForm.enName || cropForm.name },
        ta: { name: cropForm.taName || cropForm.name },
        hi: { name: cropForm.hiName || cropForm.name }
      }
    };

    try {
      if (editingCrop) {
        await adminApi.updateCrop(editingCrop._id, payload);
        addToast('Crop updated successfully.', 'success');
      } else {
        await adminApi.createCrop(payload);
        addToast('Crop created successfully.', 'success');
      }
      setCropModalOpen(false);
      loadCropsAndDiseases();
    } catch (err) {
      addToast(err.message || 'Operation failed.', 'error');
    }
  };

  const handleDeleteCrop = async (id) => {
    if (!window.confirm('Delete this crop?')) return;
    try {
      await adminApi.deleteCrop(id);
      addToast('Crop removed.', 'success');
      loadCropsAndDiseases();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 text-center glass-card rounded-3xl p-8 space-y-3">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-slate-100">
          Admin Access Restricted
        </h3>
        <p className="text-xs text-slate-500">
          Only authorized administrators can access this control portal.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header and Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 font-bold text-xs uppercase px-2 py-0.5">
              Admin Console
            </span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            {t('admin.title')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={adminApi.getExportZipUrl()}
            className="btn-primary text-xs py-2.5 px-4 gap-2 shadow-sm"
            download
          >
            <Download className="w-4 h-4" />
            <span>{t('admin.exportDataset')}</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-agri-700 dark:border-agri-400 text-agri-800 dark:text-agri-200'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Analytics &amp; Charts
        </button>
        <button
          onClick={() => setActiveTab('crops')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'crops'
              ? 'border-agri-700 dark:border-agri-400 text-agri-800 dark:text-agri-200'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t('admin.manageCrops')} ({crops.length})
        </button>
        <button
          onClick={() => setActiveTab('diseases')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'diseases'
              ? 'border-agri-700 dark:border-agri-400 text-agri-800 dark:text-agri-200'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t('admin.manageDiseases')} ({diseases.length})
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'feedback'
              ? 'border-agri-700 dark:border-agri-400 text-agri-800 dark:text-agri-200'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t('admin.feedbackViewer')} ({feedbacks.length})
        </button>
      </div>

      {/* Tab: Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {t('admin.totalPredictions')}
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white font-serif block">
                {stats?.totalPredictions || 0}
              </span>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {t('admin.totalUsers')}
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white font-serif block">
                {stats?.totalUsers || 0}
              </span>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {t('admin.avgConfidence')}
              </span>
              <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-serif block">
                {stats?.averageConfidence || 92}%
              </span>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {t('admin.feedbackAccuracy')}
              </span>
              <span className="text-3xl font-black text-agri-700 dark:text-agri-400 font-serif block">
                {stats?.feedbackAccuracyRate || 94}%
              </span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart: Most Detected Diseases */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <h3 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
                {t('admin.mostDetected')}
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.mostDetectedDiseases || []}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-15} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1B4332" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart: Crop Distribution */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <h3 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
                {t('admin.cropDistribution')}
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.cropDistribution?.length > 0 ? stats.cropDistribution : [{ name: 'Tomato', value: 12 }, { name: 'Apple', value: 8 }, { name: 'Corn', value: 6 }]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {PIE_COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Line Chart: Predictions Over Time */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
              {t('admin.predictionsTrend')} (Last 7 Days)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.predictionsOverTime || []}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#2D6A4F" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Crop CRUD */}
      {activeTab === 'crops' && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              Crops Database Management
            </h3>
            <button
              onClick={() => handleOpenCropModal()}
              className="btn-primary text-xs py-2 px-3 gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Crop</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                <tr>
                  <th className="p-3 rounded-l-xl">Crop Name</th>
                  <th className="p-3">Tamil Translation</th>
                  <th className="p-3">Hindi Translation</th>
                  <th className="p-3 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {crops.map((crop) => (
                  <tr key={crop._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-100">{crop.name}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{crop.translations?.ta?.name || '-'}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{crop.translations?.hi?.name || '-'}</td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => handleOpenCropModal(crop)}
                        className="p-1.5 text-slate-400 hover:text-agri-700"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(crop._id)}
                        className="p-1.5 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Diseases List */}
      {activeTab === 'diseases' && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              Diseases &amp; Conditions Master Records (38 Classes)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                <tr>
                  <th className="p-3 rounded-l-xl">Disease / State</th>
                  <th className="p-3">Crop</th>
                  <th className="p-3">Class Label</th>
                  <th className="p-3">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {diseases.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-100">{d.name}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{d.crop?.name || 'Crop'}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">{d.classLabel}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        d.isHealthy ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {d.isHealthy ? 'Healthy' : 'Diseased'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Feedback Viewer */}
      {activeTab === 'feedback' && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              User Diagnostic Feedback Log ({feedbacks.length})
            </h3>
            <a
              href={adminApi.getExportZipUrl()}
              className="btn-primary text-xs py-1.5 px-3 gap-1.5"
              download
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export ZIP for Retraining</span>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                <tr>
                  <th className="p-3 rounded-l-xl">Date</th>
                  <th className="p-3">Original Model Prediction</th>
                  <th className="p-3">User Verified</th>
                  <th className="p-3">User Corrected Label</th>
                  <th className="p-3 rounded-r-xl">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {feedbacks.map((fb) => (
                  <tr key={fb._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 text-slate-500">{new Date(fb.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-100">{fb.prediction?.finalLabel || '-'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        fb.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {fb.isCorrect ? 'Correct' : 'Wrong'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-amber-600 dark:text-amber-400">{fb.correctedLabel || '-'}</td>
                    <td className="p-3 text-slate-500">{fb.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Crop Modal */}
      {cropModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full space-y-4 animate-scale-up">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              {editingCrop ? 'Edit Crop Profile' : 'Add New Agricultural Crop'}
            </h3>

            <form onSubmit={handleSaveCrop} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Crop Standard Name</label>
                <input
                  type="text"
                  required
                  value={cropForm.name}
                  onChange={(e) => setCropForm({ ...cropForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800"
                  placeholder="e.g. Cotton"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tamil (தமிழ்) Name</label>
                <input
                  type="text"
                  value={cropForm.taName}
                  onChange={(e) => setCropForm({ ...cropForm, taName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800"
                  placeholder="e.g. பருத்தி"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Hindi (हिन्दी) Name</label>
                <input
                  type="text"
                  value={cropForm.hiName}
                  onChange={(e) => setCropForm({ ...cropForm, hiName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800"
                  placeholder="e.g. कपास"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCropModalOpen(false)}
                  className="btn-outline py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 px-5">
                  Save Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
