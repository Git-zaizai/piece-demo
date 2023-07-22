import{d as e,a4 as a,a5 as l,a6 as t,ah as r,j as o,a8 as d,ak as u,a9 as n,cI as i,F as s,aj as c,ai as m,am as f,al as p,h,cJ as v,K as w,ag as b,at as y,cK as g,aq as k,cL as _}from"./index-c269230c.js";import{Z as U,_ as x,a as z}from"./index-aa081a4d.js";import{_ as j}from"./modal-form-d0e3b239.js";import"./FullscreenOutlined-c551ab9f.js";import"./Dropdown-bb926cf5.js";import"./ChevronRight-fe71a9a1.js";import"./use-theme-vars-6a8454f2.js";const C={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},F=[t("g",{fill:"none"},[t("path",{d:"M3.26 11.602C3.942 8.327 6.793 6 10 6c3.206 0 6.057 2.327 6.74 5.602a.5.5 0 0 0 .98-.204C16.943 7.673 13.693 5 10 5c-3.693 0-6.943 2.673-7.72 6.398a.5.5 0 0 0 .98.204zM10 8a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zm-2.5 3.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0z",fill:"currentColor"})],-1)],E=e({name:"Eye20Regular",render:function(e,t){return a(),l("svg",C,F)}}),K={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},M=[t("g",{fill:"none"},[t("path",{d:"M2.854 2.146a.5.5 0 1 0-.708.708l3.5 3.498a8.097 8.097 0 0 0-3.366 5.046a.5.5 0 1 0 .979.204a7.09 7.09 0 0 1 3.108-4.528L7.95 8.656a3.5 3.5 0 1 0 4.884 4.884l4.313 4.314a.5.5 0 0 0 .708-.708l-15-15zm7.27 5.857l3.363 3.363a3.5 3.5 0 0 0-3.363-3.363zM7.53 5.41l.803.803A6.632 6.632 0 0 1 10 6c3.206 0 6.057 2.327 6.74 5.602a.5.5 0 1 0 .98-.204C16.943 7.673 13.693 5 10 5c-.855 0-1.687.143-2.469.41z",fill:"currentColor"})],-1)],I=e({name:"EyeOff20Filled",render:function(e,t){return a(),l("svg",K,M)}}),R=e({name:"table-link"}),q=e({...R,setup(e){const t=[{title:"id",key:"id",width:50},{title:"小说名",key:"title"},{title:"章节数",key:"chapter",render:e=>e.chapter?`${e.chapter}章`:"无"},{title:"读完",key:"duwan",render:e=>0==e.duwan?h(v,{bordered:!1,type:"success"},{default:()=>"读完"}):h(v,{bordered:!1,type:"warning"},{default:()=>"未读完"})},{title:"推荐/小说",key:"recommended",render(e){let a="小说";return 1==e.recommended&&(a="推荐"),h(v,{bordered:!1,type:"info"},{default:()=>a})}},{title:"删除状态",key:"isdel",render:e=>0===e.isdel?h(v,{bordered:!1,type:"error"},{default:()=>"删除",icon:()=>h(I)}):h(v,{bordered:!1,type:"success"},{default:()=>"存在",icon:()=>h(E)})},{title:"首页链接",key:"url",render:e=>h(w,{strong:!0,tertiary:!0,size:"small",onClick:()=>{}},{default:()=>e.url&&""!==e.url?"复制":"无"})},{title:"章节链接",key:"chapterUrl",render:e=>h(w,{strong:!0,tertiary:!0,size:"small",onClick:()=>{}},{default:()=>e.chapterUrl&&""!==e.chapterUrl?"复制":"无"})},{title:"备注",key:"beizhu",ellipsis:{tooltip:!0}}],C=[{value:0,label:"未读完"},{value:1,label:"读完"}],F=[{value:0,label:"小说"},{value:1,label:"推荐"}],K={title:{trigger:"blur",required:!0,validator:(e,a)=>""===a?new Error("不能为空"):!q||!M.data.some((e=>e.title===a))||new Error("小说名不能相同")}},M=r({data:[],form:{title:"",chapter:"",duwan:0,recommended:0,url:"",chapterUrl:"",beizhu:""},show:!1}),R=async()=>{try{const{data:e}=await b.get("/crud/select/novel");M.data=e.reverse()}catch(e){}};R();let q=!0;const A=o(),B=()=>{M.form={title:"",chapter:"",duwan:0,recommended:0,url:"",chapterUrl:"",beizhu:""},q=!0,M.show=!0},D=e=>{q=!1,M.form=e,M.show=!0},L=()=>{A.value.validate((async e=>{try{if(!e){let e=q?"/crud/insert/novel":"/crud/update/novel",a=M.form;if(q||(a.where={title:M.form.title}),await b.post(e,M.form),q){const e=await b.get("/desc-limit/novel");M.data.unshift(...e.data.data),M.form={title:"",chapter:"",duwan:0,recommended:0,url:"",chapterUrl:"",beizhu:""}}window.$message.success("操作成功")}}catch(a){}}))},O=async(e,a)=>{await b.post("/crud/update/novel",{where:{title:e.title},isdel:!e.isdel}).catch((e=>Promise.reject(e))),M.data[a].isdel=Number(!e.isdel)};return(e,r)=>{const o=y,h=g,v=x,w=k,b=z,E=_;return a(),l("div",null,[d(u(U),{columns:t,data:u(M).data,"checkbox-key":"id",onAdd:B,onFlushed:R,onDelItem:O,onUpdateItem:D},null,8,["data"]),d(j,{show:u(M).show,"onUpdate:show":r[7]||(r[7]=e=>u(M).show=e),onConfirmForm:L},{default:n((()=>[d(E,{ref_key:"formRef",ref:A,"label-placement":"left","label-width":"100","label-align":"left",model:u(M).form,rules:K,onKeyup:i(L,["enter"])},{default:n((()=>[d(h,{label:"小说名:",path:"title"},{default:n((()=>[d(o,{placeholder:"小说名",clearable:"",value:u(M).form.title,"onUpdate:value":r[0]||(r[0]=e=>u(M).form.title=e)},null,8,["value"])])),_:1}),d(h,{label:"章节数："},{default:n((()=>[d(o,{placeholder:"章节数",clearable:"",value:u(M).form.chapter,"onUpdate:value":r[1]||(r[1]=e=>u(M).form.chapter=e)},null,8,["value"])])),_:1}),d(h,{label:"读完："},{default:n((()=>[d(b,{value:u(M).form.duwan,"onUpdate:value":r[2]||(r[2]=e=>u(M).form.duwan=e),name:"radiogroup"},{default:n((()=>[d(w,null,{default:n((()=>[(a(!0),l(s,null,c(C,(e=>(a(),m(v,{key:e.value,value:e.value},{default:n((()=>[f(p(e.label),1)])),_:2},1032,["value"])))),128))])),_:1})])),_:1},8,["value"])])),_:1}),d(h,{label:"推荐/小说："},{default:n((()=>[d(b,{value:u(M).form.recommended,"onUpdate:value":r[3]||(r[3]=e=>u(M).form.recommended=e),name:"radiogroup"},{default:n((()=>[d(w,null,{default:n((()=>[(a(!0),l(s,null,c(F,(e=>(a(),m(v,{key:e.value,value:e.value},{default:n((()=>[f(p(e.label),1)])),_:2},1032,["value"])))),128))])),_:1})])),_:1},8,["value"])])),_:1}),d(h,{label:"首页链接："},{default:n((()=>[d(o,{placeholder:"首页链接",clearable:"",value:u(M).form.url,"onUpdate:value":r[4]||(r[4]=e=>u(M).form.url=e)},null,8,["value"])])),_:1}),d(h,{label:"章节链接："},{default:n((()=>[d(o,{placeholder:"章节链接",clearable:"",value:u(M).form.chapterUrl,"onUpdate:value":r[5]||(r[5]=e=>u(M).form.chapterUrl=e)},null,8,["value"])])),_:1}),d(h,{label:"备注："},{default:n((()=>[d(o,{placeholder:"备注",type:"textarea",clearable:"",value:u(M).form.beizhu,"onUpdate:value":r[6]||(r[6]=e=>u(M).form.beizhu=e)},null,8,["value"])])),_:1})])),_:1},8,["model","onKeyup"])])),_:1},8,["show"])])}}});export{q as default};
