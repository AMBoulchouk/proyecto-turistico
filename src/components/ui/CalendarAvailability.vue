<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Reservation } from '../../types/reservations'

interface Props {
  month?: number
  year?: number
  reservations: Reservation[]
}

const props = withDefaults(defineProps<Props>(), {
  month: new Date().getMonth(),
  year: new Date().getFullYear()
})

const emit = defineEmits(['select'])

const start = ref<string | null>(null)
const end = ref<string | null>(null)

function format(d: Date) {
  return d.toISOString().split('T')[0]
}

const daysInMonth = computed(() => {
  const date = new Date(props.year, props.month, 1)
  const days = []
  while (date.getMonth() === props.month) {
    days.push(format(new Date(date)))
    date.setDate(date.getDate() + 1)
  }
  return days
})

// Fechas ocupadas
function isBlocked(date: string) {
  return props.reservations.some(r => {
    return !(date < r.startDate || date > r.endDate)
  })
}

function selectDay(date: string) {
  if (isBlocked(date)) return

  if (!start.value) {
    start.value = date
    end.value = null
  } else if (date >= start.value!) {
    end.value = date
    emit('select', { start: start.value, end: end.value })
  } else {
    start.value = date
    end.value = null
  }
}
</script>

<template>
  <div class="calendar">
    <div class="header">
      {{ new Date(year, month).toLocaleString('es-ES', { month: 'long', year: 'numeric' }) }}
    </div>

    <div class="grid">
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        :class="{
          blocked: isBlocked(day as string),
          selected: start === day || end === day,
          inRange: start && end && day as string > start && day as string < end
        }"
        @click="selectDay(day as string)"
      >
        {{ Number((day as string).split('-')[2]) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header {
  text-align: center;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-xs);
}

.day {
  padding: var(--spacing-sm);
  text-align: center;
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
}

.day:hover {
  background: var(--color-primary);
  color: white;
}

.blocked {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

.selected {
  background: var(--color-primary);
  color: white;
}

.inRange {
  background: var(--color-primary-dark);
  color: white;
}
</style>
