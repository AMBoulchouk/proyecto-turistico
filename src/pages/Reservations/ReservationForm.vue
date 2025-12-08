<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from '../../components/ui/Input.vue'
import Select from '../../components/ui/Select.vue'
import Button from '../../components/ui/Button.vue'
import { useReservationsStore } from '../../store/reservations'
import { useRoomsStore } from '../../store/rooms'
import type { ReservationPayload } from '../../types/reservations'

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
  if (!guestName.value) return 'El nombre del huésped es obligatorio'
  if (!roomId.value) return 'Debe seleccionar una habitación'
  if (!startDate.value || !endDate.value) return 'Debe seleccionar fechas'
  if (startDate.value > endDate.value) return 'La fecha de inicio no puede ser mayor a la de fin'

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
</script>

<template>
  <div class="form">
    <Input label="Huésped" v-model="guestName" />
    <Select
      label="Habitación"
      v-model="roomId"
      :options="roomsStore.items.map(r => ({ label: r.number, value: String(r.id) }))"
    />

    <Input label="Desde" type="date" v-model="startDate" />
    <Input label="Hasta" type="date" v-model="endDate" />

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