import { defineStore } from 'pinia'
import { createReservation, getReservations } from '../api/reservations.mock'
import type { Reservation, ReservationPayload } from '../types/reservations'
import { useRoomsStore } from './rooms'


export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    items: [] as Reservation[],
    loading: false,
  }),

  actions: {
    async fetchReservations() {
      this.loading = true
      this.items = await getReservations()
      this.loading = false
    },

    async addReservation(data: ReservationPayload) {
      const roomsStore = useRoomsStore()
      const room = roomsStore.items.find(r => r.id === data.roomId)

      const payload: ReservationPayload = {
        ...data,
        roomName: room?.number || ''
      }

      const saved = await createReservation(payload) 
      this.items.push(saved)                        
      
    },

    // Validación simple de solapamientos (mock)
   isRoomAvailable(roomId: number, start: string, end: string, ignoreId?: number): boolean {
      const s = new Date(start)
      const e = new Date(end)

      return !this.items.some(r => {
        if (ignoreId && r.id === ignoreId) return false
        if (r.roomId !== roomId) return false

        const rs = new Date(r.startDate)
        const re = new Date(r.endDate)

        const overlap = !(e < rs || s > re)
        return overlap
      })
    },

    updateReservation(id: number, data: ReservationPayload) {
      const index = this.items.findIndex(r => r.id === id)
      const roomsStore = useRoomsStore()
      const room = roomsStore.items.find(r => r.id === data.roomId)

      if (index === -1) return

      this.items[index] = {
        id,
        guestName: data.guestName,
        roomName: room?.number || ' ',
        roomId: data.roomId,
      
        startDate: data.startDate,
        endDate: data.endDate
      }
    },

    deleteReservation(id: number) {
     this.items = this.items.filter(r => r.id !== id)
    },
    getAvailableRooms(start: string, end: string, ignoreId?: number) {
      return useRoomsStore().items.filter(room =>
        this.isRoomAvailable(room.id, start, end, ignoreId)
      )
    }

  }
})
