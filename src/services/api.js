import axios from 'axios';

// ✅ Gunakan environment variable, fallback ke URL Railway
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-production-366f1.up.railway.app/api';

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