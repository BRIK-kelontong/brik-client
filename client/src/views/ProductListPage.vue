<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useProductStore } from '../stores/product';
import ProductCard from '../components/ProductCard.vue';
import Pagination from '../components/Pagination.vue';
import { useRoute, useRouter } from 'vue-router';

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

const currentPage = ref(parseInt(route.query.page as string) || 1);
const searchQuery = ref((route.query.search as string) || '');
const limitPerPage = 12; // Tetap 12, kita akan atur kolom grid-nya

const fetchProducts = async () => {
  await productStore.fetchProducts(currentPage.value, limitPerPage, searchQuery.value);
};

// Watch untuk perubahan query params di URL
watch(
  () => route.query,
  (newQuery) => {
    currentPage.value = parseInt(newQuery.page as string) || 1;
    searchQuery.value = (newQuery.search as string) || '';
    fetchProducts();
  },
  { deep: true, immediate: true }
);


watch(currentPage, (newPage) => {
  router.push({ query: { ...route.query, page: newPage, search: searchQuery.value } });
});

const handleSearch = () => {
  currentPage.value = 1; // Reset halaman ke 1 saat pencarian baru
  router.push({ query: { ...route.query, page: 1, search: searchQuery.value } });
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="product-list-page p-4"> <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center">Daftar Produk Kami</h1>

    <div class="mb-6 max-w-lg mx-auto"> <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        placeholder="Cari produk..."
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
      />
      <button @click="handleSearch" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Cari
      </button>
    </div>

    <p v-if="productStore.loading" class="text-center text-lg text-gray-600">Memuat produk...</p>
    <p v-else-if="productStore.error" class="text-center text-lg text-red-500">Error: {{ productStore.error }}. Pastikan backend berjalan dan database telah di-seed.</p>
    <p v-else-if="productStore.products.length === 0" class="text-center text-lg text-gray-600">Tidak ada produk ditemukan.</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
    </div>

    <Pagination
      v-if="productStore.pagination.totalPages > 1"
      :current-page="productStore.pagination.page"
      :total-pages="productStore.pagination.totalPages"
      @update:currentPage="currentPage = $event"
    />
  </div>
</template>