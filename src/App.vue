<script setup lang="ts">
import { useUiStore } from './store/ui'
import Toast from './components/ui/Toast.vue'
const ui = useUiStore()
</script>

<template>
   <router-view />
   <Toast />
    <div v-if="ui.loading" class="loading-overlay">
    Cargando...
  </div>
</template>
