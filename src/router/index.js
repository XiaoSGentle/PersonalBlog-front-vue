import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/', component: () => import('../views/Index.vue'),
    children: [
      { path: '/welcome', component: () => import('../views/Welcome.vue') },
      { path: '/aboutme', component: () => import('../views/Aboutme.vue') },
      { path: '/note', component: () => import('../views/Note.vue') },
      { path: '/noteEdit/:uuid', component: () => import('../views/noteDetial/NoteEdit.vue') },
      { path: '/noteAdd', component: () => import('../views/noteDetial/NoteEdit.vue') },
      { path: '/noteView/:uuid', component: () => import('../views/noteDetial/NoteView.vue') },
      { path: '/pic', component: () => import('../views/Pic.vue') },
      { path: '/message', component: () => import('../views/Message.vue') },
      { path: '/test', component: () => import('../components/topBanner/index.vue') },
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
