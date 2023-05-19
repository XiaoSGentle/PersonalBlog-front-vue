import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/', component: () => import('../views/Index.vue'),
    children: [
      { path: '/welcome', component: () => import('../views/Welcome.vue') },
      { path: '/aboutme', component: () => import('../views/Aboutme.vue') },
      { path: '/note', component: () => import('../views/Note.vue') },
      { path: '/pic', component: () => import('../views/Pic.vue') },
      { path: '/message', component: () => import('../views/Message.vue') },
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
