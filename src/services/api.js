// src/services/api.js
import axios from 'axios';



// Baagian Paling Krusil yang perlu unutk diperhatikan yang mana baseURL nya 
// harus disesuaikan dengan URL backend Anda. 
// Jika backend Anda berjalan di localhost pada port 5000, 
// maka baseURL sudah benar. 
// Namun, jika Anda menggunakan URL yang berbeda 
// (misalnya, jika backend Anda di-deploy ke server), 
// pastikan untuk mengganti baseURL sesuai dengan URL backend Anda. 
// Contohnya:
const API = axios.create({
  baseURL: 'https://backend-production-366f1.up.railway.app/api',
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
