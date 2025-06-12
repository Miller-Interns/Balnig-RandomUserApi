<script setup lang="ts">
import type { User } from '@/types/UserType'
const props = defineProps<{ user: User }>()
const emit = defineEmits(['close'])
</script>

<template>
  <div class="list">
    <div class="details">
      <img :src="user.picture.large" alt="User Picture" />
      <p><strong>Name:</strong> {{ user.name.title }}. {{ user.name.first }} 
        {{ user.name.last }}</p>
      <p><strong>Gender:</strong> {{ user.gender.toLocaleUpperCase()}}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Address:</strong> {{ user.location.street.number }}, 
        {{ user.location.street.name }},
        {{ user.location.city }}, 
        {{ user.location.country }}</p>
      <button @click="emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.details {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 400px;
}
</style>
