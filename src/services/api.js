// src/services/api.js
import axios from 'axios';

// Konstanta untuk URL dasar API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-production-366f1.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Tambahkan token otomatis ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Pastikan baseURL tidak ditambahkan dua kali jika sudah diatur di instance
  // Jika path di `config.url` sudah dimulai dengan `/`, maka baseURL + path akan menjadi //api/...
  // Jadi pastikan path di setiap request di `api.get/post/put/delete` *tidak* diawali `/`
  // Contoh: `api.get('/letters')` -> salah, harus `api.get('letters')`
  // Tapi karena baseURL kita akhiri `/api`, maka `api.get('letters')` akan menjadi `.../api/letters`
  // Jika baseURL adalah `.../api`, maka `api.get('letters')` OK.
  // Kita asumsikan baseURL adalah `.../api` (seperti di konstanta), maka path tanpa `/` di awal benar.
  return config;
});

// Fungsi utilitas untuk membentuk URL download/file
export const downloadUrl = (path) => {
  // Jika path sudah berupa URL lengkap (http/https), kembalikan saja
  if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }

  // Ambil baseURL tanpa trailing slash untuk menghindari double slash
  // API_BASE_URL di atas diakhiri `/api`. Kita ingin mengganti `/api` dengan `/api/download-endpoint` atau `/api/static-files`
  // Jadi jika path seperti `/letters/123/download` atau `letters/123/download`, kita gabungkan ke `.../api` menjadi `.../api/letters/123/download`
  // Kita asumsikan API_BASE_URL adalah `https://backend-production-366f1.up.railway.app/api`
  // Maka downloadUrl('/letters/123/download') atau downloadUrl('letters/123/download') -> https://backend-production-366f1.up.railway.app/api/letters/123/download
  // Maka downloadUrl('/uploads/file.pdf') -> https://backend-production-366f1.up.railway.app/api/uploads/file.pdf

  // Jika path diawali dengan `/`, kita pastikan baseURL tidak diakhiri `/` sebelum digabung
  let baseUrlWithoutTrailingSlash = API_BASE_URL;
  if (baseUrlWithoutTrailingSlash.endsWith('/api')) {
    // Jika baseURL adalah ".../api", kita biarkan. Saat digabung dengan path, misalnya `letters/123/download`
    // Hasilnya adalah ".../api/letters/123/download" -> BENAR
    // Jika path diawali `/`, misalnya `/letters/123/download`
    // Hasilnya adalah ".../api/letters/123/download" karena join path menghandle double slash
    // Tapi lebih aman jika kita handle sendiri.
    baseUrlWithoutTrailingSlash = API_BASE_URL;
  }

  // Gabungkan URL
  // Hilangkan leading slash pada path jika ada
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  // Gunakan separator '/' untuk menggabungkan
  return `${baseUrlWithoutTrailingSlash}/${normalizedPath}`;
};

// Export instance api sebagai default
export default api;
