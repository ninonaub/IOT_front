<template>
  <v-container>
    <v-row class="text-center mx-0">
      <v-col class="mb-4 cell rounded-b-lg" cols="12">
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
