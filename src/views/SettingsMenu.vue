<template>
  <v-container class =" fill-height d-flex justify-center">
     <v-card id='myCard'>
      <v-card-title class = "d-flex justify-center">
          <h4> Settings</h4>
      </v-card-title>
      <v-card-text class = "d-flex justify-center" >
        <v-btn class = "button" color = "blue" prepend-icon="mdi-ip-network" @click= "this.$router.push('/ipaddressinput')"> Switch IP Address</v-btn>
      </v-card-text>

       <v-card-text class = "d-flex justify-center" >
        <v-btn class = "button" color = "blue" prepend-icon="mdi-upload" @click= "this.$router.push('/update')"> Update File</v-btn>
      </v-card-text>

    <v-card-text class = "d-flex justify-center" >
        <v-btn rounded class = "button" color = "red" prepend-icon="" @click= "this.$router.push('/')"> Cancel</v-btn>
      </v-card-text>




    </v-card>
    
    

  </v-container>
   

</template>

<script >
  import { useStateStore} from '@/stores/StateStore'
  export default {
  name: "SettingsMenu",
  components:{},

  setup(){
    // Pinia
      const stateStore = useStateStore()
      return {stateStore}
    },

  data: () => ({
   
    ipaddress: '',
    alert:false,
    ipRules:[
      (v) => {
        if(v.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/)){
          console.log('ok')
          return true
        }else{
          return 'Enter valid IP address ( ex. 192.168.40.28)'
        }
      }
      
    ]
    
  }),
  computed:{

    alert:function(){
      if(this.ipaddress==''){
        return true
      }else{
        return false
      }

    }
  },
  methods: {
 
    submit:function(){
      if(this.ipaddress ==''){
        this.alert = true
      }else{
        this.alert = false
        this.stateStore.saveSwitchConfigToPi(this.ipaddress)
          
      }
       this.$router.push('/')
    },

    cancel:function(){
       this.$router.push('/')
    }

  },

   created(){
    this.stateStore.get_UserSwitchConfig()
    
  },
   mounted(){
      this.myTimeout =   setTimeout(() => {
      this.ipaddress = this.stateStore.ipAddressOfCiscoSwitch
    }, 1000);

 
  },
  beforeUnmount(){
    console.log('clearTimeout')
    clearTimeout(this.myTimeout)
  }
  
};


  
</script>

<style scoped>

.container{
 /* border: solid 1px red; */

}
#myCard{
  width:50%
}

#buttons-container{
  margin:20px;
  /* border: 1px solid green; */

}
.button{
    width:50%;
}

</style>
