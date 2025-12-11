import { mount } from '@vue/test-utils'
import Table from '../../src/components/ui/Table.vue'

describe('Table.vue', () => {
  it('renderiza columnas', () => {
    const wrapper = mount(Table, {
      props: {
        columns: [{ key: 'nombre', label: 'Nombre' }],
        rows: [{ id: 1, nombre: 'Juan' }]
      }
    })

    expect(wrapper.text()).toContain('Nombre')
    expect(wrapper.text()).toContain('Juan')
  })
})
