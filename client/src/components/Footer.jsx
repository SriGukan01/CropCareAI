import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-agri-950 text-slate-300 pt-16 pb-12 border-t border-agri-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-12 border-b border-agri-900/80">
          {/* Brand Column */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-agri-700 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-agri-200" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg text-white">
                  CropCare
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-agri-900 text-agri-300 border border-agri-800">
                  AI
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering farmers and agronomists with explainable MobileNetV2 deep learning classification and sustainable disease prevention strategies.
            </p>
            <div className="flex items-center gap-2 text-xs text-agri-400">
              <ShieldCheck className="w-4 h-4 text-agri-400" />
              <span>PlantVillage 38-Class Botanical Benchmark</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4 tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/predict" className="hover:text-agri-400 transition-colors">
                  Predict Disease
                </Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-agri-400 transition-colors">
                  Disease Library
                </Link>
              </li>
              <li>
                <Link to="/intelligence" className="hover:text-agri-400 transition-colors">
                  Field Intelligence
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-agri-400 transition-colors">
                  Prediction History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left text-slate-500">
            &copy; 2026 CropCare AI Phytopathology Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Built with precision for agricultural sustainability</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
