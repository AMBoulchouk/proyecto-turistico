<template>
  <div class="auth-container">
    <div class="auth-card">
          <router-view />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding: var(--spacing-lg);
}

.auth-card {
  width: 100%;
  max-width: 380px;
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
</style>
