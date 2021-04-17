var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,r=Object.getOwnPropertySymbols,n=Object.prototype.propertyIsEnumerable,s=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,a=(e,a)=>{for(var o in a||(a={}))t.call(a,o)&&s(e,o,a[o]);if(r)for(var o of r(a))n.call(a,o)&&s(e,o,a[o]);return e},o=(e,t,r)=>(s(e,"symbol"!=typeof t?t+"":t,r),r);import{D as l,h as i,a as c,d,b as m,S as u,E as p,F as E,c as h,C as y,e as f,I as v,H as g,M as _,L as w,B as b,G as I,R as S,f as C,g as j,i as R,j as T,U as O,k,P as x,A,l as P,m as L,n as q,o as D,T as B,W as V,p as H,q as N,r as z,s as F,t as M,u as J}from"./vendor.fa37ab51.js";let $;!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(r){const n=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((r,a)=>{const o=new URL(e,n);if(self[t].moduleMap[o])return r(self[t].moduleMap[o]);const l=new Blob([`import * as m from '${o}';`,`${t}.moduleMap['${o}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){a(new Error(`Failed to import: ${e}`)),s(i)},onload(){r(self[t].moduleMap[o]),s(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/geliver/assets/");const U={},W=function(e,t){if(!t)return e();if(void 0===$){const e=document.createElement("link").relList;$=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in U)return;U[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":$,t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e()))};const G=/^[\],:{}\s]*$/,K=/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g,Y=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,Q=/(?:^|:|,)(?:\s*\[)+/g,X=async function(e="GET",t="",r={},n={}){const s=function(e,t){let r=e;t&&""!=l.stringify(t)&&(r+="?"+l.stringify(t));return r}(t,"GET"===e?r:void 0),a=Object.assign({},n),o={method:e,headers:a,mode:"cors"};if(console.log("FetchURI      : ",e,s),console.log("FetchHeader   : ",a),"GET"!==e){const e=JSON.stringify(r);Object.assign(o,{body:e}),console.log("FetchBody     : ",r)}try{const e=await fetch(s,o),t=await e.text();if(console.log(e),console.log("FetchResponse : ",t),!(i=t).length||!G.test(i.replace(K,"@").replace(Y,"]").replace(Q,"")))throw new Error(t);return JSON.parse(t)}catch(c){throw c}var i};class Z{constructor(){o(this,"reloadServerEndpoints",(async(e,t)=>await X("GET",e,{},{"x-oscrud-dev":t}))),o(this,"sendRequest",(async(e,t,r,n)=>await X("POST",e,{endpoint:t,request:r},{"x-oscrud-dev":n})))}}class ee{constructor(){o(this,"getTheme",(()=>localStorage.getItem("oscrud.theme"))),o(this,"setTheme",(e=>{localStorage.setItem("oscrud.theme",e)})),o(this,"getAppTheme",(()=>localStorage.getItem("oscrud.app_theme"))),o(this,"setAppTheme",(e=>{localStorage.setItem("oscrud.app_theme",e)}))}}function te(){return i().format("x")+function(e){const t=[];for(let r=0;r<e;r++)t.push(Math.floor(10*Math.random()).toString());return t.join("")}(4)}let re=new c("geliver");re.version(1).stores({histories:"&id, serverId, endpoint, createdAt",servers:"&id, name, connection, updatedAt",collections:"&id, name, tag, updatedAt",presets:"&id, name, collectionId, serverId, endpoint, updatedAt"});const ne=async(e,t="",r="id",n=!0,s=10)=>{t&&(e=e.where(r),e=n?e.belowOrEqual(t):e.aboveOrEqual(t));let a=e.limit(s+1);n&&(a=a.reverse());const o=await a.sortBy(r);let l;return o.length===s+1&&(l=o.pop()[r]),[o,l]};class se{constructor(){o(this,"exportDatabase",(async(e=(()=>{}))=>{const t=await re.export({progressCallback:e});d(t,"geliver.json","application/json")})),o(this,"importDatabase",(async(e,t=(()=>{}))=>{await re.delete(),await re.open(),await re.import(e,{progressCallback:t})})),o(this,"checkServerIdValid",(async e=>void 0===await re.servers.where("id").equals(e).first())),o(this,"getCollectionById",(async e=>re.collections.where("id").equals(e).first())),o(this,"getPresetById",(async e=>re.presets.where("id").equals(e).first())),o(this,"getServerById",(async e=>re.servers.where("id").equals(e).first())),o(this,"getConnectionById",(async e=>{const t=await re.servers.where("id").equals(e).first();return null==t?void 0:t.connection})),o(this,"listServers",(async e=>{let t=re.servers;return e&&(t=t.where("name").startsWithAnyOf(e)),t.limit(50).toArray()})),o(this,"listCollectionsWithSearch",(async e=>{let t=re.collections;return e&&(t=t.where("name").startsWithAnyOf(e)),t.limit(50).toArray()})),o(this,"listEndpoints",(async(e,t)=>{if(!e)return[];const r=await re.servers.where("id").equals(e).first();let n=(null==r?void 0:r.endpoints)||[];return t&&(n=n.filter((e=>e.endpoint.toLowerCase().includes(t.toLowerCase())))),n})),o(this,"listCollections",(async e=>ne(re.collections,e,"name",!1,8))),o(this,"listPresetsByCollectionId",(async(e,t)=>ne(re.presets.where("collectionId").equals(t),e,"name",!1,8))),o(this,"listHistories",(async e=>{const t={},r=async e=>(t[e]||(t[e]=this.getConnectionById(e)),t[e]),[n,s]=await ne(re.histories,e,"createdAt",!0,8),a=Promise.all(n.map((async e=>Object.assign(e,{connection:await r(e.serverId)}))));return[await a,s]})),o(this,"modifyServerEndpointsById",(async(e,t)=>{await re.servers.where("id").equals(e).modify({endpoints:t,updatedAt:i.utc().valueOf()})})),o(this,"modifyServerById",(async(e,t,r,n,s)=>{await re.servers.where("id").equals(e).modify({name:t,connection:r,password:n,endpoints:s,updatedAt:i.utc().valueOf()})})),o(this,"modifyCollectionById",(async(e,t,r)=>{await re.collections.where("id").equals(e).modify({name:t,tag:r,updatedAt:i.utc().valueOf()})})),o(this,"modifyPresetById",(async(e,t,r,n,s)=>{await re.presets.where("id").equals(id).modify({name:e,collectionId:t,serverId:r,endpoint:n,request:s,updatedAt:i.utc().valueOf()})})),o(this,"createCollection",(async(e,t)=>{await re.collections.put({id:te(),updatedAt:i.utc().valueOf(),name:e,tag:t})})),o(this,"createPreset",(async(e,t,r,n,s)=>{await re.presets.put({id:te(),updatedAt:i.utc().valueOf(),name:e,collectionId:t,serverId:r,endpoint:n,request:s})})),o(this,"createServer",(async(e,t,r,n,s)=>{await re.servers.put({id:e,name:t,connection:r,password:n,endpoints:s,updatedAt:i.utc().valueOf()})})),o(this,"createHistory",(async(e,t,r,n,s)=>{await re.histories.put({id:te(),serverId:e,endpoint:t,request:r,response:n,isError:s,createdAt:i.utc().valueOf()})})),o(this,"upsertPreset",(async(e,t,r,n,s)=>{e||(e=te()),await re.presets.put({id:e,name:t,serverId:r,endpoint:n,request:s,updatedAt:i.utc().valueOf()})})),o(this,"deletePresetById",(async e=>{await re.presets.where("id").equals(e).delete()})),o(this,"deleteCollectionById",(async e=>{await re.collections.where("id").equals(e).delete()})),o(this,"deleteHistoryById",(async e=>{await re.histories.where("id").equals(e).delete()})),o(this,"clearHistory",(async()=>{await re.histories.clear()}))}}class ae{constructor(){o(this,"getRequestJSON",(()=>this.request.jsonEditor.get())),o(this,"setRequestTheme",(e=>{this.request.jsonEditor.aceEditor.setTheme(`ace/theme/${e}`)})),o(this,"setResponseTheme",(e=>{this.response.jsonEditor.aceEditor.setTheme(`ace/theme/${e}`)})),o(this,"getAceTheme",(e=>`ace/theme/${e}`)),o(this,"setResponseJSON",(e=>{try{const t=JSON.parse(e);this.response.jsonEditor.set(t)}catch(t){this.response.jsonEditor.set(e)}})),o(this,"setRequestJSON",(e=>{try{const t=JSON.parse(e);this.request.jsonEditor.set(t)}catch(t){this.request.jsonEditor.set(e)}})),this.request=null,this.response=null,this.historyController={}}}class oe{constructor(){this.api=new Z(this),this.view=new ae(this),this.storage=new ee(this),this.db=new se(this)}}const le=m.createContext(new oe),{StringType:ie}=u.Types;function ce({open:e,selectedServerId:t,onClose:r}){const n=m.useRef(),s=m.useContext(le),[a,o]=m.useState(!1),[l,i]=m.useState({}),[c,d]=m.useState(void 0);let I=ie().isRequired("Server id is required");t||(I=I.addRule((async e=>s.db.checkServerIdValid(e)),"Server id must be unique."));const S=u.Model({serverId:I,name:ie().isRequired("Name is required"),connection:ie().isRequired("Connection is required").addRule((e=>e.includes("https://")||e.includes("http://")),"Connection must have protocol HTTP or HTTPS.")});m.useEffect((()=>{i({}),t&&async function(){const e=await s.db.getServerById(t);i({serverId:t,name:e.name,connection:e.connection,password:e.password})}()}),[t]);return m.createElement(p,{show:e,size:"xs",onClose:r},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,t?"Edit":"Add"," Server")),m.createElement(p.Body,null,m.createElement(E,{ref:n,fluid:!0,model:S,formValue:l,onChange:i},m.createElement(h,null,m.createElement(y,null,"SID"),m.createElement(f,{name:"serverId",accepter:v,disabled:void 0!==t}),m.createElement(g,null,"SID is an unique identifier for preset and history to determine server connection configuration. It's will always make sure connection is up to date.")),m.createElement(h,null,m.createElement(y,null,"Name"),m.createElement(f,{name:"name",accepter:v})),m.createElement(h,null,m.createElement(y,null,"Connection"),m.createElement(f,{name:"connection",accepter:v}),m.createElement(g,null,"Example connection: http://localhost:1234")),m.createElement(h,null,m.createElement(y,null,"Password"),m.createElement(f,{name:"password",type:"password"}),m.createElement(g,null,"Leave it empty if doesn't enabled password authentication"))),c&&m.createElement(_,{type:"error",showIcon:!0,description:c.message})),m.createElement(p.Footer,{style:{display:"flex",justifyContent:"flex-end",alignItems:"center"}},a?m.createElement(w,{style:{marginRight:10},content:(t?"Updating":"Creating")+" ..."}):m.createElement(b,{appearance:"primary",onClick:async()=>{const{hasError:e}=await n.current.checkAsync();if(!e){d(void 0),o(!0);try{const e=await s.api.reloadServerEndpoints(l.connection,l.password);t?await s.db.modifyServerById(l.serverId,l.name,l.connection,l.password,e):await s.db.createServer(l.serverId,l.name,l.connection,l.password,e),r()}catch(a){d(a)}finally{o(!1)}}}},"Confirm"),m.createElement(b,{appearance:"subtle",onClick:r},"Cancel")))}const de=["ambiance","chaos","chrome","clouds","clouds_midnight","cobalt","crimson_editor","dawn","dracula","dreamweaver","eclipse","github","gob","gruvbox","idle_fingers","iplastic","katzenmilch","kr_theme","kuroir","merbivore","merbivore_soft","monokai","mono_industrial","pastel_on_dark","solarized_dark","solarized_light","sqlserver","terminal","textmate","tomorrow","tomorrow_night","tomorrow_night_blue","tomorrow_night_bright","tomorrow_night_eighties","twilight","vibrant_ink","xcode"];function me({theme:e,setTheme:t,appTheme:r,setAppTheme:n}){const s=m.useContext(le),[o,l]=m.useState(!1),[i,c]=m.useState(!1),[d,u]=m.useState(void 0),E=()=>{l(void 0)};return m.createElement(I,{fluid:!0},m.createElement(S,{style:{display:"flex",alignItems:"center"}},m.createElement(C,{xs:2},m.createElement("p",null,"Editor Theme")),m.createElement(C,{xs:6},m.createElement(j,{block:!0,value:e,onChange:t,data:de.map((e=>({label:e,value:e})))}))),m.createElement(S,{style:{display:"flex",alignItems:"center",marginTop:15}},m.createElement(C,{xs:2},m.createElement("p",null,"App Theme")),m.createElement(C,{xs:22},m.createElement(R,{inline:!0,value:r,onChange:n},m.createElement(T,{value:"light"},"☀️ Light"),m.createElement(T,{value:"dark"},"🌙 Dark")),m.createElement(g,null,"Sometimes may not working, refresh should take the changes."))),m.createElement(S,{style:{display:"flex",alignItems:"center",marginTop:15}},m.createElement(C,{xs:2},m.createElement("p",null,"Actions")),m.createElement(C,{xs:22,style:{display:"flex",flexDirection:"row"}},m.createElement(O,{fileListVisible:!1,autoUpload:!1,action:"",onChange:e=>{c("import");try{s.db.importDatabase(e[0].blobFile,(e=>u(a({},e))))}catch(t){u({error:t,done:!0})}}},m.createElement(b,null,m.createElement(k,{icon:"import"})," Import Data")),m.createElement(b,{style:{marginLeft:10},appearance:"primary",onClick:()=>{c("export"),s.db.exportDatabase((e=>u(a({},e))))}},m.createElement(k,{icon:"export"})," Export Data"),m.createElement(b,{style:{marginLeft:10},appearance:"primary",onClick:()=>l(!0)},m.createElement(k,{icon:"trash"})," Clear History"))),m.createElement(p,{show:void 0!==d,overflow:!1,size:"xs"},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,m.createElement(k,{icon:"export"===i?"export":"import",style:{marginRight:10}}),"export"===i?"Exporting":"Importing"," Data")),m.createElement(p.Body,{style:{display:"flex",justifyContent:"center",flexDirection:"row"}},m.createElement(x.Circle,{style:{width:120},percent:Math.floor(((null==d?void 0:d.completedTables)+(null==d?void 0:d.completedRows))/((null==d?void 0:d.totalTables)+(null==d?void 0:d.totalRows))*100),status:(null==d?void 0:d.done)&&(d.error?"fail":"success")}),m.createElement("dl",{style:{marginLeft:30}},m.createElement("dt",null,"Num Of Tables:"),m.createElement("dd",null,null==d?void 0:d.completedTables," / ",null==d?void 0:d.totalTables),m.createElement("dt",null,"Num Of Rows:"),m.createElement("dd",null,null==d?void 0:d.completedRows," / ",null==d?void 0:d.totalRows))),(null==d?void 0:d.error)&&m.createElement(_,{type:"error",title:"Import Error",description:null==d?void 0:d.error.message}),(null==d?void 0:d.done)&&m.createElement(p.Footer,null,m.createElement(b,{appearance:"primary",onClick:()=>{u(void 0)}},"Close"))),m.createElement(p,{backdrop:!0,show:o,onHide:E,size:"xs"},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,m.createElement(k,{icon:"remind",style:{color:"#ffb300",marginRight:10}}),"Clear histories")),m.createElement(p.Body,null,"Histories once cleared will not be recover anymore. Are you sure want to proceed?"),m.createElement(p.Footer,null,m.createElement(b,{appearance:"primary",onClick:async()=>{A.info("Clearing histories ...");try{await s.db.clearHistory(),E(),A.success("Clear histories successfully"),s.view.historyController.refresh()}catch(e){A.error("Error when clearing histories: ",e.message)}}},"Ok"),m.createElement(b,{onClick:E,appearance:"subtle"},"Cancel"))))}const ue=Promise.resolve([[],void 0]);function pe(e){const[t,r]=m.useState(!1),[n,s]=m.useState(!1),[a,o]=m.useState(!1),[l,i]=m.useState(),[c,d]=m.useState([]);m.useEffect((()=>{a||n||(s(!0),async function(){const[t,r]=await e(l);d(l?[...c,...t]:[...t]),i(r),r||o(!0),s(!1)}())}),[t]);return[{loading:n,isEnd:a,refresh:()=>{n||(i(void 0),o(!1),r(!t))},loadMore:()=>{a||n||r(!t)}},c]}const{StringType:Ee}=u.Types;function he({open:e,selectedCollectionId:t,onClose:r}){const n=m.useRef(),s=m.useContext(le),[a,o]=m.useState(!1),[l,i]=m.useState({}),[c,d]=m.useState(void 0),I=u.Model({name:Ee().isRequired("Name is required")});m.useEffect((()=>{i({}),t&&async function(){const e=await s.db.getCollectionById(t);i({name:e.name,tag:e.tag})}()}),[t]);return m.createElement(p,{show:e,size:"xs",onHide:r},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,t?"Edit":"Create"," Collection")),m.createElement(p.Body,null,m.createElement(E,{ref:n,fluid:!0,model:I,formValue:l,onChange:i},m.createElement(h,null,m.createElement(y,null,"Name"),m.createElement(f,{name:"name",accepter:v})),m.createElement(h,null,m.createElement(y,null,"Tag"),m.createElement(f,{name:"tag",accepter:v}),m.createElement(g,null,"Tag is just for display purpse, usually for specify development, staging or production. You can use as ur own recognize purpose."))),c&&m.createElement(_,{type:"error",showIcon:!0,description:c.message})),m.createElement(p.Footer,{style:{display:"flex",justifyContent:"flex-end",alignItems:"center"}},a?m.createElement(w,{style:{marginRight:10},content:(t?"Updating":"Creating")+" ..."}):m.createElement(b,{appearance:"primary",onClick:async()=>{const{hasError:e}=await n.current.checkAsync();if(!e){d(void 0),o(!0);try{t?await s.db.modifyCollectionById(t,l.name,l.tag):await s.db.createCollection(l.name,l.tag),r()}catch(a){d(a)}finally{o(!1)}}}},"Confirm"),m.createElement(b,{appearance:"subtle",onClick:r},"Cancel")))}const{StringType:ye}=u.Types;function fe({open:e,selectedPresetId:t,onClose:r}){const n=m.useRef(),s=m.useRef(),a=m.useContext(le),[o,l]=m.useState(!1),[i,c]=m.useState({}),[d,I]=m.useState(void 0),[S,C]=m.useState([]),[R,T]=m.useState([]),[O,k]=m.useState([]),[x,A]=m.useState(),[q,D]=m.useState(),[B,V]=m.useState(),H=u.Model({name:ye().isRequired("Name is required"),collectionId:ye().isRequired("Collection is required"),serverId:ye().isRequired("Server is required"),endpoint:ye().isRequired("Endpoint is required")});m.useEffect((()=>{c({}),t&&async function(){const e=await a.db.getPresetById(t);s.current.jsonEditor.set(e.request),c({name:e.name,collectionId:e.collectionId,serverId:e.serverId,endpoint:e.endpoint,request:e.request})}()}),[t]),m.useEffect((()=>{!async function(){const e=await a.db.listCollectionsWithSearch(x);T(e)}()}),[x]),m.useEffect((()=>{!async function(){const e=await a.db.listServers(q);C(e)}()}),[q]),m.useEffect((()=>{!async function(){const e=await a.db.listEndpoints(i.serverId,B);k(e)}()}),[i.serverId,B]),m.useEffect((()=>{if(i.endpoint&&!t){const e=O.find((e=>e.endpoint===i.endpoint)).request,t=JSON.parse(e);s.current.jsonEditor.set(t)}}),[i.endpoint]);return m.createElement(p,{show:e,size:"xs",onHide:r,size:"md",overflow:!1},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,t?"Edit":"Create"," Preset")),m.createElement(p.Body,null,m.createElement(E,{ref:n,fluid:!0,model:H,formValue:i,onChange:c},m.createElement(h,null,m.createElement(y,null,"Name"),m.createElement(f,{name:"name",accepter:v})),m.createElement(h,null,m.createElement(y,null,"Collection"),m.createElement(f,{name:"collectionId",accepter:j,block:!0,onSearch:A,data:null==R?void 0:R.map((({name:e,id:t})=>({label:e,value:t})))}),m.createElement(g,null,"Currently only support single layer grouping, nested is not supported.")),m.createElement(h,null,m.createElement(y,null,"Server"),m.createElement(f,{name:"serverId",accepter:j,block:!0,onSearch:D,data:null==S?void 0:S.map((({name:e,id:t,connection:r})=>({label:`${e} ( ${r} )`,value:t})))})),m.createElement(h,null,m.createElement(y,null,"Endpoint"),m.createElement(f,{name:"endpoint",accepter:j,block:!0,onSearch:V,data:null==O?void 0:O.map((({endpoint:e})=>({label:e,value:e})))})),m.createElement(h,null,m.createElement(y,null,"Request"),m.createElement(P,{ref:s,htmlElementProps:{style:{height:500}},mode:"code",theme:a.view.getAceTheme(a.storage.getTheme()),ace:L,value:{}}))),d&&m.createElement(_,{type:"error",showIcon:!0,description:d.message})),m.createElement(p.Footer,{style:{display:"flex",justifyContent:"flex-end",alignItems:"center"}},o?m.createElement(w,{style:{marginRight:10},content:(t?"Updating":"Creating")+" ..."}):m.createElement(b,{appearance:"primary",onClick:async()=>{const{hasError:e}=await n.current.checkAsync();if(!e){I(void 0),l(!0);try{const e=s.current.jsonEditor.get();t?await a.db.modifyPresetById(t,i.name,i.collectionId,i.serverId,i.endpoint,e):await a.db.createPreset(i.name,i.collectionId,i.serverId,i.endpoint,e),r()}catch(o){I(o)}finally{l(!1)}}}},"Confirm"),m.createElement(b,{appearance:"subtle",onClick:r},"Cancel")))}function ve({setCurrent:e,setServerId:t,setEndpoint:r}){const n=m.useContext(le),[s,a]=m.useState(void 0),[o,l]=m.useState(void 0),[i,c]=m.useState(void 0),[d,u]=m.useState(void 0),[E,h]=m.useState(void 0),[y,f]=m.useState(void 0),[v,g]=pe(n.db.listCollections),[_,w]=pe((e=>d?n.db.listPresetsByCollectionId(e,d):ue));let I=q;I=q.default;return m.createElement(m.Fragment,null,m.createElement(he,{open:i,selectedCollectionId:d,onClose:()=>{c(void 0),v.refresh()}}),m.createElement(fe,{open:E,selectedPresetId:y,onClose:()=>{h(void 0),_.refresh()}}),m.createElement(p,{backdrop:!0,show:void 0!==s,onHide:()=>a(void 0),size:"xs"},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,m.createElement(k,{icon:"remind",style:{color:"#ffb300",marginRight:10}}),"Delete collection")),m.createElement(p.Body,null,"Collection once deleted will not be recover anymore. All of the preset under collection will be deleted also. Are you sure want to proceed?"),m.createElement(p.Footer,null,m.createElement(b,{appearance:"primary",onClick:async()=>{A.info("Deleting collection ...");try{await n.db.deleteCollectionById(s),A.success("Delete collection successfully"),a(void 0),v.refresh()}catch(e){A.error("Error when deleting collection: ",e.message)}}},"Ok"),m.createElement(b,{onClick:()=>a(void 0),appearance:"subtle"},"Cancel"))),m.createElement(p,{backdrop:!0,show:void 0!==o,onHide:()=>l(void 0),size:"xs"},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,m.createElement(k,{icon:"remind",style:{color:"#ffb300",marginRight:10}}),"Delete preset")),m.createElement(p.Body,null,"Preset once deleted will not be recover anymore. Are you sure want to proceed?"),m.createElement(p.Footer,null,m.createElement(b,{appearance:"primary",onClick:async()=>{A.info("Deleting preset ...");try{await n.db.deletePresetById(o),A.success("Delete preset successfully"),l(void 0),_.refresh()}catch(e){A.error("Error when deleting preset: ",e.message)}}},"Ok"),m.createElement(b,{onClick:()=>l(void 0),appearance:"subtle"},"Cancel"))),m.createElement(b,{appearance:"primary",onClick:()=>{c(!0),u(void 0)}},m.createElement(k,{icon:"plus"})," Create Collection"),m.createElement(b,{style:{marginLeft:15},appearance:"primary",onClick:()=>{h(!0),f(void 0)}},m.createElement(k,{icon:"plus"})," Create Preset"),m.createElement("div",{style:{marginTop:10,marginBottom:10}},(null==g?void 0:g.length)>0?m.createElement(I,{onLastItemVisible:null==v?void 0:v.loadMore,alignCenter:!1,itemStyle:{outline:"none"},data:g.map((e=>m.createElement("div",{key:e.id,style:{margin:10}},m.createElement(D,{style:d===e.id?{border:"1px solid #4BB543"}:{},className:"folder-panel",onClick:()=>(e=>{u(e.id),_.refresh()})(e),bordered:!0},m.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"baseline"}},d===e.id?m.createElement(k,{icon:"folder-open"}):m.createElement(k,{icon:"folder"}),m.createElement("p",{style:{marginLeft:10}},e.name," ",e.tag&&m.createElement(B,{style:{marginLeft:5}},e.tag)),m.createElement(V,{trigger:"click",placement:"bottom",speaker:m.createElement(H,{full:!0},m.createElement(N.Menu,null,m.createElement(N.Item,{icon:m.createElement(k,{icon:"edit"}),onSelect:()=>(e=>{c(!0),u(e.id)})(e)},"Edit"),m.createElement(N.Item,{icon:m.createElement(k,{icon:"trash"}),onSelect:()=>a(e.id)},"Delete")))},m.createElement(k,{style:{marginLeft:15},icon:"ellipsis-h"})))))))}):m.createElement("h4",{style:{textAlign:"center"}},"You don't have any collection yet. Create your first collection now!")),d&&((null==w?void 0:w.length)>0?m.createElement(I,{onLastItemVisible:null==_?void 0:_.loadMore,alignCenter:!1,itemStyle:{outline:"none"},data:w.map((s=>m.createElement("div",{key:s.id,style:{margin:10}},m.createElement(D,{className:"preset-panel",onClick:()=>(s=>{e("preset"),t(s.serverId),r(s.endpoint),n.view.setRequestJSON(s.request),n.view.setResponseJSON({})})(s),bordered:!0},m.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},m.createElement("p",{style:{marginLeft:5}},"( ",s.endpoint," ) ",s.name),m.createElement(V,{trigger:"click",placement:"bottom",speaker:m.createElement(H,{full:!0},m.createElement(N.Menu,null,m.createElement(N.Item,{icon:m.createElement(k,{icon:"edit"}),onSelect:()=>(e=>{h(!0),f(e.id)})(s)},"Edit"),m.createElement(N.Item,{icon:m.createElement(k,{icon:"trash"}),onSelect:()=>l(s.id)},"Delete")))},m.createElement(k,{style:{marginLeft:15},icon:"ellipsis-h"})))))))}):m.createElement("h4",{style:{textAlign:"center"}},"You don't have any preset yet. Create your first preset now!")))}function ge({setCurrent:e,setServerId:t,setEndpoint:r}){const n=m.useContext(le),[s,a]=m.useState(void 0),[o,l]=pe(n.db.listHistories);m.useEffect((()=>{n.view.historyController=o}),[o]);const i=()=>{a(void 0)};let c=q;return c=q.default,m.createElement(m.Fragment,null,(null==l?void 0:l.length)>0?m.createElement(c,{onLastItemVisible:null==o?void 0:o.loadMore,alignCenter:!1,itemStyle:{outline:"none"},data:l.map((s=>m.createElement("div",{key:s.id,style:{margin:10}},m.createElement(D,{bordered:!0,className:"history-panel",onClick:()=>(s=>{e("history"),t(s.serverId),r(s.endpoint),n.view.setRequestJSON(s.request),n.view.setResponseJSON(s.response)})(s)},m.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},s.isError?m.createElement(B,{color:"red"},"ERROR"):m.createElement(B,{color:"green"},"SUCCESS"),m.createElement("p",{style:{marginLeft:5}},"( ",s.endpoint," ) ",s.connection),m.createElement(z,{style:{marginLeft:5},appearance:"subtle",icon:m.createElement(k,{icon:"trash"}),onClick:()=>a(s.id)}))))))}):m.createElement("h4",{style:{textAlign:"center"}},"You don't have any history yet. Start with your first request now!"),m.createElement(p,{backdrop:!0,show:void 0!==s,onHide:i,size:"xs"},m.createElement(p.Header,{closeButton:!1},m.createElement(p.Title,null,m.createElement(k,{icon:"remind",style:{color:"#ffb300",marginRight:10}}),"Delete history")),m.createElement(p.Body,null,"History once deleted will not be recover anymore. Are you sure want to proceed?"),m.createElement(p.Footer,null,m.createElement(b,{appearance:"primary",onClick:async()=>{A.info("Deleting history ...");try{await n.db.deleteHistoryById(s),i(),A.success("Delete history successfully"),o.refresh()}catch(e){A.error("Error when deleting history: ",e.message)}}},"Ok"),m.createElement(b,{onClick:i,appearance:"subtle"},"Cancel"))))}function _e(){const e=m.useContext(le),[t,r]=m.useState(!1),[n,s]=[m.useRef(),m.useRef()],[a,o]=m.useState("history"),[l,i]=m.useState("vscode-webview"===(null==window?void 0:window.mode)?window.editorTheme:e.storage.getTheme()),[c,d]=m.useState("vscode-webview"===(null==window?void 0:window.mode)?window.appTheme:e.storage.getAppTheme()),[u,p]=m.useState(),[f,v]=m.useState(""),[g,R]=m.useState(),[T,O]=m.useState(),[x,A]=m.useState(!1),[q,B]=m.useState(!1),[V,H]=m.useState(void 0),[N,J]=m.useState("normal");let $=null;const U=F.useLiveQuery((()=>e.db.listServers(f)),[t,f]),G=F.useLiveQuery((()=>e.db.listEndpoints(u,T)),[u,T,x]);m.useEffect((()=>{if(s.current.jsonEditor.aceEditor.setOptions({readOnly:!0}),e.view.request=n.current,e.view.response=s.current,"vscode-webview"===(null==window?void 0:window.mode)){const t=JSON.parse(window.servers);t.length>0&&t.forEach((async t=>{let r=[];try{r=await e.api.reloadServerEndpoints(t.connection,t.password)}catch(n){r=[]}await e.db.createServer(te(),t.name,t.connection,t.password,r)}))}}),[]),m.useEffect((()=>{g&&"normal"===N&&(e.view.setRequestJSON(G.find((e=>e.endpoint===g)).request),e.view.setResponseJSON({}))}),[g]),m.useEffect((()=>{l&&function(e){switch(e){case"./assets/themes/ambiance.js":return W((()=>__import__("./ambiance.7be3e4f0.js")),void 0);case"./assets/themes/chaos.js":return W((()=>__import__("./chaos.4b6f8594.js")),void 0);case"./assets/themes/chrome.js":return W((()=>__import__("./chrome.fd151685.js")),void 0);case"./assets/themes/clouds.js":return W((()=>__import__("./clouds.1da898e5.js")),void 0);case"./assets/themes/clouds_midnight.js":return W((()=>__import__("./clouds_midnight.1de33a39.js")),void 0);case"./assets/themes/cobalt.js":return W((()=>__import__("./cobalt.e2730c60.js")),void 0);case"./assets/themes/crimson_editor.js":return W((()=>__import__("./crimson_editor.e68cc107.js")),void 0);case"./assets/themes/dawn.js":return W((()=>__import__("./dawn.aaa40555.js")),void 0);case"./assets/themes/dracula.js":return W((()=>__import__("./dracula.fc88cdc2.js")),void 0);case"./assets/themes/dreamweaver.js":return W((()=>__import__("./dreamweaver.78ea346b.js")),void 0);case"./assets/themes/eclipse.js":return W((()=>__import__("./eclipse.2c70757f.js")),void 0);case"./assets/themes/github.js":return W((()=>__import__("./github.852f1cb3.js")),void 0);case"./assets/themes/gob.js":return W((()=>__import__("./gob.f70d9ed8.js")),void 0);case"./assets/themes/gruvbox.js":return W((()=>__import__("./gruvbox.d513ca79.js")),void 0);case"./assets/themes/idle_fingers.js":return W((()=>__import__("./idle_fingers.30dfedad.js")),void 0);case"./assets/themes/iplastic.js":return W((()=>__import__("./iplastic.848db36b.js")),void 0);case"./assets/themes/katzenmilch.js":return W((()=>__import__("./katzenmilch.e6f46fc5.js")),void 0);case"./assets/themes/kr_theme.js":return W((()=>__import__("./kr_theme.1d624c2a.js")),void 0);case"./assets/themes/kuroir.js":return W((()=>__import__("./kuroir.1f7e9c89.js")),void 0);case"./assets/themes/merbivore.js":return W((()=>__import__("./merbivore.75dff3f5.js")),void 0);case"./assets/themes/merbivore_soft.js":return W((()=>__import__("./merbivore_soft.228a4016.js")),void 0);case"./assets/themes/monokai.js":return W((()=>__import__("./monokai.90dc2f00.js")),void 0);case"./assets/themes/mono_industrial.js":return W((()=>__import__("./mono_industrial.833e4398.js")),void 0);case"./assets/themes/pastel_on_dark.js":return W((()=>__import__("./pastel_on_dark.fd793d99.js")),void 0);case"./assets/themes/solarized_dark.js":return W((()=>__import__("./solarized_dark.07c5862d.js")),void 0);case"./assets/themes/solarized_light.js":return W((()=>__import__("./solarized_light.f77d4588.js")),void 0);case"./assets/themes/sqlserver.js":return W((()=>__import__("./sqlserver.fe7518c0.js")),void 0);case"./assets/themes/terminal.js":return W((()=>__import__("./terminal.1a354bde.js")),void 0);case"./assets/themes/textmate.js":return W((()=>__import__("./textmate.8a9e25f6.js")),void 0);case"./assets/themes/tomorrow.js":return W((()=>__import__("./tomorrow.ee6c907c.js")),void 0);case"./assets/themes/tomorrow_night.js":return W((()=>__import__("./tomorrow_night.2ecd9f6c.js")),void 0);case"./assets/themes/tomorrow_night_blue.js":return W((()=>__import__("./tomorrow_night_blue.bd316ae0.js")),void 0);case"./assets/themes/tomorrow_night_bright.js":return W((()=>__import__("./tomorrow_night_bright.4bcef419.js")),void 0);case"./assets/themes/tomorrow_night_eighties.js":return W((()=>__import__("./tomorrow_night_eighties.0b405491.js")),void 0);case"./assets/themes/twilight.js":return W((()=>__import__("./twilight.7494f210.js")),void 0);case"./assets/themes/vibrant_ink.js":return W((()=>__import__("./vibrant_ink.4daa84e6.js")),void 0);case"./assets/themes/xcode.js":return W((()=>__import__("./xcode.45aaf43c.js")),void 0);default:return Promise.reject(new Error("Unknown variable dynamic import: "+e))}}(`./assets/themes/${l}.js`).then((()=>{e.view.setRequestTheme(l),e.view.setResponseTheme(l),e.storage.setTheme(l)}))}),[l]),m.useEffect((()=>{$&&$.parentNode.removeChild($),$=document.createElement("link"),$.rel="stylesheet","vscode-webview"===(null==window?void 0:window.mode)?$.href=`${window.base}/${c}.css`:$.href=`./${c}.css`,$.dataset.theme=c,document.head.appendChild($),e.storage.setAppTheme(c)}),[c]);const K={setting:m.createElement(me,{theme:l,setTheme:i,appTheme:c,setAppTheme:d}),preset:m.createElement(ve,{setCurrent:J,setServerId:p,setEndpoint:R}),history:m.createElement(ge,{setCurrent:J,setServerId:p,setEndpoint:R})};return m.createElement("div",null,m.createElement(ce,{selectedServerId:u,open:t,onClose:()=>r(!1)}),m.createElement(D,{style:{marginLeft:40,marginRight:40}},m.createElement(M,{appearance:"tabs",activeKey:a,onSelect:o},m.createElement(M.Item,{eventKey:"history",icon:m.createElement(k,{icon:"history"})},"History"),m.createElement(M.Item,{eventKey:"preset",icon:m.createElement(k,{icon:"list"})},"Collection"),m.createElement(M.Item,{eventKey:"setting",icon:m.createElement(k,{icon:"setting"})},"Setting")),m.createElement(D,null,K[a])),m.createElement(I,{fluid:!0,style:{marginTop:"calc(3vh)",marginBottom:"calc(3vh)",marginLeft:"20px",marginRight:"20px",height:"calc(94vh)"}},m.createElement(S,{style:{height:"100%"}},m.createElement(C,{style:{height:"100%"},xs:10,xsPush:1},m.createElement(S,{style:{display:"flex",height:"100%",flexDirection:"column"}},m.createElement(E,{fluid:!0},m.createElement(h,null,m.createElement(y,null,"Server"),m.createElement("div",{style:{display:"flex"}},m.createElement(j,{style:{flex:1},block:!0,placeholder:"Please select server ...",value:u,onChange:p,onSearch:v,data:null==U?void 0:U.map((({name:e,id:t})=>({label:e,value:t})))}),m.createElement(z,{appearances:"primary",style:{marginLeft:10},icon:m.createElement(k,{icon:u?"edit2":"plus"}),onClick:()=>r(!0)}))),m.createElement(h,null,m.createElement(y,null,"Endpoint"),m.createElement("div",{style:{display:"flex"}},m.createElement(j,{style:{flex:1},block:!0,placeholder:"Please select endpoint ...",value:g,onChange:e=>{J("normal"),R(e)},onSearch:O,data:null==G?void 0:G.map((({endpoint:e})=>({label:e,value:e})))}),m.createElement(z,{appearance:"primary",style:{marginLeft:10},icon:m.createElement(k,{icon:"reload"}),onClick:async()=>{if(u){H(void 0);try{const t=await e.db.getServerById(u),r=await e.api.reloadServerEndpoints(t.connection,t.password);await e.db.modifyServerEndpointsById(u,r),A(!x)}catch(t){H(t)}}}})))),m.createElement(P,{htmlElementProps:{style:{flex:1,marginBottom:20,marginTop:20}},ref:n,mode:"code",ace:L,value:{}}),q?m.createElement(w,{style:{textAlign:"center"},content:"Sending Request ..."}):m.createElement(b,{style:{width:"100%"},appearance:"primary",onClick:async()=>{if(u&&g){B(!0),H(void 0);try{const t=e.view.getRequestJSON(),r=await e.db.getServerById(u),n=await e.api.sendRequest(r.connection,g,t,r.password),s="string"==typeof n;await e.db.createHistory(u,g,t,n,s),e.view.setResponseJSON(n),e.view.historyController.refresh()}catch(t){H(t)}finally{B(!1)}}}},m.createElement(k,{icon:"send"})," Send Request"))),m.createElement(C,{xs:10,xsPush:3,style:{display:"flex",flexDirection:"column",height:"100%"}},V&&m.createElement(_,{style:{marginBottom:20},type:"error",showIcon:!0,description:V.message}),m.createElement(P,{htmlElementProps:{style:{flex:1}},ref:s,mode:"code",ace:L,value:{}})))))}J.render(m.createElement(le.Provider,{value:new oe},m.createElement(_e,null)),document.getElementById("root"));