import { mount } from '@vue/test-utils'
import Input from '../../src/components/ui/Input.vue'

describe('Input.vue', () => {
  it('usa v-model correctamente', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' }
    })

    const input = wrapper.find('input')
    await input.setValue('Hola')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Hola'])
  })
})
