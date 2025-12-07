import { defineStore } from 'pinia'
import { loginMock } from '../api/auth.mock'

interface User {
  email: string
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const user = await loginMock(email, password)
        this.user = user as User
        localStorage.setItem('auth', JSON.stringify(user))
      } catch (err) {
        throw err
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('auth')
    },

    loadFromStorage() {
      const data = localStorage.getItem('auth')
      if (data) {
        this.user = JSON.parse(data)
      }
    }
  }
})
