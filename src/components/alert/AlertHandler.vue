<template>
</template>
<script>
import AlertCard from '@/components/alert/AlertCard.vue'
export default {
    name: "AlertHandler",
    components: {AlertCard},
    props: ['mode'],
    data: () => ({
      alerts: [],
      ready: -1,
      modify: false
    }),
    methods:{
      getAlerts(){

      },
      deleteAlert(){

      },
      createAlert(){

      }
    },
    created(){
        this.ready = this.alerts.length -1
    }
}
</script>