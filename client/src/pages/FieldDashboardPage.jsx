import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  CloudRain,
  Droplets,
  Thermometer,
  Wind,
  Calculator,
  ShieldAlert,
  Sprout,
  Upload,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const FieldDashboardPage = () => {
  // 4 Primary Commercial Crop Outbreak Alerts
  const outbreakAlerts = [
    {
      id: 'tomato_late_blight',
      crop: 'Tomato',
      disease: 'Late Blight (Phytophthora)',
      riskLevel: 'HIGH',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-200 border-rose-200 dark:border-rose-900',
      trigger: 'Leaf wetness > 6h and humidity > 80% with night dew.',
      action: 'Apply Trichoderma bio-fungicide or Copper Oxychloride 50% WP before rainfall.'
    },
    {
      id: 'potato_early_blight',
      crop: 'Potato',
      disease: 'Early Blight (Alternaria)',
      riskLevel: 'MODERATE',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200 border-amber-200 dark:border-amber-900',
      trigger: 'Warm days (24-29°C) alternating with humid wet nights.',
      action: 'Prune lower leaves touching soil; apply Neem oil extract or Mancozeb spray.'
    },
    {
      id: 'corn_common_rust',
      crop: 'Corn',
      disease: 'Common Rust (Puccinia)',
      riskLevel: 'ELEVATED',
      badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-200 border-orange-200 dark:border-orange-900',
      trigger: 'Moderate temperatures (16-23°C) with persistent morning fog.',
      action: 'Inspect upper canopy leaves; apply protective triazole fungicide if rust spreads.'
    },
    {
      id: 'pepper_bacterial_spot',
      crop: 'Bell Pepper',
      disease: 'Bacterial Spot (Xanthomonas)',
      riskLevel: 'GUARDED',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-200 border-blue-200 dark:border-blue-900',
      trigger: 'Heavy rain splash and canopy leaf contact.',
      action: 'Switch to drip irrigation and spray copper-based bactericide in early morning.'
    }
  ];

  // Quick Spray Calculator State
  const [acres, setAcres] = useState(1.0);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const dosageDatabase = {
    Tomato: {
      disease: 'Late Blight & Leaf Mold',
      waterLiters: Math.round(acres * 200),
      organicBio: (acres * 1.0).toFixed(1) + ' kg (Trichoderma / Bacillus)',
      chemicalSpray: (acres * 0.5).toFixed(2) + ' kg (Copper Oxychloride 50% WP)',
      phiDays: '3 Days'
    },
    Potato: {
      disease: 'Early & Late Blight',
      waterLiters: Math.round(acres * 220),
      organicBio: (acres * 1.2).toFixed(1) + ' kg (Neem Kernel Extract + Bio-fungicide)',
      chemicalSpray: (acres * 0.6).toFixed(2) + ' kg (Mancozeb 75% WP)',
      phiDays: '7 Days'
    },
    Corn: {
      disease: 'Common Rust & Blight',
      waterLiters: Math.round(acres * 180),
      organicBio: (acres * 0.8).toFixed(1) + ' kg (Bio-formulation)',
      chemicalSpray: (acres * 0.4).toFixed(2) + ' kg (Azoxystrobin / Propiconazole)',
      phiDays: '14 Days'
    },
    'Bell Pepper': {
      disease: 'Bacterial Spot & Anthracnose',
      waterLiters: Math.round(acres * 190),
      organicBio: (acres * 0.9).toFixed(1) + ' kg (Copper Soap / Bio-agent)',
      chemicalSpray: (acres * 0.45).toFixed(2) + ' kg (Fixed Copper + Mancozeb)',
      phiDays: '3 Days'
    }
  };

  const currentDosage = dosageDatabase[selectedCrop] || dosageDatabase.Tomato;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-900">
          <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Regional Agro-Climate & Threat Watch</span>
        </div>

        <h1 className="font-serif font-black text-2xl sm:text-4xl text-slate-900 dark:text-white">
          Field Intelligence
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Real-time agricultural weather conditions, regional disease outbreak alerts, and precision spray volume calculations.
        </p>
      </div>

      {/* 1. Weather & Field Threat Summary */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <CloudRain className="w-4 h-4 text-agri-600" />
            <span>Field Conditions & Weather Advisory</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 w-fit">
            Elevated Fungal Spore Pressure
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-center">
            <Thermometer className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <span className="block text-lg font-black text-slate-900 dark:text-white">26.4°C</span>
            <span className="text-[11px] text-slate-500">Canopy Temp</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-center">
            <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <span className="block text-lg font-black text-slate-900 dark:text-white">78%</span>
            <span className="text-[11px] text-slate-500">Relative Humidity</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-center">
            <CloudRain className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
            <span className="block text-lg font-black text-slate-900 dark:text-white">4.2 hrs</span>
            <span className="text-[11px] text-slate-500">Leaf Wetness</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-center">
            <Wind className="w-4 h-4 text-teal-500 mx-auto mb-1" />
            <span className="block text-lg font-black text-slate-900 dark:text-white">8 km/h</span>
            <span className="text-[11px] text-slate-500">Wind (Safe Spray)</span>
          </div>
        </div>
      </div>

      {/* 2. Regional Outbreak Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-agri-600" />
            <span>Active Regional Disease Alerts</span>
          </h2>
          <span className="text-xs text-slate-500">Updated today</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {outbreakAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-5 rounded-2xl bg-white dark:bg-parchment-900/70 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-soft hover:shadow-soft-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-agri-600" />
                  {alert.crop}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${alert.badgeColor}`}>
                  {alert.riskLevel} ALERT
                </span>
              </div>

              <div className="text-xs font-semibold text-agri-800 dark:text-agri-300">
                {alert.disease}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-700 dark:text-slate-200">Weather Trigger:</strong> {alert.trigger}
              </p>

              <div className="p-2.5 rounded-xl bg-agri-50/60 dark:bg-agri-950/40 text-[11px] text-agri-900 dark:text-agri-200 border border-agri-100 dark:border-agri-900">
                <strong>Recommended Action:</strong> {alert.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Spray Volume & Dosage Calculator */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5 shadow-soft border border-agri-200/80 dark:border-agri-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-agri-700 dark:text-agri-300 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Field Calculator</span>
          </div>
          <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
            Spray Dosage & Water Volume Calculator
          </h2>
          <p className="text-xs text-slate-500">
            Compute the exact water requirements and protective spray mixtures for your farm size.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-agri-500 outline-none"
            >
              <option value="Tomato">Tomato (Late Blight / Leaf Mold)</option>
              <option value="Potato">Potato (Early / Late Blight)</option>
              <option value="Corn">Corn (Common Rust)</option>
              <option value="Bell Pepper">Bell Pepper (Bacterial Spot)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Farm Area (Acres): <span className="font-bold text-agri-700 dark:text-agri-400">{acres} Acres</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-agri-600 mt-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0.5 Acre</span>
              <span>5.0 Acres</span>
              <span>10.0 Acres</span>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Required Water Tank Volume
            </span>
            <span className="text-xl font-black text-blue-600 dark:text-blue-400 font-serif">
              {currentDosage.waterLiters} Liters
            </span>
            <span className="text-[11px] text-slate-500 block">Total spray carrier volume</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">
              Certified Organic Remedy
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block">
              {currentDosage.organicBio}
            </span>
            <span className="text-[11px] text-slate-500 block">0 days Pre-Harvest Waiting Period</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">
              Safe Chemical Remedy
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block">
              {currentDosage.chemicalSpray}
            </span>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block">
              PHI: {currentDosage.phiDays} before harvest
            </span>
          </div>
        </div>
      </div>

      {/* 4. Action Banner */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-agri-800 to-emerald-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft">
        <div className="space-y-1 max-w-lg">
          <h3 className="font-serif font-bold text-lg sm:text-xl">
            Notice suspicious lesions on your crops?
          </h3>
          <p className="text-xs text-agri-100">
            Upload a clear photo to run instant MobileNetV2 disease diagnosis and view Grad-CAM heatmaps.
          </p>
        </div>
        <Link
          to="/predict"
          className="px-6 py-3 rounded-xl bg-white text-agri-900 hover:bg-agri-50 text-xs font-bold transition-all shadow-md inline-flex items-center justify-center gap-2 shrink-0"
        >
          <Upload className="w-4 h-4 text-agri-700" />
          <span>Diagnose Crop Leaf Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default FieldDashboardPage;
