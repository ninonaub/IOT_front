<template>
  <v-container>    
    <Weather/>
  </v-container>
</template>

<script>
  import Weather from '@/components/weather/WeatherHandler.vue'

  export default {
    name: 'Weather',
    components: {Weather},
  }
</script>
