<template>
  <v-container id="myContainer" fluid class = "fill-height">

        <v-banner v-if= "blackoutScreen" id='alert' lines="one" class = "d-flex justify-center" >
          <v-col >
          <v-row class = "d-flex justify-center pa-10">  
            <div class = 'text-h5'>Patio TVs are blacked out</div>
          </v-row>
          <v-row class = "d-flex justify-center ">
            <v-btn color="green" @click = "selectPlayBlackOut('play')"> <v-icon>mdi-play</v-icon>Resume | Play</v-btn>
            </v-row>
          </v-col>
        </v-banner>
        <v-banner v-else-if= "stateStore.poe_wattage_used == 0" id='alert' lines="one" class = "d-flex justify-center" >
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

        <v-row class = "d-flex justify-center">
          <DisplayRX class = "rotate-cw" rxLabel = 'TV26' rxID = '26' />
        </v-row>
        <v-row id='row-door' class='myRow d-flex justify-center'>
          <v-chip id="door" class="d-flex justify-center">Door</v-chip>
        </v-row>

      <v-row id='row-2' class='myRow d-flex justify-center'>
        <button class="button-merge-2-patio" @click = "merge2PatioDisplays('24and25')"><v-icon icon="mdi-arrow-expand-vertical" size="30"></v-icon></button>
        <DisplayRX class = "rotate-cw" rxLabel = 'TV25' rxID = '25' />
      </v-row>



        <v-row id = 'row-3' class='myRow d-flex justify-center'>
          <DisplayRX class = "rotate-cw" rxLabel = 'TV24' rxID = '24' />
      </v-row>

      <v-row id = "row-4" class='myRow d-flex justify-center'>
        <button class="button-merge-2-patio" @click = "merge2PatioDisplays('22and23')"><v-icon icon="mdi-arrow-expand-vertical" size="30"></v-icon></button>
        <DisplayRX class = "rotate-cw " rxLabel = 'TV23' rxID = '23' />
      </v-row>



        <v-row id = "row-5" class='myRow d-flex justify-center' >
          <DisplayRX class = "rotate-cw" rxLabel = 'TV22' rxID = '22' />
      </v-row>



    <!-- Floating Action Button -->
        <v-btn-toggle id='myFab' >
          <v-btn class = 'button-play-pause' @click = "selectPlayBlackOut('play')">
            <v-icon>mdi-play</v-icon>
            play
          </v-btn>

          <v-btn class = 'button-play-pause' @click = "selectPlayBlackOut('blackout')">
            <v-icon>mdi-stop</v-icon>
            dark
          </v-btn>
        </v-btn-toggle>
    
  </v-container>
</template>

<script>
  import { useStateStore} from '@/stores/StateStore'
  import StageProjectors from '@/components/StageProjectors.vue'
  import DisplayRX from '@/components/DisplayRX.vue'

  export default {
    name: "Patio",
    props:[],
    components:{StageProjectors,DisplayRX},
    setup(){
      // Pinia
        const stateStore = useStateStore()
        return {stateStore}
      },
    data: () => ({
      
    }),
    methods: {
        selectPlayBlackOut(_mode){
        this.stateStore.play_blackout(_mode)
      },
       merge2PatioDisplays(_mergeSelect){
        this.stateStore.mergeType = '2'
        if(_mergeSelect == '22and23'){
            this.stateStore.rxSelectedLabel = `Patio TV 22 | 23`
            console.log(`Patio TV 22 | 23`)
            this.stateStore.rxIdsToMerge = [22,23]
        }else if('24and25'){
            this.stateStore.rxSelectedLabel = `Patio TV 24 | 25`
            console.log(`Patio TV 24 | 25`)
            this.stateStore.rxIdsToMerge = [24,25]
        }
        this.$router.push('/videoinputs')
      },

    },
  computed:{
       blackoutScreen:function(){
        let testArray =[]

        this.stateStore.rxIDs_patio.forEach((rx)=>{
          // console.log(this.stateStore.rxParams[rx]['display'])
          if(this.stateStore.rxParams[rx]['display'] ==2){
           testArray.push('pause')
         }else if(this.stateStore.rxParams[rx]['display'] == 0){
         }

        })
        // console.log(testArray)
        return testArray.length !=0 ? true : false

     }
    
    
    },
  async created(){
      console.log('start getNodeQuery')
      this.stateStore.getNodeQuery() //call immediatly 1st time
      this.getNodeQueryStatus = setInterval(this.stateStore.getNodeQuery,5000) //repeat. 
      console.log('start getSwitchStatus ')
      this.getSwitchStatus = setInterval(this.stateStore.get_SwitchStatus,5000) //repeat. 
    },
    beforeUnmount(){
      console.log('stop getNodeQueryStatus')
      clearInterval(this.getNodeQueryStatus)
      console.log('stop SwitchStatus')
      clearInterval(this.getSwitchStatus)

    }
   
  };

</script>

<style scoped>
#myContainer{
  /* border: solid 1px green; */
  position: relative;
}
#alert{
  position:absolute;
  left:25%;
  width:50%;
  height: 50%;
  z-index: 10;
}
#myFab{
  position:absolute;
  right:50px;
  bottom:20px;
  color: black;
}
.button-play-pause{
  background-color:white;
}
.myRow{
  /* border: solid 1px red; */
  margin:0px;
  width:100%
}
.myCol{
  border: solid 1px blue;
  margin:10px;
}
.rotate-cw{
   rotate:90deg;
}
#row-2,#row-3,#row-4,#row-5{
  position: relative;
  margin-top:-20px
}
#door{
  background-color: blue;
  color:white;
  width:70px;
  rotate:90deg;
}
.button-merge-2-patio{
  position: absolute;
  bottom:-115%;
  left:40%;
  border: 1px solid white;
  color: white;
  width: 50px;
  height: 50px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  border-radius: 6px;
}





</style>
