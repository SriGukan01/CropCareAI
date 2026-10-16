import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Leaf,
  FlaskConical,
  CheckCircle,
  Info,
  Sprout
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Concise botanical latin names for classes
const SCIENTIFIC_NAMES = {
  'Apple___Apple_scab': 'Venturia inaequalis',
  'Apple___Black_rot': 'Botryosphaeria obtusa',
  'Apple___Cedar_apple_rust': 'Gymnosporangium juniperi-virginianae',
  'Apple___healthy': 'Zero Pathogen Detected',
  'Blueberry___healthy': 'Zero Pathogen Detected',
  'Cherry_(including_sour)___Powdery_mildew': 'Podosphaera clandestina',
  'Cherry_(including_sour)___healthy': 'Zero Pathogen Detected',
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 'Cercospora zeae-maydis',
  'Corn_(maize)___Common_rust_': 'Puccinia sorghi',
  'Corn_(maize)___Northern_Leaf_Blight': 'Exserohilum turcicum',
  'Corn_(maize)___healthy': 'Zero Pathogen Detected',
  'Grape___Black_rot': 'Guignardia bidwellii',
  'Grape___Esca_(Black_Measles)': 'Phaeomoniella chlamydospora & Fomitiporia',
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 'Pseudocercospora cladosporioides',
  'Grape___healthy': 'Zero Pathogen Detected',
  'Orange___Haunglongbing_(Citrus_greening)': 'Candidatus Liberibacter asiaticus',
  'Peach___Bacterial_spot': 'Xanthomonas arboricola pv. pruni',
  'Peach___healthy': 'Zero Pathogen Detected',
  'Pepper,_bell___Bacterial_spot': 'Xanthomonas campestris pv. vesicatoria',
  'Pepper,_bell___healthy': 'Zero Pathogen Detected',
  'Potato___Early_blight': 'Alternaria solani',
  'Potato___Late_blight': 'Phytophthora infestans',
  'Potato___healthy': 'Zero Pathogen Detected',
  'Raspberry___healthy': 'Zero Pathogen Detected',
  'Soybean___healthy': 'Zero Pathogen Detected',
  'Squash___Powdery_mildew': 'Podosphaera xanthii',
  'Strawberry___Leaf_scorch': 'Diplocarpon earlianum',
  'Strawberry___healthy': 'Zero Pathogen Detected',
  'Tomato___Bacterial_spot': 'Xanthomonas campestris pv. vesicatoria',
  'Tomato___Early_blight': 'Alternaria solani',
  'Tomato___Late_blight': 'Phytophthora infestans',
  'Tomato___Leaf_Mold': 'Passalora fulva',
  'Tomato___Septoria_leaf_spot': 'Septoria lycopersici',
  'Tomato___Spider_mites Two-spotted_spider_mite': 'Tetranychus urticae',
  'Tomato___Target_Spot': 'Corynespora cassiicola',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'Tomato yellow leaf curl virus (Begomovirus)',
  'Tomato___Tomato_mosaic_virus': 'Tomato mosaic virus (Tobamovirus)',
  'Tomato___healthy': 'Zero Pathogen Detected'
};

const DiseaseDetailTabs = ({ disease }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  if (!disease) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center text-slate-500">
        <Info className="w-8 h-8 mx-auto mb-2 text-slate-400" />
        <p className="text-sm font-medium">No botanical reference profile attached to this class label.</p>
      </div>
    );
  }

  // Get localized content if available
  const lang = i18n.language?.substring(0, 2) || 'en';
  const trans = (disease.translations && disease.translations[lang]) ? disease.translations[lang] : disease;

  const scientificName = SCIENTIFIC_NAMES[disease.classLabel] || (disease.isHealthy ? 'Zero Pathogen Detected' : 'Identified Botanical Pathogen');

  const tabs = [
    { id: 'overview', label: t('result.tabs.overview') || 'Overview', icon: FileText },
    { id: 'symptoms', label: t('result.tabs.symptoms') || 'Symptoms', icon: AlertTriangle },
    { id: 'causes', label: t('result.tabs.causes') || 'Causes & Vectors', icon: HelpCircle },
    { id: 'prevention', label: t('result.tabs.prevention') || 'Prevention', icon: ShieldCheck },
    { id: 'organic', label: t('result.tabs.organic') || 'Biological Control', icon: Leaf },
    { id: 'chemical', label: t('result.tabs.chemical') || 'Chemical Control', icon: FlaskConical },
    { id: 'bestPractices', label: t('result.tabs.bestPractices') || 'Best Practices', icon: CheckCircle }
  ];

  return (
    <div className="glass-card rounded-3xl overflow-hidden shadow-soft border border-slate-200/90 dark:border-slate-800">
      {/* Scrollable Tab Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                isActive
                  ? 'border-agri-700 dark:border-agri-400 text-agri-800 dark:text-agri-200 bg-white dark:bg-parchment-800'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-agri-600 dark:text-agri-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
                {trans.name || disease.name}
              </h4>
              <p className="text-sm text-slate-500 italic font-serif">
                Scientific Classification: {scientificName}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {trans.description || disease.description}
              </p>
            </div>

            {disease.severityNote && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-[11px]">Agronomic Severity Assessment:</span>
                <p className="leading-relaxed">{disease.severityNote}</p>
              </div>
            )}
          </div>
        )}

        {/* SYMPTOMS TAB */}
        {activeTab === 'symptoms' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Diagnostic Symptoms
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(trans.symptoms || disease.symptoms || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-agri-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CAUSES TAB */}
        {activeTab === 'causes' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Pathogen Etiology &amp; Environmental Triggers
            </h4>
            <ul className="space-y-2">
              {(trans.causes || disease.causes || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PREVENTION TAB */}
        {activeTab === 'prevention' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Preventive Field Measures
            </h4>
            <ul className="space-y-2">
              {(trans.prevention || disease.prevention || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ORGANIC TAB */}
        {activeTab === 'organic' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Recommended Organic &amp; Biological Remedies</span>
            </h4>
            <ul className="space-y-2">
              {(trans.organicTreatment || disease.organicTreatment || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-100 font-medium">
                  <Sprout className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CHEMICAL TAB */}
        {activeTab === 'chemical' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-purple-600" />
              <span>Chemical Control &amp; Targeted Sprays</span>
            </h4>
            <ul className="space-y-2">
              {(trans.chemicalTreatment || disease.chemicalTreatment || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 text-xs text-slate-700 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BEST PRACTICES TAB */}
        {activeTab === 'bestPractices' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-agri-600" />
              <span>Field Best Management Practices</span>
            </h4>
            <ul className="space-y-2">
              {(trans.bestPractices || disease.bestPractices || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-agri-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetailTabs;
