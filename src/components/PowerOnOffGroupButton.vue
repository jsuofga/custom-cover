<template>
        <v-btn-toggle id = 'group-btn' rounded="xl"  variant="outlined"   >
            <v-btn size = "large"  @click = "powerPOE('on')" >
                <v-icon color="green">mdi-power</v-icon>
                <small class = "text-green">PoE On</small>
            </v-btn>
    
            <v-btn  size = "x-large" @click = "powerPOE('off')" >
                <v-icon color="red">mdi-power</v-icon> 
                <small class = "text-red">PoE Off</small>
            </v-btn>
      </v-btn-toggle>

</template>

<script >
  import { useStateStore} from '@/stores/StateStore'

  export default {
  name: "PowerOnOffGroupButton",
  components:{},

  setup(){
    // Pinia
      const stateStore = useStateStore()
      return {stateStore}
    },

  data: () => ({
    
  }),
  methods: {
    powerPOE(_onOff){
      this.stateStore.power_poe(_onOff)
      // this.stateStore.snackbarCeC = true
    }
    
  },

  //Life Cycle Hooks
  created(){

  },
  mounted(){

 
  },
  beforeUnmount(){
  }

  
};
  
</script>

<style scoped>

#group-btn{

  position:absolute;
  bottom:50px;
  left:0%;
  transform:translate(10%,50%)
}


</style>
