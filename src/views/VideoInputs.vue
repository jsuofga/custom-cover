<template>
  <v-container class="fill-height d-flex flex-column" >

          <div id='inner-div' v-click-outside = "onClickOutside">
               <v-row id = "rx-label" class='d-flex justify-center pa-9 myCol'>
                    Select Video for Display - {{stateStore.rxSelectedLabel}}
               </v-row>

               <v-snackbar
                    v-model="stateStore.snackbar"
                    :timeout="3000"
                    color="blue"
               >    
                    {{ ` ${stateStore.rxSelectedLabel} to ${stateStore.sourceList[parseInt(stateStore.txSelected)-1]} `}}

                    <template>
                         <v-btn color="white" variant="text"></v-btn>
                    </template>
               </v-snackbar>
               
               <!-- Source 1-4 -->
               <v-row class="myRow d-flex align-center">
                    <v-col  class ="d-flex justify-center pl-0">
                         <SourceTX :txLabel= stateStore.sourceList[0] :txID = '1'/>
                    </v-col>
                    <v-col  class =" d-flex justify-center " >
                         <SourceTX :txLabel= stateStore.sourceList[1] :txID = '2'/>
                    </v-col>
                    <v-col class =" d-flex justify-center">
                         <SourceTX :txLabel= stateStore.sourceList[2] :txID = '3'/>
                    </v-col>
                    <v-col  class =" d-flex justify-center pr-0">
                         <SourceTX :txLabel= stateStore.sourceList[3] :txID = '4'/>
                    </v-col>
               </v-row>
               
                    <!-- Source 5-7 -->
               <v-row class="myRow">
                    <v-col  class ="d-flex justify-center pl-0 ">
                         <SourceTX :txLabel= stateStore.sourceList[4] :txID = '5'/>
                    </v-col>
                    <v-col  class =" d-flex justify-center" >
                         <SourceTX :txLabel= stateStore.sourceList[5] :txID = '6'/>
                    </v-col>
                    <v-col  class =" d-flex justify-center">
                         <SourceTX :txLabel= stateStore.sourceList[6] :txID = '7'/>
                    </v-col>
                    <!-- <v-col  class =" d-flex justify-center pr-0">
                         <SourceTX :txLabel= stateStore.sourceList[7] :txID = '8'/>
                    </v-col> -->
               </v-row>

                    <!-- Source 9-12 -->
               <!-- <v-row class="myRow" >
                    <v-col  class ="d-flex justify-center pl-0">
                         <SourceTX :txLabel= stateStore.sourceList[8] :txID = '9'/>
                    </v-col>
                    <v-col c class =" d-flex justify-center" >
                         <SourceTX :txLabel= stateStore.sourceList[9] :txID = '10'/>
                    </v-col>
                    <v-col  class =" d-flex justify-center">
                         <SourceTX :txLabel= stateStore.sourceList[10] :txID = '11'/>
                    </v-col>
                    <v-col  class =" d-flex justify-center pr-0">
                         <SourceTX :txLabel= stateStore.sourceList[11] :txID = '12'/>
                    </v-col>
               </v-row> -->

         </div>

  
    
  </v-container>
</template>

<script >

  import { useStateStore} from '@/stores/StateStore'
  import SourceTX from '@/components/SourceTX.vue'
  export default {
    name: "Vault",
    components: {SourceTX},
    setup(){
      // Pinia
        const stateStore = useStateStore()
        return {stateStore}

    
     },

    data: () => ({
        active:false
    }),

    methods: {
      onClickOutside () {
        this.$router.push(`/${this.stateStore.page}`)
        console.log('outside')
      },

    },
    created(){

    },
    beforeUnmount(){

    }

  }


</script>


<style scoped>

/* .myRow{
     border:1px solid red;
} */
#inner-div{
     /* border:1px solid green; */

}
#rx-label{
  color:white 
}


</style>



