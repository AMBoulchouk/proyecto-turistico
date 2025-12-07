<script setup>
import { onMounted } from 'vue'
import { useRoomsStore } from '../../store/rooms'

const store = useRoomsStore()

onMounted(() => {
  store.fetchRooms()
})
</script>

<template>
  <div>
    <h1>Habitaciones</h1>

    <div v-if="store.loading">Cargando...</div>

    <ul v-else>
      <li v-for="room in store.items" :key="room.id">
        {{ room.number }} — {{ room.type }} — ${{ room.price }}
      </li>
    </ul>
  </div>
</template>
