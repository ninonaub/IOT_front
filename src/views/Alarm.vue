<template>
  <v-container>    
    <AlarmHandler/>
  </v-container>
</template>

<script>
  import AlarmHandler from '@/components/alarm/AlarmHandler.vue'

  export default {
    name: 'Alarm',
    components: {AlarmHandler},
  }
</script>
