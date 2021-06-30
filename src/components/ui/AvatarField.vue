<template>
    <div>
        <v-menu max-width="300px" offset-y :disabled="disabled" :max-height="menuHeight">
            <template v-slot:activator="{ on }">
                <div :style="{height: `${height}px`, width: `${height}px`}">
                    <v-img
                        v-if="new_val"
                        style="border-radius: 50%"
                        :height="height"
                        :width="height"
                        class="elevation-2"
                        :src="require('@/assets/avatars/'+ new_val)"
                        v-on="on"
                    ></v-img>
                    <v-icon v-on="on" v-show="!new_val" :size="height">mdi-account-circle</v-icon>
                </div>
              </template>
              <div class="cell2">
                  <v-row class="m-0" align="center">
                      <v-col :key="avatar" v-for="avatar in avatars" cols="4" class="pointer" @click="new_val = avatar" align="center">
                        <v-img
                            style="border-radius: 50%"
                            :height="50"
                            :width="50"
                            class="elevation-2"
                            :src="require('@/assets/avatars/'+avatar)"
                        ></v-img>
                      </v-col>
                  </v-row>
              </div>
          </v-menu>
    </div>
</template>
<script>
export default {
    name: 'AvatarField',
    props: {
        value: {},
        disabled: {type: Boolean, default: false },
        height: {default: '50'},
        menuHeight: {default: '400'},
    },
    data(){
        return {
            avatars: ['bird.jpg', 'deer.jpg', 'flowers.jpg', 'jellyfish.jpg', 'leeves.jpg', 'mountains.jpg', 'river.jpg', 'sea.jpg', 'snow.jpg', 'trees.jpg', 'whale.jpg']
        }
    },
    computed: {
        new_val: {
            get(){
                return this.value
            },
            set(val){
                this.$emit('input', val)
            }
        }
    }


}
</script>
