import { ref } from 'vue'
import type { User } from '@/types/UserType'
import { GenderFilter } from '@/enum/GenderEnum'

export function useUserFetch() {
  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRandomUsers(count = 50, gender: GenderFilter = GenderFilter.All) {
    isLoading.value = true
    error.value = null

    try {
      let url = `https://randomuser.me/api/?results=${count}`
      if (gender !== GenderFilter.All) {
        url += `&gender=${gender.toLowerCase()}`
      }
      const response = await fetch(url)
      const data = await response.json()
      users.value = data.results
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch users'
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    isLoading,
    error,
    fetchRandomUsers,
  }
}

export function useUserFilter() {
  const genders = [GenderFilter.All, GenderFilter.Male, GenderFilter.Female]
  return { genders }
}