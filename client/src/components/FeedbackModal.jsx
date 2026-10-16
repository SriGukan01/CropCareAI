import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { feedbackApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const PLANT_CLASSES = [
  'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
  'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
  'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
  'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
  'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
  'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
  'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
  'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
  'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
  'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
];

const FeedbackModal = ({ predictionId, currentLabel }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctedLabel, setCorrectedLabel] = useState(currentLabel || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCorrect === null) {
      addToast('Please select whether the diagnosis was correct or incorrect.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await feedbackApi.submit({
        predictionId,
        isCorrect,
        correctedLabel: !isCorrect ? correctedLabel : currentLabel,
        notes
      });
      setIsSubmitted(true);
      addToast(t('result.feedbackSubmitted'), 'success');
    } catch (err) {
      addToast(err.message || 'Failed to submit feedback.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card rounded-2xl p-5 text-center bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
        <Check className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
        <h5 className="font-serif font-bold text-sm text-emerald-900 dark:text-emerald-200">
          Diagnostic Feedback Logged
        </h5>
        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
          {t('result.feedbackSubmitted')}
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <h4 className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
        {t('result.feedbackPrompt')}
      </h4>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsCorrect(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
            isCorrect === true
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-200'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          {t('result.feedbackCorrect')}
        </button>

        <button
          type="button"
          onClick={() => setIsCorrect(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
            isCorrect === false
              ? 'bg-red-600 text-white border-red-600 shadow-sm'
              : 'border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-700 dark:text-slate-200'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          {t('result.feedbackWrong')}
        </button>
      </div>

      {isCorrect === false && (
        <form onSubmit={handleSubmit} className="space-y-3 pt-2 animate-fade-in">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('result.selectCorrectLabel')}
            </label>
            <select
              value={correctedLabel}
              onChange={(e) => setCorrectedLabel(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800 text-slate-800 dark:text-slate-100"
            >
              {PLANT_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls.replace(/___/g, ' • ').replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Field Observations / Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Water-soaked spots on leaf undersides"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-parchment-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary text-xs py-2 gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            {isSubmitting ? 'Submitting...' : 'Submit Retraining Correction'}
          </button>
        </form>
      )}

      {isCorrect === true && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full btn-primary text-xs py-2 gap-1.5 mt-2"
        >
          <Check className="w-4 h-4" />
          {isSubmitting ? 'Logging...' : 'Confirm Model Accuracy'}
        </button>
      )}
    </div>
  );
};

export default FeedbackModal;
