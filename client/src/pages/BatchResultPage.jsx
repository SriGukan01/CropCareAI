import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Layers,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Download,
  AlertTriangle,
  ArrowLeft,
  XCircle
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { SERVER_URL, predictionApi } from '../services/api';
import { formatDiseaseName } from '../utils/diseaseUtils';

const BatchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const batchData = location.state?.batchData;

  if (!batchData || !batchData.results) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4 glass-card rounded-3xl p-8">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-slate-100">
          Batch Record Not Found
        </h3>
        <p className="text-xs text-slate-500">
          No batch analysis data currently in session.
        </p>
        <Link to="/predict" className="btn-primary text-xs py-2.5 px-5 inline-flex">
          Start New Batch Scan
        </Link>
      </div>
    );
  }

  const { summary, results } = batchData;

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    return `${SERVER_URL}${path}`;
  };

  const rejectedCount = summary.rejectedCount ?? results.filter(r => r.isCropLeaf === false).length;
  const validCount = summary.validCropsCount ?? (summary.totalAnalyzed - rejectedCount);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/predict')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-agri-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Analysis</span>
        </button>

        <span className="text-xs font-mono text-slate-400">
          Batch ID: {summary.batchId.substring(0, 8)}...
        </span>
      </div>


      {/* Batch Overview Summary Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="p-2.5 rounded-2xl bg-agri-100 dark:bg-agri-900/60 text-agri-700 dark:text-agri-300">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
              {t('batch.summaryTitle')}
            </h1>
            <p className="text-xs text-slate-500">
              Aggregated two-stage screening of {summary.totalAnalyzed} uploaded image specimens.
            </p>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              {t('batch.totalAnalyzed')}
            </span>
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100 font-serif">
              {summary.totalAnalyzed}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-center">
            <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase block">
              Rejected (Non-Crop)
            </span>
            <span className="text-2xl font-black text-red-700 dark:text-red-300 font-serif">
              {rejectedCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase block">
              {t('batch.healthyCount')}
            </span>
            <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300 font-serif">
              {summary.healthyCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
            <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase block">
              {t('batch.diseasedCount')}
            </span>
            <span className="text-2xl font-black text-rose-800 dark:text-rose-300 font-serif">
              {summary.diseasedCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase block truncate">
              {t('batch.mostCommon')}
            </span>
            <span className="text-sm font-bold text-amber-800 dark:text-amber-300 block truncate mt-1">
              {summary.mostCommonDisease}
            </span>
          </div>
        </div>
      </div>

      {/* Individual Result Cards Grid */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
          Specimen Breakdown ({results.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, idx) => {
            const isRejected = item.isCropLeaf === false || item.status === 'rejected';
            const isHealthy = item.disease ? item.disease.isHealthy : item.finalLabel?.toLowerCase().includes('healthy');
            const confPct = Math.round((item.confidence || 0) * 100);

            if (isRejected) {
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl overflow-hidden border-2 border-red-300 dark:border-red-900/60 flex flex-col justify-between bg-red-50/20 shadow-sm"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative aspect-video bg-slate-200 dark:bg-slate-900 overflow-hidden">
                      <img
                        src={getFullUrl(item.imagePath)}
                        alt={`Rejected specimen ${idx + 1}`}
                        className="w-full h-full object-cover filter grayscale-[25%]"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm">
                          <XCircle className="w-3 h-3" />
                          Crop Not Detected
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-serif font-bold text-sm text-red-700 dark:text-red-300 leading-snug">
                        Crop Not Detected. Please upload a valid crop leaf image.
                      </h3>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Rejected at Stage 1 validation. Non-crop or irrelevant image detected. Disease classification and treatments were omitted.
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-red-100 dark:border-red-900/40 text-[11px] text-slate-400 italic">
                    <span>No disease diagnosed</span>
                    <span className="text-red-500 font-bold">Filtered</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Thumbnail */}
                  <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img
                      src={getFullUrl(item.imagePath)}
                      alt={`Leaf sample ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isHealthy
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}>
                        {isHealthy ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                        {isHealthy ? 'Healthy' : 'Diseased'}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-bold">
                      {confPct}% Conf.
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 leading-snug">
                      {formatDiseaseName(item.finalLabel || item.disease?.name)}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {item.disease?.description || 'Phytopathological deep feature classification completed.'}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 gap-2">
                  <Link
                    to={`/result/${item.predictionId}`}
                    state={{
                      predictionData: {
                        prediction: item,
                        disease: item.disease,
                        mlInfo: { status: item.status }
                      }
                    }}
                    className="text-xs font-bold text-agri-700 dark:text-agri-400 hover:underline flex items-center gap-1"
                  >
                    View Heatmap &amp; Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={predictionApi.getPdfUrl(item.predictionId)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-agri-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Download individual PDF report"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BatchResultPage;
