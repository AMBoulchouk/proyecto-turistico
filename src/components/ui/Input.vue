<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  error?: string
  type?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false
})

const emit = defineEmits(['update:modelValue'])
defineOptions({ inheritAttrs: false })
</script>

<template>
  <label class="input-wrapper">
    <span v-if="label" class="label">{{ label }}</span>

    <input
      :value="modelValue"
       v-bind="$attrs"
      :type="type"
      :disabled="disabled"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <small v-if="error" class="error">{{ error }}</small>
  </label>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* Estilo del input usando design tokens */
input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
}

/* Input disabled */
input:disabled {
  background: var(--color-disabled); /* agregado al sistema de diseño */
  cursor: not-allowed;
}

/* Error usando design tokens */
.error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}
</style>
