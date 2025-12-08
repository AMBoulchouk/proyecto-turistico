import { defineStore } from 'pinia'
import type { Room } from '../types/room'
import { getRooms, createRoom } from '../api/rooms.mock'

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    items: [] as Room[],
    loading: false
  }),

  actions: {
    async fetchRooms() {
      this.loading = true
      this.items = await getRooms()
      this.loading = false
    },

    async addRoom(data: Omit<Room, 'id'>) {
      const saved = await createRoom(data)
      this.items.push(saved)
    },
     updateRoom(id: number, data: Omit<Room, 'id'>) {
      const index = this.items.findIndex(r => r.id === id)
      if (index === -1) return

      const updated = { id, ...data }
      this.items[index] = updated
    },
     deleteRoom(id: number) {
      this.items = this.items.filter(r => r.id !== id)
    }

  }
})
