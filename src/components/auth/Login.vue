<template>
  <v-row class="text-center">
    <v-col class="text-h3 pt-6" >
      Utilisateurs
    </v-col>
    <v-carousel 
        v-model="model" 
        cycle
        interval="5000"
        hide-delimiter-background 
        show-arrows-on-hover 
        height="320"
        :light="!$store.state.user['dark_mode']"
    >
      <v-carousel-item
        v-for="(user) in users"
        :key="user.name"
      >
        <!-- <v-sheet
          :color="user.color ? user.color : ''"
          height="100%"
          tile
        > -->
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-col cols="auto" style="height: 200px;" align-self="center" align-items="center">
              <v-img
                v-if="user.src"
                style="border-radius: 50%"
                height="200"
                width="200"
                class="elevation-2"
                :src="user.src"
                @click="$emit('user', user)"
              ></v-img>
              <v-icon @click="$emit('user', user)" v-else size="200">mdi-account-circle</v-icon>
            </v-col>
            <v-col @click="$emit('user', user)" cols="12" class="text-h4 pb-6">
              {{user.username}}
            </v-col>
          </v-row>
        <!-- </v-sheet> -->
      </v-carousel-item>
    </v-carousel>
  </v-row>
</template>
<script>
  export default {
    name: 'Login',
    props:['users'],
    data(){
      return {
        model: 0,
      }
    },
    computed:{

    }
 
  }
</script>
