import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    isLogin: false,
    Token: '',
    userInfo: {},
    noteContent: {}
  },
  getters: {
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeUserInfo(state) {
      state.userInfo = null
    },
    setNoteContent(state, noteContent) {
      state.noteContent = noteContent
    },
    removeNoteContent(state) {
      state.noteContent = null
    },
    setToken(state, Token) {
      state.isLogin = true
      state.Token = Token
    },
    removeToken(state) {
      state.Token = null
    },
    loginOut(state) {
      state.isLogin = false
      state.Token = ''
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]  // 默认存储到本地local Storage里
})
