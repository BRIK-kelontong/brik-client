<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
</script>

<template>
  <nav class="bg-blue-600 p-4 text-white shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-bold">Toko Klontong Online</RouterLink>
      <div class="flex items-center space-x-4">
        <RouterLink to="/" class="hover:underline">Produk</RouterLink>
        <RouterLink v-if="authStore.isAuthenticated" to="/products/add" class="hover:underline">Tambah Produk</RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/login" class="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100">Login</RouterLink>
        <button v-if="authStore.isAuthenticated" @click="authStore.logout()" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Logout</button>
      </div>
    </div>
  </nav>
</template>