import{d as a,a4 as s,a5 as e,a6 as t,a7 as l,ah as o,a8 as i,a9 as n,am as d,ak as r,al as c,cD as u,cE as g,cF as f,cG as m,an as p,_ as v,cH as b,ac as _,ad as x}from"./index-29570a71.js";const h={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},w=[t("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[t("circle",{cx:"10",cy:"10",r:"7"}),t("path",{d:"M21 21l-6-6"}),t("path",{d:"M7 10l2 2l4-4"})],-1)],y=a({name:"ZoomCheck",render:function(a,t){return s(),e("svg",h,w)}}),k={class:"flex-alc"},q=(a=>(_("data-v-00a9e063"),a=a(),x(),a))((()=>t("img",{class:"hecha suspension",src:"/assets/coffee-d68d7748.svg"},null,-1))),z={class:"flex-juspb-alc"},j={class:"flex-alc"},M={class:"flex-alc"},B=l(a({__name:"index",setup(a){const l=o({mysql:{values:"",biao:""},mongodb:{values:"",biao:""}});return(async()=>{try{const a=await g(),s=await f();l.mysql.values=a.data.data.map((a=>a.Tables_in_gadgets)).join(),l.mongodb.values=s.data.data.map((a=>a.split(".").pop())).join(),l.mysql.biao=a.data.data.length,l.mongodb.biao=s.data.data.length}catch(a){l.mysql.biao="获取失败",l.mongodb.biao="获取失败"}})(),(a,o)=>{const g=m,f=p,_=v,x=b;return s(),e("div",null,[t("div",k,[i(g,{class:"suspension",title:"需求公告栏"},{default:n((()=>[d(" 额，目前以满足需求！ ")])),_:1}),q]),t("div",z,[i(g,{class:"db-tables suspension",title:"MySQL"},{"header-extra":n((()=>[i(_,{trigger:"hover"},{trigger:n((()=>[i(f,{size:"20",class:"view-curspointer"},{default:n((()=>[i(r(y))])),_:1})])),default:n((()=>[d(" 点击查看表 ")])),_:1})])),footer:n((()=>[d(c(r(l).mysql.values),1)])),default:n((()=>[t("div",j,[i(f,{size:"36"},{default:n((()=>[i(r(u))])),_:1}),i(x,{style:{"margin-left":"20px"},size:24,type:"success"},{default:n((()=>[d(c(r(l).mysql.biao)+" 个表 ",1)])),_:1})])])),_:1}),i(g,{class:"db-tables suspension",title:"MongoDB"},{"header-extra":n((()=>[i(_,{trigger:"hover"},{trigger:n((()=>[i(f,{color:"",size:"20",class:"view-curspointer"},{default:n((()=>[i(r(y))])),_:1})])),default:n((()=>[d(" 点击查看表 ")])),_:1})])),footer:n((()=>[d(c(r(l).mongodb.values),1)])),default:n((()=>[t("div",M,[i(f,{size:"36"},{default:n((()=>[i(r(u))])),_:1}),i(x,{style:{"margin-left":"20px"},size:24,type:"success"},{default:n((()=>[d(c(r(l).mongodb.biao)+" 个表 ",1)])),_:1})])])),_:1})])])}}}),[["__scopeId","data-v-00a9e063"]]);export{B as default};