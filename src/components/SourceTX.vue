<template>

    <button class="button" @click = "selectTX(txID)">
       {{txLabel}} 
       <div id='tx-label'>{{txID}} </div>
      <img  :src= bg_image  width = "100" height = "80"> 
    </button>

</template>

<script>
  //
import { useStateStore} from '@/stores/StateStore'

export default {
  name: "SourceTX",
  props:['txLabel','txID'],
  components:{},

  setup(){
      // Pinia
        const stateStore = useStateStore()
        return {stateStore}
      },
  data: () => ({
      bg_image: ''

  }),
  methods: {
    selectTX(_txID){
      if(_txID.toString().length == 1){
        _txID = "00"+_txID
      }else if(_txID.toString().length == 2){
        _txID = "0"+_txID
      }
      this.stateStore.switchRX(_txID)
      this.stateStore.txSelected = _txID
      this.stateStore.snackbar = true
    },
    changeBackgroundImage(){
          this.bg_image = `http://172.31.2.${this.txID}/capture.jpg`+'?' + Date.now();
    },
    
    
  },
  created(){
    // using the capture_pic & method. PRO DSX-TX must have updated firmware that has self polling capture_pic &
    fetch(`http://172.31.2.${this.txID}/cgi-bin/query.cgi?cmd=capture_pic &`)  // Initiate PRO DSX to start getting jpg 
    this.snapShot = setInterval(this.changeBackgroundImage,2500)  // Update the html img tag every 2500 ms
  },

  beforeUnmount(){
     console.log('stop snapshot')
     fetch(`http://172.31.2.${this.txID}/cgi-bin/query.cgi?cmd=killall capture_pic`)
     clearInterval(this.snapShot)
  }



};

</script>

<style scoped>

.button {
  position: relative;
  border: 1px solid white;
  color: white;
  width: 120px;
  height: 120px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
}
button:hover{
  border:1px solid rgb(0,122,255);
  color: rgb(0,122,255);
}
#tx-label{
  position: absolute;
  top:0;
  left: 0.8em;;
  font: 0.8em sans-serif;
}



</style>
