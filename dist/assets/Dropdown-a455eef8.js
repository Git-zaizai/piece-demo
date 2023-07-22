import{j as e,w as o,ah as n,aS as t,aT as r,m as i,l as d,aR as l,o as a,d as s,h as u,c,n as p,dv as v,p as f,G as h,aG as b,dw as m,dx as w,dy as y,T as g,aK as x,dj as k,an as S,cX as N,db as R,F as P,dz as C,dA as O,dB as $,dC as I,b as z,e as A,a as F,g as _,Y as j,P as K,aF as T,t as D,cU as L,q as M,u as B,bY as E,X as H,a3 as U,s as q,R as G,U as W,V}from"./index-29570a71.js";import{C as X}from"./ChevronRight-bd74bdb9.js";function Y(e){return o=>{e.value=o?o.$el:null}}const J=s({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return u("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),Q=c("n-dropdown-menu"),Z=c("n-dropdown"),ee=c("n-dropdown-option");function oe(e,o){return"submenu"===e.type||void 0===e.type&&void 0!==e[o]}function ne(e){return"divider"===e.type}const te=s({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(n){const t=p(Z),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:l,activeKeyPathRef:a,animatedRef:s,mergedShowRef:u,renderLabelRef:c,renderIconRef:m,labelFieldRef:w,childrenFieldRef:y,renderOptionRef:g,nodePropsRef:x,menuPropsRef:k}=t,S=p(ee,null),R=p(Q),P=p(v),C=f((()=>n.tmNode.rawNode)),O=f((()=>{const{value:e}=y;return oe(n.tmNode.rawNode,e)})),$=f((()=>{const{disabled:e}=n.tmNode;return e})),I=function(n,t,r){if(!t)return n;const i=e(n.value);let d=null;return o(n,(e=>{null!==d&&window.clearTimeout(d),!0===e?r&&!r.value?i.value=!0:d=window.setTimeout((()=>{i.value=!0}),t):i.value=!1})),i}(f((()=>{if(!O.value)return!1;const{key:e,disabled:o}=n.tmNode;if(o)return!1;const{value:t}=r,{value:a}=i,{value:s}=d,{value:u}=l;return null!==t?u.includes(e):null!==a?u.includes(e)&&u[u.length-1]!==e:null!==s&&u.includes(e)})),300,f((()=>null===i.value&&!s.value))),z=f((()=>!!(null==S?void 0:S.enteringSubmenuRef.value))),A=e(!1);function F(){const{parentKey:e,tmNode:o}=n;o.disabled||u.value&&(d.value=e,i.value=null,r.value=o.key)}return h(ee,{enteringSubmenuRef:A}),{labelField:w,renderLabel:c,renderIcon:m,siblingHasIcon:R.showIconRef,siblingHasSubmenu:R.hasSubmenuRef,menuProps:k,popoverBody:P,animated:s,mergedShowSubmenu:f((()=>I.value&&!z.value)),rawNode:C,hasSubmenu:O,pending:b((()=>{const{value:e}=l,{key:o}=n.tmNode;return e.includes(o)})),childActive:b((()=>{const{value:e}=a,{key:o}=n.tmNode,t=e.findIndex((e=>o===e));return-1!==t&&t<e.length-1})),active:b((()=>{const{value:e}=a,{key:o}=n.tmNode,t=e.findIndex((e=>o===e));return-1!==t&&t===e.length-1})),mergedDisabled:$,renderOption:g,nodeProps:x,handleClick:function(){const{value:e}=O,{tmNode:o}=n;u.value&&(e||o.disabled||(t.doSelect(o.key,o.rawNode),t.doUpdateShow(!1)))},handleMouseMove:function(){const{tmNode:e}=n;e.disabled||u.value&&r.value!==e.key&&F()},handleMouseEnter:F,handleMouseLeave:function(e){if(n.tmNode.disabled)return;if(!u.value)return;const{relatedTarget:o}=e;!o||N({target:o},"dropdownOption")||N({target:o},"scrollbarRail")||(r.value=null)},handleSubmenuBeforeEnter:function(){A.value=!0},handleSubmenuAfterEnter:function(){A.value=!1}}},render(){var e,o;const{animated:n,rawNode:t,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:d,siblingHasSubmenu:l,renderLabel:a,renderIcon:s,renderOption:c,nodeProps:p,props:v,scrollable:f}=this;let h=null;if(r){const o=null===(e=this.menuProps)||void 0===e?void 0:e.call(this,t,t.children);h=u(le,Object.assign({},o,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const b={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},N=null==p?void 0:p(t),R=u("div",Object.assign({class:[`${i}-dropdown-option`,null==N?void 0:N.class],"data-dropdown-option":!0},N),u("div",x(b,v),[u("div",{class:[`${i}-dropdown-option-body__prefix`,d&&`${i}-dropdown-option-body__prefix--show-icon`]},[s?s(t):k(t.icon)]),u("div",{"data-dropdown-option":!0,class:`${i}-dropdown-option-body__label`},a?a(t):k(null!==(o=t[this.labelField])&&void 0!==o?o:t.title)),u("div",{"data-dropdown-option":!0,class:[`${i}-dropdown-option-body__suffix`,l&&`${i}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?u(S,null,{default:()=>u(X,null)}):null)]),this.hasSubmenu?u(m,null,{default:()=>[u(w,null,{default:()=>u("div",{class:`${i}-dropdown-offset-container`},u(y,{show:this.mergedShowSubmenu,placement:this.placement,to:f&&this.popoverBody||void 0,teleportDisabled:!f},{default:()=>u("div",{class:`${i}-dropdown-menu-wrapper`},n?u(g,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>h}):h)}))})]}):null);return c?c({node:R,option:t}):R}}),re=s({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:o}=p(Q),{renderLabelRef:n,labelFieldRef:t,nodePropsRef:r,renderOptionRef:i}=p(Z);return{labelField:t,showIcon:e,hasSubmenu:o,renderLabel:n,nodeProps:r,renderOption:i}},render(){var e;const{clsPrefix:o,hasSubmenu:n,showIcon:t,nodeProps:r,renderLabel:i,renderOption:d}=this,{rawNode:l}=this.tmNode,a=u("div",Object.assign({class:`${o}-dropdown-option`},null==r?void 0:r(l)),u("div",{class:`${o}-dropdown-option-body ${o}-dropdown-option-body--group`},u("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__prefix`,t&&`${o}-dropdown-option-body__prefix--show-icon`]},k(l.icon)),u("div",{class:`${o}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(l):k(null!==(e=l.title)&&void 0!==e?e:l[this.labelField])),u("div",{class:[`${o}-dropdown-option-body__suffix`,n&&`${o}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return d?d({node:a,option:l}):a}}),ie=s({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:o,clsPrefix:n}=this,{children:t}=e;return u(P,null,u(re,{clsPrefix:n,tmNode:e,key:e.key}),null==t?void 0:t.map((e=>{const{rawNode:t}=e;return!1===t.show?null:ne(t)?u(J,{clsPrefix:n,key:e.key}):e.isGroup?(R("dropdown","`group` node is not allowed to be put in `group` node."),null):u(te,{clsPrefix:n,tmNode:e,parentKey:o,key:e.key})})))}}),de=s({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:o}}=this.tmNode;return u("div",o,[null==e?void 0:e()])}}),le=s({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(o){const{renderIconRef:n,childrenFieldRef:t}=p(Z);h(Q,{showIconRef:f((()=>{const e=n.value;return o.tmNodes.some((o=>{var n;if(o.isGroup)return null===(n=o.children)||void 0===n?void 0:n.some((({rawNode:o})=>e?e(o):o.icon));const{rawNode:t}=o;return e?e(t):t.icon}))})),hasSubmenuRef:f((()=>{const{value:e}=t;return o.tmNodes.some((o=>{var n;if(o.isGroup)return null===(n=o.children)||void 0===n?void 0:n.some((({rawNode:o})=>oe(o,e)));const{rawNode:t}=o;return oe(t,e)}))}))});const r=e(null);return h(C,null),h(O,null),h(v,r),{bodyRef:r}},render(){const{parentKey:e,clsPrefix:o,scrollable:n}=this,t=this.tmNodes.map((t=>{const{rawNode:r}=t;return!1===r.show?null:function(e){return"render"===e.type}(r)?u(de,{tmNode:t,key:t.key}):ne(r)?u(J,{clsPrefix:o,key:t.key}):function(e){return"group"===e.type}(r)?u(ie,{clsPrefix:o,tmNode:t,parentKey:e,key:t.key}):u(te,{clsPrefix:o,tmNode:t,parentKey:e,key:t.key,props:r.props,scrollable:n})}));return u("div",{class:[`${o}-dropdown-menu`,n&&`${o}-dropdown-menu--scrollable`],ref:"bodyRef"},n?u(I,{contentClass:`${o}-dropdown-menu__content`},{default:()=>t}):t,this.showArrow?$({clsPrefix:o,arrowStyle:this.arrowStyle}):null)}}),ae=z("dropdown-menu","\n transform-origin: var(--v-transform-origin);\n background-color: var(--n-color);\n border-radius: var(--n-border-radius);\n box-shadow: var(--n-box-shadow);\n position: relative;\n transition:\n background-color .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier);\n",[A(),z("dropdown-option","\n position: relative;\n ",[F("a","\n text-decoration: none;\n color: inherit;\n outline: none;\n ",[F("&::before",'\n content: "";\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n ')]),z("dropdown-option-body","\n display: flex;\n cursor: pointer;\n position: relative;\n height: var(--n-option-height);\n line-height: var(--n-option-height);\n font-size: var(--n-font-size);\n color: var(--n-option-text-color);\n transition: color .3s var(--n-bezier);\n ",[F("&::before",'\n content: "";\n position: absolute;\n top: 0;\n bottom: 0;\n left: 4px;\n right: 4px;\n transition: background-color .3s var(--n-bezier);\n border-radius: var(--n-border-radius);\n '),_("disabled",[j("pending","\n color: var(--n-option-text-color-hover);\n ",[K("prefix, suffix","\n color: var(--n-option-text-color-hover);\n "),F("&::before","background-color: var(--n-option-color-hover);")]),j("active","\n color: var(--n-option-text-color-active);\n ",[K("prefix, suffix","\n color: var(--n-option-text-color-active);\n "),F("&::before","background-color: var(--n-option-color-active);")]),j("child-active","\n color: var(--n-option-text-color-child-active);\n ",[K("prefix, suffix","\n color: var(--n-option-text-color-child-active);\n ")])]),j("disabled","\n cursor: not-allowed;\n opacity: var(--n-option-opacity-disabled);\n "),j("group","\n font-size: calc(var(--n-font-size) - 1px);\n color: var(--n-group-header-text-color);\n ",[K("prefix","\n width: calc(var(--n-option-prefix-width) / 2);\n ",[j("show-icon","\n width: calc(var(--n-option-icon-prefix-width) / 2);\n ")])]),K("prefix","\n width: var(--n-option-prefix-width);\n display: flex;\n justify-content: center;\n align-items: center;\n color: var(--n-prefix-color);\n transition: color .3s var(--n-bezier);\n z-index: 1;\n ",[j("show-icon","\n width: var(--n-option-icon-prefix-width);\n "),z("icon","\n font-size: var(--n-option-icon-size);\n ")]),K("label","\n white-space: nowrap;\n flex: 1;\n z-index: 1;\n "),K("suffix","\n box-sizing: border-box;\n flex-grow: 0;\n flex-shrink: 0;\n display: flex;\n justify-content: flex-end;\n align-items: center;\n min-width: var(--n-option-suffix-width);\n padding: 0 8px;\n transition: color .3s var(--n-bezier);\n color: var(--n-suffix-color);\n z-index: 1;\n ",[j("has-submenu","\n width: var(--n-option-icon-suffix-width);\n "),z("icon","\n font-size: var(--n-option-icon-size);\n ")]),z("dropdown-menu","pointer-events: all;")]),z("dropdown-offset-container","\n pointer-events: none;\n position: absolute;\n left: 0;\n right: 0;\n top: -4px;\n bottom: -4px;\n ")]),z("dropdown-divider","\n transition: background-color .3s var(--n-bezier);\n background-color: var(--n-divider-color);\n height: 1px;\n margin: 4px 0;\n "),z("dropdown-menu-wrapper","\n transform-origin: var(--v-transform-origin);\n width: fit-content;\n "),F(">",[z("scrollbar","\n height: inherit;\n max-height: inherit;\n ")]),_("scrollable","\n padding: var(--n-padding);\n "),j("scrollable",[K("content","\n padding: var(--n-padding);\n ")])]),se={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},ue=Object.keys(V),ce=s({name:"Dropdown",inheritAttrs:!1,props:Object.assign(Object.assign(Object.assign({},V),se),B.props),setup(s){const u=e(!1),c=T(D(s,"show"),u),p=f((()=>{const{keyField:e,childrenField:o}=s;return L(s.options,{getKey:o=>o[e],getDisabled:e=>!0===e.disabled,getIgnored:e=>"divider"===e.type||"render"===e.type,getChildren:e=>e[o]})})),v=f((()=>p.value.treeNodes)),m=e(null),w=e(null),y=e(null),g=f((()=>{var e,o,n;return null!==(n=null!==(o=null!==(e=m.value)&&void 0!==e?e:w.value)&&void 0!==o?o:y.value)&&void 0!==n?n:null})),x=f((()=>p.value.getPath(g.value).keyPath)),k=f((()=>p.value.getPath(s.value).keyPath));!function(e={},s){const u=n({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:c,keyup:p}=e,v=e=>{switch(e.key){case"Control":u.ctrl=!0;break;case"Meta":u.command=!0,u.win=!0;break;case"Shift":u.shift=!0;break;case"Tab":u.tab=!0}void 0!==c&&Object.keys(c).forEach((o=>{if(o!==e.key)return;const n=c[o];if("function"==typeof n)n(e);else{const{stop:o=!1,prevent:t=!1}=n;o&&e.stopPropagation(),t&&e.preventDefault(),n.handler(e)}}))},f=e=>{switch(e.key){case"Control":u.ctrl=!1;break;case"Meta":u.command=!1,u.win=!1;break;case"Shift":u.shift=!1;break;case"Tab":u.tab=!1}void 0!==p&&Object.keys(p).forEach((o=>{if(o!==e.key)return;const n=p[o];if("function"==typeof n)n(e);else{const{stop:o=!1,prevent:t=!1}=n;o&&e.stopPropagation(),t&&e.preventDefault(),n.handler(e)}}))},h=()=>{(void 0===s||s.value)&&(a("keydown",document,v),a("keyup",document,f)),void 0!==s&&o(s,(e=>{e?(a("keydown",document,v),a("keyup",document,f)):(d("keydown",document,v),d("keyup",document,f))}))};t()?(r(h),i((()=>{(void 0===s||s.value)&&(d("keydown",document,v),d("keyup",document,f))}))):h(),l(u)}({keydown:{ArrowUp:{prevent:!0,handler:function(){I("up")}},ArrowRight:{prevent:!0,handler:function(){I("right")}},ArrowDown:{prevent:!0,handler:function(){I("down")}},ArrowLeft:{prevent:!0,handler:function(){I("left")}},Enter:{prevent:!0,handler:function(){const e=$();(null==e?void 0:e.isLeaf)&&c.value&&(P(e.key,e.rawNode),C(!1))}},Escape:function(){C(!1)}}},b((()=>s.keyboard&&c.value)));const{mergedClsPrefixRef:S,inlineThemeDisabled:N}=M(s),R=B("Dropdown","-dropdown",ae,E,s,S);function P(e,o){const{onSelect:n}=s;n&&H(n,e,o)}function C(e){const{"onUpdate:show":o,onUpdateShow:n}=s;o&&H(o,e),n&&H(n,e),u.value=e}function O(){m.value=null,w.value=null,y.value=null}function $(){var e;const{value:o}=p,{value:n}=g;return o&&null!==n&&null!==(e=o.getNode(n))&&void 0!==e?e:null}function I(e){const{value:o}=g,{value:{getFirstAvailableNode:n}}=p;let t=null;if(null===o){const e=n();null!==e&&(t=e.key)}else{const o=$();if(o){let n;switch(e){case"down":n=o.getNext();break;case"up":n=o.getPrev();break;case"right":n=o.getChild();break;case"left":n=o.getParent()}n&&(t=n.key)}}null!==t&&(m.value=null,w.value=t)}h(Z,{labelFieldRef:D(s,"labelField"),childrenFieldRef:D(s,"childrenField"),renderLabelRef:D(s,"renderLabel"),renderIconRef:D(s,"renderIcon"),hoverKeyRef:m,keyboardKeyRef:w,lastToggledSubmenuKeyRef:y,pendingKeyPathRef:x,activeKeyPathRef:k,animatedRef:D(s,"animated"),mergedShowRef:c,nodePropsRef:D(s,"nodeProps"),renderOptionRef:D(s,"renderOption"),menuPropsRef:D(s,"menuProps"),doSelect:P,doUpdateShow:C}),o(c,(e=>{s.animated||e||O()}));const z=f((()=>{const{size:e,inverted:o}=s,{common:{cubicBezierEaseInOut:n},self:t}=R.value,{padding:r,dividerColor:i,borderRadius:d,optionOpacityDisabled:l,[U("optionIconSuffixWidth",e)]:a,[U("optionSuffixWidth",e)]:u,[U("optionIconPrefixWidth",e)]:c,[U("optionPrefixWidth",e)]:p,[U("fontSize",e)]:v,[U("optionHeight",e)]:f,[U("optionIconSize",e)]:h}=t,b={"--n-bezier":n,"--n-font-size":v,"--n-padding":r,"--n-border-radius":d,"--n-option-height":f,"--n-option-prefix-width":p,"--n-option-icon-prefix-width":c,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":a,"--n-option-icon-size":h,"--n-divider-color":i,"--n-option-opacity-disabled":l};return o?(b["--n-color"]=t.colorInverted,b["--n-option-color-hover"]=t.optionColorHoverInverted,b["--n-option-color-active"]=t.optionColorActiveInverted,b["--n-option-text-color"]=t.optionTextColorInverted,b["--n-option-text-color-hover"]=t.optionTextColorHoverInverted,b["--n-option-text-color-active"]=t.optionTextColorActiveInverted,b["--n-option-text-color-child-active"]=t.optionTextColorChildActiveInverted,b["--n-prefix-color"]=t.prefixColorInverted,b["--n-suffix-color"]=t.suffixColorInverted,b["--n-group-header-text-color"]=t.groupHeaderTextColorInverted):(b["--n-color"]=t.color,b["--n-option-color-hover"]=t.optionColorHover,b["--n-option-color-active"]=t.optionColorActive,b["--n-option-text-color"]=t.optionTextColor,b["--n-option-text-color-hover"]=t.optionTextColorHover,b["--n-option-text-color-active"]=t.optionTextColorActive,b["--n-option-text-color-child-active"]=t.optionTextColorChildActive,b["--n-prefix-color"]=t.prefixColor,b["--n-suffix-color"]=t.suffixColor,b["--n-group-header-text-color"]=t.groupHeaderTextColor),b})),A=N?q("dropdown",f((()=>`${s.size[0]}${s.inverted?"i":""}`)),z,s):void 0;return{mergedClsPrefix:S,mergedTheme:R,tmNodes:v,mergedShow:c,handleAfterLeave:()=>{s.animated&&O()},doUpdateShow:C,cssVars:N?void 0:z,themeClass:null==A?void 0:A.themeClass,onRender:null==A?void 0:A.onRender}},render(){const{mergedTheme:e}=this,o={show:this.mergedShow,theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:(e,o,n,t,r)=>{var i;const{mergedClsPrefix:d,menuProps:l}=this;null===(i=this.onRender)||void 0===i||i.call(this);const a=(null==l?void 0:l(void 0,this.tmNodes.map((e=>e.rawNode))))||{},s={ref:Y(o),class:[e,`${d}-dropdown`,this.themeClass],clsPrefix:d,tmNodes:this.tmNodes,style:[n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:t,onMouseleave:r};return u(le,x(this.$attrs,s,a))},onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return u(W,Object.assign({},G(this.$props,ue),o),{trigger:()=>{var e,o;return null===(o=(e=this.$slots).default)||void 0===o?void 0:o.call(e)}})}});export{ce as _,Y as c};
