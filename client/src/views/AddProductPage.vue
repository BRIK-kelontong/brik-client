<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '../stores/product';
import { Product } from '../types';

const productStore = useProductStore();

const newProduct = ref<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
  categoryId: 1,
  categoryName: '',
  sku: '',
  name: '',
  description: '',
  weight: 0,
  width: 0,
  length: 0,
  height: 0,
  image: '',
  price: 0,
});

const handleSubmit = async () => {
  try {
    await productStore.addProduct(newProduct.value);
  } catch (error) {
    console.error('Failed to add product from component:', error);
  }
};
</script>

<template>
  <div class="add-product-page bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto"> <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center">Tambah Produk Baru</h1>

    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"> <div>
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nama Produk:</label>
          <input type="text" id="name" v-model="newProduct.name" class="form-input" required />
        </div>
        <div>
          <label for="sku" class="block text-gray-700 text-sm font-bold mb-2">SKU:</label>
          <input type="text" id="sku" v-model="newProduct.sku" class="form-input" required />
        </div>
        <div>
          <label for="categoryId" class="block text-gray-700 text-sm font-bold mb-2">ID Kategori:</label>
          <input type="number" id="categoryId" v-model.number="newProduct.categoryId" class="form-input" required min="1" />
        </div>
        <div>
          <label for="categoryName" class="block text-gray-700 text-sm font-bold mb-2">Nama Kategori:</label>
          <input type="text" id="categoryName" v-model="newProduct.categoryName" class="form-input" required />
        </div>
        <div>
          <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Harga (IDR):</label>
          <input type="number" id="price" v-model.number="newProduct.price" class="form-input" required min="0" />
        </div>
        <div>
          <label for="weight" class="block text-gray-700 text-sm font-bold mb-2">Berat (gram):</label>
          <input type="number" id="weight" v-model.number="newProduct.weight" class="form-input" required min="0" />
        </div>
        <div>
          <label for="width" class="block text-gray-700 text-sm font-bold mb-2">Lebar (cm):</label>
          <input type="number" id="width" v-model.number="newProduct.width" class="form-input" required min="0" />
        </div>
        <div>
          <label for="length" class="block text-gray-700 text-sm font-bold mb-2">Panjang (cm):</label>
          <input type="number" id="length" v-model.number="newProduct.length" class="form-input" required min="0" />
        </div>
        <div>
          <label for="height" class="block text-gray-700 text-sm font-bold mb-2">Tinggi (cm):</label>
          <input type="number" id="height" v-model.number="newProduct.height" class="form-input" required min="0" />
        </div>
        <div class="col-span-1 sm:col-span-2"> <label for="image" class="block text-gray-700 text-sm font-bold mb-2">URL Gambar (Opsional):</label>
          <input type="url" id="image" v-model="newProduct.image" class="form-input" />
        </div>
        <div class="col-span-1 sm:col-span-2">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Deskripsi (Opsional):</label>
          <textarea id="description" v-model="newProduct.description" rows="4" class="form-input"></textarea>
        </div>
      </div>

      <button
        type="submit"
        :disabled="productStore.loading"
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {{ productStore.loading ? 'Menambah Produk...' : 'Tambah Produk' }}
      </button>
      <p v-if="productStore.error" class="text-red-500 text-sm mt-4 text-center">{{ productStore.error }}</p>
    </form>
  </div>
</template>

<style scoped>
/* Basic styling for form inputs */
.form-input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline;
}
</style>