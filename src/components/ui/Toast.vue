<script setup lang="ts">
import { useToastStore } from '../../store/ui'

const toast = useToastStore()

</script>

<template>
  <div v-if="toast.visible" class="toast">
    {{ toast.message }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--color-primary);
  padding: 12px 20px;
  color: white;
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  opacity: 0.95;
}
</style>
