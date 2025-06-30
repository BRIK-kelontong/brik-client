<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/product';
import { useRoute } from 'vue-router';

const productStore = useProductStore();
const route = useRoute();

const productId = ref(parseInt(route.params.id as string));

onMounted(async () => {
  if (productId.value) {
    await productStore.fetchProductById(productId.value);
  }
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};
</script>

<template>
  <div class="product-detail-page bg-white p-4 sm:p-6 rounded-lg shadow-lg"> <p v-if="productStore.loading" class="text-center text-lg text-gray-600">Memuat detail produk...</p>
    <p v-else-if="productStore.error" class="text-center text-lg text-red-500">Error: {{ productStore.error }}</p>
    <p v-else-if="!productStore.currentProduct" class="text-center text-lg text-gray-600">Produk tidak ditemukan.</p>

    <div v-else class="flex flex-col md:flex-row gap-4 sm:gap-6"> <div class="md:w-1/2">
        <div class="w-full aspect-w-4 aspect-h-3"> <img
            :src="productStore.currentProduct.image || 'https://via.placeholder.com/400x300?text=No+Image'"
            :alt="productStore.currentProduct.name"
            class="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div class="md:w-1/2">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2">{{ productStore.currentProduct.name }}</h1>
        <p class="text-gray-600 text-base sm:text-lg mb-4">{{ productStore.currentProduct.categoryName }}</p>

        <p class="text-blue-700 font-semibold text-3xl sm:text-4xl mb-6">{{ formatPrice(productStore.currentProduct.price) }}</p>

        <h2 class="text-lg sm:text-xl font-semibold mb-2">Deskripsi Produk</h2>
        <p class="text-gray-800 text-sm sm:text-base mb-6">{{ productStore.currentProduct.description || 'Tidak ada deskripsi.' }}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-700 text-sm sm:text-base"> <div>
            <span class="font-semibold">SKU:</span> {{ productStore.currentProduct.sku }}
          </div>
          <div>
            <span class="font-semibold">Berat:</span> {{ productStore.currentProduct.weight }} gram
          </div>
          <div class="col-span-1 sm:col-span-2"> <span class="font-semibold">Dimensi:</span> {{ productStore.currentProduct.length }} x {{ productStore.currentProduct.width }} x {{ productStore.currentProduct.height }} cm
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Same aspect-ratio fallback as ProductCard if needed */
.aspect-w-4 {
  position: relative;
  width: 100%;
}
.aspect-w-4::before {
  content: '';
  display: block;
  padding-bottom: calc(3 / 4 * 100%);
}
.aspect-h-3 > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>