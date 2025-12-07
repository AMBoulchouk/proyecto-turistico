<script setup lang="ts">
interface Option {
  label: string
  value: string
}

interface Props {
  modelValue: string
  options: Option[]
  label?: string
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="select-wrapper">
    <span v-if="label" class="label">{{ label }}</span>

    <select
      :value="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="o in options"
        :key="o.value"
        :value="o.value"
      >
        {{ o.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* Estilo del select usando design tokens */
select {
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-secondary);
  background: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-base);
  cursor: pointer;
}

/* Estado disabled */
select:disabled {
  background: var(--color-disabled);
  cursor: not-allowed;
}
</style>
