<script setup lang="ts">
// App no necesita lógica por ahora.
// Toda la navegación y layouts los maneja el router.
</script>

<template>
  <!-- El router se encarga de cargar AuthLayout o AppLayout -->
  <router-view />
</template>

<style>
/* Estilos globales pueden ir aquí si se necesitan,
pero en general usamos main.css como fuente de tokens y resets. */
</style>
