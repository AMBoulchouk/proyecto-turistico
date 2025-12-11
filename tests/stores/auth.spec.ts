import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../src/store/auth'

vi.mock('../../src/api/auth.mock', () => ({
  loginMock: vi.fn((email: string) =>
    Promise.resolve({
      email,
      token: 'FAKE_TOKEN'
    })
  )
}))

vi.stubGlobal('localStorage', {
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn()
})

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

describe('Auth Store', () => {
  it('login guarda usuario y persiste en localStorage', async () => {
    const store = useAuthStore()

    await store.login('test@test.com', '123456')

    expect(store.user).not.toBeNull()
    expect(store.user?.email).toBe('test@test.com')
    expect(store.user?.token).toBe('FAKE_TOKEN')

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'auth',
      JSON.stringify({
        email: 'test@test.com',
        token: 'FAKE_TOKEN'
      })
    )
  })
})
