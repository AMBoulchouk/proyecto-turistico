import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import './styles/main.css'
import { useAuthStore } from './store/auth'

const app = createApp(App)
app.use(createPinia())

const auth = useAuthStore()
auth.loadFromStorage()

app.use(router)
app.mount('#app')