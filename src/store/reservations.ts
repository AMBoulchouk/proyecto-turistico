import { defineStore } from 'pinia'
import { getReservations, createReservation } from '../api/reservations.mock'
import type { Reservation, ReservationPayload } from '../types/reservations'


export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    items: [] as Reservation[],
    loading: false
  }),

  actions: {
    async fetchReservations() {
      this.loading = true
      this.items = await getReservations()
      this.loading = false
    },

    addReservation(data: ReservationPayload) {
    const newReservation: Reservation = {
        id: Date.now(),
        guestName: data.guestName,
        roomId: data.roomId,
        startDate: data.startDate,
        endDate: data.endDate
    }

    this.items.push(newReservation)
    return newReservation
},

    // Validación simple de solapamientos (mock)
   isRoomAvailable(roomId: number, start: string, end: string, ignoreId?: number) {
  return !this.items.some(r => {
    if (ignoreId && r.id === ignoreId) return false

    return (
      r.roomId === roomId &&
      !(end < r.startDate || start > r.endDate)
    )
  })
},

    updateReservation(id: number, data: ReservationPayload) {
  const index = this.items.findIndex(r => r.id === id)
  if (index === -1) return

  this.items[index] = {
    id,
    guestName: data.guestName,
    roomId: data.roomId,
    startDate: data.startDate,
    endDate: data.endDate
  }
},

    deleteReservation(id: number) {
     this.items = this.items.filter(r => r.id !== id)
    }

  }
})
