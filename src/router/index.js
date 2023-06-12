import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/welcome' },
  { path: '/login', component: () => import('../views/login/login.vue') },
  { path: '/test', component: () => import('../components/pic/addPic.vue') },
  { path: '/register', component: () => import('../views/login/register.vue') },
  {
    path: '/', component: () => import('../views/Index.vue'),
    children: [
      { path: '/welcome', component: () => import('../views/Welcome.vue') },
      { path: '/aboutme', component: () => import('../views/Aboutme.vue') },
      { path: '/note', component: () => import('../views/Note.vue') },
      { path: '/chatGpt', component: () => import('../views/chatGpt.vue') },
      { path: '/noteEdit/:uuid', component: () => import('../views/noteDetial/NoteEdit.vue') },
      { path: '/myNote', component: () => import('../views/noteDetial/Mynote.vue') },
      { path: '/noteView/:uuid', component: () => import('../views/noteDetial/NoteView.vue') },
      { path: '/pic', component: () => import('../views/Pic.vue') },
      { path: '/message', component: () => import('../views/Message.vue') },
      { path: '/test', component: () => import('../components/topBanner/index.vue') },
    ]
  }
  ,
  {
    path: '/admin', component: () => import('../views/admin/Index.vue'),
    children: [
      { path: '/admin/statistical', component: () => import('../views/admin/statistical.vue') },
      { path: '/admin/home', component: () => import('../views/admin/home.vue') },
      { path: '/admin/pic', component: () => import('../views/admin/pic.vue') },
      { path: '/admin/note', component: () => import('../views/admin/note.vue') },
      { path: '/admin/message', component: () => import('../views/admin/message.vue') },
      { path: '/admin/log', component: () => import('../views/admin/log.vue') },
      { path: '/admin/setting', component: () => import('../views/admin/setting.vue') },
    ]
  }


]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
