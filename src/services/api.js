import axios from 'axios';

// 🔴 HARDCODE URL BACKEND — JANGAN DIUBAH LAGI
const API_BASE_URL = 'https://backend-production-b08e.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
