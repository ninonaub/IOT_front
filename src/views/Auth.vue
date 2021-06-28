<template>
  <v-container>
    <div>
      <v-row justify="center" v-if="!ready" >
        <v-progress-circular class="v-col" :size="70" :width="7" color="amber" indeterminate />
      </v-row>
      <template v-else>
        <v-row justify="center" v-if="users.length === 0" >
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
    name: 'Home',
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
          })
        this.$store.commit('CHANGEUSER', user)
        this.$router.push('/')
      },
      createUser(user){
        let data = {'username': 'Mm', 'micro': true, 'led': true, alarm: true, city: 'Lyon, France', 'audio': true, active: false }//users (username, micro, led, alarm, city, audio, active) VALUES (?,?,?,?,?,?,?)",
        this.$post('user', data)
          .then((res)=> {
            console.log(res)
          })
      }
    },
    created(){
      this.getUsers()
      this.createUser()
    }
  }
</script>
