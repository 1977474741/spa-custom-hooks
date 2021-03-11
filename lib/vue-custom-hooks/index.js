import customHook from './custom-hook.js';
import  * as hooks from './hooks.js';
import { nativeHooks } from './hooks.js';
let initHook = 'created';
const userAgentKeys = {
    'h5': {
        hooksKey: '$options.__proto__',
        nativeHooksKey: '$options',
        statusKey: '',
        initHook: 'created',
        // 是否自动销毁实例
        autoDestroy: false,
        // 是否支持组件
        supportComponent: true,
        isPage(pageHooks,mpType){
        	return pageHooks._compiled && (this.supportComponent || mpType == 'page' || mpType == 'app');
        }
    },
    'wx': {
        hooksKey: '$options',
        nativeHooksKey: '$options',
        statusKey: '',
        // 避免mpvue的created的bug，改用onLoad
        initHook: 'created',
        autoDestroy: true,
        supportComponent: true,
        isPage(pageHooks,mpType){
        	return this.supportComponent || mpType == 'page' || mpType == 'app';
        }
    }
}
try{uni.x}catch(e){
    userAgentKeys['wx'].initHook = 'onLoad';
}
let BASE = userAgentKeys[document?'h5':'wx'];
const init = (vue,params)=>{
	hooks.init(params);
	vue.mixin({
        ...nativeHooks.reduce((obj,key) => (obj[key] = ()=>{}) && obj,{}),
		[BASE.initHook](options) {
			let pageHooks = getVal(this,BASE.hooksKey),
				pageNativeHooks = getVal(this,BASE.nativeHooksKey);
			//入口文件特殊处理
			if(this.$options.mpType == 'app'){
				pageHooks = pageNativeHooks;
			}
			let mpType = (this.$mp && this.$mp.mpType) || pageHooks.mpType;
            let isNativeHookCache = false;
			if(BASE.isPage(pageHooks,mpType)){
                if(!this.customHook){
    	            this.customHook = new customHook(this,options,pageHooks,pageNativeHooks,isNativeHookCache);
                }
			}
        }
	})
}
/**
 * 动态字符串key获取对象
 * @param    在此对象上查找
 * @param    要找的对象key，支持字符串调用链
 * return Object
 */
const getVal = (obj,keyStr)=>{
    return keyStr.split('.').reduce((obj,val) => obj[val],obj)
}
export default{
    init,
    BASE
}