// src/stores/product.ts
import { defineStore } from 'pinia';
import api from '../services/api';
import type { PaginatedProducts, Product } from '../types';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    currentProduct: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts(page: number = 1, limit: number = 10, search: string = '') {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get<PaginatedProducts>('/products', {
          params: { page, limit, search },
        });
        this.products = response.data.data;
        this.pagination = {
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
          totalPages: response.data.totalPages,
        };
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch products';
        console.error('Fetch products error:', err);
      } finally {
        this.loading = false;
      }
    },
    async fetchProductById(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get<Product>(`/products/${id}`);
        this.currentProduct = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch product details';
        console.error('Fetch product by ID error:', err);
      } finally {
        this.loading = false;
      }
    },
    async addProduct(
      productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
      router?: any
    ) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post<Product>('/products', productData);
        alert('Product added successfully!');
        if (router) {
          router.push({ name: 'ProductList' }); // Redirect after adding
        }
        return response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to add product';
        console.error('Add product error:', err);
        throw err; // Lempar error agar bisa ditangani di komponen
      } finally {
        this.loading = false;
      }
    },
    // Tambahkan aksi untuk update dan delete jika diperlukan di frontend
  },
});