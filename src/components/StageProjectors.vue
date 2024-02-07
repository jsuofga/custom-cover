<template>
  <div class = 'stage-projectors-container'>

    <v-row class ='d-flex justify-end'>
        <v-col  class = "myCol">  </v-col>
        <v-col class = "myCol">     
            <button class="button" :class= "{merged:stateStore.rxParams[rxID_left]['vw_status'] != 0, notDetected: (stateStore.rxParams[rxID_left]['chSelect'] == 'not detected' || stateStore.rxParams[rxID_left]['chSelect'] == 'error')}" @click = "selectRX(rxID_left)">
                <div class ='rx-id'>{{rxID_left}}</div>
                <div >Front-Left</div>
                <div class ='rx-ch-select'>{{stateStore.rxParams[rxID_left]['chSelect']}}</div>
            </button></v-col>

        <v-col  class = "myCol">
             <button class="button-merge-projector" @click = "selectBothProjectors()"> <v-icon class = "rotate" icon="mdi-arrow-expand-vertical"></v-icon>
            </button> 
        </v-col>

        <v-col class = "myCol">     
            <button class="button" :class= "{merged:stateStore.rxParams[rxID_right]['vw_status'] != 0 }" @click = "selectRX(rxID_right)">
                <div class ='rx-id'>{{rxID_right}}</div>
                <div >Front-Right</div>
                <div class ='rx-ch-select'>{{stateStore.rxParams[rxID_right]['chSelect']}}</div>
            </button></v-col>
        <v-col  class = "myCol">  </v-col>
    </v-row>

  
  </div>
  

</template>

<script>
 import { useStateStore} from '@/stores/StateStore'

  export default {
    name: "StageProjectors",
    props:['rxID_left','rxID_right'],
    components:{},
    setup(){
      // Pinia
        const stateStore = useStateStore()
        return {stateStore}
      },
    data: () => ({
      
    }),
    methods: {
    selectRX(_rxID){
        this.stateStore.selectRX(_rxID)
        this.stateStore.rxSelectedLabel = `Projector-${_rxID}`
        this.$router.push('/videoinputs')
      },
    selectBothProjectors(){
        this.stateStore.mergeType = '2'
        this.stateStore.rxSelectedLabel = `Front`
        this.stateStore.rxIdsToMerge = [this.rxID_left,this.rxID_right]
        this.$router.push('/videoinputs')
      }

    },
    computed:{

    }
   
  };

</script>

<style scoped>
.stage-projectors-container{
   /* border:solid 1px red; */
   /* width:250px;
   height: 100px; */
   margin-bottom: 0px;
}

.button {
  position: relative;
  border: 1px solid white;
  color: white;
  width: 150px;
  height: 50px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  border-radius: 6px;
}
.button:hover {
  background-color: rgb(52,199,89);
  color: white;
}

.button-merge-projector {
  position: relative;
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
.button-merge-projector:hover {
  background-color: rgb(52,199,89);
  color: white;
}.merged{
  /* border:none; */
  /* background-color:rgb(0,122,255); */


}
.notDetected
{
  cursor: not-allowed;
  pointer-events: none;
  border: none;
  background-color: rgb(255,59,48);
  opacity: 0.2;
}

.rx-id{
  position: absolute;
  top:0.25em;
  left: 0.5em;;
  font: .8em sans-serif;
}
.rx-ch-select{
  position:relative;
  bottom: -1em;
  font: 1em sans-serif;
}

.rotate{
    rotate:-90deg;
}

.alert{
  border: solid 1px red;
}

</style>