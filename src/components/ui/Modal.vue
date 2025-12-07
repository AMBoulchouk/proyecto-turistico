<script setup lang="ts">
interface Props {
  open: boolean
  title?: string
}

defineProps<Props>()
const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="open" class="overlay">
    <div class="modal">
      <header class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
        <button class="close-btn" @click="emit('close')">✕</button>
      </header>

      <section class="modal-content">
        <slot />
      </section>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: var(--color-background);
  padding: var(--spacing-lg);
  width: var(--modal-width);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.modal-title {
  font-size: var(--font-size-lg);
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);
  color: var(--color-secondary);
  transition: 0.2s;
}

.close-btn:hover {
  color: var(--color-primary);
}

.modal-content {
  font-size: var(--font-size-base);
}
</style>
