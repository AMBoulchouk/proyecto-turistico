<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useReservationsStore } from '../../store/reservations'
import { useRoomsStore } from '../../store/rooms'

import Table from '../../components/ui/Table.vue'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import ReservationForm from './ReservationForm.vue'

import type { Reservation, ReservationPayload } from '../../types/reservations'     

const reservationsStore = useReservationsStore()
const roomsStore = useRoomsStore()

const showModal = ref(false)
const editingReservation = ref<Reservation | null>(null)

onMounted(() => {
  roomsStore.fetchRooms()
  reservationsStore.fetchReservations()
})

const columns = [
  { key: 'guestName', label: 'Huésped' },
  { key: 'roomId', label: 'Hab.' },
  { key: 'startDate', label: 'Desde' },
  { key: 'endDate', label: 'Hasta' }
]

function openCreateModal() {
  editingReservation.value = null
  showModal.value = true
}
function openEditModal(r: Reservation) {
  editingReservation.value = r
  showModal.value = true
}
async function handleSave(data: ReservationPayload) {
  if (editingReservation.value) {
    await reservationsStore.updateReservation(editingReservation.value.id, data)
  } else {
    await reservationsStore.addReservation(data)
  }

  showModal.value = false
}

function deleteReservation(r: Reservation) {
  if (!confirm(`¿Eliminar reserva de ${r.guestName}?`)) return
  reservationsStore.deleteReservation(r.id)
}
</script>

<template>
  <div class="reservations-wrapper">
    <div class="header">
      <h1>Reservas</h1>
      <Button @click="openCreateModal">Nueva Reserva</Button>
    </div>

    <Table :columns="columns" :rows="reservationsStore.items">
      <template #actions="{ row }" >
        <div class="actions">
            <Button variant="secondary" size="sm" @click="openEditModal(row as Reservation)">
                Editar
            </Button>
            <Button variant="danger" size="sm" @click="deleteReservation(row as Reservation)">
                Eliminar
            </Button>
        </div>
      </template>
    </Table>

     <Modal
      :open="showModal"
      :title="editingReservation ? 'Editar Reserva' : 'Crear Reserva'"
      @close="showModal = false"
    >
        <ReservationForm
            :initialData="editingReservation ? {
            id: editingReservation.id,
            guestName: editingReservation.guestName,
            roomId: editingReservation.roomId,
            startDate: editingReservation.startDate,
            endDate: editingReservation.endDate
            } : undefined"
            @submit="handleSave"
        />
    </Modal>
  </div>
</template>
<style scoped>
.reservations-wrapper {
  padding: var(--spacing-lg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  gap: var(--spacing-sm);
}

</style>