<template>
    <v-row class="text-center m-2 p-0 elevation-4 rounded-lg cell" style="overflow: hidden;">
      <v-col class="px-0 py-0" cols="12">
        <v-row class="m-0">
          <v-col :style="$route.name !== 'Alert' ? {cursor: 'pointer'}: {}" class="title--1" @click="$route.name !== 'Alert' ? $router.push('/Alert'): null ">Alertes</v-col>
          <v-col cols="auto" v-if="mode !== 'carousel'">
            <v-menu offset-y max-width="200px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab color="cell3" small v-bind="attrs" v-on="on">
                  <v-icon color="primary">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <div class="cell2">
                  <v-row class="m-0">
                      <v-col cols="12" class="pointer" @clisk="modify = !modify">
                        <v-icon color="primary" class="pr-2">mdi-pencil</v-icon>
                        Modifier
                      </v-col>
                      <div style="height: 1px; width: 100%;" class="cell4" />
                      <v-col cols="12" @click="()=> {}" class="pointer">
                        <v-icon color="primary" class="pr-2">mdi-plus</v-icon>
                        Ajouter une alerte
                      </v-col>
                  </v-row>
              </div>
          </v-menu>
          </v-col>
        </v-row>
        
        
      </v-col>
      <v-col class="px-2 py-0" v-if="mode === 'carousel'" v-show="ready == 0">
        <v-carousel 
            cycle
            interval="5000"
            hide-delimiter-background 
            show-arrows-on-hover 
            height="175"
            :light="!$store.state.user['dark_mode']"
        >
          <v-carousel-item
            v-for="(alert) in alerts"
            :key="alert"
          >
           <AlertCard @ready="ready--" />
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" sm="6" class="py-4" v-for="location in locations" :key="location" v-show="ready == 0" v-else>
        <AlertCard @ready="ready--" />
      </v-col>
      <v-col  v-if="ready !== 0" >
        <v-progress-circular class="v-col" :size="70" :width="7" color="error" indeterminate />
      </v-col>
    </v-row>
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