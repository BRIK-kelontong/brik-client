<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  currentPage: number;
  totalPages: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:currentPage']);

const goToPage = (page: number) => {
  if (page > 0 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};
</script>

<template>
  <div class="flex justify-center items-center space-x-2 my-8">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
    >
      Previous
    </button>
    <span class="text-lg font-semibold">{{ currentPage }} / {{ totalPages }}</span>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
    >
      Next
    </button>
  </div>
</template>