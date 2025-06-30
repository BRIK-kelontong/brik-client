// src/types/index.ts
export interface Product {
  id: number;
  categoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description?: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
}