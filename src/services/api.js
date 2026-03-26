// src/services/api.js
import axios from 'axios';

// 🔴 HARDCODE URL BACKEND — JANGAN DIUBAH LAGI
const API_BASE_URL = 'https://backend-production-366f1.up.railway.app/api'; // Hilangkan spasi di akhir!

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  // ✅ Hanya tambahkan Authorization jika baseURL adalah API_BASE_URL
  // Ini melindungi dari penggunaan instance 'api' secara tidak sengaja untuk file statis
  if (config.baseURL === API_BASE_URL) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;