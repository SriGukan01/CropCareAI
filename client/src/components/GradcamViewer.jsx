import React, { useState } from 'react';
import { Eye, Layers, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SERVER_URL } from '../services/api';

const GradcamViewer = ({ originalImagePath, heatmapPath, heatmapBase64 }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' | 'toggle'
  const [activeTab, setActiveTab] = useState('heatmap'); // for toggle mode

  const getFullUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    if (path.startsWith('data:')) return path;
    return `${SERVER_URL}${path}`;
  };

  const origUrl = getFullUrl(originalImagePath);
  const heatUrl = heatmapBase64 || getFullUrl(heatmapPath);

  return (
    <div className="w-full glass-card rounded-2xl p-5 space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-agri-100 dark:bg-agri-900/60 text-agri-700 dark:text-agri-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
              Explainable AI (Grad-CAM Analysis)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('result.gradcamNote')}
            </p>
          </div>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-white dark:bg-parchment-700 text-agri-800 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('toggle')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'toggle'
                ? 'bg-white dark:bg-parchment-700 text-agri-800 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Overlay Toggle
          </button>
        </div>
      </div>

      {/* Side-by-Side Presentation */}
      {viewMode === 'side-by-side' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original Image */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>{t('result.originalImage')}</span>
              <span className="text-[10px] text-slate-400">224x224 Input</span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square bg-slate-100 dark:bg-slate-900">
              {origUrl ? (
                <img
                  src={origUrl}
                  alt="Original input leaf"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                  Original image not available
                </div>
              )}
            </div>
          </div>

          {/* Grad-CAM Heatmap */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>{t('result.gradcamHeatmap')}</span>
              <span className="text-[10px] text-agri-600 dark:text-agri-400 font-bold uppercase">
                Attention Salience
              </span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square bg-slate-100 dark:bg-slate-900">
              {heatUrl ? (
                <img
                  src={heatUrl}
                  alt="Grad-CAM activation heatmap"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                  Heatmap computation in progress...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Presentation */}
      {viewMode === 'toggle' && (
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab('original')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'original'
                  ? 'bg-agri-800 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              Original View
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'heatmap'
                  ? 'bg-agri-800 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              Grad-CAM Heatmap
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square bg-slate-100 dark:bg-slate-900 shadow-md">
            <img
              src={activeTab === 'original' ? origUrl : heatUrl || origUrl}
              alt="Toggle leaf view"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>
      )}

      {/* Visual Explanation Bar */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2.5">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Low Activation
          <span className="mx-1">→</span>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> High Focal Attention
        </div>
      </div>
    </div>
  );
};

export default GradcamViewer;
