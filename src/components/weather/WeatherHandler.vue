<template>
    <v-row class="text-center m-2 p-0 elevation-4 rounded-lg cell" style="overflow: hidden;">
      <v-col class="px-0 py-0" cols="12">
        <v-row class="m-0">
          <v-col  class="title--1">Météo</v-col>
          <v-col cols="auto" v-if="modify === true">
            <v-menu offset-y max-width="200px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab color="cell3" small v-bind="attrs" v-on="on">
                  <v-icon color="primary">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <div class="cell2">
                  <v-row class="m-0">
                      <v-col cols="12" style="cursor: pointer" @clisk="modify = !modify">
                        <v-icon color="primary" class="pr-2">mdi-pencil</v-icon>
                        Modifier
                      </v-col>
                      <div style="height: 1px; width: 100%;" class="cell4" />
                      <v-col cols="12" @click="()=> {}" style="cursor: pointer">
                        <v-icon color="primary" class="pr-2">mdi-plus</v-icon>
                        Ajouter un lieux
                      </v-col>
                  </v-row>
              </div>
          </v-menu>
          </v-col>
        </v-row>
        
        
      </v-col>
      <v-col cols="12" sm="6" class="py-4" v-for="location in locations" :key="location" v-show="ready == 0">
        <WeatherCard :location="location" @ready="ready--" onlyCurrent />
      </v-col>
      <v-col  v-if="ready !== 0" >
        <v-progress-circular class="v-col" :size="70" :width="7" color="amber" indeterminate />
      </v-col>
    </v-row>
</template>
<script>
import WeatherCard from '@/components/weather/WeatherCard.vue'

export default {
    name: 'Weather',
    components: {WeatherCard},
    props: ['mode'],
    data: () => ({
      locations: ['Lyon, France', 'New York, USA', 'Bruxelles, Belgique'],
      ready: -1,
      modify: false
    }),
    methods:{
      getLocations(){

      },
      deleteLocation(){

      },
      createLocation(){

      }
    },
    created(){
        this.ready = this.locations.length
    }
}
</script>