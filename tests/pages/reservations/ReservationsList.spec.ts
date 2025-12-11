import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ReservationsList from '../../../src/pages/Reservations/ReservationsList.vue'
import { useReservationsStore } from '../../../src/store/reservations'
import { useRoomsStore } from '../../../src/store/rooms'

describe('ReservationsList', () => {
  let pinia: ReturnType<typeof createPinia>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('carga reservas al iniciar', async () => {
    const reservationsStore = useReservationsStore()
    const roomsStore = useRoomsStore()

    const fetchReservationsSpy = vi
      .spyOn(reservationsStore, 'fetchReservations')
      .mockResolvedValue()

    vi.spyOn(roomsStore, 'fetchRooms').mockResolvedValue()

    mount(ReservationsList, {
      global: {
        plugins: [pinia],
      }
    })

    // Esperamos al siguiente tick porque fetchRooms/fetchReservations
    // se ejecutan en onMounted()
    await Promise.resolve()

    expect(fetchReservationsSpy).toHaveBeenCalled()
  })
})
