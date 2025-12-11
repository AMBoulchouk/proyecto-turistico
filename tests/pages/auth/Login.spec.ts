import { mount } from '@vue/test-utils'
import Login from '../../../src/pages/Login.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../../src/store/auth'
import { vi } from 'vitest'

describe('Login.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('hace login correctamente', async () => {
    const store = useAuthStore()
    store.login = vi.fn()

    const wrapper = mount(Login)

    await wrapper.find('input[type="email"]').setValue('test@test.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('button').trigger('click')

    expect(store.login).toHaveBeenCalled()
  })
})
