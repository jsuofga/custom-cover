import{_ as d,D as p,ac as u,E as i,F as h,G as f,I as o,O as n,N as c,m as _,H as m,ad as g,P as w,L as B,M as F}from"./index-3d06c2d6.js";import{V as S}from"./VContainer-6841b315.js";import{V as v}from"./VIcon-c64a3c21.js";const b={name:"Update",props:[],setup(){return{stateStore:p()}},data(){return{selectedFile:null,completion:"0%",showFileButton:!0,showUploadButton:!1,showProgressBar:!1}},computed:{},methods:{fileSelect(t){this.showFileButton=!1,this.showUploadButton=!0,this.selectedFile=t.target.files[0]},upload(){const t=`${location.hostname}:1880`,s=new FormData;this.selectedFile==null?alert("No file selected"):this.selectedFile.type=="application/x-tar"&&this.selectedFile.name=="dist.tar"?(this.showFileButton=!1,this.showUploadButton=!1,this.showProgressBar=!0,s.append("image",this.selectedFile),u.post(`http://${t}/update`,s,{onUploadProgress:e=>{console.log("upload progress:"+Math.round(e.loaded/e.total*100)+"%"),this.completion=Math.round(e.loaded/e.total*100).toString()+"%"}}).then(e=>{console.log(e.status),e.status===200?(this.stateStore.changePage("home"),this.$router.push("/"),setTimeout(function(){location.reload()},1e3)):alert("fail")}).catch(e=>{this.errors.push(e)})):alert("Wrong file.File should be dist.tar. Please contact info@octavainc.com to get correct file")}},mounted(){}},U=t=>(B("data-v-0b58e167"),t=t(),F(),t),y={class:"update"},k=U(()=>o("h5",null," Update dist.tar file",-1)),x={key:0,id:"input"},V={key:1,class:"field center-align"},P={key:2,id:"progress-container"},I={class:"progress"},N={class:"progressFeedback"};function C(t,s,e,D,a,l){return i(),h(S,null,{default:f(()=>[o("div",y,[k,a.showFileButton?(i(),n("div",x,[o("input",{onChange:s[0]||(s[0]=(...r)=>l.fileSelect&&l.fileSelect(...r)),id:"file-select-button",type:"file",accept:".tar"},null,32)])):c("",!0),a.showUploadButton?(i(),n("div",V,[o("button",{onClick:s[1]||(s[1]=(...r)=>l.upload&&l.upload(...r)),class:"waves-effect waves-light btn blue"},[_(v,{icon:"mdi-upload"}),m("publish upload")])])):c("",!0),a.showProgressBar?(i(),n("div",P,[o("div",I,[o("div",{class:"determinate blue",style:g({width:a.completion})},null,4)]),o("div",N,"Uploading "+w(a.completion),1)])):c("",!0)])]),_:1})}const z=d(b,[["render",C],["__scopeId","data-v-0b58e167"]]);export{z as default};
