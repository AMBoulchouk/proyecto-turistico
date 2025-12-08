<template>
  <div class="app-layout">
      <aside class="sidebar">
          <h2 class="brand">Hotel Admin</h2>
          
          <nav class="menu">
              <RouterLink to="/rooms" class="menu-item">Habitaciones</RouterLink>
              <RouterLink to="/reservations" class="menu-item">Reservas</RouterLink>
            </nav>
        </aside>
        
        <div class="main">
            <header class="header">
        
        <div class="user-email">{{ userEmail }}</div>
        <button class="logout-btn" @click="logout">Salir</button>
    </header>
    
    <main class="content">
        <slot />
        <router-view />
    </main>
</div>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const router = useRouter()

const userEmail = auth.user?.email || 'Usuario'

function logout() {
  auth.logout()
    router.push('/login')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-background);
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: var(--color-primary);
  color: var(--color-text-inverted);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.brand {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: bold;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.menu-item {
  color: var(--color-text-inverted);
  text-decoration: none;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: 0.2s;
}

.menu-item:hover {
  background: var(--color-primary-dark);
}

/* Main section */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: white;
  box-shadow: var(--shadow-md);
}

.logout-btn {
  border: none;
  background: var(--color-danger);
  color: var(--color-text-inverted);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

/* Page content */
.content {
  padding: var(--spacing-lg);
}
</style>
