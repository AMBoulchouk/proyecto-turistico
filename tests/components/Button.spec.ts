import { mount } from '@vue/test-utils'
import Button from '../../src/components/ui/Button.vue'

describe('Button.vue', () => {
  it('renderiza el texto correctamente', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Enviar' }
    })
    expect(wrapper.text()).toBe('Enviar')
  })

  it('emite click', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
