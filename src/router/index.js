import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
     {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/CartView.vue')
  }
  ],
})

export default router
