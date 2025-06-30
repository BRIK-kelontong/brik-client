// src/stores/auth.ts
import { defineStore } from 'pinia';
import api from '../services/api';
import router from '../router'; // Import router untuk navigasi
import type { AuthResponse, User } from '@/types';

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('access_token') || null, // Ambil dari localStorage
    user: null, // Data user mungkin perlu diambil dari token atau endpoint profil
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post<AuthResponse>('/auth/login', { username, password });
        this.token = response.data.access_token;
        localStorage.setItem('access_token', this.token);
        // Anda bisa tambahkan logika untuk mengambil profil user jika backend menyediakan endpointnya
        await router.push({ name: 'ProductList' }); // Redirect ke halaman produk setelah login
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Login failed';
        console.error('Login error:', err);
      } finally {
        this.loading = false;
      }
    },
    async register(username: string, password: string) {
        this.loading = true;
        this.error = null;
        try {
          const response = await api.post<User>('/auth/register', { username, password });
          // Setelah register, bisa langsung login atau arahkan ke halaman login
          console.log('Registration successful:', response.data);
          alert('Registration successful! Please login.');
          await router.push({ name: 'Login' });
        } catch (err: any) {
          this.error = err.response?.data?.message || 'Registration failed';
          console.error('Register error:', err);
        } finally {
          this.loading = false;
        }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('access_token');
      router.push({ name: 'Login' }); // Redirect ke halaman login setelah logout
    },
  },
});