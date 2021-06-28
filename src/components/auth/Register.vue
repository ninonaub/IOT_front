<template>
  <v-row class="text-center">
    <v-col cols="12" class="pt-6 pb-0">Créer un compte</v-col>
    <v-col>
      <v-btn color="primary" @click="dialog = true">
        Inscription
      </v-btn>
      <v-dialog
        v-model="dialog"
        max-width="500"
      >
        <v-card>
          <v-card-title class="text-h5">
            Insription
            <v-spacer />
            <v-btn fab color="error" small @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          </v-card-text>
          <v-form
            ref="form"
            @submit.prevent="submit"
          >
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="form.name"
                    :rules="rules.name"
                    label="Nom"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="red darken-1"
                @click="resetForm"
              >
                Annuler
              </v-btn>

              <v-btn
                :disabled="!formIsValid"
                color="green darken-1"
                type="submit"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: 'Register',
    data () {
      const defaultForm = Object.freeze({
        name: '',
       
      })

      return {
        dialog:false,
        form: Object.assign({}, defaultForm),
        rules: {
          age: [
            val => val < 10 || `I don't believe you!`,
          ],
          name: [val => (val || '').length > 0 || 'Ce champs est requis'],
        },
        snackbar: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.name
        )
      },
    },

    methods: {
      resetForm(){
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit(){
        this.snackbar = true
        this.$emit('newUser', this.form)
        this.resetForm()
      },
    } 
  }
</script>
