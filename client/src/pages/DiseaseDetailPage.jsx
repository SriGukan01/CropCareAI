import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, RefreshCw, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import DiseaseDetailTabs from '../components/DiseaseDetailTabs';
import { libraryApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const DiseaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { addToast } = useToast();

  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    libraryApi.getDiseaseById(id)
      .then((res) => {
        if (res.data) setDisease(res.data);
      })
      .catch((err) => {
        addToast(err.message || 'Disease record not found.', 'error');
      })
      .finally(() => setLoading(false));
  }, [id, addToast]);

  const lang = i18n.language?.substring(0, 2) || 'en';
  const trans = disease && disease.translations && disease.translations[lang] ? disease.translations[lang] : disease;

  if (loading) {
    return (
      <div className="py-20 text-center">
        <RefreshCw className="w-8 h-8 text-agri-600 animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-medium">Loading botanical guide...</p>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="max-w-md mx-auto py-20 text-center glass-card rounded-3xl p-8 space-y-3">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-slate-100">
          Disease Profile Not Found
        </h3>
        <Link to="/library" className="btn-primary text-xs py-2 px-4 inline-flex">
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/library')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-agri-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <Link to="/predict" className="btn-primary text-xs py-2 px-4 gap-1.5">
          <Upload className="w-3.5 h-3.5" />
          <span>Scan Leaf for this Disease</span>
        </Link>
      </div>


      {/* Header Profile Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-200 uppercase tracking-wider">
              Crop: {disease.crop?.name || 'General Botanical'}
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
              disease.isHealthy
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
            }`}>
              {disease.isHealthy ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
              {disease.isHealthy ? 'Healthy State' : 'Pathological Disease'}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Model Label: {disease.classLabel}
          </span>
        </div>

        <h1 className="font-serif font-black text-2xl sm:text-4xl text-slate-900 dark:text-white">
          {trans.name || disease.name}
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {trans.description || disease.description}
        </p>
      </div>

      {/* Tabs */}
      <DiseaseDetailTabs disease={disease} />
    </div>
  );
};

export default DiseaseDetailPage;
