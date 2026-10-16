import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  ArrowRight,
  Sprout,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  X,
  Upload,
  Layers
} from 'lucide-react';
import { libraryApi } from '../services/api';

// Concise botanical metadata for the 38 classes
const BOTANICAL_META = {
  'Apple___Apple_scab': { pathogen: 'Venturia inaequalis', type: 'Fungal', threat: 'Critical' },
  'Apple___Black_rot': { pathogen: 'Botryosphaeria obtusa', type: 'Fungal', threat: 'Critical' },
  'Apple___Cedar_apple_rust': { pathogen: 'Gymnosporangium juniperi-virginianae', type: 'Fungal', threat: 'Moderate' },
  'Apple___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Blueberry___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Cherry_(including_sour)___Powdery_mildew': { pathogen: 'Podosphaera clandestina', type: 'Fungal', threat: 'Moderate' },
  'Cherry_(including_sour)___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': { pathogen: 'Cercospora zeae-maydis', type: 'Fungal', threat: 'Moderate' },
  'Corn_(maize)___Common_rust_': { pathogen: 'Puccinia sorghi', type: 'Fungal', threat: 'Moderate' },
  'Corn_(maize)___Northern_Leaf_Blight': { pathogen: 'Exserohilum turcicum', type: 'Fungal', threat: 'Critical' },
  'Corn_(maize)___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Grape___Black_rot': { pathogen: 'Guignardia bidwellii', type: 'Fungal', threat: 'Critical' },
  'Grape___Esca_(Black_Measles)': { pathogen: 'Phaeomoniella chlamydospora & Fomitiporia', type: 'Fungal', threat: 'Critical' },
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': { pathogen: 'Pseudocercospora cladosporioides', type: 'Fungal', threat: 'Moderate' },
  'Grape___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Orange___Haunglongbing_(Citrus_greening)': { pathogen: 'Candidatus Liberibacter asiaticus', type: 'Bacterial', threat: 'Critical' },
  'Peach___Bacterial_spot': { pathogen: 'Xanthomonas arboricola pv. pruni', type: 'Bacterial', threat: 'Critical' },
  'Peach___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Pepper,_bell___Bacterial_spot': { pathogen: 'Xanthomonas campestris pv. vesicatoria', type: 'Bacterial', threat: 'Critical' },
  'Pepper,_bell___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Potato___Early_blight': { pathogen: 'Alternaria solani', type: 'Fungal', threat: 'Moderate' },
  'Potato___Late_blight': { pathogen: 'Phytophthora infestans', type: 'Fungal', threat: 'Critical' },
  'Potato___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Raspberry___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Soybean___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Squash___Powdery_mildew': { pathogen: 'Podosphaera xanthii', type: 'Fungal', threat: 'Moderate' },
  'Strawberry___Leaf_scorch': { pathogen: 'Diplocarpon earlianum', type: 'Fungal', threat: 'Moderate' },
  'Strawberry___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' },
  'Tomato___Bacterial_spot': { pathogen: 'Xanthomonas campestris pv. vesicatoria', type: 'Bacterial', threat: 'Critical' },
  'Tomato___Early_blight': { pathogen: 'Alternaria solani', type: 'Fungal', threat: 'Moderate' },
  'Tomato___Late_blight': { pathogen: 'Phytophthora infestans', type: 'Fungal', threat: 'Critical' },
  'Tomato___Leaf_Mold': { pathogen: 'Passalora fulva', type: 'Fungal', threat: 'Moderate' },
  'Tomato___Septoria_leaf_spot': { pathogen: 'Septoria lycopersici', type: 'Fungal', threat: 'Moderate' },
  'Tomato___Spider_mites Two-spotted_spider_mite': { pathogen: 'Tetranychus urticae', type: 'Fungal', threat: 'Moderate' },
  'Tomato___Target_Spot': { pathogen: 'Corynespora cassiicola', type: 'Fungal', threat: 'Moderate' },
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': { pathogen: 'Tomato yellow leaf curl virus (Begomovirus)', type: 'Viral', threat: 'Critical' },
  'Tomato___Tomato_mosaic_virus': { pathogen: 'Tomato mosaic virus (Tobamovirus)', type: 'Viral', threat: 'Critical' },
  'Tomato___healthy': { pathogen: 'Zero Pathogen Detected', type: 'Healthy', threat: 'Optimal' }
};

