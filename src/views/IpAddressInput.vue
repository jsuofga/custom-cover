<template>
  <v-container class =" fill-height d-flex justify-center">
     <v-card id='myCard'>
      <v-card-title class ="  d-flex justify-center">
          <h4> Enter Cisco Switch IP Address</h4>
      </v-card-title>
      <v-card-text >
        <v-form >
          <v-text-field label = 'IP Address' :rules = 'ipRules' v-model = 'ipaddress' prepend-inner-icon="mdi-ip-network" required >
          
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-row class = "d-flex justify-center">
        <h6 v-if = 'alert' class="feedback">Enter an IP Address for the Cisco switch</h6>
      </v-row>
      <v-row id = "buttons-container" class = "d-flex justify-center">
        <v-col class = "d-flex justify-center">
            <v-btn  color = "red" @click = "cancel" >Cancel</v-btn>

        </v-col >
            <v-col class = "d-flex justify-center">
            <v-btn  color = "blue" @click = 'submit'>Submit</v-btn>

        </v-col>
      </v-row>


    </v-card>
    
    

  </v-container>
   

</template>

<script >
  import { useStateStore} from '@/stores/StateStore'
  export default {
  name: "Zones",
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

.feedback{
  color:red
}


</style>
