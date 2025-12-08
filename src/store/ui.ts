import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    loading: false
  }),

  actions: {
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    }
  }
})

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    visible: false
  }),

  actions: {
    show(text: string, duration = 2500) {
      this.message = text
      this.visible = true

      setTimeout(() => {
        this.visible = false
      }, duration)
    }
  }
})
