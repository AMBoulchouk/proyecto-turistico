import { mount } from '@vue/test-utils'
import ReservationForm from '../../../src/pages/Reservations/ReservationForm.vue'
import { setActivePinia, createPinia } from 'pinia'

describe('ReservationForm.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('valida nombre del huésped', async () => {
    const wrapper = mount(ReservationForm)

    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain('obligatorio')
  })
})
