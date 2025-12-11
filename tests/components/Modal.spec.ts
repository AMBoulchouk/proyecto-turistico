import { mount } from '@vue/test-utils'
import Modal from '../../src/components/ui/Modal.vue'

describe('Modal.vue', () => {
  it('muestra contenido cuando open=true', () => {
    const wrapper = mount(Modal, {
      props: { open: true, title: 'Modal Test' }
    })

    expect(wrapper.text()).toContain('Modal Test')
  })

  it('emite close al hacer click en X', async () => {
    const wrapper = mount(Modal, {
      props: { open: true }
    })

    wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
