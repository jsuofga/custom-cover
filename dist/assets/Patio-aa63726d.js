import{_ as m,D as y,J as x,E as f,F as p,G as e,m as t,H as l,N as _,I as u,L as S,M as V}from"./index-91017cb5.js";import{S as g,D as b,V as w}from"./VBanner-d8e76a65.js";import{V as k}from"./VContainer-69a055bb.js";import{V as o,a as P}from"./VRow-5df2d8e8.js";import{f as n,l as h}from"./VBtn-06e9534c.js";import{V as c}from"./VIcon-f465d100.js";import{V as v}from"./VChip-3350b7a4.js";import"./createSimpleFunctional-23494928.js";import"./VAvatar-8381b6be.js";const I={name:"Patio",props:[],components:{StageProjectors:g,DisplayRX:b},setup(){return{stateStore:y()}},data:()=>({}),methods:{selectPlayBlackOut(s){this.stateStore.play_blackout(s)},merge2PatioDisplays(s){this.stateStore.mergeType="2",s=="22and23"?(this.stateStore.rxSelectedLabel="Patio TV 22 | 23",console.log("Patio TV 22 | 23"),this.stateStore.rxIdsToMerge=[22,23]):(this.stateStore.rxSelectedLabel="Patio TV 24 | 25",console.log("Patio TV 24 | 25"),this.stateStore.rxIdsToMerge=[24,25]),this.$router.push("/videoinputs")}},computed:{blackoutScreen:function(){let s=[];return this.stateStore.rxIDs_patio.forEach(a=>{this.stateStore.rxParams[a].display==2?s.push("pause"):this.stateStore.rxParams[a].display==0}),s.length!=0}},async created(){console.log("start getRxStatus"),await this.stateStore.getNodeQuery(),this.getRxStatus=setInterval(this.stateStore.getFeedback,5e3)},beforeUnmount(){console.log("stop getRxStatus"),clearInterval(this.getRxStatus)}},D=s=>(S("data-v-3dbf51c3"),s=s(),V(),s),T=D(()=>u("div",{class:"text-h5"},"Patio TVs are blacked out",-1));function R(s,a,C,j,B,r){const i=x("DisplayRX");return f(),p(k,{id:"myContainer",fluid:"",class:"fill-height"},{default:e(()=>[r.blackoutScreen?(f(),p(w,{key:0,id:"alert",lines:"one",class:"d-flex justify-center"},{default:e(()=>[t(P,null,{default:e(()=>[t(o,{class:"d-flex justify-center pa-10"},{default:e(()=>[T]),_:1}),t(o,{class:"d-flex justify-center"},{default:e(()=>[t(n,{color:"green",onClick:a[0]||(a[0]=d=>r.selectPlayBlackOut("play"))},{default:e(()=>[t(c,null,{default:e(()=>[l("mdi-play")]),_:1}),l("Resume | Play")]),_:1})]),_:1})]),_:1})]),_:1})):_("",!0),t(o,{class:"d-flex justify-center"},{default:e(()=>[t(i,{class:"rotate-cw",rxLabel:"TV26",rxID:"26"})]),_:1}),t(o,{id:"row-door",class:"myRow d-flex justify-center"},{default:e(()=>[t(v,{id:"door",class:"d-flex justify-center"},{default:e(()=>[l("Door")]),_:1})]),_:1}),t(o,{id:"row-2",class:"myRow d-flex justify-center"},{default:e(()=>[u("button",{class:"button-merge-2-patio",onClick:a[1]||(a[1]=d=>r.merge2PatioDisplays("24and25"))},[t(c,{icon:"mdi-arrow-expand-vertical",size:"30"})]),t(i,{class:"rotate-cw",rxLabel:"TV25",rxID:"25"})]),_:1}),t(o,{id:"row-3",class:"myRow d-flex justify-center"},{default:e(()=>[t(i,{class:"rotate-cw",rxLabel:"TV24",rxID:"24"})]),_:1}),t(o,{id:"row-4",class:"myRow d-flex justify-center"},{default:e(()=>[u("button",{class:"button-merge-2-patio",onClick:a[2]||(a[2]=d=>r.merge2PatioDisplays("22and23"))},[t(c,{icon:"mdi-arrow-expand-vertical",size:"30"})]),t(i,{class:"rotate-cw",rxLabel:"TV23",rxID:"23"})]),_:1}),t(o,{id:"row-5",class:"myRow d-flex justify-center"},{default:e(()=>[t(i,{class:"rotate-cw",rxLabel:"TV22",rxID:"22"})]),_:1}),t(h,{id:"myFab"},{default:e(()=>[t(n,{class:"button-play-pause",onClick:a[3]||(a[3]=d=>r.selectPlayBlackOut("play"))},{default:e(()=>[t(c,null,{default:e(()=>[l("mdi-play")]),_:1}),l(" play ")]),_:1}),t(n,{class:"button-play-pause",onClick:a[4]||(a[4]=d=>r.selectPlayBlackOut("blackout"))},{default:e(()=>[t(c,null,{default:e(()=>[l("mdi-stop")]),_:1}),l(" dark ")]),_:1})]),_:1})]),_:1})}const A=m(I,[["render",R],["__scopeId","data-v-3dbf51c3"]]);export{A as default};