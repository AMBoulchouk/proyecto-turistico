import { mount } from '@vue/test-utils'
import RoomForm from '../../../src/pages/Rooms/RoomForm.vue'

describe('RoomForm.vue', () => {
  it('emite submit cuando el formulario es válido', async () => {
    const wrapper = mount(RoomForm)

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('101')    
    await wrapper.find('select').setValue('Standard')  
    await inputs[1].setValue('120')      

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})
