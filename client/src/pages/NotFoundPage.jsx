import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-5">
      <div className="w-16 h-16 rounded-3xl bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-300 flex items-center justify-center mx-auto shadow-inner">
        <Sprout className="w-8 h-8" />
      </div>
      <h1 className="font-serif font-black text-4xl text-slate-900 dark:text-white">
        404
      </h1>
      <h2 className="font-serif font-bold text-lg text-slate-800 dark:text-slate-200">
        Page Not Located in Orchard
      </h2>
      <p className="text-xs text-slate-500">
        The requested URL path does not correspond to an active plant diagnostic module.
      </p>
      <Link to="/" className="btn-primary text-xs py-2.5 px-5 inline-flex gap-2">
        <ArrowLeft className="w-4 h-4" />
        Return to Safety
      </Link>
    </div>
  );
};

export default NotFoundPage;
