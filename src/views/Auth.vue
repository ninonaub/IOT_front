<template>
  <v-container>
    <div>
      <Login :users="users" @user="(user)=> {setUser(user)}" />
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
        users: [{name: 'teste'}, {name: 'teste2', src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVVAo-2YGfwSSF6sjml8gjFwtePqVcsCrFBg&usqp=CAU"}],
      }
    },
    methods:{
      getUsers(){

      },
      setUser(user){
        console.log(user)
        this.$store.commit('CHANGEUSER', user)
        this.$router.push('/')
      },
      createUser(user){
        console.log(user)
      }
    }
  }
</script>
