<template>
  
  <v-container id="myContainer" fluid class="fill-height" >

    <v-banner v-if= "blackoutScreen" id='alert' lines="one" class = "d-flex justify-center" >
        <v-col >
          <v-row class = "d-flex justify-center pa-10">  
            <div class = 'text-h5'>Main TVs are blacked out</div>
          </v-row>
          <v-row class = "d-flex justify-center ">
            <v-btn color="green" @click = "selectPlayBlackOut('play')"> <v-icon>mdi-play</v-icon>Resume | Play</v-btn>
            </v-row>
        </v-col>
   
    </v-banner>
   
    <v-row id='row-1' class="myRow">
      <v-col class="myCol d-flex justify-center"><StageProjectors :rxID_left = "19" :rxID_right = "20"/></v-col>

    </v-row>
    <v-row class="myRow">
      <v-col cols="2"  class="myCol d-flex align-start shift-up"><DisplayRX class = "rotate-ccw projector" rxLabel = 'TV18' rxID = '18' /> </v-col>
       <v-col id = "djbooth" cols="2" class="myCol d-flex justify-center" >
         <button class="button-merge-3" @click = "merge3FrontDisplays()"><v-icon icon="mdi-numeric-3" size="30"></v-icon></button>
          <DisplayRX  rxLabel = 'DJ Booth' rxID = '21' /></v-col>
       
      <v-col class="myCol d-flex justify-center"><v-chip id="bar" class="d-flex justify-center">BAR</v-chip> </v-col>
      <v-col cols="2" class="myCol" > </v-col>
      <v-col cols="2" class="myCol d-flex justify-end shift-up" > <DisplayRX class = "rotate-cw projector" rxLabel = 'TV17' rxID = '17' /></v-col>
    </v-row>

    <v-row class="myRow">
       <v-col class="myCol"><DisplayRX class = "rotate-ccw" rxLabel = 'TV1' rxID = '1' />  </v-col>
      <v-col class="myCol"> </v-col>
      <v-col class="myCol"> </v-col>
      <v-col class="myCol d-flex justify-end" ><DisplayRX class = "rotate-cw" rxLabel = 'TV16' rxID = '16' /> </v-col>
    </v-row>
    <v-row class="myRow">
      <v-col class="myCol ">  <DisplayRX class = "rotate-ccw" rxLabel = 'TV2' rxID = '2' /></v-col>
      <v-col class="myCol"></v-col>
      <v-col class="myCol"> </v-col>
      <v-col class="myCol d-flex justify-end" ><DisplayRX class = "rotate-cw" rxLabel = 'TV15' rxID = '15' /> </v-col>
    </v-row>

    <v-row class="myRow">
      <v-col class="myCol ">  <DisplayRX class = "rotate-ccw" rxLabel = 'TV3' rxID = '3' /></v-col>
      <v-col class="myCol"></v-col>
      <v-col class="myCol"> </v-col>
      <v-col class="myCol d-flex justify-end" ><DisplayRX class = "rotate-cw" rxLabel = 'TV14' rxID = '14' /> </v-col>
    </v-row>

    <v-row class="myRow">
      <v-col class="myCol"> <DisplayRX class = "rotate-ccw" rxLabel = 'TV4' rxID = '4' /></v-col>
      <v-col class="myCol"> </v-col>
      <v-col class="myCol"> </v-col>
      <v-col class="myCol d-flex justify-end " ><DisplayRX class = "rotate-cw" rxLabel = 'TV13' rxID = '13' /> </v-col>
    </v-row>

    <v-row class="myRow">
      <v-col class="myCol"> <DisplayRX class = "rotate-ccw" rxLabel = 'TV5' rxID = '5' /></v-col>
      <v-col class="myCol d-flex justify-center "><button class="button-merge-6" @click = "merge6BackDisplays()"><v-icon icon="mdi-arrow-expand-horizontal" size="30"></v-icon></button> </v-col>
      <v-col class="myCol d-flex justify-end " ><DisplayRX class = "rotate-cw" rxLabel = 'TV12' rxID = '12' /></v-col>
    </v-row>

    <v-row class="myRow">
      <v-col class="myCol"></v-col>
      <v-col class="myCol"></v-col>
      <v-col class="myCol d-flex justify-center"><DisplayRX  rxLabel = 'TV6' rxID = '6' /></v-col>
      <v-col class="myCol d-flex justify-center"><DisplayRX  rxLabel = 'TV7' rxID = '7' /></v-col>
      <v-col class="myCol d-flex justify-center"><DisplayRX  rxLabel = 'TV8' rxID = '8' /></v-col>
      <v-col class="myCol d-flex justify-center"><DisplayRX  rxLabel = 'TV9' rxID = '9' /></v-col>
      <v-col class="myCol d-flex justify-center"><DisplayRX  rxLabel = 'TV10' rxID = '10' /></v-col>
      <v-col class="myCol d-flex justify-center"><DisplayRX  rxLabel = 'TV11' rxID = '11' /></v-col>
      <v-col class="myCol"></v-col>
      <v-col class="myCol"></v-col>

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
  //
  import DisplayRX from '@/components/DisplayRX.vue'
  import StageProjectors from '@/components/StageProjectors.vue'
  import { useStateStore} from '@/stores/StateStore'

  export default {
    name: "Main",
    components: {DisplayRX,StageProjectors},
    setup(){
      // Pinia
        const stateStore = useStateStore()
        return {stateStore}
      },

    data: () => ({
        
    }),
    computed:{
       blackoutScreen:function(){
        let testArray =[]

        this.stateStore.rxIDs_main.forEach((rx)=>{
          // console.log(this.stateStore.rxParams[rx]['display'])
          if(this.stateStore.rxParams[rx]['display'] ==2){
           testArray.push('pause')
         }else if(this.stateStore.rxParams[rx]['display'] == 0){
          //  testArray.pop()
         }

        })
        // console.log(testArray)
        return testArray.length !=0 ? true : false

     }
    
    
    },

    methods: {

      selectPlayBlackOut(_mode){
        this.stateStore.play_blackout(_mode)
      },

     merge3FrontDisplays(){
        this.stateStore.mergeType = '3'
        this.stateStore.rxSelectedLabel = `Front 3 Displays`
        this.stateStore.rxIdsToMerge = [19,20,21]
        this.$router.push('/videoinputs')
      },
    merge6BackDisplays(){
        this.stateStore.mergeType = '6'
        this.stateStore.rxSelectedLabel = `Back 6 Displays`
        this.stateStore.rxIdsToMerge = [6,7,8,9,10,11]
        this.$router.push('/videoinputs')
      }

    },
  async created(){
      console.log('start getRxStatus')
      await this.stateStore.getNodeQuery() //call immediatly 1st 
      this.stateStore.getFeedback()
      this.getRxStatus = setInterval(this.stateStore.getFeedback,5000) //repeat. 
      // this.snapShot = setInterval(this.changeBackgroundImage,2500)
    },
    beforeUnmount(){
      console.log('stop getRxStatus')
      clearInterval(this.getRxStatus)
      //clearInterval(this.snapShot)
    }

  }
</script>

<style scoped>

#myContainer{
  position: relative;
}
#alert{
  position:absolute;
  left:25%;
  width:50%;
  height: 50%;
}
#myFab{
  position:absolute;
  right:10px;
  bottom:20px;
  color: black;
}
.button-play-pause{
  background-color:white;
}
.myCol{
   /* border:solid 1px blue;  */
}
.myRow{
  width:100%;
}
.rotate-cw{
   rotate:90deg;
}
.rotate-ccw{
   rotate:-90deg;
}
#bar{
  font-size: 20px;
  width:80%;
  height: 100%;
  background-color: grey;
  color:white;

}

#row-1{
  margin-bottom: 0px;
}
.shift-up{
  position: relative;
}
.projector{
  position:absolute;
  bottom:50px;
}
.button-merge-3{
  position: absolute;
  top:20%;
  right:-10%;
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
.button-merge-6{
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
.button-merge-3:hover {
  background-color: rgb(52,199,89);
  color: white;
}
.merged{
  border:none;
  background-color:rgb(0,122,255);
}
#djbooth{
  position: relative;
}

</style>




