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
          :src="require('./assets/logo_white.svg')"
          transition="scale-transition"
          width="50"
        />
      </div>

      <v-spacer></v-spacer>

      <UserMenu />
    </v-app-bar>

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
 
  data: () => ({
  }),
  created(){
    this.$vuetify.theme.dark = this.$store.state.user['dark_mode']
  }
};
</script>


