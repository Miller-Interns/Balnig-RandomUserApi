import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/UserType'
import { GenderFilter } from '@/enum/GenderEnum'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>(JSON.parse(localStorage.getItem('users') || '[]'))
  const genderFilter = ref<GenderFilter>(
    (localStorage.getItem('genderFilter') as GenderFilter) || GenderFilter.All,
  )
  const currentPage = ref<number>(1)
  const usersPerPage = ref<number>(10)

  const filteredUsers = computed(() => {
    if (genderFilter.value === GenderFilter.All) return users.value
    return users.value.filter((user) => user.gender === genderFilter.value.toLowerCase())
  })

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * usersPerPage.value
    return filteredUsers.value.slice(start, start + usersPerPage.value)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / usersPerPage.value) || 1
  })

  function setUsers(newUsers: User[]) {
    users.value = newUsers
    localStorage.setItem('users', JSON.stringify(newUsers))
  }

  function setGenderFilter(gender: GenderFilter) {
    genderFilter.value = gender
    currentPage.value = 1
    localStorage.setItem('genderFilter', gender)
  }

  function setCurrentPage(page: number) {
    currentPage.value = page
  }

  return {
    users,
    genderFilter,
    currentPage,
    usersPerPage,
    filteredUsers,
    paginatedUsers,
    totalPages,
    setUsers,
    setGenderFilter,
    setCurrentPage,
  }
})
