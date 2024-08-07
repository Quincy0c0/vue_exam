import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'MainPage',
          component: () => import('../views/MainPageView.vue')
        },
        {
          path: '/search',
          nmae: 'Search',
          component: () => import('../views/SearchView.vue')
        }
      ]
    }
  ]
})

export default router
