// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-production-366f1.up.railway.app',
});

// Tambahkan token otomatis ke setiap request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
