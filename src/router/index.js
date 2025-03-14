import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router