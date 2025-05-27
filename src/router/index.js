import { createRouter, createWebHistory } from 'vue-router'
import Player from '../views/Player.vue'
import Auth from '../views/Auth.vue'

// Function to handle fade transition
const fadeTransition = (type = 'out') => {
  return new Promise((resolve) => {
    const animation = type === 'out' ? 'fadeOut' : 'fadeIn'
    document.body.style.animation = `${animation} 0.5s ease-in-out forwards`
    setTimeout(() => {
      if (type === 'in') {
        document.body.style.animation = ''
        document.body.style.opacity = '1'
      }
      resolve()
    }, 500)
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
      name: 'player',
      component: Player
    },
    {
      path: '/birthday-wishes',
      name: 'wishes',
      component: () => import('../views/Wishes.vue')
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
    next({ name: 'player' })
    return
  }

  // Handle page transitions (except for auth page)
  if (from.name && to.path !== '/auth') {
    await fadeTransition('out')
    next()
    return
  }

  // Otherwise allow access to requested page
  next()
})

// Add after navigation hook to handle fade in
router.afterEach(() => {
  // Reset opacity and trigger fade in
  document.body.style.opacity = '0'
  fadeTransition('in')
})

export default router

// Add global styles for transitions
const style = document.createElement('style')
style.textContent = `
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

body {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
`
document.head.appendChild(style)