const DiseaseLibraryPage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCrop, setSelectedCrop] = useState(searchParams.get('crop') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedPathogenType, setSelectedPathogenType] = useState('All'); // 'All', 'Fungal', 'Bacterial', 'Viral', 'Healthy'
  const [selectedSeverity, setSelectedSeverity] = useState('All'); // 'All', 'Critical', 'Moderate', 'Healthy'

  // Quick Remedy Modal State
  const [activeRemedyModal, setActiveRemedyModal] = useState(null);

  useEffect(() => {
    libraryApi.getCrops()
      .then((res) => {
        if (res.data) setCrops(res.data);
      })
      .catch((err) => console.log('Crop load error:', err.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    libraryApi.getDiseases({
      search: searchQuery || undefined
    })
      .then((res) => {
        if (res.data) setDiseases(res.data);
      })
      .catch((err) => console.log('Disease load error:', err.message))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  // Combined client-side filtering
  const filteredDiseases = useMemo(() => {
    return diseases.filter((d) => {
      // 1. Crop filter
      if (selectedCrop && d.crop?.name?.toLowerCase() !== selectedCrop.toLowerCase()) {
        return false;
      }

      const meta = BOTANICAL_META[d.classLabel] || {
        pathogen: d.isHealthy ? 'Zero Pathogen Detected' : 'Identified Botanical Pathogen',
        type: d.isHealthy ? 'Healthy' : 'Fungal',
        threat: d.isHealthy ? 'Optimal' : 'Moderate'
      };

      // 2. Pathogen Type filter
      if (selectedPathogenType !== 'All') {
        if (meta.type !== selectedPathogenType) return false;
      }

      // 3. Severity filter
      if (selectedSeverity !== 'All') {
        if (selectedSeverity === 'Critical' && meta.threat !== 'Critical') return false;
        if (selectedSeverity === 'Moderate' && meta.threat !== 'Moderate') return false;
        if (selectedSeverity === 'Healthy' && meta.threat !== 'Optimal' && !d.isHealthy) return false;
      }

      return true;
    });
  }, [diseases, selectedCrop, selectedPathogenType, selectedSeverity]);

  const selectCropFilter = (cropName) => {
    setSelectedCrop(cropName);
    if (cropName) {
      setSearchParams({ crop: cropName });
    } else {
      setSearchParams({});
    }
  };

  const getPathogenBadgeStyle = (type) => {
    switch (type) {
      case 'Healthy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300';
      case 'Bacterial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300';
      case 'Viral':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300';
      case 'Fungal':
      default:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300';
    }
  };

  const getThreatBadgeStyle = (threat) => {
    switch (threat) {
      case 'Optimal':
      case 'Healthy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Critical':
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
    }
  };

  const lang = i18n.language?.substring(0, 2) || 'en';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-300 border border-agri-200 dark:border-agri-900 mb-2">
            <Layers className="w-3.5 h-3.5 text-agri-600" />
            <span>Comprehensive Crop Pathology Library &bull; 38 Classes</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Comprehensive Crop Pathology Library
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Detailed botanical pathogen profiles, clinical foliar symptoms, organic bio-remedies, and certified treatment protocols across 14 commercial crop varieties.
          </p>
        </div>

        <Link
          to="/predict"
          className="btn-primary inline-flex items-center justify-center gap-2 text-sm py-2.5 px-4 shadow-soft hover:shadow-soft-lg self-start md:self-auto shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Scan Leaf for Match</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by disease name, crop, pathogen (e.g., 'Blight', 'Phytophthora', 'Rust', 'Scab')..."
            className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800 text-slate-900 dark:text-slate-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-agri-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Secondary Filter Row: Pathogen Classification & Threat Level */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Pathogen:
            </span>
            {[
              { id: 'All', label: 'All Pathogens' },
              { id: 'Fungal', label: 'Fungal (Fungi)' },
              { id: 'Bacterial', label: 'Bacterial' },
              { id: 'Viral', label: 'Viral' },
              { id: 'Healthy', label: 'Healthy Baseline' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPathogenType(p.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedPathogenType === p.id
                    ? 'bg-agri-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Threat:
            </span>
            {[
              { id: 'All', label: 'All' },
              { id: 'Critical', label: 'Critical Threat' },
              { id: 'Moderate', label: 'Moderate' },
              { id: 'Healthy', label: 'Healthy' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeverity(s.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedSeverity === s.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Crops Filter Row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              Filter by Crop Specimen:
            </span>
            <button
              onClick={() => selectCropFilter('')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCrop === ''
                  ? 'bg-agri-800 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Crops ({diseases.length})
            </button>
            {crops.map((crop) => (
              <button
                key={crop._id || crop.name}
                onClick={() => selectCropFilter(crop.name)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCrop.toLowerCase() === crop.name.toLowerCase()
                    ? 'bg-agri-800 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {crop.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Diseases Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 text-agri-600 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading botanical encyclopedia records...</p>
        </div>
      ) : filteredDiseases.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <Sprout className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-slate-200">
            No matching pathologies found
          </h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query, clearing the filters, or searching for a different commercial crop.
          </p>
          <button
            onClick={() => {
              setSelectedCrop('');
              setSelectedPathogenType('All');
              setSelectedSeverity('All');
              setSearchQuery('');
            }}
            className="btn-secondary text-xs py-2 px-4"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDiseases.map((d) => {
            const trans = d.translations && d.translations[lang] ? d.translations[lang] : d;
            const meta = BOTANICAL_META[d.classLabel] || {
              pathogen: d.isHealthy ? 'Zero Pathogen Detected' : 'Identified Botanical Pathogen',
              type: d.isHealthy ? 'Healthy' : 'Fungal',
              threat: d.isHealthy ? 'Optimal' : 'Moderate'
            };

            const symptoms = trans.symptoms || d.symptoms || [];
            const primaryBioRemedy =
              (trans.organicTreatment && trans.organicTreatment[0]) ||
              (d.organicTreatment && d.organicTreatment[0]) ||
              (d.isHealthy ? 'Preventive seaweed extract & bio-stimulants' : 'Neem oil or Trichoderma viride foliar spray');

            return (
              <div
                key={d._id || d.id || d.classLabel}
                className="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:shadow-soft-lg transition-all group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {d.crop?.name || 'Crop'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getPathogenBadgeStyle(meta.type)}`}>
                        {meta.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getThreatBadgeStyle(meta.threat)}`}>
                        {meta.threat}
                      </span>
                    </div>
                  </div>

                  {/* Disease Title & Pathogen */}
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-agri-700 dark:group-hover:text-agri-400 transition-colors">
                    {trans.name || d.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic mb-2 font-serif">
                    {meta.pathogen}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {trans.description || d.description}
                  </p>

                  {/* Clinical Symptoms */}
                  <div className="mb-3 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Clinical Symptoms:
                    </span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      {symptoms.slice(0, 3).map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-agri-600 dark:text-agri-400">•</span>
                          <span className="line-clamp-1">{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Bio-Control Box */}
                  <div className="p-3 rounded-xl bg-agri-50 dark:bg-agri-950/40 border border-agri-200/80 dark:border-agri-900/60 mb-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-agri-800 dark:text-agri-300 flex items-center gap-1">
                      <Sprout className="w-3.5 h-3.5 text-agri-600" />
                      Primary Bio-Control:
                    </span>
                    <p className="text-xs text-agri-900 dark:text-agri-200 font-medium line-clamp-2">
                      {primaryBioRemedy}
                    </p>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setActiveRemedyModal(d)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-agri-100/70 hover:bg-agri-200/70 dark:bg-agri-950/60 dark:hover:bg-agri-900/60 text-agri-800 dark:text-agri-200 text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Quick Remedies</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>

                  <Link
                    to={`/library/${d._id || d.id}`}
                    className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 flex items-center gap-1 transition-colors"
                  >
                    <span>Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Remedies Modal */}
      {activeRemedyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card bg-white dark:bg-parchment-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-soft-lg space-y-5 animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-200">
                  {activeRemedyModal.crop?.name || 'Crop'} &bull; {activeRemedyModal.isHealthy ? 'Healthy' : 'Critical'}
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mt-1.5">
                  {activeRemedyModal.name}
                </h3>
                <p className="text-xs text-slate-500 italic font-serif">
                  Causative Organism: {BOTANICAL_META[activeRemedyModal.classLabel]?.pathogen || (activeRemedyModal.isHealthy ? 'Zero Pathogen Detected' : 'Identified Botanical Pathogen')}
                </p>
              </div>
              <button
                onClick={() => setActiveRemedyModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recommended Organic Bio-Remedies */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Recommended Organic Bio-Remedies</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {(activeRemedyModal.organicTreatment && activeRemedyModal.organicTreatment[0]) || (activeRemedyModal.isHealthy ? 'Preventive seaweed extract & bio-stimulants' : 'Neem oil foliar spray 5% or Trichoderma bio-control')}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                &bull; {(activeRemedyModal.organicTreatment && activeRemedyModal.organicTreatment[1]) || (activeRemedyModal.isHealthy ? 'Prophylactic compost tea and seaweed foliar sprays for enhanced immunity' : 'Copper hydroxide or sulfur spray at green tip')}
              </p>
            </div>

            {/* Preventive Cultural Sanitation Checklist */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Preventive Cultural Sanitation:
              </span>
              <div className="space-y-2">
                {((activeRemedyModal.prevention && activeRemedyModal.prevention.length > 0) ? activeRemedyModal.prevention.slice(0, 3) : [
                  'Maintain annual pruning to preserve sunlight and ventilation',
                  'Ensure balanced N-P-K fertilization and calcium foliar feeds',
                  'Continue periodic scouting for early pest or fungal signs'
                ]).map((point, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveRemedyModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close Preview
              </button>
              <Link
                to={`/library/${activeRemedyModal._id || activeRemedyModal.id}`}
                className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
              >
                <span>Open Full Agronomy Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseLibraryPage;
