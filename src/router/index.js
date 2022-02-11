import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list',
    component: () => import('../views/layout/Layout'),
    children: [
      {
        path: '/list',
        name: 'order-list',
        component: () => import('../views/Home')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/views/Auth'),
    children: [
      {
        name: 'login',
        path: '/login',
        component: () => import('@/views/Auth/Login')
      },
      {
        name: 'register',
        path: '/register',
        component: () => import('@/views/Auth/Register')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
