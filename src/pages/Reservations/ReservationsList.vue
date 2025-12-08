<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useReservationsStore } from '../../store/reservations'
import { useRoomsStore } from '../../store/rooms'

import Table from '../../components/ui/Table.vue'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import ReservationForm from './ReservationForm.vue'
import { useUiStore, useToastStore } from '../../store/ui'
import type { Reservation, ReservationPayload } from '../../types/reservations'     

const reservationsStore = useReservationsStore()
const roomsStore = useRoomsStore()

const showModal = ref(false)
const editingReservation = ref<Reservation | null>(null)

const ui = useUiStore()
const toast = useToastStore()

onMounted(async () => {
    try {
    ui.startLoading()
    await roomsStore.fetchRooms()
    await reservationsStore.fetchReservations()
  } finally {
    ui.stopLoading()
  }
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
  try {
    ui.startLoading()

    if (editingReservation.value) {
      await reservationsStore.updateReservation(editingReservation.value.id, data)
      toast.show('Reserva actualizada correctamente')
    } else {
      await reservationsStore.addReservation(data)
      toast.show('Reserva creada correctamente')
    }

    showModal.value = false

  } catch (err) {
    toast.show('Ocurrió un error al guardar la reserva')

  } finally {
    ui.stopLoading()
  }
}

function deleteReservation(r: Reservation) {
   if (!confirm(`¿Eliminar reserva de ${r.guestName}?`)) return

  try {
    ui.startLoading()

    reservationsStore.deleteReservation(r.id)
    toast.show('Reserva eliminada correctamente')

  } catch (err) {
    toast.show('Error al eliminar la reserva')

  } finally {
    ui.stopLoading()
  }
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