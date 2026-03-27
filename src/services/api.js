import axios from 'axios';

// ✅ GUNAKAN FULL URL DENGAN PROTOCOL
const API_BASE_URL = 'https://backend-production-b08e.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL, // Gunakan URL lengkap
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;