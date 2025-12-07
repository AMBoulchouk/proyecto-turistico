import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import RoomsList from '../pages/Rooms/RoomsList.vue'
import ReservationsList from '../pages/Reservations/ReservationsList.vue'
import AppLayout from '../layouts/AppLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  { path: '/login', 
    component: AuthLayout,
    children: [{ path: '', component: Login }],
    meta: { public: true } 
  },
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'rooms', component: RoomsList },
      { path: 'reservations', component: ReservationsList }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.user) {
    auth.loadFromStorage()
  }
  if (to.meta.requiresAuth && !auth.user) {
    return '/login'
  }
  if (to.meta.public && auth.user) {
    return '/rooms'
  }
})
