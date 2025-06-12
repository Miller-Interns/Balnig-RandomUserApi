import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from './router-name'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.Home,
      component: HomeView,
    },
  ],
})

export default router
