<template>
    <v-row class="text-center m-2 p-0 elevation-4 rounded-lg cell" style="overflow: hidden;">
      <v-col class="px-0 py-0" cols="12">
        <v-row class="m-0">
          <v-col :style="$route.name !== 'Weather' ? {cursor: 'pointer'}: {}" class="title--1" @click="$route.name !== 'Weather' ? $router.push('/weather'): null ">Météo</v-col>
      
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
            v-for="(location) in locations"
            :key="location"
          >
           <WeatherCard :location="location" @ready="ready--" onlyCurrent />
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" sm="6" class="py-4" v-for="location in locations" :key="location" v-show="ready == 0" v-else>
        <WeatherCard :location="location" @ready="ready--" />
      </v-col>
      <v-col  v-if="mode !== 'carousel' && ready ===0" style="align-self: center;">
        <v-row align="center" style="padding-left: 4rem;">
          <v-icon size="70" class="pointer" @click="action = 'create'; dialog = true">mdi-plus-circle</v-icon>
          <span class="pointer" @click="action = 'add'; dialog = true" >Ajouter un lieux</span>
        </v-row>
        <v-row align="center" style="justify-content: flex-end;padding-right: 4rem; margin-top: 0;">
          <span class="pointer" @click="action = 'delete'; dialog = true">Supprimer un lieux</span>
          <v-icon size="70" class="pointer" @click="action = 'delete'; dialog = true">mdi-delete-circle</v-icon>
        </v-row>
      </v-col>
      <v-col  v-if="ready !== 0" >
        <v-progress-circular class="v-col" :size="70" :width="7" color="amber" indeterminate />
      </v-col>


      <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{action === 'delete' ? 'Suppression d\'une localisation': 'Ajout d\'une localisation'}}
        </v-card-title>
        <v-card-text>
          {{action === 'delete' ? 'Êtes-vous sûr de vouloir supprimer ?': 'Veuillez donner une adresse complète.'}}
          <v-text-field
            v-if="action === 'create'"
            class="pt-4"
            v-model="create_form"
            label="Localisation"
          ></v-text-field>
          <v-select
            v-if="action === 'delete'"
            class="pt-4"
            v-model="delete_form"
            :items="locations"
            label="Localisations"
          ></v-select>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            @click="dialog = false; create_form = ''; delete_form = []"
          >
            Annuler
          </v-btn>
          <v-btn
            color="green darken-1"
            :disabled="action === 'delete' ? delete_form.length === 0 : !create_form "
            @click="action === 'delete' ? deleteLocation(): createLocation()"
          >
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
</template>
<script>
import WeatherCard from '@/components/weather/WeatherCard.vue'

export default {
    name: 'WeatherHandler',
    components: {WeatherCard},
    props: ['mode'],
    data: () => ({
      locations: ['Lyon, France', 'New York, USA', 'Bruxelles, Belgique'],
      ready: -1,
      dialog: false,
      action: null,
      create_form: '',
      delete_form: []
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