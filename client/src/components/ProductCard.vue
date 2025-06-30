<script setup lang="ts">
import { defineProps } from 'vue';
import { Product } from '../types';

interface Props {
  product: Product;
}

defineProps<Props>();

// Helper untuk format harga
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};
</script>

<template>
  <router-link :to="`/products/${product.id}`" class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div class="w-full aspect-w-4 aspect-h-3">
        <img :src="product.image || 'https://via.placeholder.com/200x150?text=No+Image'" :alt="product.name" class="w-full h-full object-cover">
    </div>
    <div class="p-3 sm:p-4">
      <h3 class="font-bold text-base sm:text-lg mb-1 truncate">{{ product.name }}</h3>
      <p class="text-gray-600 text-xs sm:text-sm mb-2">{{ product.categoryName }}</p>
      <p class="text-blue-700 font-semibold text-lg sm:text-xl">{{ formatPrice(product.price) }}</p>
    </div>
  </router-link>
</template>

<style scoped>
/* Untuk support aspect-ratio pada Tailwind < v3.3, Anda mungkin perlu plugin */
/* Jika Anda menggunakan Tailwind CSS v3.3+, utility class `aspect-w-* aspect-h-*` sudah tersedia secara default. */
/* Jika tidak, tambahkan plugin `@tailwindcss/aspect-ratio` ke tailwind.config.js dan install `npm install -D @tailwindcss/aspect-ratio` */
/* atau gunakan cara manual: */
.aspect-w-4 {
  position: relative;
  width: 100%;
}
.aspect-w-4::before {
  content: '';
  display: block;
  padding-bottom: calc(3 / 4 * 100%); /* for 4/3 ratio */
}
.aspect-h-3 > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>