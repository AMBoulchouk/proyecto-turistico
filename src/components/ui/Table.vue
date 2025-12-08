<script setup lang="ts">
interface Column {
  key: string
  label: string
}

interface Props {
  columns: Column[]
  rows: Record<string, any>[]
}

defineProps<Props>()
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        <th v-if="$slots.actions">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="col in columns" :key="col.key">
          {{ row[col.key] }}
        </td>
             <td v-if="$slots.actions">
          <slot name="actions" :row="row" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-base);
}

/* Encabezados */
th {
  text-align: left;
  padding: var(--spacing-sm);
  background: var(--color-primary);
  color: var(--color-text-inverted);
  font-weight: 600;
}

/* Celdas */
td {
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--color-secondary);
  color: var(--color-text);
}

/* Hover rows */
tbody tr:hover {
  background: var(--color-primary-dark);
  color: var(--color-text-inverted);
  cursor: pointer;
  transition: 0.15s ease;
}
</style>
