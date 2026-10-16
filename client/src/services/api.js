import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cropcare_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// --- Auth APIs ---
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me')
};

// --- Prediction APIs ---
export const predictApi = {
  predictSingle: (formData) => api.post('/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  predictBatch: (formData) => api.post('/predict/batch', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

// --- Prediction History & Sharing APIs ---
export const predictionApi = {
  getHistory: (params) => api.get('/predictions', { params }),
  getById: (id) => api.get(`/predictions/${id}`),
  delete: (id) => api.delete(`/predictions/${id}`),
  getShared: (token) => api.get(`/share/${token}`),
  getPdfUrl: (id) => `${API_BASE_URL}/predictions/${id}/report`
};

// --- Feedback APIs ---
export const feedbackApi = {
  submit: (data) => api.post('/feedback', data)
};

// --- Botanical Library APIs ---
export const libraryApi = {
  getCrops: () => api.get('/crops'),
  getDiseases: (params) => api.get('/diseases', { params }),
  getDiseaseById: (id) => api.get(`/diseases/${id}`)
};

// --- Admin APIs ---
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  createCrop: (data) => api.post('/admin/crops', data),
  updateCrop: (id, data) => api.put(`/admin/crops/${id}`, data),
  deleteCrop: (id) => api.delete(`/admin/crops/${id}`),
  createDisease: (data) => api.post('/admin/diseases', data),
  updateDisease: (id, data) => api.put(`/admin/diseases/${id}`, data),
  deleteDisease: (id) => api.delete(`/admin/diseases/${id}`),
  getFeedback: () => api.get('/admin/feedback'),
  getExportZipUrl: () => `${API_BASE_URL}/admin/feedback/export`
};

export default api;
