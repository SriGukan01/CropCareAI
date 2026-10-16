import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Upload, Layers, Zap, AlertCircle, RefreshCw, ShieldAlert, X } from 'lucide-react';
import LeafUpload from '../components/LeafUpload';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { predictApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const PredictPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'batch'
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rejectionError, setRejectionError] = useState(null);

  const SAMPLE_SPECIMENS = [
    { name: 'Tomato Early Blight', path: '/samples/tomato_early_blight.jpg', filename: 'tomato_early_blight.jpg', desc: 'Target spot concentric lesions', isLeaf: true },
    { name: 'Potato Late Blight', path: '/samples/potato_late_blight.jpg', filename: 'potato_late_blight.jpg', desc: 'Water-soaked necrosis', isLeaf: true },
    { name: 'Healthy Apple Leaf', path: '/samples/apple_healthy.jpg', filename: 'apple_healthy.jpg', desc: 'Clean foliar chlorophyll', isLeaf: true },
    { name: 'Corn Common Rust', path: '/samples/corn_common_rust.jpg', filename: 'corn_common_rust.jpg', desc: 'Parallel vein fungal pustules', isLeaf: true },
    { name: 'Irrelevant: Vehicle', path: '/samples/non_leaf_sample.jpg', filename: 'non_leaf_sample.jpg', desc: 'Non-crop negative sample', isLeaf: false }
  ];

  const handleSelectSample = async (sample) => {
    try {
      setRejectionError(null);
      const res = await fetch(sample.path);
      const blob = await res.blob();
      const file = new File([blob], sample.filename, { type: 'image/jpeg' });
      setSelectedFiles([
        {
          file,
          previewUrl: sample.path,
          name: sample.filename,
          sizeMb: (file.size / (1024 * 1024)).toFixed(2)
        }
      ]);
      addToast(`Loaded specimen: ${sample.name}`, 'info');
    } catch (err) {
      addToast('Could not load sample specimen.', 'error');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedFiles([]);
    setRejectionError(null);
  };

  const handleClear = () => {
    setSelectedFiles([]);
    setRejectionError(null);
  };

  const handleFilesSelected = (files) => {
    setRejectionError(null);
    setSelectedFiles(files);
  };

  const handleDiagnose = async () => {
    if (selectedFiles.length === 0) {
      addToast('Please select or capture a crop leaf photo to proceed.', 'error');
      return;
    }

    setIsAnalyzing(true);
    setRejectionError(null);

    try {
      if (activeTab === 'single') {
        const formData = new FormData();
        formData.append('image', selectedFiles[0].file);

        const res = await predictApi.predictSingle(formData);
        if (res.success && res.data) {
          addToast('Classification complete!', 'success');
          // Navigate to result page with prediction state
          navigate(`/result/${res.data.prediction._id}`, {
            state: { predictionData: res.data }
          });
        }
      } else {
        // Batch upload
        const formData = new FormData();
        selectedFiles.forEach((item) => {
          formData.append('images', item.file);
        });

        const res = await predictApi.predictBatch(formData);
        if (res.success && res.data) {
          addToast(`Analyzed ${res.data.summary.totalAnalyzed} specimens!`, 'success');
          navigate(`/batch/${res.data.batchId}`, {
            state: { batchData: res.data }
          });
        }
      }
    } catch (err) {
      const errorMsg = err.message || 'Diagnostic inference failed.';
      if (errorMsg.includes('Crop Not Detected') || errorMsg.includes('leaf')) {
        setRejectionError('Crop Not Detected. Please upload a valid crop leaf image.');
      }
      addToast(errorMsg, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-serif font-black text-2xl sm:text-4xl text-slate-900 dark:text-white">
          {t('predict.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {t('predict.subtitle')}
        </p>
      </div>


      {/* Rejection Notification Banner */}
      {rejectionError && (
        <div className="p-5 rounded-3xl bg-red-50 dark:bg-red-950/60 border-2 border-red-500/80 text-red-950 dark:text-red-100 space-y-3 shadow-soft animate-fade-in relative">
          <button
            onClick={() => setRejectionError(null)}
            className="absolute top-4 right-4 p-1 rounded-full text-red-400 hover:text-red-700 dark:hover:text-red-200"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-red-600 text-white shrink-0 mt-0.5 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200">
                Stage 1 Validator Rejection
              </span>
              <h2 className="font-serif font-black text-lg sm:text-xl text-red-700 dark:text-red-300">
                Crop Not Detected. Please upload a valid crop leaf image.
              </h2>
              <p className="text-xs text-red-800/80 dark:text-red-200/80 leading-relaxed">
                Our two-stage diagnostic pipeline detected that the uploaded image does not contain agricultural foliage or a plant leaf blade. To prevent incorrect diagnoses, non-crop images (people, vehicles, buildings, food, animals, documents, or unrelated objects) are automatically rejected before disease classification.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-red-200 dark:border-red-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-red-700 dark:text-red-300 font-medium">
              Tip: Ensure the leaf blade is well-lit, close-up, and occupies most of the photo.
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors shadow-sm"
            >
              Select New Crop Photo
            </button>
          </div>
        </div>
      )}

      {/* Main Upload Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft-lg relative overflow-hidden">
        {/* Animated Scanner Beam Overlay during analysis */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-20 bg-agri-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-4">
            <div className="scanner-line" />
            <div className="w-16 h-16 rounded-2xl bg-agri-700/60 border border-agri-400/50 flex items-center justify-center animate-pulse shadow-glow">
              <RefreshCw className="w-8 h-8 text-agri-300 animate-spin" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-serif font-bold text-lg text-white">
                Stage 1 &amp; Stage 2 Two-Stage Screening...
              </p>
              <p className="text-xs text-agri-200">
                1. Validating crop foliage presence &bull; 2. Evaluating 38 pathological classes
              </p>
            </div>
          </div>
        )}

        {/* Upload Mode Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 gap-2 pb-2">
          <button
            type="button"
            onClick={() => handleTabChange('single')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'single'
                ? 'bg-agri-800 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t('predict.tabSingle')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('batch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'batch'
                ? 'bg-agri-800 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('predict.tabBatch')}</span>
          </button>
        </div>

        {/* Tab Notice */}
        {activeTab === 'batch' && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-agri-50 dark:bg-agri-950/40 border border-agri-200 dark:border-agri-800 text-xs text-agri-800 dark:text-agri-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{t('predict.batchLimitNote')}</span>
          </div>
        )}

        {/* Leaf Upload Zone */}
        <LeafUpload
          isBatch={activeTab === 'batch'}
          onFilesSelected={handleFilesSelected}
          selectedFiles={selectedFiles}
          onClear={handleClear}
        />

        {/* Preset Sample Specimens for Instant Demo & Testing */}
        {activeTab === 'single' && selectedFiles.length === 0 && (
          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Quick Test Specimens (Click to Load)
              </span>
              <span className="text-[11px] text-agri-600 dark:text-agri-400">
                Instant Two-Stage Demo
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {SAMPLE_SPECIMENS.map((specimen, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(specimen)}
                  className={`group p-2 rounded-xl border bg-white/50 dark:bg-slate-800/50 hover:bg-agri-50/50 dark:hover:bg-agri-950/40 transition-all text-left flex flex-col space-y-1.5 ${
                    specimen.isLeaf
                      ? 'border-slate-200 dark:border-slate-700 hover:border-agri-500'
                      : 'border-red-200 dark:border-red-800/60 hover:border-red-500 bg-red-50/30'
                  }`}
                >
                  <div className="w-full h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 relative">
                    <img
                      src={specimen.path}
                      alt={specimen.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!specimen.isLeaf && (
                      <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-red-600 text-white shadow-sm">
                        Negative Test
                      </span>
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold leading-tight ${
                      specimen.isLeaf
                        ? 'text-slate-800 dark:text-slate-200 group-hover:text-agri-700'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {specimen.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {specimen.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Diagnose CTA Button */}
        {selectedFiles.length > 0 && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={handleDiagnose}
              className="btn-primary w-full sm:w-auto text-sm py-3 px-8 shadow-md hover:shadow-soft-lg gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>{t('predict.analyzeBtn')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Helpful Tips Box */}
      <div className="p-5 rounded-2xl bg-white/60 dark:bg-parchment-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[11px]">
          Photography Tips for Optimal Accuracy:
        </span>
        <ul className="list-disc list-inside space-y-1">
          <li>Ensure leaf blade fills at least 60% of the camera frame.</li>
          <li>Avoid severe shadows, blur, or direct sunlight glare.</li>
          <li>Capture both healthy tissue and lesion margins for clear differential contrast.</li>
          <li>Do not submit non-plant objects (people, vehicles, pets, documents) as they will be rejected by Stage 1 validation.</li>
        </ul>
      </div>
    </div>
  );
};

export default PredictPage;
