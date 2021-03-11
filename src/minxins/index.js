import CustomHook from '/lib/vue-custom-hooks/index.js';
let MyPlugin = {};
MyPlugin.install = function(Vue) {
    CustomHook.init(Vue,{
         'Login':{
            name:'Login',
            watchKey: '$store.state.loginType',
            onUpdate(val,oldvue){
                return !!val;
            }
        },
         'UserInfo':{
            name:'UserInfo',
            watchKey: '$store.state.userinfo',
            deep: true,
            onUpdate(val){
                return !!val.name;
            }
        }
    })
}
export default MyPlugin