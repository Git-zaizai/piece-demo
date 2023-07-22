import{a as r,b as o,Y as e,g as n,az as l,aA as d,d as t,q as a,u as i,aB as s,aC as b,p as c,a3 as h,s as g,h as u,a7 as v,a4 as p,a5 as m,a8 as f,a9 as x,a6 as C,aq as z}from"./index-29570a71.js";const k=r([o("table","\n font-size: var(--n-font-size);\n font-variant-numeric: tabular-nums;\n line-height: var(--n-line-height);\n width: 100%;\n border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;\n text-align: left;\n border-collapse: separate;\n border-spacing: 0;\n overflow: hidden;\n background-color: var(--n-td-color);\n border-color: var(--n-merged-border-color);\n transition:\n background-color .3s var(--n-bezier),\n border-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n --n-merged-border-color: var(--n-border-color);\n ",[r("th","\n white-space: nowrap;\n transition:\n background-color .3s var(--n-bezier),\n border-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n text-align: inherit;\n padding: var(--n-th-padding);\n vertical-align: inherit;\n text-transform: none;\n border: 0px solid var(--n-merged-border-color);\n font-weight: var(--n-th-font-weight);\n color: var(--n-th-text-color);\n background-color: var(--n-th-color);\n border-bottom: 1px solid var(--n-merged-border-color);\n border-right: 1px solid var(--n-merged-border-color);\n ",[r("&:last-child","\n border-right: 0px solid var(--n-merged-border-color);\n ")]),r("td","\n transition:\n background-color .3s var(--n-bezier),\n border-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n padding: var(--n-td-padding);\n color: var(--n-td-text-color);\n background-color: var(--n-td-color);\n border: 0px solid var(--n-merged-border-color);\n border-right: 1px solid var(--n-merged-border-color);\n border-bottom: 1px solid var(--n-merged-border-color);\n ",[r("&:last-child","\n border-right: 0px solid var(--n-merged-border-color);\n ")]),e("bordered","\n border: 1px solid var(--n-merged-border-color);\n border-radius: var(--n-border-radius);\n ",[r("tr",[r("&:last-child",[r("td","\n border-bottom: 0 solid var(--n-merged-border-color);\n ")])])]),e("single-line",[r("th","\n border-right: 0px solid var(--n-merged-border-color);\n "),r("td","\n border-right: 0px solid var(--n-merged-border-color);\n ")]),e("single-column",[r("tr",[r("&:not(:last-child)",[r("td","\n border-bottom: 0px solid var(--n-merged-border-color);\n ")])])]),e("striped",[r("tr:nth-of-type(even)",[r("td","background-color: var(--n-td-color-striped)")])]),n("bottom-bordered",[r("tr",[r("&:last-child",[r("td","\n border-bottom: 0px solid var(--n-merged-border-color);\n ")])])])]),l(o("table","\n background-color: var(--n-td-color-modal);\n --n-merged-border-color: var(--n-border-color-modal);\n ",[r("th","\n background-color: var(--n-th-color-modal);\n "),r("td","\n background-color: var(--n-td-color-modal);\n ")])),d(o("table","\n background-color: var(--n-td-color-popover);\n --n-merged-border-color: var(--n-border-color-popover);\n ",[r("th","\n background-color: var(--n-th-color-popover);\n "),r("td","\n background-color: var(--n-td-color-popover);\n ")]))]),B=t({name:"Table",props:Object.assign(Object.assign({},i.props),{bordered:{type:Boolean,default:!0},bottomBordered:{type:Boolean,default:!0},singleLine:{type:Boolean,default:!0},striped:Boolean,singleColumn:Boolean,size:{type:String,default:"medium"}}),setup(r){const{mergedClsPrefixRef:o,inlineThemeDisabled:e,mergedRtlRef:n}=a(r),l=i("Table","-table",k,s,r,o),d=b("Table",n,o),t=c((()=>{const{size:o}=r,{self:{borderColor:e,tdColor:n,tdColorModal:d,tdColorPopover:t,thColor:a,thColorModal:i,thColorPopover:s,thTextColor:b,tdTextColor:c,borderRadius:g,thFontWeight:u,lineHeight:v,borderColorModal:p,borderColorPopover:m,tdColorStriped:f,tdColorStripedModal:x,tdColorStripedPopover:C,[h("fontSize",o)]:z,[h("tdPadding",o)]:k,[h("thPadding",o)]:B},common:{cubicBezierEaseInOut:P}}=l.value;return{"--n-bezier":P,"--n-td-color":n,"--n-td-color-modal":d,"--n-td-color-popover":t,"--n-td-text-color":c,"--n-border-color":e,"--n-border-color-modal":p,"--n-border-color-popover":m,"--n-border-radius":g,"--n-font-size":z,"--n-th-color":a,"--n-th-color-modal":i,"--n-th-color-popover":s,"--n-th-font-weight":u,"--n-th-text-color":b,"--n-line-height":v,"--n-td-padding":k,"--n-th-padding":B,"--n-td-color-striped":f,"--n-td-color-striped-modal":x,"--n-td-color-striped-popover":C}})),u=e?g("table",c((()=>r.size[0])),t,r):void 0;return{rtlEnabled:d,mergedClsPrefix:o,cssVars:e?void 0:t,themeClass:null==u?void 0:u.themeClass,onRender:null==u?void 0:u.onRender}},render(){var r;const{mergedClsPrefix:o}=this;return null===(r=this.onRender)||void 0===r||r.call(this),u("table",{class:[`${o}-table`,this.themeClass,{[`${o}-table--rtl`]:this.rtlEnabled,[`${o}-table--bottom-bordered`]:this.bottomBordered,[`${o}-table--bordered`]:this.bordered,[`${o}-table--single-line`]:this.singleLine,[`${o}-table--single-column`]:this.singleColumn,[`${o}-table--striped`]:this.striped}],style:this.cssVars},this.$slots)}}),P={},$={class:"height_100"},w=C("thead",null,[C("tr",null,[C("th",null,"Abandon"),C("th",null,"Abormal"),C("th",null,"Abolish"),C("th",null,"..."),C("th",null,"万事开头难")])],-1),y=C("tbody",null,[C("tr",null,[C("td",null,"放弃"),C("td",null,"反常的"),C("td",null,"彻底废除"),C("td",null,"..."),C("td",null,"干！我刚才背的是啥")]),C("tr",null,[C("td",null,"..."),C("td",null,"..."),C("td",null,"..."),C("td",null,"..."),C("td",null,"...")]),C("tr",null,[C("td",null,"..."),C("td",null,"..."),C("td",null,"..."),C("td",null,"..."),C("td",null,"...")])],-1);const R=v(P,[["render",function(r,o){const e=B,n=z;return p(),m("div",$,[f(n,{vertical:""},{default:x((()=>[f(e,{striped:""},{default:x((()=>[w,y])),_:1})])),_:1})])}]]);export{R as default};