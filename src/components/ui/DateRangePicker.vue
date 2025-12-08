<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from './Input.vue'

interface Props {
  start: string
  end: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:start', 'update:end'])

const startLocal = ref(props.start)
const endLocal = ref(props.end)

watch(() => props.start, v => startLocal.value = v)
watch(() => props.end, v => endLocal.value = v)
</script>

<template>
  <div class="range-wrapper">
    <Input label="Desde" type="date" v-model="startLocal" @update:modelValue="emit('update:start', $event)" />
    <Input label="Hasta" type="date" v-model="endLocal" @update:modelValue="emit('update:end', $event)" />
  </div>
</template>

<style scoped>
.range-wrapper {
  display: flex;
  gap: var(--spacing-md);
}
</style>
