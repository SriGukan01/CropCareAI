import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  BookOpen,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Camera,
  Activity,
  FileText,
  Search
} from 'lucide-react';
import { libraryApi } from '../services/api';

const LandingPage = () => {
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    libraryApi.getCrops()
      .then((res) => {
        if (res.data) setCrops(res.data);
      })
      .catch((err) => console.log('Could not load crops for landing:', err.message));
  }, []);

  return (
    <div className="w-full space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-agri-100/40 via-olive-100/20 to-transparent dark:from-agri-950/40 dark:via-transparent -z-10 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agri-100 dark:bg-agri-900/60 border border-agri-200 dark:border-agri-800 text-agri-800 dark:text-agri-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Activity className="w-3.5 h-3.5 text-agri-600 animate-pulse" />
            <span>MobileNetV2 Deep Learning • 38 Botanical Classes</span>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {t('hero.title')}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('hero.subtitle')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/predict" className="btn-primary text-sm px-7 py-3.5 shadow-md hover:shadow-soft-lg">
              <Upload className="w-4 h-4" />
              <span>{t('hero.ctaPredict')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link to="/library" className="btn-secondary text-sm px-6 py-3.5">
              <BookOpen className="w-4 h-4 text-agri-700 dark:text-agri-300" />
              <span>{t('hero.ctaLibrary')}</span>
            </Link>
          </div>

          {/* KPI Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-4 text-center">
              <span className="block text-2xl font-black text-agri-700 dark:text-agri-400 font-serif">
                98.4%
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Validation Accuracy
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <span className="block text-2xl font-black text-agri-700 dark:text-agri-400 font-serif">
                38 Classes
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                14 Major Crop Species
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <span className="block text-2xl font-black text-agri-700 dark:text-agri-400 font-serif">
                &lt; 1.2s
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Instant Grad-CAM Inference
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {t('howItWorks.title')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Three simple steps from field photo to organic and chemical treatment advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3 relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-agri-100 dark:bg-agri-900/60 text-agri-700 dark:text-agri-300 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
              {t('howItWorks.step1Title')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('howItWorks.step1Desc')}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3 relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-olive-100 dark:bg-olive-900/60 text-olive-700 dark:text-olive-300 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
              {t('howItWorks.step2Title')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('howItWorks.step2Desc')}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3 relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
              {t('howItWorks.step3Title')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('howItWorks.step3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Supported Crops Showcase */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
              Supported Agricultural Crops
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Diagnose foliage conditions across staple grains, fruits, and solanaceous vegetables.
            </p>
          </div>
          <Link to="/library" className="text-xs font-semibold text-agri-700 dark:text-agri-400 hover:underline flex items-center gap-1">
            Browse All 38 Classes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {(crops.length > 0 ? crops : [
            { name: 'Apple' }, { name: 'Corn' }, { name: 'Grape' }, { name: 'Potato' },
            { name: 'Tomato' }, { name: 'Bell Pepper' }, { name: 'Strawberry' }
          ]).slice(0, 14).map((crop, i) => (
            <Link
              key={i}
              to={`/library?crop=${encodeURIComponent(crop.name)}`}
              className="glass-card rounded-xl p-3.5 text-center hover:border-agri-500 hover:bg-agri-50/50 dark:hover:bg-agri-950/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-agri-100 dark:bg-agri-900/60 text-agri-800 dark:text-agri-200 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <span className="font-serif font-bold text-sm">
                  {crop.name.substring(0, 1)}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                {crop.name}
              </span>
            </Link>
          ))}
        </div>
      </section>


      {/* Call to Action Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-agri-900 via-agri-800 to-olive-900 text-white p-8 sm:p-12 shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-white">
              Ready to diagnose your crop?
            </h3>
            <p className="text-sm text-agri-200 max-w-md">
              Fast, free, and accessible on smartphones directly from the field. No account required for instant predictions.
            </p>
          </div>
          <Link
            to="/predict"
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-agri-900 hover:bg-agri-50 transition-colors shadow-md shrink-0"
          >
            Start Leaf Analysis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
