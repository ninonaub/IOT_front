<template>
  <v-card
    :loading="!ready"
    elevation="4"
    shaped
    color="cell2"
  >
    <v-row class="pa-2" align="center">
      <v-col class="px-1 py-0 capitalize title--2" >{{location}}</v-col>
      <v-col class="px-1 py-0" v-if="!onlyCurrent">
        <v-select
          v-model="display"
          :items="display_list"
          item-text="name"
          label="Outlined style"
          outlined
          hide-details
          dense
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-if="display['value'] == 'current' && ready" class="m-0">
      <v-col class="px-1 py-0">
        <v-card-text  align="left">
          <div >Heure locale : {{ getTimezone(weather.current.timezone) }}</div>
          <div class="v-col grey--text text--darken-2 text-subtitle-2"> {{ weather.current.weather.description }} </div>
          <div class="my-4 text-subtitle-1"> {{ weather.current.temp + ' °C' }} </div>
          
        </v-card-text>
      </v-col>
      <v-col cols="6" sm="4" v-if="weather.current && weather.current.weather && weather.current.weather.icon" > 
        <v-img :src="'https://www.weatherbit.io/static/img/icons/'+ weather.current.weather.icon +'.png'" :alt="weather.current.city_name + ' ' + weather.current.weather.description" max-width="150px"/>
      </v-col>
    </v-row>
    <v-row v-if="display.value == 'hourly'  && ready" class="ma-0" style="overflow: auto scroll; max-height: 400px;">
      <v-card-text  align="left">
      <v-row v-for="(hour, i) in weather.hourly" :key="'hour'+i" class="ma-0" align="center">
        
        <v-col v-html="getLocalDateTime(hour.timestamp_local)"></v-col>
        <v-col class="grey--text text--darken-2 text-subtitle-2" >{{ hour.weather.description }}</v-col>
        <v-col cols="auto" class="text-subtitle-1"> {{ hour.temp + ' °C' }}</v-col>
        <v-col cols="auto">
          <v-img :src="'https://www.weatherbit.io/static/img/icons/'+ hour.weather.icon +'.png'" :alt="hour.city_name + ' ' + hour.weather.description" max-width="25px"/>
        </v-col>
      </v-row>
      </v-card-text>
    </v-row>
    <v-row v-if="display.value == 'daily' && ready" class="m-0" style="overflow: auto scroll; max-height: 400px;">
      <v-card-text  align="left">
      <v-row v-for="(hour, i) in weather.daily" :key="'hour'+i" class="ma-0" align="center">
        
        <v-col v-html="getLocalDate(hour.datetime)"></v-col>
        <v-col class="grey--text text--darken-2 text-subtitle-2" >{{ hour.weather.description }}</v-col>
        <v-col cols="auto" class="text-subtitle-1"> {{ hour.temp + ' °C' }}</v-col>
        <v-col cols="auto">
          <v-img :src="'https://www.weatherbit.io/static/img/icons/'+ hour.weather.icon +'.png'" :alt="hour.city_name + ' ' + hour.weather.description" max-width="25px"/>
        </v-col>
      </v-row>
      </v-card-text>
    </v-row>
    
  </v-card>
</template>
<script>

export default {
    name: 'WeatherCard',
    props:{
      'location': {},
      'onlyCurrent': {type: Boolean, default: false}
    },
    data: () => ({
      display_list: [{
        name: "Aujourd'hui",
        value: "current"
      },
      {
        name: "Par heures",
        value: "hourly"
      },
      {
        name: "Par jours",
        value: "daily"
      }
      ],
      display: {
        name: "Aujourd'hui",
        value: "current"
      },
      weather:{
        current: null,
        hourly: null,
        weekly: null,
      },      
      ready: false,
    }),
    watch:{
      display(){
        this.getWeather()
      }
    },
    methods:{
      getWeather(emit = false){
        if (this.weather[this.display.value] == null){
          this.ready = false
          this.$apiWeather(this.location, this.display.value)
            .then((res)=>{
              this.weather[this.display.value] = res
              this.ready = true
              if (emit)
                this.$emit('ready')
            })
        }
       
      },
      getLocalDateTime(date){
        return new Date(date).toLocaleString('fr', {'weekday': 'short', 'month': 'short', day: '2-digit', hour: '2-digit'})
      },
      getLocalDate(date){
        return new Date(date).toLocaleString('fr', {'weekday': 'short', 'month': 'short', day: '2-digit'})
      },
      getTimezone(timezone){
        var moment = require('moment-timezone');
        return moment().tz(timezone).format('HH:mm:ss');
      }
    },
    created(){
      this.getWeather(true)
    }
}
</script>