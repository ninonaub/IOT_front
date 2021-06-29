<template>
  <v-app style="height: 100%">
    <v-app-bar
      :height="40"
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center" @click="() => { $router.push('/')}" style="cursor: pointer"> 
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/img/logo_white.svg')"
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
    <v-main style="height: calc(100%-55rem;)">
      
      <router-view/>
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
      connected: false
    }
  },
  computed: {
    alert(){
      this.snackbar = this.$store.state.snackbar
      return this.$store.state.alert
    }
  },
  created(){
    this.$vuetify.theme.dark = this.$store.state.user['dark_mode']
    this.$get('user/active')
      .then((res)=> {
        if (res === null && this.$route.name !== 'Auth')
          this.$router.push('/auth')
        if( res !== null && !this.$store.state.user['username'] ){
          this.$store.commit ('CHANGEUSER', res)
          this.connected = true
        }
      })
  }
};
</script>


