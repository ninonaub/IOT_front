import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      dark_mode: true,
    }
  },
  mutations: {
    CHANGEDARKMODE(state, val){
      state.user['dark_mode'] = val
    },
    CHANGEUSER(state, user){
      state.user = user
      if (typeof state.user.dark_mode == 'undefined')
        state.user.dark_mode = true
    }
  },
  actions: {
    changeDarkMode(context){
      context.commit('changeDarkMode')
    }
  },
  modules: {
  }
})
