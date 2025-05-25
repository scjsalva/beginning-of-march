import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Player from '../views/Player.vue'
import Auth from '../views/Auth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/beginning-of-march',
      name: 'player',
      component: Player
    },
    {
      path: '/birthday-wishes',
      name: 'wishes',
      component: () => import('../views/Wishes.vue')
    },
    {
      path: '/my-message',
      name: 'message',
      component: () => import('../views/Message.vue')
    },
    {
      path: '/our-story',
      name: 'story',
      component: () => import('../views/Story.vue')
    }
  ]
})

// Add navigation guard
router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('auth')
  
  // If no auth data exists
  if (!auth) {
    // Allow access to auth page, redirect others to auth
    if (to.path === '/auth') {
      next()
    } else {
      next('/auth')
    }
    return
  }

  // Check if auth is valid
  const { authenticated, expiration } = JSON.parse(auth)
  const isValid = authenticated && new Date().getTime() <= expiration

  if (!isValid) {
    // Clear invalid auth data
    localStorage.removeItem('auth')
    // Allow access to auth page, redirect others to auth
    if (to.path === '/auth') {
      next()
    } else {
      next('/auth')
    }
    return
  }

  // If auth is valid and trying to access auth page, redirect to home
  if (to.path === '/auth') {
    next('/')
    return
  }

  // Otherwise allow access to requested page
  next()
})

export default router 
