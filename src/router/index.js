import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/list',
    name: 'order-list',
    component: () => import('../views/Home')
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import('../views/Delivery')
  },
  {
    path: '/delivery-list',
    name: 'delivery-list',
    component: () => import('../views/Delivery/list')
  },
  {
    path: '/create-order',
    name: 'create-order',
    component: () => import('../views/CreateOrder')
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import('../views/Order')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
