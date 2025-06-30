<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleRegister = async () => {
  await authStore.register(username.value, password.value);
};
</script>

<template>
  <div class=" class="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-8"> <div class="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md"> <h2 class="text-xl sm:text-2xl font-bold mb-6 text-center"">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Daftar Akun Baru</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            :disabled="authStore.loading"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {{ authStore.loading ? 'Mendaftar...' : 'Daftar' }}
          </button>
        </div>
        <p v-if="authStore.error" class="text-red-500 text-sm mt-4 text-center">{{ authStore.error }}</p>
      </form>
      <p class="text-center text-gray-600 text-sm mt-6">
        Sudah punya akun? <RouterLink to="/login" class="text-blue-500 hover:underline">Login di sini</RouterLink>
      </p>
    </div>
  </div>
</template>