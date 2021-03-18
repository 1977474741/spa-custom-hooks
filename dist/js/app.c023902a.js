(function(t){function e(e){for(var n,s,a=e[0],u=e[1],c=e[2],h=0,d=[];h<a.length;h++)s=a[h],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);f&&f(e);while(d.length)d.shift()();return r.push.apply(r,c||[]),o()}function o(){for(var t,e=0;e<r.length;e++){for(var o=r[e],n=!0,s=1;s<o.length;s++){var u=o[s];0!==i[u]&&(n=!1)}n&&(r.splice(e--,1),t=a(a.s=o[0]))}return t}var n={},i={app:0},r=[];function s(t){return a.p+"js/"+({about:"about"}[t]||t)+"."+{about:"70d3160a"}[t]+".js"}function a(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.e=function(t){var e=[],o=i[t];if(0!==o)if(o)e.push(o[2]);else{var n=new Promise((function(e,n){o=i[t]=[e,n]}));e.push(o[2]=n);var r,u=document.createElement("script");u.charset="utf-8",u.timeout=120,a.nc&&u.setAttribute("nonce",a.nc),u.src=s(t);var c=new Error;r=function(e){u.onerror=u.onload=null,clearTimeout(h);var o=i[t];if(0!==o){if(o){var n=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+n+": "+r+")",c.name="ChunkLoadError",c.type=n,c.request=r,o[1](c)}i[t]=void 0}};var h=setTimeout((function(){r({type:"timeout",target:u})}),12e4);u.onerror=u.onload=r,document.head.appendChild(u)}return Promise.all(e)},a.m=t,a.c=n,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(o,n,function(e){return t[e]}.bind(null,n));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var h=0;h<u.length;h++)e(u[h]);var f=c;r.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"034f":function(t,e,o){"use strict";o("85ec")},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("button",{on:{click:t.clear}},[t._v("清屏")]),o("br"),o("button",{on:{click:t.login}},[t._v("点击完成Login任务")]),o("button",{on:{click:t.getUser}},[t._v("点击完成UserInfo任务")]),o("router-view"),o("div",{class:t.$route.name,attrs:{id:"nav"}},[o("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),o("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),o("div",{staticClass:"logs"},[t._l(t.logs,(function(e){return o("div",["line"==e?o("p",{staticStyle:{height:"2px"}}):o("p",{style:{background:-1!=e.indexOf("app.vue")?"red":-1!=e.indexOf("home.vue")?"#FAB87F":-1!=e.indexOf("about.vue")?"#B05574":"#000",color:-1!=e.indexOf("任务")?"white":"black"}},[t._v(" "+t._s(e)+" ")])])})),o("p",{attrs:{id:"bottom"}})],2)],1)},r=[],s={name:"App",computed:{logs:function(){return this.$store.state.logs}},data:function(){return{route:{Home:{bg:"#FAB87F"},About:{bg:"#B05574"}}}},methods:{login:function(){this.$store.commit("loginType",1),this.$store.commit("logs","异步任务1完成（登录成功Login）")},getUser:function(){this.$store.commit("userinfo",{name:"张三"}),this.$store.commit("logs","异步任务2完成（获取用户信息成功UserInfo）")},clear:function(){this.$store.commit("logClear")}},created:function(){this.$store.commit("logs","created钩子执行(app.vue)")},mounted:function(){this.$store.commit("logs","mounted钩子执行(app.vue)")},onLoginCreated:function(){this.$store.commit("logs","onLoginCreated钩子执行(app.vue)")},onLoginMounted:function(){this.$store.commit("logs","onLoginMounted钩子执行(app.vue)")},onUserInfoCreated:function(){this.$store.commit("logs","onUserInfoCreated钩子执行(app.vue)")},onLoginUserInfoCreated:function(){this.$store.commit("logs","onLoginUserInfoCreated钩子执行(app.vue)")}},a=s,u=(o("034f"),o("2877")),c=Object(u["a"])(a,i,r,!1,null,null,null),h=c.exports,f=(o("d3b7"),o("3ca3"),o("ddb0"),o("8c4f")),d=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},l=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home",staticStyle:{background:"#FAB87F"}},[o("h1",[t._v("This is an home page")])])}],p={name:"Home",created:function(){this.$store.commit("logs","created钩子执行(home.vue)")},mounted:function(){this.$store.commit("logs","mounted钩子执行(home.vue)")},onLoginCreated:function(){this.$store.commit("logs","onLoginCreated钩子执行(home.vue)")},onUserInfoCreated:function(){this.$store.commit("logs","onUserInfoCreated钩子执行(home.vue)")},onLoginUserInfoCreated:function(){this.$store.commit("logs","onLoginUserInfoCreated钩子执行(home.vue)")},onLoginMounted:function(){this.$store.commit("logs","onLoginMounted钩子执行(home.vue)")}},m=p,g=Object(u["a"])(m,d,l,!1,null,null,null),v=g.exports;n["a"].use(f["a"]);var y=[{path:"/",name:"Home",component:v},{path:"/about",name:"About",component:function(){return o.e("about").then(o.bind(null,"f820"))}}],k=new f["a"]({routes:y}),b=k,w=o("2f62");n["a"].use(w["a"]);var _=new w["a"].Store({state:{loginType:null,logs:[],userinfo:{}},mutations:{loginType:function(t,e){t["loginType"]=e},logs:function(t,e){t["logs"].unshift(e),t["logs"].unshift("line")},logClear:function(t){t["logs"]=[]},userinfo:function(t,e){t["userinfo"]=e}},actions:{},modules:{}}),O=(o("b0c0"),o("ade3")),$=o("53ca"),j=o("5530"),H=(o("13d5"),o("1276"),o("ac1f"),o("2909")),x=o("1da1"),U=o("d4ec"),L=o("bee2"),C=(o("96cf"),o("d81d"),o("159b"),o("4de4"),o("b64b"),o("a15b"),o("5319"),o("6062"),o("99af"),function(){function t(e){var o=e.customhook,n=e.name,i=e.destroy,r=e.hit,s=void 0!==r&&r,a=e.watchKey,u=e.onUpdate;Object(U["a"])(this,t),this.name=n,this.destroy=i,this.hit=s,this.need=!1,this.initFlag=!1,this.watchKey=a,this.onUpdate=u,this.__customhook=o}return Object(L["a"])(t,[{key:"init",value:function(){var t=this;if(!this.initFlag){this.watchKey&&this.watchAttr((function(e){t[e?"cycleStart":"cycleEnd"]()})),this.initFlag=!0}}},{key:"cycleStart",value:function(){this.hit||(this.hit=!0,this.__customhook.triggerHook())}},{key:"cycleEnd",value:function(){this.hit&&(this.hit=!1,this.__customhook.resetExecute(this.name))}},{key:"watchAttr",value:function(t){var e=this;this.__customhook.pageInstance.$watch(this.watchKey,{immediate:!1,handler:function(o,n){t(e.onUpdate?e.onUpdate(o,n):o)}})}}]),t}()),S={},E=["created","beforeMount","mounted","beforeDestroy","destroyed","onLoad","attached","detached","onShow","onHide","onReady","onUnload"],I=function(t){return Object(j["a"])({Launch:new C({customhook:t,name:"onLaunch",destroy:"onUnload",hit:!0}),Created:new C({customhook:t,name:"created",destroy:"destroyed",hit:!0}),Load:new C({customhook:t,name:"onLoad",destroy:"onUnload",hit:"onLoad"==D.BASE.initHook}),Attached:new C({customhook:t,name:"attached",destroy:"detached"}),Show:new C({customhook:t,name:"onShow",destroy:"onHide"}),Mounted:new C({customhook:t,name:"mounted",destroy:"destroyed"}),Ready:new C({customhook:t,name:"onReady",destroy:"onUnload"})},Object.keys(S).reduce((function(e,o){var n=S[o];return n.customhook=t,(e[o]=new C(n))&&e}),{}))},A=function(t){return S=t},K=function(){return Object.keys(S)},T=E.map((function(t){return P(t)})),F=function(){function t(e,o,n){Object(U["a"])(this,t),this.pageInstance=e,this.hookFun={},this.hooksStr=[],this.hook={},this.options=o,this.pageHooks=n,this.init()}return Object(L["a"])(t,[{key:"init",value:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(){var e,o,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=I(this),this.hook=e,o={},Object.keys(this.pageHooks).filter((function(t){var i=K().some((function(e){return-1!=t.indexOf(e)&&-1==E.indexOf("on"+e)}));return!!i&&(o[t]=n.splitHook(t),t=="on"+o[t].join("")&&o[t].every((function(t){return e[t]})))})).forEach((function(t,i){n.hooksStr[i]={name:[],execute:!1},n.hookFun[t]=n.pageHooks[t],o[t].forEach((function(t){if(e[t]&&e[t].init)if(n.hooksStr[i].name.push(t),e[t].destroy&&e[t].name){var o=n.pageHooks;o[e[t].name].length&&o[e[t].destroy].length&&(e[t].need=!0)}else e[t].need=!0}))})),Object.keys(e).forEach((function(t){return e[t].need&&e[t].init()}));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"triggerHook",value:function(t){var e=this;this.hooksStr.forEach((function(t){var o=t.name.every((function(t){return e.hook[t].need&&e.checkHookHit(e.hook[t])}));o&&!t.execute&&(e.hookFun["on"+t.name.join("")].call(e.pageInstance,e.options),t.execute=!0)}))}},{key:"resetExecute",value:function(t){t=P(t),this.hooksStr.forEach((function(e){-1!=e.name.indexOf(t)&&(e.execute=!1)}))}},{key:"splitHook",value:function(t){t=t.replace("on","").split(/(?=[A-Z])/);for(var e=Object(H["a"])(new Set(T.concat(K()))).sort((function(t,e){return e.length-t.length})),o=[],n="",i=0;i<t.length;i++){var r=t[i];n+=r,-1!=e.indexOf(n)&&(o.push(n),n="")}return o}},{key:"checkHookHit",value:function(t){if(t.watchKey){var e=M(t.__customhook.pageInstance,t.watchKey);return t.onUpdate?t.onUpdate(e):e}return t.hit}}]),t}();function P(t){return t=t.replace("on",""),t=t.substring(0,1).toUpperCase()+t.substring(1),t}function M(t,e){return e.split(".").reduce((function(t,e){return t[e]}),t)}var B={h5:{hooksKey:"$options.__proto__",mainHooksKey:"$options",initHook:"created",supportComponent:!0,isPage:function(t,e){return t._compiled&&(this.supportComponent||"page"==e||"app"==e)}},wx:{hooksKey:"$options",mainHooksKey:"$options",initHook:"created",supportComponent:!0,isPage:function(t,e){return this.supportComponent||"page"==e||"app"==e}}};try{uni.x}catch(G){B["wx"].initHook="onLoad"}var R=B[document?"h5":"wx"],J=function(t,e){A(e),t.mixin(Object(j["a"])(Object(j["a"])({},E.reduce((function(t,e){return(t[e]=function(t){if("object"==Object($["a"])(this.customHook)){t&&(this.customHook.options=t);var o=this.customHook.hook;for(var n in o){var i=o[n];i.name==e?i.cycleStart():i.destroy==e&&i.cycleEnd()}}})&&t}),{})),{},Object(O["a"])({},R.initHook,(function(t){var e=q(this,R["app"==this.$options.mpType?"mainHooksKey":"hooksKey"]),o=this.$mp&&this.$mp.mpType||e.mpType;R.isPage(e,o)&&(this.customHook||(this.customHook=new F(this,t,e)))}))))},q=function(t,e){return e.split(".").reduce((function(t,e){return t[e]}),t)},D={init:J,BASE:R},Z={install:function(t){D.init(t,{Login:{name:"Login",watchKey:"$store.state.loginType",onUpdate:function(t,e){return!!t}},UserInfo:{name:"UserInfo",watchKey:"$store.state.userinfo",deep:!0,onUpdate:function(t){return!!t.name}}})}},z=Z;n["a"].use(z),n["a"].config.productionTip=!1,new n["a"]({router:b,store:_,render:function(t){return t(h)}}).$mount("#app")},"85ec":function(t,e,o){}});
//# sourceMappingURL=app.c023902a.js.map