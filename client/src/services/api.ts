// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token JWT ke setiap request (jika ada)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error respons (misalnya token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized: misalnya, redirect ke halaman login
      console.error('Unauthorized, redirecting to login...');
      // Contoh: window.location.href = '/login';
      localStorage.removeItem('access_token'); // Hapus token kadaluarsa
    }
    return Promise.reject(error);
  }
);

export default api;