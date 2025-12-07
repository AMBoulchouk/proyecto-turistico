<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

function login() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Todos los campos son obligatorios'
    return
  }

  // Mock login
  auth.login(email.value)

  // Redirigir a dashboard
  router.push('/rooms')
}
</script>

<template>
  <div class="login-wrapper">
    <h2 class="title">Iniciar Sesión</h2>

    <div class="form-group">
      <Input
        label="Email"
        v-model="email"
        type="email"
      />
    </div>

    <div class="form-group">
      <Input
        label="Contraseña"
        v-model="password"
        type="password"
      />
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <Button variant="primary" size="md" @click="login">
      Entrar
    </Button>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.title {
  text-align: center;
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  text-align: center;
}
</style>
