import customHook from './custom-hook.js';
import * as hooks from './hooks.js';
import { getVal, setStore } from './utils.js';
const userAgentKeys = {
    'vue-h5': {
        // 组件的hook对象
        hooksKey: '$options',
        // 用来初始化的hook
        initHook: 'beforeCreate',
        // 是否支持组件、暂废弃
        supportComponent: true,
        isPage(pageHooks) {
            return pageHooks._compiled && this.supportComponent;
        },
    },
    'vue-miniprogram': {
        hooksKey: '$options',
        initHook: 'beforeCreate',
        supportComponent: true,
        isPage() {
            return this.supportComponent;
        },
    },
    miniprogram: {
        hooksKey: '',
        initHook: 'onLoad',
        initHookApp: 'onLaunch',
        supportComponent: true,
        isPage() {
            return this.supportComponent;
        },
    },
};

let BASE = userAgentKeys['vue-miniprogram'];
const install = (vue, params, store, storeKey) => {
    //基于mpvue框架特殊处理，避免created的bug
    if (vue.mpvueVersion) {
        BASE.initHook = 'onLoad';
    } else if (vue.userAgentKey) {
        // 垫片里指定userAgentKey,根据参数来判断vue架构||原生小程序
        BASE = userAgentKeys[vue.userAgentKey];
    }
    setStore(store);
    hooks.init(params);
    vue.mixin({
        // 监听所有原生钩子，改变对应状态
        ...hooks.nativeHooks.reduce(
            (obj, key) =>
                (obj[key] = function (options) {
                    //没有创建customHook不作处理
                    if (typeof this.customHook != 'object' && typeof this.customHook != null) return;
                    //customHook里没有自定义钩子不作处理
                    if (!this.customHook.customHookArr.length) return;
                    if (options && Object.keys(options).length > 0) {
                        this.customHook.options = options;
                    }
                    const hooks = this.customHook.hook;
                    for (let k in hooks) {
                        const hook = hooks[k];
                        if (hook.name == key) {
                            hook.cycleStart();
                        } else if (hook.destroy == key) {
                            hook.cycleEnd();
                        }
                    }
                }) && obj,
            {}
        ),
        [BASE.initHook](options) {
            hookInit.call(this, options);
        },
        [BASE.initHookApp](options) {
            hookInit.call(this, options);
        },
    });
    // 入口文件及普通页面初始化
    function hookInit(options) {
        // 入口文件特殊处理
        let pageHooks = getVal(this, BASE['hooksKey']);
        // 过滤掉非业务组件
        if (BASE.isPage(pageHooks)) {
            // 兼容非vuex环境
            if (!store?.state && storeKey) {
                store.state = this[storeKey] || storeKey;
            }
            this.customHook = new customHook(this, options, pageHooks);
        }
    }
};
export { install, BASE };
