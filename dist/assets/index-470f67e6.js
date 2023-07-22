import{d as t,a4 as e,a5 as n,a6 as r,a8 as s,K as i,an as a,cN as o,ah as u,ak as l,a9 as c,x as d,am as h,al as f,y as m,h as $,cO as p,cE as y,cF as w,cP as g,cQ as v,cG as M,at as b,cM as D}from"./index-29570a71.js";import{Z as S}from"./index-1c63a950.js";import{_ as k}from"./modal-form-2e4992b4.js";import{I as O}from"./inputFile-bc137f5b.js";import"./FullscreenOutlined-c08eb37e.js";import"./Dropdown-a455eef8.js";import"./ChevronRight-bd74bdb9.js";import"./use-theme-vars-edad6ce8.js";const _={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},x=[r("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[r("path",{d:"M14 3v4a1 1 0 0 0 1 1h4"}),r("path",{d:"M5 13V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-5.5M2 19h7m-3-3l3 3l-3 3"})],-1)],F=t({name:"FileImport",render:function(t,r){return e(),n("svg",_,x)}}),j=t({name:"index-actions-columns",props:{upFn:Function,delFn:Function},setup:t=>()=>s("div",{class:"flex-juspb-alc"},[s(i,{type:"success",ghost:!0,size:"small",onClick:t.upFn()},{icon:()=>s(a,{class:"scale-X"},{default:()=>s(F,null,null)}),default:()=>"导出"}),s(i,{type:"warning",ghost:!0,size:"small",onClick:t.delFn()},{icon:()=>s(a,{component:F},null),default:()=>"导入"})])});var Y={};({get exports(){return Y},set exports(t){Y=t}}).exports=function(){var t=1e3,e=6e4,n=36e5,r="millisecond",s="second",i="minute",a="hour",o="day",u="week",l="month",c="quarter",d="year",h="date",f="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},y=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},w={s:y,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+y(r,2,"0")+":"+y(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,l),i=n-s<0,a=e.clone().add(r+(i?-1:1),l);return+(-(r+(n-s)/(i?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:u,d:o,D:h,h:a,m:i,s:s,ms:r,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",v={};v[g]=p;var M=function(t){return t instanceof k},b=function t(e,n,r){var s;if(!e)return g;if("string"==typeof e){var i=e.toLowerCase();v[i]&&(s=i),n&&(v[i]=n,s=i);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;v[o]=e,s=o}return!r&&s&&(g=s),s||!r&&g},D=function(t,e){if(M(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new k(n)},S=w;S.l=b,S.i=M,S.w=function(t,e){return D(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var k=function(){function p(t){this.$L=b(t.locale,null,!0),this.parse(t)}var y=p.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var s=r[2]-1||0,i=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return S},y.isValid=function(){return!(this.$d.toString()===f)},y.isSame=function(t,e){var n=D(t);return this.startOf(e)<=n&&n<=this.endOf(e)},y.isAfter=function(t,e){return D(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<D(t)},y.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var n=this,r=!!S.u(e)||e,c=S.p(t),f=function(t,e){var s=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?s:s.endOf(o)},m=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},$=this.$W,p=this.$M,y=this.$D,w="set"+(this.$u?"UTC":"");switch(c){case d:return r?f(1,0):f(31,11);case l:return r?f(1,p):f(0,p+1);case u:var g=this.$locale().weekStart||0,v=($<g?$+7:$)-g;return f(r?y-v:y+(6-v),p);case o:case h:return m(w+"Hours",0);case a:return m(w+"Minutes",1);case i:return m(w+"Seconds",2);case s:return m(w+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var n,u=S.p(t),c="set"+(this.$u?"UTC":""),f=(n={},n[o]=c+"Date",n[h]=c+"Date",n[l]=c+"Month",n[d]=c+"FullYear",n[a]=c+"Hours",n[i]=c+"Minutes",n[s]=c+"Seconds",n[r]=c+"Milliseconds",n)[u],m=u===o?this.$D+(e-this.$W):e;if(u===l||u===d){var $=this.clone().set(h,1);$.$d[f](m),$.init(),this.$d=$.set(h,Math.min(this.$D,$.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[S.p(t)]()},y.add=function(r,c){var h,f=this;r=Number(r);var m=S.p(c),$=function(t){var e=D(f);return S.w(e.date(e.date()+Math.round(t*r)),f)};if(m===l)return this.set(l,this.$M+r);if(m===d)return this.set(d,this.$y+r);if(m===o)return $(1);if(m===u)return $(7);var p=(h={},h[i]=e,h[a]=n,h[s]=t,h)[m]||1,y=this.$d.getTime()+r*p;return S.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=S.z(this),i=this.$H,a=this.$m,o=this.$M,u=n.weekdays,l=n.months,c=function(t,n,s,i){return t&&(t[n]||t(e,r))||s[n].slice(0,i)},d=function(t){return S.s(i%12||12,t,"0")},h=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:S.s(this.$y,4,"0"),M:o+1,MM:S.s(o+1,2,"0"),MMM:c(n.monthsShort,o,l,3),MMMM:c(l,o),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,u,2),ddd:c(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(i),HH:S.s(i,2,"0"),h:d(1),hh:d(2),a:h(i,a,!0),A:h(i,a,!1),m:String(a),mm:S.s(a,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:s};return r.replace($,(function(t,e){return e||m[t]||s.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(r,h,f){var m,$=S.p(h),p=D(r),y=(p.utcOffset()-this.utcOffset())*e,w=this-p,g=S.m(this,p);return g=(m={},m[d]=g/12,m[l]=g,m[c]=g/3,m[u]=(w-y)/6048e5,m[o]=(w-y)/864e5,m[a]=w/n,m[i]=w/e,m[s]=w/t,m)[$]||w,f?g:S.a(g)},y.daysInMonth=function(){return this.endOf(l).$D},y.$locale=function(){return v[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=b(t,e,!0);return r&&(n.$L=r),n},y.clone=function(){return S.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},p}(),O=k.prototype;return D.prototype=O,[["$ms",r],["$s",s],["$m",i],["$H",a],["$W",o],["$M",l],["$y",d],["$D",h]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),D.extend=function(t,e){return t.$i||(t(e,k,D),t.$i=!0),D},D.locale=b,D.isDayjs=M,D.unix=function(t){return D(1e3*t)},D.en=v[g],D.Ls=v,D.p={},D}();const C=Y,H=r("h4",null,"详细说明：",-1),L=r("h4",null,"mysql有个神奇的语法：insert into ... on duplicate key update，该语法在insert的时候， 如果insert的数据会引起唯一索引（包括主键索引）的冲突，即这个唯一值重复了，则不会执行insert操作， 而执行后面的update操作",-1),N=r("h4",null,"所有默认 key:id，你不输入将不会进行update操作会直接往后添加",-1),T=t({name:"db"}),U=t({...T,emits:["update-item","del-item"],setup(t,{emit:r}){const a=[{title:"库名",key:"dbname"},{title:"在那个数据库",key:"db"},{title:"备注",key:"beizhu",render:t=>"无"}],o={title:"操作",key:"actions_0",fixed:"right",width:200,render:(t,e)=>$(j,{upFn:()=>_.bind(null,t),delFn:()=>Y.bind(null,t)})};async function _(t){try{const e=await p({db:t.db,tableName:t.dbname});if(0===e.data.data.langth)return void window.$message.error("表为空");const n=["["],r=e.data.data.length;e.data.data.forEach(((t,e)=>{n.push(JSON.stringify(t)),e<r-1&&n.push(",")})),n.push("]");const s=new Blob(n,{type:"application/json"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download=t.dbname+".json",a.target="_blank",a.click(),window.$message.success("导出成功"),setTimeout((()=>{a.remove(),URL.revokeObjectURL(i)}),1500)}catch(e){}}const x=u({data:[],formShow:!1,files:[],fileName:"",row:{},delKey:"id"}),F=async()=>{try{const t=await y(),e=await w(),n=[];e.data.data.forEach((t=>{n.push({dbname:t.split(".").pop(),db:"MongoDB",beizhu:""})})),t.data.data.forEach((t=>{n.push({dbname:t.Tables_in_gadgets,db:"MySQL",beizhu:""})})),x.data=n}catch(t){}};function Y(t){x.row=t,x.formShow=!0}F();const T=t=>{x.fileName=t.filesArray[0].file.name,x.files=t.filesArray},U=(t,e)=>{let n=window.$notification.create({type:t,closable:!1,title:"导入消息",content:e,meta:C().format("YYYY-MM-DD HH:mm:ss"),action:()=>$(i,{text:!0,type:"primary",onClick:()=>{n.destroy()}},{default:()=>"已读"})})},A=async()=>{try{if(!x.files.length)return void window.$message.error("请选择JSON数据文件");const t=new FormData;t.set("file",x.files[0].file),t.set("path","0");const e=await g(t),{data:n}=await v({path:e.data.url.replace("/uploads",""),db:x.row.db,tableName:x.row.dbname,delkey:x.delKey});200===n.code?U("success",`${x.row.dbname} 导入成功`):U("error",n.data.msg)}catch(t){U("error",`${x.row.dbname} 导入失败`)}};return(t,r)=>{const i=M,u=b,$=D;return e(),n("div",null,[s(l(S),{data:l(x).data,columns:a,"checkbox-key":"dbname","actions-columns":o,onFlushed:F,checkbox:!1},null,8,["data"]),s(k,{show:l(x).formShow,"onUpdate:show":r[1]||(r[1]=t=>l(x).formShow=t),title:"导入",onConfirmForm:A},{default:c((()=>[s(l(O),{title:"JSON文件",onFileChange:T}),d(s(i,{class:"mt-10"},{default:c((()=>[h(" 文件: "+f(l(x).fileName),1)])),_:1},512),[[m,l(x).files.length]]),s($,{label:"要删除key，比如自动递增的id",class:"mt-10"},{default:c((()=>[s(u,{value:l(x).delKey,"onUpdate:value":r[0]||(r[0]=t=>l(x).delKey=t),clearable:""},null,8,["value"])])),_:1}),H,L,N])),_:1},8,["show"])])}}});export{U as default};
