import customHook from './custom-hook.js';
import  * as hooks from './hooks.js';
const userAgentKeys = {
    'h5': {
        hooksKey: '$options.__proto__',
        mainHooksKey: '$options',
        // statusKey: '',
        initHook: 'created',
        // 是否会自动销毁实例
        // autoDestroy: false,
        // 是否支持组件
        supportComponent: true,
        isPage(pageHooks,mpType){
        	return pageHooks._compiled && (this.supportComponent || mpType == 'page' || mpType == 'app');
        }
    },
    'wx': {
        hooksKey: '$options',
        mainHooksKey: '$options',
        // statusKey: '',
        // 避免mpvue的created的bug，改用onLoad
        initHook: 'created',
        // autoDestroy: true,
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
        ...hooks.nativeHooks.reduce((obj,key) => (obj[key] = function(options){
            if(typeof this.customHook != 'object') return;
            if(options){
                this.customHook.options = options;
            }
            const hooks = this.customHook.hook;
            for(let k in hooks){
                const hook = hooks[k];
                if(hook.name == key){
                    hook.cycleStart();
                }else if(hook.destroy == key){
                    hook.cycleEnd();
                }
            }
            
        }) && obj,{}),
		[BASE.initHook](options) {
			//入口文件特殊处理
			let pageHooks = getVal(this,BASE[this.$options.mpType == 'app'?'mainHooksKey':'hooksKey']);
			let mpType = (this.$mp && this.$mp.mpType) || pageHooks.mpType;
			if(BASE.isPage(pageHooks,mpType)){
                if(!this.customHook){
    	            this.customHook = new customHook(this,options,pageHooks);
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