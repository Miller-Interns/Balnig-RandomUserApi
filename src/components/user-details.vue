<script setup lang="ts">
import type { User } from '@/types/UserType'
const props = defineProps<{ user: User }>()
const emit = defineEmits(['close'])
</script>

<template>
  <div class="list">
    <div class="details">
      <img :src="user.picture.large" alt="User Picture" />
      <h3>{{ user.name.first }} {{ user.name.last }}</h3>
      <p>Gender: {{ user.gender.toLocaleUpperCase() }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>
        Address: {{ user.location.street.number }}, {{ user.location.street.name }},
        {{ user.location.city }}, {{ user.location.country }}
      </p>
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
  text-align: left;
  width: 350px;
}
.details img {
  display: flex;
  align-items: center;
}
</style>
