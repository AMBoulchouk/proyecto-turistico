<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoomsStore } from '../../store/rooms'
import Table from '../../components/ui/Table.vue'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import RoomForm from './RoomForm.vue'
import type { Room, RoomPayload } from '../../types/room'
import { useUiStore, useToastStore } from '../../store/ui'

const store = useRoomsStore()
const ui = useUiStore()
const toast = useToastStore()
const showModal = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const editingRoom = ref<Room | null>(null)


// Columnas de la tabla
const columns = [
  { key: 'number', label: 'Número' },
  { key: 'type', label: 'Tipo' },
  { key: 'price', label: 'Precio ($)' }
]

// Cargar habitaciones al iniciar
onMounted(async () => {
  try {
    ui.startLoading()
    await store.fetchRooms()
  } finally {
    ui.stopLoading()
  }
})

function openCreateModal() {
  
  editingRoom.value = null
  successMessage.value = ''
  errorMessage.value = ''
  showModal.value = true
}
function openEditModal(room: Room) {
  editingRoom.value = room
  successMessage.value = ''
  errorMessage.value = ''
  showModal.value = true
}

async function handleCreate(data: RoomPayload) {
 try {
    ui.startLoading()

    if (editingRoom.value) {
      await store.updateRoom(editingRoom.value.id, data)
      toast.show('Habitación actualizada correctamente')
    } else {
      await store.addRoom(data)
      toast.show('Habitación creada correctamente')
    }

    showModal.value = false
    editingRoom.value = null

  } catch (err) {
    toast.show('Error al guardar la habitación')
  } finally {
    ui.stopLoading()
  }
}

function removeRoom(room: Room) {
 const confirmDelete = confirm(`¿Eliminar la habitación ${room.number}?`)
  if (!confirmDelete) return

  try {
    ui.startLoading()
    store.deleteRoom(room.id)
    toast.show('Habitación eliminada correctamente')
  } catch (err) {
    toast.show('Error eliminando la habitación')
  } finally {
    ui.stopLoading()
  }
}
</script>

<template>
  <div class="rooms-wrapper">
    <div class="header">
      <h1>Habitaciones</h1>
      <Button @click="openCreateModal">Nueva Habitación</Button>
    </div>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <Table :columns="columns" :rows="store.items" >
       <template #actions="{ row }">
        <div class="actions">
          <Button variant="secondary" size="sm" @click="openEditModal(row as Room)">
            Editar
          </Button>

          <Button variant="danger" size="sm" @click="removeRoom(row as Room)">
            Eliminar
          </Button>
        </div>
      </template>
    </Table>

    <!-- Modal con formulario -->
    <Modal :open="showModal" :title="editingRoom ? 'Editar Habitación' : 'Crear Habitación'" @close="() => { showModal = false; editingRoom = null }">
      <RoomForm
        :initialData="editingRoom ? ({
          number: editingRoom.number,
          type: editingRoom.type,
          price: editingRoom.price
        }) : undefined"
        @submit="handleCreate"
      />
    </Modal>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: var(--spacing-sm);
}

.rooms-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.success {
  color: var(--color-success);
  font-size: var(--font-size-sm);
}

.error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}
</style>
