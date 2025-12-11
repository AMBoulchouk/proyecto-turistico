// tests/stores/rooms.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRoomsStore } from '../../src/store/rooms'

// mock de la API
vi.mock('../../src/api/rooms.mock', () => {
  return {
    getRooms: vi.fn().mockResolvedValue([
      { id: 1, number: '101', type: 'Standard', price: 80 },
      { id: 2, number: '102', type: 'Deluxe', price: 120 }
    ]),
   createRoom: vi.fn((data) =>
      Promise.resolve({ id: 3, ...data })
    )
  }
})

describe('Rooms Store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('fetchRooms carga habitaciones', async () => {
    const store = useRoomsStore()

    await store.fetchRooms()

    expect(store.items).toHaveLength(2)
    expect(store.items[0].number).toBe('101')
  })

  it('addRoom agrega una habitación', async () => {
    const store = useRoomsStore()

    await store.fetchRooms()
    await store.addRoom({ number: '103', type: 'Suite', price: 200 })

    expect(store.items).toHaveLength(3)
    expect(store.items[2].number).toBe('103')
  })

  it('updateRoom actualiza una habitación', async () => {
    const store = useRoomsStore()
    await store.fetchRooms()

    store.updateRoom(1, { number: '201', type: 'Deluxe', price: 150 })

    const room = store.items.find(r => r.id === 1)
    expect(room?.number).toBe('201')
    expect(room?.price).toBe(150)
  })

  it('deleteRoom elimina una habitación', async () => {
    const store = useRoomsStore()
    await store.fetchRooms()

    expect(store.items.some(r => r.id === 1)).toBe(true)
    store.deleteRoom(1)
    expect(store.items.some(r => r.id === 1)).toBe(false)
  })
})
