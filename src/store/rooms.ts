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
    }
  }
})
