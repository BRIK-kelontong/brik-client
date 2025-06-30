<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-4 sm:px-6 lg:px-8"> <router-view />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center text-sm">
      &copy; 2025 Toko Klontong Online. All rights reserved.
    </footer>
  </div>
</template>