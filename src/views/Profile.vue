<template>
  <v-container>
    <v-row class="mt-6 cell rounded-lg elevation-2 pa-3">
      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3 text-center">
          Bonjour {{user.username}}
        </h1>
      </v-col>
      <v-col cols="12" sm="6" class="pa-1" hide-details >
        <AvatarField v-model="user.image" height="50" />
      </v-col>
      <v-col cols="12" sm="6" class="pa-1" hide-details >
        <v-switch
          v-model="user.micro"
          label="Micro actif"
        ></v-switch>
      </v-col>
      <v-col cols="12" sm="6" class="pa-1"  hide-details >
        <v-switch
          v-model="user.led"
          label="Lumière active"
        ></v-switch>
      </v-col>
      <v-col cols="12" sm="6" class="pa-1"  hide-details >
        <v-switch
          v-model="user.audio"
          label="Audio actif"
        ></v-switch>
      </v-col>
      <v-col cols="12" sm="6" class="pa-1"  hide-details >
        <v-switch
          v-model="user.alarm"
          label="Alarme active"
        ></v-switch>
      </v-col>
      <v-col cols="12" sm="6" class="pa-1" >
        <v-text-field
          v-model="user.city"
          label="Localisation"
          messages="Veuillez entrer une adresse commplète, en séparant la ville et le pays d'une virgule."
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-row class="m-0">
          <v-col>
            <v-btn color="red darken-1" @click="user = $store.state.user">
              Annuler
            </v-btn>
            <v-btn :disabled="!change" color="green darken-1" @click="updateUser()" class="ml-4" >
              Valider
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="cell3" @click="dialog = true" >
              Supprimer le compte
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Suppression d'un compte
        </v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer l'utilisateur {{user.username}} ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            @click="dialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="green darken-1"
            @click="deleteUser()"
          >
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import AvatarField from '@/components/ui/AvatarField.vue'
  export default {
    name: 'Profile',
    components: { AvatarField},
    data() {
      return {
        user: this.$store.state.user,
        dialog: false,
        change: false,
      }
    },
    watch:{
      user:{
        deep: true,
        handler(val){
          let change = 0
          Object.keys(val).forEach(e => {
            if (val[e] !== this.$store.state.user[e])
              change ++
          })
          this.change = change !== 0
        }
      }
    },
    methods:{
      updateUser(){
        let data = {
          'username': this.user.username,
          'micro': this.user.micro ? 'ON': 'OFF',
          'led': this.user.led ? 'ON': 'OFF',
          'alarm': this.user.alarm ? 'ON': 'OFF', 
          'city': this.user.city,
          'audio': this.user.audio ? 'ON': 'OFF',
          'active': this.user.active ? 1 : 0
        }
        this.$put('user', data)
          .then((res)=>{
            if (res === 'Update successfully'){
              this.$store.commit('CHANGEUSER', this.user)
              this.$store.dispatch('changeSnackbar', [true, res, 'success'])
            }
            else {
              this.$store.dispatch('changeSnackbar', [true, res, 'error'])
            }
              
          })
      },
      deleteUser(){
        this.$del('user', {username: this.$store.state.user.username})
          .then((res)=> {
            if (res === 'Delete successfully'){
              this.dialog = false
              this.$store.commit('CHANGEUSER', {username: '', dark_mode: true})
              this.$store.dispatch('changeSnackbar', [true, res, 'success'])
              this.$router.push('/auth')
            }
            else {
              this.$store.dispatch('changeSnackbar', [true, res, 'error'])
              this.dialog = false
            }
          })
      }
    },
    created(){
      this.user = JSON.parse(JSON.stringify(this.$store.state.user))
    }
    
  }
</script>
