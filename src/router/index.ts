import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '@/App.vue'

const baseUrl = import.meta.env.BASE_URL
const history = import.meta.env.SSR ? createMemoryHistory(baseUrl) : createWebHistory(baseUrl)

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
  ]
})

export default router