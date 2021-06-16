import customHook from './custom-hook.js';
import  * as hooks from './hooks.js';
import { getVal,setStore } from './utils.js';
const userAgentKeys = {
    'h5': {
        // 组件的hook对象
        hooksKey: '$options',
        // 用来初始化的hook
        initHook: 'created',
        // 是否支持组件、暂废弃
        supportComponent: true,
        isPage(pageHooks){
            return pageHooks._compiled && this.supportComponent;
        }
    },
    'miniprogram': {
        hooksKey: '$options',
        initHook: 'created',
        supportComponent: true,
        isPage(){
            return this.supportComponent;
        }
    }
}

// 判断小程序环境还是普通h5环境
let BASE;
try{
    wx.version.features && wx.env,
    BASE = userAgentKeys['miniprogram'];
}catch(e){
    BASE = userAgentKeys['h5'];
}
const install = (vue,params,store)=>{
    //基于mpmvue框架特殊处理，避免created的bug
    if(vue.mpvueVersion){
        userAgentKeys['miniprogram'].initHook = 'onLoad';
    }
    setStore(store);
    hooks.init(params);
    vue.mixin({
        ...hooks.nativeHooks.reduce((obj,key) => (obj[key] = function(options){
            //没有创建customHook不作处理
            if(typeof this.customHook != 'object' && typeof this.customHook != null) return;
            //customHook里没有自定义钩子不作处理
            if(!this.customHook.customHookArr.length) return;
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
			// 入口文件特殊处理
			let pageHooks = getVal(this,BASE['hooksKey']);
            // 过滤掉非业务组件
			if(BASE.isPage(pageHooks)){
    	       this.customHook = new customHook(this,options,pageHooks);
			}
        }
	})
}
export {
    install,
    BASE
}