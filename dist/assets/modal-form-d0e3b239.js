import{d as a,p as o,a4 as t,ai as s,a9 as e,a8 as n,am as l,ak as d,aa as i,aO as r,K as u,aq as m,cQ as p}from"./index-c269230c.js";const f=a({__name:"modal-form",props:{show:{type:Boolean},formBtnLoading:{type:Boolean}},emits:["update:show","update:formBtnLoading","confirmForm"],setup(a,{emit:f}){const c=a,g=o({set:a=>{f("update:show",a)},get:()=>c.show}),h=o({set:a=>{h.value=a,f("update:formBtnLoading",a)},get:()=>c.formBtnLoading??!1});return(a,o)=>{const c=u,w=m,_=p;return t(),s(_,{show:d(g),"onUpdate:show":o[2]||(o[2]=a=>r(g)?g.value=a:null),"show-icon":!1,preset:"dialog",title:"新建"},{action:e((()=>[n(w,null,{default:e((()=>[n(c,{type:"tertiary",onClick:o[0]||(o[0]=()=>g.value=!1)},{default:e((()=>[l("取消")])),_:1}),n(c,{type:"success",loading:d(h),onClick:o[1]||(o[1]=()=>{f("confirmForm")})},{default:e((()=>[l("确定")])),_:1},8,["loading"])])),_:1})])),default:e((()=>[i(a.$slots,"default")])),_:3},8,["show"])}}});export{f as _};
