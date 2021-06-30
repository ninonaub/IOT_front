<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab color="white" height="28px" small width="28px" v-bind="attrs" v-on="on">
                    <v-icon color="primary">mdi-account</v-icon>
                </v-btn>
            </template>
            <div class="cell2">
                <v-row
                    class="m-0"
                    align="center"
                    justify="center"
                >
                    <v-col style="max-height: 120px; max-width: 110px; padding: 10px 5px;" align-self="center" align-items="center">
                        <v-img
                            v-if="user.image"
                            style="border-radius: 50%"
                            height="100px"
                            width="100px"
                            class="elevation-2"
                            :src="require('@/assets/avatars/'+user.image)"
                        ></v-img>
                        <v-icon v-else size="100">mdi-account-circle</v-icon>
                    </v-col>
                    <v-col cols="12" class="text-center px-1 py-1 title--2">{{user.username}}</v-col>
                </v-row>
                <v-divider class="pb-2" />
                <v-row class="m-0 px-2 pb-2">
                    <v-btn style="width: 100%" color="cell3"  @click="() => { $vuetify.theme.dark = !$vuetify.theme.dark; $store.commit('CHANGEDARKMODE', $vuetify.theme.dark)}">
                        <v-icon color="primary" class="pr-2">mdi-weather-night</v-icon>
                        Mode sombre
                    </v-btn>
                </v-row>
                <v-row class="m-0 px-2 pb-2">
                    <v-btn style="width: 100%" color="cell3"  @click="() => { $router.push('/profile')}">
                        <v-icon color="primary" class="pr-2">mdi-cog</v-icon>
                        Paramètres
                    </v-btn>
                </v-row>
                <v-row class="m-0 px-2 pb-2">
                    <v-btn style="width: 100%" color="cell3"  @click="() => { $router.push('/auth')}">
                        <v-icon color="primary" class="pr-2">mdi-logout</v-icon>
                        Changer de compte
                    </v-btn>
                </v-row>
                
            </div>
        </v-menu>
    </div>
</template>
<script>
  export default {
    name: 'UserMenu',
    computed:{
        user(){
            return this.$store.state.user
        }
    }
 
  }
</script>
