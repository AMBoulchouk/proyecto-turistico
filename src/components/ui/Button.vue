<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

const classes = computed(() => `
  btn
  btn--${props.variant}
  btn--${props.size}
`)
</script>

<template>
  <button :class="classes" :disabled="props.disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
  color: white;
}

/* Variantes */
.btn--primary {
  background: var(--color-primary);
}

.btn--secondary {
  background: var(--color-secondary);
}

.btn--danger {
  background: var(--color-danger);
}

/* Tamaños */
.btn--sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.btn--md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
}

.btn--lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

/* Estado disabled */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
