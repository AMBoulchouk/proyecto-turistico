<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Reservation } from '../../types/reservations'

interface Props {
  month?: number
  year?: number
  reservations: Reservation[]
  externalStart?: string | null
  externalEnd?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  externalStart: null,
  externalEnd: null
})

const emit = defineEmits(['select'])

// Fecha mínima (hoy)
const today = new Date()
today.setHours(0, 0, 0, 0)
const minMonth = today.getMonth()
const minYear = today.getFullYear()

// Estado actual del calendario
const currentMonth = ref(props.month)
const currentYear = ref(props.year)

// Rango seleccionado (sin duplicados)
const start = ref<string | null>(props.externalStart)
const end = ref<string | null>(props.externalEnd)

// Sincronización cuando el formulario cambia
watch(() => props.externalStart, val => {
  start.value = val || null
})

watch(() => props.externalEnd, val => {
  end.value = val || null
})

function format(d: Date) {
  return d.toISOString().split('T')[0]
}

const daysInMonth = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1)
  const days: string[] = []

  while (date.getMonth() === currentMonth.value) {
    days.push(format(date) as string)
    date.setDate(date.getDate() + 1)
  }
  return days
})

function isPast(date: string) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d < today
}

function isBlocked(date: string) {
  if (isPast(date)) return true

  return props.reservations.some(r => {
    return !(date < r.startDate || date > r.endDate)
  })
}

function selectDay(date: string) {
  if (isBlocked(date)) return

  if (!start.value) {
    start.value = date
    end.value = null
    return
  }

  if (!end.value && date >= start.value) {
    end.value = date
    emit('select', { start: start.value, end: end.value })
    return
  }

  start.value = date
  end.value = null
}

// Navegación
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function prevMonth() {
  if (currentYear.value === minYear && currentMonth.value === minMonth) return

  if (currentMonth.value === 0) {
    if (currentYear.value - 1 < minYear) return
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextYear() {
  currentYear.value++
}

function prevYear() {
  if (currentYear.value <= minYear) return
  currentYear.value--
}
</script>

<template>
  <div class="calendar">
    <div class="nav">

      <!-- Año -1 -->
      <button
        @click="prevYear"
        :disabled="currentYear <= minYear"
      >«</button>

      <!-- Mes -1 -->
      <button
        @click="prevMonth"
        :disabled="currentYear === minYear && currentMonth === minMonth"
      >‹</button>

      <span class="title">
        {{ new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(currentYear, currentMonth)) }}
{{ currentYear }}
      </span>

      <!-- Mes +1 -->
      <button @click="nextMonth">›</button>

      <!-- Año +1 -->
      <button @click="nextYear">»</button>
    </div>

    <div class="grid">
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        :class="{
          blocked: isBlocked(day),
          selected: start === day || end === day,
          inRange: start && end && day > start && day < end
        }"
        @click="selectDay(day)"
      >
        {{ Number(day.split('-')[2]) }}
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

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.nav button {
  border: none;
  background: var(--color-primary);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.nav button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.title {
  font-weight: 600;
  text-transform: capitalize;
  min-width: 160px;
  text-align: center;
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
