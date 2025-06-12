<script setup lang="ts">
const props = defineProps<{ totalPages: number; currentPage: number }>()
const emit = defineEmits(['change'])
</script>

<template>
  <div class="pagination">
    <button :disabled="currentPage <= 1" @click="emit('change', currentPage - 1)">
      Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button :disabled="currentPage >= totalPages" @click="emit('change', 
    currentPage + 1)">Next</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
</style>