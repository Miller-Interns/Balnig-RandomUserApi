<script setup lang="ts">
import type { User } from '@/types/UserType'
const props = defineProps<{ user: User }>()
const emit = defineEmits(['click'])
</script>

<template>
  <div class="user-card" @click="emit('click')">
    <img :src="user.picture.thumbnail" alt="User Image" />
    <p>{{ user.name.first }} {{ user.name.last }}</p>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  gap: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  cursor: pointer;
}
</style>