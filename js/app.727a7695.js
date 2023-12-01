(function(e){function t(t){for(var n,r,a=t[0],c=t[1],h=t[2],u=0,m=[];u<a.length;u++)r=a[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(m.length)m.shift()();return s.push.apply(s,h||[]),o()}function o(){for(var e,t=0;t<s.length;t++){for(var o=s[t],n=!0,r=1;r<o.length;r++){var c=o[r];0!==i[c]&&(n=!1)}n&&(s.splice(t--,1),e=a(a.s=o[0]))}return e}var n={},i={app:0},s=[];function r(e){return a.p+"js/"+({about:"about"}[e]||e)+"."+{about:"5de46d5c"}[e]+".js"}function a(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.e=function(e){var t=[],o=i[e];if(0!==o)if(o)t.push(o[2]);else{var n=new Promise((function(t,n){o=i[e]=[t,n]}));t.push(o[2]=n);var s,c=document.createElement("script");c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.src=r(e);var h=new Error;s=function(t){c.onerror=c.onload=null,clearTimeout(u);var o=i[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;h.message="Loading chunk "+e+" failed.\n("+n+": "+s+")",h.name="ChunkLoadError",h.type=n,h.request=s,o[1](h)}i[e]=void 0}};var u=setTimeout((function(){s({type:"timeout",target:c})}),12e4);c.onerror=c.onload=s,document.head.appendChild(c)}return Promise.all(t)},a.m=e,a.c=n,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(o,n,function(t){return e[t]}.bind(null,n));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],h=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=h;s.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"56d7":function(e,t,o){"use strict";o.r(t);var n=o("2b0e"),i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("button",{on:{click:e.clear}},[e._v("清屏")]),t("br"),t("button",{on:{click:e.login}},[e._v("点击完成Login任务")]),t("button",{on:{click:e.getUser}},[e._v("点击完成UserInfo任务")]),t("router-view"),t("div",{class:e.$route.name,attrs:{id:"nav"}},[t("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),t("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),t("div",{staticClass:"logs"},[e._l(e.logs,(function(o){return t("div",["line"==o?t("p",{staticStyle:{height:"2px"}}):t("p",{style:{background:-1!=o.indexOf("app.vue")?"red":-1!=o.indexOf("home.vue")?"#FAB87F":-1!=o.indexOf("about.vue")?"#B05574":"#000",color:-1!=o.indexOf("任务")?"white":"black"}},[e._v(" "+e._s(o)+" ")])])})),t("p",{attrs:{id:"bottom"}})],2)],1)},s=[],r={name:"App",computed:{logs(){return this.$store.state.logs}},data(){return{route:{Home:{bg:"#FAB87F"},About:{bg:"#B05574"}}}},methods:{login(){this.$store.commit("loginType",1),this.$store.commit("logs","异步任务1完成（登录成功Login）")},getUser(){this.$store.commit("userinfo",{name:"张三"}),this.$store.commit("logs","异步任务2完成（获取用户信息成功UserInfo）")},clear(){this.$store.commit("logClear")}},created(){this.$store.commit("logs","created钩子执行(app.vue)")},mounted(){this.$store.commit("logs","mounted钩子执行(app.vue)")},onLoginCreated(){this.$store.commit("logs","onLoginCreated钩子执行(app.vue)")},onLoginMounted(){this.$store.commit("logs","onLoginMounted钩子执行(app.vue)")},onUserInfoCreated(){this.$store.commit("logs","onUserInfoCreated钩子执行(app.vue)")},onLoginUserInfoCreated(){this.$store.commit("logs","onLoginUserInfoCreated钩子执行(app.vue)")}},a=r,c=(o("d182"),o("2877")),h=Object(c["a"])(a,i,s,!1,null,null,null),u=h.exports,l=o("8c4f"),m=function(){var e=this;e._self._c;return e._m(0)},d=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"home",staticStyle:{background:"#FAB87F"}},[t("h1",[e._v("This is an home page")])])}],p={name:"Home",created(){this.$store.commit("logs","created钩子执行(home.vue)")},mounted(){this.$store.commit("logs","mounted钩子执行(home.vue)")},onCreatedLogin(){this.$store.commit("logs","onCreatedLogin钩子执行(home.vue)")},onCreatedUserInfo(){this.$store.commit("logs","onCreatedUserInfo钩子执行(home.vue)")},onCreatedLoginUserInfo(){this.$store.commit("logs","onCreatedLoginUserInfo钩子执行(home.vue)")},onMountedLogin(){this.$store.commit("logs","onMountedLogin钩子执行(home.vue)")},onMountedUserInfo(){this.$store.commit("logs","onMountedUserInfo钩子执行(home.vue)")},onMountedLoginUserInfo(){this.$store.commit("logs","onMountedLoginUserInfo钩子执行(home.vue)")}},f=p,g=Object(c["a"])(f,m,d,!1,null,null,null),k=g.exports;n["a"].use(l["a"]);const y=[{path:"/",name:"Home",component:k},{path:"/about",name:"About",component:()=>o.e("about").then(o.bind(null,"f820"))}],w=new l["a"]({routes:y});var v=w,H=o("2f62");n["a"].use(H["a"]);var b=new H["a"].Store({state:{loginType:null,logs:[],userinfo:{}},mutations:{loginType(e,t){e["loginType"]=t},logs(e,t){e["logs"].unshift(t),e["logs"].unshift("line")},logClear(e){e["logs"]=[]},userinfo(e,t){e["userinfo"]=t}},actions:{},modules:{}});let C;const L=(e,t,o)=>{try{if(t){let n=t;"string"===typeof t&&(n=t.split("."));const i=o?n.length-1:n.length;for(let t=0;t<i;t++)e=e[n[t]];return o?{key:n[i],obj:e}:e}return e}catch(n){return}},_=e=>(C=e,C),A=e=>C&&C.state?C:e&&e.$store||{};class j{constructor({customhook:e,name:t,destroy:o,hit:n=!1,watchKey:i,onUpdate:s,type:r,weightValue:a}){this.name=t,this.destroy=o,this.type=r,this.hit=n,this.watchKey=i,this.weightValue=a,this.initFlag=!1,this.onUpdate=s,this.__customhook=e}init(){this.initFlag||(this.watchKey&&(this.unwatchFn=this.watchAttr(e=>{this[e?"cycleStart":"cycleEnd"]()})),this.initFlag=!0)}cycleStart(){this.hit||(this.hit=!0,this.__customhook&&this.__customhook.triggerHook(this.name))}cycleEnd(){this.hit&&(this.hit=!1,this.__customhook&&this.__customhook.resetExecute(this.destroy))}watchAttr(e){try{const t=this,o=A(this.__customhook.instance),n=o.watch(e=>(console.log("getVal(state, that.watchKey);"),L(e,t.watchKey)),(o,n)=>{e(t.onUpdate?t.onUpdate(o,n):o)},{watchKey:t.watchKey});return n}catch(t){}}}let O={};const U=["beforeCreate","created","onPageShow","beforeMount","mounted","activated","onPageHide","deactivated","beforeDestroy","destroyed","onLaunch","onLoad","onShow","onReady","onHide","onUnload"],x=["onInit","created","attached","ready","didMount","detached","didUnmount"],V=["created","attached","ready","detached"],P=["show","hide","routeDone"],I=[...new Set([...U,...x])],$=(e,t)=>Object.keys(O).reduce((t,o)=>{const n=O[o];return n.customhook=e,(t[o]=new j(n))&&t},{BeforeCreate:new j({customhook:e,name:"BeforeCreate",destroy:"destroyed",hit:!0,weightValue:2}),BeforeMount:new j({customhook:e,name:"beforeMount",destroy:"destroyed",weightValue:4}),PageShow:new j({customhook:e,name:"onPageShow",destroy:"onPageHide",weightValue:4.1}),Mounted:new j({customhook:e,name:"mounted",destroy:"destroyed",weightValue:5}),Activated:new j({customhook:e,name:"activated",destroy:"deactivated",weightValue:6}),PageHide:new j({customhook:e,name:"onPageHide",destroy:"onPageShow",weightValue:6.1}),Deactivated:new j({customhook:e,name:"deactivated",destroy:"activated",weightValue:7}),...e.isComponent?{Init:new j({customhook:e,name:"onInit",destroy:"didUnmount",hit:"onInit"===t,weightValue:2}),Created:new j({customhook:e,name:"created",destroy:"detached",hit:"created"===t,weightValue:3}),Attached:new j({customhook:e,name:"attached",destroy:"detached",weightValue:4}),Show:new j({customhook:e,name:"show",destroy:"hide",weightValue:5}),Ready:new j({customhook:e,name:"ready",destroy:"detached",weightValue:6}),RouteDone:new j({customhook:e,name:"routeDone",destroy:"detached",weightValue:7}),Hide:new j({customhook:e,name:"hide",destroy:"show",weightValue:8}),Detached:new j({customhook:e,name:"detached",destroy:"attached",weightValue:9}),DidMount:new j({customhook:e,name:"didMount",destroy:"didUnmount",hit:"didMount"===t,weightValue:10})}:{Launch:new j({customhook:e,name:"onLaunch",destroy:"onUnload",hit:!0,weightValue:3}),Created:new j({customhook:e,name:"created",destroy:"destroyed",hit:"created"===t,weightValue:3}),Load:new j({customhook:e,name:"onLoad",destroy:"onUnload",hit:"onLoad"===t,weightValue:4}),Ready:new j({customhook:e,name:"onReady",destroy:"onUnload",weightValue:5}),Show:new j({customhook:e,name:"onShow",destroy:"onHide",weightValue:6}),Hide:new j({customhook:e,name:"onHide",destroy:"onShow",weightValue:7})}}),M=e=>O=e,S=()=>Object.keys(O),K=(e,t)=>{$()[e][t?"cycleStart":"cycleEnd"]()};class E{constructor({instance:e,options:t,pageHooks:o,instanceType:n,initHookName:i}){this.instance=e,this.instanceType=n,this.initHookName=i,this.isComponent="component"===n,this.customHooks={},this.customHookArr=[],this.hook={},this.options=t||{},this.pageHooks=o,this.diyHooks=S(),this.init(),this.triggerHook()}init(){let e=$(this,this.initHookName);this.presetHooksName=Object.keys(e),this.hook=e;let t=this.pageHooks,o=t.hasOwnProperty("beforeCreate")||t.hasOwnProperty("onReady");t=o?t:t["__proto__"],this.isComponent&&Object.assign(t,t.lifetimes,t.pageLifetimes);let{customHookArr:n,hookInscape:i}=this.filterHooks(t);n.forEach(e=>{this.customHooks[e]={callback:t[e].bind(this.instance),inscape:i[e],execute:!1,weightValue:i[e].reduce((e,t)=>{var o;return e+((null===(o=this.hook[t])||void 0===o?void 0:o.weightValue)||0)},0)}}),this.customHookArr=n.sort((e,t)=>this.customHooks[e].weightValue-this.customHooks[t].weightValue),Object.keys(this.hook).forEach(e=>this.hook[e].init())}filterHooks(e){let t={};const o={},n=Object.keys(e).filter(e=>{let n=this.getHookArr(e);return!!n.length&&(t[e]=n.filter(t=>this.hook[t]?(o[t]=this.hook[t],!0):(console.warn(`[custom-hook 错误声明警告] "${t}"钩子未注册，意味着"${e}"可能永远不会执行，请先注册此钩子再使用，文档：https://github.com/1977474741/spa-custom-hooks#-diyhooks对象说明`),!1)),e=="on"+n.join("")&&t[e].length==n.length)});return this.hook=o,{customHookArr:n,hookInscape:t}}triggerHook(e){this.customHookArr.forEach(e=>{let t=this.customHooks[e],o=t.inscape.every(e=>this.hook[e]&&this.checkHookHit(this.hook[e]));o&&!t.execute&&(t.execute=!0,this.customHooks[e]["callback"](this.options))})}resetExecute(e){this.customHookArr.forEach(t=>{let o=this.customHooks[t];o.inscape.find(t=>{var o;return e===(null===(o=this.hook[t])||void 0===o?void 0:o.destroy)})&&(o.execute=!1)})}checkHookHit(e){if(e.watchKey){let t=L(A(e.__customhook.instance).state,e.watchKey);return e.onUpdate?e.onUpdate(t):t}return e.hit}getHookArr(e){if(-1==e.indexOf("on"))return[];const t=this.splitHook(e),o=this.diyHooks;return t.length>1||-1!=o.indexOf(t[0])?t:[]}splitHook(e){e=e.replace("on",""),this.presetHooksName.sort((e,t)=>t.length-e.length);let t=new RegExp("("+this.presetHooksName.join("|")+")","g");return e.split(t).filter(e=>this.hook[e])}}const T={"vue-h5":{hooksKey:"$options",initHook:"beforeCreate",supportComponent:!0,isPage(e){return e._compiled&&this.supportComponent}},"vue-miniprogram":{hooksKey:"$options",initHook:"beforeCreate",supportComponent:!0,isPage(){return this.supportComponent}},miniprogram:{name:"miniprogram",hooksKey:"",initHook:"onLoad",initHookApp:"onLaunch",initHookComponentAlipay:"didMount",initHookComponentAlipayInit:"onInit",initHookComponentWx:"created",initHookComponentLifetimes:"created",supportComponent:!0,isPage(){return this.supportComponent}}};let F=T["vue-miniprogram"];const B=(e,t,o,n)=>{function i(e,t,o){if(this.customHook){const e=this.customHook.hook,n=Object.keys(e).find(t=>e[t].name===o);if(!e[n].hit)return void a.call(this,t,o)}s.call(this,t,"component",e,o)}function s(e,t,i,s){if(this.customHook)return;let r=L(this,F["hooksKey"]);if(F.isPage(r)){!o.state&&n&&(o.state=this[n]||n);const a="component"===t;Object.defineProperty(this,"customHook",{value:new E({instance:this,options:e,pageHooks:a?i:r,instanceType:t,initHookName:s}),configurable:!0,enumerable:!1})}}function r(e){return e.reduce((e,t)=>(e[t]=function(e){a.call(this,e,t)})&&e,{})}function a(e,t){if("object"!=typeof this.customHook&&null!=typeof this.customHook)return;if(!this.customHook.customHookArr.length)return;e&&Object.keys(e).length>0&&(this.customHook.options=e);const o=this.customHook.hook,n=["beforeDestroy","destroyed","onUnload"].includes(t);for(let i in o){const e=o[i];e.name==t?e.cycleStart():e.destroy==t&&e.cycleEnd(),n&&e.unwatchFn&&e.unwatchFn()}n&&delete this.customHook}e.mpvueVersion?F.initHook="onLoad":e.userAgentKey&&(F=T[e.userAgentKey]),_(o),M(t),e.mixin({...r(I),[F.initHook](e){s.call(this,e,"page",void 0,F.initHook)},..."miniprogram"===F.name?{[F.initHookApp](e){s.call(this,e,"app",void 0,F.initHookApp)},[F.initHookComponentWx](e,t){s.call(this,t,"component",e,F.initHookComponentWx)},[F.initHookComponentAlipayInit](e,t){s.call(this,t,"component",e,F.initHookComponentAlipayInit)},[F.initHookComponentAlipay](e,t){i.call(this,e,t,F.initHookComponentAlipay)},lifetimes:{...r(V),[F.initHookComponentLifetimes](e,t){i.call(this,e,t,F.initHookComponentLifetimes)}},pageLifetimes:{...r(P)}}:{}})},D={mixin(e){let t=App,o=Page,n=Component;App=o=>{this.mergeHook(e,o),t(o)},Page=t=>{this.mergeHook(e,t),o(t)},Component=t=>{this.mergeComponentHook(e,t);const o=this.mixinLifetimes(e,t);n(o)}},mergeHook(e,t){for(let[o,n]of Object.entries(e)){const e=t[o];t[o]=function(...t){e&&e.call(this,...t),n.call(this,...t)}}},mergeComponentHook(e,t){const o=["lifetimes","pageLifetimes"];for(let[n,i]of Object.entries(e).filter(e=>!o.includes(e[0]))){const e=t[n];t[n]=function(...o){e&&e.call(this,...o),i.call(this,t,...o)}}},mixinLifetimes(e,t){if("function"===typeof Behavior){const o=t.behaviors||[],n=e.lifetimes.created;return e.lifetimes.created=function(...e){n&&n.call(this,t,...e)},o.push(Behavior({lifetimes:e.lifetimes,pageLifetimes:e.pageLifetimes})),t.behaviors=o,t}{const o=t.mixins||[];if(t.options&&t.options.lifetimes){const o=e.lifetimes.created;e.lifetimes.created=function(...e){o&&o.call(this,t,...e)}}return o.push(Mixin({lifetimes:e.lifetimes,pageLifetimes:e.pageLifetimes,options:{lifetimes:!0}})),t.mixins=o,t}},userAgentKey:"miniprogram"},N={},R={watch(e,t,o){const n=A().state,i=o.watchKey,s=L(n,i,!0);let r={callback:t,unwatch:!1};N[i]?N[i].push(r):N[i]=[r];const a=[];function c(e,o){let n=e[o];if(Object.defineProperty(e,o,{configurable:!0,enumerable:!0,set:function(e){n=e,N[i].map(e=>e.callback(s.obj[s.key]))},get:function(){return n}}),Array.isArray(e[o])&&a.push(W(e[o],()=>{t(s.obj[s.key])})),"object"===typeof e[o]&&null!=e[o])for(let[t,i]of Object.entries(e[o]))c(e[o],t)}return c(s.obj,s.key),()=>{r.unwatch=!0;const e=N[i].findIndex(e=>e.unwatch);N[i].splice(e,1),N[i].length||delete N[i],a.map(e=>e())}}};function W(e,t){const o=Object.create(e),n=["push","pop","shift","unshift","splice","sort","reverse"].map(n=>{let i=o[n];return J(e,n,(function(){return i.apply(this,arguments),t.apply(this,arguments)})),()=>{J(e,n,i)}});return()=>{n.map(e=>e())}}function J(e,t,o,n){Object.defineProperty(e,t,{value:o,enumerable:!!n,writable:!0,configurable:!0})}const q=function(){arguments.length<3?B(D,arguments[0],R,arguments[1]||"globalData"):B(...arguments)};var z={install:q,setHit:K};n["a"].use(z,{Login:{name:"Login",watchKey:"loginType",onUpdate(e){return!!e}},UserInfo:{name:"UserInfo",watchKey:"userinfo",deep:!0,onUpdate(e){return!!e.name}}},b),n["a"].config.productionTip=!1,new n["a"]({router:v,store:b,render:e=>e(u)}).$mount("#app")},"5e14":function(e,t,o){},d182:function(e,t,o){"use strict";o("5e14")}});
//# sourceMappingURL=app.727a7695.js.map