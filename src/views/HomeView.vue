<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserFetch, useUserFilter } from '@/composables/useComposable'
import { useUserStore } from '@/stores/UserStore'
import UserCard from '@/components/user-card.vue'
import Pagination from '@/components/pagination.vue'
import UserDetails from '@/components/user-details.vue'
import { GenderFilter } from '@/enum/GenderEnum'
import type { User } from '@/types/UserType'

const store = useUserStore()
const { users, fetchRandomUsers, isLoading, error } = useUserFetch()
const { genders } = useUserFilter()
const gender = ref<GenderFilter>(store.genderFilter)
const selectedUser = ref<User | null>(null)

onMounted(async () => {
  const count = gender.value === GenderFilter.All ? 50 : 25
  await fetchRandomUsers(count, gender.value)
  store.setUsers(users.value)
})

function refreshList() {
  const count = gender.value === GenderFilter.All ? 50 : 25
  fetchRandomUsers(count, gender.value).then(() => {
    store.setUsers(users.value)
  })
}

function onFilterChange() {
  store.setGenderFilter(gender.value)
  const count = gender.value === GenderFilter.All ? 50 : 25
  fetchRandomUsers(count, gender.value).then(() => store.setUsers(users.value))
}
</script>

<template>
  <div class="page-center">
    <h1 class="title">Random Users</h1>

    <select v-model="gender" @change="onFilterChange">
      <option v-for="usersGender in genders" :key="usersGender" :value="usersGender">
        {{ usersGender }}
      </option>
    </select>

    <button @click="refreshList" :disabled="isLoading">Refresh</button>

    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>

    <div class="user-list">
      <user-card
        v-for="user in store.paginatedUsers"
        :key="user.login.uuid"
        :user="user"
        @click="selectedUser = user"
      />
    </div>

    <pagination
      :total-pages="store.totalPages"
      :current-page="store.currentPage"
      @change="store.setCurrentPage"
    />

    <user-details v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
  </div>
</template>

<style scoped>
.page-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  min-height: 100vh;
}
.title {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: black;
}
select {
  padding: 0.2rem;
  font-size: 1rem;
}
button {
  margin: 0.5rem 0;
  padding: 0.5rem 0.5rem;
  font-weight: bold;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.user-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 0.5rem;
  width: 100%;
  max-width: 1000px;
}
</style>
