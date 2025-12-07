import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { email: string }
  }),

  actions: {
    login(email: string) {
      this.user = { email }
    },
    logout() {
      this.user = null
    }
  }
})
