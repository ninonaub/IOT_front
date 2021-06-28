<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" v-if="false">
        <v-img
          v-if="!$vuetify.theme.dark"
          :src="require('../assets/logo.svg')"
          class="my-6"
          contain
          height="20vh"
        />
        <v-img
          v-else
          :src="require('../assets/logo_white.svg')"
          class="my-6"
          contain
          height="20vh"
        />
      </v-col>

      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Bienvenue sur Wake All
        </h1>
        <p class="my-4">Le réveil connecté pour répondre à vos besoins</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="6">
        <Alert mode="carousel" />
      </v-col>
      <v-col col="6">
        <Weather mode="carousel" />
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  import Weather from '@/components/weather/WeatherHandler.vue'
  import Alert from '@/components/alert/AlertHandler.vue'
  export default {
    name: 'Home',
    components: {Weather, Alert},
    
  }
</script>
