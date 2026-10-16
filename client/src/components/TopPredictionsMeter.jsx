import React from 'react';
import { BarChart3, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatDiseaseName } from '../utils/diseaseUtils';

const TopPredictionsMeter = ({ topPredictions = [], confidence = 0, isUncertain = false }) => {
  const { t } = useTranslation();

  const formatLabel = (pred) => {
    if (!pred) return 'Unknown Pathology';
    const raw = typeof pred === 'object' ? (pred.disease || pred.label) : pred;
    return formatDiseaseName(raw);
  };

  const getProgressColor = (score, isTop) => {
    if (isTop && isUncertain) return 'bg-amber-500';
    if (score > 0.8) return 'bg-emerald-600 dark:bg-emerald-500';
    if (score > 0.5) return 'bg-agri-600 dark:bg-agri-500';
    if (score > 0.2) return 'bg-olive-600 dark:bg-olive-500';
    return 'bg-slate-400';
  };

  return (
    <div className="w-full glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-agri-100 dark:bg-agri-900/60 text-agri-700 dark:text-agri-300">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
            {t('result.topPredictions')}
          </h4>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
            Top Confidence
          </span>
          <span className={`text-base font-extrabold ${isUncertain ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>

      {/* Progress Bars List */}
      <div className="space-y-3 pt-1">
        {topPredictions.map((pred, index) => {
          const pct = Math.round(pred.confidence * 100);
          const isTop = index === 0;

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${isTop ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                  {index + 1}. {formatLabel(pred)}
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-200 ml-2 shrink-0">
                  {pct}%
                </span>
              </div>

              {/* Bar track */}
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${getProgressColor(pred.confidence, isTop)}`}
                  style={{ width: `${Math.max(pct, 2)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {isUncertain && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Model entropy is elevated or confidence is below 60%. Cross-examination with leaf library advised.
          </span>
        </div>
      )}
    </div>
  );
};

export default TopPredictionsMeter;
