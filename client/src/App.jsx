import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import PredictPage from './pages/PredictPage';
import ResultPage from './pages/ResultPage';
import BatchResultPage from './pages/BatchResultPage';
import HistoryPage from './pages/HistoryPage';
import DiseaseLibraryPage from './pages/DiseaseLibraryPage';
import DiseaseDetailPage from './pages/DiseaseDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AboutPage from './pages/AboutPage';
import FieldDashboardPage from './pages/FieldDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-parchment-50 dark:bg-parchment-900 transition-colors">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/share/:id" element={<ResultPage />} />
          <Route path="/batch/:batchId" element={<BatchResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/library" element={<DiseaseLibraryPage />} />
          <Route path="/library/:id" element={<DiseaseDetailPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/dashboard" element={<FieldDashboardPage />} />
          <Route path="/intelligence" element={<FieldDashboardPage />} />
          <Route path="/field" element={<FieldDashboardPage />} />
          <Route path="/about" element={<FieldDashboardPage />} />
          <Route path="/project" element={<FieldDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
