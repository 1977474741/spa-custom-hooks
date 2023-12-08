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
        name: 'miniprogram',
        hooksKey: '',
        initHook: 'onLoad',
        initHookApp: 'onLaunch',
        initHookComponentAlipay: 'didMount',
        initHookComponentAlipayInit: 'onInit',
        initHookComponentWx: 'created',
        initHookComponentLifetimes: 'created',
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
        ...hooksMutation(hooks.nativeAllHooks),
        // vue初始化钩子beforeCreate
        [BASE.initHook](options) {
            hookInit.call(this, options, 'page', undefined, BASE.initHook);
        },
        ...(BASE.name === 'miniprogram'
            ? {
                  // 所有小程序App初始化钩子onLaunch
                  [BASE.initHookApp](options) {
                      hookInit.call(this, options, 'app', undefined, BASE.initHookApp);
                  },
                  //微信小程序组件初始化钩子created
                  [BASE.initHookComponentWx](optionProperties, options) {
                      hookInit.call(this, options, 'component', optionProperties, BASE.initHookComponentWx);
                  },
                  //支付宝小程序组件初始化钩子onInit
                  [BASE.initHookComponentAlipayInit](optionProperties, options) {
                      hookInit.call(this, options, 'component', optionProperties, BASE.initHookComponentAlipayInit);
                  },
                  //支付宝小程序组件初始化钩子didMount
                  //兼容支付宝小程序普通和component2模式，init、created、didMount都有可能做初始化
                  [BASE.initHookComponentAlipay](optionProperties, options) {
                      componentHookTriggered.call(this, optionProperties, options, BASE.initHookComponentAlipay);
                  },
                  // 小程序原生组件api混入
                  lifetimes: {
                      ...hooksMutation(hooks.lifetimesHooks),
                      //支付宝小程序组件初始化钩子created、在lifetimes为true并且未开启component2时作为初始化
                      [BASE.initHookComponentLifetimes](optionProperties, options) {
                          componentHookTriggered.call(this, optionProperties, options, BASE.initHookComponentLifetimes);
                      },
                  },
                  pageLifetimes: {
                      ...hooksMutation(hooks.pageLifetimesHooks),
                  },
              }
            : {}),
    });
    // 钩子执行后，初始化 || 改钩子状态
    function componentHookTriggered(optionProperties, options, hookName) {
        // 已经初始化的修改内部钩子状态，否则走初始化逻辑
        if (this.customHook) {
            updateHookState.call(this, options, hookName);
            return;
        }
        hookInit.call(this, options, 'component', optionProperties, hookName);
    }
    // 初始化，实例化custom-hook-spa
    function hookInit(options, instanceType, optionProperties, initHookName) {
        if (this.customHook) return;
        // 入口文件特殊处理
        let pageHooks = getVal(this, BASE['hooksKey']);
        // 过滤掉非业务组件
        if (BASE.isPage(pageHooks)) {
            // 兼容非vuex环境
            if (!store.state && storeKey) {
                store.state = this[storeKey] || storeKey;
            }
            const isComponent = instanceType === 'component';
            Object.defineProperty(this, 'customHook', {
                value: new customHook({
                    instance: this,
                    options,
                    pageHooks: isComponent ? optionProperties : pageHooks,
                    instanceType,
                    initHookName: initHookName,
                }),
                configurable: true,
                enumerable: false,
            });
        }
    }
    // 监听所有钩子并修改状态
    function hooksMutation(hookNames) {
        return hookNames.reduce(
            (hooks, hookName) =>
                (hooks[hookName] = function (options) {
                    updateHookState.call(this, options, hookName);
                }) && hooks,
            {}
        );
    }
    // 更新已经存在的实例化custom-hook-spa对应钩子状态
    function updateHookState(options, hookName) {
        //没有创建customHook不作处理
        if (typeof this.customHook != 'object' && typeof this.customHook != null) return;
        //customHook里没有自定义钩子不作处理
        if (!this.customHook.customHookArr.length) return;
        if (options && Object.keys(options).length > 0) {
            this.customHook.options = options;
        }
        const hooks = this.customHook.hook;
        const isDestroy = ['beforeDestroy', 'destroyed', 'onUnload', 'didUnmount', 'detached'].includes(hookName);
        for (let k in hooks) {
            const hook = hooks[k];
            if (hook.name == hookName) {
                hook.cycleStart();
            } else if (hook.destroy == hookName) {
                hook.cycleEnd();
            }
            isDestroy && hook.unwatchFn?.();
        }
        isDestroy && delete this.customHook;
    }
};
export { install, BASE };
