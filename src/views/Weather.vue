<template>
  <v-container>    
    <WeatherHandler/>
  </v-container>
</template>

<script>
  import WeatherHandler from '@/components/weather/WeatherHandler.vue'

  export default {
    name: 'Weather',
    components: {WeatherHandler},
  }
</script>
