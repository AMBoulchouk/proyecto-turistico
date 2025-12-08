<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Input from '../../components/ui/Input.vue'
import Select from '../../components/ui/Select.vue'
import Button from '../../components/ui/Button.vue'
import { useReservationsStore } from '../../store/reservations'
import { useRoomsStore } from '../../store/rooms'
import type { ReservationPayload } from '../../types/reservations'
import DateRangePicker from '../../components/ui/DateRangePicker.vue'
import CalendarAvailability from '../../components/ui/CalendarAvailability.vue'
import { required, isValidDateRange } from '../../utils/validators'

const emit = defineEmits(['submit'])
const props = defineProps<{ initialData?: ReservationPayload & { id?: number } }>()


const reservationsStore = useReservationsStore()
const roomsStore = useRoomsStore()

const guestName = ref('')
const roomId = ref('')
const startDate = ref('')
const endDate = ref('')

const error = ref('')




watch(() => props.initialData, data => {
  if (data) {
    guestName.value = data.guestName
    roomId.value = String(data.roomId)
    startDate.value = data.startDate
    endDate.value = data.endDate
  }
}, { immediate: true })

function validate(): string | null {
    if (!required(guestName.value)) return 'El nombre del huésped es obligatorio'
    if (!required(roomId.value)) return 'Debe seleccionar una habitación'
    if (!isValidDateRange(startDate.value, endDate.value))
      return 'La fecha de inicio no puede ser mayor a la de fin'

    const available = reservationsStore.isRoomAvailable(
      Number(roomId.value),
      startDate.value,
      endDate.value,
      props.initialData?.id
    )
    if (!available) return 'La habitación no está disponible en esas fechas'

    return null
}

async function submit() {
  const msg = validate()
  if (msg) {
    error.value = msg
    return
  }

  emit('submit', {
    guestName: guestName.value,
    roomId: Number(roomId.value),
    startDate: startDate.value,
    endDate: endDate.value
  })
}

const availableRooms = computed(() => {
  if (!startDate.value || !endDate.value) return roomsStore.items

  return reservationsStore.getAvailableRooms(
    startDate.value,
    endDate.value,
    props.initialData?.id
  )
})
</script>

<template>
  <div class="form">
    <Input label="Huésped" v-model="guestName" v-only-letters />
    <Select
      label="Habitación"
      v-model="roomId"
      :options="availableRooms.map(r => ({ label: r.number, value: String(r.id) }))"
    />

    <DateRangePicker 
      :start="startDate"
      :end="endDate"
      @update:start="startDate = $event"
      @update:end="endDate = $event"
    />
    <CalendarAvailability
      :reservations="reservationsStore.items.filter(r => r.roomId === Number(roomId))" 
      :externalStart="startDate"
      :externalEnd="endDate"
      @select="({ start, end }) => { startDate = start; endDate = end }"
    />

    <p v-if="error" class="error">{{ error }}</p>

    <Button class="submit-btn" @click="submit">Guardar</Button>
  </div>
</template>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
.submit-btn {
  margin-top: var(--spacing-md);
}
.error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}
</style>