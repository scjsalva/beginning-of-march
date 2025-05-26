import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Player from '../views/Player.vue'
import Auth from '../views/Auth.vue'

// Function to handle fade out transition
const fadeOutTransition = () => {
  return new Promise((resolve) => {
    document.body.style.animation = 'fadeOut 0.5s ease-in forwards'
    setTimeout(resolve, 500)
  })
}

const BASE_URL = process.env.NODE_ENV === 'production' ? '/happy-birthday-jaii/' : '/'

const router = createRouter({
  history: createWebHistory(BASE_URL),
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
      path: '/just-for-you',
      name: 'player',
      component: Player
    },
    {
      path: '/birthday-wishes',
      name: 'wishes',
      component: () => import('../views/Wishes.vue')
    },
    {
      path: '/our-story',
      name: 'story',
      component: () => import('../views/Story.vue')
    }
  ]
})

// Add navigation guard
router.beforeEach(async (to, from, next) => {
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
    next({ name: 'home' })
    return
  }

  // Force page reload when navigating between routes (except for auth page)
  if (from.name && to.path !== '/auth') {
    await fadeOutTransition()
    // Get the current base path from window.location
    const currentPath = window.location.pathname
    const basePath = currentPath.includes('/happy-birthday-jaii') ? '/happy-birthday-jaii' : ''
    window.location.href = `${basePath}${to.fullPath}`
    return
  }

  // Otherwise allow access to requested page
  next()
})

export default router

// Add global styles for transitions
const style = document.createElement('style')
style.textContent = `
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
`
document.head.appendChild(style)
