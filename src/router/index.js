import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Player from '../views/Player.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

export default router 
