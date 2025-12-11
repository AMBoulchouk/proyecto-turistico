// tests/stores/ui.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUiStore, useToastStore } from '../../src/store/ui'

describe('UI Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('startLoading / stopLoading manejan estado loading', () => {
    const ui = useUiStore()

    expect(ui.loading).toBe(false)
    ui.startLoading()
    expect(ui.loading).toBe(true)
    ui.stopLoading()
    expect(ui.loading).toBe(false)
  })

  it('toast.show muestra mensaje y luego lo oculta', () => {
    const toast = useToastStore()

    toast.show('Hola mundo')

    expect(toast.visible).toBe(true)
    expect(toast.message).toBe('Hola mundo')

    vi.runAllTimers()

    expect(toast.visible).toBe(false)
  })
})
