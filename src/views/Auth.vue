<template>
  <v-container>
    <div class="cell rounded-lg ma-2">
      <v-row justify="center" v-if="!ready" >
        <v-progress-circular class="v-col" :size="70" :width="7" color="amber" indeterminate />
      </v-row>
      <template v-else>
        <v-row class="title--2 pt-3" justify="center" v-if="users.length === 0" >
          Créez votre premier utilisateur !
        </v-row>
        <Login :users="users" @user="(user)=> {setUser(user)}" v-else/>
      </template>
      <Register @newUser="(user)=> {createUser(user)}"/>
    </div>
  </v-container>
</template>
<script>
  import Login from '../components/auth/Login.vue'
  import Register from '../components/auth/Register.vue'
  export default {
    name: 'Auth',
    components: {
      Login,
      Register
    },
    data(){
      return {
        users: [],
        ready: false
      }
    },
    methods:{
      getUsers(){
        console.log('all')
        this.$get('user/all')
          .then((res)=> {
            console.log('res',res)
            this.users = res
            this.ready = true
          })
      },
      setUser(user){
        console.log(user)
        let data = {'username': user.username }
        this.$patch('user/active', data)
          .then((res)=> {
            console.log(res)
            this.$store.dispatch('changeSnackbar', [true, res, 'success'])
          })
        this.$store.commit('CHANGEUSER', user)
        this.$router.push('/')
      },
      createUser(user){
        let data = {
          'username': user.username,
          'micro': user.micro ? 'ON': 'OFF',
          'led': user.led ? 'ON': 'OFF',
          alarm: user.alarm ? 'ON': 'OFF', 
          city: 'Lyon, France',
          'audio': user.audio ? 'ON': 'OFF',
          active: user.active ? 1 : 0
        }
        this.$post('user', data)
          .then((res)=> {
            console.log(res)
            if (res === 'Record successfully'){
              this.$store.dispatch('changeSnackbar', [true, res, 'success'])
              if(data.active)
                this.$router.push('/')
                else {
                  this.users.push(data)
                }
            }
            else {
              this.$store.dispatch('changeSnackbar', [true, res, 'error'])
            }
          })
      }
    },
    created(){
      this.getUsers()
    }
  }
</script>
