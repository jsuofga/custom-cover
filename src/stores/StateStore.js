import axios from 'axios'
import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useStateStore = defineStore('stateStore', {
    // other options...
    state: () => ({ 
        page: '/', 
        rxSelected: '1',
        rxSelectedLabel: '',
        txSelected:'1',
        mergeType:'0', 
        isAuthenticated:false,
        snackbar:false,
        nodeQueryList_dump:[],
        nodeQueryList_ip:[],
        nodeQueryList_rx_ip:[],
        nodeQueryList_rx_not_found:[],
        ipAddressOfCiscoSwitch:'',
        ciscoSwitchModel: "CBS250-48",
        txPorts: 10,
        rxPorts: 38,  // tx + rx add up to 48 for PoE 
        poe_wattage_used:1,
        waiting_for_poe_to_turn_on: false,
        snackbar_poe : false,
        snakcbar_poe_text:'',
        rxIdsToMerge:[
          
        ],
        sourceList:[
          'Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5', 'Video 6', 'Video 7', 'Video 8', 'Video 9'
        ],
        rxIDs : [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14, 15, 16,17, 18, 19,20,21,
          22, 23, 24, 25, 26, 
        ],
      
        rxIDs_main : [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17, 18,19,20,21
        ],
        rxIDs_patio : [
          22, 23, 24, 25, 26,
        ],

        rxIDs_frontLeft_frontRight:[19,20],
        rxIds_excluding_frontLeft_frontRight : [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14, 15, 16,17, 18,21,
          22, 23, 24, 25, 26, 
        ],
      
       
        rxIDs_to_fetch:[],

        rxParams : {
          1:{chSelect:'search',vw_status:'0',display:''},2:{chSelect:'search',vw_status:'0',display:''},3:{chSelect:'search',vw_status:'0',display:''},4:{chSelect:'search',vw_status:'0',display:''},5:{chSelect:'search',vw_status:'0',display:''},
          6:{chSelect:'search',vw_status:'0',display:''},7:{chSelect:'search',vw_status:'0',display:''},8:{chSelect:'search',vw_status:'0',display:''},9:{chSelect:'search',vw_status:'0',display:''},10:{chSelect:'search',vw_status:'0',display:''},
          11:{chSelect:'search',vw_status:'0',display:''},12:{chSelect:'search',vw_status:'0',display:''},13:{chSelect:'search',vw_status:'0',display:''},14:{chSelect:'search',vw_status:'0',display:''},15:{chSelect:'search',vw_status:'0',display:''},
          16:{chSelect:'search',vw_status:'0',display:''},17:{chSelect:'search',vw_status:'0',display:''}, 18:{chSelect:'search',vw_status:'0',display:''},19:{chSelect:'search',vw_status:'0',display:''},20:{chSelect:'search',vw_status:'0',display:''},
          21:{chSelect:'search',vw_status:'0',display:''},22:{chSelect:'search',vw_status:'0',display:''},
          23:{chSelect:'search',vw_status:'0',display:''},24:{chSelect:'search',vw_status:'0',display:''},25:{chSelect:'search',vw_status:'0',display:''},26:{chSelect:'search',vw_status:'0',display:''},

        },

            
     }),
     getters:{

     },
     actions: {
        // since we rely on `this`, we cannot use an arrow function
                saveSwitchConfigToPi(_ip_mdf){
          const serverURL = location.hostname
          fetch(`http://${serverURL}:3000/write/UserSwitchConfig/{"ip":"${_ip_mdf}","model":"${this.ciscoSwitchModel}","TXports":${this.txPorts},"RXports":${this.rxPorts}}`)
        },

        get_UserSwitchConfig(){
          const serverURL = `${location.hostname}:3000`
          // Read from Server
            fetch(`http://${serverURL}/read/UserSwitchConfig`, {method: 'GET',})
            .then(response => response.json())
            .then(result => {
              console.log('Success:', result);
              this.ipAddressOfCiscoSwitch = result['ip']

            })
            .catch(error => {
              console.log('Error:', error);
            });
      },

       power_poe(_onOff){

        this.waiting_for_poe_to_turn_on = _onOff === 'on' ? true : false
        this.snackbar_poe= true
        this.snackbar_poe_text= _onOff === 'on' ? 'Powering PoE ON' : 'Powering PoE OFF'
        const serverURL = `${location.hostname}:1880`
        fetch(`http://${serverURL}/poe/${_onOff}`)

       },

        get_SwitchStatus(){
        const serverURL_ciscoStat = `${location.hostname}:1880/ciscoStat`
        console.log(`http://${serverURL_ciscoStat}`)
        fetch(`http://${serverURL_ciscoStat}`)
        .then(function(response) {
            return response.json();
        })
        .then((myJson)=> {
          console.log(myJson)
          // this.portVlanMembership = myJson.PortVlanMembership
          // this.ciscoSwitchModel = myJson.model
          // this.piNotRespond = false
          // console.log(this.portVlanMembership)
          this.poe_wattage_used = myJson.PoE
          console.log(this.poe_wattage_used)
        })
        .catch(()=> {
            // this.piNotRespond = true
            console.log('ERROR!'); 
        })

      },

        changePage(_page) {
         
          this.page = _page
          console.log(this.page)
        },
        selectRX(_rxID) {
            this.rxSelected = _rxID
            this.mergeType = '1'

        },
        selectAll(){
          this.rxSelected = 'all'
        },

         switchRX(_txID){
          // console.log(`Type is ${this.mergeType}`)
          // console.log(`RX is ${this.rxSelected}`)
          console.log(_txID)

          if(this.rxSelected != 'all'){
            if(this.mergeType =='1'){  // Single TV mode
              fetch(`http://172.31.3.${this.rxSelected}/cgi-bin/query.cgi?cmd=vw:off`);
              fetch(`http://172.31.3.${this.rxSelected}/cgi-bin/query.cgi?cmd=rxswitch:${_txID}`)
   
           }else if(this.mergeType == '2' || this.mergeType == '3'|| this.mergeType == '4' || this.mergeType == '6' ){ // Merging 2TV, 3TVs or 4TVs
             this.rxIdsToMerge.forEach((item,index)=>{
               fetch(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=e%20e_vw_enable_0_${this.mergeType-1}_0_${index}%3Be%20e_vw_moninfo_200_200_100_100`)
               fetch(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=rxswitch:${_txID}`);
             })
           }

          }else{

          // merge 19 and 20 and switch to the input
            this.rxIDs_frontLeft_frontRight.forEach((item,index)=>{
              // console.log(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=e%20e_vw_enable_0_1_0_${index}%3Be%20e_vw_moninfo_200_200_100_100`)
              // console.log(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=rxswitch:${_txID}`);
              fetch(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=e%20e_vw_enable_0_1_0_${index}%3Be%20e_vw_moninfo_200_200_100_100`)
              fetch(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=rxswitch:${_txID}`);
            })

            // switch everthing except 19,20 to input 
            this.rxIds_excluding_frontLeft_frontRight.forEach((item,index)=>{
              // console.log(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=rxswitch:${_txID}`);
              fetch(`http://172.31.3.${item}/cgi-bin/query.cgi?cmd=rxswitch:${_txID}`);
            })
          }

  
          
        },
        play_blackout(_mode){
           let rxIDsInZone = []

          if(this.page == 'patio'){
            rxIDsInZone = [...this.rxIDs_patio]

          }else if(this.page =='main'){
             rxIDsInZone = [...this.rxIDs_main]

          }

          if(_mode == 'play'){
            //'2' = black out, '0' = resume video
            for(let rx of rxIDsInZone){
              const on = '0'
              fetch(`http://172.31.3.${rx}/cgi-bin/query.cgi?cmd=echo%20${on}%20>%20/sys/devices/platform/videoip/pause`)
            }
          }else if(_mode == 'blackout'){

            for(let rx of rxIDsInZone){
              const off = '2'
              fetch(`http://172.31.3.${rx}/cgi-bin/query.cgi?cmd=echo%20${off}%20>%20/sys/devices/platform/videoip/pause`)
            }

          }


        },
        async getNodeQuery(){
           // clear
           this.nodeQueryList_dump = []
           this.nodeQueryList_ip =[]
           this.nodeQueryList_rx_ip = []
           this.nodeQueryList_rx_not_found = []

           // Node Query-detect which TX and RX are installed and detected
 
           const response = await fetch(`http://172.31.2.1/cgi-bin/query.cgi?cmd=node_list%20-j`)
           const data = await response.text()
 
 
           //Process string input. 1)remove first{ and ,}' //remove first{ and ,} 2) extact all items between {}
           let testString = data.slice(1,-2)  //remove first{ and last }'
           // console.log(testString)
           let regex = /{\s*([^}]+)\s*}/g ;  // get all items in between {}
           let matched = testString.match(regex)  // array of value that match the regex [ ]
           // console.log('matched',matched)
           // push matched items into array as objects
           await  matched.forEach((item,index) =>{
               this.nodeQueryList_dump.push(JSON.parse(item))
           })
             // console.log('deviceListDump',this.deviceListDump)
           await this.nodeQueryList_dump.forEach((item,index)=>{
                 this.nodeQueryList_ip.push(item.ip)
           })
 
           this.nodeQueryList_ip.forEach((item)=>{
             // console.log(item)
             if(item.includes("172.31.3.")){
               this.nodeQueryList_rx_ip.push(parseInt(item.slice(9)))  // Example, extract xx from 172.31.3.xx
             }
           })

          // Compare the list of RX from nodeQuery dump to the expected RxIDs list. 
          this.nodeQueryList_rx_not_found = this.rxIDs.filter(x => !this.nodeQueryList_rx_ip.includes(x));
          // List of RX from RxIDs that are not detected using NodeQuery list
          this.nodeQueryList_rx_not_found.forEach((rx)=>{
          this.rxParams[rx]['chSelect'] = 'not detected'
  
          })
           this.getFeedback()
        },
      
         async getFeedback(){
     
          //
          const regex_pattern_ch_select = /ch_select=[^\s]+/;
          const regex_pattern_vw_max_column = /vw_max_column=[^\s]+/;  // vw_max_column = 3 for 1x4, vw_max_column = 1 for 1x2, vw_max_column = 0 for 1x1, 
          const controller = new AbortController();

          if(this.page =='main'){
              this.rxIDs_to_fetch = [...this.rxIDs_main]
          }else if( this.page =='patio'){
              this.rxIDs_to_fetch = [...this.rxIDs_patio]
          }

              for(let rx of this.nodeQueryList_rx_ip){
                if(this.rxIDs_to_fetch.includes(rx)){

                  try{
                    // get astparam dump from each RX
                   console.log(`http://172.31.3.${rx}/cgi-bin/query.cgi?cmd=astparam dump`)
                   const astparamDump = (await axios.get(`http://172.31.3.${rx}/cgi-bin/query.cgi?cmd=astparam dump`)).data
                   // console.log(astparamDump)
                   const match_ch_select = astparamDump .match(regex_pattern_ch_select );
                   const match_vw_max_column = astparamDump .match(regex_pattern_vw_max_column );
 
                   if (match_ch_select  !=null && match_vw_max_column!=null ) {
                     
                     let source_select_index = parseInt(match_ch_select[0].replace(/ch_select=/, '')) - 1 // ch_selects = 0001, strip out ch_selects= and convert to integer  
                     let vw_max_column = match_vw_max_column[0].replace(/vw_max_column=/, '') // vw_max_column = 3 for 1x4, vw_max_column = 1 for 1x2, vw_max_column = 0 for 1x1, 
                     this.rxParams[rx]['chSelect'] = this.sourceList[source_select_index]
                     this.rxParams[rx]['vw_status'] = vw_max_column
     
                   }
 
                   // Check if RX is 'blackout' or 'playing' . '0' = playing, '2' = blackout
                   const pauseOrplay = (await axios.get(`http://172.31.3.${rx}/cgi-bin/query.cgi?cmd=cat /sys/devices/platform/videoip/pause`)).data
                   // console.log(pauseOrplay)
                   this.rxParams[rx]['display'] = pauseOrplay
                   // console.log(this.rxParams)
 
                 } catch(error) {
                   console.log(error)
                   this.rxParams[rx]['chSelect'] = 'error'
 
                 }
 
             }

                }
              

         },
            
      },
  })


    
