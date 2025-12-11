import { mount } from '@vue/test-utils'
import RoomsList from '../../../src/pages/Rooms/RoomsList.vue'
import { useRoomsStore } from '../../../src/store/rooms'
import { setActivePinia, createPinia } from 'pinia'
import { vi } from 'vitest'

describe('RoomsList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('carga habitaciones al montar', async () => {
    const store = useRoomsStore()
    store.fetchRooms = vi.fn()

    mount(RoomsList)

    expect(store.fetchRooms).toHaveBeenCalled()
  })
})
