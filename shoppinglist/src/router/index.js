import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/shoppinglist',
          name: 'shoppinglist',
          component: () => import('../views/ShoppingListView.vue')
        },
        {
          path: '/add',
          name: 'add',
          component: () => import('../views/AddView.vue')
        },
        {
          path: '/edit',
          name: 'edit',
          component: () => import('../views/EditView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }

  ]
})

router.beforeEach((to, from, next) => {
  // to: 到哪里去
  // from: 从哪里来
  // next: 放行

  const isLogin = localStorage.getItem('isLogin')

  if (isLogin) {
    next()
  } else {
    // 未登录
    if (to.path !== '/login') {
      alert('请先登录')
      next('/login')
    } else {
      next()
    }
  }
})

export default router
