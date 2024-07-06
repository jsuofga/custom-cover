<template>
  <v-app-bar elevation="2" height="50" >
                 <v-app-bar-title class="d-flex justify-space-around">
                      <v-container>
                          <v-row class = "d-flex align-center">
                            <v-col class = "pa-0" >
                                <div class = "text-caption">Design By</div>
                            </v-col>
                            <v-col class = "pa-0">
                                <v-img src="@/assets/andmt_logo.png" width = '80' height="80"> </v-img>

                            </v-col>
         
                          </v-row>
                      </v-container>
                 </v-app-bar-title>
                <v-chip>2.1</v-chip>
                <v-btn icon="mdi-upload" @click= "this.$router.push('/accesscontrol')"></v-btn>

  </v-app-bar>
</template>

<script >
  import { useStateStore} from '@/stores/StateStore'
  export default {
    name: "AppBar",
    components:{},
    setup(){
      // Pinia
        const stateStore = useStateStore()
        return {stateStore}
      },

    data: () => ({
        
    }),
    methods: {

    },
};
</script>
