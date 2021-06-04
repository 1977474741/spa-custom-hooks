import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CustomHook from '/lib/vue-custom-hooks/index.js';
Vue.use(CustomHook,{
	'Login':{
        name:'Login',
        watchKey: 'loginType',
        onUpdate(val){
            //loginType为true表示登录成功，可以触发此钩子
            return !!val;
        }
    },
     'UserInfo':{
        name:'UserInfo',
        watchKey: 'userinfo',
        //需要监听userinfo对象下面的属性，所以开启deep
        deep: true,
        onUpdate(val){
            //获取到userinfo里的name属性表示获取到用户信息，可以触发此钩子
            return !!val.name;
        }
    }
},store)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
