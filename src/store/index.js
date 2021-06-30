import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      dark_mode: true,
    },
    snackbar: {
      message: '',
      color: '',
      icon: ''
    },
    alert: false,
    weather: null,
    background: 'sun'
  },
  mutations: {
    CHANGEDARKMODE(state, val){
      state.user['dark_mode'] = val
    },
    CHANGEUSER(state, user){
      Object.keys(user).forEach(e=> {
        if (user[e] === 'ON')
          state.user[e] = true
        else if (user[e] === 'OFF')
          state.user[e] = false
        else 
          state.user[e] = user[e]
      })
      
      if (typeof state.user.dark_mode == 'undefined')
        state.user.dark_mode = true
    },
    CHANGEWEATHER(state, weather){
      state.weather = weather
      console.log('weather', weather.code)
      state.background = weather.code <= 233 ? 'lightning' : weather.code <= 522 ? 'rain' : weather.code <= 623 ? 'snow' : weather.code <= 751 || weather.code >= 803 ? 'cloudy' : 'sun'
    },
    CHANGESNACKBAR(state, [seen, snackbar, style]){
      state.alert = false
      if (style === 'error'){
        state.snackbar.color = 'error'
        state.snackbar.icon = 'mdi-close-circle'
        state.snackbar.message = snackbar
      }
      else if (style === 'success'){
        state.snackbar.color = 'success'
        state.snackbar.icon = 'mdi-check-circle'
        state.snackbar.message = snackbar
      }
      else if (typeof style !== 'undefined') {
        state.snackbar.color = style.color
        state.snackbar.icon = style.icon
        state.snackbar.message = snackbar
      }
      state.alert = seen
    }
    
  },
  actions: {
    changeDarkMode(context){
      context.commit('changeDarkMode')
    },
    changeSnackbar(context, [seen, snackbar, style]){
      context.commit('CHANGESNACKBAR', [seen, snackbar, style])
      setTimeout(() => {
        context.commit('CHANGESNACKBAR', [false, '', 'error'])
      }, 5000);
    },
    changeUser(context, user){
      context.commit('CHANGEUSER', user)
      if (user.city){
        Vue.prototype.$apiWeather(user.city, 'current')
          .then((res)=>{
            console.log(res)
            context.commit('CHANGEWEATHER',res.weather)
          })
      }else {
        context.commit('CHANGEWEATHER', null)
      }
      
    }
  },
  modules: {
  }
})
