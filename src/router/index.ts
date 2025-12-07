import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import RoomsList from '../pages/Rooms/RoomsList.vue'
import ReservationsList from '../pages/Reservations/ReservationsList.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/rooms' },
  { path: '/rooms', component: RoomsList },
  { path: '/reservations', component: ReservationsList }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
