<template>
  <v-container  id = 'myContainer'  class="fill-height">
 
    <v-col class = " d-flex flex-column justify-center " >
      <v-row class = "d-flex justify-center pa-10">
          <img src="@/assets/cover_logo.png " width="300">
      </v-row>
      <v-banner v-if= "stateStore.poe_wattage_used == 0" id='alert' lines="one" class = "d-flex justify-center" >
          <v-col >
            <v-row class = "d-flex justify-center pa-10">  
              <div v-if = "stateStore.waiting_for_poe_to_turn_on == false" class = 'text-h5'>PoE Power is OFF</div>
              <div v-else class = 'text-h5 text-green'>Wait...Powering Up</div>

            </v-row>
            <v-row class = "d-flex justify-center ">
              <v-btn color="green" @click = "stateStore.power_poe('on')"> <v-icon>mdi-power</v-icon>Turn ON PoE Power</v-btn>
            </v-row>
          </v-col>
      </v-banner>
      <v-row >
          <v-col  class = " d-flex justify-center ma-6 ">
              <button class = "button-round" @click = "selectZone('patio')">Patio</button>
          
          </v-col>
          <v-col  class = " d-flex justify-center ma-6 ">
              <button class = "button-round" @click = "selectZone('main')">Main</button>
          </v-col>
            <v-col  class = " d-flex justify-center ma-6 ">
              <button class = "button-round" @click = "selectZone('all')">All</button>
          </v-col>

      </v-row>

    </v-col>
        <PowerOnOffGroupButton></PowerOnOffGroupButton>
        
    <v-snackbar
      v-model="stateStore.snackbar_poe"
      :timeout="10000"
      :color= "stateStore.waiting_for_poe_to_turn_on ? 'green' : 'red'"
    >
      {{stateStore.snackbar_poe_text }}

    </v-snackbar>

  </v-container>
</template>

<script >
  import { useStateStore} from '@/stores/StateStore'
  import PowerOnOffGroupButton from '@/components/PowerOnOffGroupButton.vue';


  export default {
  name: "Zones",
  components:{PowerOnOffGroupButton},

  setup(){
    // Pinia
      const stateStore = useStateStore()
      return {stateStore}
    },

  data: () => ({
    
  }),
  methods: {
    selectZone(_zone){
      if(_zone == 'patio'){
          this.stateStore.changePage('patio')
          this.$router.push('/patio')
      }else if(_zone == 'main'){
          this.stateStore.changePage('main')
          this.$router.push('/main')
      }else if(_zone =='all'){
          this.stateStore.selectAll()
          this.stateStore.rxSelectedLabel = 'ALL Displays'
          this.$router.push('/videoinputs')

      }
    }
  },
    created(){
      this.stateStore.getNodeQuery() //call immediatly 1st time
      this.getSwitchStatus = setInterval(this.stateStore.get_SwitchStatus,5000) //repeat. 
    },
    beforeUnmount(){
      console.log('stop SwitchStatus')
      clearInterval(this.getSwitchStatus)

    }
};


  
</script>

<style scoped>

/* .border-color{
   border-style: solid ;
   border-color: red;

} */
#myContainer{
  position: relative;
}
#alert{
  position:absolute;
  left:25%;
  width:50%;
  height: 50%;
  z-index: 10;
}
 .button-round{
   font-size: 1.5rem;
   height:200px;
   width:200px;
   border-radius: 50%;
   color:white;
   border-style: solid ;
   border-color: white;
   border-width: 1.5px;
}
.button-round:hover{
  background-color: #212121;
  color: white;
}
/* .roundBtn:hover {
  background-color:#2196f3 !important;
} */

</style>
