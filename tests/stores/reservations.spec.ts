// tests/stores/reservations.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useReservationsStore } from '../../src/store/reservations'
import { useRoomsStore } from '../../src/store/rooms'
import * as reservationsApi from '../../src/api/reservations.mock'

// mock API de reservations
vi.mock('../../src/api/reservations.mock', () => {
  return {
    getReservations: vi.fn().mockResolvedValue([
      {
        id: 1,
        roomId: 1,
        roomName: '101',
        guestName: 'Carlos',
        startDate: '2025-02-01',
        endDate: '2025-02-05'
      }
    ]),
    createReservation: vi.fn(async (data) => ({
      id: 2,
      ...data
    }))
  }
})

// mock simple de rooms para getAvailableRooms
vi.mock('../../src/store/rooms', () => ({
  useRoomsStore: () => ({
    items: [
      { id: 1, number: '101', type: 'Standard', price: 80 },
      { id: 2, number: '102', type: 'Deluxe', price: 120 }
    ]
  })
}))

describe('Reservations Store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('fetchReservations carga reservas iniciales', async () => {
    const store = useReservationsStore()

    await store.fetchReservations()

    expect(store.items).toHaveLength(1)
    expect(store.items[0].guestName).toBe('Carlos')
  })

  it('addReservation agrega una reserva', async () => {
    const store = useReservationsStore()

    await store.fetchReservations()

    await store.addReservation({
      roomId: 2,
      roomName: '102',
      guestName: 'Ana',
      startDate: '2025-03-01',
      endDate: '2025-03-05'
    })

    expect(store.items).toHaveLength(2)
    expect(store.items[1].guestName).toBe('Ana')
  })

  it('isRoomAvailable detecta solapamientos', async () => {
    const store = useReservationsStore()
    await store.fetchReservations()

    const disponible = store.isRoomAvailable(
      1,
      '2025-02-02',
      '2025-02-03'
    )

    const libre = store.isRoomAvailable(
      1,
      '2025-02-10',
      '2025-02-12'
    )

    expect(disponible).toBe(false)
    expect(libre).toBe(true)
  })

  it('getAvailableRooms filtra correctamente', async () => {
    const store = useReservationsStore()
    await store.fetchReservations()

    const roomsStore = useRoomsStore()
    // mock local, por si acaso
    roomsStore.items = [
      { id: 1, number: '101', type: 'Standard', price: 80 },
      { id: 2, number: '102', type: 'Deluxe', price: 120 }
    ] as any

    const rooms = store.getAvailableRooms(
      '2025-02-02',
      '2025-02-03'
    )

    expect(rooms.map(r => r.id)).toEqual([2])
  })

  it('updateReservation actualiza datos', async () => {
    const store = useReservationsStore()
    await store.fetchReservations()

    store.updateReservation(1, {
      roomId: 1,
      roomName: '101',
      guestName: 'Pepe',
      startDate: '2025-02-01',
      endDate: '2025-02-03'
    })

    expect(store.items[0].guestName).toBe('Pepe')
    expect(store.items[0].endDate).toBe('2025-02-03')
  })

  it('deleteReservation elimina reserva', async () => {
  const store = useReservationsStore()
  await store.fetchReservations()

  // Creamos una segunda reserva para no depender solo del mock
  store.addReservation({
    roomId: 2,
    roomName: '102',
    guestName: 'Ana',
    startDate: '2025-02-10',
    endDate: '2025-02-12'
  })

  // Eliminamos la reserva con id 1
  store.deleteReservation(1)

  // ✅ La reserva 1 ya no debe existir
  expect(store.items.some(r => r.id === 1)).toBe(false)
})
})
