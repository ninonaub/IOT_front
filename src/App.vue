<template>
  <v-app style="height: 100%">
    <v-app-bar
      :height="40"
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center pointer" @click="() => { $router.push('/')}"> 
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/img/logo_white.svg')"
          transition="scale-transition"
          width="50"
        />
      </div>
      <v-spacer></v-spacer>
      <UserMenu v-if="connected" />
    </v-app-bar>

    <v-snackbar
      style="z-index: 10;"
      :value="alert"
      absolute
      :color="snackbar.color"
      top
      shaped
      transition="scroll-y-transition"
    >
      <v-icon>{{snackbar.icon}}</v-icon>
      {{snackbar.message}}
    </v-snackbar>
    <v-main style="height:calc(100% - 40px)">
      <div style="position: fixed; top: 20px; width: 100%; height: 100% ; z-index:-1;" class="background"></div>
      <template >
        <video v-show="ready" v-if="background" style=" position: fixed; top: 20px; width: 100%; height: 100%; z-index:-1;" autoplay muted loop id="myVideo" preload>
          <source :src="require('@/assets/videos/'+ background +'.mp4')" type="video/mp4">
        </video>
        <router-view v-show="ready"/>
      </template>
    </v-main>
    
  </v-app>
</template>

<script>
import UserMenu from '@/components/navbar/UserMenu.vue'
export default {
  name: 'App',
  components: {UserMenu},
  data(){
    return {
      snackbar: {},
      connected: false,
      ready: false
    }
  },
  computed: {
    alert(){
      this.snackbar = this.$store.state.snackbar
      return this.$store.state.alert
    },
    background(){
      return this.$store.state.background
    }
  },
  created(){
    this.$vuetify.theme.dark = this.$store.state.user['dark_mode']
    this.$get('user/active')
      .then((res)=> {
        if (res === null && this.$route.name !== 'Auth'){
          this.$router.push('/auth')
          this.ready = true
        }
        if( res !== null && !this.$store.state.user['username'] ){
          this.$store.dispatch('changeUser', res)
          this.connected = true
          this.ready = true
          
        }
      })
  }
};
</script>


