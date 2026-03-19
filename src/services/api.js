import axios from 'axios';

// 🔴 HARDCODE URL BACKEND — JANGAN DIUBAH LAGI
const API = axios.create({
  baseURL: 'https://backend-production-366f1.up.railway.app/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
