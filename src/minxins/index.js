import CustomHook from '/lib/vue-custom-hooks.js';
let MyPlugin = {};
MyPlugin.install = function(Vue) {
    CustomHook.init(Vue,{
         'Login':{
            name:'Login',
            watchKey: '$store.state.loginType',
            onUpdate(val,oldvue){
                //loginType为true表示登录成功，可以触发此钩子
                return !!val;
            }
        },
         'UserInfo':{
            name:'UserInfo',
            watchKey: '$store.state.userinfo',
            //需要监听userinfo对象下面的属性，所以开启deep
            deep: true,
            onUpdate(val){
                //获取到userinfo里的name属性表示获取到用户信息，可以触发此钩子
                return !!val.name;
            }
        }
    })
}
export default MyPlugin