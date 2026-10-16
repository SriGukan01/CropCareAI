import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Download,
  Share2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Check,
  Copy
} from 'lucide-react';
import GradcamViewer from '../components/GradcamViewer';
import TopPredictionsMeter from '../components/TopPredictionsMeter';
import DiseaseDetailTabs from '../components/DiseaseDetailTabs';
import FeedbackModal from '../components/FeedbackModal';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { predictionApi, SERVER_URL } from '../services/api';
import { useToast } from '../context/ToastContext';
import { formatDiseaseName } from '../utils/diseaseUtils';

const ResultPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(!location.state?.predictionData);
  const [data, setData] = useState(location.state?.predictionData || null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!data && id) {
      setLoading(true);
      predictionApi.getById(id)
        .then((res) => {
          if (res.data) {
            setData({
              prediction: res.data,
              disease: res.data.disease,
              mlInfo: {
                status: res.data.status,
                isConfident: res.data.status === 'confident'
              }
            });
          }
        })
        .catch(() => {
          // If not found by mongo ID, check public shareToken
          return predictionApi.getShared(id).then((res) => {
            if (res.data) {
              setData({
                prediction: res.data,
                disease: res.data.disease,
                mlInfo: {
                  status: res.data.status,
                  isConfident: res.data.status === 'confident'
                }
              });
            }
          });
        })
        .catch((err) => {
          addToast(err.message || 'Could not load prediction details.', 'error');
        })
        .finally(() => setLoading(false));
    }
  }, [id, data, addToast]);

  const handleShare = async () => {
    const shareToken = data?.prediction?.shareToken;
    const shareUrl = `${window.location.origin}/share/${shareToken || id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `CropCare AI Diagnosis: ${formatDiseaseName(data?.prediction?.finalLabel)}`,
          text: `Preliminary AI disease diagnosis report for ${formatDiseaseName(data?.prediction?.finalLabel)}.`,
          url: shareUrl
        });
        addToast('Diagnosis shared!', 'success');
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    // Clipboard fallback
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    addToast('Public share link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPdf = () => {
    if (!id && !data?.prediction?._id) return;
    const predId = id || data.prediction._id;
    const url = predictionApi.getPdfUrl(predId);
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <RefreshCw className="w-10 h-10 text-agri-600 animate-spin mx-auto" />
        <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-slate-100">
          Loading Phytopathological Diagnostic Record...
        </h3>
      </div>
    );
  }

  if (!data || !data.prediction) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4 glass-card rounded-3xl p-8">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-slate-100">
          Prediction Record Not Found
        </h3>
        <p className="text-xs text-slate-500">
          This diagnostic record may have been cleared or the identifier is invalid.
        </p>
        <Link to="/predict" className="btn-primary text-xs py-2.5 px-5 inline-flex">
          Diagnose a New Leaf
        </Link>
      </div>
    );
  }

  const { prediction, disease, mlInfo } = data;

  if (prediction?.isCropLeaf === false || prediction?.status === 'rejected') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <button
          onClick={() => navigate('/predict')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-agri-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Diagnose Another Image</span>
        </button>

        <div className="rounded-3xl p-8 border-2 border-red-500/80 bg-red-50/90 dark:bg-red-950/40 space-y-6 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-red-600 text-white shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200">
                Stage 1 Validation Gate
              </span>
              <h1 className="font-serif font-black text-2xl sm:text-3xl text-red-950 dark:text-red-100">
                Crop Not Detected. Please upload a valid crop leaf image.
              </h1>
              <p className="text-xs sm:text-sm text-red-900/80 dark:text-red-200/80 leading-relaxed">
                The Stage 1 automated image validation system determined that this image does not contain agricultural foliage or a recognizable crop leaf. To maintain scientific integrity, pathological disease classification and treatment plans were not executed for this image.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-red-200 dark:border-red-900/60 flex justify-end">
            <Link to="/predict" className="btn-primary text-xs py-2.5 px-6">
              Diagnose a Valid Crop Leaf Photo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isHealthy = disease ? disease.isHealthy : prediction.finalLabel?.toLowerCase().includes('healthy');
  const isUncertain = prediction.status === 'uncertain';
  const confidencePct = Math.round((prediction.confidence || 0) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Bar with Back and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/predict')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-agri-800 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('result.analyzeAnother')}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleShare}
            className="btn-outline text-xs py-2 px-3.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : t('result.shareResult')}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="btn-primary text-xs py-2 px-4 gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('result.downloadPdf')}</span>
          </button>
        </div>
      </div>


      {/* Primary Diagnosis Result Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-soft transition-all ${
        isHealthy
          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80'
          : isUncertain
          ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80'
          : 'bg-red-50/90 dark:bg-red-950/40 border-red-200 dark:border-red-800/80'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isHealthy
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                  : isUncertain
                  ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {isHealthy ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                <span>{isHealthy ? t('result.healthyBadge') : isUncertain ? 'Uncertain Detection' : t('result.diseaseBadge')}</span>
              </span>

              {isUncertain ? (
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  Host Crop: Unconfirmed
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Crop: {disease?.crop?.name || prediction.finalLabel.split('___')[0].replace(/_/g, ' ')}
                </span>
              )}
            </div>

            {/* Disease Heading */}
            <h1 className="font-serif font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isHealthy
                ? 'Healthy Foliage (No Disease Detected)'
                : isUncertain
                ? `Suspected Disease: ${formatDiseaseName(prediction.finalLabel)}`
                : formatDiseaseName(prediction.finalLabel)}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {isUncertain
                ? 'Lesion morphology matches symptoms of this pathology. Host crop is unconfirmed due to low classification confidence.'
                : disease?.description || 'Phytopathological deep feature classification completed.'}
            </p>
          </div>

          {/* Confidence Score Pill */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 dark:bg-parchment-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 min-w-[130px] shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Confidence
            </span>
            <span className={`text-3xl font-black font-serif ${
              confidencePct >= 80 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
            }`}>
              {confidencePct}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {prediction.status}
            </span>
          </div>
        </div>

        {/* Uncertain Warning State Note */}
        {isUncertain && (
          <div className="mt-5 p-4 rounded-xl bg-amber-100/70 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <span className="font-bold block">{t('result.uncertainTitle')}:</span>
            <p>{mlInfo?.message || t('result.uncertainDesc')}</p>
          </div>
        )}
      </div>

      {/* Visual Diagnostics (Grad-CAM) + Top Predictions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Grad-CAM Explainable AI Viewer */}
        <div className="lg:col-span-2">
          <GradcamViewer
            originalImagePath={prediction.imagePath}
            heatmapPath={prediction.heatmapPath}
          />
        </div>

        {/* Right Col: Top 3 Predictions Meter */}
        <div className="space-y-6">
          <TopPredictionsMeter
            topPredictions={prediction.topPredictions}
            confidence={prediction.confidence}
            isUncertain={isUncertain}
          />

          {/* Feedback Module */}
          <FeedbackModal
            predictionId={prediction._id}
            currentLabel={prediction.finalLabel}
          />
        </div>
      </div>

      {/* Comprehensive Botanical Information & Multi-Tab Treatment Guide */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
            Botanical Etiology &amp; Agronomic Interventions
          </h2>
        </div>
        <DiseaseDetailTabs disease={disease} />
      </section>
    </div>
  );
};

export default ResultPage;
