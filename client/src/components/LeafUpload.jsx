import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../context/ToastContext';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const LeafUpload = ({ isBatch = false, onFilesSelected, selectedFiles = [], onClear }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const validateAndAddFiles = (fileList) => {
    const valid = [];
    const incoming = Array.from(fileList);

    if (isBatch && selectedFiles.length + incoming.length > 5) {
      addToast('Maximum 5 images allowed for batch screening.', 'error');
      return;
    }

    if (!isBatch && incoming.length > 1) {
      incoming.splice(1);
    }

    for (const file of incoming) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        addToast(`${file.name}: Invalid file format. Only JPG, PNG, and WebP are supported.`, 'error');
        continue;
      }
      if (file.size === 0) {
        addToast(`${file.name}: File is empty or corrupt (0 bytes).`, 'error');
        continue;
      }
      if (file.size > MAX_SIZE_BYTES) {
        addToast(`${file.name}: File exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`, 'error');
        continue;
      }

      // Create preview object URL
      const previewUrl = URL.createObjectURL(file);
      valid.push({
        file,
        previewUrl,
        name: file.name,
        sizeMb: (file.size / (1024 * 1024)).toFixed(2)
      });
    }

    if (valid.length > 0) {
      if (isBatch) {
        onFilesSelected([...selectedFiles, ...valid]);
      } else {
        onFilesSelected(valid);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    onFilesSelected(updated);
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={isBatch}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) validateAndAddFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {/* Direct Camera Capture Input for mobile devices */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) validateAndAddFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {/* Drop Zone */}
      {selectedFiles.length === 0 ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? 'border-agri-500 bg-agri-50/80 dark:bg-agri-950/40 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-parchment-800/40 hover:border-agri-600 hover:bg-agri-50/30'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-agri-100 dark:bg-agri-900/60 text-agri-700 dark:text-agri-300 flex items-center justify-center shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
                {t('predict.dragDrop')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('predict.supportedFormats')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary text-xs py-2 px-4"
              >
                <ImageIcon className="w-4 h-4" />
                {t('predict.browseFiles')}
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="btn-secondary text-xs py-2 px-4"
              >
                <Camera className="w-4 h-4 text-agri-700 dark:text-agri-300" />
                {t('predict.cameraCapture')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Preview Strip / Cards */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('predict.selectImages')} ({selectedFiles.length}{isBatch ? '/5' : ''})
            </span>
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-red-600 dark:text-red-400 hover:underline font-semibold"
            >
              Clear All
            </button>
          </div>

          <div className={`grid gap-4 ${isBatch ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5' : 'grid-cols-1 max-w-md mx-auto'}`}>
            {selectedFiles.map((item, index) => (
              <div
                key={index}
                className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-parchment-800 shadow-sm"
              >
                <img
                  src={item.previewUrl}
                  alt={`Selected leaf sample ${index + 1}`}
                  className="w-full h-44 object-cover object-center"
                />

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow-sm"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="p-2.5 text-[11px] text-slate-600 dark:text-slate-300 truncate">
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="text-slate-400">{item.sizeMb} MB</p>
                </div>
              </div>
            ))}

            {isBatch && selectedFiles.length < 5 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-44 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-agri-600 hover:bg-agri-50/50 text-slate-500 hover:text-agri-700 transition-all text-xs font-semibold"
              >
                <Upload className="w-5 h-5" />
                Add More
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafUpload;
