<template>
  <v-container>    
    <AlertHandler/>
  </v-container>
</template>

<script>
  import AlertHandler from '@/components/alert/AlertHandler.vue'

  export default {
    name: 'Alert',
    components: {AlertHandler},
  }
</script>
