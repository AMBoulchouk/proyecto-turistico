import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import './styles/main.css'
import { useAuthStore } from './store/auth'
import './styles/loading.css'
import { onlyNumbers, onlyLetters, noSpecialChars } from './directives/validators'


const app = createApp(App)
app.use(createPinia())

const auth = useAuthStore()
auth.loadFromStorage()

app.directive('only-numbers', onlyNumbers)
app.directive('only-letters', onlyLetters)
app.directive('no-special', noSpecialChars)

app.use(router)
app.mount('#app')