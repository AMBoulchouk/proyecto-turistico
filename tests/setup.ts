import { afterEach, beforeAll, vi } from 'vitest'
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

beforeAll(() => {
  setActivePinia(createPinia())
})
config.global.mocks = {
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
  },
  $route: {
    path: '/',
    params: {},
    query: {},
  },
}

config.global.directives = {
  'only-letters': {
    beforeMount() {},
    mounted() {},
  },
  'only-numbers': {
    beforeMount() {},
    mounted() {},
  }
}

config.global.stubs = {
  CalendarAvailability: true,
  DateRangePicker: true,
}

if (!global.fetch) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  ) as any
}
vi.stubGlobal(
  'IntersectionObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
)
afterEach(() => {
  vi.clearAllMocks()
})